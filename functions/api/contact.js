const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

const METHOD_HEADERS = {
  Allow: 'GET, POST, OPTIONS',
};

const DEFAULT_ALLOWED_HOSTNAMES = new Set([
  'jibranhussain.com',
  'www.jibranhussain.com',
  'jibranhussain-portfolio.pages.dev',
  'localhost',
  '127.0.0.1',
]);

const EXPECTED_ENV_KEYS = [
  'TURNSTILE_SECRET_KEY',
  'RESEND_API_KEY',
  'CONTACT_TO_EMAIL',
  'CONTACT_FROM_EMAIL',
  'CONTACT_FROM_NAME',
  'CONTACT_ALLOWED_ORIGINS',
];

const MAX_MESSAGE_LINKS = 5;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...METHOD_HEADERS,
    },
  });
}

function empty(status = 204) {
  return new Response(null, {
    status,
    headers: METHOD_HEADERS,
  });
}

function sanitize(value, maxLength) {
  return String(value || '')
    .trim()
    .replace(/\r\n/g, '\n')
    .slice(0, maxLength);
}

function readEnvString(env, key, maxLength = 4000) {
  return sanitize(env?.[key], maxLength);
}

function hasEnvString(env, key) {
  return readEnvString(env, key).length > 0;
}

function getRuntimeConfig(env) {
  return {
    turnstileSecretKey: readEnvString(env, 'TURNSTILE_SECRET_KEY', 2048),
    resendApiKey: readEnvString(env, 'RESEND_API_KEY', 2048),
    contactToEmail: readEnvString(env, 'CONTACT_TO_EMAIL', 320),
    contactFromEmail: readEnvString(env, 'CONTACT_FROM_EMAIL', 320),
    contactFromName: readEnvString(env, 'CONTACT_FROM_NAME', 320),
    contactAllowedOrigins: readEnvString(env, 'CONTACT_ALLOWED_ORIGINS', 2000),
    debugContactEndpoint: readEnvString(env, 'DEBUG_CONTACT_ENDPOINT', 16),
  };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function countLinks(value) {
  return (value.match(/https?:\/\/|www\./gi) || []).length;
}

function getAllowedHostnames(env) {
  const configured = readEnvString(env, 'CONTACT_ALLOWED_ORIGINS', 2000)
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);

  const hostnames = new Set(DEFAULT_ALLOWED_HOSTNAMES);

  configured.forEach(value => {
    try {
      hostnames.add(new URL(value).hostname.toLowerCase());
    } catch {
      hostnames.add(value.toLowerCase());
    }
  });

  return hostnames;
}

function extractHostname(value) {
  if (!value) return '';

  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return '';
  }
}

function getClientIp(request) {
  const cfIp = sanitize(request.headers.get('CF-Connecting-IP'), 64);
  if (cfIp) {
    return cfIp;
  }

  const forwardedFor = sanitize(request.headers.get('X-Forwarded-For'), 256);
  if (!forwardedFor) {
    return '';
  }

  return forwardedFor.split(',')[0].trim();
}

function getRequestHostname(request) {
  const originHostname = extractHostname(request.headers.get('Origin'));
  if (originHostname) {
    return originHostname;
  }

  const refererHostname = extractHostname(request.headers.get('Referer'));
  if (refererHostname) {
    return refererHostname;
  }

  return extractHostname(request.url);
}

function isAllowedHostname(hostname, allowedHostnames) {
  return Boolean(hostname) && allowedHostnames.has(hostname.toLowerCase());
}

function getTurnstileErrorMessage(errorCodes = []) {
  if (errorCodes.includes('timeout-or-duplicate')) {
    return 'Spam protection expired. Please complete the check again.';
  }

  if (
    errorCodes.includes('invalid-input-response') ||
    errorCodes.includes('bad-request') ||
    errorCodes.includes('missing-input-response')
  ) {
    return 'Spam protection verification failed. Please try again.';
  }

  if (errorCodes.includes('internal-error')) {
    return 'Spam protection service is temporarily unavailable. Please try again.';
  }

  return 'Spam protection verification failed. Please try again.';
}

function getConfigDiagnostics(env, request) {
  const runtimeConfig = getRuntimeConfig(env);
  const requestHostname = getRequestHostname(request);
  const allowedHostnames = getAllowedHostnames(env);

  return {
    ok:
      hasEnvString(env, 'TURNSTILE_SECRET_KEY') &&
      hasEnvString(env, 'RESEND_API_KEY') &&
      hasEnvString(env, 'CONTACT_TO_EMAIL'),
    route: '/api/contact',
    runtime: 'cloudflare-pages-functions',
    request: {
      method: request.method,
      hostname: requestHostname || null,
      originHeaderPresent: Boolean(request.headers.get('Origin')),
      refererHeaderPresent: Boolean(request.headers.get('Referer')),
      allowedHostname: isAllowedHostname(requestHostname, allowedHostnames),
    },
    config: {
      expectedEnvKeys: EXPECTED_ENV_KEYS,
      hasTurnstileSecretKey: runtimeConfig.turnstileSecretKey.length > 0,
      hasResendApiKey: runtimeConfig.resendApiKey.length > 0,
      hasContactToEmail: runtimeConfig.contactToEmail.length > 0,
      hasContactFromEmail: runtimeConfig.contactFromEmail.length > 0,
      hasContactFromName: runtimeConfig.contactFromName.length > 0,
      hasContactAllowedOrigins: runtimeConfig.contactAllowedOrigins.length > 0,
      allowedHostnames: Array.from(allowedHostnames),
    },
  };
}

async function verifyTurnstile(token, secret, ip) {
  const formData = new URLSearchParams();
  formData.set('secret', secret);
  formData.set('response', token);

  if (ip) {
    formData.set('remoteip', ip);
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Turnstile verification failed with status ${response.status}`);
  }

  return response.json();
}

async function sendContactEmail(runtimeConfig, payload) {
  const fromEmail = runtimeConfig.contactFromEmail || 'portfolio@jibranhussain.com';
  const fromName = runtimeConfig.contactFromName || 'Jibran Hussain Portfolio';
  const toEmail = runtimeConfig.contactToEmail;

  if (!runtimeConfig.resendApiKey) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  if (!toEmail) {
    throw new Error('CONTACT_TO_EMAIL is not configured.');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${runtimeConfig.resendApiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'jibranhussain-portfolio/1.0',
    },
    body: JSON.stringify({
      from: `${fromName} <${fromEmail}>`,
      to: [toEmail],
      reply_to: `${payload.name} <${payload.email}>`,
      subject: `Portfolio contact: ${payload.subject}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Subject: ${payload.subject}`,
        '',
        payload.message,
      ].join('\n'),
      html: `
        <h2>New portfolio contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(payload.message).replace(/\n/g, '<br>')}</p>
      `,
    }),
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null);
    const errorMessage =
      errorPayload?.message ||
      errorPayload?.name ||
      `Resend API request failed with status ${response.status}`;
    throw new Error(`Mail delivery failed: ${errorMessage}`);
  }
}

function validatePayload(body) {
  const payload = {
    name: sanitize(body?.name, 120),
    email: sanitize(body?.email, 160),
    subject: sanitize(body?.subject, 160),
    message: sanitize(body?.message, 4000),
    website: sanitize(body?.website, 320),
    turnstileToken: sanitize(body?.turnstileToken, 2048),
  };

  if (payload.website) {
    return { error: 'Message rejected.' };
  }

  if (payload.name.length < 2) {
    return { error: 'Please enter your name.' };
  }

  if (!isValidEmail(payload.email)) {
    return { error: 'Please enter a valid email address.' };
  }

  if (payload.subject.length < 3) {
    return { error: 'Please enter a subject.' };
  }

  if (payload.message.length < 10) {
    return { error: 'Please enter a longer message.' };
  }

  if (countLinks(payload.message) > MAX_MESSAGE_LINKS) {
    return { error: 'Please reduce the number of links in your message.' };
  }

  if (!payload.turnstileToken) {
    return { error: 'Please complete the spam protection check before sending.' };
  }

  return { payload };
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const runtimeConfig = getRuntimeConfig(env);
  const allowedHostnames = getAllowedHostnames(env);
  const requestHostname = getRequestHostname(request);

  if (!runtimeConfig.turnstileSecretKey) {
    return json({ message: 'Contact form is temporarily unavailable.' }, 503);
  }

  if (!runtimeConfig.resendApiKey) {
    return json({ message: 'Contact form is temporarily unavailable.' }, 503);
  }

  if (!runtimeConfig.contactToEmail) {
    return json({ message: 'Contact form is temporarily unavailable.' }, 503);
  }

  if (!isAllowedHostname(requestHostname, allowedHostnames)) {
    return json({ message: 'This form can only be submitted from approved domains.' }, 403);
  }

  const contentType = sanitize(request.headers.get('Content-Type'), 100).toLowerCase();
  if (!contentType.includes('application/json')) {
    return json({ message: 'Invalid request format.' }, 415);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ message: 'Invalid request body.' }, 400);
  }

  const { payload, error } = validatePayload(body);
  if (error) {
    return json({ message: error }, 400);
  }

  try {
    const turnstile = await verifyTurnstile(payload.turnstileToken, runtimeConfig.turnstileSecretKey, getClientIp(request));

    if (!turnstile.success) {
      return json({ message: getTurnstileErrorMessage(turnstile['error-codes']) }, 400);
    }

    if (turnstile.hostname && !isAllowedHostname(turnstile.hostname, allowedHostnames)) {
      return json({ message: 'Spam protection verification did not match an approved hostname.' }, 400);
    }

    await sendContactEmail(runtimeConfig, payload);

    return json({ message: 'Message sent successfully. Thank you for reaching out.' });
  } catch (error) {
    console.error('Contact form submission failed.', error);
    return json(
      {
        message: 'Message could not be sent right now. Please try again later or email contact@jibranhussain.com.',
      },
      502
    );
  }
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const runtimeConfig = getRuntimeConfig(env);

  if (runtimeConfig.debugContactEndpoint === 'true') {
    const diagnostics = getConfigDiagnostics(env, request);

    return json({
      ...diagnostics,
      message: diagnostics.ok
        ? 'Contact endpoint is available and required runtime config is present. Submit with POST.'
        : 'Contact endpoint is available, but required runtime config is missing for this deployment.',
    });
  }

  return json({
    ok: true,
    route: '/api/contact',
    message: 'Contact endpoint is available. Submit with POST.',
  });
}

export async function onRequestOptions() {
  return empty(204);
}

const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

const DEFAULT_ALLOWED_HOSTNAMES = new Set([
  'jibranhussain.com',
  'www.jibranhussain.com',
  'jibranhussain-portfolio.pages.dev',
  'localhost',
  '127.0.0.1',
]);

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: JSON_HEADERS,
  });
}

function sanitize(value, maxLength) {
  return String(value || '')
    .trim()
    .replace(/\r\n/g, '\n')
    .slice(0, maxLength);
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

function getAllowedHostnames(env) {
  const configured = sanitize(env.CONTACT_ALLOWED_ORIGINS, 2000)
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

async function sendContactEmail(env, payload) {
  const fromEmail = env.CONTACT_FROM_EMAIL || 'portfolio@jibranhussain.com';
  const fromName = env.CONTACT_FROM_NAME || 'Jibran Hussain Portfolio';
  const toEmail = env.CONTACT_TO_EMAIL;

  if (!toEmail) {
    throw new Error('CONTACT_TO_EMAIL is not configured.');
  }

  const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: toEmail, name: 'Jibran Hussain' }],
        },
      ],
      from: {
        email: fromEmail,
        name: fromName,
      },
      reply_to: {
        email: payload.email,
        name: payload.name,
      },
      subject: `Portfolio contact: ${payload.subject}`,
      content: [
        {
          type: 'text/plain',
          value: [
            `Name: ${payload.name}`,
            `Email: ${payload.email}`,
            `Subject: ${payload.subject}`,
            '',
            payload.message,
          ].join('\n'),
        },
        {
          type: 'text/html',
          value: `
            <h2>New portfolio contact message</h2>
            <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(payload.message).replace(/\n/g, '<br>')}</p>
          `,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mail delivery failed: ${errorText}`);
  }
}

function validatePayload(body) {
  const payload = {
    name: sanitize(body?.name, 120),
    email: sanitize(body?.email, 160),
    subject: sanitize(body?.subject, 160),
    message: sanitize(body?.message, 4000),
    turnstileToken: sanitize(body?.turnstileToken, 2048),
  };

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

  if (!payload.turnstileToken) {
    return { error: 'Please complete the spam protection check before sending.' };
  }

  return { payload };
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const allowedHostnames = getAllowedHostnames(env);
  const requestHostname = getRequestHostname(request);

  if (!env.TURNSTILE_SECRET_KEY) {
    return json({ message: 'Turnstile secret key is not configured.' }, 500);
  }

  if (!env.CONTACT_TO_EMAIL) {
    return json({ message: 'Recipient email is not configured.' }, 500);
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
    const turnstile = await verifyTurnstile(payload.turnstileToken, env.TURNSTILE_SECRET_KEY, getClientIp(request));

    if (!turnstile.success) {
      return json({ message: getTurnstileErrorMessage(turnstile['error-codes']) }, 400);
    }

    if (turnstile.hostname && !isAllowedHostname(turnstile.hostname, allowedHostnames)) {
      return json({ message: 'Spam protection verification did not match an approved hostname.' }, 400);
    }

    await sendContactEmail(env, payload);

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

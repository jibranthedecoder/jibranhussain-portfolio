const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

const METHOD_HEADERS = {
  Allow: 'GET, POST, OPTIONS',
};

const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';
const DEFAULT_MODEL = 'gpt-4.1-mini';
const MAX_MESSAGE_LENGTH = 1000;

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

function sanitize(value, maxLength = MAX_MESSAGE_LENGTH) {
  return String(value || '')
    .trim()
    .replace(/\r\n/g, '\n')
    .slice(0, maxLength);
}

function readEnvString(env, key, maxLength = 4000) {
  return sanitize(env?.[key], maxLength);
}

function getRuntimeConfig(env) {
  return {
    openaiApiKey: readEnvString(env, 'OPENAI_API_KEY', 4096),
    openaiModel: readEnvString(env, 'OPENAI_MODEL', 100) || DEFAULT_MODEL,
  };
}

function getRequestMessage(body) {
  const message = sanitize(body?.message, MAX_MESSAGE_LENGTH);

  if (message) {
    return message;
  }

  return 'Confirm that the portfolio backend OpenAI connection works.';
}

async function createOpenAIResponse(runtimeConfig, message) {
  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${runtimeConfig.openaiApiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'jibranhussain-portfolio/1.0',
    },
    body: JSON.stringify({
      model: runtimeConfig.openaiModel,
      input: [
        {
          role: 'system',
          content:
            "You are a backend integration test assistant for Jibran Hussain's automation engineering portfolio. Answer briefly. Do not invent project details.",
        },
        {
          role: 'user',
          content: message,
        },
      ],
    }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload?.error?.message || `OpenAI API request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

function extractOutputText(payload) {
  if (typeof payload?.output_text === 'string' && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const textParts = [];

  for (const item of payload?.output || []) {
    for (const content of item?.content || []) {
      if (content?.type === 'output_text' && typeof content.text === 'string') {
        textParts.push(content.text);
      }
    }
  }

  return textParts.join('\n').trim();
}

export async function onRequestGet(context) {
  const runtimeConfig = getRuntimeConfig(context.env);

  return json({
    ok: Boolean(runtimeConfig.openaiApiKey),
    route: '/api/ai-test',
    runtime: 'cloudflare-pages-functions',
    model: runtimeConfig.openaiModel,
    message: runtimeConfig.openaiApiKey
      ? 'AI test endpoint is configured. Submit with POST and a JSON message field.'
      : 'AI test endpoint is available, but OPENAI_API_KEY is not configured for this deployment.',
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const runtimeConfig = getRuntimeConfig(env);

  if (!runtimeConfig.openaiApiKey) {
    return json(
      {
        ok: false,
        message: 'AI test endpoint is not configured. Add OPENAI_API_KEY to Cloudflare Pages environment variables.',
      },
      503
    );
  }

  const contentType = sanitize(request.headers.get('Content-Type'), 100).toLowerCase();
  if (!contentType.includes('application/json')) {
    return json({ ok: false, message: 'Invalid request format. Use application/json.' }, 415);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, message: 'Invalid JSON request body.' }, 400);
  }

  const message = getRequestMessage(body);

  try {
    const payload = await createOpenAIResponse(runtimeConfig, message);
    const answer = extractOutputText(payload);

    return json({
      ok: true,
      route: '/api/ai-test',
      model: runtimeConfig.openaiModel,
      answer: answer || 'OpenAI returned a response, but no text output was found.',
    });
  } catch (error) {
    console.error('AI test endpoint failed.', error);
    return json(
      {
        ok: false,
        message: 'AI backend test failed. Check the Cloudflare Function logs and OpenAI configuration.',
      },
      502
    );
  }
}

export async function onRequestOptions() {
  return empty(204);
}

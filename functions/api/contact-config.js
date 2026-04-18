function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...(init.headers || {}),
    },
  });
}

export async function onRequestGet(context) {
  const { env } = context;

  if (!env.TURNSTILE_SITE_KEY) {
    return json(
      {
        message: 'Turnstile site key is not configured.',
      },
      { status: 500 }
    );
  }

  return json({
    turnstileSiteKey: env.TURNSTILE_SITE_KEY,
  });
}

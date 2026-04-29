const INJECTED_SCRIPTS = [
  '<script src="/assets/theme-persistence.js" defer></script>',
  '<script src="/assets/readable-mode.js" defer></script>',
  '<script src="/assets/finnish-copy-polish.js" defer></script>',
];

function shouldInject(request, response) {
  if (request.method !== 'GET') return false;

  const url = new URL(request.url);
  if (url.pathname.startsWith('/api/')) return false;
  if (url.pathname.startsWith('/assets/')) return false;

  const contentType = response.headers.get('Content-Type') || '';
  return contentType.toLowerCase().includes('text/html');
}

function injectBeforeBody(html) {
  const scriptsToInject = INJECTED_SCRIPTS.filter((script) => {
    const srcMatch = script.match(/src="([^"]+)"/);
    return !srcMatch || !html.includes(srcMatch[1]);
  });

  if (scriptsToInject.length === 0) return html;

  const injection = scriptsToInject.join('\n');
  if (html.includes('</body>')) {
    return html.replace('</body>', `${injection}\n</body>`);
  }

  return `${html}\n${injection}`;
}

export async function onRequest(context) {
  const response = await context.next();

  if (!shouldInject(context.request, response)) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.delete('Content-Length');

  const html = await response.text();
  return new Response(injectBeforeBody(html), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

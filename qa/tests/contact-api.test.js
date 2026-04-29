// @ts-check
/**
 * Contact API hardening tests.
 * These tests verify safe public behavior and basic request validation.
 *
 * Run against Cloudflare Pages Functions preview:
 *   wrangler pages dev .
 *   BASE_URL=http://localhost:8788 npx playwright test qa/tests/contact-api.test.js --project=desktop-chrome
 */

const { test, expect } = require('@playwright/test');

test.describe('Contact API', () => {
  test.skip(({ isMobile }) => isMobile, 'API check: desktop only');

  test('GET /api/contact does not expose production diagnostics by default', async ({ request }) => {
    const response = await request.get('/api/contact');
    expect(response.status()).toBeLessThan(400);

    const body = await response.json();
    expect(body.ok).toBe(true);
    expect(body.route).toBe('/api/contact');
    expect(body.message).toContain('Contact endpoint is available');

    expect(body.config).toBeUndefined();
    expect(body.request).toBeUndefined();
    expect(body.runtime).toBeUndefined();
    expect(JSON.stringify(body)).not.toContain('RESEND_API_KEY');
    expect(JSON.stringify(body)).not.toContain('TURNSTILE_SECRET_KEY');
    expect(JSON.stringify(body)).not.toContain('CONTACT_TO_EMAIL');
  });

  test('POST /api/contact rejects non-JSON requests', async ({ request }) => {
    const response = await request.post('/api/contact', {
      headers: {
        Origin: 'https://www.jibranhussain.com',
        'Content-Type': 'text/plain',
      },
      data: 'not json',
    });

    expect([415, 503]).toContain(response.status());
  });

  test('POST /api/contact rejects missing Turnstile token before mail delivery', async ({ request }) => {
    const response = await request.post('/api/contact', {
      headers: {
        Origin: 'https://www.jibranhussain.com',
        'Content-Type': 'application/json',
      },
      data: {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test message',
        message: 'This is a test message for validation only.',
        turnstileToken: '',
      },
    });

    expect([400, 503]).toContain(response.status());

    if (response.status() === 400) {
      const body = await response.json();
      expect(body.message).toContain('spam protection');
    }
  });

  test('POST /api/contact rejects honeypot submissions', async ({ request }) => {
    const response = await request.post('/api/contact', {
      headers: {
        Origin: 'https://www.jibranhussain.com',
        'Content-Type': 'application/json',
      },
      data: {
        name: 'Bot User',
        email: 'bot@example.com',
        subject: 'Automated message',
        message: 'This message should be rejected because the honeypot field is filled.',
        website: 'https://spam.example',
        turnstileToken: 'fake-token',
      },
    });

    expect([400, 503]).toContain(response.status());

    if (response.status() === 400) {
      const body = await response.json();
      expect(body.message).toBe('Message rejected.');
    }
  });
});

# Security headers

The site sends HTTP security headers via a `_headers` file in `public/`. Cloudflare Pages reads this file and applies the headers to all static responses.

## What’s in `public/_headers`

| Header | Purpose |
|--------|--------|
| **X-Frame-Options: DENY** | Stops the site from being embedded in iframes (reduces clickjacking risk). |
| **X-Content-Type-Options: nosniff** | Stops browsers from guessing MIME types (reduces XSS/confusion). |
| **Referrer-Policy: strict-origin-when-cross-origin** | Limits referrer data sent to other sites. |
| **Permissions-Policy** | Disables unneeded browser features (document-domain, geolocation, microphone, camera). |
| **Content-Security-Policy** | Restricts where scripts, styles, fonts, frames, and form submissions can load from. See below. |

These apply to every path (`/*`) on the deployed site.

### Content-Security-Policy (CSP) in use

The CSP allows only the sources the site needs:

| Directive | Allowed | Reason |
|-----------|---------|--------|
| **default-src** | `'self'` | Fallback for any directive not listed. |
| **script-src** | `'self'`, `https://challenges.cloudflare.com`, `'unsafe-inline'` | Site JS, Turnstile script, contact page inline script (email/phone decode). |
| **style-src** | `'self'`, `https://fonts.googleapis.com`, `'unsafe-inline'` | Site CSS, Google Fonts stylesheet, Layout inline styles. |
| **font-src** | `'self'`, `https://fonts.gstatic.com` | Google Fonts. |
| **img-src** | `'self'`, `data:` | Favicon, SVGs, and data URIs. |
| **frame-src** | `https://challenges.cloudflare.com` | Turnstile widget iframe. |
| **form-action** | `'self'`, `https://formspree.io` | Contact form POST. |
| **connect-src** | `'self'`, `https://challenges.cloudflare.com` | Turnstile verification. |
| **base-uri** | `'self'` | Prevents base-tag injection. |
| **frame-ancestors** | `'none'` | Same as X-Frame-Options: no embedding in iframes. |

If you add new third-party scripts or styles, update the CSP in `public/_headers` (or via Cloudflare Transform Rules) so those origins are allowed; otherwise the browser will block them.

## Optional: HSTS

Cloudflare can add **Strict-Transport-Security (HSTS)** for you:

1. Dashboard → **SSL/TLS** → **Edge Certificates**.
2. Enable **Always Use HTTPS**.
3. Under **HSTS**, enable **Strict Transport Security (HSTS)** and set a suitable max-age (e.g. 12 months).

Then all requests to your domain are forced over HTTPS and browsers remember that.

## Optional: Headers via Transform Rules

If you prefer to manage headers in the dashboard instead of `_headers`:

1. Cloudflare Dashboard → **Rules** → **Transform Rules** → **Modify response header**.
2. Add a rule that matches your site (e.g. hostname equals `dagint.com`) and set the same header names and values as in `public/_headers`.

Headers set in Transform Rules override those from the `_headers` file when both apply.

# Security headers

The site sends HTTP security headers via a `_headers` file in `public/`. Cloudflare Pages reads this file and applies the headers to all static responses.

## What’s in `public/_headers`

| Header | Purpose |
|--------|--------|
| **Strict-Transport-Security: max-age=31536000; includeSubDomains** | Browsers use HTTPS only for one year, for this host and every subdomain. |
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
| **script-src** | `'self'`, `https://static.cloudflareinsights.com` | Site JS, analytics. |
| **style-src** | `'self'`, `'unsafe-inline'` | Site CSS, Layout inline styles. |
| **font-src** | `'self'` | Self-hosted Inter + JetBrains Mono fonts. |
| **img-src** | `'self'`, `data:` | Favicon, SVGs, and data URIs. |
| **form-action** | `'self'`, `https://formspree.io` | Contact form POST. |
| **connect-src** | `'self'`, `https://static.cloudflareinsights.com` | Analytics. |
| **base-uri** | `'self'` | Prevents base-tag injection. |
| **frame-ancestors** | `'none'` | Same as X-Frame-Options: no embedding in iframes. |

`script-src` has no `'unsafe-inline'` and no hashes, so **no inline script runs**. Write page scripts as plain Astro `<script>` blocks (bundled to `/_assets/*.js`), never `is:inline`; `astro.config.mjs` sets `vite.build.assetsInlineLimit: 0` so Astro never inlines a small one either. JSON-LD (`type="application/ld+json"`) is data and is unaffected.

If you add new third-party scripts or styles, update the CSP in `public/_headers` (or via Cloudflare Transform Rules) so those origins are allowed; otherwise the browser will block them.

## HSTS

`public/_headers` sends `Strict-Transport-Security: max-age=31536000; includeSubDomains`. Before relying on it, every subdomain must serve HTTPS: browsers that have seen the header refuse plain HTTP to any of them for a year. If Cloudflare's dashboard HSTS setting is also on, keep the two values the same. `preload` is deliberately not set.

## Optional: Headers via Transform Rules

If you prefer to manage headers in the dashboard instead of `_headers`:

1. Cloudflare Dashboard → **Rules** → **Transform Rules** → **Modify response header**.
2. Add a rule that matches your site (e.g. hostname equals `dagint.com`) and set the same header names and values as in `public/_headers`.

Headers set in Transform Rules override those from the `_headers` file when both apply.

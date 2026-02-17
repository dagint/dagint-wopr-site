# Security posture and high availability

This document summarizes the security posture of the DaGint site and how to keep it highly available when deployed to Cloudflare Pages.

---

## Security posture

### What you’re deploying

- **Static site** (Astro `output: 'static'`): pre-built HTML, CSS, and JS. No server-side runtime, no database, no app server to patch or compromise.
- **Hosting**: Cloudflare Pages (global CDN, TLS termination at the edge, DDoS mitigation as part of Cloudflare).
- **Form handling**: Form submissions go to Formspree. No form data is processed on your own infrastructure.

### Strengths

| Area | Detail |
|------|--------|
| **No secrets in repo** | Form IDs, contact email/phone are in env vars (Cloudflare Pages → Settings → Environment variables). See [ENV_AND_SECRETS.md](./ENV_AND_SECRETS.md). |
| **Minimal attack surface** | No custom API, no server-side logic. Only static assets and a contact form that posts to Formspree. |
| **Form security** | Formspree validates and stores submissions. Honeypot field (`_gotcha`) helps catch simple bots. |
| **Contact data in HTML** | Email/phone are injected as base64 and decoded in the browser so they’re not plain text in the source for scrapers. |
| **Security headers** | `public/_headers` sets X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. See [SECURITY_HEADERS.md](./SECURITY_HEADERS.md). |
| **Dependencies** | Small set (Astro, Tailwind, MDX, sitemap, RSS). Keep them updated (`npm update`, `npm audit`) before each release. |

### Things to maintain

1. **Env vars in production**
   Ensure all required variables are set in Cloudflare Pages for Production (and Preview if used). Missing values fall back to empty strings.

2. **Formspree**
   - Use a real Formspree form ID in production.
   - In Formspree, turn on spam filtering and any rate limits you want.

3. **Dependency updates**  
   Run `npm audit` and fix high/critical issues. Bump Astro and other deps periodically; test after upgrades.

4. **Optional hardening**  
   - Enable HSTS in Cloudflare (SSL/TLS → Edge Certificates → HSTS).  
   - Add a Content-Security-Policy in `public/_headers` if you want stricter script/style control; see [SECURITY_HEADERS.md](./SECURITY_HEADERS.md).

---

## High availability

### How Cloudflare Pages helps

- **Global CDN**: Static assets are cached at many edge locations; users are served from a nearby PoP.
- **No single server**: No app server to restart or scale; Pages serves files from the edge.
- **TLS**: HTTPS is standard; Cloudflare handles certificates and termination.
- **DDoS / abuse**: Cloudflare provides baseline DDoS and abuse protection in front of your site.

So the main causes of “unavailability” are: build/deploy failures, misconfiguration (e.g. wrong env), or Cloudflare/Formspree outages.

### What you can do

| Action | Purpose |
|--------|--------|
| **Uptime monitoring** | Use [UptimeRobot](https://uptimerobot.com/) or similar to ping `https://dagint.com` (and optionally `/contact`, `/blog`) every 5 minutes and alert you if the site is down. See [ANALYTICS_UPTIME_BACKUPS.md](./ANALYTICS_UPTIME_BACKUPS.md). |
| **Cloudflare status** | Subscribe to [Cloudflare Status](https://www.cloudflarestatus.com/) so you know about incidents. |
| **Formspree status** | Check Formspree’s status page or status updates if forms stop working. |
| **Deploy from a branch** | Connect Cloudflare Pages to a Git branch (e.g. `main`). Each push triggers a build; only successful builds go live. Avoid deploying untested or broken builds. |
| **Preview deployments** | Use branch or PR previews to test before merging to production. |
| **Backups** | The repo is the source of truth. Back up the remote (GitHub/GitLab) and keep env var values in a secure, backed-up place (e.g. password manager or secrets store). See [ANALYTICS_UPTIME_BACKUPS.md](./ANALYTICS_UPTIME_BACKUPS.md). |

### Checklist before go-live

- [ ] All production env vars set in Cloudflare Pages (Formspree form ID, contact email/phone, optional service area).
- [ ] `public/_headers` present (security headers applied); optional HSTS enabled in Cloudflare.
- [ ] Uptime monitor configured for `https://dagint.com` (and key pages if desired).
- [ ] Repo backed up; env vars recorded somewhere safe.
- [ ] `npm run build` succeeds locally; preview looks correct. **Tip:** On PowerShell, avoid typing `&&` (it’s not valid). Use `npm run build:preview` to build then preview in one step, or run `npm run build` and `npm run preview` separately (or use `;` instead of `&&`).
- [ ] Contact form tested end-to-end (submit, redirect to thank-you page, Formspree receives submission).

---

## Summary

- **Security**: Static site, no secrets in repo, env-based config, Formspree for the form, security headers via `_headers`. Maintain env vars, dependencies, and optional CSP/HSTS.
- **Availability**: Cloudflare’s CDN and edge reduce single-point-of-failure risk. Add uptime monitoring, follow Cloudflare/Formspree status, deploy from Git with successful builds only, and keep the repo and env vars backed up. That gives you a solid, production-ready posture and high availability for the DaGint site.

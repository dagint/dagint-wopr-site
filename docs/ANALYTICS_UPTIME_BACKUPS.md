# Analytics, uptime monitoring, and backups

Optional setup steps for the DaGint site (and related assets). These are not required for the site to run.

## Cloudflare Web Analytics

Privacy-friendly analytics with no cookies. Good fit for a static site on Cloudflare Pages.

1. In [Cloudflare Dashboard](https://dash.cloudflare.com/) go to **Analytics & Logs** → **Web Analytics**.
2. Create a site (or use an existing one) and add `dagint.com` (and any preview domains if needed).
3. Copy the **Beacon script** snippet (a single `<script>` tag).
4. Add it to the site’s `<head>` in `src/layouts/Layout.astro` (e.g. before `</head>`). Use the “No script” or “Script” variant as preferred.

No environment variables are required; the snippet is not secret.

## Uptime monitoring (e.g. UptimeRobot)

To get alerts when the site is down:

1. Sign up at [UptimeRobot](https://uptimerobot.com/) (or similar).
2. Add a **HTTP(s)** monitor for `https://dagint.com` (and optionally the contact form URL or a key page).
3. Set the check interval (e.g. 5 minutes) and configure alert contacts (email, Slack, etc.).

No code changes needed; this is entirely external to the repo.

## Repository and project backups

- **Git:** The repo is the source of truth. Pushing to a remote (GitHub, GitLab, etc.) gives you history and a copy elsewhere. Ensure the remote is backed up per your org policy (e.g. secondary remote or backup tool).
- **Cloudflare Pages:** Builds and deployments are tied to the connected repo. No extra backup step for “the site” beyond repo backup and env vars (see [ENV_AND_SECRETS.md](./ENV_AND_SECRETS.md)).
- **Formspree:** Form submissions are managed in Formspree. Export or back up any data you need from that dashboard; no backup is provided by this project.

## Testimonials

The homepage does not currently include a testimonials section. When you have real quotes from customers, you can add a short “What people say” (or similar) block to `src/pages/index.astro` and style it to match the WOPR theme. Prefer real, attributed quotes; avoid placeholder or fake testimonials.

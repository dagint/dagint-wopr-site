# Environment variables and removing secrets from the repo

Sensitive and identifying values are **not** stored in the repo. They are provided at build time via environment variables.

## Where to set them

### Local development

1. Copy `.env.example` to `.env.local` (or `.env`).
2. Fill in the values. `.env.local` and `.env` are gitignored and will not be committed.

### Cloudflare Pages (production)

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → your **dagint-site** project.
2. Go to **Settings** → **Environment variables**.
3. Add each variable below for **Production** (and **Preview** if you use branch previews).

| Variable | Description |
|----------|-------------|
| `PUBLIC_FORMSPREE_FORM_ID` | Your Formspree form ID (from the form URL). |
| `PUBLIC_CONTACT_EMAIL` | Email shown on the contact page (e.g. `info@dagint.com`). |
| `PUBLIC_CONTACT_PHONE` | Phone shown on the contact page (e.g. `+15551234567`). |
| `PUBLIC_SERVICE_AREA` | Optional. Service area line (e.g. “Sydney and surrounds” or “Greater Melbourne and remote”). Shown on homepage and footer. Leave unset to hide. |

4. **Save** and redeploy the project so the next build picks up the variables.

## Variables used in the site

- **Contact page** (`src/pages/contact.astro`): form action URL and obfuscated email/phone are read from these env vars at build time. If a variable is missing, the form uses empty contact info.

## If sensitive data was already committed

The repo no longer contains real Formspree IDs or contact details in source. If you **previously** committed real values:

1. **Rotate the secrets** (recommended, simplest):
   - Create a new Formspree form and use its ID in env.
   - No need to change email/phone unless you want to; they're now only in env.
   - Old commits still contain the old values, but they're no longer in use.

2. **Remove from git history** (only if you must purge the old values from history):
   - Use [git filter-repo](https://github.com/newren/git-filter-repo) or [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) to rewrite history and remove the sensitive strings.
   - This rewrites commit hashes; everyone who has cloned the repo will need to re-clone or rebase.
   - Prefer rotating secrets unless you have a strict requirement to purge history.

## Formspree redirect (thank-you page)

After a visitor submits the contact form, Formspree can redirect them to a thank-you page. The site includes:

- **Thank-you page:** `/contact/thanks` — “Message sent” confirmation with links back to services, blog, and home.
- **Redirect:** The contact form sends a hidden `_next` field with the full URL of the thank-you page (`{site}/contact/thanks`). Formspree uses this to redirect after a successful submit.

No extra Formspree dashboard configuration is required for the redirect; it’s driven by the form’s `_next` value. If you prefer to redirect from the Formspree dashboard instead, you can set the redirect URL there and remove the hidden `_next` input from `src/pages/contact.astro`.

## Checklist

- [ ] `.env.example` is committed (no real values).
- [ ] `.env` and `.env.local` are in `.gitignore` (already done).
- [ ] All four variables are set in Cloudflare Pages for Production (and Preview if used).
- [ ] After changing env vars in Cloudflare, trigger a new deployment.

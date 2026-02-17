# Cloudflare Pages Deployment Guide

This guide explains how to deploy the DaGint site to Cloudflare Pages.

---

## Quick Fix for Current Error

If you're seeing this error:
```
✘ [ERROR] It looks like you've run a Workers-specific command in a Pages project.
  For Pages, please run `wrangler pages deploy` instead.
```

**The problem:** Your Cloudflare Pages project has a deploy command set, but for Git-based deployments, you don't need one.

**The solution:** Remove the deploy command from Cloudflare Pages settings.

---

## Correct Cloudflare Pages Configuration

When deploying via Git (recommended), configure these settings in Cloudflare Pages:

### Build Settings

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → your **dagint-site** project
2. Click **Settings** → **Builds & deployments**
3. Configure:

| Setting | Value |
|---------|-------|
| **Framework preset** | `Astro` (or leave as "None") |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | (leave empty) |
| **Node version** | `18` or higher (recommended: `20`) |
| **Deploy command** | **Leave this EMPTY** (remove any value if present) |

### Why No Deploy Command?

- **Git-based deployments**: Cloudflare automatically deploys the `dist/` folder after the build completes. No deploy command needed.
- **Manual CLI deployments**: Only use `npx wrangler pages deploy dist` if you're deploying manually from your local machine (not via Git).

---

## Initial Setup (First Time)

### 1. Connect Repository to Cloudflare Pages

1. Push your code to GitHub (if not already):
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. In Cloudflare Dashboard:
   - Go to **Workers & Pages** → **Create a project**
   - Click **Connect to Git**
   - Authorize Cloudflare to access your GitHub account
   - Select repository: `dagint/dagint-site` (or your repo name)
   - Click **Begin setup**

### 2. Configure Build Settings

Use the settings from the table above:
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Deploy command**: (leave empty)

### 3. Set Environment Variables

Go to **Settings** → **Environment variables** and add:

| Variable | Value |
|----------|-------|
| `PUBLIC_FORMSPREE_FORM_ID` | Your Formspree form ID |
| `PUBLIC_CONTACT_EMAIL` | Your contact email |
| `PUBLIC_CONTACT_PHONE` | Your contact phone |
| `PUBLIC_SERVICE_AREA` | (Optional) Service area text |

Set these for **Production** (and **Preview** if you use branch previews).

### 4. Deploy

Click **Save and Deploy**. Cloudflare will:
1. Clone your repo
2. Run `npm install`
3. Run `npm run build`
4. Deploy the `dist/` folder
5. Your site will be live at `https://dagint-site.pages.dev` (or your custom domain)

---

## How Automated Deployments Work

Once connected to Git, deployments are automatic:

| Action | Result |
|--------|--------|
| **Push to `main` branch** | Cloudflare builds and deploys to production |
| **Push to other branch** | Cloudflare creates a preview deployment |
| **Open a Pull Request** | Cloudflare creates a preview deployment |

**No manual steps needed** — just push to Git and Cloudflare handles the rest.

---

## Manual Deployment (Optional)

If you want to deploy manually from your local machine (without Git):

1. Build the site:
   ```bash
   npm run build
   ```

2. Deploy using Wrangler:
   ```bash
   npx wrangler pages deploy dist --project-name=dagint-site
   ```

**Note:** This requires:
- Wrangler CLI installed (`npm install -g wrangler` or use `npx`)
- Cloudflare account authenticated (`npx wrangler login`)
- Project already created in Cloudflare Pages dashboard

For most cases, Git-based deployment is easier and recommended.

---

## Troubleshooting

### Build Fails

- Check build logs in Cloudflare Pages → **Deployments** → click on failed deployment
- Common issues:
  - Missing environment variables (check Settings → Environment variables)
  - Node version mismatch (try Node 18 or 20)
  - Build errors in code (test locally with `npm run build` first)

### Deploy Command Error

- **Error**: `It looks like you've run a Workers-specific command in a Pages project`
- **Fix**: Remove the deploy command from Cloudflare Pages → Settings → Builds & deployments → Deploy command (leave it empty)

### Environment Variables Not Working

- Make sure variables are set for the correct environment (Production vs Preview)
- Variables must start with `PUBLIC_` to be accessible in Astro
- After adding/changing env vars, trigger a new deployment (push a commit or click "Retry deployment")

### Site Not Updating

- Check that you pushed to the correct branch (`main` for production)
- Verify the build succeeded in Cloudflare Pages → Deployments
- Clear your browser cache or try incognito mode

---

## Custom Domain Setup

1. In Cloudflare Pages → your project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter `dagint.com` (and `www.dagint.com` if needed)
4. Follow Cloudflare's DNS instructions:
   - If domain is on Cloudflare: DNS is auto-configured
   - If domain is elsewhere: Add a CNAME record pointing to `dagint-site.pages.dev`

---

## Summary

✅ **For Git-based deployments (recommended):**
- Build command: `npm run build`
- Build output directory: `dist`
- Deploy command: **Leave empty**
- Push to Git → Cloudflare automatically deploys

✅ **For manual CLI deployments:**
- Build: `npm run build`
- Deploy: `npx wrangler pages deploy dist --project-name=dagint-site`

The `wrangler.toml` file is optional and only needed for manual CLI deployments or advanced configuration.

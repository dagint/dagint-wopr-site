# Cloudflare Turnstile Setup Guide

Turnstile is Cloudflare's free CAPTCHA alternative that protects your contact form from bots. This guide walks you through setting it up.

---

## Step 1: Create a Turnstile Site Key

1. **Log into Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com/
   - Sign in with your Cloudflare account (or create one if needed)

2. **Navigate to Turnstile**
   - In the left sidebar, click **"Turnstile"** (under "Security" or "Workers & Pages")
   - Or go directly to: https://dash.cloudflare.com/?to=/:account/turnstile

3. **Create a new site**
   - Click **"Add Site"** or **"Create"**
   - Fill in the form:
     - **Site name**: `dagint-site` (or any name you prefer)
     - **Domain**: Enter your domain(s):
       - For production: `dagint.com` (and `www.dagint.com` if you use www)
       - For local testing: `localhost` (or leave blank to allow all domains)
     - **Widget mode**: Choose **"Managed"** (recommended) or **"Non-interactive"**
       - **Managed**: Shows a challenge only when Cloudflare detects suspicious activity
       - **Non-interactive**: Always shows a challenge (more secure but less user-friendly)
     - **Pre-Clearance**: Optional, leave disabled unless you're using Cloudflare Access

4. **Save and get your keys**
   - Click **"Create"**
   - You'll see two keys:
     - **Site Key** (starts with `0x` or `1x`) — This is what you need for `PUBLIC_TURNSTILE_SITE_KEY`
     - **Secret Key** (starts with `0x` or `1x`) — Keep this secret! You'll use it for server-side verification (optional)

---

## Step 2: Set Environment Variables

### For Local Development

1. Create or edit `.env.local` in your project root:
   ```bash
   PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
   ```

2. Restart your dev server (`npm run dev`) so it picks up the new variable.

### For Production (Cloudflare Pages)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → your **dagint-site** project
2. Click **Settings** → **Environment variables**
3. Add:
   - **Variable name**: `PUBLIC_TURNSTILE_SITE_KEY`
   - **Value**: Your Turnstile site key (from Step 1)
   - **Environment**: Select **Production** (and **Preview** if you use branch previews)
4. Click **Save**
5. **Redeploy** your site so the new variable is picked up:
   - Go to **Deployments** tab
   - Click **Retry deployment** on the latest build, or push a new commit to trigger a rebuild

---

## Step 3: (Optional) Server-Side Verification

By default, Turnstile runs client-side only. For stronger security, you can verify submissions server-side.

### Option A: Verify in Formspree

If you're using Formspree, you can configure Turnstile verification there:

1. In your **Formspree dashboard**, go to your form's settings
2. Look for **"Spam Protection"** or **"Turnstile"** settings
3. Enable Turnstile and enter your **Secret Key** (not the site key)
4. Formspree will verify each submission server-side before accepting it

### Option B: Custom Backend Verification

If you have a custom backend (e.g., Cloudflare Workers), you can verify Turnstile tokens:

1. When the form submits, Turnstile generates a token
2. Your backend receives the token in the form data (usually as `cf-turnstile-response`)
3. POST the token to Cloudflare's verification endpoint:
   ```
   POST https://challenges.cloudflare.com/turnstile/v0/siteverify
   Content-Type: application/json
   
   {
     "secret": "YOUR_SECRET_KEY",
     "response": "TOKEN_FROM_FORM",
     "remoteip": "VISITOR_IP" // optional
   }
   ```
4. Cloudflare returns:
   ```json
   {
     "success": true,
     "challenge_ts": "2024-01-01T12:00:00.000Z",
     "hostname": "dagint.com"
   }
   ```
5. Only accept the form submission if `success` is `true`

**Note**: For a static Astro site, server-side verification requires a backend (Formspree, Cloudflare Workers, or another API). Client-side Turnstile still provides good bot protection for most use cases.

---

## Step 4: Test It

1. **Local testing**:
   - Make sure `.env.local` has your site key
   - Run `npm run dev`
   - Visit `http://localhost:4321/contact`
   - You should see the Turnstile widget (a small checkbox or challenge)
   - Submit the form — it should work

2. **Production testing**:
   - After deploying with the env var set, visit `https://dagint.com/contact`
   - Verify the Turnstile widget appears
   - Submit a test form
   - Check your Formspree dashboard to confirm the submission was received

---

## Troubleshooting

### Widget doesn't appear
- Check that `PUBLIC_TURNSTILE_SITE_KEY` is set correctly in your environment
- Check browser console for errors (F12 → Console)
- Verify your domain is added to the Turnstile site configuration
- For localhost, make sure `localhost` is in the allowed domains list

### "Invalid site key" error
- Double-check you're using the **Site Key** (not the Secret Key)
- Ensure the key matches the domain you're testing on
- Verify the env var is set correctly (check Cloudflare Pages → Settings → Environment variables)

### Form submits but Turnstile doesn't verify
- If using server-side verification, check that your Secret Key is correct
- Verify the token is being sent to your backend
- Check Formspree/backend logs for verification errors

---

## Free Tier Limits

Turnstile's free tier includes:
- ✅ Unlimited verification requests
- ✅ Up to 20 widgets per account
- ✅ 10 hostnames per widget
- ✅ 7-day analytics lookback

This is more than enough for most websites, including DaGint.

---

## Summary

1. ✅ Create Turnstile site in Cloudflare dashboard → get Site Key
2. ✅ Set `PUBLIC_TURNSTILE_SITE_KEY` in `.env.local` (local) and Cloudflare Pages env vars (production)
3. ✅ Redeploy to pick up the new variable
4. ✅ (Optional) Configure server-side verification in Formspree or your backend

Your contact form is now protected from bots! 🛡️

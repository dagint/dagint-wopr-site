# Troubleshooting Deployment Issues

## Issue: Site Shows "Hello World" Instead of Your Content

If your Cloudflare Pages deployment only shows "Hello World", this means Cloudflare Pages isn't finding your built files. This is usually a configuration issue.

### Check 1: Build Output Directory

**In Cloudflare Pages → Settings → Builds & deployments:**

| Setting | Must Be Set To |
|---------|----------------|
| **Build command** | `npm run build` |
| **Build output directory** | `dist` (exactly this, no trailing slash) |
| **Root directory** | (leave empty) |

**Common mistakes:**
- ❌ `dist/` (with trailing slash)
- ❌ `./dist`
- ❌ `build`
- ✅ `dist` (correct)

### Check 2: Verify Build is Running

1. Go to Cloudflare Pages → **Deployments**
2. Click on the latest deployment
3. Check the build logs:
   - Look for `npm run build`
   - Look for `✓ Built in Xms` or similar success message
   - Check for any errors

**If build fails:**
- Check Node version (should be 18 or 20)
- Check for missing dependencies
- Check for build errors in the logs

### Check 3: Verify Files Are Built

After a successful build, the logs should show files being created. Look for:
- `index.html` being written
- Files in the `dist/` directory
- No errors about missing files

### Check 4: Test Build Locally

Run locally to verify the build works:

```bash
npm run build
```

Then check:
- Is `dist/` folder created?
- Does `dist/index.html` exist?
- Can you preview it with `npm run preview`?

If local build works but Cloudflare doesn't, it's a configuration issue.

### Check 5: Framework Preset

In Cloudflare Pages → Settings → Builds & deployments:

- **Framework preset:** Should be `Astro` (or "None" if Astro isn't available)
- If set to something else (like "React" or "Vue"), change it to "Astro" or "None"

### Check 6: Node Version

Cloudflare Pages → Settings → Builds & deployments → **Node version:**

- Should be `18` or `20` (recommended: `20`)
- If set to an older version (like `16`), Astro 5.x might not work

### Check 7: Environment Variables

Make sure all required environment variables are set (even if empty):

- `PUBLIC_FORMSPREE_FORM_ID`
- `PUBLIC_CONTACT_EMAIL`
- `PUBLIC_CONTACT_PHONE`
- `PUBLIC_SERVICE_AREA` (optional)

Missing variables won't cause "Hello World", but they can cause build issues.

---

## Quick Fix Steps

1. **Verify build settings:**
   - Build command: `npm run build`
   - Output directory: `dist` (no slash)
   - Framework: `Astro` or `None`
   - Node: `20`

2. **Check deployment logs:**
   - Look for build success message
   - Look for any errors

3. **Test locally:**
   ```bash
   npm run build
   npm run preview
   ```
   - If local works, the issue is Cloudflare config
   - If local fails, fix the code first

4. **Redeploy:**
   - Push a new commit, or
   - Click "Retry deployment" in Cloudflare Pages

---

## Still Not Working?

If you've checked everything above and it still shows "Hello World":

1. **Delete and recreate the project:**
   - Note down all settings (env vars, custom domain, etc.)
   - Delete the Cloudflare Pages project
   - Create a new one with correct settings from the start

2. **Check if you're looking at the right URL:**
   - Make sure you're visiting the production URL, not a preview URL
   - Check Custom domains → make sure your domain is configured correctly

3. **Contact Cloudflare support:**
   - They can check if there's an issue on their end
   - Provide them with your deployment logs

---

## Common Error Messages

### "Build output directory not found"
- **Fix:** Set output directory to `dist` (exactly, no trailing slash)

### "Build command failed"
- **Fix:** Check build logs for specific errors
- Common causes: missing dependencies, Node version too old, syntax errors

### "No files found in build output"
- **Fix:** Verify build command is `npm run build` and it's actually running
- Check that Astro is building to `dist/` (check `astro.config.mjs`)

### "Framework preset mismatch"
- **Fix:** Set framework preset to `Astro` or `None`

# Fix: Can't Remove Deploy Command

If Cloudflare Pages won't let you remove the deploy command, use one of these workarounds:

## Workaround 1: Set Deploy Command to a No-Op

In Cloudflare Pages → Settings → Builds & deployments → **Deploy command**, set it to:

```bash
echo "Deployment handled automatically by Cloudflare Pages"
```

This runs a harmless command that does nothing, so Cloudflare will still deploy your `dist/` folder automatically.

## Workaround 2: Use a Comment-Only Command

Set the deploy command to:

```bash
# No deploy command needed - Cloudflare handles deployment automatically
```

Or simply:

```bash
true
```

(The `true` command always succeeds and does nothing)

## Workaround 3: Check Project Type

1. Go to Cloudflare Pages → your project → **Settings** → **General**
2. Check if the project type is set to "Workers" instead of "Pages"
3. If it's set to Workers, you may need to:
   - Create a new Pages project (not Workers)
   - Or change the project type if possible

## Workaround 4: Delete and Recreate Project

If nothing else works:

1. **Back up your settings:**
   - Note down your environment variables
   - Note down your custom domain settings
   - Note down your build settings

2. **Delete the project:**
   - Cloudflare Pages → your project → Settings → Delete project

3. **Create a new Pages project:**
   - Connect to the same Git repository
   - Configure build settings WITHOUT a deploy command
   - Restore environment variables and custom domain

## Why This Happens

Cloudflare Pages might:
- Auto-detect a deploy command from your repository
- Have a default deploy command that can't be cleared
- Be configured as a Workers project instead of Pages

The key is: **as long as your build command is `npm run build` and output directory is `dist`, Cloudflare will deploy automatically** - even if there's a deploy command set. The deploy command just won't be used for Git-based deployments.

## Verify It's Working

After setting a no-op deploy command:

1. Push a commit to your repo
2. Check Cloudflare Pages → Deployments
3. The build should succeed and deploy automatically
4. Your site should update

If the build still fails with the wrangler error, try Workaround 1 or 2 first.

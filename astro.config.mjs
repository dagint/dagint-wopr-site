import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    mdx(),
    sitemap({
      // Keep utility and duplicate pages out of the sitemap (/blog/page/1 duplicates /blog).
      filter: (page) => !/\/(contact\/thanks|404|500|blog\/page\/1)\/?$/.test(page),
    }),
    tailwind(),
  ],
  output: 'static',
  site: 'https://dagint.com',
  trailingSlash: 'never',
  // Performance optimizations
  compressHTML: true,
  build: {
    // Force inline all stylesheets to eliminate render-blocking CSS
    // This improves LCP by removing CSS from critical request chain
    inlineStylesheets: 'always',
    // Organize assets for better caching
    assets: '_assets',
    // Emit /contact.html rather than /contact/index.html so Cloudflare Pages serves /contact
    // directly, matching trailingSlash: 'never' and the canonical URLs (no 308 to /contact/).
    format: 'file',
  },
  vite: {
    build: {
      // Keep even small client scripts external for script-src CSP.
      assetsInlineLimit: 0,
      // Minify CSS to reduce file size
      cssMinify: true,
      // Use esbuild for faster minification
      minify: 'esbuild',
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Never inline small scripts: public/_headers' CSP has no 'unsafe-inline' or
      // hashes, so an inlined script is blocked. (Also stops tiny images becoming data: URIs.)
      assetsInlineLimit: 0,
    },
  },
});

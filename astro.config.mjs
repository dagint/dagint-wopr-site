import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [mdx(), sitemap(), tailwind()],
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
  },
  vite: {
    build: {
      // Minify CSS to reduce file size
      cssMinify: true,
      // Use esbuild for faster minification
      minify: 'esbuild',
      // Enable CSS code splitting
      cssCodeSplit: true,
    },
  },
});

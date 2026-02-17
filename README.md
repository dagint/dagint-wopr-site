# DaGint Computer Support Website

A modern, static website for DaGint Computer Support built with Astro, featuring a WOPR-inspired design theme.

## 🚀 Features

- **Static Site Generation** - Fast, SEO-friendly static site built with Astro
- **WOPR-Inspired Design** - Retro-futuristic aesthetic with blue accent colors and grid patterns
- **Blog System** - MDX-based blog with pagination
- **Contact Form** - Integrated contact form via Formspree
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **RSS Feed** - Automatic RSS feed generation for blog posts
- **Sitemap** - Auto-generated XML sitemap
- **Dark Mode Support** - Theme toggle for light/dark modes

## 🛠️ Tech Stack

- [Astro](https://astro.build/) - Static site framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [MDX](https://mdxjs.com/) - Markdown with JSX support for blog posts
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Cloudflare Pages](https://pages.cloudflare.com/) - Hosting and deployment

## 📋 Prerequisites

- Node.js 18+ (recommended: Node.js 20)
- npm or yarn

## 🏃 Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dagint-wopr-site

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

The development server will be available at `http://localhost:4321`

## 📁 Project Structure

```
dagint-wopr-site/
├── public/              # Static assets (images, favicons, etc.)
├── src/
│   ├── components/      # Reusable Astro components
│   ├── content/         # Blog posts and content collections
│   │   └── blog/        # MDX blog posts
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages (file-based routing)
│   └── styles/          # Global styles
├── docs/                # Documentation
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── wrangler.toml        # Cloudflare Pages configuration
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file (see `.env.example` for template):

```env
PUBLIC_FORMSPREE_FORM_ID=your_formspree_form_id
PUBLIC_CONTACT_EMAIL=your_email@example.com
PUBLIC_CONTACT_PHONE=your_phone_number
PUBLIC_SERVICE_AREA=Your Service Area (optional)
```

**Note:** All public environment variables must be prefixed with `PUBLIC_` to be accessible in Astro.

### Site Configuration

Edit `astro.config.mjs` to update:
- Site URL (`site` field)
- Integrations
- Build output settings

## 📝 Adding Blog Posts

1. Create a new `.mdx` file in `src/content/blog/`
2. Add frontmatter:

```mdx
---
title: Your Post Title
date: 2024-01-01
summary: A brief summary of your post
published: true
---

Your blog post content here...
```

3. The post will automatically appear in the blog listing and RSS feed

## 🚢 Deployment

### Cloudflare Pages (Recommended)

This site is configured for automatic deployment via Cloudflare Pages:

1. **Connect Repository:**
   - Go to Cloudflare Dashboard → Workers & Pages
   - Create a new project → Connect to Git
   - Select your repository

2. **Build Settings:**
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Deploy command:** Leave empty or set to `true`
   - **Node version:** `20` (or `18`)

3. **Environment Variables:**
   - Add all `PUBLIC_*` variables in Cloudflare Pages settings
   - Set for both Production and Preview environments

4. **Deploy:**
   - Push to `main` branch → automatic production deployment
   - Push to other branches → preview deployments

### Manual Deployment

```bash
# Build the site
npm run build

# Deploy using Wrangler
npx wrangler pages deploy dist --project-name=dagint-site
```

## 📚 Documentation

Additional documentation is available in the `docs/` directory:

- [Deployment Guide](docs/DEPLOYMENT.md) - Detailed deployment instructions
- [Environment Variables & Secrets](docs/ENV_AND_SECRETS.md) - Environment setup
- [Security Headers](docs/SECURITY_HEADERS.md) - Security configuration
- [Troubleshooting](docs/TROUBLESHOOTING.md) - Common issues and solutions

## 🐛 Troubleshooting

### Build Issues

- **"totalPages is not defined"** - Ensure all variables in `getStaticPaths` are defined within the function scope
- **Build fails locally** - Check Node version (should be 18+) and run `npm install`

### Deployment Issues

- **"Hello World" shows instead of site** - Verify "Build output directory" is set to `dist` in Cloudflare Pages settings
- **Deploy command errors** - Remove or set deploy command to `true` (not needed for Git-based deployments)

See [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) for more details.

## 📄 License

Copyright © 2024 DaGint Computer Support. All rights reserved.

## 🔗 Links

- **Live Site:** https://dagint.com
- **Documentation:** See `docs/` directory
- **Astro Docs:** https://docs.astro.build/

---

Built with ❤️ using [Astro](https://astro.build/)

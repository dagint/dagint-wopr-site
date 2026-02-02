/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-links': 'var(--wopr-secondary)',
            '--tw-prose-headings': 'var(--wopr-primary)',
            '--tw-prose-body': '#334155',
            '--tw-prose-bold': 'var(--wopr-primary)',
            '--tw-prose-counters': 'var(--wopr-secondary)',
            '--tw-prose-bullets': 'var(--wopr-secondary)',
          },
        },
      },
      colors: {
        primary: '#0A2540',
        secondary: '#1E40AF',
        accent: '#60A5FA',
        'accent-dim': '#3B82F6',
        surface: '#0f172a',
        'surface-light': '#1e293b',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'typing-caret': 'typing-caret 1s step-end infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(96, 165, 250, 0.4)' },
          '50%': { opacity: '0.9', boxShadow: '0 0 30px rgba(96, 165, 250, 0.6)' },
        },
        'typing-caret': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'wopr-grid': 'linear-gradient(rgba(10, 37, 64, 0.92), rgba(10, 37, 64, 0.92))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        page: 'var(--color-page-bg)',
        primary: 'var(--color-text)',
        excerpt: 'var(--color-excerpt)',
        meta: 'var(--color-meta)',
        'brand-red': 'var(--color-brand-red)',
        'brand-blue': 'var(--color-brand-blue)',
        'blue-tint': 'var(--color-blue-tint)',
        'pink-tint': 'var(--color-pink-tint)',
        ink: 'var(--color-ink)',
        ad: 'var(--color-ad-placeholder)',
        hairline: 'var(--color-hairline)',
        'input-border': 'var(--color-input-border)',
        chip: 'var(--color-chip-bg)',
        'chip-border': 'var(--color-chip-border)',
        'trending-num': 'var(--color-trending-numeral)',
      },
      fontFamily: {
        body: ['var(--font-body)'],
        headline: ['var(--font-headline)'],
      },
      maxWidth: {
        content: '1240px',
        container: '1240px',
        'reading-column': '720px',
      },
      lineHeight: {
        tightest: '1.2',
        headline: '1.35',
        body: '1.6',
        relaxed: '1.8',
      },
      fontSize: {
        'lead-headline': ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        'feature-headline': ['25px', { lineHeight: '1.35', fontWeight: '700' }],
        'card-headline': ['19px', { lineHeight: '1.4', fontWeight: '700' }],
        'compact-headline': ['15px', { lineHeight: '1.45', fontWeight: '700' }],
        'section-title': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        'nav-item': ['15px', { lineHeight: '1.2', fontWeight: '600' }],
        'meta-text': ['12px', { lineHeight: '1.3' }],
      },
    },
  },
  plugins: [],
};

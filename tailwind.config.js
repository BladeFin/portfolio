/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Design tokens — the actual values live as CSS variables at the top
        // of src/index.css. Edit them there to re-theme the whole site.
        background: 'rgb(var(--color-background) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-light': 'rgb(var(--color-primary-light) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
};

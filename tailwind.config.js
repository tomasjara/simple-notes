/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        theme: {
          bg: 'var(--color-bg)',
          fg: 'var(--color-fg)',
          'fg-muted': 'var(--color-fg-muted)',
          border: 'var(--color-border)',
          surface: 'var(--color-surface)',
        },
      },
    },
  },
  plugins: [],
}

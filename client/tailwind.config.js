module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: [
        'iA Writer Quattro S',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
      mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
    },

    extend: {
      colors: {
        custom: {
          accent: 'var(--color-accent)',
          light: 'var(--color-text-light)',
          'secondary-light': 'var(--color-text-secondary-light)',
          'bg-light': 'var(--color-background-light)',
          'heading-primary-light': 'var(--color-heading-primary-light)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

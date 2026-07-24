/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        xposed: {
          50: '#f0e7ff',
          100: '#d4bfff',
          200: '#b794ff',
          300: '#9a6aff',
          400: '#7c3fef',
          500: '#6d28d9',
          600: '#5b21b6',
          700: '#4c1d95',
          800: '#3b0764',
          900: '#1e0030',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(124, 63, 239, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(124, 63, 239, 0.8)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

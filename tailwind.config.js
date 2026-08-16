/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bengali: ['"Noto Sans Bengali"', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: 'var(--primary-color)',
          600: 'var(--primary-dark)',
          700: 'var(--primary-dark)',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(15, 23, 42, 0.08), 0 1px 4px -2px rgba(15, 23, 42, 0.06)',
        'card': '0 4px 16px -4px rgba(15, 23, 42, 0.1), 0 2px 6px -4px rgba(15, 23, 42, 0.06)',
        'glow': '0 0 0 1px rgba(14, 165, 233, 0.1), 0 8px 32px -8px rgba(14, 165, 233, 0.25)',
      }
    },
  },
  plugins: [],
}

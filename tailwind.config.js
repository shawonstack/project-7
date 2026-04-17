/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        brand: {
          dark: '#1a3a2e',
          DEFAULT: '#2d5a45',
          light: '#3d7a5e',
          pale: '#e8f5ee',
        }
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        keenkeeper: {
          "primary": "#2d5a45",
          "primary-content": "#ffffff",
          "secondary": "#6c63ff",
          "accent": "#f59e0b",
          "neutral": "#1a3a2e",
          "base-100": "#f8faf9",
          "base-200": "#edf2ef",
          "base-300": "#dce8e1",
          "base-content": "#1a2e24",
          "error": "#ef4444",
          "warning": "#f59e0b",
          "success": "#22c55e",
        },
      },
    ],
  },
}

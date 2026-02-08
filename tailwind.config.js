/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'matcha-dark': '#7C9A6E',
        'matcha-light': '#B4D4A0',
        'accent': '#D4A574',
        'warm': '#F2E8D0',
        'highlight': '#E8B4B8',
        'background': '#F7F5F0',
        'text-dark': '#4A4A3F',
      },
      fontFamily: {
        'sans': ['Quicksand', 'Nunito', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        'kawaii': '1.5rem',
      },
    },
  },
  plugins: [],
}

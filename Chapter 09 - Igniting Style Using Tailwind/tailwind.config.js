/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '-1px 4px 20px 14px rgba(0, 0, 0, 0.2)',
        'custom-light': '0px 4px 20px 14px rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        'custom-font': ['"Times New Roman"', 'sans-serif'],
      },
      colors: {
        'custom-darkest-blue': '#638889',
        'custom-green': '#9DBC98',
        'custom-beige': '#EBD9B4',
        'custom-light-beige': '#F9EFDB',
      },
    },
  },
  plugins: [],
}


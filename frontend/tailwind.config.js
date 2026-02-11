/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#f5f5f5',
        accent: '#FF6B35',
        orange: '#FF6B35',
        light: '#ffffff',
      },
    },
  },
  plugins: [],
}

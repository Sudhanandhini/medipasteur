/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT:'#384a72', 50:'#eef1f8', 100:'#d5dbed', 600:'#2d3c5c', 700:'#233047', 800:'#1a2438' },
        secondary: { DEFAULT:'#4e897d', 50:'#eef6f4', 100:'#d1e9e5', 600:'#3d6e63', 700:'#2f5550' }
      },
      fontFamily: { sans:['Plus Jakarta Sans','sans-serif'] }
    }
  },
  plugins: []
}

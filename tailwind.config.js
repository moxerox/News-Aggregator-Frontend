/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        news:'#FFF1C5'
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"), 
    require("daisyui")
  ],
}


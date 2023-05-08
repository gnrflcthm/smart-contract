/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx,ts,html}"],
  theme: {
    extend: {
      colors: {
        "primary": "#DA542B",
        "primary_bg": "#2B2727",
        "dark": "#141414",
        "light": "#7C7C7C"
      },
    },
  },
  plugins: [],
}


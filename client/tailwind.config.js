/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx,ts,html}"],
  theme: {
    extend: {
      colors: {
        "primary": "#C36E8E",
        "on_primary": "#181717",
        "light": "#EEEEEE"
      },
      fontFamily: {
        primetime: ['"PRIMETIME"', 'sans-serif']
      }
    },
  },
  plugins: [],
}


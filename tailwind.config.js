/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "inter": ["Inter", "system-ui"]
    },
    extend: {
      backgroundImage: {
        "background-image": "url('/images/background-image.png')"
      }
    },
  },
  plugins: [],
}

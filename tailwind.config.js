/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#408CFF",
        defaultGray: "#AAAAAA",
        lightGray: "#DDDDDD",
        neutral: "#BFBFBF",
        darkGray: "#D9D9D9"
      },
      flex: {
        '2': '1 1 45%'
      }
    },
  },
  plugins: [],
};

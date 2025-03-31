/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "a4-horizontal-w": "297mm",
        "a4-horizontal-h": "210mm",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-bg": "#f6f3ed",
        "custom-bg-2": "#E7E5D9",
        "custom-input": "#E8E6DB",
        "custom-btn": "#555E1E",
        "custom-btn-2": "#5F6921",
        "custom-btn-3": "#5E6821",
        "custom-btn-4": "#757C47",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

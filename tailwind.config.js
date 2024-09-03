/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#f6f3ed', // Add your custom color here
        'custom-btn': '#555E1E', // Add your custom color here
        'custom-btn-2': '#5F6921', // Add your custom color here
        'custom-btn-3': '#5E6821', // Add your custom color here
        'custom-btn-4': '#757C47', // Add your custom color here
      },
    },
  },
  plugins: [],
};

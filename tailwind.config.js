/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // ✅ Correct content path
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1077a0ff",     // Indigo-500
        secondary: "#5ed2d6ff",   // Indigo-600
      },
    },
  },
  plugins: [],
};

import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
 export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Ensures that Tailwind works on files containing the specified extensions
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}
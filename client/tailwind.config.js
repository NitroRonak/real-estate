/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-Bg': "url('D:/React Prac/real-state-project/client/src/assets/images/home.png')",
        'offer-Bg': "url('D:/React Prac/real-state/client/src/assets/images/offers.jpg')",
      }
    },
  },
  plugins: [],
}
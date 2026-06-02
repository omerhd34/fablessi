/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
  "./app/**/*.{js,jsx}",
  "./components/**/*.{js,jsx}",
  "./lib/**/*.{js,jsx}",
 ],
 theme: {
  screens: {
   sm: "40rem",
   md: "48rem",
   lg: "64rem",
   xl: "80rem",
   "2xl": "96rem",
  },
  extend: {
   fontFamily: {
    sans: ["var(--font-cinzel)", "ui-serif", "Georgia", "serif"],
    display: [
     "trajan-pro-3",
     "var(--font-cinzel)",
     "ui-serif",
     "Georgia",
     "serif",
    ],
    heading: [
     "trajan-pro-3",
     "var(--font-cinzel)",
     "ui-serif",
     "Georgia",
     "serif",
    ],
   },
   borderRadius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
    "2xl": "var(--radius-2xl)",
   },
   spacing: {
    section: "7rem",
    "section-sm": "5rem",
    container: "1.5rem",
   },
   maxWidth: {
    site: "1600px",
   },
   colors: {
    cream: "var(--cream)",
    sand: "var(--sand)",
    stone: "var(--stone)",
    charcoal: "var(--charcoal)",
   },
   letterSpacing: {
    brand: "0.35em",
    nav: "0.14em",
   },
  },
 },
 plugins: [],
};

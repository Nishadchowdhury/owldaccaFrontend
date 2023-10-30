/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        font: ['Tilt Neon', 'sans-serif']
      },
      colors: {
        primary: "#00FFFF",
        secondary: "#DE7230",
        background: "#040D21",
        malai: "#E6E392",
        black: "#05030F",
      },
      screens: {
        m2xl: { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        mxl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        mlg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        mmd: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        msm: { max: "639px" },
        // => @media (max-width: 639px) { ... }

        mxs: { max: "400px" },
        // => @media (max-width: 639px) { ... }
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("preline/plugin")],
};

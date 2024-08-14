module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "custom-md": "750px", // Custom breakpoint starting from 750px
        "lg-custom": "1030px", // Custom breakpoint at 1030px
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

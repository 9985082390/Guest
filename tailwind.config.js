// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6", // Blue-500

          dark: "#1D4ED8", // Blue-600

          light: "#93C5FD", // Blue-300
        },

        secondary: {
          DEFAULT: "#14B8A6", // Teal-500

          dark: "#0F766E", // Teal-600

          light: "#99F6E4", // Teal-300
        },

        accent: {
          DEFAULT: "#F59E0B", // Yellow-500

          dark: "#D97706", // Yellow-600

          light: "#FDE68A", // Yellow-300
        },

        neutral: {
          background: "#F3F4F6", // Gray-100

          card: "#FFFFFF", // White

          text: "#1F2937", // Gray-800

          secondaryText: "#4B5563", // Gray-600
        },

        error: {
          DEFAULT: "#EF4444", // Red-500

          dark: "#B91C1C", // Red-600

          light: "#FCA5A5", // Red-300
        },

        success: {
          DEFAULT: "#10B981", // Green-500

          dark: "#047857", // Green-600

          light: "#6EE7B7", // Green-300
        },

        info: {
          DEFAULT: "#60A5FA", // Blue-300

          dark: "#2563EB", // Blue-600

          light: "#BFDBFE", // Blue-200
        },
      },

      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
    },
  },

  variants: {},

  plugins: [],
};

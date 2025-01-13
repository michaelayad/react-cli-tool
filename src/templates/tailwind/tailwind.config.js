module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: "var(--primary)",
          secondary: "var(--secondary)",
          "primary-hover": "var(--primary-hover)",
          "secondary-hover": "var(--secondary-hover)",
          "primary-active": "var(--primary-active)",
          "secondary-active": "var(--secondary-active)",
          "primary-disabled": "var(--primary-disabled)",
          "secondary-disabled": "var(--secondary-disabled)",
        },
      },
    },
    plugins: [],
  };
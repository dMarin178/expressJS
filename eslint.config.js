// eslint.config.js
export default [
  {
    languageOptions: {
      ecmaVersion: 2022,
    },
    files: ["src/**/*.js"],
    rules: {
      semi: "error",
    },
    extends: ["eslint:recommended", "prettier"],
    rules: {
      "no-console": "warn"
    }
  },

];

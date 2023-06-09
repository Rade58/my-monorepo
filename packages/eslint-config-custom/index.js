module.exports = {
  extends: [
    "next", 
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "@remix-run/eslint-config/jest-testing-library",
    "turbo", 
    "prettier"
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
  /* parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  }, */
};

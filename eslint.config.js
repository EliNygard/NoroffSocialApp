// @ts-nocheck

import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    files: ["**/*.test.js"],
    languageOptions: { globals: globals.jest }, // Set Jest environment for test files
    plugins: {
      jest: pluginJest, // Add Jest plugin
    },
    rules: {
      ...pluginJest.configs.recommended.rules, // Extend Jest recommended rules
      "jest/prefer-expect-assertions": "off", // Example of disabling a specific rule
    },
  },
];

import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        React: "readonly",
      },
    },
    plugins: {
      "@next/next": nextPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      "react-hooks/exhaustive-deps": "off",
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^(NodeJS|other)$",
          ignoreRestSiblings: true,
          args: "none",
          caughtErrors: "none",
        },
      ],
      ...nextPlugin.configs.recommended.rules,
    },
  },
];

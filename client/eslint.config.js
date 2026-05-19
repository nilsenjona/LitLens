import globals from "globals";
import pluginReact from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { ignores: ["dist/**", "node_modules/**"] },
  { files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"], languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  {
    settings: { react: { version: "detect" } },
    rules: {
      "react/prop-types": "off",
    },
  },
  ...tseslint.configs.recommended.map(c => ({ ...c, files: ["**/*.{ts,tsx}"] })),
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
]);

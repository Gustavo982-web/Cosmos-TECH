import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.js"],

    languageOptions: {
      globals: {
        ...globals.node
      }
    },

    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "semi": ["error", "always"],
      "quotes": ["error", "double"]
    }
  }
]);
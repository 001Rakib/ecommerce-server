import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undef": "error",
    },
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended
);

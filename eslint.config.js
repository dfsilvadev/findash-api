import js from "@eslint/js";
import prettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist/", "coverage/", "src/generated/"]),

  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        projectService: { allowDefaultProject: ["prisma.config.ts"] },
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      // --- Higiene ---
      "no-console": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-var": "error",
      "prefer-const": "error",

      // --- Acesso ao ambiente centralizado ---
      "no-restricted-properties": [
        "error",
        {
          object: "process",
          property: "env",
          message: "Use o módulo src/config/env.ts"
        }
      ],

      // --- TypeScript ---
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error"
    }
  },

  // Exceções pontuais e explícitas
  {
    files: ["src/config/env.ts"],
    rules: { "no-restricted-properties": "off" }
  },
  { files: ["src/lib/logger.ts"], rules: { "no-console": "off" } },

  // Arquivos .js (como este) não estão no tsconfig: sem regras type-aware
  { files: ["**/*.js"], extends: [tseslint.configs.disableTypeChecked] },

  prettier // sempre por último, para desligar o que conflita
]);

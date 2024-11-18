import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import tsImport from "eslint-import-resolver-typescript";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: tsImport,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Módulos de Node.js
            "external", // Paquetes npm
            "internal", // Rutas alias (@/*)
            ["parent", "sibling"], // Importaciones relativas
            "index", // ./index
            "object", // import * as namespace
            "type", // import type { Type }
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
    "import/no-unresolved": "error",
    "import/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",
    "import/no-duplicates": "error",
    "import/newline-after-import": ["error", { count: 1 }],
    "import/no-cycle": "error",
    "import/first": "error",
    "@typescript-eslint/no-unused-vars": "warn",
  }
);

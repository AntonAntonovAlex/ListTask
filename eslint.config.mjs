import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser"; // Парсер для TypeScript
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').FlatConfig[]} */
export default [
  // Конфигурация для всех файлов JavaScript и TypeScript
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
      globals: globals.browser, // Добавляем глобальные переменные для браузера
    },
    plugins: {
      react: pluginReact,
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Рекомендуемые правила для JS
      ...tseslint.configs.recommended.rules, // Рекомендуемые правила для TypeScript
      ...pluginReact.configs.flat.recommended.rules, // Рекомендуемые правила для React

      // Отключаем требование импорта React для JSX
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect", // Автоматическое определение версии React
      },
    },
  },
];

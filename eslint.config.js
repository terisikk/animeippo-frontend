import js from "@eslint/js";
import react from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

export default [
    {
        ignores: ["dist/**", "build/**", "node_modules/**"],
    },
    js.configs.recommended,
    {
        files: ["**/*.{js,jsx}"],
        plugins: {
            react,
            "unused-imports": unusedImports,
            "simple-import-sort": simpleImportSort,
        },
        languageOptions: {
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: { jsx: true },
            },
            globals: {
                window: "readonly",
                document: "readonly",
                navigator: "readonly",
                console: "readonly",
                process: "readonly",
                localStorage: "readonly",
                URLSearchParams: "readonly",
                IntersectionObserver: "readonly"
            },
        },
        rules: {
            // React recommended rules
            "react/jsx-uses-react": "error",
            "react/jsx-uses-vars": "error",

            // Sort imports automatically
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",

            // Strip unused imports and variables on save/lint
            "no-unused-vars": "off",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],
        },
    },
];
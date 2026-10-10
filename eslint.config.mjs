import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import path from "node:path";

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    ignores: [
      "src/jobs/**",
      "src/app/\\[locale\\]/admin/**",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/jobs", "@/jobs/**"],
              message: "Job entry points may only be imported by jobs and admin code.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/app/\\[locale\\]/\\(public\\)/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/db/app", "@/db/app/**"],
              message: "Public routes must not import the app database client.",
            },
          ],
        },
      ],
    },
  },
];

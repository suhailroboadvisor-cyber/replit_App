import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const jobsRestriction = {
  group: ["@/jobs", "@/jobs/**", "**/jobs", "**/jobs/**"],
  message: "Job entry points may only be imported by jobs and admin code.",
};

const config = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      ".local/**",
      ".agents/**",
      "attached_assets/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    ignores: ["src/jobs/**", "src/app/\\[locale\\]/admin/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [jobsRestriction],
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
            jobsRestriction,
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

export default config;

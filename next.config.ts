import type { NextConfig } from "next";
import { execFileSync } from "node:child_process";
import createNextIntlPlugin from "next-intl/plugin";

function getGitSha() {
  const suppliedSha = process.env.GIT_SHA ?? process.env.GITHUB_SHA;
  if (suppliedSha) return suppliedSha;
  try {
    return execFileSync("git", ["rev-parse", "--short", "HEAD"], {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
  } catch {
    return "";
  }
}

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "127.0.0.1",
    ...(process.env.REPLIT_DEV_DOMAIN ? [process.env.REPLIT_DEV_DOMAIN] : []),
  ],
  output: "standalone",
  outputFileTracingIncludes: {"/terms":["./content/legal/*.md"],"/en/terms":["./content/legal/*.md"],"/privacy":["./content/legal/*.md"],"/en/privacy":["./content/legal/*.md"]},
  poweredByHeader: false,
  reactStrictMode: true,
  // D-19: keep classic ISR; Cache Components are not enabled in Phase 0.
  cacheComponents: false,
  experimental: { authInterrupts: true },
  env: { APP_GIT_SHA: getGitSha() },
};

export default createNextIntlPlugin("./src/i18n/request.ts")(nextConfig);

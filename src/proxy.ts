import createMiddleware from "next-intl/middleware";
import type { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

type Stage = (request: NextRequest) => NextResponse | undefined;
const localize = createMiddleware(routing);
// Composable entry point for later D-40/D-51 work. No auth or nonce here.
export function localizationChain(...stages: Stage[]) {
  return (request: NextRequest) => {
    for (const stage of stages) {
      const response = stage(request);
      if (response) return response;
    }
    return localize(request);
  };
}
export default localizationChain();
export const config = {
  matcher: ["/((?!api|_next|_vercel|icons|brand|.*\\..*).*)"],
};

import { describe, expect, it, vi } from "vitest";

const reads = vi.hoisted(() => ({ directory: vi.fn(), detail: vi.fn() }));
vi.mock("server-only", () => ({}));
vi.mock("../src/i18n/navigation", () => ({ Link: () => null }));
vi.mock("next-intl/server", () => ({ setRequestLocale: vi.fn() }));
vi.mock("../src/db/methodology-public", () => ({
  getPublicMethodologies: reads.directory,
  getPublicMethodology: reads.detail,
}));
import Directory, * as directoryRoute from "../src/app/[locale]/(public)/methodology/page";
import Detail, * as detailRoute from "../src/app/[locale]/(public)/methodology/[slug]/page";

describe("Public methodology classic ISR", () => {
  it.each(["ar", "en"])("propagates failed %s reads instead of returning a cacheable error page", async (locale) => {
    const outage = new Error("Synthetic database outage");
    reads.directory.mockRejectedValue(outage);
    reads.detail.mockRejectedValue(outage);
    // Repeat the requests: neither a first render nor revalidation may swallow
    // an outage into JSX that Next would treat as a successful cache entry.
    for (let attempt = 0; attempt < 2; attempt++) {
      await expect(Directory({ params: Promise.resolve({ locale }) })).rejects.toBe(outage);
      await expect(Detail({ params: Promise.resolve({ locale, slug: "sample" }) })).rejects.toBe(outage);
    }
  });

  it("retains classic ISR; only unknown detail slugs defer generation", async () => {
    for (const route of [directoryRoute, detailRoute]) {
      expect(route.revalidate).toBe(900);
      expect(route.dynamic).toBe("force-static");
    }
    expect(Object.hasOwn(directoryRoute, "generateStaticParams")).toBe(false);
    await expect(detailRoute.generateStaticParams()).resolves.toEqual([]);
  });
});

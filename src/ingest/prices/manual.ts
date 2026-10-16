import "server-only";
import { and, eq, gte, lte, asc } from "drizzle-orm";
import { dbApp } from "../../db/app";
import { priceBar } from "../../db/schema/market";

export interface PriceProvider {
  readonly name: string;
  readonly licenceNote: string;
  getCloses(securityId: string, from: string, to: string): Promise<(typeof priceBar.$inferSelect)[]>;
}
export const manualPriceProvider: PriceProvider = {
  name: "manual",
  licenceNote: "Analyst-entered closes with a source label and URL; no licensed market feed.",
  getCloses: (id, from, to) => dbApp.select().from(priceBar).where(and(
    eq(priceBar.security_id, id), gte(priceBar.date, from), lte(priceBar.date, to))).orderBy(asc(priceBar.date)),
};

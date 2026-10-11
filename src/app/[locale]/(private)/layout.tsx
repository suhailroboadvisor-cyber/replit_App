import { headers } from "next/headers";
import { LocaleDocument, documentMetadata } from "../../../components/foundation/LocaleDocument";
export const dynamic = "force-dynamic";
export const metadata = {...documentMetadata, robots:{index:false,follow:false}};
export default async function PrivateLayout({children,params}: {children:React.ReactNode;params:Promise<{locale:string}>}) {
  const {locale} = await params;
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return <LocaleDocument locale={locale} nonce={nonce}>{children}</LocaleDocument>;
}

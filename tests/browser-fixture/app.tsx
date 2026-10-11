import { createRoot } from "react-dom/client";
import { NextIntlClientProvider } from "next-intl";
import { AccountControl } from "../../src/components/accounts/AccountControl";
import { SignInScreen,ConsentScreen } from "../../src/components/accounts/AuthScreens";
import { MfaClientPanel } from "../../src/components/accounts/MfaScreens";
import { AccountScreen } from "../../src/components/accounts/AccountScreen";
import { fixture } from "./auth";
import en from "../../src/i18n/messages/en.json";
import ar from "../../src/i18n/messages/ar.json";
import { CURRENT_TERMS_VERSION,CURRENT_PRIVACY_VERSION } from "../../src/lib/auth/policies";
declare global {interface Window {fixture:typeof fixture}}
window.fixture=fixture;
const locale=window.location.pathname.startsWith("/en")?"en":"ar";
const mode=new URLSearchParams(window.location.search).get("screen")??"header";
const content=mode==="signin"?<SignInScreen locale={locale} valueStatement={locale==="en"?en.app.tagline:ar.app.tagline}/>:
  mode==="consent"?<ConsentScreen locale={locale} next="/account"/>:
  mode==="enroll"||mode==="verify"?<MfaClientPanel locale={locale} mode={mode} next="/done"/>:
  mode==="account"?<AccountScreen locale={locale} profile={{id:"fixture",full_name:"Fixture",email:null,role:new URLSearchParams(window.location.search).get("role")==="admin"?"admin":"user",locale_pref:"ar",terms_version:CURRENT_TERMS_VERSION,privacy_version:CURRENT_PRIVACY_VERSION,accepted_at:"2026-10-11T00:00:00Z"}} updateLocale={async()=>({ok:true})} deleteAccount={async()=>({ok:true})}/>:
  <AccountControl locale={locale}/>;
createRoot(document.getElementById("root")!).render(<NextIntlClientProvider locale={locale} messages={locale==="en"?en:ar} timeZone="UTC">{content}</NextIntlClientProvider>);

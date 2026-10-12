import type { ComponentProps } from "react";
export function Link({href,...props}:ComponentProps<"a">) {return <a href={typeof href==="string"?href:"/"} {...props}/>;}
export function useRouter(){return {
  refresh:()=>{},
  // Router stand-in records destinations without loading real protected routes.
  push:(url:string)=>window.history.pushState(null,"",`${window.location.pathname.startsWith("/en")?"/en":""}${url}`),
  replace:(url:string,{locale}:{locale:string})=>window.location.assign(new URL(`${locale==="en"?"/en":""}${url}`,window.location.origin).href),
};}
export function usePathname(){return window.location.pathname;}
export function getPathname({locale,href}:{locale:string;href:string}) {return `${locale==="en"?"/en":""}${href}`;}

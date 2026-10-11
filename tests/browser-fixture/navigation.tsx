import type { ComponentProps } from "react";
export function Link({href,...props}:ComponentProps<"a">) {return <a href={typeof href==="string"?href:"/"} {...props}/>;}
export function useRouter(){return {refresh:()=>{},push:(url:string)=>window.location.assign(url)};}
export function usePathname(){return window.location.pathname;}
export function getPathname({locale,href}:{locale:string;href:string}) {return `${locale==="en"?"/en":""}${href}`;}

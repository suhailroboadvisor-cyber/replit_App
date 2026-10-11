// D-22/D-40: separate fixed string so a future CSP hash can be computed.
// No request nonce, cookie, system-theme detection or server personalization.
export const THEME_SCRIPT =
  'try{var t=localStorage.getItem("suhail-theme");if(t==="light"||t==="dark"){document.documentElement.classList.toggle("dark",t==="dark")}}catch{}';

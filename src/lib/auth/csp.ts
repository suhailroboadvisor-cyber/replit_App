export function privateCsp(nonce:string,url:string|undefined,development:boolean) {
  const connect=url?new URL(url).origin:"";
  // D-40 strict script nonce; inline styles retained for framework style attributes.
  return `default-src 'self'; script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${development?" 'unsafe-eval'":""}; style-src 'self' 'unsafe-inline'; connect-src 'self' ${connect}${development?" ws: wss:":""}; img-src 'self' data:; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`;
}

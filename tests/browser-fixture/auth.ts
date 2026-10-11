import type { AuthSession } from "../../src/components/accounts/types";
const listeners=new Set<(event:string,session:AuthSession|null)=>void>();
let session:AuthSession|null=null;
const mfaState={verified:false};
export const fixture={
  session(value:AuthSession|null) {
    session=value;
    document.cookie=`fixture-user=${value?.user.id??""}; Path=/; SameSite=Lax`;
    for(const listener of listeners) listener(value?"SIGNED_IN":"SIGNED_OUT",value);
  },
};
const client={auth:{
  getSession:async()=>({data:{session}}),
  onAuthStateChange(callback:(event:string,session:AuthSession|null)=>void) {listeners.add(callback);return {data:{subscription:{unsubscribe:()=>listeners.delete(callback)}}};},
  signOut:async()=>{fixture.session(null);return {error:null};},
  mfa:{
    enroll:async()=>({data:{id:"factor-fixture",totp:{qr_code:"data:image/svg+xml;utf-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='160'%20height='160'%3E%3Crect%20width='160'%20height='160'%20fill='white'/%3E%3C/svg%3E",secret:"FIXTURESETUPKEY",uri:"otpauth://totp/fixture"}},error:null}),
    challengeAndVerify:async({code}:{code:string})=>{
      mfaState.verified=code==="123456";
      return {data:{},error:mfaState.verified?null:{message:"invalid fixture code"}};
    },
    listFactors:async()=>({data:{all:[],totp:[{id:"factor-fixture",factor_type:"totp",status:"verified"}],phone:[]},error:null}),
    getAuthenticatorAssuranceLevel:async()=>({data:{currentLevel:mfaState.verified?"aal2":"aal1",nextLevel:"aal2"},error:null}),
  },
}};
export function createBrowserAuth(){return client;}

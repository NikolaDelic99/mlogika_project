import{h as n,n as o}from"./chunk-RDZLLZJG.js";import{$ as c,ea as i}from"./chunk-LDMTKLXK.js";var h=(()=>{class e{constructor(t){this.http=t,this.baseUrl=o.protocol+"//"+o.host+"/"+o.root}getAccounts(){return this.http.get(this.baseUrl+"/getAccounts")}deleteAccount(t){return this.http.post(this.baseUrl+"/deleteAccount",{id:t.toString()})}getAccount(t){let r=`${this.baseUrl+"/getAccount"}/${t}`;return this.http.get(r)}updateAccount(t){return this.http.post(this.baseUrl+"/updateAccount",t)}static{this.\u0275fac=function(r){return new(r||e)(i(n))}}static{this.\u0275prov=c({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();export{h as a};

import{r as e,c as t,o as a,a as o,b as n,F as s,d as r,p as c,e as l,t as i,w as u,f as d,g,h as p,C as m,i as b,S as v,j as f,k as h,l as w,m as _}from"./vendor.97125de4.js";const y=e({user:{},account:{},notes:{},bugs:[],bugCopy:{}});const E={name:"App",setup:()=>({appState:t((()=>y))})},T=n("footer",null,[n("div",{class:"bg-nav text-light text-center p-4"})],-1);function A(e){let t="";const a=e.split("T")[0].split("-");return t=a[1]+"-"+a[2]+"-"+a[0],t}E.render=function(e,t,c,l,i,u){const d=r("Navbar"),g=r("router-view");return a(),o(s,null,[n("header",null,[n(d)]),n("main",null,[n(g)]),T],64)};const C={name:"BugCard",props:{bug:{type:Object,required:!0}},setup:a=>({state:e({color:t((()=>a.bug.closed))}),dateFormatter:A})},k=u("data-v-6800a114");c("data-v-6800a114");const x={class:"col-md-3"},O={class:"m-0"},P={class:"col-md-3"},B={class:"col-md-3"},N={key:0,class:"col-md-3 d-flex align-items-center"},I=n("p",null,"Closed:  ",-1),S=n("i",{class:"fas fa-circle red"},null,-1),R={key:1,class:"col-md-3 d-flex align-items-center"},j=n("p",null,"Open:  ",-1),D=n("i",{class:"fas fa-circle green"},null,-1);l();const L=k(((e,t,s,c,l,u)=>{const d=r("router-link");return a(),o(d,{to:{name:"BugDetails",params:{id:s.bug.id}},class:"BugCard flex-grow-1 d-flex flex-row border border-dark justify-content-center"},{default:k((()=>[n("div",x,[n("p",O,[n("b",null,i(s.bug.title),1)])]),n("div",P,[n("p",null,i(s.bug.creator.name),1)]),n("div",B,[n("p",null,i(c.dateFormatter(s.bug.createdAt)),1)]),c.state.color?(a(),o("div",N,[I,S])):(a(),o("div",R,[j,D]))])),_:1},8,["to"])}));C.render=L,C.__scopeId="data-v-6800a114";var U=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:C});const $=window.location.origin.includes("localhost"),V=$?"http://localhost:3000":"";let Y;const z={},M=function(e,t){if(!t||0===t.length)return e();if(void 0===Y){const e=document.createElement("link").relList;Y=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in z)return;z[e]=!0;const t=e.endsWith(".css"),a=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${a}`))return;const o=document.createElement("link");return o.rel=t?"stylesheet":Y,t||(o.as="script",o.crossOrigin=""),o.href=e,document.head.appendChild(o),t?new Promise(((e,t)=>{o.addEventListener("load",e),o.addEventListener("error",t)})):void 0}))).then((()=>e()))};function W(e){return()=>function(e){switch(e){case"./pages/AboutPage.vue":return M((()=>import("./AboutPage.c322d42e.js")),["/assets/AboutPage.c322d42e.js","/assets/vendor.97125de4.js"]);case"./pages/AccountPage.vue":return M((()=>import("./AccountPage.bd1d5638.js")),["/assets/AccountPage.bd1d5638.js","/assets/AccountPage.f3fa63f7.css","/assets/vendor.97125de4.js"]);case"./pages/BugDetailsPage.vue":return M((()=>import("./BugDetailsPage.84a69421.js")),["/assets/BugDetailsPage.84a69421.js","/assets/BugDetailsPage.dfad1417.css","/assets/vendor.97125de4.js","/assets/BugsService.50111d0d.js"]);case"./pages/BugPage.vue":return M((()=>import("./BugPage.07aad843.js")),["/assets/BugPage.07aad843.js","/assets/BugPage.c908e9b7.css","/assets/vendor.97125de4.js","/assets/BugsService.50111d0d.js"]);default:return Promise.reject(new Error("Unknown variable dynamic import: "+e))}}(`./pages/${e}.vue`)}const q=[{path:"/",name:"BugPage",component:W("BugPage")},{path:"/about",name:"About",component:W("AboutPage")},{path:"/bug/:id",name:"BugDetails",component:W("BugDetailsPage")},{path:"/account",name:"Account",component:W("AccountPage"),beforeEnter:p}],H=d({linkActiveClass:"router-link-active",linkExactActiveClass:"router-link-exact-active",history:g(),routes:q});function K(e,t){if($)console[e](`[${e}] :: ${(new Date).toLocaleTimeString()} :: `,...t);else{switch(e){case"log":case"assert":return}console[e](`[${e}] :: ${(new Date).toLocaleTimeString()} :: `,...t)}}const F={log(){K("log",arguments)},error(){K("error",arguments)},warn(){K("warn",arguments)},assert(){K("assert",arguments)},trace(){K("trace",arguments)}},G=m.create({baseURL:V,timeout:8e3});const J=new class{async getAccount(){try{const e=await G.get("/account");y.account=e.data}catch(e){F.error("HAVE YOU STARTED YOUR SERVER YET???",e)}}};let Q=!1,X=[];const Z="connected",ee="authenticate",te="authenticated",ae="error";class oe{static async confirm(e="Are you sure?",t="You won't be able to revert this!",a="warning",o="Yes, delete it!"){try{return!!(await v.fire({title:e,text:t,icon:a,showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:o})).isConfirmed}catch(n){return!1}}static toast(e="Warning!",t="warning",a="top-end",o=3e3,n=!0){v.fire({title:e,icon:t,position:a,timer:o,timerProgressBar:n,toast:!0,showConfirmButton:!1})}}const ne=new class extends class{constructor(e=V){this.socket=b(e||V),this.on(Z,this.onConnected).on(te,this.onAuthenticated).on(ae,this.onError)}on(e,t){return this.socket.on(e,t.bind(this)),this}onConnected(e){F.log("[SOCKET_CONNECTION]",e),Q=!0}onAuthenticated(e){F.log("[SOCKET_AUTHENTICATED]",e);const t=[...X];X=[],t.forEach((e=>{this.emit(e.action,e.payload)}))}authenticate(e){this.socket.emit(ee,e)}onError(e){F.error("[SOCKET_ERROR]",e)}emit(e,t){if(!Q)return F.log("[ENQUEING_ACTION]",{action:e,payload:t}),X.push({action:e,payload:t});this.socket.emit(e,t)}}{constructor(){super(),this.on("error",this.onError)}onError(e){F.error("[SOCKET_ERROR]",e),oe.toast(e.message,"error")}},se=f({domain:"dev-4ed7g57f.us.auth0.com",clientId:"lz3uNkcMf4MPTBYsbvx2vtsWA7TYU4Jl",audience:"https://bug-logger.com",useRefreshTokens:!0,onRedirectCallback:e=>{H.push(e&&e.targetUrl?e.targetUrl:window.location.pathname)}});async function re(e){if(!se.isAuthenticated)return e;const t=1e3*se.identity.exp,a=t<Date.now(),o=t<Date.now()+432e5;return a?await se.loginWithPopup():o&&(await se.getTokenSilently(),G.defaults.headers.authorization=se.bearer,ne.authenticate(se.bearer)),e}se.on(se.AUTH_EVENTS.AUTHENTICATED,(async function(){G.defaults.headers.authorization=se.bearer,G.interceptors.request.use(re),y.user=se.user,await J.getAccount(),ne.authenticate(se.bearer)}));const ce={setup:()=>({state:e({dropOpen:!1}),user:t((()=>y.user)),async login(){se.loginWithPopup()},async logout(){se.logout({returnTo:window.location.origin})}})},le=u("data-v-9139b850");c("data-v-9139b850");const ie={class:"navbar navbar-expand-lg navbar-dark bg-nav"},ue=n("div",{class:"d-flex flex-row align-items-center"},[n("i",{class:"fas fa-bug"}),h("   "),n("h4",{class:"logo-text"}," Bugs-List ")],-1),de=n("button",{class:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarText","aria-controls":"navbarText","aria-expanded":"false","aria-label":"Toggle navigation"},[n("span",{class:"navbar-toggler-icon"})],-1),ge={class:"collapse navbar-collapse",id:"navbarText"},pe={class:"navbar-nav mr-auto"},me={class:"nav-item"},be=h(" Bugs "),ve={class:"navbar-text"},fe={key:1,class:"dropdown"},he={class:"mx-3"},we=n("div",{class:"list-group-item list-group-item-action hoverable"}," Account ",-1);l();const _e=le(((e,t,s,c,l,u)=>{const d=r("router-link");return a(),o("nav",ie,[n(d,{class:"navbar-brand d-flex",to:{name:"BugPage"}},{default:le((()=>[ue])),_:1}),de,n("div",ge,[n("ul",pe,[n("li",me,[n(d,{to:{name:"BugPage"},class:"nav-link text-light"},{default:le((()=>[be])),_:1})])]),n("span",ve,[c.user.isAuthenticated?(a(),o("div",fe,[n("div",{class:"dropdown-toggle",onClick:t[2]||(t[2]=e=>c.state.dropOpen=!c.state.dropOpen)},[n("img",{src:c.user.picture,alt:"user photo",height:"40",class:"rounded"},null,8,["src"]),n("span",he,i(c.user.name),1)]),n("div",{class:["dropdown-menu p-0 list-group w-100",{show:c.state.dropOpen}],onClick:t[4]||(t[4]=e=>c.state.dropOpen=!1)},[n(d,{to:{name:"Account"}},{default:le((()=>[we])),_:1}),n("div",{class:"list-group-item list-group-item-action hoverable",onClick:t[3]||(t[3]=(...e)=>c.logout&&c.logout(...e))}," logout ")],2)])):(a(),o("button",{key:0,class:"btn btn-outline-primary text-uppercase",onClick:t[1]||(t[1]=(...e)=>c.login&&c.login(...e))}," Login "))])])])}));ce.render=_e,ce.__scopeId="data-v-9139b850";var ye=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:ce});const Ee=new class{async getAllNotes(e={}){const t=await G.get("api/notes");y.bugs=t.data}async createNote(e){const t=await G.post("api/notes",e);y.notes[t.data.bugId].push(t.data)}async editNote(e){const t=await G.post("api/notes/"+e.id,e);y.notes[t.data.bugId].push(t.data)}async removeNote(e){const t=await G.delete("api/notes/"+e),a=y.notes[t.data.bugId];y.notes[t.data.bugId]=a.filter((t=>t.id!==e))}};const Te={name:"NoteCard",props:{note:{type:Object,required:!0}},setup:a=>({state:e({isCreator:t((()=>a.note.creatorId===y.account.id))}),async removeNote(){try{await oe.confirm()&&(await Ee.removeNote(a.note.id),oe.toast("Removed Message!","success"))}catch(e){oe.toast(e,"error")}}})},Ae=u("data-v-a74489ec");c("data-v-a74489ec");const Ce={class:"NoteCard row d-flex flex-column m-0 border border-dark"},ke={class:"col-md-12 p-0"},xe={class:"row m-0"},Oe={class:"col-md-4 d-flex bg-yellow border border-dark justify-content-start align-items-center"},Pe={key:0,class:"col-md-1 p-0 bg-pencil\r\n                    d-flex justify-content-center align-items-center border border-dark bg-red"},Be={class:"col-md-10 pt-2 text-left"};l();const Ne=Ae(((e,t,s,r,c,l)=>(a(),o("div",Ce,[n("div",ke,[n("div",xe,[n("div",Oe,[n("img",{src:s.note.creator.picture,alt:"account-pic",class:"w-25"},null,8,["src"]),n("h6",null,i(s.note.creator.name),1)]),r.state.isCreator?(a(),o("div",Pe,[n("i",{class:"far fa-2x fa-times-circle action",onClick:t[1]||(t[1]=(...e)=>r.removeNote&&r.removeNote(...e))})])):w("",!0)])]),n("div",Be,[n("p",null,i(s.note.body),1)])]))));Te.render=Ne,Te.__scopeId="data-v-a74489ec";var Ie=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Te});const Se=_(E);!function(e){const t={"./components/BugCard.vue":U,"./components/Navbar.vue":ye,"./components/NoteCard.vue":Ie};Object.entries(t).forEach((([t,a])=>{const o=a.name||t.substr(t.lastIndexOf("/")+1).replace(/\.\w+$/,"");e.component(o,a.default)}))}(Se),Se.use(H).mount("#app");export{y as A,oe as P,G as a,A as d,Ee as n};
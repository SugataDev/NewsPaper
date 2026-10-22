import{p as y,o as m,k as p,j as e,L as r,O as g}from"./index-BhLxxkqj.js";import{E as b}from"./external-link-DeceHU03.js";import{c as t}from"./createLucideIcon-DQGcZsnY.js";import{F as u}from"./file-text-BJ4vS99F.js";/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=t("CirclePlus",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=t("FolderTree",[["path",{d:"M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",key:"hod4my"}],["path",{d:"M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",key:"w4yl2u"}],["path",{d:"M3 5a2 2 0 0 0 2 2h3",key:"f2jnh7"}],["path",{d:"M3 3v13a2 2 0 0 0 2 2h3",key:"k8epm1"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=t("Hash",[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=t("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=t("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=t("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);function H(){const{user:s,loading:l,logout:i}=y(),n=m(),c=p();if(l)return e.jsx("div",{className:"p-8 text-center text-sm",children:"যাচাই করা হচ্ছে..."});if(!s||!["admin","editor","reporter"].includes(s.role))return e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-50 p-4",children:e.jsxs("div",{className:"bg-white p-8 border border-hairline text-center max-w-sm",children:[e.jsx("h3",{className:"font-bold text-lg mb-2",children:"অনুমতি প্রয়োজন"}),e.jsx("p",{className:"text-xs text-gray-600 mb-4",children:"অ্যাডমিন প্যানেল ব্যবহারের জন্য আপনার অনুমতি নেই। অনুগ্রহ করে লগইন করুন।"}),e.jsx(r,{to:"/login",className:"px-4 py-2 bg-brand-red text-white text-xs font-semibold rounded inline-block",children:"লগইন পেজে যান"})]})});const x=async()=>{await i(),c("/")},o=[{label:"ড্যাশবোর্ড",path:"/admin",icon:v,exact:!0},{label:"সংবাদ তালিকা",path:"/admin/articles",icon:u,exact:!0},{label:"নতুন সংবাদ",path:"/admin/articles/new",icon:f},{label:"বিভাগসমূহ",path:"/admin/categories",icon:j},{label:"আলোচিত বিষয়",path:"/admin/topics",icon:k},{label:"বিজ্ঞাপন স্লট",path:"/admin/ads",icon:N}];return e.jsxs("div",{className:"min-h-screen bg-[#F4F5F7] flex flex-col font-body text-primary",children:[e.jsxs("header",{className:"h-14 bg-white border-b border-hairline px-6 flex items-center justify-between sticky top-0 z-30",children:[e.jsx("div",{className:"flex items-center gap-4",children:e.jsxs(r,{to:"/",className:"flex items-center gap-1 font-headline text-xl font-bold",children:[e.jsx("span",{className:"text-primary",children:"খবর"}),e.jsx("span",{className:"text-brand-red",children:"ঘর"}),e.jsx("span",{className:"text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600 font-normal",children:"CMS"})]})}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs(r,{to:"/",target:"_blank",className:"text-xs text-gray-600 hover:text-brand-red flex items-center gap-1",children:[e.jsx("span",{children:"লাইভ সাইট দেখুন"}),e.jsx(b,{className:"w-3 h-3"})]}),e.jsx("div",{className:"h-4 w-px bg-gray-300"}),e.jsxs("span",{className:"text-xs font-semibold text-gray-800",children:[s.name," (",s.role,")"]}),e.jsxs("button",{onClick:x,className:"text-xs text-red-600 hover:underline flex items-center gap-1",children:[e.jsx(w,{className:"w-3.5 h-3.5"}),"লগআউট"]})]})]}),e.jsxs("div",{className:"flex-1 flex",children:[e.jsxs("aside",{className:"w-56 bg-white border-r border-hairline py-4 flex flex-col justify-between",children:[e.jsx("nav",{className:"space-y-0.5 px-3",children:o.map(a=>{const d=a.exact?n.pathname===a.path:n.pathname.startsWith(a.path),h=a.icon;return e.jsxs(r,{to:a.path,className:`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded transition-colors ${d?"bg-brand-red text-white":"text-gray-700 hover:bg-gray-100"}`,children:[e.jsx(h,{className:"w-4 h-4"}),e.jsx("span",{children:a.label})]},a.path)})}),e.jsx("div",{className:"px-6 py-2 text-[11px] text-gray-400",children:"খবরঘর সংস্করণ ২.০"})]}),e.jsx("main",{className:"flex-1 p-6 overflow-y-auto",children:e.jsx(g,{})})]})]})}export{H as default};

import{g as r,j as a}from"./index-BhLxxkqj.js";function h(e=""){return`data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <rect width="600" height="400" fill="#F0F2F5" />
      <rect x="230" y="145" width="140" height="95" rx="6" fill="#DDE1E6" />
      <circle cx="300" cy="192" r="28" fill="#F0F2F5" />
      <circle cx="300" cy="192" r="18" fill="#B4BAC3" />
      <polygon points="280,145 290,135 320,135 330,145" fill="#DDE1E6" />
      <circle cx="350" cy="160" r="5" fill="#B4BAC3" />
      <text x="300" y="275" font-family="'Hind Siliguri', 'Noto Sans Bengali', sans-serif" font-size="14" font-weight="600" fill="#666666" text-anchor="middle">খবরঘর আলোকচিত্র</text>
    </svg>
  `)}`}function u({src:e,alt:l="",className:s="",aspectRatio:c="aspect-[3/2]",priority:n=!1}){const t=h(l||"khaborghor"),[g,o]=r.useState(e||t),[f,i]=r.useState(!1);r.useEffect(()=>{e?(o(e),i(!1)):(o(t),i(!0))},[e,t]);const d=()=>{o(t),i(!0)};return a.jsx("div",{className:`overflow-hidden ${c} relative flex-shrink-0 bg-cover bg-center bg-[#E5E5E5]`,style:{backgroundImage:`url("${t}")`},children:a.jsx("img",{src:g,alt:l,loading:n?"eager":"lazy",decoding:"async",onLoad:()=>i(!0),onError:d,className:`w-full h-full object-cover transition-opacity duration-300 ${f?"opacity-100":"opacity-0"} ${s}`})})}export{u as L};

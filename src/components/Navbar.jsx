import { useNavigate, useLocation } from "react-router-dom";
const F = "Plus Jakarta Sans, sans-serif";
const NAV = [
  {path:"/", es:"Inicio", en:"Home"},
  {path:"/tools", es:"Herramientas", en:"Tools"},
  {path:"/recipe", es:"Recetas", en:"Recipes"},
  {path:"/conditions", es:"Condiciones", en:"Conditions"},
  {path:"/blog", es:"Blog", en:"Blog"},
  {path:"/about", es:"Nosotros", en:"About"},
];
export default function Navbar({lang, setLang}) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div style={{background:"#1E2D4E", padding:"0 32px", height:52, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100}}>
      <div style={{display:"flex", alignItems:"center", gap:6, cursor:"pointer"}} onClick={()=>navigate("/")}>
        <div style={{width:8, height:8, borderRadius:"50%", background:"#2A9D8F"}}/>
        <span style={{fontSize:15, fontWeight:500, color:"#fff", fontFamily:F}}>nutrionally</span>
      </div>
      <div style={{display:"flex", gap:20}}>
        {NAV.map(n=>(
          <span key={n.path} onClick={()=>navigate(n.path)} style={{fontSize:12, color: location.pathname===n.path?"#fff":"#93C5FD", cursor:"pointer", fontFamily:F, fontWeight: location.pathname===n.path?500:400}}>
            {lang==="ES"?n.es:n.en}
          </span>
        ))}
      </div>
      <div style={{display:"flex", gap:8, alignItems:"center"}}>
        {["ES","EN"].map(l=>(
          <span key={l} onClick={()=>setLang(l)} style={{fontSize:11, padding:"3px 8px", borderRadius:4, border: lang===l?"none":"0.5px solid #3A5BA0", background: lang===l?"#2563EB":"transparent", color: lang===l?"#fff":"#93C5FD", cursor:"pointer", fontFamily:F}}>
            {l}
          </span>
        ))}
        <a href="https://learn.nutrionally.com" target="_blank" rel="noopener noreferrer" style={{fontSize:11, padding:"4px 12px", borderRadius:6, background:"#2A9D8F", color:"#fff", textDecoration:"none", fontFamily:F, fontWeight:500, marginLeft:8}}>
          {lang==="ES"?"Calculadora →":"Calculator →"}
        </a>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
const F = "Plus Jakarta Sans, sans-serif";
export default function Footer({lang}) {
  const navigate = useNavigate();
  const isES = lang === "ES";
  return (
    <div style={{background:"#162338", padding:"28px 32px"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16}}>
        <div style={{display:"flex", alignItems:"center", gap:6}}>
          <div style={{width:8, height:8, borderRadius:"50%", background:"#2A9D8F"}}/>
          <span style={{fontSize:14, fontWeight:500, color:"#fff", fontFamily:F}}>nutrionally</span>
        </div>
        <div style={{display:"flex", gap:20}}>
          {[
            {path:"/tools", es:"Herramientas", en:"Tools"},
            {path:"/conditions", es:"Condiciones", en:"Conditions"},
            {path:"/resources", es:"Recursos", en:"Resources"},
            {path:"/blog", es:"Blog", en:"Blog"},
          ].map(l=>(
            <span key={l.path} onClick={()=>navigate(l.path)} style={{fontSize:12, color:"#93C5FD", cursor:"pointer", fontFamily:F}}>
              {isES?l.es:l.en}
            </span>
          ))}
        </div>
      </div>
      <div style={{height:"0.5px", background:"#2D4270", marginBottom:16}}/>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <span style={{fontSize:11, color:"#3A5BA0", fontFamily:F}}>
          © 2025 nutrionally · {isES?"Todos los derechos reservados":"All rights reserved"}
        </span>
        <div style={{display:"flex", gap:16}}>
          {["Privacidad","Términos","Contacto"].map(l=>(
            <span key={l} style={{fontSize:11, color:"#3A5BA0", cursor:"pointer", fontFamily:F}}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

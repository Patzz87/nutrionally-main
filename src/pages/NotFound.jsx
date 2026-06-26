const F = "Plus Jakarta Sans, sans-serif";
const TEAL = "#2A9D8F";
const NAVY = "#1E2D4E";

export default function NotFound({lang}) {
  const isES = lang === "ES";
  return (
    <div style={{minHeight:"60vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 32px",textAlign:"center"}}>
      <div style={{fontSize:72,fontWeight:600,color:"#D4E3FF",fontFamily:F,marginBottom:8}}>404</div>
      <div style={{fontSize:22,fontWeight:500,color:NAVY,marginBottom:12,fontFamily:F}}>{isES?"Página no encontrada":"Page not found"}</div>
      <div style={{fontSize:14,color:"#3A5BA0",marginBottom:32,fontFamily:F,maxWidth:400,lineHeight:1.6}}>{isES?"La página que buscas no existe o fue movida. Vuelve al inicio o explora nuestras herramientas.":"The page you are looking for does not exist or was moved. Go back home or explore our tools."}</div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
        <a href="/" style={{padding:"10px 24px",borderRadius:8,background:NAVY,color:"#E2E8F0",textDecoration:"none",fontSize:13,fontWeight:500,fontFamily:F}}>{isES?"Ir al inicio":"Go home"}</a>
        <a href="/tools" style={{padding:"10px 24px",borderRadius:8,background:"#EFF6FF",color:"#2563EB",textDecoration:"none",fontSize:13,fontWeight:500,fontFamily:F}}>{isES?"Ver calculadoras":"See calculators"}</a>
        <a href="/conditions" style={{padding:"10px 24px",borderRadius:8,background:"#E1F5EE",color:"#0F6E56",textDecoration:"none",fontSize:13,fontWeight:500,fontFamily:F}}>{isES?"Ver condiciones":"See conditions"}</a>
      </div>
    </div>
  );
}

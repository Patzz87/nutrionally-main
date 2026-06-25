const F = "Plus Jakarta Sans, sans-serif";
const TEAL = "#2A9D8F";
const NAVY = "#1E2D4E";
export default function Blog({lang}) {
  const isES = lang === "ES";
  return (
    <div style={{padding:"40px 32px", maxWidth:800, margin:"0 auto"}}>
      <div style={{fontSize:11, fontWeight:500, color:TEAL, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6, fontFamily:F}}>Blog</div>
      <div style={{fontSize:26, fontWeight:500, color:NAVY, marginBottom:6, fontFamily:F}}>{isES?"Articulos de nutricion":"Nutrition articles"}</div>
      <div style={{fontSize:13, color:"#3A5BA0", marginBottom:32, fontFamily:F}}>{isES?"Informacion clinica basada en evidencia.":"Evidence-based clinical information."}</div>
      <div style={{background:"#fff", border:"0.5px solid #D4E3FF", borderRadius:12, padding:32, textAlign:"center"}}>
        <div style={{fontSize:15, fontWeight:500, color:NAVY, marginBottom:8, fontFamily:F}}>{isES?"Proximamente":"Coming soon"}</div>
        <div style={{fontSize:13, color:"#3A5BA0", fontFamily:F}}>{isES?"Estamos preparando articulos sobre nutricion clinica.":"We are preparing articles on clinical nutrition."}</div>
      </div>
    </div>
  );
}
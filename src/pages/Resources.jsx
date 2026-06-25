const F = "Plus Jakarta Sans, sans-serif";
const TEAL = "#2A9D8F";
const NAVY = "#1E2D4E";
const RESOURCES = [
  {price:"$7", name_es:"Guía de índice glucémico", name_en:"Glycemic index guide", desc_es:"Tablas completas de IG por categoría de alimentos con recomendaciones para DM2.", desc_en:"Complete GI tables by food category with DM2 recommendations.", url:"#"},
  {price:"$9", name_es:"Manual de intercambios INCAP", name_en:"INCAP exchange manual", desc_es:"Referencia completa de grupos alimentarios con valores por intercambio.", desc_en:"Complete food groups reference with values per exchange.", url:"#"},
  {price:"$12", name_es:"Guía nutricional para hipertensión", name_en:"Hypertension nutrition guide", desc_es:"Dieta DASH, restricción de sodio y alimentos recomendados.", desc_en:"DASH diet, sodium restriction and recommended foods.", url:"#"},
  {price:"$12", name_es:"Guía nutricional para DM2", name_en:"DM2 nutrition guide", desc_es:"Control glucémico, distribución de carbohidratos y planificación de comidas.", desc_en:"Glycemic control, carbohydrate distribution and meal planning.", url:"#"},
  {price:"$15", name_es:"Casos clínicos resueltos", name_en:"Solved clinical cases", desc_es:"10 casos clínicos completos con cálculos paso a paso y planes de alimentación.", desc_en:"10 complete clinical cases with step-by-step calculations and meal plans.", url:"#"},
  {price:"$39", name_es:"Pack completo de estudios", name_en:"Complete study pack", desc_es:"Todas las guías + casos clínicos + intercambios INCAP. Todo lo que necesitas.", desc_en:"All guides + clinical cases + INCAP exchanges. Everything you need.", url:"#", featured:true},
];
export default function Resources({lang}) {
  const isES = lang === "ES";
  return (
    <div style={{padding:"40px 32px", maxWidth:960, margin:"0 auto"}}>
      <div style={{fontSize:11, fontWeight:500, color:TEAL, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6, fontFamily:F}}>{isES?"Recursos":"Resources"}</div>
      <div style={{fontSize:26, fontWeight:500, color:NAVY, marginBottom:6, fontFamily:F}}>{isES?"Guías y materiales de referencia":"Guides and reference materials"}</div>
      <div style={{fontSize:13, color:"#3A5BA0", marginBottom:32, fontFamily:F}}>{isES?"PDFs descargables con información clínica lista para usar.":"Downloadable PDFs with clinical information ready to use."}</div>
      <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14}}>
        {RESOURCES.map(r=>(
          <div key={r.name_es} style={{background: r.featured?"#1E2D4E":"#fff", border: r.featured?"none":"0.5px solid #D4E3FF", borderRadius:12, padding:20, position:"relative"}}>
            {r.featured && <div style={{position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:TEAL, color:"#fff", fontSize:10, fontWeight:500, padding:"3px 12px", borderRadius:20, fontFamily:F, whiteSpace:"nowrap"}}>{isES?"MEJOR VALOR":"BEST VALUE"}</div>}
            <div style={{fontSize:22, fontWeight:500, color: r.featured?TEAL:TEAL, marginBottom:4, fontFamily:F}}>{r.price}</div>
            <div style={{fontSize:13, fontWeight:500, color: r.featured?"#E2E8F0":NAVY, marginBottom:6, fontFamily:F}}>{isES?r.name_es:r.name_en}</div>
            <div style={{fontSize:11, color: r.featured?"#93C5FD":"#3A5BA0", lineHeight:1.5, marginBottom:16, fontFamily:F}}>{isES?r.desc_es:r.desc_en}</div>
            <a href={r.url} style={{display:"block", padding:"9px", borderRadius:8, background: r.featured?TEAL:"transparent", color: r.featured?"#fff":NAVY, border: r.featured?"none":"0.5px solid #D4E3FF", textDecoration:"none", textAlign:"center", fontSize:12, fontWeight:500, fontFamily:F}}>
              {isES?"Obtener guía":"Get guide"}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

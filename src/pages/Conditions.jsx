const F = "Plus Jakarta Sans, sans-serif";
const TEAL = "#2A9D8F";
const NAVY = "#1E2D4E";
const CONDITIONS = [
  {id:"dm2", icon:"DM2", es:"Diabetes mellitus tipo 2", en:"Type 2 diabetes mellitus", desc_es:"Control glucemico y distribucion de carbohidratos para pacientes con DM2.", desc_en:"Glycemic control and carbohydrate distribution for DM2 patients.", color:"#FCEBEB", text:"#A32D2D"},
  {id:"htn", icon:"HTN", es:"Hipertension arterial", en:"Hypertension", desc_es:"Restriccion de sodio y dieta DASH para el control de la presion arterial.", desc_en:"Sodium restriction and DASH diet for blood pressure control.", color:"#FAEEDA", text:"#854F0B"},
  {id:"obs", icon:"OBS", es:"Obesidad", en:"Obesity", desc_es:"Manejo nutricional y distribucion de macronutrientes para perdida de peso.", desc_en:"Nutritional management and macronutrient distribution for weight loss.", color:"#EFF6FF", text:"#185FA5"},
  {id:"ren", icon:"REN", es:"Enfermedad renal", en:"Renal disease", desc_es:"Control de potasio fosforo y proteinas en enfermedad renal cronica.", desc_en:"Potassium phosphorus and protein control in chronic kidney disease.", color:"#E1F5EE", text:"#0F6E56"},
];
export default function Conditions({lang}) {
  const isES = lang === "ES";
  return (
    <div style={{padding:"40px 32px", maxWidth:900, margin:"0 auto"}}>
      <div style={{fontSize:11, fontWeight:500, color:TEAL, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6, fontFamily:F}}>{isES?"Condiciones":"Conditions"}</div>
      <div style={{fontSize:26, fontWeight:500, color:NAVY, marginBottom:6, fontFamily:F}}>{isES?"Guias por condicion clinica":"Guides by clinical condition"}</div>
      <div style={{fontSize:13, color:"#3A5BA0", marginBottom:32, fontFamily:F}}>{isES?"Informacion basada en evidencia para condiciones cronicas.":"Evidence-based information for chronic conditions."}</div>
      <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16}}>
        {CONDITIONS.map(c=>(
          <div key={c.id} style={{background:"#fff", border:"0.5px solid #D4E3FF", borderRadius:12, padding:24}}>
            <div style={{fontSize:11, fontWeight:500, padding:"3px 10px", borderRadius:10, background:c.color, color:c.text, display:"inline-block", marginBottom:12, fontFamily:F}}>{c.icon}</div>
            <div style={{fontSize:14, fontWeight:500, color:NAVY, marginBottom:6, fontFamily:F}}>{isES?c.es:c.en}</div>
            <div style={{fontSize:12, color:"#3A5BA0", lineHeight:1.6, marginBottom:16, fontFamily:F}}>{isES?c.desc_es:c.desc_en}</div>
            <span style={{fontSize:10, padding:"3px 10px", borderRadius:10, background:"#F5F7FF", color:"#3A5BA0", fontFamily:F}}>{isES?"Proximamente":"Coming soon"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
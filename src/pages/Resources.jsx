import { useMeta } from "../hooks/useMeta.js";
const F = "Plus Jakarta Sans, sans-serif";
const TEAL = "#2A9D8F";
const NAVY = "#1E2D4E";

const PRODUCTS = [
  {id:"CoF3c",price:"$12",name_es:"Guía Nutricional para Diabetes Tipo 2",name_en:"Nutrition Guide for Type 2 Diabetes",desc_es:"Control glucémico, índice glucémico, plan de intercambios INCAP/USDA y menú semanal. ADA 2024.",desc_en:"Glycemic control, glycemic index, INCAP/USDA exchange plan and weekly menu. ADA 2024.",tag_es:"DM2",tag_en:"DM2",tag_bg:"#FAEEDA",tag_tc:"#633806"},
  {id:"Yta9e",price:"$12",name_es:"Guía Nutricional para Hipertensión Arterial",name_en:"Nutrition Guide for Hypertension",desc_es:"Dieta DASH completa, restricción de sodio, minerales antihipertensivos y menú semanal. AHA 2017.",desc_en:"Full DASH diet, sodium restriction, antihypertensive minerals and weekly menu. AHA 2017.",tag_es:"HTA",tag_en:"HTA",tag_bg:"#EFF6FF",tag_tc:"#2563EB"},
  {id:"So8XR",price:"$12",name_es:"Guía Nutricional para ERC y Diálisis",name_en:"Nutrition Guide for CKD and Dialysis",desc_es:"Control de potasio, fósforo y proteína por estadio. Planes para HD y DP. KDOQI 2020.",desc_en:"Potassium, phosphorus and protein control by stage. HD and PD plans. KDOQI 2020.",tag_es:"ERC",tag_en:"CKD",tag_bg:"#EDE9FE",tag_tc:"#7C3AED"},
  {id:"2EWzv",price:"$7",name_es:"Índice Glucémico Completo",name_en:"Complete Glycemic Index",desc_es:"100+ alimentos con semáforo visual de IG y CG por categoría. Aplicación clínica por condición.",desc_en:"100+ foods with visual IG and GL traffic light by category. Clinical application by condition.",tag_es:"Referencia",tag_en:"Reference",tag_bg:"#E1F5EE",tag_tc:"#085041"},
  {id:"jpRQw",price:"$7",name_es:"Verificador de Gluten y Dieta Sin Gluten",name_en:"Gluten Checker and Gluten-Free Diet",desc_es:"Tablas de permitidos/prohibidos, contaminación cruzada, lectura de etiquetas y menú semanal SG.",desc_en:"Allowed/forbidden tables, cross-contamination, label reading and gluten-free weekly menu.",tag_es:"Sin gluten",tag_en:"Gluten-free",tag_bg:"#FAEEDA",tag_tc:"#633806"},
  {id:"n5sz0",price:"$9",name_es:"Manual de Intercambios INCAP/USDA",name_en:"INCAP/USDA Exchange Manual",desc_es:"Todos los grupos alimentarios con porciones medidas. Ejemplo clínico paso a paso.",desc_en:"All food groups with measured portions. Step-by-step clinical example.",tag_es:"Clínico",tag_en:"Clinical",tag_bg:"#EDE9FE",tag_tc:"#7C3AED"},
  {id:"8eI47",price:"$15",name_es:"Fórmulas de Nutrición Clínica",name_en:"Clinical Nutrition Formulas",desc_es:"Harris-Benedict, Mifflin, Penn State, Ireton-Jones, balance nitrogenado y tabla resumen.",desc_en:"Harris-Benedict, Mifflin, Penn State, Ireton-Jones, nitrogen balance and quick-reference table.",tag_es:"Fórmulas",tag_en:"Formulas",tag_bg:"#EFF6FF",tag_tc:"#2563EB"},
  {id:"5imEV",price:"$15",name_es:"Nutrición Parenteral y Enteral",name_en:"Parenteral and Enteral Nutrition",desc_es:"Cálculo de NPT, 15 fórmulas enterales, osmolaridad, monitoreo y 2 casos clínicos. ASPEN 2022.",desc_en:"TPN calculation, 15 enteral formulas, osmolarity, monitoring and 2 clinical cases. ASPEN 2022.",tag_es:"NPT/NE",tag_en:"TPN/EN",tag_bg:"#FCEBEB",tag_tc:"#A32D2D"},
  {id:"Z1Hdb",price:"$15",name_es:"Cómo hacer el Plan Alimentario Perfecto",name_en:"How to Build the Perfect Meal Plan",desc_es:"8 pasos con casos completos para DM2 y obesidad usando intercambios INCAP/USDA.",desc_en:"8 steps with complete cases for DM2 and obesity using INCAP/USDA exchanges.",tag_es:"Plan",tag_en:"Plan",tag_bg:"#E1F5EE",tag_tc:"#085041"},
  {id:"KDbeO",price:"$19",name_es:"Casos Clínicos Resueltos (10 casos)",name_en:"Solved Clinical Cases (10 cases)",desc_es:"DM2, HTA, ERC, obesidad, embarazo, cáncer, adulto mayor, deportista y pediatría.",desc_en:"DM2, HTA, CKD, obesity, pregnancy, cancer, elderly, athlete and pediatrics.",tag_es:"Casos",tag_en:"Cases",tag_bg:"#FAEEDA",tag_tc:"#633806"},
];

const BUNDLE={id:"oR3kN",price_es:"$49",price_en:"$49",was_es:"$108 por separado",was_en:"$108 separately",name_es:"Kit Completo del Nutricionista Clínico",name_en:"Complete Clinical Nutritionist Kit",desc_es:"Las 10 guías + fórmulas clínicas + casos resueltos + intercambios INCAP. Todo lo que necesitas para consulta y estudio.",desc_en:"All 10 guides + clinical formulas + solved cases + INCAP exchanges. Everything you need for practice and study.",includes_es:["Guía DM2 · Guía HTA · Guía ERC","Índice glucémico completo","Verificador de gluten SG","Manual intercambios INCAP/USDA","Fórmulas de nutrición clínica","Nutrición parenteral y enteral","Plan alimentario perfecto","10 casos clínicos resueltos"],includes_en:["DM2 Guide · HTA Guide · CKD Guide","Complete glycemic index","Gluten-free checker SG","INCAP/USDA exchange manual","Clinical nutrition formulas","Parenteral and enteral nutrition","Perfect meal plan guide","10 solved clinical cases"]};

export default function Resources({lang}) {
  const isES = lang === "ES";
  if(isES){useMeta({title:"Recursos de nutrición clínica — Nutrionally",description:"Guías clínicas descargables en PDF: DM2, HTA, ERC, índice glucémico, intercambios INCAP, fórmulas clínicas, NPT/NE y casos clínicos resueltos.",url:"https://nutrionally.com/resources"});}
  else{useMeta({title:"Clinical nutrition resources — Nutrionally",description:"Downloadable clinical nutrition PDF guides: DM2, HTA, CKD, glycemic index, INCAP exchanges, clinical formulas, TPN/EN and solved clinical cases.",url:"https://nutrionally.com/resources"});}

  const openPayhip = (id) => {
    if(window.Payhip) window.Payhip.Checkout.open({product:id});
    else window.open(`https://payhip.com/b/${id}`,"_blank");
  };

  return (
    <div style={{padding:"40px 32px",maxWidth:960,margin:"0 auto"}}>
      <script src="https://payhip.com/payhip.js" async></script>
      <div style={{fontSize:11,fontWeight:500,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,fontFamily:F}}>{isES?"Recursos":"Resources"}</div>
      <div style={{fontSize:26,fontWeight:500,color:NAVY,marginBottom:6,fontFamily:F}}>{isES?"Guías y materiales de referencia":"Guides and reference materials"}</div>
      <div style={{fontSize:13,color:"#3A5BA0",marginBottom:32,fontFamily:F}}>{isES?"PDFs descargables con información clínica lista para usar en consulta o estudio.":"Downloadable PDFs with clinical information ready to use in practice or study."}</div>

      <div style={{fontSize:10,fontWeight:600,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:14,fontFamily:F}}>{isES?"Guías individuales":"Individual guides"}</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:32}}>
        {PRODUCTS.map(p=>(
          <div key={p.id} style={{background:"#fff",border:"0.5px solid #D4E3FF",borderRadius:12,padding:20,display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <span style={{fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:20,background:p.tag_bg,color:p.tag_tc,fontFamily:F}}>{isES?p.tag_es:p.tag_en}</span>
              <span style={{fontSize:20,fontWeight:500,color:TEAL,fontFamily:F}}>{p.price}</span>
            </div>
            <div style={{fontSize:13,fontWeight:500,color:NAVY,marginBottom:6,fontFamily:F,lineHeight:1.3}}>{isES?p.name_es:p.name_en}</div>
            <div style={{fontSize:11,color:"#3A5BA0",lineHeight:1.5,marginBottom:16,fontFamily:F,flex:1}}>{isES?p.desc_es:p.desc_en}</div>
            <button onClick={()=>openPayhip(p.id)} style={{padding:"9px",borderRadius:8,background:"transparent",color:NAVY,border:"0.5px solid #D4E3FF",textAlign:"center",fontSize:12,fontWeight:500,fontFamily:F,cursor:"pointer",width:"100%"}}>
              {isES?"Obtener guía →":"Get guide →"}
            </button>
          </div>
        ))}
      </div>

      <div style={{fontSize:10,fontWeight:600,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:14,fontFamily:F}}>{isES?"Bundle recomendado":"Recommended bundle"}</div>
      <div style={{background:NAVY,borderRadius:12,padding:28,marginBottom:32,position:"relative"}}>
        <div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:TEAL,color:"#fff",fontSize:10,fontWeight:500,padding:"3px 14px",borderRadius:20,fontFamily:F,whiteSpace:"nowrap"}}>{isES?"MEJOR VALOR — ahorra $59":"BEST VALUE — save $59"}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:20}}>
          <div style={{flex:1,minWidth:260}}>
            <div style={{fontSize:18,fontWeight:500,color:"#E2E8F0",marginBottom:6,fontFamily:F}}>{isES?BUNDLE.name_es:BUNDLE.name_en}</div>
            <div style={{fontSize:12,color:"#93C5FD",lineHeight:1.6,marginBottom:14,fontFamily:F}}>{isES?BUNDLE.desc_es:BUNDLE.desc_en}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 16px"}}>
              {(isES?BUNDLE.includes_es:BUNDLE.includes_en).map((item,i)=>(
                <div key={i} style={{fontSize:11,color:"#93C5FD",fontFamily:F}}>✓ {item}</div>
              ))}
            </div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{fontSize:13,color:"#8B949E",textDecoration:"line-through",fontFamily:F,marginBottom:2}}>{isES?BUNDLE.was_es:BUNDLE.was_en}</div>
            <div style={{fontSize:36,fontWeight:500,color:TEAL,fontFamily:F,marginBottom:12}}>{isES?BUNDLE.price_es:BUNDLE.price_en}</div>
            <button onClick={()=>openPayhip(BUNDLE.id)} style={{padding:"11px 28px",borderRadius:8,background:TEAL,color:"#fff",fontSize:13,fontWeight:500,fontFamily:F,cursor:"pointer",border:"none"}}>{isES?"Obtener kit completo →":"Get complete kit →"}</button>
          </div>
        </div>
      </div>

      <div style={{display:"flex",alignItems:"center",gap:10,background:"#F5F7FF",border:"0.5px solid #D4E3FF",borderRadius:8,padding:"12px 16px",fontFamily:F}}>
        <span style={{fontSize:18}}>🔒</span>
        <span style={{fontSize:11,color:"#3A5BA0",lineHeight:1.5}}>{isES?"Pago seguro vía Payhip · Descarga inmediata · PDF listo para imprimir o pantalla · Sin suscripción · Garantía de satisfacción":"Secure payment via Payhip · Instant download · PDF ready to print or screen · No subscription · Satisfaction guarantee"}</span>
      </div>
    </div>
  );
}

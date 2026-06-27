import { useState } from "react";
import { useMeta } from "../hooks/useMeta.js";
const F = "Plus Jakarta Sans, sans-serif";
const TEAL = "#2A9D8F";
const NAVY = "#1E2D4E";

const PRODUCTS = {
  es: [
    {id:"CoF3c",price:"$12",name:"Guía Nutricional para Diabetes Tipo 2",desc:"Control glucémico, índice glucémico, plan de intercambios INCAP/USDA y menú semanal. ADA 2024.",tag:"DM2",tag_bg:"#FAEEDA",tag_tc:"#633806"},
    {id:"Yta9e",price:"$12",name:"Guía Nutricional para Hipertensión Arterial",desc:"Dieta DASH completa, restricción de sodio, minerales antihipertensivos y menú semanal. AHA 2017.",tag:"HTA",tag_bg:"#EFF6FF",tag_tc:"#2563EB"},
    {id:"So8XR",price:"$12",name:"Guía Nutricional para ERC y Diálisis",desc:"Control de potasio, fósforo y proteína por estadio. Planes para HD y DP. KDOQI 2020.",tag:"ERC",tag_bg:"#EDE9FE",tag_tc:"#7C3AED"},
    {id:"2EWzv",price:"$7",name:"Índice Glucémico Completo",desc:"100+ alimentos con semáforo visual de IG y CG por categoría. Aplicación clínica por condición.",tag:"Referencia",tag_bg:"#E1F5EE",tag_tc:"#085041"},
    {id:"jpRQw",price:"$7",name:"Verificador de Gluten y Dieta Sin Gluten",desc:"Tablas de permitidos/prohibidos, contaminación cruzada, lectura de etiquetas y menú semanal SG.",tag:"Sin gluten",tag_bg:"#FAEEDA",tag_tc:"#633806"},
    {id:"n5sz0",price:"$9",name:"Manual de Intercambios INCAP/USDA",desc:"Todos los grupos alimentarios con porciones medidas. Ejemplo clínico paso a paso.",tag:"Clínico",tag_bg:"#EDE9FE",tag_tc:"#7C3AED"},
    {id:"8eI47",price:"$15",name:"Fórmulas de Nutrición Clínica",desc:"Harris-Benedict, Mifflin, Penn State, Ireton-Jones, balance nitrogenado y tabla resumen.",tag:"Fórmulas",tag_bg:"#EFF6FF",tag_tc:"#2563EB"},
    {id:"5imEV",price:"$15",name:"Nutrición Parenteral y Enteral",desc:"Cálculo de NPT, 15 fórmulas enterales, osmolaridad, monitoreo y 2 casos clínicos. ASPEN 2022.",tag:"NPT/NE",tag_bg:"#FCEBEB",tag_tc:"#A32D2D"},
    {id:"Z1Hdb",price:"$15",name:"Cómo hacer el Plan Alimentario Perfecto",desc:"8 pasos con casos completos para DM2 y obesidad usando intercambios INCAP/USDA.",tag:"Plan",tag_bg:"#E1F5EE",tag_tc:"#085041"},
    {id:"KDbeO",price:"$19",name:"Casos Clínicos Resueltos (10 casos)",desc:"DM2, HTA, ERC, obesidad, embarazo, cáncer, adulto mayor, deportista y pediatría.",tag:"Casos",tag_bg:"#FAEEDA",tag_tc:"#633806"},
  ],
  en: [
    {id:"KSeNi",price:"$12",name:"Nutrition Guide for Type 2 Diabetes",desc:"Glycemic control, GI index, INCAP/USDA exchange plan and weekly menu. ADA 2024.",tag:"DM2",tag_bg:"#FAEEDA",tag_tc:"#633806"},
    {id:"OJKXI",price:"$12",name:"Nutrition Guide for Hypertension",desc:"Full DASH diet, sodium restriction, antihypertensive minerals and weekly menu. AHA 2017.",tag:"HTN",tag_bg:"#EFF6FF",tag_tc:"#2563EB"},
    {id:"OHDyl",price:"$12",name:"Nutrition Guide for CKD and Dialysis",desc:"Potassium, phosphorus and protein control by stage. HD and PD plans. KDOQI 2020.",tag:"CKD",tag_bg:"#EDE9FE",tag_tc:"#7C3AED"},
    {id:"VJu65",price:"$7",name:"Complete Glycemic Index",desc:"100+ foods with visual GI and GL traffic light by category. Clinical application by condition.",tag:"Reference",tag_bg:"#E1F5EE",tag_tc:"#085041"},
    {id:"PIVvy",price:"$7",name:"Gluten Checker and Gluten-Free Diet",desc:"Allowed/forbidden tables, cross-contamination, label reading and gluten-free weekly menu.",tag:"Gluten-free",tag_bg:"#FAEEDA",tag_tc:"#633806"},
    {id:"iQRGt",price:"$9",name:"INCAP/USDA Exchange Manual",desc:"All food groups with measured portions. Step-by-step clinical example.",tag:"Clinical",tag_bg:"#EDE9FE",tag_tc:"#7C3AED"},
    {id:"afWLw",price:"$15",name:"Clinical Nutrition Formulas",desc:"Harris-Benedict, Mifflin, Penn State, Ireton-Jones, nitrogen balance and quick-reference table.",tag:"Formulas",tag_bg:"#EFF6FF",tag_tc:"#2563EB"},
    {id:"GURFO",price:"$15",name:"Parenteral and Enteral Nutrition",desc:"TPN calculation, 15 enteral formulas, osmolarity, monitoring and 2 clinical cases. ASPEN 2022.",tag:"TPN/EN",tag_bg:"#FCEBEB",tag_tc:"#A32D2D"},
    {id:"3YFc2",price:"$15",name:"How to Build the Perfect Meal Plan",desc:"8 steps with complete cases for T2D and obesity using INCAP/USDA exchanges.",tag:"Plan",tag_bg:"#E1F5EE",tag_tc:"#085041"},
    {id:"SxKEO",price:"$19",name:"10 Solved Clinical Cases",desc:"T2D, HTN, CKD, obesity, pregnancy, cancer, elderly, athlete and pediatrics.",tag:"Cases",tag_bg:"#FAEEDA",tag_tc:"#633806"},
  ],
};

const BUNDLE = {
  es:{id:"oR3kN",price:"$49",was:"$108 por separado",name:"Kit Completo del Nutricionista Clínico",
    desc:"Las 10 guías + fórmulas clínicas + casos resueltos + intercambios INCAP. Todo lo que necesitas para consulta y estudio.",
    includes:["Guía DM2 · Guía HTA · Guía ERC","Índice glucémico completo","Verificador de gluten SG","Manual intercambios INCAP/USDA","Fórmulas de nutrición clínica","Nutrición parenteral y enteral","Plan alimentario perfecto","10 casos clínicos resueltos"],
    btn:"Obtener kit completo →",badge:"MEJOR VALOR — ahorra \$59"},
  en:{id:"mRtEb",price:"$49",was:"$108 separately",name:"Complete Clinical Nutritionist Kit",
    desc:"All 10 guides + clinical formulas + solved cases + INCAP exchanges. Everything you need for practice and study.",
    includes:["T2D Guide · HTN Guide · CKD Guide","Complete glycemic index","Gluten-free checker","INCAP/USDA exchange manual","Clinical nutrition formulas","Parenteral and enteral nutrition","Perfect meal plan guide","10 solved clinical cases"],
    btn:"Get complete kit →",badge:"BEST VALUE — save \$59"},
};

const UI = {
  es:{guides:"Guías individuales",bundle:"Bundle recomendado",btn:"Obtener guía →",
    trust:"Pago seguro vía Payhip · Descarga inmediata · PDF listo para imprimir · Sin suscripción"},
  en:{guides:"Individual guides",bundle:"Recommended bundle",btn:"Get guide →",
    trust:"Secure payment via Payhip · Instant download · Print-ready PDF · No subscription"},
};

export default function Resources({lang}) {
  const isES = lang === "ES";
  const [tab, setTab] = useState(isES ? "es" : "en");

  useMeta(isES
    ? {title:"Recursos de nutrición clínica — Nutrionally",description:"Guías clínicas descargables en PDF: DM2, HTA, ERC, índice glucémico, intercambios INCAP, fórmulas clínicas, NPT/NE y casos clínicos resueltos.",url:"https://nutrionally.com/resources"}
    : {title:"Clinical nutrition resources — Nutrionally",description:"Downloadable clinical nutrition PDF guides: T2D, HTN, CKD, glycemic index, INCAP exchanges, clinical formulas, TPN/EN and solved clinical cases.",url:"https://nutrionally.com/resources"});

  const openPayhip = (id) => {
    if(window.Payhip) window.Payhip.Checkout.open({product:id});
    else window.open("https://payhip.com/b/"+id,"_blank");
  };

  const products = PRODUCTS[tab];
  const bundle = BUNDLE[tab];
  const ui = UI[tab];

  return (
    <div style={{padding:"40px 32px",maxWidth:960,margin:"0 auto"}}>

      <div style={{fontSize:11,fontWeight:500,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,fontFamily:F}}>
        {isES?"Recursos":"Resources"}
      </div>
      <div style={{fontSize:26,fontWeight:500,color:NAVY,marginBottom:6,fontFamily:F}}>
        {isES?"Guías y materiales de referencia":"Guides and reference materials"}
      </div>
      <div style={{fontSize:13,color:"#3A5BA0",marginBottom:24,fontFamily:F}}>
        {isES?"PDFs descargables con información clínica lista para usar en consulta o estudio.":"Downloadable PDFs with clinical information ready to use in practice or study."}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:28}}>
        {["es","en"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{
            padding:"6px 18px",borderRadius:20,border:"1px solid",fontFamily:F,fontSize:12,fontWeight:500,cursor:"pointer",
            background:tab===t?NAVY:"transparent",color:tab===t?"#fff":NAVY,borderColor:tab===t?NAVY:"#D4E3FF",
          }}>
            {t==="es"?"Español":"English"}
          </button>
        ))}
      </div>
      <div style={{fontSize:10,fontWeight:600,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:14,fontFamily:F}}>
        {ui.guides}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:32}}>
        {products.map(p=>(
          <div key={p.id} style={{background:"#fff",border:"0.5px solid #D4E3FF",borderRadius:12,padding:20,display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <span style={{fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:20,background:p.tag_bg,color:p.tag_tc,fontFamily:F}}>{p.tag}</span>
              <span style={{fontSize:20,fontWeight:500,color:TEAL,fontFamily:F}}>{p.price}</span>
            </div>
            <div style={{fontSize:13,fontWeight:500,color:NAVY,marginBottom:6,fontFamily:F,lineHeight:1.3}}>{p.name}</div>
            <div style={{fontSize:11,color:"#3A5BA0",lineHeight:1.5,marginBottom:16,fontFamily:F,flex:1}}>{p.desc}</div>
            <button onClick={()=>openPayhip(p.id)} style={{padding:"9px",borderRadius:8,background:"transparent",color:NAVY,border:"0.5px solid #D4E3FF",textAlign:"center",fontSize:12,fontWeight:500,fontFamily:F,cursor:"pointer",width:"100%"}}>
              {ui.btn}
            </button>
          </div>
        ))}
      </div>
      <div style={{fontSize:10,fontWeight:600,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:14,fontFamily:F}}>
        {ui.bundle}
      </div>
      <div style={{background:NAVY,borderRadius:12,padding:28,marginBottom:32,position:"relative"}}>
        <div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:TEAL,color:"#fff",fontSize:10,fontWeight:500,padding:"3px 14px",borderRadius:20,fontFamily:F,whiteSpace:"nowrap"}}>
          {bundle.badge}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:20}}>
          <div style={{flex:1,minWidth:260}}>
            <div style={{fontSize:18,fontWeight:500,color:"#E2E8F0",marginBottom:6,fontFamily:F}}>{bundle.name}</div>
            <div style={{fontSize:12,color:"#93C5FD",lineHeight:1.6,marginBottom:14,fontFamily:F}}>{bundle.desc}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 16px"}}>
              {bundle.includes.map((item,i)=>(
                <div key={i} style={{fontSize:11,color:"#93C5FD",fontFamily:F}}>✓ {item}</div>
              ))}
            </div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{fontSize:13,color:"#8B949E",textDecoration:"line-through",fontFamily:F,marginBottom:2}}>{bundle.was}</div>
            <div style={{fontSize:36,fontWeight:500,color:TEAL,fontFamily:F,marginBottom:12}}>{bundle.price}</div>
            <button onClick={()=>openPayhip(bundle.id)} style={{padding:"11px 28px",borderRadius:8,background:TEAL,color:"#fff",fontSize:13,fontWeight:500,fontFamily:F,cursor:"pointer",border:"none"}}>
              {bundle.btn}
            </button>
          </div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10,background:"#F5F7FF",border:"0.5px solid #D4E3FF",borderRadius:8,padding:"12px 16px",fontFamily:F}}>
        <span style={{fontSize:18}}>🔒</span>
        <span style={{fontSize:11,color:"#3A5BA0",lineHeight:1.5}}>{ui.trust}</span>
      </div>
    </div>
  );
}

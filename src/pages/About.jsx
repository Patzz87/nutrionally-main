import { useState } from "react";
const F = "Plus Jakarta Sans, sans-serif";
const TEAL = "#2A9D8F";
const NAVY = "#1E2D4E";
const BLUE = "#2563EB";

export default function About({lang}) {
  const isES = lang === "ES";
  return (
    <div style={{maxWidth:800, margin:"0 auto", padding:"60px 32px"}}>

      <div style={{fontSize:11,fontWeight:500,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8,fontFamily:F}}>{isES?"Sobre nosotros":"About us"}</div>
      <div style={{fontSize:32,fontWeight:500,color:NAVY,marginBottom:16,fontFamily:F,lineHeight:1.2}}>{isES?"Nutrición clínica accesible para todos":"Clinical nutrition accessible to everyone"}</div>
      <div style={{fontSize:15,color:"#3A5BA0",lineHeight:1.8,marginBottom:40,fontFamily:F}}>{isES?"Nutrionally nació de una necesidad real: herramientas de nutrición clínica confiables, en español, gratuitas y sin barreras de acceso. Somos una plataforma construida por y para profesionales y estudiantes de nutrición en Latinoamérica.":"Nutrionally was born from a real need: reliable clinical nutrition tools, in Spanish, free and without access barriers. We are a platform built by and for nutrition professionals and students in Latin America."}</div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:48}}>
        {[
          {n:"15+",label:isES?"Calculadoras gratuitas":"Free calculators"},
          {n:"12",label:isES?"Guías por condición clínica":"Guides by clinical condition"},
          {n:"ES/EN",label:isES?"Completamente bilingüe":"Fully bilingual"},
        ].map((s,i)=>(
          <div key={i} style={{background:"#F5F7FF",borderRadius:12,padding:"20px 16px",textAlign:"center"}}>
            <div style={{fontSize:28,fontWeight:500,color:TEAL,fontFamily:F,marginBottom:4}}>{s.n}</div>
            <div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{marginBottom:40}}>
        <div style={{fontSize:18,fontWeight:500,color:NAVY,marginBottom:12,fontFamily:F}}>{isES?"Nuestra misión":"Our mission"}</div>
        <div style={{fontSize:14,color:"#3A5BA0",lineHeight:1.8,fontFamily:F}}>{isES?"Democratizar el acceso a información nutricional clínica de calidad. En muchos países de Latinoamérica, las herramientas de cálculo nutricional son costosas, están en inglés o simplemente no existen. Nutrionally cambia eso — todo es gratuito, bilingüe y basado en evidencia científica actual.":"Democratize access to quality clinical nutritional information. In many Latin American countries, nutritional calculation tools are expensive, in English or simply do not exist. Nutrionally changes that — everything is free, bilingual and based on current scientific evidence."}</div>
      </div>

      <div style={{marginBottom:40}}>
        <div style={{fontSize:18,fontWeight:500,color:NAVY,marginBottom:16,fontFamily:F}}>{isES?"¿Qué ofrecemos?":"What do we offer?"}</div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {[
            {icon:"🧮",title:isES?"nutrionally learn":"nutrionally learn",desc:isES?"Calculadora clínica completa: intercambios INCAP/USDA, Harris-Benedict, NPT/NE, modo estudio y casos clínicos. 100% gratuita.":"Complete clinical calculator: INCAP/USDA exchanges, Harris-Benedict, TPN/EN, study mode and clinical cases. 100% free."},
            {icon:"📊",title:isES?"Calculadoras de salud":"Health calculators",desc:isES?"15+ calculadoras de salud y nutrición: IMC, TDEE, macros, grasa corporal, índice glucémico, verificador de gluten, tracker de sodio y más.":"15+ health and nutrition calculators: BMI, TDEE, macros, body fat, glycemic index, gluten checker, sodium tracker and more."},
            {icon:"📚",title:isES?"Guías por condición":"Condition guides",desc:isES?"12 guías clínicas basadas en evidencia: DM2, hipertensión, obesidad, ERC, artritis, gota, fertilidad, alergias, embarazo, cáncer, colesterol y tiroides.":"12 evidence-based clinical guides: T2DM, hypertension, obesity, CKD, arthritis, gout, fertility, allergies, pregnancy, cancer, cholesterol and thyroid."},
          ].map((item,i)=>(
            <div key={i} style={{display:"flex",gap:16,padding:"16px 20px",background:"#fff",border:"0.5px solid #D4E3FF",borderRadius:12}}>
              <div style={{fontSize:24,flexShrink:0}}>{item.icon}</div>
              <div>
                <div style={{fontSize:13,fontWeight:500,color:NAVY,marginBottom:4,fontFamily:F}}>{item.title}</div>
                <div style={{fontSize:12,color:"#3A5BA0",lineHeight:1.6,fontFamily:F}}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{marginBottom:40}}>
        <div style={{fontSize:18,fontWeight:500,color:NAVY,marginBottom:12,fontFamily:F}}>{isES?"Basado en evidencia":"Evidence-based"}</div>
        <div style={{fontSize:14,color:"#3A5BA0",lineHeight:1.8,fontFamily:F,marginBottom:12}}>{isES?"Toda la información en Nutrionally está basada en guías clínicas actualizadas de organizaciones internacionales reconocidas:":"All information on Nutrionally is based on updated clinical guidelines from recognized international organizations:"}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {["ADA 2024","ASPEN 2022","OMS / WHO","INCAP","USDA","AHA","IARC","IOM","EASL"].map((org,i)=>(
            <span key={i} style={{padding:"4px 12px",borderRadius:20,background:"#EFF6FF",color:BLUE,fontSize:12,fontFamily:F,fontWeight:500}}>{org}</span>
          ))}
        </div>
      </div>

      <div style={{background:NAVY,borderRadius:16,padding:"32px 28px",textAlign:"center"}}>
        <div style={{fontSize:18,fontWeight:500,color:"#E2E8F0",marginBottom:8,fontFamily:F}}>{isES?"¿Tienes sugerencias o encuentras un error?":"Have suggestions or found an error?"}</div>
        <div style={{fontSize:13,color:"#93C5FD",marginBottom:20,fontFamily:F}}>{isES?"Nutrionally es un proyecto en constante evolución. Tu retroalimentación nos ayuda a mejorar.":"Nutrionally is a constantly evolving project. Your feedback helps us improve."}</div>
        <a href="mailto:hola@nutrionally.com" style={{display:"inline-block",padding:"10px 24px",borderRadius:8,background:TEAL,color:"#fff",textDecoration:"none",fontSize:13,fontWeight:500,fontFamily:F}}>hola@nutrionally.com</a>
      </div>

    </div>
  );
}

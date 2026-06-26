import { useState } from "react";
import { useNavigate } from "react-router-dom";
const F = "Plus Jakarta Sans, sans-serif";
const TEAL = "#2A9D8F";
const NAVY = "#1E2D4E";
const BLUE = "#2563EB";

async function subscribeToBrevo(email) {
  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': import.meta.env.VITE_BREVO_API_KEY,
    },
    body: JSON.stringify({
      email: email,
      listIds: [6],
      updateEnabled: true,
    }),
  });
  return res.status === 201 || res.status === 204;
}

export default function Home({lang}) {
  const navigate = useNavigate();
  const isES = lang === "ES";
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState(null);
  return (
    <div>
      <div style={{background:NAVY, padding:"60px 32px 52px", textAlign:"center"}}>
        <div style={{display:"inline-block", background:"rgba(255,255,255,0.1)", border:"0.5px solid rgba(255,255,255,0.3)", color:"#fff", fontSize:11, fontWeight:500, padding:"4px 14px", borderRadius:20, marginBottom:18, letterSpacing:"0.06em", textTransform:"uppercase", fontFamily:F}}>
          {isES?"Plataforma de nutrición clínica":"Clinical nutrition platform"}
        </div>
        <h1 style={{fontSize:34, fontWeight:500, color:"#fff", lineHeight:1.25, marginBottom:14, fontFamily:F}}>
          {isES?"Tu referencia completa":"Your complete reference"}<br/>
          {isES?"en ":"in "}<span style={{color:TEAL}}>{isES?"nutrición":"nutrition"}</span>
        </h1>
        <p style={{fontSize:14, color:"#93C5FD", maxWidth:480, margin:"0 auto 30px", lineHeight:1.7, fontFamily:F}}>
          {isES
            ?"Herramientas clínicas, guías por condición y recursos educativos para estudiantes, profesionales y pacientes."
            :"Clinical tools, condition guides and educational resources for students, professionals and patients."}
        </p>
        <div style={{display:"flex", gap:10, justifyContent:"center"}}>
          <button onClick={()=>navigate("/tools")} style={{background:BLUE, color:"#fff", border:"none", padding:"11px 24px", borderRadius:8, fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:F}}>
            {isES?"Explorar herramientas":"Explore tools"}
          </button>
          <a href="https://learn.nutrionally.com" target="_blank" rel="noopener noreferrer" style={{background:"transparent", color:"#fff", border:"0.5px solid rgba(255,255,255,0.4)", padding:"11px 24px", borderRadius:8, fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:F, textDecoration:"none"}}>
            {isES?"Ver calculadora →":"View calculator →"}
          </a>
        </div>
      </div>

      <div style={{background:"#162338", padding:"20px 32px", display:"flex", justifyContent:"center", gap:52}}>
        {[
          {num:"4", lbl: isES?"Herramientas gratuitas":"Free tools"},
          {num:"ES / EN", lbl: isES?"Bilingüe":"Bilingual"},
          {num:"INCAP", lbl: isES?"Datos certificados":"Certified data"},
          {num:"100%", lbl: isES?"Basado en evidencia":"Evidence based"},
        ].map(s=>(
          <div key={s.num} style={{textAlign:"center"}}>
            <div style={{fontSize:20, fontWeight:500, color:TEAL, fontFamily:F}}>{s.num}</div>
            <div style={{fontSize:11, color:"#93C5FD", marginTop:2, fontFamily:F}}>{s.lbl}</div>
          </div>
        ))}
      </div>

      <div style={{padding:"48px 32px", background:"#F5F7FF"}}>
        <div style={{fontSize:11, fontWeight:500, color:TEAL, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6, fontFamily:F}}>{isES?"Productos":"Products"}</div>
        <div style={{fontSize:22, fontWeight:500, color:NAVY, marginBottom:6, fontFamily:F}}>{isES?"Todo lo que necesitas":"Everything you need"}</div>
        <div style={{fontSize:13, color:"#3A5BA0", marginBottom:28, fontFamily:F}}>{isES?"Desde estudiantes hasta profesionales y pacientes.":"From students to professionals and patients."}</div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12}}>
          {[
            {icon:"🧮", name:"nutrionally learn", desc: isES?"Calculadora clínica con plan de intercambios y modo estudio.":"Clinical calculator with exchange plan and study mode.", tag: isES?"Gratis":"Free", tagColor:"#E1F5EE", tagText:"#0F6E56", href:"https://learn.nutrionally.com"},
            {icon:"🩺", name:"nutrionally pro", desc: isES?"Gestión de pacientes y reportes clínicos para profesionales.":"Patient management and clinical reports for professionals.", tag: isES?"Próximamente":"Coming soon", tagColor:"#EFF6FF", tagText:"#185FA5"},
            {icon:"🥗", name:"nutrionally health", desc: isES?"Calculadora simple de macros para el público general.":"Simple macro calculator for the general public.", tag: isES?"Próximamente":"Coming soon", tagColor:"#EFF6FF", tagText:"#185FA5"},
            {icon:"❤️", name:"nutrionally conditions", desc: isES?"Herramientas por condición: DM2, hipertensión, obesidad.":"Condition tools: DM2, hypertension, obesity.", tag: isES?"Próximamente":"Coming soon", tagColor:"#EFF6FF", tagText:"#185FA5"},
          ].map(p=>(
            <div key={p.name} style={{background:"#fff", border:"0.5px solid #D4E3FF", borderRadius:12, padding:"20px 16px"}}>
              <div style={{fontSize:24, marginBottom:12}}>{p.icon}</div>
              <div style={{fontSize:13, fontWeight:500, color:NAVY, marginBottom:4, fontFamily:F}}>{p.name}</div>
              <div style={{fontSize:11, color:"#3A5BA0", lineHeight:1.5, marginBottom:12, fontFamily:F}}>{p.desc}</div>
              {p.href
                ? <a href={p.href} target="_blank" rel="noopener noreferrer" style={{fontSize:10, padding:"2px 8px", borderRadius:10, background:p.tagColor, color:p.tagText, textDecoration:"none", fontFamily:F, fontWeight:500}}>{p.tag}</a>
                : <span style={{fontSize:10, padding:"2px 8px", borderRadius:10, background:p.tagColor, color:p.tagText, fontFamily:F}}>{p.tag}</span>
              }
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:"40px 32px", background:"#fff"}}>
        <div style={{fontSize:11, fontWeight:500, color:TEAL, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6, fontFamily:F}}>{isES?"Herramientas gratuitas":"Free tools"}</div>
        <div style={{fontSize:22, fontWeight:500, color:NAVY, marginBottom:6, fontFamily:F}}>{isES?"Referencia clínica al instante":"Clinical reference instantly"}</div>
        <div style={{fontSize:13, color:"#3A5BA0", marginBottom:28, fontFamily:F}}>{isES?"Sin registro. Sin costo. Solo abre y usa.":"No signup. No cost. Just open and use."}</div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12}}>
          {[
            {title: isES?"Índice glucémico":"Glycemic index", desc: isES?"Busca cualquier alimento y obtén su IG y carga glucémica.":"Search any food and get its GI and glycemic load.", url:"/tools#glycemic"},
            {title: isES?"Verificador de gluten":"Gluten checker", desc: isES?"Sabe si un alimento contiene gluten o no al instante.":"Know instantly if a food contains gluten or not.", url:"/tools#gluten"},
            {title: isES?"Calculadora de intercambios":"Exchange calculator", desc: isES?"Plan de intercambios INCAP/USDA con distribución por tiempo.":"INCAP/USDA exchange plan with meal time distribution.", url:"https://learn.nutrionally.com/#s1"},
            {title: isES?"Tracker de sodio":"Sodium tracker", desc: isES?"Monitorea ingesta de sodio para manejo de hipertensión.":"Monitor sodium intake for hypertension management.", url:"/tools"},
          ].map(t=>(
            <div key={t.title} onClick={()=>{if(t.url.startsWith("http")){window.open(t.url,"_blank");}else{window.location.href=t.url;}}} style={{background:"#F5F7FF", border:"0.5px solid #D4E3FF", borderRadius:12, padding:"18px 16px", cursor:"pointer"}}>
              <div style={{width:8, height:8, borderRadius:"50%", background:TEAL, marginBottom:10}}/>
              <div style={{fontSize:13, fontWeight:500, color:NAVY, marginBottom:4, fontFamily:F}}>{t.title}</div>
              <div style={{fontSize:11, color:"#3A5BA0", lineHeight:1.5, fontFamily:F}}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:"40px 32px", background:"#F5F7FF", textAlign:"center"}}>
        <div style={{background:"#fff", border:"0.5px solid #D4E3FF", borderRadius:16, padding:32, maxWidth:480, margin:"0 auto"}}>
          <div style={{fontSize:18, fontWeight:500, color:NAVY, marginBottom:6, fontFamily:F}}>{isES?"Mantente al día":"Stay updated"}</div>
          <div style={{fontSize:13, color:"#3A5BA0", marginBottom:20, fontFamily:F}}>{isES?"Nuevas herramientas y guías directamente en tu correo.":"New tools and guides directly in your inbox."}</div>
          <div style={{display:"flex", gap:8}}>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder={isES?"tu@correo.com":"your@email.com"} style={{flex:1, padding:"9px 12px", borderRadius:8, border:"0.5px solid #D4E3FF", fontSize:13, color:NAVY, background:"#F5F7FF", outline:"none", fontFamily:F}}/>
            <button onClick={async()=>{if(!email)return;const ok=await subscribeToBrevo(email);setSubStatus(ok?"ok":"err");if(ok)setEmail("");}} style={{background:TEAL, color:"#fff", border:"none", padding:"9px 18px", borderRadius:8, fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:F, whiteSpace:"nowrap"}}>
              {subStatus==="ok"?(isES?"Suscrito ✓":"Subscribed ✓"):isES?"Suscribirse":"Subscribe"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

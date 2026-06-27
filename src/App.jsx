import { Routes, Route } from "react-router-dom";
import Recipe from "./pages/Recipe.jsx";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Tools from "./pages/Tools.jsx";
import Conditions from "./pages/Conditions.jsx";
import Resources from "./pages/Resources.jsx";
import Blog from "./pages/Blog.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";


function ScrollToTop() {
  const { pathname } = window.location;
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Footer({lang}) {
  const isES = lang === "ES";
  const F = "Plus Jakarta Sans, sans-serif";
  const TEAL = "#2A9D8F";
  const NAVY = "#1E2D4E";
  return (
    <div style={{background:NAVY,padding:"40px 32px 24px",marginTop:60}}>
      <div style={{maxWidth:960,margin:"0 auto"}}>
        <div style={{display:"flex",gap:48,flexWrap:"wrap",marginBottom:32}}>
          <div style={{flex:1,minWidth:180}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:TEAL}}/>
              <span style={{fontSize:15,fontWeight:600,color:"#E2E8F0",fontFamily:F}}>nutrionally</span>
            </div>
            <div style={{fontSize:12,color:"#93C5FD",lineHeight:1.7,fontFamily:F,maxWidth:200}}>{isES?"Nutrición clínica accesible para todos. Gratuita, bilingüe y basada en evidencia.":"Clinical nutrition accessible to everyone. Free, bilingual and evidence-based."}</div>
          </div>
          <div style={{minWidth:140}}>
            <div style={{fontSize:11,fontWeight:600,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:12,fontFamily:F}}>{isES?"Herramientas":"Tools"}</div>
            {[{label:isES?"Calculadoras":"Calculators",href:"/tools"},{label:isES?"Índice glucémico":"Glycemic index",href:"/tools#glycemic"},{label:isES?"Verificador de gluten":"Gluten checker",href:"/tools#gluten"},{label:isES?"Tracker de sodio":"Sodium tracker",href:"/tools#sodium"}].map((l,i)=>(
              <a key={i} href={l.href} style={{display:"block",fontSize:12,color:"#93C5FD",textDecoration:"none",marginBottom:6,fontFamily:F}}>{l.label}</a>
            ))}
          </div>
          <div style={{minWidth:140}}>
            <div style={{fontSize:11,fontWeight:600,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:12,fontFamily:F}}>{isES?"Condiciones":"Conditions"}</div>
            {[{label:"Diabetes (DM2)",href:"/conditions"},{label:isES?"Hipertensión":"Hypertension",href:"/conditions"},{label:isES?"Obesidad":"Obesity",href:"/conditions"},{label:isES?"Ver todas":"See all",href:"/conditions"}].map((l,i)=>(
              <a key={i} href={l.href} style={{display:"block",fontSize:12,color:"#93C5FD",textDecoration:"none",marginBottom:6,fontFamily:F}}>{l.label}</a>
            ))}
          </div>
          <div style={{minWidth:140}}>
            <div style={{fontSize:11,fontWeight:600,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:12,fontFamily:F}}>{isES?"Plataforma":"Platform"}</div>
            {[{label:"nutrionally learn",href:"https://learn.nutrionally.com"},{label:"Blog",href:"/blog"},{label:isES?"Nosotros":"About",href:"/about"},{label:isES?"Contacto":"Contact",href:"mailto:hola@nutrionally.com"}].map((l,i)=>(
              <a key={i} href={l.href} style={{display:"block",fontSize:12,color:"#93C5FD",textDecoration:"none",marginBottom:6,fontFamily:F}}>{l.label}</a>
            ))}
          </div>
        </div>
        <div style={{borderTop:"0.5px solid #3A5BA0",paddingTop:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div style={{fontSize:11,color:"#93C5FD",fontFamily:F}}>© 2026 Nutrionally · hola@nutrionally.com</div>
          <div style={{fontSize:11,color:"#93C5FD",fontFamily:F}}>{isES?"Información con fines educativos — no reemplaza consejo médico profesional.":"Information for educational purposes — does not replace professional medical advice."}</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("ES");
  return (
    <div style={{minHeight:"100vh", display:"flex", flexDirection:"column", background:"#F5F7FF", fontFamily:"Plus Jakarta Sans, sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <ScrollToTop/>
        <Navbar lang={lang} setLang={setLang}/>
      <div style={{flex:1}}>
        <Routes>
          <Route path="/" element={<Home lang={lang}/>}/>
          <Route path="/tools" element={<Tools lang={lang}/>}/>
          <Route path="/conditions" element={<Conditions lang={lang}/>}/>
          <Route path="/resources" element={<Resources lang={lang}/>}/>
          <Route path="/blog" element={<Blog lang={lang}/>}/>
          <Route path="/about" element={<About lang={lang}/>}/>
          <Route path="/recipe" element={<Recipe lang={lang}/>}/>
          <Route path="*" element={<NotFound lang={lang}/>}/>
        </Routes>
        <Footer lang={lang}/>
      </div>
    </div>
  );
}

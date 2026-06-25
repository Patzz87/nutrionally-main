import { useState } from "react";
const F = "Plus Jakarta Sans, sans-serif";
const TEAL = "#2A9D8F";
const NAVY = "#1E2D4E";
const BLUE = "#2563EB";

function GlycemicTool({isES}) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const foods = [
    {name:"Arroz blanco / White rice", gi:72, load:"Alta / High"},
    {name:"Arroz integral / Brown rice", gi:50, load:"Media / Medium"},
    {name:"Pan blanco / White bread", gi:75, load:"Alta / High"},
    {name:"Pan integral / Whole wheat bread", gi:51, load:"Media / Medium"},
    {name:"Avena / Oats", gi:55, load:"Media / Medium"},
    {name:"Manzana / Apple", gi:36, load:"Baja / Low"},
    {name:"Plátano / Banana", gi:51, load:"Media / Medium"},
    {name:"Papa / Potato", gi:78, load:"Alta / High"},
    {name:"Zanahoria / Carrot", gi:39, load:"Baja / Low"},
    {name:"Lentejas / Lentils", gi:32, load:"Baja / Low"},
    {name:"Frijoles / Beans", gi:28, load:"Baja / Low"},
    {name:"Leche / Milk", gi:31, load:"Baja / Low"},
    {name:"Yogur / Yogurt", gi:41, load:"Baja / Low"},
    {name:"Naranja / Orange", gi:43, load:"Baja / Low"},
    {name:"Uvas / Grapes", gi:59, load:"Media / Medium"},
    {name:"Sandía / Watermelon", gi:76, load:"Alta / High"},
    {name:"Maíz / Corn", gi:52, load:"Media / Medium"},
    {name:"Espagueti / Spaghetti", gi:49, load:"Baja / Low"},
    {name:"Quinoa", gi:53, load:"Media / Medium"},
    {name:"Camote / Sweet potato", gi:63, load:"Media / Medium"},
  ];
  const filtered = query.length > 1 ? foods.filter(f => f.name.toLowerCase().includes(query.toLowerCase())) : [];
  const giColor = gi => gi < 55 ? "#0F6E56" : gi < 70 ? "#854F0B" : "#A32D2D";
  const giBg = gi => gi < 55 ? "#E1F5EE" : gi < 70 ? "#FAEEDA" : "#FCEBEB";
  return (
    <div style={{background:"#fff", border:"0.5px solid #D4E3FF", borderRadius:12, padding:20}}>
      <div style={{fontSize:13, fontWeight:500, color:NAVY, marginBottom:4, fontFamily:F}}>{isES?"Índice glucémico":"Glycemic index"}</div>
      <div style={{fontSize:11, color:"#3A5BA0", marginBottom:14, fontFamily:F}}>{isES?"Busca un alimento para ver su IG":"Search a food to see its GI"}</div>
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={isES?"Ej: arroz, manzana...":"E.g. rice, apple..."} style={{width:"100%", padding:"9px 12px", borderRadius:8, border:"0.5px solid #D4E3FF", fontSize:13, fontFamily:F, outline:"none", boxSizing:"border-box"}}/>
      {filtered.map(f=>(
        <div key={f.name} onClick={()=>{setResult(f);setQuery(f.name);}} style={{padding:"10px 12px", borderBottom:"0.5px solid #F0F4FF", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <span style={{fontSize:12, color:NAVY, fontFamily:F}}>{f.name}</span>
          <span style={{fontSize:12, fontWeight:500, padding:"2px 8px", borderRadius:10, background:giBg(f.gi), color:giColor(f.gi), fontFamily:F}}>IG {f.gi}</span>
        </div>
      ))}
      {result && query===result.name && (
        <div style={{marginTop:14, padding:14, background:"#F5F7FF", borderRadius:8}}>
          <div style={{fontSize:12, color:"#3A5BA0", fontFamily:F, marginBottom:8}}>{result.name}</div>
          <div style={{display:"flex", gap:10}}>
            <div style={{flex:1, background:giBg(result.gi), borderRadius:8, padding:"10px 14px", textAlign:"center"}}>
              <div style={{fontSize:10, color:giColor(result.gi), fontFamily:F, marginBottom:2}}>IG</div>
              <div style={{fontSize:22, fontWeight:500, color:giColor(result.gi), fontFamily:F}}>{result.gi}</div>
            </div>
            <div style={{flex:1, background:"#EFF6FF", borderRadius:8, padding:"10px 14px", textAlign:"center"}}>
              <div style={{fontSize:10, color:"#185FA5", fontFamily:F, marginBottom:2}}>{isES?"Carga":"Load"}</div>
              <div style={{fontSize:13, fontWeight:500, color:"#185FA5", fontFamily:F}}>{result.load}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Tools({lang}) {
  const isES = lang === "ES";
  return (
    <div style={{padding:"40px 32px", maxWidth:900, margin:"0 auto"}}>
      <div style={{fontSize:11, fontWeight:500, color:TEAL, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6, fontFamily:F}}>{isES?"Herramientas":"Tools"}</div>
      <div style={{fontSize:26, fontWeight:500, color:NAVY, marginBottom:6, fontFamily:F}}>{isES?"Referencia clínica gratuita":"Free clinical reference"}</div>
      <div style={{fontSize:13, color:"#3A5BA0", marginBottom:32, fontFamily:F}}>{isES?"Sin registro. Sin costo.":"No signup. No cost."}</div>
      <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16}}>
        <GlycemicTool isES={isES}/>
        <div style={{background:"#fff", border:"0.5px solid #D4E3FF", borderRadius:12, padding:20}}>
          <div style={{fontSize:13, fontWeight:500, color:NAVY, marginBottom:4, fontFamily:F}}>{isES?"Calculadora de intercambios":"Exchange calculator"}</div>
          <div style={{fontSize:11, color:"#3A5BA0", marginBottom:14, fontFamily:F}}>{isES?"Usa la calculadora completa en learn.nutrionally.com":"Use the full calculator at learn.nutrionally.com"}</div>
          <a href="https://learn.nutrionally.com" target="_blank" rel="noopener noreferrer" style={{display:"block", padding:"10px", borderRadius:8, background:BLUE, color:"#fff", textDecoration:"none", textAlign:"center", fontSize:13, fontWeight:500, fontFamily:F}}>
            {isES?"Abrir calculadora →":"Open calculator →"}
          </a>
        </div>
      </div>
    </div>
  );
}

import { jsPDF } from "jspdf";
import { useState, useCallback, useRef } from "react";
import { useMeta } from "../hooks/useMeta.js";
const F = "Plus Jakarta Sans, sans-serif";
const TEAL = "#2A9D8F";
const NAVY = "#1E2D4E";
const BLUE = "#2563EB";

const TRAFFIC = {
  kcal:   {low:300, high:700},
  protein:{low:10,  high:25},
  fat:    {low:10,  high:25},
  carbs:  {low:30,  high:80},
  fiber:  {low:3,   high:8},
  sodium: {low:300, high:600},
};
function trafficColor(key, val) {
  const t = TRAFFIC[key];
  if (!t) return "#3A5BA0";
  if (key === "fiber" || key === "protein") {
    if (val >= t.high) return "#16a34a";
    if (val >= t.low)  return "#eab308";
    return "#ef4444";
  }
  if (val <= t.low)  return "#16a34a";
  if (val <= t.high) return "#eab308";
  return "#ef4444";
}

async function searchFood(query) {
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&dataType=SR%20Legacy,Foundation&pageSize=10&api_key=${import.meta.env.VITE_USDA_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return (data.foods || []).map(f => {
    const get = (n) => (f.foodNutrients||[]).find(x=>x.nutrientName===n)?.value||0;
    return {
      fdcId: f.fdcId,
      name: f.description,
      kcal:   +(get("Energy")).toFixed(1),
      protein:+(get("Protein")).toFixed(1),
      fat:    +(get("Total lipid (fat)")).toFixed(1),
      carbs:  +(get("Carbohydrate, by difference")).toFixed(1),
      fiber:  +(get("Fiber, total dietary")).toFixed(1),
      sodium: +(get("Sodium, Na")).toFixed(1),
    };
  });
}

export default function Recipe({lang}) {
  const isES = lang === "ES";
  if(isES){useMeta({title:"Calculadora de recetas — Nutrionally",description:"Calcula las calorías, proteínas, grasas, carbohidratos, fibra y sodio de cualquier receta. Base de datos USDA con 300,000+ alimentos.",url:"https://nutrionally.com/recipe"});}
  else{useMeta({title:"Recipe calculator — Nutrionally",description:"Calculate calories, protein, fat, carbs, fiber and sodium of any recipe. USDA database with 300,000+ foods.",url:"https://nutrionally.com/recipe"});}

  const [query, setQuery]       = useState("");
  const [results, setResults]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [diners, setDiners]     = useState("1");
  const [recipeName, setRecipeName] = useState("");
  const [saved, setSaved]       = useState(() => { try { return JSON.parse(localStorage.getItem("nl_recipes_v1")||"[]"); } catch { return []; }});
  const [showSaved, setShowSaved] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const debounce = useRef(null);

  const doSearch = useCallback(async (q) => {
    if (q.length < 2) { setResults([]); return; }
    setLoading(true);
    try { const r = await searchFood(q); setResults(r); } catch { setResults([]); }
    setLoading(false);
  }, []);

  const onQuery = (v) => {
    setQuery(v);
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => doSearch(v), 500);
  };

  const addIngredient = (food) => {
    setIngredients(prev => [...prev, {...food, grams:100}]);
    setQuery(""); setResults([]);
  };

  const updateGrams = (idx, g) => {
    setIngredients(prev => prev.map((it,i) => i===idx ? {...it, grams:parseFloat(g)||0} : it));
  };

  const removeIngredient = (idx) => {
    setIngredients(prev => prev.filter((_,i) => i!==idx));
  };

  const calc = (field, item) => +((item[field] * item.grams / 100)).toFixed(1);

  const totals = ingredients.reduce((acc, item) => {
    acc.kcal    += calc("kcal",    item);
    acc.protein += calc("protein", item);
    acc.fat     += calc("fat",     item);
    acc.carbs   += calc("carbs",   item);
    acc.fiber   += calc("fiber",   item);
    acc.sodium  += calc("sodium",  item);
    return acc;
  }, {kcal:0,protein:0,fat:0,carbs:0,fiber:0,sodium:0});

  const perPerson = Object.fromEntries(
    Object.entries(totals).map(([k,v]) => [k, +(v/Math.max(parseFloat(diners)||1,0.5)).toFixed(1)])
  );

  const saveRecipe = () => {
    if (!recipeName) { setSaveMsg("⚠️ Agrega un nombre a la receta"); setTimeout(()=>setSaveMsg(""),3000); return; }
    if (ingredients.length === 0) { setSaveMsg("⚠️ Agrega al menos un ingrediente"); setTimeout(()=>setSaveMsg(""),3000); return; }
    const entry = {id:Date.now(), name:recipeName, diners, ingredients, totals};
    const updated = [entry, ...saved.filter(r=>r.name!==recipeName).slice(0,19)];
    setSaved(updated);
    try { localStorage.setItem("nl_recipes_v1", JSON.stringify(updated)); setSaveMsg("✅ Receta guardada"); setTimeout(()=>setSaveMsg(""),3000); } catch { setSaveMsg("❌ Error al guardar"); }
  };

  const loadRecipe = (r) => {
    setIngredients(r.ingredients);
    setDiners(r.diners);
    setRecipeName(r.name);
    setShowSaved(false);
  };

  const deleteRecipe = (id) => {
    const updated = saved.filter(r=>r.id!==id);
    setSaved(updated);
    try { localStorage.setItem("nl_recipes_v1", JSON.stringify(updated)); } catch {}
  };

  const tags = [];
  if (perPerson.sodium < 300)  tags.push({label: isES?"Bajo en sodio":"Low sodium",   color:"#16a34a", bg:"#dcfce7"});
  if (perPerson.fiber  >= 8)   tags.push({label: isES?"Alto en fibra":"High fiber",    color:"#0C447C", bg:"#D4E3FF"});
  if (perPerson.protein >= 20) tags.push({label: isES?"Rico en proteína":"High protein", color:"#0F6E56", bg:"#E1F5EE"});
  if (perPerson.kcal   < 400)  tags.push({label: isES?"Bajo en calorías":"Low calorie", color:"#3A5BA0", bg:"#F5F7FF"});
  if (perPerson.sodium > 600)  tags.push({label: isES?"Alto en sodio":"High sodium",   color:"#A32D2D", bg:"#FCEBEB"});

  const inputStyle = {width:"100%",padding:"10px 14px",borderRadius:8,border:"0.5px solid #D4E3FF",background:"#fff",color:NAVY,fontSize:13,fontFamily:F,outline:"none",boxSizing:"border-box"};


  const exportPDF = async () => {
    const doc = new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
    const isES = lang === "ES";
    const W=210, M=18; let y=20;
    doc.setFillColor(30,45,78); doc.rect(0,0,W,14,"F");
    doc.setFillColor(42,157,143); doc.rect(0,14,W,3,"F");
    doc.setTextColor(255,255,255); doc.setFont("helvetica","bold"); doc.setFontSize(13);
    doc.text("Nutrionally", M, 9.5);
    doc.setFont("helvetica","normal"); doc.setFontSize(9);
    doc.text(isES?"Calculadora de recetas":"Recipe calculator", W-M, 9.5,{align:"right"});
    y=26;
    doc.setTextColor(30,45,78); doc.setFont("helvetica","bold"); doc.setFontSize(16);
    doc.text(recipeName||(isES?"Receta":"Recipe"), M, y); y+=7;
    doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(100,120,160);
    doc.text(`${diners} ${isES?"porción(es)":"serving(s)"} · ${new Date().toLocaleDateString()}`, M, y); y+=10;
    doc.setDrawColor(212,227,255); doc.line(M,y,W-M,y); y+=8;
    doc.setFont("helvetica","bold"); doc.setFontSize(10); doc.setTextColor(30,45,78);
    doc.text(isES?"Ingredientes":"Ingredients", M, y); y+=6;
    ingredients.forEach(item=>{
      doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(58,91,160);
      doc.text(`• ${item.name} — ${item.grams}g (${calc("kcal",item)} kcal)`, M+3, y); y+=6;
    });
    y+=4;
    doc.setFont("helvetica","bold"); doc.setFontSize(10); doc.setTextColor(30,45,78);
    doc.text(isES?"Valor nutricional por porción":"Nutritional value per serving", M, y); y+=6;
    const cW=(W-M*2)/2;
    [{key:"kcal",l:"Calorías",e:"Calories",u:"kcal"},{key:"protein",l:"Proteínas",e:"Protein",u:"g"},{key:"fat",l:"Grasas",e:"Fat",u:"g"},{key:"carbs",l:"Carbohidratos",e:"Carbohydrates",u:"g"},{key:"fiber",l:"Fibra",e:"Fiber",u:"g"},{key:"sodium",l:"Sodio",e:"Sodium",u:"mg"}].forEach((row,ri)=>{
      doc.setFillColor(ri%2===0?245:255,ri%2===0?247:255,255);
      doc.rect(M,y,W-M*2,7,"F");
      doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(58,91,160);
      doc.text(isES?row.l:row.e, M+3, y+5);
      doc.setTextColor(30,45,78); doc.setFont("helvetica","bold");
      doc.text(`${perPerson[row.key]} ${row.u}`, M+cW, y+5);
      doc.setFont("helvetica","normal"); doc.setTextColor(100,120,160);
      doc.text(`${isES?"Total":"Total"}: ${+totals[row.key].toFixed(1)} ${row.u}`, M+cW*1.5, y+5);
      y+=7;
    });
    doc.setFillColor(30,45,78); doc.rect(0,287,W,10,"F");
    doc.setTextColor(147,197,253); doc.setFontSize(7); doc.setFont("helvetica","normal");
    doc.text("nutrionally.com/recipe", M, 293.5);
    doc.text(isES?"Uso orientativo — no reemplaza criterio profesional":"Guidance only — does not replace professional advice", W-M, 293.5,{align:"right"});
    doc.save(`${(recipeName||"receta").replace(/\s+/g,"_")}_nutrionally.pdf`);
  };

  return (
    <div style={{padding:"40px 32px",maxWidth:960,margin:"0 auto"}}>
      <div style={{fontSize:11,fontWeight:500,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,fontFamily:F}}>{isES?"Herramientas":"Tools"}</div>
      <div style={{fontSize:26,fontWeight:500,color:NAVY,marginBottom:6,fontFamily:F}}>{isES?"Calculadora de recetas":"Recipe calculator"}</div>
      <div style={{fontSize:13,color:"#3A5BA0",marginBottom:28,fontFamily:F}}>{isES?"Calcula el valor nutricional de cualquier receta. Base de datos USDA con 300,000+ alimentos.":"Calculate the nutritional value of any recipe. USDA database with 300,000+ foods."}</div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:24}}>
        <div>
          <label style={{fontSize:12,color:"#3A5BA0",fontFamily:F,display:"block",marginBottom:4}}>{isES?"Nombre de la receta":"Recipe name"}</label>
          <input value={recipeName} onChange={e=>setRecipeName(e.target.value)} placeholder={isES?"Ej: Ensalada mediterránea":"E.g. Mediterranean salad"} style={inputStyle}/>
        </div>
        <div>
          <label style={{fontSize:12,color:"#3A5BA0",fontFamily:F,display:"block",marginBottom:4}}>{isES?"Número de porciones":"Number of servings"}</label>
          <input type="number" min={1} value={diners} onChange={e=>setDiners(e.target.value)} onBlur={e=>setDiners(v=>!v||parseFloat(v)<0.5?"1":v)} style={inputStyle}/>
        </div>
      </div>

      <div style={{position:"relative",marginBottom:20}}>
        <label style={{fontSize:12,color:"#3A5BA0",fontFamily:F,display:"block",marginBottom:4}}>{isES?"Buscar alimento (USDA)":"Search food (USDA)"}</label>
        <input value={query} onChange={e=>onQuery(e.target.value)} placeholder={isES?"Ej: pollo, arroz, aguacate...":"E.g. chicken, rice, avocado..."} style={inputStyle}/>
        {loading && <div style={{fontSize:12,color:"#3A5BA0",fontFamily:F,marginTop:4}}>{isES?"Buscando...":"Searching..."}</div>}
        {results.length>0 && (
          <div style={{position:"absolute",top:"100%",left:0,right:0,background:"#fff",border:"0.5px solid #D4E3FF",borderRadius:8,zIndex:100,maxHeight:260,overflowY:"auto",boxShadow:"0 4px 16px rgba(30,45,78,0.10)"}}>
            {results.map(food=>(
              <div key={food.fdcId} onClick={()=>addIngredient(food)} style={{padding:"10px 14px",cursor:"pointer",borderBottom:"0.5px solid #F5F7FF",fontFamily:F}} onMouseEnter={e=>e.currentTarget.style.background="#F5F7FF"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                <div style={{fontSize:13,color:NAVY,fontWeight:500}}>{food.name}</div>
                <div style={{fontSize:11,color:"#3A5BA0"}}>{food.kcal} kcal · {food.protein}g prot · {food.fat}g grasa · {food.carbs}g HC (por 100g)</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {ingredients.length>0 && (
        <div style={{background:"#fff",border:"0.5px solid #D4E3FF",borderRadius:12,padding:20,marginBottom:20}}>
          <div style={{fontSize:14,fontWeight:500,color:NAVY,fontFamily:F,marginBottom:12}}>{isES?"Ingredientes":"Ingredients"}</div>
          {ingredients.map((item,idx)=>(
            <div key={idx} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,padding:"8px 12px",background:"#F5F7FF",borderRadius:8}}>
              <div style={{flex:1,fontFamily:F}}><div style={{fontSize:12,color:NAVY}}>{item.name}</div><div style={{fontSize:10,color:"#3A5BA0"}}>{isES?"valores por 100g":"values per 100g"}</div></div>
              <input type="number" min={1} value={item.grams} onChange={e=>updateGrams(idx,e.target.value)} style={{width:70,padding:"4px 8px",borderRadius:6,border:"0.5px solid #D4E3FF",fontSize:12,fontFamily:F,color:NAVY,textAlign:"right"}}/>
              <span style={{fontSize:11,color:"#3A5BA0",fontFamily:F}}>g</span>
              <span style={{fontSize:11,color:"#3A5BA0",fontFamily:F,minWidth:80}}>{calc("kcal",item)} kcal</span>
              <button onClick={()=>removeIngredient(idx)} style={{background:"none",border:"none",cursor:"pointer",color:"#ef4444",fontSize:14,padding:"0 4px"}}>✕</button>
            </div>
          ))}
        </div>
      )}

      {ingredients.length>0 && (
        <div style={{background:"#fff",border:"0.5px solid #D4E3FF",borderRadius:12,padding:20,marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontSize:14,fontWeight:500,color:NAVY,fontFamily:F}}>{isES?"Valor nutricional por porción":"Nutritional value per serving"}</div>
            {tags.length>0&&<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{tags.map((t,i)=><span key={i} style={{fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:20,background:t.bg,color:t.color,fontFamily:F}}>{t.label}</span>)}</div>}
          </div>
          {[
            {key:"kcal",    label:"Calorías",        en:"Calories",    unit:"kcal"},
            {key:"protein", label:"Proteínas",        en:"Protein",     unit:"g"},
            {key:"fat",     label:"Grasas",           en:"Fat",         unit:"g"},
            {key:"carbs",   label:"Carbohidratos",    en:"Carbohydrates",unit:"g"},
            {key:"fiber",   label:"Fibra",            en:"Fiber",       unit:"g"},
            {key:"sodium",  label:"Sodio",            en:"Sodium",      unit:"mg"},
          ].map(row=>(
            <div key={row.key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",marginBottom:4,background:"#F5F7FF",borderRadius:8}}>
              <span style={{fontSize:12,color:NAVY,fontFamily:F}}>{isES?row.label:row.en}</span>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:11,color:"#3A5BA0",fontFamily:F}}>{isES?"Total":"Total"}: {+totals[row.key].toFixed(1)} {row.unit}</span>
                <span style={{fontSize:14,fontWeight:500,color:trafficColor(row.key,perPerson[row.key]),fontFamily:F}}>{perPerson[row.key]} {row.unit}</span>
              </div>
            </div>
          ))}
          <div style={{marginTop:12,display:"flex",gap:8}}>
            <button onClick={saveRecipe} style={{padding:"8px 18px",borderRadius:8,background:TEAL,color:"#fff",fontSize:12,fontWeight:500,border:"none",cursor:"pointer",fontFamily:F}}>{isES?"💾 Guardar receta":"💾 Save recipe"}</button>
            <button onClick={exportPDF} style={{padding:"8px 18px",borderRadius:8,background:NAVY,color:"#fff",fontSize:12,fontWeight:500,border:"none",cursor:"pointer",fontFamily:F}}>{isES?"⬇ PDF":"⬇ PDF"}</button>
            {saveMsg&&<span style={{fontSize:12,color:saveMsg.startsWith("✅")?"#16a34a":"#ef4444",fontFamily:F,alignSelf:"center"}}>{saveMsg}</span>}
          </div>
        </div>
      )}

      <div style={{marginTop:8}}>
        <button onClick={()=>setShowSaved(!showSaved)} style={{padding:"7px 16px",borderRadius:20,border:"0.5px solid #D4E3FF",background:"#fff",color:NAVY,fontSize:12,fontFamily:F,cursor:"pointer"}}>
          {isES?`📋 Recetas guardadas (${saved.length})`:`📋 Saved recipes (${saved.length})`}
        </button>
        {showSaved && saved.length>0 && (
          <div style={{marginTop:10,background:"#fff",border:"0.5px solid #D4E3FF",borderRadius:12,padding:16}}>
            {saved.map(r=>(
              <div key={r.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"0.5px solid #F5F7FF"}}>
                <div>
                  <div style={{fontSize:13,fontWeight:500,color:NAVY,fontFamily:F}}>{r.name}</div>
                  <div style={{fontSize:11,color:"#3A5BA0",fontFamily:F}}>{r.ingredients.length} {isES?"ingredientes":"ingredients"} · {+(r.totals.kcal/r.diners).toFixed(0)} kcal/{isES?"porción":"serving"}</div>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>loadRecipe(r)} style={{padding:"5px 12px",borderRadius:6,background:BLUE,color:"#fff",fontSize:11,border:"none",cursor:"pointer",fontFamily:F}}>{isES?"Cargar":"Load"}</button>
                  <button onClick={()=>deleteRecipe(r.id)} style={{padding:"5px 10px",borderRadius:6,background:"#FCEBEB",color:"#A32D2D",fontSize:11,border:"none",cursor:"pointer",fontFamily:F}}>✕</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {showSaved && saved.length===0 && (
          <div style={{marginTop:10,fontSize:12,color:"#3A5BA0",fontFamily:F}}>{isES?"No hay recetas guardadas aún.":"No saved recipes yet."}</div>
        )}
      </div>

      <div style={{marginTop:32,padding:16,background:"#F5F7FF",borderRadius:10,fontSize:11,color:"#3A5BA0",fontFamily:F}}>
        {isES?"Fuente: USDA FoodData Central. Los valores nutricionales son por 100g del alimento crudo salvo indicación. Esta herramienta es orientativa y no reemplaza el criterio de un profesional de la salud.":"Source: USDA FoodData Central. Nutritional values are per 100g of raw food unless stated. This tool is for guidance only and does not replace professional health advice."}
      </div>
    </div>
  );
}

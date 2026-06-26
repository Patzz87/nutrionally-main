import { useState } from "react";
const F = "Plus Jakarta Sans, sans-serif";
const TEAL = "#2A9D8F";
const NAVY = "#1E2D4E";
const BLUE = "#2563EB";
const RED = "#A32D2D";
const REDBG = "#FCEBEB";

function InfoCard({title, children, color=BLUE, bg="#EFF6FF"}) {
  return (
    <div style={{background:bg,border:`0.5px solid ${color}22`,borderRadius:12,padding:20,marginBottom:14}}>
      <div style={{fontSize:13,fontWeight:500,color,marginBottom:10,fontFamily:F}}>{title}</div>
      {children}
    </div>
  );
}

function Table({headers, rows}) {
  return (
    <div style={{overflowX:"auto",marginTop:8}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,fontFamily:F}}>
        <thead>
          <tr>{headers.map((h,i)=><th key={i} style={{padding:"8px 12px",background:"#F5F7FF",color:NAVY,fontWeight:600,textAlign:"left",borderBottom:"1px solid #D4E3FF"}}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row,i)=><tr key={i} style={{borderBottom:"0.5px solid #F0F4FF"}}>{row.map((cell,j)=><td key={j} style={{padding:"8px 12px",color:"#3A5BA0"}}>{cell}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  );
}

function GISearch({isES}) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const foods = [
    {name:"Arroz blanco / White rice", gi:72},{name:"Arroz integral / Brown rice", gi:50},{name:"Pan blanco / White bread", gi:75},{name:"Pan integral / Whole wheat bread", gi:51},{name:"Avena / Oats", gi:55},{name:"Quinoa", gi:53},{name:"Papa / Potato", gi:78},{name:"Camote / Sweet potato", gi:63},{name:"Plátano / Banana", gi:51},{name:"Manzana / Apple", gi:36},{name:"Naranja / Orange", gi:43},{name:"Uvas / Grapes", gi:59},{name:"Sandía / Watermelon", gi:76},{name:"Mango", gi:60},{name:"Zanahoria / Carrot", gi:39},{name:"Maíz / Corn", gi:52},{name:"Lentejas / Lentils", gi:32},{name:"Frijoles / Black beans", gi:30},{name:"Garbanzos / Chickpeas", gi:28},{name:"Soya / Soybeans", gi:15},{name:"Leche / Milk", gi:31},{name:"Yogur / Yogurt", gi:41},{name:"Espagueti al dente / Spaghetti al dente", gi:49},{name:"Arroz jazmín / Jasmine rice", gi:89},{name:"Tortilla de maíz / Corn tortilla", gi:52},{name:"Plátano verde / Green plantain", gi:40},{name:"Yuca / Cassava", gi:46},{name:"Glucosa / Glucose", gi:100},{name:"Azúcar / Sugar", gi:65},{name:"Miel / Honey", gi:61},{name:"Jugo de naranja / Orange juice", gi:50},{name:"Refresco / Soda", gi:63},{name:"Fresa / Strawberry", gi:40},{name:"Pera / Pear", gi:38},{name:"Papaya", gi:59},{name:"Piña / Pineapple", gi:66},{name:"Cacahuate / Peanuts", gi:14},
  ];
  const giColor = gi => gi<55?"#0F6E56":gi<70?"#854F0B":"#A32D2D";
  const giBg = gi => gi<55?"#E1F5EE":gi<70?"#FAEEDA":"#FCEBEB";
  const giLabel = gi => gi<55?(isES?"Bajo — recomendado para DM2":"Low — recommended for T2DM"):gi<70?(isES?"Medio — con moderación":"Medium — in moderation"):(isES?"Alto — limitar en DM2":"High — limit in T2DM");
  const filtered = query.length>1 ? foods.filter(f=>f.name.toLowerCase().includes(query.toLowerCase())).slice(0,6) : [];
  return (
    <div>
      <input value={query} onChange={e=>{setQuery(e.target.value);setResult(null);}} placeholder={isES?"Buscar alimento...":"Search food..."} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"0.5px solid #D4E3FF",fontSize:13,fontFamily:F,outline:"none",boxSizing:"border-box",marginBottom:8}}/>
      {filtered.map(f=>(
        <div key={f.name} onClick={()=>{setResult(f);setQuery(f.name);}} style={{padding:"8px 12px",borderBottom:"0.5px solid #F0F4FF",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:12,color:NAVY,fontFamily:F}}>{f.name}</span>
          <span style={{fontSize:12,fontWeight:500,padding:"2px 8px",borderRadius:10,background:giBg(f.gi),color:giColor(f.gi),fontFamily:F}}>IG {f.gi}</span>
        </div>
      ))}
      {result&&query===result.name&&(
        <div style={{marginTop:10,padding:14,background:"#F5F7FF",borderRadius:8}}>
          <div style={{display:"flex",gap:8,marginBottom:8}}>
            <div style={{flex:1,background:giBg(result.gi),borderRadius:8,padding:"10px 14px",textAlign:"center"}}>
              <div style={{fontSize:10,color:giColor(result.gi),fontFamily:F}}>IG</div>
              <div style={{fontSize:24,fontWeight:500,color:giColor(result.gi),fontFamily:F}}>{result.gi}</div>
            </div>
            <div style={{flex:2,background:"#fff",borderRadius:8,padding:"10px 14px",display:"flex",alignItems:"center"}}>
              <span style={{fontSize:12,color:giColor(result.gi),fontFamily:F,fontWeight:500}}>{giLabel(result.gi)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DM2Page({isES}) {
  const [tab, setTab] = useState("general");
  const tabs = [
    {id:"general", es:"General", en:"General"},
    {id:"cho", es:"Carbohidratos", en:"Carbohydrates"},
    {id:"macros", es:"Macronutrientes", en:"Macronutrients"},
    {id:"foods", es:"Alimentos", en:"Foods"},
    {id:"meal", es:"Plan de comidas", en:"Meal plan"},
    {id:"gi", es:"Índice glucémico", en:"Glycemic index"},
  ];
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"6px 16px",borderRadius:20,border:"0.5px solid #D4E3FF",background:tab===t.id?RED:"#fff",color:tab===t.id?"#fff":NAVY,fontSize:12,fontFamily:F,cursor:"pointer"}}>
            {isES?t.es:t.en}
          </button>
        ))}
      </div>

      {tab==="general"&&(
        <div>
          <InfoCard title={isES?"¿Qué es la DM2?":"What is T2DM?"} color={RED} bg={REDBG}>
            <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:0}}>{isES?"La diabetes mellitus tipo 2 (DM2) es una enfermedad metabólica crónica caracterizada por hiperglucemia resultante de resistencia a la insulina y disfunción progresiva de las células beta pancreáticas. El manejo nutricional es fundamental para el control glucémico y la prevención de complicaciones.":"Type 2 diabetes mellitus (T2DM) is a chronic metabolic disease characterized by hyperglycemia resulting from insulin resistance and progressive pancreatic beta cell dysfunction. Nutritional management is fundamental for glycemic control and prevention of complications."}</p>
          </InfoCard>
          <InfoCard title={isES?"Objetivos nutricionales (ADA 2024)":"Nutritional goals (ADA 2024)"} color={BLUE} bg="#EFF6FF">
            {[
              isES?"Lograr y mantener metas glucémicas (HbA1c < 7%)":"Achieve and maintain glycemic goals (HbA1c < 7%)",
              isES?"Alcanzar y mantener peso corporal saludable":"Achieve and maintain healthy body weight",
              isES?"Prevenir o retrasar complicaciones de la DM2":"Prevent or delay T2DM complications",
              isES?"Mantener el placer de comer con mínimas restricciones":"Maintain the pleasure of eating with minimal restrictions",
              isES?"Cubrir necesidades nutricionales individuales":"Meet individual nutritional needs",
            ].map((item,i)=>(
              <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:6}}>
                <span style={{color:BLUE,fontWeight:600,fontSize:12,flexShrink:0}}>✓</span>
                <span style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.5}}>{item}</span>
              </div>
            ))}
          </InfoCard>
          <InfoCard title={isES?"Metas glucémicas":"Glycemic targets"} color="#0F6E56" bg="#E1F5EE">
            <Table
              headers={["Parámetro / Parameter", isES?"Meta":"Target", isES?"Frecuencia de monitoreo":"Monitoring frequency"]}
              rows={[
                ["HbA1c", "< 7%", isES?"Cada 3-6 meses":"Every 3-6 months"],
                [isES?"Glucosa preprandial":"Preprandial glucose", "80-130 mg/dL", isES?"Diario":"Daily"],
                [isES?"Glucosa postprandial (2h)":"Postprandial glucose (2h)", "< 180 mg/dL", isES?"Según indicación":"As indicated"],
                [isES?"Glucosa al acostarse":"Bedtime glucose", "100-140 mg/dL", isES?"Según indicación":"As indicated"],
              ]}
            />
          </InfoCard>
        </div>
      )}

      {tab==="cho"&&(
        <div>
          <InfoCard title={isES?"Distribución de carbohidratos":"Carbohydrate distribution"} color={RED} bg={REDBG}>
            <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"No existe un porcentaje ideal universal de carbohidratos para DM2. La distribución debe individualizarse según preferencias, metas glucémicas y medicación. Se recomienda monitorear el total de carbohidratos por comida.":"There is no universal ideal carbohydrate percentage for T2DM. Distribution should be individualized based on preferences, glycemic goals and medication. Monitoring total carbohydrates per meal is recommended."}</p>
            <Table
              headers={[isES?"Distribución":"Distribution", isES?"CHO total/día":"Total CHO/day", isES?"CHO por comida":"CHO per meal"]}
              rows={[
                [isES?"Restrictiva (cetogénica)":"Restrictive (ketogenic)", "< 50g", "< 15g"],
                [isES?"Baja en CHO":"Low CHO", "50-130g", "15-45g"],
                [isES?"Moderada (recomendada)":"Moderate (recommended)", "130-225g", "45-75g"],
                [isES?"Alta (atletas)":"High (athletes)", "> 225g", "> 75g"],
              ]}
            />
          </InfoCard>
          <InfoCard title={isES?"Índice glucémico (IG) en DM2":"Glycemic index (GI) in T2DM"} color={BLUE} bg="#EFF6FF">
            <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"Preferir alimentos con IG bajo a moderado. La carga glucémica (CG) es más útil que el IG solo.":"Prefer foods with low to moderate GI. Glycemic load (GL) is more useful than GI alone."}</p>
            <Table
              headers={["IG", isES?"Clasificación":"Classification", isES?"Ejemplos":"Examples"]}
              rows={[
                ["< 55", isES?"Bajo ✓":"Low ✓", isES?"Leguminosas, avena, manzana, yogur":"Legumes, oats, apple, yogurt"],
                ["55-69", isES?"Medio — con precaución":"Medium — with caution", isES?"Plátano, arroz integral, pan integral":"Banana, brown rice, whole wheat bread"],
                ["≥ 70", isES?"Alto — limitar":"High — limit", isES?"Pan blanco, arroz blanco, papas, jugos":"White bread, white rice, potatoes, juices"],
              ]}
            />
          </InfoCard>
          <InfoCard title={isES?"Fibra dietética":"Dietary fiber"} color="#0F6E56" bg="#E1F5EE">
            <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 8px"}}>{isES?"Meta: 25-38g/día. La fibra soluble mejora el control glucémico y el perfil lipídico.":"Goal: 25-38g/day. Soluble fiber improves glycemic control and lipid profile."}</p>
            {[
              isES?"Avena, cebada (β-glucanos)":"Oats, barley (β-glucans)",
              isES?"Leguminosas: frijoles, lentejas, garbanzos":"Legumes: beans, lentils, chickpeas",
              isES?"Frutas con piel: manzana, pera":"Fruits with skin: apple, pear",
              isES?"Verduras sin almidón: brócoli, espinaca, nopal":"Non-starchy vegetables: broccoli, spinach, nopal",
            ].map((item,i)=>(
              <div key={i} style={{fontSize:12,color:"#3A5BA0",fontFamily:F,marginBottom:4}}>• {item}</div>
            ))}
          </InfoCard>
        </div>
      )}

      {tab==="macros"&&(
        <div>
          <InfoCard title={isES?"Distribución de macronutrientes recomendada":"Recommended macronutrient distribution"} color={RED} bg={REDBG}>
            <Table
              headers={["Macronutriente", isES?"%  de calorías totales":"% of total calories", isES?"Comentario":"Comment"]}
              rows={[
                [isES?"Carbohidratos":"Carbohydrates", "40-60%", isES?"Preferir complejos, IG bajo":"Prefer complex, low GI"],
                [isES?"Proteínas":"Protein", "15-25%", isES?"1.0-1.2 g/kg/día (sin nefropatía)":"1.0-1.2 g/kg/day (without nephropathy)"],
                [isES?"Grasas":"Fat", "20-35%", isES?"Limitar saturadas < 7%, evitar trans":"Limit saturated < 7%, avoid trans"],
              ]}
            />
          </InfoCard>
          <InfoCard title={isES?"Proteínas en DM2":"Protein in T2DM"} color={BLUE} bg="#EFF6FF">
            <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 8px"}}>{isES?"Recomendación general: 1.0-1.2 g/kg/día. Con nefropatía diabética: 0.6-0.8 g/kg/día. Las proteínas no elevan la glucosa postprandial significativamente.":"General recommendation: 1.0-1.2 g/kg/day. With diabetic nephropathy: 0.6-0.8 g/kg/day. Proteins do not significantly raise postprandial glucose."}</p>
            {[isES?"Fuentes magras: pollo, pavo, pescado":"Lean sources: chicken, turkey, fish",isES?"Huevo (clara y yema con moderación)":"Egg (white and yolk in moderation)",isES?"Leguminosas (doble beneficio: proteína + fibra)":"Legumes (double benefit: protein + fiber)",isES?"Lácteos bajos en grasa":"Low-fat dairy"].map((item,i)=>(<div key={i} style={{fontSize:12,color:"#3A5BA0",fontFamily:F,marginBottom:4}}>• {item}</div>))}
          </InfoCard>
          <InfoCard title={isES?"Grasas en DM2":"Fat in T2DM"} color="#854F0B" bg="#FAEEDA">
            <Table
              headers={[isES?"Tipo de grasa":"Fat type", isES?"Recomendación":"Recommendation", isES?"Fuentes":"Sources"]}
              rows={[
                [isES?"Monoinsaturadas":"Monounsaturated", isES?"Aumentar":"Increase", isES?"Aguacate, aceite de oliva, nueces":"Avocado, olive oil, nuts"],
                [isES?"Poliinsaturadas omega-3":"Polyunsaturated omega-3", isES?"Aumentar":"Increase", isES?"Salmón, sardina, semillas de chía":"Salmon, sardine, chia seeds"],
                [isES?"Saturadas":"Saturated", "< 7% kcal", isES?"Limitar carnes rojas, lácteos enteros":"Limit red meat, whole dairy"],
                [isES?"Trans":"Trans", isES?"Eliminar":"Eliminate", isES?"Evitar alimentos ultraprocesados":"Avoid ultra-processed foods"],
              ]}
            />
          </InfoCard>
        </div>
      )}

      {tab==="foods"&&(
        <div>
          <InfoCard title={isES?"Alimentos recomendados":"Recommended foods"} color="#0F6E56" bg="#E1F5EE">
            {[
              {cat:isES?"Verduras sin almidón":"Non-starchy vegetables", items:isES?"Espinaca, brócoli, coliflor, pepino, tomate, nopal, chayote, lechuga":"Spinach, broccoli, cauliflower, cucumber, tomato, nopal, chayote, lettuce"},
              {cat:isES?"Proteínas magras":"Lean proteins", items:isES?"Pollo sin piel, pavo, pescado, clara de huevo, leguminosas":"Skinless chicken, turkey, fish, egg white, legumes"},
              {cat:isES?"Granos enteros":"Whole grains", items:isES?"Avena, quinoa, cebada, arroz integral (porciones controladas)":"Oats, quinoa, barley, brown rice (controlled portions)"},
              {cat:isES?"Leguminosas":"Legumes", items:isES?"Frijoles, lentejas, garbanzos, soya — IG bajo y alta fibra":"Beans, lentils, chickpeas, soybeans — low GI and high fiber"},
              {cat:isES?"Grasas saludables":"Healthy fats", items:isES?"Aguacate, aceite de oliva extra virgen, nueces, almendras, semillas de chía":"Avocado, extra virgin olive oil, walnuts, almonds, chia seeds"},
            ].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:"#0F6E56",fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
          </InfoCard>
          <InfoCard title={isES?"Alimentos a limitar o evitar":"Foods to limit or avoid"} color={RED} bg={REDBG}>
            {[
              {cat:isES?"Azúcares simples":"Simple sugars", items:isES?"Refrescos, jugos, dulces, miel, azúcar de mesa":"Sodas, juices, candy, honey, table sugar"},
              {cat:isES?"Cereales refinados":"Refined grains", items:isES?"Pan blanco, arroz blanco, pasta refinada, galletas":"White bread, white rice, refined pasta, crackers"},
              {cat:isES?"Grasas saturadas y trans":"Saturated and trans fats", items:isES?"Manteca, margarina, comida rápida, alimentos fritos":"Lard, margarine, fast food, fried foods"},
              {cat:isES?"Alcohol":"Alcohol", items:isES?"Aumenta riesgo de hipoglucemia, aporta calorías vacías":"Increases hypoglycemia risk, provides empty calories"},
              {cat:isES?"Ultraprocesados":"Ultra-processed", items:isES?"Botanas, embutidos, comida congelada procesada":"Snacks, cold cuts, processed frozen food"},
            ].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:RED,fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
          </InfoCard>
        </div>
      )}

      {tab==="gi"&&(
        <div>
          <InfoCard title={isES?"Consulta el índice glucémico de alimentos":"Look up the glycemic index of foods"} color={RED} bg={REDBG}>
            <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 12px"}}>{isES?"En DM2 es fundamental conocer el IG de los alimentos para tomar mejores decisiones. Busca cualquier alimento y obtén su clasificación.":"In T2DM it is essential to know the GI of foods to make better decisions. Search any food and get its classification."}</p>
            <GISearch isES={isES}/>
          </InfoCard>
        </div>
      )}
      {tab==="meal"&&(
        <div>
          <InfoCard title={isES?"Plan de comidas ejemplo (1800 kcal)":"Sample meal plan (1800 kcal)"} color={RED} bg={REDBG}>
            <p style={{fontSize:11,color:"#3A5BA0",fontFamily:F,margin:"0 0 12px"}}>{isES?"Distribución: 50% CHO / 20% proteína / 30% grasa — adaptable según paciente":"Distribution: 50% CHO / 20% protein / 30% fat — adaptable per patient"}</p>
            <Table
              headers={[isES?"Comida":"Meal", isES?"Alimentos":"Foods", "CHO", "kcal"]}
              rows={[
                [isES?"Desayuno 7am":"Breakfast 7am", isES?"Avena 40g + leche descremada 200mL + 1 manzana pequeña":"Oats 40g + skim milk 200mL + 1 small apple", "55g", "350"],
                [isES?"Colación 10am":"Snack 10am", isES?"Yogur natural 150g + nueces 15g":"Plain yogurt 150g + walnuts 15g", "15g", "180"],
                [isES?"Almuerzo 1pm":"Lunch 1pm", isES?"Pollo 120g + arroz integral 60g + ensalada + aguacate 30g":"Chicken 120g + brown rice 60g + salad + avocado 30g", "60g", "520"],
                [isES?"Colación 4pm":"Snack 4pm", isES?"1 pera + almendras 20g":"1 pear + almonds 20g", "25g", "200"],
                [isES?"Cena 7pm":"Dinner 7pm", isES?"Salmón 100g + quinoa 50g + verduras salteadas":"Salmon 100g + quinoa 50g + sautéed vegetables", "45g", "420"],
                [isES?"Colación nocturna":"Evening snack", isES?"Leche descremada 200mL":"Skim milk 200mL", "12g", "70"],
                ["Total", "", "212g (47%)", "1740 kcal"],
              ]}
            />
          </InfoCard>
          <InfoCard title={isES?"Distribución por tiempo de comida":"Distribution by meal time"} color={BLUE} bg="#EFF6FF">
            <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:0}}>{isES?"Se recomienda distribuir los carbohidratos de manera uniforme en 3 comidas principales y 2-3 colaciones para evitar picos glucémicos. El método del plato de la ADA es una herramienta práctica: ½ plato de verduras sin almidón, ¼ proteína magra, ¼ granos/almidón.":"It is recommended to distribute carbohydrates evenly in 3 main meals and 2-3 snacks to avoid glycemic spikes. The ADA plate method is a practical tool: ½ plate non-starchy vegetables, ¼ lean protein, ¼ grains/starch."}</p>
          </InfoCard>
        </div>
      )}
    </div>
  );
}

function ARPage({isES}) {
  const [tab, setTab] = useState("general");
  const PURPLE = "#7C3AED";
  const PURPLEBG = "#F3E8FF";
  const tabs = [{id:"general",es:"General",en:"General"},{id:"foods",es:"Alimentos",en:"Foods"},{id:"supplements",es:"Suplementos",en:"Supplements"},{id:"meal",es:"Plan de comidas",en:"Meal plan"}];
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"6px 16px",borderRadius:20,border:"0.5px solid #D4E3FF",background:tab===t.id?PURPLE:"#fff",color:tab===t.id?"#fff":PURPLE,fontSize:12,fontFamily:F,cursor:"pointer"}}>{isES?t.es:t.en}</button>))}
      </div>
      {tab==="general"&&(
        <div>
          <InfoCard title={isES?"Artritis reumatoide y nutrición":"Rheumatoid arthritis and nutrition"} color={PURPLE} bg={PURPLEBG}>
            <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:0}}>{isES?"La artritis reumatoide (AR) es una enfermedad autoinmune inflamatoria crónica. La dieta juega un papel fundamental en la modulación de la inflamación, el manejo del dolor y la prevención de comorbilidades. Una dieta antiinflamatoria puede reducir la actividad de la enfermedad y mejorar la calidad de vida.":"Rheumatoid arthritis (RA) is a chronic inflammatory autoimmune disease. Diet plays a fundamental role in modulating inflammation, pain management and prevention of comorbidities. An anti-inflammatory diet can reduce disease activity and improve quality of life."}</p>
          </InfoCard>
          <InfoCard title={isES?"Objetivos nutricionales en AR":"Nutritional goals in RA"} color="#2563EB" bg="#EFF6FF">
            {[isES?"Reducir inflamación sistémica mediante dieta antiinflamatoria":"Reduce systemic inflammation through anti-inflammatory diet",isES?"Mantener peso saludable — la obesidad aumenta la actividad de la enfermedad":"Maintain healthy weight — obesity increases disease activity",isES?"Prevenir desnutrición y pérdida de masa muscular (sarcopenia)":"Prevent malnutrition and muscle mass loss (sarcopenia)",isES?"Cubrir necesidades aumentadas de calcio y vitamina D (por corticosteroides)":"Meet increased calcium and vitamin D needs (from corticosteroids)",isES?"Reducir riesgo cardiovascular elevado en AR":"Reduce elevated cardiovascular risk in RA"].map((item,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:PURPLE,fontWeight:600,fontSize:12}}>✓</span><span style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.5}}>{item}</span></div>))}
          </InfoCard>
          <InfoCard title={isES?"Relación peso-articulaciones":"Weight-joint relationship"} color="#0F6E56" bg="#E1F5EE">
            <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:0}}>{isES?"Cada kilogramo de exceso de peso genera 4-6 kg adicionales de presión sobre las articulaciones de carga. La pérdida de peso del 5-10% puede reducir significativamente el dolor articular y la inflamación. El tejido adiposo produce adipocinas proinflamatorias (IL-6, TNF-α) que agravan la AR.":"Each kilogram of excess weight generates 4-6 kg of additional pressure on load-bearing joints. Weight loss of 5-10% can significantly reduce joint pain and inflammation. Adipose tissue produces pro-inflammatory adipokines (IL-6, TNF-α) that worsen RA."}</p>
          </InfoCard>
        </div>
      )}
      {tab==="foods"&&(
        <div>
          <InfoCard title={isES?"Alimentos antiinflamatorios — aumentar":"Anti-inflammatory foods — increase"} color="#0F6E56" bg="#E1F5EE">
            {[{cat:isES?"Omega-3 (antiinflamatorio potente)":"Omega-3 (potent anti-inflammatory)",items:isES?"Salmón, sardina, macarela, atún, semillas de chía, linaza, nueces":"Salmon, sardine, mackerel, tuna, chia seeds, flaxseed, walnuts"},{cat:isES?"Frutas y verduras ricas en antioxidantes":"Antioxidant-rich fruits and vegetables",items:isES?"Arándanos, cereza, fresa, espinaca, brócoli, pimiento rojo, col morada":"Blueberries, cherry, strawberry, spinach, broccoli, red pepper, purple cabbage"},{cat:isES?"Aceite de oliva extra virgen":"Extra virgin olive oil",items:isES?"Rico en oleocantal con efecto similar al ibuprofeno":"Rich in oleocanthal with ibuprofen-like effect"},{cat:isES?"Especias antiinflamatorias":"Anti-inflammatory spices",items:isES?"Cúrcuma + pimienta negra, jengibre, ajo, canela":"Turmeric + black pepper, ginger, garlic, cinnamon"},{cat:isES?"Leguminosas":"Legumes",items:isES?"Frijoles, lentejas, garbanzos — fibra y antioxidantes":"Beans, lentils, chickpeas — fiber and antioxidants"},{cat:isES?"Té verde":"Green tea",items:isES?"EGCG inhibe vías inflamatorias":"EGCG inhibits inflammatory pathways"}].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:"#0F6E56",fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
          </InfoCard>
          <InfoCard title={isES?"Alimentos proinflamatorios — reducir":"Pro-inflammatory foods — reduce"} color="#A32D2D" bg="#FCEBEB">
            {[{cat:isES?"Omega-6 en exceso":"Excess omega-6",items:isES?"Aceites de maíz, soya, girasol — desbalancean ratio omega6:omega3":"Corn, soybean, sunflower oils — unbalance omega6:omega3 ratio"},{cat:isES?"Azúcares y carbohidratos refinados":"Sugars and refined carbohydrates",items:isES?"Activan NF-kB, aumentan PCR y citocinas inflamatorias":"Activate NF-kB, increase CRP and inflammatory cytokines"},{cat:isES?"Carnes rojas y procesadas":"Red and processed meats",items:isES?"Ricas en ácido araquidónico precursor de prostaglandinas inflamatorias":"Rich in arachidonic acid precursor of inflammatory prostaglandins"},{cat:isES?"Alcohol":"Alcohol",items:isES?"Aumenta permeabilidad intestinal y carga inflamatoria":"Increases intestinal permeability and inflammatory load"},{cat:isES?"Grasas trans":"Trans fats",items:isES?"Alimentos ultraprocesados, margarinas, comida rápida":"Ultra-processed foods, margarines, fast food"}].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:"#A32D2D",fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
          </InfoCard>
          <InfoCard title={isES?"Calcio y vitamina D (por uso de corticosteroides)":"Calcium and vitamin D (due to corticosteroid use)"} color="#854F0B" bg="#FAEEDA">
            <Table headers={["Nutriente", isES?"Meta/día":"Goal/day", isES?"Fuentes":"Sources"]} rows={[[isES?"Calcio":"Calcium","1000-1200 mg",isES?"Lácteos, sardinas con hueso, tofu, brócoli":"Dairy, bone-in sardines, tofu, broccoli"],[isES?"Vitamina D":"Vitamin D","800-2000 UI",isES?"Exposición solar, salmón, huevo, suplemento":"Sun exposure, salmon, egg, supplement"],[isES?"Vitamina C":"Vitamin C","≥75 mg",isES?"Pimiento, cítricos, fresas, brócoli":"Pepper, citrus, strawberries, broccoli"]]}/>
          </InfoCard>
        </div>
      )}
      {tab==="supplements"&&(
        <div>
          <InfoCard title={isES?"Suplementos con evidencia en AR":"Supplements with evidence in RA"} color={PURPLE} bg={PURPLEBG}>
            <Table headers={["Suplemento", isES?"Dosis sugerida":"Suggested dose", isES?"Evidencia":"Evidence", isES?"Notas":"Notes"]} rows={[["Omega-3 (EPA+DHA)","2-4 g/día",isES?"Alta — reduce rigidez matutina y dolor":"High — reduces morning stiffness and pain",isES?"Preferir forma triglicérido, con comida":"Prefer triglyceride form, with food"],["Vitamina D","1000-2000 UI/día",isES?"Alta — deficiencia común en AR":"High — deficiency common in RA",isES?"Monitorear niveles séricos":"Monitor serum levels"],["Cúrcuma / Curcumina","500-1000 mg/día",isES?"Moderada — propiedades antiinflamatorias":"Moderate — anti-inflammatory properties",isES?"Combinar con piperina para mejor absorción":"Combine with piperine for better absorption"],["Probióticos","10-20 billones UFC/día",isES?"Moderada — modula microbiota y respuesta inmune":"Moderate — modulates microbiota and immune response",isES?"Lactobacillus y Bifidobacterium":"Lactobacillus and Bifidobacterium"],["Magnesio","300-400 mg/día",isES?"Moderada — antiinflamatorio, mejora sueño":"Moderate — anti-inflammatory, improves sleep",isES?"Glicinato o citrato mejor tolerado":"Glycinate or citrate better tolerated"]]}/>
          </InfoCard>
          <InfoCard title={isES?"Dieta mediterránea en AR":"Mediterranean diet in RA"} color="#0F6E56" bg="#E1F5EE">
            <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:0}}>{isES?"La dieta mediterránea es el patrón dietético con mayor evidencia en AR. Estudios muestran reducción de la actividad de la enfermedad (DAS28), menor dolor y mejor función física. Sus pilares: aceite de oliva extra virgen, pescado azul 3x/semana, abundantes frutas y verduras, leguminosas diarias, cereales integrales y mínima carne roja.":"The Mediterranean diet is the dietary pattern with the most evidence in RA. Studies show reduction in disease activity (DAS28), less pain and better physical function. Its pillars: extra virgin olive oil, oily fish 3x/week, abundant fruits and vegetables, daily legumes, whole grains and minimal red meat."}</p>
          </InfoCard>
        </div>
      )}
      {tab==="meal"&&(
        <div>
          <InfoCard title={isES?"Plan antiinflamatorio ejemplo (2000 kcal)":"Sample anti-inflammatory plan (2000 kcal)"} color={PURPLE} bg={PURPLEBG}>
            <Table headers={[isES?"Comida":"Meal", isES?"Alimentos":"Foods", "kcal"]} rows={[[isES?"Desayuno":"Breakfast",isES?"Avena 50g + arándanos 100g + nueces 20g + té verde":"Oats 50g + blueberries 100g + walnuts 20g + green tea","380"],[isES?"Colación":"Snack",isES?"1 naranja + almendras 20g":"1 orange + almonds 20g","180"],[isES?"Almuerzo":"Lunch",isES?"Salmón 150g + quinoa 60g + ensalada de espinaca + aceite de oliva 15mL":"Salmon 150g + quinoa 60g + spinach salad + olive oil 15mL","580"],[isES?"Colación":"Snack",isES?"Yogur natural 150g + fresas 100g":"Plain yogurt 150g + strawberries 100g","160"],[isES?"Cena":"Dinner",isES?"Pollo 120g + verduras salteadas en aceite de oliva + arroz integral 50g":"Chicken 120g + vegetables sautéed in olive oil + brown rice 50g","480"],[isES?"Extra":"Extra",isES?"Cúrcuma en alguna preparación del día":"Turmeric in a preparation during the day","—"],["Total","","1780 kcal"]]}/>
          </InfoCard>
        </div>
      )}
    </div>
  );
}

function PregnancyPage({isES}) {
  const [tab,setTab]=useState("general");
  const COLOR="#BE185D"; const BG="#FCE7F3";
  const tabs=[{id:"general",es:"General",en:"General"},{id:"trimester",es:"Por trimestre",en:"By trimester"},{id:"nutrients",es:"Nutrientes clave",en:"Key nutrients"},{id:"avoid",es:"Qué evitar",en:"What to avoid"},{id:"lactation",es:"Lactancia",en:"Lactation"}];
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"6px 16px",borderRadius:20,border:"0.5px solid #D4E3FF",background:tab===t.id?COLOR:"#fff",color:tab===t.id?"#fff":COLOR,fontSize:12,fontFamily:F,cursor:"pointer"}}>{isES?t.es:t.en}</button>))}
      </div>
      {tab==="general"&&(<div>
        <InfoCard title={isES?"Nutrición en el embarazo":"Nutrition during pregnancy"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"La nutrición durante el embarazo impacta directamente el desarrollo fetal, el peso al nacer, el riesgo de complicaciones y la salud a largo plazo del niño (programación fetal). El embarazo NO es momento para dietas restrictivas — sí para optimizar la calidad nutricional.":"Nutrition during pregnancy directly impacts fetal development, birth weight, risk of complications and the child's long-term health (fetal programming). Pregnancy is NOT the time for restrictive diets — it IS the time to optimize nutritional quality."}</p>
        </InfoCard>
        <InfoCard title={isES?"Aumento de peso recomendado en el embarazo (IOM)":"Recommended weight gain in pregnancy (IOM)"} color="#2563EB" bg="#EFF6FF">
          <Table headers={[isES?"IMC pregestacional":"Pre-pregnancy BMI",isES?"Aumento total recomendado":"Recommended total gain",isES?"Tasa 2-3er trimestre":"Rate 2nd-3rd trimester"]} rows={[["< 18.5 (bajo peso)","12.5-18 kg","0.5 kg/semana"],["18.5-24.9 (normal)","11.5-16 kg","0.4 kg/semana"],["25-29.9 (sobrepeso)","7-11.5 kg","0.3 kg/semana"],["≥ 30 (obesidad)","5-9 kg","0.2 kg/semana"],["Gemelos (normal)","16.8-24.5 kg","0.7 kg/semana"]]}/>
        </InfoCard>
        <InfoCard title={isES?"Necesidades calóricas adicionales":"Additional caloric needs"} color="#0F6E56" bg="#E1F5EE">
          <Table headers={[isES?"Trimestre":"Trimester",isES?"Calorías adicionales/día":"Additional calories/day",isES?"Equivalente":"Equivalent"]} rows={[["1er trimestre","+0 kcal",isES?"Sin aumento requerido":"No increase required"],["2do trimestre","+340 kcal",isES?"~1 taza de avena + huevo":"~1 cup oatmeal + egg"],["3er trimestre","+450 kcal",isES?"~yogur + fruta + nueces":"~yogurt + fruit + nuts"]]}/>
        </InfoCard>
      </div>)}
      {tab==="trimester"&&(<div>
        <InfoCard title={isES?"Primer trimestre (semanas 1-12)":"First trimester (weeks 1-12)"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 8px"}}>{isES?"Período crítico de organogénesis. Las náuseas y vómitos afectan al 70-80% de las embarazadas. Priorizar ácido fólico, hierro y yodo.":"Critical period of organogenesis. Nausea and vomiting affect 70-80% of pregnant women. Prioritize folic acid, iron and iodine."}</p>
          {[isES?"Ácido fólico: 400-800 mcg/día — ANTES de concebir y durante todo el 1er trimestre":"Folic acid: 400-800 mcg/day — BEFORE conceiving and throughout 1st trimester",isES?"Para náuseas: comidas pequeñas frecuentes, jengibre, evitar olores fuertes":"For nausea: small frequent meals, ginger, avoid strong odors",isES?"Hidratación: 2-2.5L/día — especialmente si hay vómitos":"Hydration: 2-2.5L/day — especially with vomiting",isES?"Evitar alcohol completamente desde la concepción":"Avoid alcohol completely from conception"].map((item,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:COLOR,fontWeight:600}}>✓</span><span style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.5}}>{item}</span></div>))}
        </InfoCard>
        <InfoCard title={isES?"Segundo trimestre (semanas 13-26)":"Second trimester (weeks 13-26)"} color="#2563EB" bg="#EFF6FF">
          {[isES?"Aumentan las necesidades calóricas (+340 kcal/día)":"Caloric needs increase (+340 kcal/day)",isES?"Hierro: mayor demanda por expansión del volumen sanguíneo":"Iron: greater demand from blood volume expansion",isES?"Calcio: mineralización ósea fetal — 1000 mg/día":"Calcium: fetal bone mineralization — 1000 mg/day",isES?"DHA: desarrollo cerebral fetal — 200-300 mg/día":"DHA: fetal brain development — 200-300 mg/day",isES?"Proteínas: +25g/día sobre el requerimiento basal":"Protein: +25g/day above baseline requirement"].map((item,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:"#2563EB",fontWeight:600}}>✓</span><span style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.5}}>{item}</span></div>))}
        </InfoCard>
        <InfoCard title={isES?"Tercer trimestre (semanas 27-40)":"Third trimester (weeks 27-40)"} color="#0F6E56" bg="#E1F5EE">
          {[isES?"Mayor demanda calórica (+450 kcal/día)":"Higher caloric demand (+450 kcal/day)",isES?"Calcio y vitamina D: máxima mineralización ósea fetal":"Calcium and vitamin D: maximum fetal bone mineralization",isES?"Comidas más pequeñas — el útero comprime el estómago":"Smaller meals — uterus compresses stomach",isES?"Fibra: prevenir estreñimiento común en este trimestre":"Fiber: prevent constipation common in this trimester",isES?"Reducir sodio si hay edema o preeclampsia":"Reduce sodium if edema or preeclampsia"].map((item,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:"#0F6E56",fontWeight:600}}>✓</span><span style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.5}}>{item}</span></div>))}
        </InfoCard>
      </div>)}
      {tab==="nutrients"&&(<div>
        <InfoCard title={isES?"Nutrientes críticos en el embarazo":"Critical nutrients in pregnancy"} color={COLOR} bg={BG}>
          <Table headers={["Nutriente",isES?"Meta/día":"Goal/day",isES?"Función":"Function",isES?"Fuentes":"Sources"]} rows={[["Ácido fólico","400-800 mcg",isES?"Tubo neural, ADN, división celular":"Neural tube, DNA, cell division",isES?"Leguminosas, espinaca, suplemento":"Legumes, spinach, supplement"],["Hierro / Iron","27 mg",isES?"Hemoglobina fetal, expansión sanguínea materna":"Fetal hemoglobin, maternal blood expansion",isES?"Carnes rojas, leguminosas + vitamina C":"Red meats, legumes + vitamin C"],["Calcio","1000 mg",isES?"Mineralización ósea fetal":"Fetal bone mineralization",isES?"Lácteos, sardinas, tofu":"Dairy, sardines, tofu"],["Vitamina D","600-2000 UI",isES?"Absorción de calcio, inmunidad, neurodesarrollo":"Calcium absorption, immunity, neurodevelopment",isES?"Sol, salmón, suplemento":"Sun, salmon, supplement"],["DHA / Omega-3","200-300 mg",isES?"Neurodesarrollo, retina fetal":"Neurodevelopment, fetal retina",isES?"Salmón, sardina, suplemento":"Salmon, sardine, supplement"],["Yodo / Iodine","220 mcg",isES?"Tiroides fetal, neurodesarrollo":"Fetal thyroid, neurodevelopment",isES?"Sal yodada, mariscos, lácteos":"Iodized salt, seafood, dairy"],["Colina","450 mg",isES?"Desarrollo cerebral, tubo neural":"Brain development, neural tube",isES?"Huevo, hígado, frijoles":"Egg, liver, beans"],["Vitamina B12","2.6 mcg",isES?"Sistema nervioso fetal (crítico en vegetarianas)":"Fetal nervous system (critical in vegetarians)",isES?"Carnes, lácteos, huevo, suplemento":"Meats, dairy, egg, supplement"]]}/>
        </InfoCard>
      </div>)}
      {tab==="avoid"&&(<div>
        <InfoCard title={isES?"Alimentos y sustancias a evitar en el embarazo":"Foods and substances to avoid in pregnancy"} color="#A32D2D" bg="#FCEBEB">
          <Table headers={[isES?"Evitar":"Avoid",isES?"Razón":"Reason",isES?"Alternativa":"Alternative"]} rows={[["Alcohol",isES?"Sin dosis segura — síndrome alcohólico fetal":"No safe dose — fetal alcohol syndrome",isES?"Agua, jugos naturales, té":"Water, natural juices, tea"],["Mercurio (pez espada, tiburón)",isES?"Neurotóxico para el feto":"Neurotoxic for fetus",isES?"Salmón, sardina, trucha (bajos en Hg)":"Salmon, sardine, trout (low Hg)"],["Carne cruda / Raw meat",isES?"Riesgo de toxoplasmosis y listeria":"Risk of toxoplasmosis and listeria",isES?"Cocinar bien todas las carnes":"Cook all meats thoroughly"],["Quesos blandos no pasteurizados",isES?"Listeria — riesgo de aborto":"Listeria — miscarriage risk",isES?"Quesos duros pasteurizados":"Pasteurized hard cheeses"],["Cafeína >200 mg/día",isES?"Asociada con bajo peso al nacer":"Associated with low birth weight",isES?"Máximo 1-2 cafés/día":"Maximum 1-2 coffees/day"],["Hígado en exceso",isES?"Hipervitaminosis A (teratógena)":"Hypervitaminosis A (teratogenic)",isES?"Limitar a 1 vez/semana":"Limit to once/week"],["Suplementos herbales",isES?"Muchos no evaluados en embarazo":"Many not evaluated in pregnancy",isES?"Consultar médico antes":"Consult doctor first"]]}/>
        </InfoCard>
      </div>)}
      {tab==="lactation"&&(<div>
        <InfoCard title={isES?"Nutrición durante la lactancia":"Nutrition during breastfeeding"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"La lactancia requiere +500 kcal/día sobre el requerimiento pregestacional. La leche materna tiene composición relativamente constante — pero la dieta materna influye en el contenido de DHA, yodo, vitamina D y B12.":"Breastfeeding requires +500 kcal/day above pre-pregnancy requirement. Breast milk has relatively constant composition — but maternal diet influences DHA, iodine, vitamin D and B12 content."}</p>
          <Table headers={["Nutriente",isES?"Meta lactancia":"Breastfeeding goal",isES?"Notas":"Notes"]} rows={[["Calorías","+500 kcal/día",isES?"No bajar de 1800 kcal/día":"Do not go below 1800 kcal/day"],["Proteínas","+25 g/día",isES?"Total ~71g/día":"Total ~71g/day"],["DHA","200-300 mg/día",isES?"Pasa a leche materna — desarrollo cerebral del bebé":"Passes to breast milk — baby brain development"],["Yodo","290 mcg/día",isES?"Esencial para tiroides del bebé":"Essential for baby thyroid"],["Vitamina D","600-2000 UI",isES?"La leche materna es baja en VitD — suplementar al bebé":"Breast milk is low in VitD — supplement baby"],["Calcio","1000 mg/día",isES?"Movilización ósea materna temporal":"Temporary maternal bone mobilization"],["Hidratación","≥ 3L/día",isES?"El agua es el principal componente de la leche":"Water is the main component of milk"]]}/>
        </InfoCard>
        <InfoCard title={isES?"Alimentos que pueden afectar al bebé durante la lactancia":"Foods that may affect baby during breastfeeding"} color="#854F0B" bg="#FAEEDA">
          {[{cat:isES?"Cafeína":"Caffeine",items:isES?"Pasa a la leche — limitar a <200 mg/día. El bebé metaboliza la cafeína lentamente.":"Passes to milk — limit to <200 mg/day. Baby metabolizes caffeine slowly."},{cat:"Alcohol",items:isES?"Esperar 2-3 horas por bebida antes de amamantar o usar leche extraída previamente.":"Wait 2-3 hours per drink before breastfeeding or use previously expressed milk."},{cat:isES?"Alimentos picantes":"Spicy foods",items:isES?"Algunos bebés pueden ser sensibles — observar si hay cambios en el comportamiento del bebé.":"Some babies may be sensitive — observe if there are changes in baby behavior."},{cat:isES?"Alérgenos (leche de vaca, soya)":"Allergens (cow milk, soy)",items:isES?"Si el bebé tiene cólicos severos o eccema, considerar eliminar temporalmente de la dieta materna.":"If baby has severe colic or eczema, consider temporarily eliminating from maternal diet."}].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:"#854F0B",fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
        </InfoCard>
      </div>)}
    </div>
  );
}

function CancerPage({isES}) {
  const [tab,setTab]=useState("general");
  const COLOR="#374151"; const BG="#F3F4F6";
  const tabs=[{id:"general",es:"General",en:"General"},{id:"needs",es:"Requerimientos",en:"Requirements"},{id:"symptoms",es:"Manejo de síntomas",en:"Symptom management"},{id:"foods",es:"Alimentos",en:"Foods"},{id:"chemo",es:"Quimioterapia",en:"Chemotherapy"}];
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"6px 16px",borderRadius:20,border:"0.5px solid #D4E3FF",background:tab===t.id?COLOR:"#fff",color:tab===t.id?"#fff":COLOR,fontSize:12,fontFamily:F,cursor:"pointer"}}>{isES?t.es:t.en}</button>))}
      </div>
      {tab==="general"&&(<div>
        <InfoCard title={isES?"Nutrición oncológica":"Oncological nutrition"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"La desnutrición afecta al 40-80% de los pacientes oncológicos y es causa directa de mortalidad en el 20% de los casos. El soporte nutricional mejora la tolerancia al tratamiento, reduce complicaciones, preserva la masa muscular y mejora la calidad de vida. La nutrición NO cura el cáncer pero sí apoya el tratamiento.":"Malnutrition affects 40-80% of cancer patients and is a direct cause of mortality in 20% of cases. Nutritional support improves treatment tolerance, reduces complications, preserves muscle mass and improves quality of life. Nutrition does NOT cure cancer but it DOES support treatment."}</p>
        </InfoCard>
        <InfoCard title={isES?"Caquexia cancerosa":"Cancer cachexia"} color="#A32D2D" bg="#FCEBEB">
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 8px"}}>{isES?"La caquexia es un síndrome metabólico complejo caracterizado por pérdida de peso involuntaria, principalmente de masa muscular. Afecta al 50-80% de pacientes oncológicos. Es diferente al ayuno simple — la inflamación sistémica hace que el catabolismo muscular persista incluso con soporte nutricional adecuado.":"Cachexia is a complex metabolic syndrome characterized by involuntary weight loss, primarily of muscle mass. It affects 50-80% of cancer patients. It differs from simple fasting — systemic inflammation causes muscle catabolism to persist even with adequate nutritional support."}</p>
          <Table headers={[isES?"Etapa":"Stage",isES?"Criterio":"Criterion",isES?"Intervención":"Intervention"]} rows={[["Pre-caquexia",isES?"Pérdida peso < 5%, anorexia":"Weight loss < 5%, anorexia",isES?"Optimizar ingesta, consejería":"Optimize intake, counseling"],["Caquexia",isES?"Pérdida > 5% o IMC < 20 + pérdida > 2%":"Loss > 5% or BMI < 20 + loss > 2%",isES?"Soporte nutricional intensivo":"Intensive nutritional support"],["Caquexia refractaria",isES?"Cáncer avanzado, poca respuesta al tx":"Advanced cancer, poor tx response",isES?"Manejo paliativo, confort":"Palliative management, comfort"]]}/>
        </InfoCard>
      </div>)}
      {tab==="needs"&&(<div>
        <InfoCard title={isES?"Requerimientos nutricionales en cáncer":"Nutritional requirements in cancer"} color={COLOR} bg={BG}>
          <Table headers={["Nutriente",isES?"Requerimiento":"Requirement",isES?"Comentario":"Comment"]} rows={[["Calorías","25-35 kcal/kg/día",isES?"Aumentar según pérdida de peso y catabolismo":"Increase based on weight loss and catabolism"],["Proteínas","1.2-2.0 g/kg/día",isES?"Prioridad máxima — preservar masa muscular":"Maximum priority — preserve muscle mass"],["Grasas","30-35% kcal",isES?"Omega-3 EPA 2g/día reduce inflamación y caquexia":"Omega-3 EPA 2g/day reduces inflammation and cachexia"],["Carbohidratos","40-50% kcal",isES?"Preferir complejos, evitar azúcares simples":"Prefer complex, avoid simple sugars"],["Hidratación","30-35 mL/kg/día",isES?"Ajustar según vómitos, diarrea, fiebre":"Adjust for vomiting, diarrhea, fever"]]}/>
        </InfoCard>
        <InfoCard title={isES?"EPA (Ácido eicosapentaenoico) en cáncer":"EPA (Eicosapentaenoic acid) in cancer"} color="#0F6E56" bg="#E1F5EE">
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:0}}>{isES?"El EPA (omega-3) a 2g/día tiene evidencia en la reducción de la inflamación sistémica, preservación de masa muscular y mejora del apetito en caquexia cancerosa. Fuentes: suplemento de omega-3, salmón, sardina. Fórmulas enterales enriquecidas con EPA (Impact, Supportan) disponibles para pacientes oncológicos.":"EPA (omega-3) at 2g/day has evidence in reducing systemic inflammation, preserving muscle mass and improving appetite in cancer cachexia. Sources: omega-3 supplement, salmon, sardine. EPA-enriched enteral formulas (Impact, Supportan) available for cancer patients."}</p>
        </InfoCard>
      </div>)}
      {tab==="symptoms"&&(<div>
        <InfoCard title={isES?"Manejo nutricional de síntomas frecuentes":"Nutritional management of frequent symptoms"} color={COLOR} bg={BG}>
          {[{cat:isES?"Anorexia / Falta de apetito":"Anorexia / Loss of appetite",items:isES?"Comidas pequeñas cada 2-3h, enriquecer con calorías (aceite, crema, leche en polvo), presentación atractiva, comer cuando hay apetito":"Small meals every 2-3h, enrich with calories (oil, cream, powdered milk), attractive presentation, eat when appetite is present"},{cat:isES?"Náuseas y vómitos":"Nausea and vomiting",items:isES?"Comidas frías o temperatura ambiente (menos olor), alimentos secos (galletas, tostadas), jengibre, evitar alimentos grasos o muy dulces":"Cold or room temperature foods (less odor), dry foods (crackers, toast), ginger, avoid fatty or very sweet foods"},{cat:isES?"Mucositis / Dolor en boca":"Mucositis / Mouth pain",items:isES?"Alimentos suaves, fríos o tibios, licuados, sopas cremosas — evitar ácidos, picantes, duros":"Soft foods, cold or warm, smoothies, cream soups — avoid acidic, spicy, hard foods"},{cat:isES?"Disfagia / Dificultad para tragar":"Dysphagia / Difficulty swallowing",items:isES?"Modificar textura según IDDSI — purés, alimentos molidos, espesantes para líquidos":"Modify texture per IDDSI — purees, minced foods, liquid thickeners"},{cat:isES?"Diarrea":"Diarrhea",items:isES?"BRAT (plátano, arroz, manzana, tostada), hidratación con electrolitos, evitar lácteos y fibra insoluble temporalmente":"BRAT (banana, rice, apple, toast), electrolyte hydration, temporarily avoid dairy and insoluble fiber"},{cat:isES?"Estreñimiento":"Constipation",items:isES?"Fibra gradual, hidratación, ciruelas pasas, actividad física si es posible":"Gradual fiber, hydration, prunes, physical activity if possible"}].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:COLOR,fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
        </InfoCard>
      </div>)}
      {tab==="foods"&&(<div>
        <InfoCard title={isES?"Alimentos con propiedades anticancerígenas (prevención)":"Foods with anticancer properties (prevention)"} color="#0F6E56" bg="#E1F5EE">
          {[{cat:isES?"Crucíferas (brócoli, col, coliflor)":"Cruciferous (broccoli, cabbage, cauliflower)",items:isES?"Sulforafano e indol-3-carbinol — inducen apoptosis, inhiben carcinógenos":"Sulforaphane and indole-3-carbinol — induce apoptosis, inhibit carcinogens"},{cat:isES?"Tomate cocido":"Cooked tomato",items:isES?"Licopeno — protege contra cáncer de próstata y mama":"Lycopene — protects against prostate and breast cancer"},{cat:isES?"Ajo y cebolla":"Garlic and onion",items:isES?"Compuestos azufrados — inhibición de células cancerosas":"Sulfur compounds — cancer cell inhibition"},{cat:isES?"Arándanos y bayas":"Blueberries and berries",items:isES?"Antocianinas y resveratrol — efecto antioxidante y antiproliferativo":"Anthocyanins and resveratrol — antioxidant and antiproliferative effect"},{cat:isES?"Cúrcuma":"Turmeric",items:isES?"Curcumina — efecto antiinflamatorio y proapoptótico":"Curcumin — anti-inflammatory and pro-apoptotic effect"},{cat:isES?"Té verde":"Green tea",items:isES?"EGCG — inhibe angiogénesis tumoral":"EGCG — inhibits tumor angiogenesis"}].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:"#0F6E56",fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
        </InfoCard>
        <InfoCard title={isES?"Alimentos a limitar (prevención)":"Foods to limit (prevention)"} color="#A32D2D" bg="#FCEBEB">
          <Table headers={[isES?"Alimento":"Food",isES?"Asociación":"Association",isES?"Recomendación":"Recommendation"]} rows={[["Carnes procesadas",isES?"Grupo 1 IARC — carcinógeno confirmado":"IARC Group 1 — confirmed carcinogen",isES?"Eliminar o minimizar":"Eliminate or minimize"],["Alcohol",isES?"Grupo 1 IARC — 7 tipos de cáncer":"IARC Group 1 — 7 types of cancer",isES?"Eliminar completamente":"Eliminate completely"],["Carnes rojas",isES?"Grupo 2A IARC — probable carcinógeno":"IARC Group 2A — probable carcinogen",isES?"< 500g/semana cocido":"< 500g/week cooked"],["Azúcares añadidos",isES?"Promueven inflamación y obesidad (factor de riesgo)":"Promote inflammation and obesity (risk factor)",isES?"Minimizar":"Minimize"],["Alimentos muy calientes",isES?"Grupo 2A — cáncer esofágico":"IARC Group 2A — esophageal cancer",isES?"Esperar que enfríen":"Wait for them to cool"]]}/>
        </InfoCard>
      </div>)}
      {tab==="chemo"&&(<div>
        <InfoCard title={isES?"Nutrición durante quimioterapia y radioterapia":"Nutrition during chemotherapy and radiotherapy"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"Los tratamientos oncológicos aumentan las necesidades proteicas y calóricas, alteran el gusto y el olfato, y pueden causar múltiples efectos secundarios que dificultan la alimentación. El objetivo es mantener el peso y la masa muscular para tolerar el tratamiento.":"Cancer treatments increase protein and caloric needs, alter taste and smell, and can cause multiple side effects that make eating difficult. The goal is to maintain weight and muscle mass to tolerate treatment."}</p>
          {[{cat:isES?"Antes de cada sesión":"Before each session",items:isES?"Comida ligera 2-3 horas antes — no en ayunas ni con estómago muy lleno":"Light meal 2-3 hours before — not fasting or with very full stomach"},{cat:isES?"Durante el tratamiento":"During treatment",items:isES?"Alimentos fríos o a temperatura ambiente — menos olor, mejor tolerados":"Cold or room temperature foods — less odor, better tolerated"},{cat:isES?"Interacciones alimento-medicamento":"Food-drug interactions",items:isES?"Toronja/pomelo interfiere con múltiples quimioterápicos — EVITAR durante el tratamiento":"Grapefruit interferes with multiple chemotherapy drugs — AVOID during treatment"},{cat:isES?"Suplementos durante quimio":"Supplements during chemo",items:isES?"Consultar oncólogo antes de cualquier suplemento — algunos antioxidantes pueden interferir con el tratamiento":"Consult oncologist before any supplement — some antioxidants may interfere with treatment"}].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:COLOR,fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
        </InfoCard>
      </div>)}
    </div>
  );
}

function CholesterolPage({isES}) {
  const [tab,setTab]=useState("general");
  const COLOR="#065F46"; const BG="#ECFDF5";
  const tabs=[{id:"general",es:"General",en:"General"},{id:"fats",es:"Tipos de grasas",en:"Types of fat"},{id:"foods",es:"Alimentos",en:"Foods"},{id:"portfolio",es:"Dieta Portfolio",en:"Portfolio Diet"},{id:"meal",es:"Plan de comidas",en:"Meal plan"}];
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"6px 16px",borderRadius:20,border:"0.5px solid #D4E3FF",background:tab===t.id?COLOR:"#fff",color:tab===t.id?"#fff":COLOR,fontSize:12,fontFamily:F,cursor:"pointer"}}>{isES?t.es:t.en}</button>))}
      </div>
      {tab==="general"&&(<div>
        <InfoCard title={isES?"Dislipidemia y nutrición":"Dyslipidemia and nutrition"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"La dislipidemia (alteración de lípidos séricos) es un factor de riesgo mayor para enfermedad cardiovascular. La intervención nutricional puede reducir el LDL-C hasta 30% y los triglicéridos hasta 50%. Es tratamiento de primera línea antes de farmacoterapia en riesgo cardiovascular bajo-moderado.":"Dyslipidemia (alteration of serum lipids) is a major risk factor for cardiovascular disease. Nutritional intervention can reduce LDL-C by up to 30% and triglycerides by up to 50%. It is first-line treatment before pharmacotherapy in low-moderate cardiovascular risk."}</p>
          <Table headers={[isES?"Parámetro":"Parameter",isES?"Deseable":"Desirable",isES?"Borderline":"Borderline",isES?"Alto riesgo":"High risk"]} rows={[["Colesterol total","< 200 mg/dL","200-239 mg/dL","≥ 240 mg/dL"],["LDL-C","< 100 mg/dL","100-159 mg/dL","≥ 160 mg/dL"],["HDL-C",isES?"≥ 60 mg/dL (óptimo)":"≥ 60 mg/dL (optimal)","40-59 mg/dL","< 40 mg/dL"],["Triglicéridos","< 150 mg/dL","150-199 mg/dL","≥ 200 mg/dL"]]}/>
        </InfoCard>
      </div>)}
      {tab==="fats"&&(<div>
        <InfoCard title={isES?"Tipos de grasas y su efecto en el perfil lipídico":"Types of fat and their effect on lipid profile"} color={COLOR} bg={BG}>
          <Table headers={[isES?"Tipo de grasa":"Fat type",isES?"Efecto en LDL":"Effect on LDL",isES?"Efecto en HDL":"Effect on HDL",isES?"Recomendación":"Recommendation",isES?"Fuentes":"Sources"]} rows={[["Saturadas",isES?"↑↑ Aumenta":"↑↑ Increases",isES?"Sin efecto":"No effect",isES?"< 7% kcal":"< 7% kcal",isES?"Mantequilla, coco, carnes rojas, lácteos enteros":"Butter, coconut, red meats, whole dairy"],["Trans",isES?"↑↑ Aumenta":"↑↑ Increases",isES?"↓ Disminuye":"↓ Decreases",isES?"Eliminar completamente":"Eliminate completely",isES?"Ultraprocesados, margarinas, frituras":"Ultra-processed, margarines, frying"],["Monoinsaturadas",isES?"↓ Disminuye":"↓ Decreases",isES?"↑ Aumenta":"↑ Increases",isES?"Aumentar":"Increase",isES?"Aceite de oliva, aguacate, almendras":"Olive oil, avocado, almonds"],["Poliinsaturadas omega-6",isES?"↓ Disminuye":"↓ Decreases",isES?"↓ Leve":"↓ Slight",isES?"Moderada":"Moderate",isES?"Aceites vegetales, nueces":"Vegetable oils, walnuts"],["Omega-3",isES?"Sin efecto en LDL":"No effect on LDL",isES?"↑ Aumenta":"↑ Increases",isES?"Aumentar":"Increase",isES?"Salmón, sardina, chía, linaza":"Salmon, sardine, chia, flaxseed"]]}/>
        </InfoCard>
      </div>)}
      {tab==="foods"&&(<div>
        <InfoCard title={isES?"Alimentos que REDUCEN el colesterol LDL":"Foods that REDUCE LDL cholesterol"} color="#0F6E56" bg="#E1F5EE">
          {[{cat:isES?"Avena y cebada (β-glucanos)":"Oats and barley (β-glucans)",items:isES?"3g/día de β-glucanos reduce LDL 5-7%. 1 taza de avena cocida aporta ~3g":"3g/day of β-glucans reduces LDL 5-7%. 1 cup cooked oats provides ~3g"},{cat:isES?"Leguminosas":"Legumes",items:isES?"1 porción/día de frijoles, lentejas o garbanzos reduce LDL ~5%":"1 serving/day of beans, lentils or chickpeas reduces LDL ~5%"},{cat:isES?"Esteroles y estanoles vegetales":"Plant sterols and stanols",items:isES?"2g/día reducen LDL 10-15% — margarinas y alimentos enriquecidos":"2g/day reduces LDL 10-15% — fortified margarines and foods"},{cat:isES?"Nueces (walnuts especialmente)":"Nuts (especially walnuts)",items:isES?"30g/día reducen LDL ~5% y TG — omega-3 y fitoesteroles":"30g/day reduces LDL ~5% and TG — omega-3 and phytosterols"},{cat:isES?"Aceite de oliva extra virgen":"Extra virgin olive oil",items:isES?"Reemplazar grasas saturadas por AOVE reduce LDL y mejora HDL":"Replacing saturated fats with EVOO reduces LDL and improves HDL"},{cat:isES?"Soya (25g proteína/día)":"Soy (25g protein/day)",items:isES?"Aprobado por FDA — reduce LDL ~4% en dislipidemia":"FDA approved — reduces LDL ~4% in dyslipidemia"},{cat:isES?"Fibra soluble (psyllium)":"Soluble fiber (psyllium)",items:isES?"7g/día reduce LDL 6-24% — reduce absorción de colesterol intestinal":"7g/day reduces LDL 6-24% — reduces intestinal cholesterol absorption"}].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:"#0F6E56",fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
        </InfoCard>
        <InfoCard title={isES?"Para triglicéridos altos":"For high triglycerides"} color="#854F0B" bg="#FAEEDA">
          {[isES?"Eliminar azúcares añadidos y carbohidratos refinados — mayor impacto en TG":"Eliminate added sugars and refined carbohydrates — greatest impact on TG",isES?"Eliminar alcohol — eleva TG significativamente":"Eliminate alcohol — significantly raises TG",isES?"Omega-3 EPA+DHA 2-4g/día reduce TG 25-30%":"Omega-3 EPA+DHA 2-4g/day reduces TG 25-30%",isES?"Perder el 5-10% del peso reduce TG 20%":"Losing 5-10% of body weight reduces TG 20%",isES?"Ejercicio aeróbico regular reduce TG 20-30%":"Regular aerobic exercise reduces TG 20-30%"].map((item,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:"#854F0B",fontWeight:600}}>✓</span><span style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item}</span></div>))}
        </InfoCard>
      </div>)}
      {tab==="portfolio"&&(<div>
        <InfoCard title={isES?"Dieta Portfolio — reducción de LDL comparable a estatinas":"Portfolio Diet — LDL reduction comparable to statins"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"La Dieta Portfolio (Dr. Jenkins) combina 4 componentes funcionales que reducen el LDL 25-35% — comparable a una estatina de baja dosis. Es el patrón dietético con mayor evidencia para reducción de LDL-C.":"The Portfolio Diet (Dr. Jenkins) combines 4 functional components that reduce LDL 25-35% — comparable to a low-dose statin. It is the dietary pattern with the strongest evidence for LDL-C reduction."}</p>
          <Table headers={[isES?"Componente":"Component",isES?"Dosis/día":"Dose/day",isES?"Reducción LDL":"LDL reduction",isES?"Fuentes":"Sources"]} rows={[["Esteroles vegetales","2 g","-8 a -10%",isES?"Margarinas enriquecidas, alimentos funcionales":"Fortified margarines, functional foods"],["Proteína de soya","25 g","-4 a -7%",isES?"Tofu, leche de soya, edamame, tempeh":"Tofu, soy milk, edamame, tempeh"],["Fibra viscosa (β-glucanos)","10 g","-5 a -7%",isES?"Avena, cebada, psyllium, leguminosas":"Oats, barley, psyllium, legumes"],["Nueces (almendras)","30 g","-5 a -7%",isES?"Almendras, nueces, pistaches":"Almonds, walnuts, pistachios"]]}/>
          <div style={{fontSize:11,color:"#3A5BA0",fontFamily:F,marginTop:10,padding:"6px 10px",background:"#fff",borderRadius:6}}>{isES?"Implementar los 4 componentes juntos produce reducción sinérgica de hasta 35% del LDL-C.":"Implementing all 4 components together produces synergistic reduction of up to 35% of LDL-C."}</div>
        </InfoCard>
      </div>)}
      {tab==="meal"&&(<div>
        <InfoCard title={isES?"Plan cardioprotector ejemplo (2000 kcal)":"Sample cardioprotective plan (2000 kcal)"} color={COLOR} bg={BG}>
          <Table headers={[isES?"Comida":"Meal",isES?"Alimentos":"Foods","kcal"]} rows={[[isES?"Desayuno":"Breakfast",isES?"Avena 50g + leche de soya 200mL + almendras 20g + manzana":"Oats 50g + soy milk 200mL + almonds 20g + apple","420"],[isES?"Colación":"Snack",isES?"Nueces 30g + pera":"Walnuts 30g + pear","210"],[isES?"Almuerzo":"Lunch",isES?"Salmón 120g + quinoa 60g + ensalada de espinaca + AOVE + aguacate":"Salmon 120g + quinoa 60g + spinach salad + EVOO + avocado","550"],[isES?"Colación":"Snack",isES?"Yogur sin grasa 150g + fresas 100g":"Fat-free yogurt 150g + strawberries 100g","150"],[isES?"Cena":"Dinner",isES?"Tofu 150g + frijoles 60g + verduras salteadas en AOVE + arroz integral":"Tofu 150g + beans 60g + vegetables sautéed in EVOO + brown rice","520"],["Total","","1850 kcal"]]}/>
        </InfoCard>
      </div>)}
    </div>
  );
}

function ThyroidPage({isES}) {
  const [tab,setTab]=useState("general");
  const COLOR="#1E40AF"; const BG="#EFF6FF";
  const tabs=[{id:"general",es:"General",en:"General"},{id:"hypo",es:"Hipotiroidismo",en:"Hypothyroidism"},{id:"hyper",es:"Hipertiroidismo",en:"Hyperthyroidism"},{id:"nutrients",es:"Nutrientes clave",en:"Key nutrients"},{id:"foods",es:"Alimentos",en:"Foods"}];
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"6px 16px",borderRadius:20,border:"0.5px solid #D4E3FF",background:tab===t.id?COLOR:"#fff",color:tab===t.id?"#fff":COLOR,fontSize:12,fontFamily:F,cursor:"pointer"}}>{isES?t.es:t.en}</button>))}
      </div>
      {tab==="general"&&(<div>
        <InfoCard title={isES?"Tiroides y nutrición":"Thyroid and nutrition"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"La glándula tiroides regula el metabolismo, la temperatura corporal, la frecuencia cardíaca y el desarrollo. Produce T3 (triyodotironina) y T4 (tiroxina) — ambas hormonas dependen de nutrientes específicos. La nutrición no reemplaza el tratamiento farmacológico pero sí optimiza la función tiroidea y maneja síntomas.":"The thyroid gland regulates metabolism, body temperature, heart rate and development. It produces T3 (triiodothyronine) and T4 (thyroxine) — both hormones depend on specific nutrients. Nutrition does not replace pharmacological treatment but it does optimize thyroid function and manage symptoms."}</p>
          <Table headers={[isES?"Condición":"Condition","TSH","T4 libre",isES?"Síntomas":"Symptoms"]} rows={[["Hipotiroidismo",isES?"↑ Alta":"↑ High",isES?"↓ Baja":"↓ Low",isES?"Fatiga, aumento peso, frío, estreñimiento, depresión":"Fatigue, weight gain, cold, constipation, depression"],["Hipertiroidismo",isES?"↓ Baja":"↓ Low",isES?"↑ Alta":"↑ High",isES?"Pérdida peso, taquicardia, calor, diarrea, ansiedad":"Weight loss, tachycardia, heat, diarrhea, anxiety"],["Hashimoto",isES?"Variable":"Variable",isES?"Variable":"Variable",isES?"Autoinmune — hipotiroidismo más común en adultos":"Autoimmune — most common hypothyroidism in adults"],["Graves",isES?"↓ Baja":"↓ Low",isES?"↑ Alta":"↑ High",isES?"Autoinmune — hipertiroidismo más común":"Autoimmune — most common hyperthyroidism"]]}/>
        </InfoCard>
      </div>)}
      {tab==="hypo"&&(<div>
        <InfoCard title={isES?"Nutrición en hipotiroidismo":"Nutrition in hypothyroidism"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"El hipotiroidismo reduce el metabolismo basal 10-40%. El manejo nutricional busca optimizar el peso, mejorar la energía y apoyar la función tiroidea. La levotiroxina (LT4) debe tomarse en ayunas — varios alimentos interfieren con su absorción.":"Hypothyroidism reduces basal metabolic rate 10-40%. Nutritional management seeks to optimize weight, improve energy and support thyroid function. Levothyroxine (LT4) should be taken fasting — several foods interfere with its absorption."}</p>
          <InfoCard title={isES?"Interacciones con levotiroxina":"Interactions with levothyroxine"} color="#A32D2D" bg="#FCEBEB">
            <Table headers={[isES?"Alimento":"Food",isES?"Efecto":"Effect",isES?"Recomendación":"Recommendation"]} rows={[["Café",isES?"Reduce absorción hasta 30%":"Reduces absorption up to 30%",isES?"Esperar 30-60 min después del medicamento":"Wait 30-60 min after medication"],["Fibra de salvado",isES?"Reduce absorción":"Reduces absorption",isES?"Separar 4 horas del medicamento":"Separate 4 hours from medication"],["Calcio y hierro",isES?"Quelación — reduce absorción":"Chelation — reduces absorption",isES?"Separar 4 horas":"Separate 4 hours"],["Soya",isES?"Puede reducir absorción":"May reduce absorption",isES?"Separar 4 horas":"Separate 4 hours"],["Toronja",isES?"Puede aumentar absorción (riesgo sobredosis)":"May increase absorption (overdose risk)",isES?"Consultar médico":"Consult doctor"]]}/>
          </InfoCard>
        </InfoCard>
        <InfoCard title={isES?"Estrategias nutricionales en hipotiroidismo":"Nutritional strategies in hypothyroidism"} color="#0F6E56" bg="#E1F5EE">
          {[isES?"Controlar calorías sin exceso — el metabolismo está reducido":"Control calories without excess — metabolism is reduced",isES?"Aumentar proteínas — reduce pérdida muscular y mejora saciedad":"Increase proteins — reduces muscle loss and improves satiety",isES?"Fibra adecuada — combate el estreñimiento frecuente":"Adequate fiber — combats frequent constipation",isES?"Selenio: 55-200 mcg/día — convierte T4 a T3 activa":"Selenium: 55-200 mcg/day — converts T4 to active T3",isES?"Zinc: 8-11 mg/día — síntesis de hormonas tiroideas":"Zinc: 8-11 mg/day — synthesis of thyroid hormones"].map((item,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:"#0F6E56",fontWeight:600}}>✓</span><span style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item}</span></div>))}
        </InfoCard>
      </div>)}
      {tab==="hyper"&&(<div>
        <InfoCard title={isES?"Nutrición en hipertiroidismo":"Nutrition in hyperthyroidism"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"El hipertiroidismo aumenta el metabolismo basal 25-50%, causando pérdida de peso, catabolismo muscular y mayor gasto calórico. El objetivo nutricional es prevenir la desnutrición y cubrir los requerimientos aumentados.":"Hyperthyroidism increases basal metabolic rate 25-50%, causing weight loss, muscle catabolism and higher caloric expenditure. The nutritional goal is to prevent malnutrition and cover increased requirements."}</p>
          <Table headers={["Nutriente",isES?"Ajuste":"Adjustment",isES?"Razón":"Reason"]} rows={[["Calorías","+500-1000 kcal/día",isES?"Compensar hipermetabolismo":"Compensate hypermetabolism"],["Proteínas","1.5-2.0 g/kg/día",isES?"Prevenir catabolismo muscular":"Prevent muscle catabolism"],["Calcio","1200-1500 mg/día",isES?"El hipertiroidismo desmineraliza huesos":"Hyperthyroidism demineralizes bones"],["Vitamina D","1000-2000 UI/día",isES?"Apoyar salud ósea":"Support bone health"],["Yodo",isES?"RESTRINGIR":"RESTRICT",isES?"El yodo estimula producción hormonal":"Iodine stimulates hormone production"]]}/>
        </InfoCard>
        <InfoCard title={isES?"Restricción de yodo en hipertiroidismo":"Iodine restriction in hyperthyroidism"} color="#A32D2D" bg="#FCEBEB">
          {[isES?"Evitar sal yodada — usar sal sin yodo o reducir sal":"Avoid iodized salt — use non-iodized salt or reduce salt",isES?"Limitar mariscos y pescados de mar: sardinas, atún, mariscos":"Limit seafood and saltwater fish: sardines, tuna, shellfish",isES?"Limitar lácteos — contienen yodo por la alimentación del ganado":"Limit dairy — contains iodine from livestock feed",isES?"Evitar suplementos con yodo o kelp":"Avoid supplements with iodine or kelp",isES?"Consultar con médico antes del procedimiento de yodo radiactivo":"Consult doctor before radioactive iodine procedure"].map((item,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:"#A32D2D",fontWeight:600}}>⚠️</span><span style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item}</span></div>))}
        </InfoCard>
      </div>)}
      {tab==="nutrients"&&(<div>
        <InfoCard title={isES?"Nutrientes esenciales para la tiroides":"Essential nutrients for the thyroid"} color={COLOR} bg={BG}>
          <Table headers={["Nutriente",isES?"Función":"Function",isES?"Meta/día":"Goal/day",isES?"Fuentes":"Sources"]} rows={[["Yodo / Iodine",isES?"Componente de T3 y T4 — sin yodo no hay hormonas tiroideas":"Component of T3 and T4 — without iodine no thyroid hormones","150 mcg (adultos)",isES?"Sal yodada, mariscos, lácteos (cuidado en hipertiroidismo)":"Iodized salt, seafood, dairy (careful in hyperthyroidism)"],["Selenio",isES?"Convierte T4 (inactiva) a T3 (activa) — deiodinasas":"Converts T4 (inactive) to T3 (active) — deiodinases","55-200 mcg",isES?"Nuez de Brasil 1-2/día, atún, pollo, huevo":"Brazil nut 1-2/day, tuna, chicken, egg"],["Zinc",isES?"Síntesis hormonal, conversión T4→T3":"Hormonal synthesis, T4→T3 conversion","8-11 mg",isES?"Carnes, mariscos, semillas de calabaza, leguminosas":"Meats, shellfish, pumpkin seeds, legumes"],["Hierro / Iron",isES?"TPO (tiroperoxidasa) requiere hierro para síntesis hormonal":"TPO (thyroid peroxidase) requires iron for hormone synthesis","8-18 mg",isES?"Carnes rojas, leguminosas + vitamina C":"Red meats, legumes + vitamin C"],["Vitamina D",isES?"Regula función inmune — clave en enf. autoinmunes (Hashimoto, Graves)":"Regulates immune function — key in autoimmune diseases","1000-2000 UI",isES?"Sol, salmón, suplemento":"Sun, salmon, supplement"],["Magnesio",isES?"Cofactor en síntesis de T4 y conversión periférica":"Cofactor in T4 synthesis and peripheral conversion","310-420 mg",isES?"Nueces, semillas, leguminosas, chocolate oscuro":"Nuts, seeds, legumes, dark chocolate"]]}/>
        </InfoCard>
      </div>)}
      {tab==="foods"&&(<div>
        <InfoCard title={isES?"Alimentos bociógenos — con precaución en hipotiroidismo":"Goitrogenic foods — caution in hypothyroidism"} color="#854F0B" bg="#FAEEDA">
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"Los bociógenos son compuestos que interfieren con la captación de yodo o la síntesis hormonal tiroidea. En personas con función tiroidea normal, consumirlos no es problema. En hipotiroidismo, se recomienda COCINARLOS (destruye 30-50% de los bociógenos) y no consumir en exceso, especialmente crudos.":"Goitrogens are compounds that interfere with iodine uptake or thyroid hormone synthesis. In people with normal thyroid function, consuming them is not a problem. In hypothyroidism, it is recommended to COOK them (destroys 30-50% of goitrogens) and not consume in excess, especially raw."}</p>
          <Table headers={[isES?"Alimento":"Food",isES?"Bociógeno":"Goitrogen",isES?"Recomendación en hipotiroidismo":"Recommendation in hypothyroidism"]} rows={[["Soya / Soy","Isoflavonas",isES?"Cocida, moderación, separar 4h de levotiroxina":"Cooked, moderation, separate 4h from levothyroxine"],["Brócoli, col, coliflor","Glucosinolatos",isES?"Cocinar bien — reduce bociógenos 50%":"Cook well — reduces goitrogens 50%"],["Espinaca / Spinach","Oxalatos",isES?"Cocida es mejor — porción moderada":"Cooked is better — moderate portion"],["Mijo / Millet","Flavonoides",isES?"Limitar como cereal principal":"Limit as main cereal"],["Nabo / Turnip","Glucosinolatos",isES?"Cocinar, consumo moderado":"Cook, moderate consumption"]]}/>
        </InfoCard>
        <InfoCard title={isES?"Alimentos que apoyan la tiroides":"Foods that support the thyroid"} color="#0F6E56" bg="#E1F5EE">
          {[{cat:isES?"Nuez de Brasil (1-2/día)":"Brazil nut (1-2/day)",items:isES?"La fuente más concentrada de selenio — 1 nuez aporta ~70-90 mcg":"The most concentrated source of selenium — 1 nut provides ~70-90 mcg"},{cat:isES?"Mariscos y pescados (con moderación en hipertiroidismo)":"Seafood and fish (in moderation in hyperthyroidism)",items:isES?"Yodo, selenio y omega-3 — triple beneficio para la tiroides":"Iodine, selenium and omega-3 — triple benefit for thyroid"},{cat:isES?"Huevo completo":"Whole egg",items:isES?"Yema: yodo, selenio, vitamina D — tres nutrientes tiroideos en uno":"Yolk: iodine, selenium, vitamin D — three thyroid nutrients in one"},{cat:isES?"Sal yodada (hipotiroidismo)":"Iodized salt (hypothyroidism)",items:isES?"La forma más simple de asegurar yodo adecuado — 1/4 cdta cubre el requerimiento diario":"The simplest way to ensure adequate iodine — 1/4 tsp covers daily requirement"}].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:"#0F6E56",fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
        </InfoCard>
      </div>)}
    </div>
  );
}

function FertilityPage({isES}) {
  const [tab,setTab]=useState("female");
  const COLOR="#BE185D"; const BG="#FCE7F3";
  const tabs=[{id:"female",es:"Fertilidad femenina",en:"Female fertility"},{id:"pcos",es:"SOP",en:"PCOS"},{id:"male",es:"Fertilidad masculina",en:"Male fertility"},{id:"foods",es:"Alimentos clave",en:"Key foods"},{id:"avoid",es:"Qué evitar",en:"What to avoid"}];
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"6px 16px",borderRadius:20,border:"0.5px solid #D4E3FF",background:tab===t.id?COLOR:"#fff",color:tab===t.id?"#fff":COLOR,fontSize:12,fontFamily:F,cursor:"pointer"}}>{isES?t.es:t.en}</button>))}
      </div>
      {tab==="female"&&(<div>
        <InfoCard title={isES?"Nutrición y fertilidad femenina":"Nutrition and female fertility"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"La nutrición influye directamente en la calidad ovocitaria, el equilibrio hormonal, la implantación y el desarrollo fetal temprano. Optimizar el estado nutricional 3-6 meses antes de buscar el embarazo es fundamental.":"Nutrition directly influences oocyte quality, hormonal balance, implantation and early fetal development. Optimizing nutritional status 3-6 months before seeking pregnancy is essential."}</p>
        </InfoCard>
        <InfoCard title={isES?"Nutrientes clave preconcepcionales":"Key preconceptional nutrients"} color="#2563EB" bg="#EFF6FF">
          <Table headers={["Nutriente",isES?"Meta/día":"Goal/day",isES?"Función":"Function",isES?"Fuentes":"Sources"]} rows={[[isES?"Ácido fólico":"Folic acid","400-800 mcg",isES?"Previene defectos del tubo neural — iniciar 3 meses antes":"Prevents neural tube defects — start 3 months before",isES?"Espinaca, frijoles, lentejas, suplemento":"Spinach, beans, lentils, supplement"],["Hierro / Iron","18-27 mg",isES?"Ovulación, transporte de O₂, implantación":"Ovulation, O₂ transport, implantation",isES?"Carne roja magra, espinaca, leguminosas + vitamina C":"Lean red meat, spinach, legumes + vitamin C"],["Vitamina D","600-2000 UI",isES?"Regulación hormonal, calidad ovocitaria":"Hormonal regulation, oocyte quality",isES?"Salmón, yema de huevo, exposición solar":"Salmon, egg yolk, sun exposure"],["Omega-3 (DHA)","200-300 mg DHA",isES?"Calidad ovocitaria, regulación de prostaglandinas":"Oocyte quality, prostaglandin regulation",isES?"Salmón, sardina, chía, nueces":"Salmon, sardine, chia, walnuts"],["Zinc","8-11 mg",isES?"Síntesis de ADN, división celular, implantación":"DNA synthesis, cell division, implantation",isES?"Ostras, carne, semillas de calabaza":"Oysters, meat, pumpkin seeds"],["Yodo / Iodine","150-220 mcg",isES?"Tiroides — hipotiroidismo reduce fertilidad":"Thyroid — hypothyroidism reduces fertility",isES?"Mariscos, sal yodada, lácteos":"Seafood, iodized salt, dairy"],["Coenzima Q10","200-600 mg",isES?"Calidad mitocondrial del óvulo — especialmente >35 años":"Mitochondrial quality of egg — especially >35 years",isES?"Suplemento principalmente":"Supplement mainly"]]}/>
        </InfoCard>
        <InfoCard title={isES?"Peso corporal y fertilidad":"Body weight and fertility"} color="#0F6E56" bg="#E1F5EE">
          <Table headers={["IMC",isES?"Efecto en fertilidad":"Effect on fertility",isES?"Acción":"Action"]} rows={[["< 18.5",isES?"Amenorrea, anovulación, deficiencias de nutrientes":"Amenorrhea, anovulation, nutrient deficiencies",isES?"Aumentar peso gradualmente":"Gain weight gradually"],["18.5-24.9",isES?"Óptimo — mejor respuesta a FIV":"Optimal — best IVF response",isES?"Mantener":"Maintain"],["25-29.9",isES?"Resistencia a insulina, alteración hormonal":"Insulin resistance, hormonal alteration",isES?"Perder 5-10% mejora ovulación":"Losing 5-10% improves ovulation"],["≥ 30",isES?"Riesgo aumentado de SOP, aborto espontáneo":"Increased risk of PCOS, spontaneous abortion",isES?"Intervención nutricional prioritaria":"Priority nutritional intervention"]]}/>
        </InfoCard>
      </div>)}
      {tab==="pcos"&&(<div>
        <InfoCard title={isES?"SOP — Síndrome de ovario poliquístico":"PCOS — Polycystic ovary syndrome"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"El SOP afecta al 10-15% de mujeres en edad reproductiva. El 70% tiene resistencia a la insulina. La dieta es tratamiento de primera línea — una pérdida del 5-10% del peso mejora la ovulación en mujeres con sobrepeso/obesidad y SOP.":"PCOS affects 10-15% of women of reproductive age. 70% have insulin resistance. Diet is first-line treatment — a 5-10% weight loss improves ovulation in overweight/obese women with PCOS."}</p>
        </InfoCard>
        <InfoCard title={isES?"Estrategias nutricionales en SOP":"Nutritional strategies in PCOS"} color="#2563EB" bg="#EFF6FF">
          {[{cat:isES?"Dieta baja en IG":"Low GI diet",items:isES?"Reduce hiperinsulinemia — mejora niveles de andrógenos y regularidad menstrual. Preferir CHO complejos, fibra, limitar azúcares simples.":"Reduces hyperinsulinemia — improves androgen levels and menstrual regularity. Prefer complex CHO, fiber, limit simple sugars."},{cat:"Inositol (Myo + D-Chiro)",items:isES?"4g myo-inositol + 400mg D-chiro-inositol/día — mejora resistencia a insulina, ovulación y calidad ovocitaria. Evidencia sólida.":"4g myo-inositol + 400mg D-chiro-inositol/day — improves insulin resistance, ovulation and oocyte quality. Solid evidence."},{cat:isES?"Proteínas magras":"Lean proteins",items:isES?"Aumentar proteínas reduce IGF-1 y mejora composición corporal en SOP.":"Increasing proteins reduces IGF-1 and improves body composition in PCOS."},{cat:isES?"Antiinflamatoria":"Anti-inflammatory",items:isES?"SOP tiene componente inflamatorio — seguir patrón mediterráneo, omega-3, antioxidantes.":"PCOS has inflammatory component — follow Mediterranean pattern, omega-3, antioxidants."},{cat:isES?"Vitamina D":"Vitamin D",items:isES?"Deficiencia muy común en SOP — 1000-4000 UI/día mejora insulinosensibilidad y ciclos menstruales.":"Deficiency very common in PCOS — 1000-4000 IU/day improves insulin sensitivity and menstrual cycles."}].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:COLOR,fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
        </InfoCard>
      </div>)}
      {tab==="male"&&(<div>
        <InfoCard title={isES?"Nutrición y fertilidad masculina":"Nutrition and male fertility"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"El 40-50% de los casos de infertilidad tiene factor masculino. La calidad espermática (concentración, motilidad, morfología) es altamente sensible al estado nutricional y el estilo de vida. La espermatogénesis tarda ~74 días — los cambios dietéticos toman 3 meses en impactar la calidad espermática.":"40-50% of infertility cases have a male factor. Sperm quality (concentration, motility, morphology) is highly sensitive to nutritional status and lifestyle. Spermatogenesis takes ~74 days — dietary changes take 3 months to impact sperm quality."}</p>
        </InfoCard>
        <InfoCard title={isES?"Nutrientes clave para fertilidad masculina":"Key nutrients for male fertility"} color="#2563EB" bg="#EFF6FF">
          <Table headers={["Nutriente",isES?"Meta/día":"Goal/day",isES?"Función":"Function",isES?"Fuentes":"Sources"]} rows={[["Zinc","11 mg",isES?"Producción de testosterona, espermatogénesis, morfología":"Testosterone production, spermatogenesis, morphology",isES?"Ostras, carne roja, semillas de calabaza":"Oysters, red meat, pumpkin seeds"],["Selenio","55-200 mcg",isES?"Motilidad espermática, protección antioxidante":"Sperm motility, antioxidant protection",isES?"Nuez de Brasil (1-2/día), atún, huevo":"Brazil nut (1-2/day), tuna, egg"],["Vitamina C","500-1000 mg",isES?"Reduce fragmentación del ADN espermático":"Reduces sperm DNA fragmentation",isES?"Pimiento, kiwi, naranja, fresas":"Pepper, kiwi, orange, strawberries"],["Vitamina E","400 UI",isES?"Protege membranas espermáticas de oxidación":"Protects sperm membranes from oxidation",isES?"Almendras, aceite de girasol, aguacate":"Almonds, sunflower oil, avocado"],["Licopeno","4-8 mg",isES?"Reduce daño oxidativo al ADN espermático":"Reduces oxidative damage to sperm DNA",isES?"Tomate cocido, sandía, toronja roja":"Cooked tomato, watermelon, red grapefruit"],["Coenzima Q10","200-300 mg",isES?"Energía mitocondrial espermática, motilidad":"Sperm mitochondrial energy, motility",isES?"Suplemento principalmente":"Supplement mainly"],["Omega-3","1-3 g EPA+DHA",isES?"Fluidez de membrana espermática, morfología":"Sperm membrane fluidity, morphology",isES?"Salmón, sardina, nueces, chía":"Salmon, sardine, walnuts, chia"]]}/>
        </InfoCard>
        <InfoCard title={isES?"Factores dietéticos que dañan la fertilidad masculina":"Dietary factors that harm male fertility"} color="#A32D2D" bg="#FCEBEB">
          {[{cat:isES?"Alcohol":"Alcohol",items:isES?"Reduce testosterona, aumenta estrógenos, daña ADN espermático — limitar a <2 bebidas/día":"Reduces testosterone, increases estrogens, damages sperm DNA — limit to <2 drinks/day"},{cat:isES?"Soya en exceso":"Excess soy",items:isES?"Fitoestrógenos en grandes cantidades pueden reducir concentración espermática en hombres sensibles":"Phytoestrogens in large amounts may reduce sperm concentration in sensitive men"},{cat:isES?"Grasas trans":"Trans fats",items:isES?"Asociadas con menor concentración y motilidad espermática":"Associated with lower sperm concentration and motility"},{cat:isES?"Calor excesivo":"Excessive heat",items:isES?"Laptops, baños calientes — aumentan temperatura escrotal y dañan espermatozoides":"Laptops, hot baths — increase scrotal temperature and damage sperm"},{cat:isES?"Obesidad":"Obesity",items:isES?"IMC > 30 asociado con menor concentración, motilidad y mayor fragmentación de ADN espermático":"BMI > 30 associated with lower concentration, motility and higher sperm DNA fragmentation"}].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:"#A32D2D",fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
        </InfoCard>
      </div>)}
      {tab==="foods"&&(<div>
        <InfoCard title={isES?"Superalimentos para la fertilidad":"Fertility superfoods"} color={COLOR} bg={BG}>
          {[{cat:isES?"Aguacate":"Avocado",items:isES?"Folato, vitamina E, grasas monoinsaturadas — mejora receptividad uterina y calidad ovocitaria":"Folate, vitamin E, monounsaturated fats — improves uterine receptivity and oocyte quality"},{cat:isES?"Nueces de Brasil":"Brazil nuts",items:isES?"1-2 nueces/día cubren el selenio diario — clave para motilidad espermática":"1-2 nuts/day cover daily selenium — key for sperm motility"},{cat:isES?"Huevo entero":"Whole egg",items:isES?"Colina, DHA, vitamina D, B12 — nutrientes esenciales preconcepcionales":"Choline, DHA, vitamin D, B12 — essential preconceptional nutrients"},{cat:isES?"Salmón salvaje":"Wild salmon",items:isES?"DHA, vitamina D, astaxantina — calidad ovocitaria y espermática":"DHA, vitamin D, astaxanthin — oocyte and sperm quality"},{cat:isES?"Tomate cocido":"Cooked tomato",items:isES?"Licopeno biodisponible — protección antioxidante del ADN espermático":"Bioavailable lycopene — antioxidant protection of sperm DNA"},{cat:isES?"Semillas de calabaza":"Pumpkin seeds",items:isES?"Zinc, magnesio, omega-3 — apoyo hormonal en ambos sexos":"Zinc, magnesium, omega-3 — hormonal support in both sexes"},{cat:isES?"Cúrcuma":"Turmeric",items:isES?"Propiedades antiinflamatorias — beneficia SOP y endometriosis":"Anti-inflammatory properties — benefits PCOS and endometriosis"}].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:COLOR,fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
        </InfoCard>
      </div>)}
      {tab==="avoid"&&(<div>
        <InfoCard title={isES?"Qué evitar al buscar embarazo":"What to avoid when trying to conceive"} color="#A32D2D" bg="#FCEBEB">
          <Table headers={[isES?"Factor":"Factor",isES?"Efecto":"Effect",isES?"Recomendación":"Recommendation"]} rows={[["Alcohol",isES?"Daña ADN ovocitario y espermático, altera implantación":"Damages oocyte and sperm DNA, alters implantation",isES?"Eliminar completamente":"Eliminate completely"],["Tabaco / Tobacco",isES?"Reduce reserva ovárica, daña ADN espermático":"Reduces ovarian reserve, damages sperm DNA",isES?"Eliminar completamente":"Eliminate completely"],[isES?"Cafeína >200 mg/día":"Caffeine >200 mg/day",isES?"Asociada con mayor riesgo de aborto espontáneo":"Associated with higher miscarriage risk",isES?"Limitar a 1-2 cafés/día":"Limit to 1-2 coffees/day"],[isES?"Pescado alto en mercurio":"High mercury fish",isES?"Neurotóxico para el feto":"Neurotoxic for fetus",isES?"Evitar tiburón, pez espada, macarela real":"Avoid shark, swordfish, king mackerel"],[isES?"Ultraprocesados":"Ultra-processed",isES?"Proinflamatorios, disruptores endocrinos":"Pro-inflammatory, endocrine disruptors",isES?"Minimizar ingesta":"Minimize intake"],[isES?"Déficit calórico severo":"Severe caloric deficit",isES?"Suprime el eje hipotálamo-hipofisario-gonadal":"Suppresses hypothalamic-pituitary-gonadal axis",isES?"Nunca < 1200 kcal/día":"Never < 1200 kcal/day"]]}/>
        </InfoCard>
      </div>)}
    </div>
  );
}

function GlutenCheckerInline({isES}) {
  const [query,setQuery]=useState("");
  const foods=[
    {name:"Trigo / Wheat",status:"gluten"},{name:"Cebada / Barley",status:"gluten"},{name:"Centeno / Rye",status:"gluten"},{name:"Espelta / Spelt",status:"gluten"},{name:"Kamut",status:"gluten"},{name:"Triticale",status:"gluten"},{name:"Pan / Bread",status:"gluten"},{name:"Pasta",status:"gluten"},{name:"Harina de trigo / Wheat flour",status:"gluten"},{name:"Sémola / Semolina",status:"gluten"},{name:"Cuscús / Couscous",status:"gluten"},{name:"Bulgur",status:"gluten"},{name:"Cerveza / Beer",status:"gluten"},{name:"Salsa de soya / Soy sauce",status:"gluten"},{name:"Vinagre de malta / Malt vinegar",status:"gluten"},
    {name:"Avena / Oats",status:"caution"},{name:"Salsa Worcestershire",status:"caution"},{name:"Chocolate",status:"caution"},{name:"Almidón de trigo / Wheat starch",status:"caution"},{name:"Avena certificada / Certified oats",status:"caution"},
    {name:"Arroz / Rice",status:"safe"},{name:"Maíz / Corn",status:"safe"},{name:"Quinoa",status:"safe"},{name:"Papa / Potato",status:"safe"},{name:"Yuca / Cassava",status:"safe"},{name:"Amaranto / Amaranth",status:"safe"},{name:"Trigo sarraceno / Buckwheat",status:"safe"},{name:"Mijo / Millet",status:"safe"},{name:"Harina de almendra / Almond flour",status:"safe"},{name:"Harina de coco / Coconut flour",status:"safe"},{name:"Tapioca",status:"safe"},{name:"Leche / Milk",status:"safe"},{name:"Huevo / Egg",status:"safe"},{name:"Carne / Meat",status:"safe"},{name:"Frutas / Fruits",status:"safe"},{name:"Verduras / Vegetables",status:"safe"},{name:"Leguminosas / Legumes",status:"safe"},
  ];
  const filtered=query.length>1?foods.filter(f=>f.name.toLowerCase().includes(query.toLowerCase())).slice(0,8):[];
  const sc=s=>s==="gluten"?"#A32D2D":s==="caution"?"#854F0B":"#0F6E56";
  const sb=s=>s==="gluten"?"#FCEBEB":s==="caution"?"#FAEEDA":"#E1F5EE";
  const sl=s=>s==="gluten"?(isES?"❌ Contiene gluten":"❌ Contains gluten"):s==="caution"?(isES?"⚠️ Verificar":"⚠️ Check"):(isES?"✓ Sin gluten":"✓ Gluten-free");
  return (
    <div>
      <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
        {["gluten","caution","safe"].map(s=>(<div key={s} style={{padding:"3px 10px",borderRadius:20,background:sb(s),color:sc(s),fontSize:10,fontWeight:500,fontFamily:F}}>{sl(s)}</div>))}
      </div>
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={isES?"Buscar alimento... ej: avena, pasta, arroz":"Search food... e.g. oats, pasta, rice"} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"0.5px solid #D4E3FF",fontSize:13,fontFamily:F,outline:"none",boxSizing:"border-box",marginBottom:8}}/>
      {filtered.map(f=>(<div key={f.name} style={{padding:"8px 12px",borderBottom:"0.5px solid #F0F4FF",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:12,color:NAVY,fontFamily:F}}>{f.name}</span><span style={{fontSize:11,fontWeight:500,padding:"2px 8px",borderRadius:10,background:sb(f.status),color:sc(f.status),fontFamily:F,whiteSpace:"nowrap"}}>{sl(f.status)}</span></div>))}
      {query.length>1&&filtered.length===0&&(<div style={{padding:"12px",textAlign:"center",color:"#3A5BA0",fontSize:12,fontFamily:F}}>{isES?"No encontrado en la base de datos":"Not found in database"}</div>)}
    </div>
  );
}

function AllergyPage({isES}) {
  const [tab,setTab]=useState("general");
  const COLOR="#92400E"; const BG="#FEF3C7";
  const tabs=[{id:"general",es:"General",en:"General"},{id:"big9",es:"Los 9 alérgenos",en:"The Big 9"},{id:"substitutes",es:"Sustitutos",en:"Substitutes"},{id:"labels",es:"Leer etiquetas",en:"Read labels"},{id:"celiac",es:"Celiaquía",en:"Celiac disease"},{id:"lactose",es:"Lactosa",en:"Lactose"}];
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"6px 16px",borderRadius:20,border:"0.5px solid #D4E3FF",background:tab===t.id?COLOR:"#fff",color:tab===t.id?"#fff":COLOR,fontSize:12,fontFamily:F,cursor:"pointer"}}>{isES?t.es:t.en}</button>))}
      </div>
      {tab==="general"&&(<div>
        <InfoCard title={isES?"Alergias alimentarias vs intolerancias":"Food allergies vs intolerances"} color={COLOR} bg={BG}>
          <Table headers={["",isES?"Alergia alimentaria":"Food allergy",isES?"Intolerancia alimentaria":"Food intolerance"]} rows={[[isES?"Mecanismo":"Mechanism",isES?"Inmunológico (IgE)":"Immunological (IgE)",isES?"No inmunológico (enzimático)":"Non-immunological (enzymatic)"],[isES?"Inicio":"Onset",isES?"Minutos a 2 horas":"Minutes to 2 hours",isES?"Horas":"Hours"],[isES?"Cantidad umbral":"Threshold amount",isES?"Mínima — trazas pueden causar reacción":"Minimal — traces can cause reaction",isES?"Depende de la cantidad":"Depends on amount"],[isES?"Gravedad":"Severity",isES?"Puede ser anafilaxia (riesgo vital)":"Can be anaphylaxis (life threatening)",isES?"Incómodo pero no vital":"Uncomfortable but not life threatening"],[isES?"Ejemplos":"Examples",isES?"Maní, mariscos, leche (en niños)":"Peanuts, shellfish, milk (in children)",isES?"Lactosa, gluten (sensibilidad), fructosa":"Lactose, gluten (sensitivity), fructose"]]}/>
        </InfoCard>
        <InfoCard title={isES?"Prevalencia de alergias alimentarias":"Food allergy prevalence"} color="#2563EB" bg="#EFF6FF">
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:0}}>{isES?"Las alergias alimentarias afectan al 6-8% de niños y 2-3% de adultos. El 90% de las reacciones son causadas por los 9 alérgenos principales. La anafilaxia es la reacción más grave — requiere epinefrina inmediata. Los pacientes con alergias múltiples tienen alto riesgo de deficiencias nutricionales.":"Food allergies affect 6-8% of children and 2-3% of adults. 90% of reactions are caused by the 9 main allergens. Anaphylaxis is the most serious reaction — requires immediate epinephrine. Patients with multiple allergies are at high risk of nutritional deficiencies."}</p>
        </InfoCard>
      </div>)}
      {tab==="big9"&&(<div>
        <InfoCard title={isES?"Los 9 alérgenos principales (FDA Big 9)":"The 9 main allergens (FDA Big 9)"} color={COLOR} bg={BG}>
          <Table headers={[isES?"Alérgeno":"Allergen",isES?"Prevalencia":"Prevalence",isES?"Síntomas comunes":"Common symptoms",isES?"Nombres ocultos en etiquetas":"Hidden names on labels"]} rows={[["🥛 "+isES?"Leche / Milk":"Leche / Milk","2-3% niños",isES?"Urticaria, vómito, anafilaxia":"Hives, vomiting, anaphylaxis",isES?"Caseína, suero, lactoalbúmina, ghee, nougat":"Casein, whey, lactalbumin, ghee, nougat"],["🥚 "+isES?"Huevo / Egg":"Huevo / Egg","1-2% niños",isES?"Eccema, urticaria, vómito":"Eczema, hives, vomiting",isES?"Albúmina, globulina, mayonesa, merengue":"Albumin, globulin, mayonnaise, meringue"],["🌾 "+isES?"Trigo / Wheat":"Trigo / Wheat","0.4-1%",isES?"GI, respiratorio, anafilaxia":"GI, respiratory, anaphylaxis",isES?"Gluten, sémola, espelta, kamut, triticale":"Gluten, semolina, spelt, kamut, triticale"],["🫘 "+isES?"Soya / Soy":"Soya / Soy","0.4%",isES?"Urticaria, GI, anafilaxia":"Hives, GI, anaphylaxis",isES?"Tofu, miso, edamame, proteína vegetal texturizada":"Tofu, miso, edamame, textured vegetable protein"],["🥜 "+isES?"Maní / Peanut":"Maní / Peanut","1-2%",isES?"Anafilaxia severa — riesgo vital":"Severe anaphylaxis — life threatening",isES?"Mantequilla de maní, aceite de cacahuate, ground nuts":"Peanut butter, groundnut oil, ground nuts"],["🌰 "+isES?"Árbol de nueces":"Tree nuts","1-2%",isES?"Anafilaxia":"Anaphylaxis",isES?"Almendra, nuez, anacardo, pistacho, avellana":"Almond, walnut, cashew, pistachio, hazelnut"],["🐟 "+isES?"Pescado / Fish":"Pescado / Fish","1%",isES?"Urticaria, anafilaxia":"Hives, anaphylaxis",isES?"Bacalao, salmón, atún, anchoa, worcestershire":"Cod, salmon, tuna, anchovy, worcestershire"],["🦐 "+isES?"Mariscos / Shellfish":"Mariscos / Shellfish","2%",isES?"Anafilaxia":"Anaphylaxis",isES?"Camarón, langosta, cangrejo, ostión":"Shrimp, lobster, crab, oyster"],["🌿 "+isES?"Sésamo / Sesame":"Sésamo / Sesame","0.2%",isES?"Urticaria, anafilaxia":"Hives, anaphylaxis",isES?"Tahini, aceite de ajonjolí, til, gingelly":"Tahini, sesame oil, til, gingelly"]]}/>
        </InfoCard>
      </div>)}
      {tab==="substitutes"&&(<div>
        <InfoCard title={isES?"Sustitutos nutricionales para cada alérgeno":"Nutritional substitutes for each allergen"} color={COLOR} bg={BG}>
          <Table headers={[isES?"Alérgeno eliminado":"Eliminated allergen",isES?"Nutriente en riesgo":"At-risk nutrient",isES?"Sustitutos recomendados":"Recommended substitutes"]} rows={[[isES?"Leche / Dairy":"Leche / Dairy",isES?"Calcio, vitamina D, proteína":"Calcium, vitamin D, protein",isES?"Leche de soya/avena/almendra fortificada, sardinas, tofu, brócoli":"Fortified soy/oat/almond milk, sardines, tofu, broccoli"],[isES?"Huevo / Egg":"Huevo / Egg",isES?"Proteína, colina, vitamina D":"Protein, choline, vitamin D",isES?"Linaza molida + agua (1:3), aquafaba, banana machacada, applesauce":"Ground flaxseed + water (1:3), aquafaba, mashed banana, applesauce"],[isES?"Trigo / Wheat":"Trigo / Wheat","Fibra, B vitaminas, hierro",isES?"Arroz, maíz, quinoa, papa, harina de almendra, avena sin gluten":"Rice, corn, quinoa, potato, almond flour, gluten-free oats"],[isES?"Soya / Soy":"Soya / Soy",isES?"Proteína, hierro, calcio":"Protein, iron, calcium",isES?"Leche de coco, leche de arroz, carnes magras, leguminosas (si toleradas)":"Coconut milk, rice milk, lean meats, legumes (if tolerated)"],[isES?"Maní / Peanuts":"Maní / Peanuts",isES?"Proteína, grasas saludables":"Protein, healthy fats",isES?"Mantequilla de almendra/girasol/semilla de calabaza, semillas":"Almond/sunflower/pumpkin seed butter, seeds"],[isES?"Nueces árbol":"Tree nuts",isES?"Grasas omega-3, vitamina E":"Omega-3 fats, vitamin E",isES?"Semillas de girasol, calabaza, chía, linaza":"Sunflower, pumpkin, chia, flax seeds"],[isES?"Pescado / Fish":"Pescado / Fish","Omega-3, yodo, vitamina D",isES?"Suplemento omega-3 de algas, semillas de chía, nueces":"Algae omega-3 supplement, chia seeds, walnuts"]]}/>
        </InfoCard>
      </div>)}
      {tab==="labels"&&(<div>
        <InfoCard title={isES?"Cómo leer etiquetas con alergias":"How to read labels with allergies"} color={COLOR} bg={BG}>
          {[{cat:isES?"Buscar declaración de alérgenos":"Look for allergen declaration",items:isES?"En México/LAM: 'CONTIENE:' debe listarse al final de ingredientes. En USA: 'Contains' statement obligatorio para Big 9.":"In Mexico/LAM: 'CONTAINS:' must be listed at end of ingredients. In USA: 'Contains' statement mandatory for Big 9."},{cat:isES?"'Puede contener' o 'Procesado en instalaciones con...'":"'May contain' or 'Processed in facilities with...'",items:isES?"Advertencia voluntaria de contaminación cruzada. Para alergias severas (maní, nueces), evitar estos productos.":"Voluntary cross-contamination warning. For severe allergies (peanuts, tree nuts), avoid these products."},{cat:isES?"Ingredientes derivados":"Derived ingredients",items:isES?"Conocer todos los nombres del alérgeno — la caseína ES leche, el suero ES leche, el gluten ES trigo.":"Know all names of the allergen — casein IS milk, whey IS milk, gluten IS wheat."},{cat:isES?"Cambios en fórmulas":"Formula changes",items:isES?"Las fórmulas cambian — revisar la etiqueta cada vez aunque el producto sea conocido.":"Formulas change — check the label every time even if the product is familiar."}].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:COLOR,fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
        </InfoCard>
      </div>)}
      {tab==="celiac"&&(<div>
        <InfoCard title={isES?"Celiaquía vs sensibilidad al gluten":"Celiac disease vs gluten sensitivity"} color={COLOR} bg={BG}>
          <Table headers={["",isES?"Celiaquía":"Celiac disease",isES?"Sensibilidad al gluten no celíaca":"Non-celiac gluten sensitivity"]} rows={[[isES?"Mecanismo":"Mechanism",isES?"Autoinmune — daño a vellosidades intestinales":"Autoimmune — intestinal villi damage",isES?"No autoinmune — mecanismo no claro":"Non-autoimmune — unclear mechanism"],[isES?"Diagnóstico":"Diagnosis",isES?"Biopsia intestinal + anticuerpos (tTG-IgA)":"Intestinal biopsy + antibodies (tTG-IgA)",isES?"Exclusión de celiaquía y alergia al trigo":"Exclusion of celiac and wheat allergy"],[isES?"Dieta":"Diet",isES?"Sin gluten estricto de por vida":"Strict gluten-free for life",isES?"Sin gluten puede aliviar síntomas":"Gluten-free may relieve symptoms"],[isES?"Riesgo de trazas":"Risk of traces",isES?"< 20 ppm causa daño intestinal":"< 20 ppm causes intestinal damage",isES?"Variable según persona":"Variable per person"]]}/>
        </InfoCard>
        <InfoCard title={isES?"Cereales con y sin gluten":"Grains with and without gluten"} color="#0F6E56" bg="#E1F5EE">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div>
              <div style={{fontSize:12,fontWeight:600,color:"#A32D2D",fontFamily:F,marginBottom:6}}>❌ {isES?"CON gluten — evitar":"WITH gluten — avoid"}</div>
              {[isES?"Trigo (pan, pasta, harina)":"Wheat (bread, pasta, flour)",isES?"Cebada / Barley":"Cebada / Barley",isES?"Centeno / Rye":"Centeno / Rye",isES?"Triticale":"Triticale",isES?"Espelta / Spelt":"Espelta / Spelt",isES?"Kamut":"Kamut"].map((item,i)=>(<div key={i} style={{fontSize:12,color:"#3A5BA0",fontFamily:F,marginBottom:3}}>• {item}</div>))}
            </div>
            <div>
              <div style={{fontSize:12,fontWeight:600,color:"#0F6E56",fontFamily:F,marginBottom:6}}>✓ {isES?"SIN gluten — seguros":"WITHOUT gluten — safe"}</div>
              {[isES?"Arroz / Rice":"Arroz / Rice","Quinoa","Maíz / Corn",isES?"Papa / Potato":"Papa / Potato",isES?"Avena certificada sin gluten":"Certified gluten-free oats",isES?"Harina de almendra / coco":"Almond / coconut flour","Tapioca"].map((item,i)=>(<div key={i} style={{fontSize:12,color:"#3A5BA0",fontFamily:F,marginBottom:3}}>• {item}</div>))}
            </div>
          </div>
        </InfoCard>
        <InfoCard title={isES?"Nutrientes en riesgo en dieta sin gluten":"At-risk nutrients in gluten-free diet"} color="#854F0B" bg="#FAEEDA">
          <Table headers={["Nutriente",isES?"Por qué":"Why",isES?"Fuentes alternativas":"Alternative sources"]} rows={[["Fibra",isES?"Pan/cereales integrales eliminados":"Whole grain bread/cereals eliminated",isES?"Quinoa, arroz integral, leguminosas, frutas, verduras":"Quinoa, brown rice, legumes, fruits, vegetables"],["Hierro / Iron",isES?"Cereales enriquecidos eliminados":"Fortified cereals eliminated",isES?"Carnes rojas, leguminosas, espinaca + vitamina C":"Red meats, legumes, spinach + vitamin C"],["Vitamina B12",isES?"Cereales enriquecidos eliminados":"Fortified cereals eliminated",isES?"Carnes, huevo, lácteos, suplemento":"Meats, eggs, dairy, supplement"],["Calcio",isES?"Si también elimina lacteos":"If also eliminating dairy",isES?"Sardinas, tofu, leche vegetal fortificada":"Sardines, tofu, fortified plant milk"]]}/>
        </InfoCard>
      </div>)}
      {tab==="glutencheck"&&(<div>
        <InfoCard title={isES?"Verificador de gluten":"Gluten checker"} color={COLOR} bg={BG}>
          <GlutenCheckerInline isES={isES}/>
        </InfoCard>
      </div>)}
      {tab==="lactose"&&(<div>
        <InfoCard title={isES?"Intolerancia a la lactosa":"Lactose intolerance"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"La intolerancia a la lactosa es causada por deficiencia de lactasa — la enzima que digiere la lactosa. Afecta al 65-70% de la población mundial. No es una alergia — no daña el intestino y generalmente se puede tolerar cierta cantidad de lactosa.":"Lactose intolerance is caused by lactase deficiency — the enzyme that digests lactose. It affects 65-70% of the world population. It is not an allergy — it does not damage the intestine and generally some amount of lactose can be tolerated."}</p>
          <Table headers={[isES?"Producto lácteo":"Dairy product",isES?"Lactosa (g/porción)":"Lactose (g/serving)",isES?"Tolerancia":"Tolerance"]} rows={[["Leche entera 200mL / Whole milk","9-10g",isES?"Problemática para muchos":"Problematic for many"],["Yogur 150g / Yogurt","4-5g",isES?"Mejor tolerado (bacterias digieren lactosa)":"Better tolerated (bacteria digest lactose)"],["Queso duro 30g / Hard cheese","0-1g",isES?"Generalmente bien tolerado":"Generally well tolerated"],["Mantequilla 10g / Butter","0.1g",isES?"Bien tolerado":"Well tolerated"],["Leche sin lactosa / Lactose-free milk","0g",isES?"Sin síntomas":"No symptoms"]]}/>
        </InfoCard>
        <InfoCard title={isES?"Calcio sin lácteos":"Calcium without dairy"} color="#0F6E56" bg="#E1F5EE">
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,marginBottom:8}}>{isES?"Meta: 1000 mg/día. Fuentes no lácteas de calcio:":"Goal: 1000 mg/day. Non-dairy calcium sources:"}</p>
          <Table headers={[isES?"Alimento":"Food","Ca (mg/porción)"]} rows={[["Sardinas con hueso / Canned sardines 85g","325"],["Leche de soya fortificada 200mL","300"],["Tofu con calcio 100g","200-300"],["Salmón enlatado con hueso 85g","180"],["Col rizada / Kale 100g cocida","150"],["Brócoli 100g cocido","60"],["Almendras 30g","75"]]}/>
          <div style={{fontSize:11,color:"#3A5BA0",fontFamily:F,marginTop:8,padding:"6px 10px",background:"#fff",borderRadius:6}}>{isES?"Tip: la vitamina D es esencial para absorber el calcio. Verificar niveles y suplementar si es necesario.":"Tip: vitamin D is essential to absorb calcium. Check levels and supplement if necessary."}</div>
        </InfoCard>
      </div>)}
    </div>
  );
}

function HTNPage({isES}) {
  const [tab,setTab]=useState("general");
  const COLOR="#854F0B"; const BG="#FAEEDA";
  const tabs=[{id:"general",es:"General",en:"General"},{id:"dash",es:"Dieta DASH",en:"DASH Diet"},{id:"sodium",es:"Sodio",en:"Sodium"},{id:"foods",es:"Alimentos",en:"Foods"},{id:"meal",es:"Plan de comidas",en:"Meal plan"}];
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"6px 16px",borderRadius:20,border:"0.5px solid #D4E3FF",background:tab===t.id?COLOR:"#fff",color:tab===t.id?"#fff":COLOR,fontSize:12,fontFamily:F,cursor:"pointer"}}>{isES?t.es:t.en}</button>))}
      </div>
      {tab==="general"&&(<div>
        <InfoCard title={isES?"Hipertensión y nutrición":"Hypertension and nutrition"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"La hipertensión arterial (HTA) afecta a 1 de cada 3 adultos. El manejo nutricional puede reducir la presión arterial sistólica hasta 11 mmHg con dieta DASH, y 5-6 mmHg adicionales con restricción de sodio. La intervención nutricional es primera línea antes de medicación en HTA grado 1.":"Arterial hypertension (HTN) affects 1 in 3 adults. Nutritional management can reduce systolic blood pressure up to 11 mmHg with DASH diet, and 5-6 mmHg additionally with sodium restriction. Nutritional intervention is first line before medication in grade 1 HTN."}</p>
          <Table headers={[isES?"Clasificación":"Classification","PA Sistólica","PA Diastólica"]} rows={[[isES?"Normal":"Normal","< 120","< 80"],[isES?"Elevada":"Elevated","120-129","< 80"],[isES?"HTA Grado 1":"HTN Grade 1","130-139","80-89"],[isES?"HTA Grado 2":"HTN Grade 2","≥ 140","≥ 90"],[isES?"Crisis hipertensiva":"Hypertensive crisis","> 180","> 120"]]}/>
        </InfoCard>
        <InfoCard title={isES?"Objetivos nutricionales":"Nutritional goals"} color="#2563EB" bg="#EFF6FF">
          {[isES?"Reducir sodio a menos de 2300 mg/día (ideal < 1500 mg/día)":"Reduce sodium to less than 2300 mg/day (ideal < 1500 mg/day)",isES?"Seguir patrón DASH: rico en potasio, calcio y magnesio":"Follow DASH pattern: rich in potassium, calcium and magnesium",isES?"Mantener peso saludable — cada kg perdido reduce ~1 mmHg":"Maintain healthy weight — each kg lost reduces ~1 mmHg",isES?"Limitar alcohol a ≤ 1 bebida/día en mujeres, ≤ 2 en hombres":"Limit alcohol to ≤ 1 drink/day in women, ≤ 2 in men",isES?"Aumentar actividad física aeróbica":"Increase aerobic physical activity"].map((item,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:COLOR,fontWeight:600,fontSize:12}}>✓</span><span style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.5}}>{item}</span></div>))}
        </InfoCard>
      </div>)}
      {tab==="dash"&&(<div>
        <InfoCard title={isES?"Dieta DASH — Dietary Approaches to Stop Hypertension":"DASH Diet — Dietary Approaches to Stop Hypertension"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 12px"}}>{isES?"La dieta DASH reduce la PA sistólica 8-14 mmHg en hipertensos. Es rica en frutas, verduras, lácteos bajos en grasa, granos enteros y proteínas magras, con bajo contenido de sodio, grasas saturadas y azúcares añadidos.":"The DASH diet reduces systolic BP 8-14 mmHg in hypertensives. It is rich in fruits, vegetables, low-fat dairy, whole grains and lean proteins, with low sodium, saturated fat and added sugars."}</p>
          <Table headers={[isES?"Grupo alimentario":"Food group",isES?"Porciones/día (2000 kcal)":"Servings/day (2000 kcal)",isES?"Ejemplos":"Examples"]} rows={[[isES?"Frutas":"Fruits","4-5",isES?"Plátano, naranja, mango, manzana":"Banana, orange, mango, apple"],[isES?"Verduras":"Vegetables","4-5",isES?"Espinaca, brócoli, zanahoria, tomate":"Spinach, broccoli, carrot, tomato"],[isES?"Lácteos bajos en grasa":"Low-fat dairy","2-3",isES?"Leche descremada, yogur sin grasa":"Skim milk, fat-free yogurt"],[isES?"Granos enteros":"Whole grains","6-8",isES?"Arroz integral, avena, pan integral":"Brown rice, oats, whole wheat bread"],[isES?"Proteínas magras":"Lean proteins","≤ 6 oz",isES?"Pollo sin piel, pescado, clara de huevo":"Skinless chicken, fish, egg white"],[isES?"Nueces y leguminosas":"Nuts and legumes","4-5/semana",isES?"Almendras, nueces, frijoles, lentejas":"Almonds, walnuts, beans, lentils"],[isES?"Grasas y aceites":"Fats and oils","2-3",isES?"Aceite de oliva, aguacate (porciones pequeñas)":"Olive oil, avocado (small portions)"]]}/>
        </InfoCard>
        <InfoCard title={isES?"Minerales clave en DASH":"Key minerals in DASH"} color="#0F6E56" bg="#E1F5EE">
          <Table headers={["Mineral",isES?"Meta/día":"Goal/day",isES?"Efecto en PA":"Effect on BP",isES?"Fuentes":"Sources"]} rows={[["Potasio (K)","3500-4700 mg",isES?"↓ 2-3 mmHg":"↓ 2-3 mmHg",isES?"Plátano, papa, espinaca, frijoles":"Banana, potato, spinach, beans"],["Calcio (Ca)","1000-1200 mg",isES?"↓ 1-2 mmHg":"↓ 1-2 mmHg",isES?"Lácteos, sardinas, tofu, brócoli":"Dairy, sardines, tofu, broccoli"],["Magnesio (Mg)","420 mg",isES?"↓ 1-3 mmHg":"↓ 1-3 mmHg",isES?"Nueces, semillas, leguminosas, avena":"Nuts, seeds, legumes, oats"]]}/>
        </InfoCard>
      </div>)}
      {tab==="sodium"&&(<div>
        <InfoCard title={isES?"Restricción de sodio":"Sodium restriction"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"La reducción de sodio de 2300 a 1500 mg/día puede reducir la PA sistólica 5-6 mmHg adicionales. 1 cucharadita de sal = ~2300 mg de sodio. El 75% del sodio en la dieta proviene de alimentos procesados y restaurantes.":"Reducing sodium from 2300 to 1500 mg/day can reduce systolic BP an additional 5-6 mmHg. 1 teaspoon of salt = ~2300 mg sodium. 75% of dietary sodium comes from processed foods and restaurants."}</p>
          <Table headers={[isES?"Alimento alto en sodio":"High sodium food",isES?"Sodio aprox.":"Approx. sodium",isES?"Alternativa":"Alternative"]} rows={[[isES?"Sopa enlatada":"Canned soup","800-1200 mg",isES?"Sopa casera sin sal":"Homemade soup without salt"],[isES?"Pan de caja (2 rebanadas)":"Sliced bread (2 slices)","280-400 mg",isES?"Pan integral bajo en sodio":"Low-sodium whole grain bread"],[isES?"Queso procesado":"Processed cheese","400-500 mg",isES?"Queso fresco bajo en sodio":"Low-sodium fresh cheese"],[isES?"Salsa de soya (1 cda)":"Soy sauce (1 tbsp)","900 mg",isES?"Salsa de soya baja en sodio":"Low-sodium soy sauce"],[isES?"Embutidos (2 rebanadas)":"Cold cuts (2 slices)","400-600 mg",isES?"Pechuga de pavo natural":"Natural turkey breast"],[isES?"Comida rápida (hamburguesa)":"Fast food (burger)","1000-1500 mg",isES?"Preparar en casa":"Prepare at home"]]}/>
        </InfoCard>
        <InfoCard title={isES?"Consejos para reducir sodio":"Tips to reduce sodium"} color="#0F6E56" bg="#E1F5EE">
          {[isES?"Cocinar en casa — controlas el sodio":"Cook at home — you control the sodium",isES?"Leer etiquetas: elegir < 140 mg sodio por porción":"Read labels: choose < 140 mg sodium per serving",isES?"Usar especias: ajo, cebolla, limón, hierbas aromáticas":"Use spices: garlic, onion, lemon, aromatic herbs",isES?"Enjuagar enlatados (atún, frijoles) para reducir sodio 40%":"Rinse canned goods (tuna, beans) to reduce sodium 40%",isES?"Evitar salsas comerciales, aderezos y condimentos empacados":"Avoid commercial sauces, dressings and packaged condiments"].map((item,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:"#0F6E56",fontWeight:600}}>✓</span><span style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item}</span></div>))}
        </InfoCard>
      </div>)}
      {tab==="foods"&&(<div>
        <InfoCard title={isES?"Alimentos beneficiosos para la PA":"Beneficial foods for BP"} color="#0F6E56" bg="#E1F5EE">
          {[{cat:isES?"Remolacha / Betabel":"Beet",items:isES?"Rica en nitratos que se convierten en óxido nítrico — vasodilatación":"Rich in nitrates that convert to nitric oxide — vasodilation"},{cat:isES?"Ajo":"Garlic",items:isES?"La alicina reduce la PA sistólica ~5 mmHg — 1-2 dientes/día":"Allicin reduces systolic BP ~5 mmHg — 1-2 cloves/day"},{cat:isES?"Semillas de lino / Linaza":"Flaxseed",items:isES?"Omega-3 y lignanos — reducen PA sistólica y diastólica":"Omega-3 and lignans — reduce systolic and diastolic BP"},{cat:isES?"Pistaches":"Pistachios",items:isES?"Reducen resistencia vascular periférica — 1 porción (28g)/día":"Reduce peripheral vascular resistance — 1 serving (28g)/day"},{cat:isES?"Chocolate oscuro >70%":"Dark chocolate >70%",items:isES?"Flavonoides mejoran función endotelial — 20-30g/día":"Flavonoids improve endothelial function — 20-30g/day"}].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:"#0F6E56",fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
        </InfoCard>
        <InfoCard title={isES?"Alimentos a limitar":"Foods to limit"} color="#A32D2D" bg="#FCEBEB">
          {[{cat:isES?"Sodio y sal":"Sodium and salt",items:isES?"< 2300 mg/día — evitar agregar sal en la mesa":"< 2300 mg/day — avoid adding salt at the table"},{cat:isES?"Alcohol":"Alcohol",items:isES?"Más de 2 bebidas/día eleva la PA significativamente":"More than 2 drinks/day significantly raises BP"},{cat:isES?"Cafeína (en exceso)":"Caffeine (in excess)",items:isES?"Más de 400 mg/día puede elevar PA temporalmente":"More than 400 mg/day can temporarily raise BP"},{cat:isES?"Grasas saturadas y trans":"Saturated and trans fats",items:isES?"Aumentan rigidez arterial y riesgo cardiovascular":"Increase arterial stiffness and cardiovascular risk"},{cat:isES?"Azúcares añadidos":"Added sugars",items:isES?"Fructosa especialmente asociada con HTA":"Fructose especially associated with HTN"}].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:"#A32D2D",fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
        </InfoCard>
      </div>)}
      {tab==="meal"&&(<div>
        <InfoCard title={isES?"Plan DASH ejemplo (2000 kcal, ~1800 mg sodio)":"Sample DASH plan (2000 kcal, ~1800 mg sodium)"} color={COLOR} bg={BG}>
          <Table headers={[isES?"Comida":"Meal",isES?"Alimentos":"Foods","Na (mg)","kcal"]} rows={[[isES?"Desayuno":"Breakfast",isES?"Avena 50g + leche descremada 200mL + plátano 1 + nueces 15g":"Oats 50g + skim milk 200mL + 1 banana + walnuts 15g","120","420"],[isES?"Colación":"Snack",isES?"Manzana 1 + yogur sin grasa 100g":"1 apple + fat-free yogurt 100g","60","180"],[isES?"Almuerzo":"Lunch",isES?"Pollo 120g + arroz integral 60g + espinaca salteada con ajo":"Chicken 120g + brown rice 60g + spinach sautéed with garlic","300","500"],[isES?"Colación":"Snack",isES?"Almendras 20g + pera 1":"Almonds 20g + 1 pear","0","200"],[isES?"Cena":"Dinner",isES?"Salmón 100g + quinoa 50g + brócoli + remolacha":"Salmon 100g + quinoa 50g + broccoli + beet","280","480"],[isES?"Extra":"Extra",isES?"30g chocolate oscuro >70%":"30g dark chocolate >70%","5","160"],["Total","","765 mg Na","1940 kcal"]]}/>
        </InfoCard>
      </div>)}
    </div>
  );
}

function OBSPage({isES}) {
  const [tab,setTab]=useState("general");
  const COLOR="#2563EB"; const BG="#EFF6FF";
  const tabs=[{id:"general",es:"General",en:"General"},{id:"energy",es:"Energía y déficit",en:"Energy and deficit"},{id:"macros",es:"Macronutrientes",en:"Macronutrients"},{id:"strategies",es:"Estrategias",en:"Strategies"},{id:"meal",es:"Plan de comidas",en:"Meal plan"}];
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"6px 16px",borderRadius:20,border:"0.5px solid #D4E3FF",background:tab===t.id?COLOR:"#fff",color:tab===t.id?"#fff":COLOR,fontSize:12,fontFamily:F,cursor:"pointer"}}>{isES?t.es:t.en}</button>))}
      </div>
      {tab==="general"&&(<div>
        <InfoCard title={isES?"Obesidad — enfermedad crónica multifactorial":"Obesity — chronic multifactorial disease"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"La obesidad es una enfermedad crónica compleja caracterizada por exceso de tejido adiposo que deteriora la salud. El tratamiento nutricional busca un déficit calórico sostenible que produzca pérdida de peso gradual y mantenida, preservando la masa muscular.":"Obesity is a complex chronic disease characterized by excess adipose tissue that impairs health. Nutritional treatment seeks a sustainable caloric deficit that produces gradual and maintained weight loss, preserving muscle mass."}</p>
          <Table headers={["IMC (kg/m²)",isES?"Clasificación":"Classification",isES?"Riesgo de comorbilidades":"Comorbidity risk"]} rows={[["18.5-24.9",isES?"Normal":"Normal",isES?"Bajo":"Low"],["25.0-29.9",isES?"Sobrepeso":"Overweight",isES?"Aumentado":"Increased"],["30.0-34.9",isES?"Obesidad grado I":"Obesity grade I",isES?"Moderado":"Moderate"],["35.0-39.9",isES?"Obesidad grado II":"Obesity grade II",isES?"Severo":"Severe"],["≥ 40",isES?"Obesidad grado III":"Obesity grade III",isES?"Muy severo":"Very severe"]]}/>
        </InfoCard>
        <InfoCard title={isES?"Meta de pérdida de peso":"Weight loss goal"} color="#0F6E56" bg="#E1F5EE">
          {[isES?"Meta inicial: 5-10% del peso corporal en 6 meses — mejora significativa de comorbilidades":"Initial goal: 5-10% of body weight in 6 months — significant improvement of comorbidities",isES?"Ritmo recomendado: 0.5-1 kg/semana — pérdida gradual preserva músculo":"Recommended rate: 0.5-1 kg/week — gradual loss preserves muscle",isES?"Déficit calórico: 500-750 kcal/día por debajo del TDEE":"Caloric deficit: 500-750 kcal/day below TDEE",isES?"Nunca menos de 1200 kcal/día en mujeres o 1500 kcal/día en hombres":"Never less than 1200 kcal/day in women or 1500 kcal/day in men",isES?"El mantenimiento a largo plazo es el mayor reto — requiere cambio de hábitos":"Long-term maintenance is the biggest challenge — requires habit change"].map((item,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:"#0F6E56",fontWeight:600}}>✓</span><span style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.5}}>{item}</span></div>))}
        </InfoCard>
      </div>)}
      {tab==="energy"&&(<div>
        <InfoCard title={isES?"Cálculo del déficit calórico":"Caloric deficit calculation"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"El déficit calórico se calcula sobre el TDEE (gasto calórico total). Para perder 0.5 kg/semana se necesitan ~500 kcal/día de déficit (1 kg grasa = ~7700 kcal). Para cirugía bariátrica pre-op: dieta VLCD (800 kcal/día) por 2-4 semanas para reducir el hígado.":"Caloric deficit is calculated based on TDEE (total daily energy expenditure). To lose 0.5 kg/week ~500 kcal/day deficit is needed (1 kg fat = ~7700 kcal). For pre-op bariatric surgery: VLCD diet (800 kcal/day) for 2-4 weeks to reduce liver size."}</p>
          <Table headers={[isES?"Ritmo de pérdida":"Loss rate",isES?"Déficit necesario":"Required deficit",isES?"Tiempo estimado para -10%":"Estimated time for -10%"]} rows={[[isES?"Conservador (0.25 kg/semana)":"Conservative (0.25 kg/week)","250 kcal/día",isES?"~40 semanas":"~40 weeks"],[isES?"Moderado (0.5 kg/semana)":"Moderate (0.5 kg/week)","500 kcal/día",isES?"~20 semanas":"~20 weeks"],[isES?"Agresivo (1 kg/semana)":"Aggressive (1 kg/week)","750-1000 kcal/día",isES?"~10 semanas":"~10 weeks"]]}/>
        </InfoCard>
        <InfoCard title={isES?"Fórmulas para calcular requerimiento calórico":"Formulas to calculate caloric requirement"} color="#854F0B" bg="#FAEEDA">
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 8px"}}>{isES?"En obesidad se recomienda usar el peso ajustado o el peso ideal para evitar sobreestimar el GEB:":"In obesity it is recommended to use adjusted weight or ideal weight to avoid overestimating BMR:"}</p>
          <div style={{fontSize:12,color:"#3A5BA0",fontFamily:F,background:"#fff",padding:"10px",borderRadius:6,marginBottom:6}}><strong>{isES?"Peso ajustado":"Adjusted weight"}</strong> = {isES?"Peso ideal + 0.25 × (Peso real - Peso ideal)":"Ideal weight + 0.25 × (Actual weight - Ideal weight)"}</div>
          <div style={{fontSize:12,color:"#3A5BA0",fontFamily:F,background:"#fff",padding:"10px",borderRadius:6}}><strong>Mifflin-St Jeor</strong> ({isES?"más precisa en obesidad":"more accurate in obesity"}): <br/>{isES?"Mujeres: (10 × kg) + (6.25 × cm) - (5 × edad) - 161":"Women: (10 × kg) + (6.25 × cm) - (5 × age) - 161"}</div>
        </InfoCard>
      </div>)}
      {tab==="macros"&&(<div>
        <InfoCard title={isES?"Distribución de macronutrientes en obesidad":"Macronutrient distribution in obesity"} color={COLOR} bg={BG}>
          <Table headers={["Macronutriente",isES?"% Recomendado":"Recommended %",isES?"Prioridad":"Priority",isES?"Razón":"Reason"]} rows={[[isES?"Proteínas":"Protein","25-35%",isES?"Alta — aumentar":"High — increase",isES?"Preserva masa muscular, mayor saciedad":"Preserves muscle mass, greater satiety"],[isES?"Carbohidratos":"Carbohydrates","40-50%",isES?"Moderada — reducir refinados":"Moderate — reduce refined",isES?"Preferir complejos, IG bajo, ricos en fibra":"Prefer complex, low GI, fiber-rich"],[isES?"Grasas":"Fat","20-30%",isES?"Moderada":"Moderate",isES?"Priorizar insaturadas, limitar saturadas":"Prioritize unsaturated, limit saturated"]]}/>
        </InfoCard>
        <InfoCard title={isES?"Proteínas — el macronutriente clave en obesidad":"Protein — the key macronutrient in obesity"} color="#0F6E56" bg="#E1F5EE">
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 8px"}}>{isES?"Meta: 1.2-1.5 g/kg de peso ajustado/día. Las proteínas tienen mayor efecto termogénico (25-30% vs 8% CHO), mayor saciedad y preservan la masa muscular durante el déficit calórico.":"Goal: 1.2-1.5 g/kg adjusted weight/day. Proteins have higher thermogenic effect (25-30% vs 8% CHO), greater satiety and preserve muscle mass during caloric deficit."}</p>
          {[isES?"Pollo, pavo, pescado, claras de huevo":"Chicken, turkey, fish, egg whites",isES?"Lácteos bajos en grasa: yogur griego, requesón":"Low-fat dairy: Greek yogurt, cottage cheese",isES?"Leguminosas: frijoles, lentejas, garbanzos":"Legumes: beans, lentils, chickpeas",isES?"Proteína en cada comida para control del apetito":"Protein at each meal for appetite control"].map((item,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:4}}><span style={{color:"#0F6E56",fontWeight:600}}>✓</span><span style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item}</span></div>))}
        </InfoCard>
      </div>)}
      {tab==="strategies"&&(<div>
        <InfoCard title={isES?"Estrategias nutricionales basadas en evidencia":"Evidence-based nutritional strategies"} color={COLOR} bg={BG}>
          {[{cat:isES?"Control de porciones":"Portion control",items:isES?"Usar plato de 23cm, medir con la mano — palma = proteína, puño = CHO":"Use 23cm plate, measure with hand — palm = protein, fist = CHO"},{cat:isES?"Comer despacio":"Eat slowly",items:isES?"Masticar 20-30 veces por bocado. La saciedad tarda 20 min en llegar al cerebro":"Chew 20-30 times per bite. Satiety takes 20 min to reach the brain"},{cat:isES?"Frecuencia de comidas":"Meal frequency",items:isES?"3 comidas principales + 1-2 colaciones. Evitar saltarse comidas":"3 main meals + 1-2 snacks. Avoid skipping meals"},{cat:isES?"Ayuno intermitente (16:8)":"Intermittent fasting (16:8)",items:isES?"Puede ser efectivo si se mantiene déficit calórico total. No superior a otras dietas":"Can be effective if total caloric deficit is maintained. Not superior to other diets"},{cat:isES?"Registro alimentario":"Food diary",items:isES?"Registrar lo que se come aumenta la conciencia y mejora los resultados":"Recording what you eat increases awareness and improves outcomes"},{cat:isES?"Hidratación":"Hydration",items:isES?"Beber 500mL de agua antes de comidas reduce ingesta calórica ~13%":"Drinking 500mL water before meals reduces caloric intake ~13%"}].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:COLOR,fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
        </InfoCard>
      </div>)}
      {tab==="meal"&&(<div>
        <InfoCard title={isES?"Plan hipocalórico ejemplo (1500 kcal)":"Sample hypocaloric plan (1500 kcal)"} color={COLOR} bg={BG}>
          <Table headers={[isES?"Comida":"Meal",isES?"Alimentos":"Foods","Proteína","kcal"]} rows={[[isES?"Desayuno":"Breakfast",isES?"Yogur griego 150g + avena 30g + fresas 100g":"Greek yogurt 150g + oats 30g + strawberries 100g","18g","320"],[isES?"Colación":"Snack",isES?"Manzana 1 + almendras 15g":"1 apple + almonds 15g","4g","165"],[isES?"Almuerzo":"Lunch",isES?"Pechuga de pollo 150g + ensalada grande + aguacate 30g + vinagreta":"Chicken breast 150g + large salad + avocado 30g + vinaigrette","38g","430"],[isES?"Colación":"Snack",isES?"Requesón 100g + pepino":"Cottage cheese 100g + cucumber","12g","110"],[isES?"Cena":"Dinner",isES?"Salmón 120g + verduras al vapor + 1/2 camote":"Salmon 120g + steamed vegetables + 1/2 sweet potato","28g","380"],["Total","","100g proteína","1405 kcal"]]}/>
          <div style={{fontSize:11,color:"#3A5BA0",fontFamily:F,marginTop:10,padding:"6px 10px",background:"#fff",borderRadius:6}}>{isES?"Agua: 2-2.5L/día. Ajustar según TDEE individual calculado.":"Water: 2-2.5L/day. Adjust based on individual calculated TDEE."}</div>
        </InfoCard>
      </div>)}
    </div>
  );
}

function RENPage({isES}) {
  const [tab,setTab]=useState("general");
  const COLOR="#0F6E56"; const BG="#E1F5EE";
  const tabs=[{id:"general",es:"General",en:"General"},{id:"protein",es:"Proteínas",en:"Protein"},{id:"minerals",es:"K, P, Na",en:"K, P, Na"},{id:"foods",es:"Alimentos",en:"Foods"},{id:"meal",es:"Plan de comidas",en:"Meal plan"}];
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"6px 16px",borderRadius:20,border:"0.5px solid #D4E3FF",background:tab===t.id?COLOR:"#fff",color:tab===t.id?"#fff":COLOR,fontSize:12,fontFamily:F,cursor:"pointer"}}>{isES?t.es:t.en}</button>))}
      </div>
      {tab==="general"&&(<div>
        <InfoCard title={isES?"Enfermedad renal crónica y nutrición":"Chronic kidney disease and nutrition"} color={COLOR} bg={BG}>
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"La ERC requiere ajustes nutricionales específicos según el estadio (TFGe). El manejo dietético busca retardar la progresión, prevenir la uremia y mantener el estado nutricional. Es fundamental individualizar según TFGe, presencia de diálisis, diabetes y otras comorbilidades.":"CKD requires specific nutritional adjustments based on stage (eGFR). Dietary management seeks to slow progression, prevent uremia and maintain nutritional status. It is essential to individualize based on eGFR, presence of dialysis, diabetes and other comorbidities."}</p>
          <Table headers={[isES?"Estadio ERC":"CKD Stage","TFGe (mL/min/1.73m²)",isES?"Descripción":"Description"]} rows={[["G1","≥ 90",isES?"Daño renal con TFG normal":"Kidney damage with normal GFR"],["G2","60-89",isES?"Leve disminución":"Mild decrease"],["G3a","45-59",isES?"Leve-moderada":"Mild-moderate"],["G3b","30-44",isES?"Moderada-severa":"Moderate-severe"],["G4","15-29",isES?"Severa":"Severe"],["G5","< 15",isES?"Falla renal / diálisis":"Kidney failure / dialysis"]]}/>
        </InfoCard>
        <InfoCard title={isES?"Objetivos nutricionales en ERC":"Nutritional goals in CKD"} color="#2563EB" bg="#EFF6FF">
          {[isES?"Retardar progresión de la ERC mediante control de proteínas":"Slow CKD progression through protein control",isES?"Prevenir hiperpotasemia, hiperfosfatemia e hipernatremia":"Prevent hyperkalemia, hyperphosphatemia and hypernatremia",isES?"Mantener estado nutricional — la desnutrición es común en ERC":"Maintain nutritional status — malnutrition is common in CKD",isES?"Controlar presión arterial mediante restricción de sodio":"Control blood pressure through sodium restriction",isES?"Mantener balance hídrico según función renal residual":"Maintain fluid balance based on residual renal function"].map((item,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:COLOR,fontWeight:600}}>✓</span><span style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.5}}>{item}</span></div>))}
        </InfoCard>
      </div>)}
      {tab==="protein"&&(<div>
        <InfoCard title={isES?"Proteínas según estadio ERC":"Protein by CKD stage"} color={COLOR} bg={BG}>
          <Table headers={[isES?"Estadio / Condición":"Stage / Condition",isES?"Proteína recomendada":"Recommended protein",isES?"Comentario":"Comment"]} rows={[["ERC G1-G2","0.8 g/kg/día",isES?"Sin restricción adicional":"No additional restriction"],["ERC G3-G4",isES?"0.6-0.8 g/kg/día":"0.6-0.8 g/kg/day",isES?"Restricción moderada — retarda progresión":"Moderate restriction — slows progression"],["ERC G5 sin diálisis","0.6 g/kg/día",isES?"Restricción estricta + cetoácidos si disponible":"Strict restriction + keto acids if available"],["Hemodiálisis","1.2-1.4 g/kg/día",isES?"Aumentar — la diálisis aumenta pérdidas de proteína":"Increase — dialysis increases protein losses"],["Diálisis peritoneal","1.2-1.5 g/kg/día",isES?"Mayor pérdida de proteína por peritoneo":"Greater protein loss through peritoneum"]]}/>
        </InfoCard>
        <InfoCard title={isES?"Calidad de proteína en ERC":"Protein quality in CKD"} color="#2563EB" bg="#EFF6FF">
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 8px"}}>{isES?"Preferir proteínas de alto valor biológico (AVB) que generan menos desechos nitrogenados. Al menos 50% de la proteína debe ser AVB.":"Prefer high biological value (HBV) proteins that generate less nitrogenous waste. At least 50% of protein should be HBV."}</p>
          <Table headers={[isES?"Proteína AVB (preferir)":"HBV Protein (prefer)",isES?"Proteína baja VB (limitar)":"Low BV Protein (limit)"]} rows={[[isES?"Huevo (clara especialmente)":"Egg (white especially)",isES?"Leguminosas (alto P y K)":"Legumes (high P and K)"],[isES?"Pollo, pavo sin piel":"Skinless chicken, turkey",isES?"Nueces y semillas":"Nuts and seeds"],[isES?"Pescado (con cuidado por P)":"Fish (careful with P)",isES?"Cereales integrales":"Whole grains"],[isES?"Lácteos (restringir por P)":"Dairy (restrict for P)","—"]]}/>
        </InfoCard>
      </div>)}
      {tab==="minerals"&&(<div>
        <InfoCard title={isES?"Potasio (K) en ERC":"Potassium (K) in CKD"} color="#A32D2D" bg="#FCEBEB">
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"La hiperpotasemia (K > 5.5 mEq/L) es una complicación grave que puede causar arritmias cardiacas. Restricción según TFGe y niveles séricos. Meta: K sérico 3.5-5.0 mEq/L.":"Hyperkalemia (K > 5.5 mEq/L) is a serious complication that can cause cardiac arrhythmias. Restriction based on eGFR and serum levels. Goal: serum K 3.5-5.0 mEq/L."}</p>
          <Table headers={[isES?"Alimentos altos en K — limitar":"High K foods — limit",isES?"K (mg/100g)":"K (mg/100g)"]} rows={[["Papa / Potato","535"],["Plátano / Banana","358"],["Naranja / Orange","181"],["Tomate / Tomato","237"],["Frijoles / Beans","405"],["Espinaca / Spinach","558"]]}/>
          <div style={{fontSize:11,color:"#3A5BA0",fontFamily:F,marginTop:8,padding:"6px 10px",background:"#fff",borderRadius:6}}>{isES?"Técnica de lixiviación: pelar, cortar en trozos pequeños, remojar en agua 4h o hervir en agua abundante y desechar el agua — reduce K 50-75%.":"Leaching technique: peel, cut into small pieces, soak in water 4h or boil in plenty of water and discard water — reduces K 50-75%."}</div>
        </InfoCard>
        <InfoCard title={isES?"Fósforo (P) en ERC":"Phosphorus (P) in CKD"} color="#854F0B" bg="#FAEEDA">
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"La hiperfosfatemia daña los vasos sanguíneos y huesos. Meta: P sérico 2.5-4.5 mg/dL. El fósforo de origen animal se absorbe 40-60%, el vegetal 20-40% y el de aditivos alimentarios 90-100% — evitar alimentos ultraprocesados.":"Hyperphosphatemia damages blood vessels and bones. Goal: serum P 2.5-4.5 mg/dL. Phosphorus from animal sources absorbs 40-60%, plant-based 20-40% and food additives 90-100% — avoid ultra-processed foods."}</p>
          <Table headers={[isES?"Alimentos altos en P — limitar":"High P foods — limit","P (mg/100g)"]} rows={[["Lácteos / Dairy","~120-200"],["Nueces / Nuts","~500"],["Leguminosas / Legumes","~350"],["Mariscos / Shellfish","~300"],["Cola / Cola drinks","~35 + aditivos"]]}/>
        </InfoCard>
        <InfoCard title={isES?"Sodio y líquidos en ERC":"Sodium and fluids in CKD"} color="#0F6E56" bg="#E1F5EE">
          <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:0}}>{isES?"Sodio: < 2000 mg/día para control de PA y retención de líquidos. Líquidos en diálisis: orina residual + 500-750 mL. Signos de retención: edema, aumento de peso súbito > 1 kg/día.":"Sodium: < 2000 mg/day for BP control and fluid retention. Fluids in dialysis: residual urine + 500-750 mL. Signs of retention: edema, sudden weight gain > 1 kg/day."}</p>
        </InfoCard>
      </div>)}
      {tab==="foods"&&(<div>
        <InfoCard title={isES?"Alimentos seguros en ERC (G3-G4)":"Safe foods in CKD (G3-G4)"} color={COLOR} bg={BG}>
          {[{cat:isES?"Cereales y panes":"Grains and breads",items:isES?"Arroz blanco, pasta, pan blanco, maíz — BAJO en K y P vs integrales":"White rice, pasta, white bread, corn — LOW in K and P vs whole grain"},{cat:isES?"Proteínas recomendadas":"Recommended proteins",items:isES?"Clara de huevo, pollo sin piel, pavo — AVB y bajo P relativo":"Egg white, skinless chicken, turkey — HBV and relatively low P"},{cat:isES?"Frutas bajas en K":"Low K fruits",items:isES?"Manzana, pera, durazno, piña, fresas, uvas (porciones controladas)":"Apple, pear, peach, pineapple, strawberries, grapes (controlled portions)"},{cat:isES?"Verduras bajas en K":"Low K vegetables",items:isES?"Coliflor, col, ejote, pepino, cebolla, lechuga, pimiento":"Cauliflower, cabbage, green bean, cucumber, onion, lettuce, pepper"},{cat:isES?"Grasas":"Fats",items:isES?"Aceite de oliva, mantequilla (con moderación) — sin fósforo significativo":"Olive oil, butter (in moderation) — no significant phosphorus"}].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:COLOR,fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
        </InfoCard>
      </div>)}
      {tab==="meal"&&(<div>
        <InfoCard title={isES?"Plan para ERC G3-G4 ejemplo (1800 kcal, 0.7 g proteína/kg)":"Sample CKD G3-G4 plan (1800 kcal, 0.7 g protein/kg)"} color={COLOR} bg={BG}>
          <p style={{fontSize:11,color:"#3A5BA0",fontFamily:F,margin:"0 0 10px"}}>{isES?"Basado en paciente de 70 kg. Individualizar siempre con nefrólogo y nutricionista.":"Based on 70 kg patient. Always individualize with nephrologist and nutritionist."}</p>
          <Table headers={[isES?"Comida":"Meal",isES?"Alimentos":"Foods","Proteína","kcal"]} rows={[[isES?"Desayuno":"Breakfast",isES?"Claras de huevo 3 + pan blanco 2 rebanadas + mantequilla + té":"3 egg whites + 2 slices white bread + butter + tea","12g","350"],[isES?"Colación":"Snack",isES?"Manzana 1 + arroz inflado":"1 apple + puffed rice","2g","150"],[isES?"Almuerzo":"Lunch",isES?"Pollo 80g + arroz blanco 80g + ensalada de pepino y lechuga + aceite oliva":"Chicken 80g + white rice 80g + cucumber lettuce salad + olive oil","20g","520"],[isES?"Colación":"Snack",isES?"Pera 1 + galletas de arroz":"1 pear + rice crackers","2g","180"],[isES?"Cena":"Dinner",isES?"Pavo 80g + pasta 80g + ejotes + aceite de oliva":"Turkey 80g + pasta 80g + green beans + olive oil","20g","500"],["Total","","56g proteína (0.8g/kg)","1700 kcal"]]}/>
          <div style={{fontSize:11,color:"#A32D2D",fontFamily:F,marginTop:10,padding:"6px 10px",background:"#FCEBEB",borderRadius:6}}>{isES?"⚠️ Este plan es referencial. El manejo de ERC debe ser supervisado por nefrólogo y nutricionista especializado.":"⚠️ This plan is for reference. CKD management must be supervised by a nephrologist and specialized nutritionist."}</div>
        </InfoCard>
      </div>)}
    </div>
  );
}

function GoutPage({isES}) {
  const [tab, setTab] = useState("general");
  const DKBLUE = "#0C447C";
  const DKBLUEBG = "#E0EEFF";
  const tabs = [{id:"general",es:"General",en:"General"},{id:"purines",es:"Purinas",en:"Purines"},{id:"foods",es:"Alimentos",en:"Foods"},{id:"triggers",es:"Desencadenantes",en:"Triggers"},{id:"meal",es:"Plan de comidas",en:"Meal plan"}];
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {tabs.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"6px 16px",borderRadius:20,border:"0.5px solid #D4E3FF",background:tab===t.id?DKBLUE:"#fff",color:tab===t.id?"#fff":DKBLUE,fontSize:12,fontFamily:F,cursor:"pointer"}}>{isES?t.es:t.en}</button>))}
      </div>
      {tab==="general"&&(
        <div>
          <InfoCard title={isES?"Gota y hiperuricemia":"Gout and hyperuricemia"} color={DKBLUE} bg={DKBLUEBG}>
            <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:"0 0 10px"}}>{isES?"La gota es una artritis inflamatoria causada por la deposición de cristales de urato monosódico en articulaciones. Resulta de hiperuricemia crónica (ácido úrico sérico > 6.8 mg/dL). La dieta puede reducir el ácido úrico en 1-2 mg/dL, complementando el tratamiento farmacológico.":"Gout is an inflammatory arthritis caused by deposition of monosodium urate crystals in joints. It results from chronic hyperuricemia (serum uric acid > 6.8 mg/dL). Diet can reduce uric acid by 1-2 mg/dL, complementing pharmacological treatment."}</p>
            <Table headers={[isES?"Parámetro":"Parameter", isES?"Meta":"Target"]} rows={[[isES?"Ácido úrico sérico (sin tofos)":"Serum uric acid (without tophi)","< 6.0 mg/dL"],[isES?"Ácido úrico sérico (con tofos)":"Serum uric acid (with tophi)","< 5.0 mg/dL"],[isES?"Hidratación diaria":"Daily hydration","≥ 2-3 L/día"],[isES?"Peso corporal":"Body weight",isES?"IMC < 25 (bajar gradual)":"BMI < 25 (gradual loss)"]]}/>
          </InfoCard>
          <InfoCard title={isES?"¿Qué son las purinas?":"What are purines?"} color="#2563EB" bg="#EFF6FF">
            <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:0}}>{isES?"Las purinas son compuestos presentes naturalmente en los alimentos y producidos endógenamente. Al metabolizarse, se convierten en ácido úrico a través de la xantina oxidasa. El 80% del ácido úrico es de producción endógena y el 20% dietético, pero la dieta sigue siendo un factor modificable importante.":"Purines are compounds naturally present in food and produced endogenously. When metabolized, they convert to uric acid through xanthine oxidase. 80% of uric acid is endogenous and 20% dietary, but diet remains an important modifiable factor."}</p>
          </InfoCard>
        </div>
      )}
      {tab==="purines"&&(
        <div>
          <InfoCard title={isES?"Contenido de purinas por alimento":"Purine content by food"} color={DKBLUE} bg={DKBLUEBG}>
            <div style={{fontSize:11,color:"#3A5BA0",fontFamily:F,marginBottom:10,padding:"6px 10px",background:"#fff",borderRadius:6}}>{isES?"Alto: >200 mg purinas/100g | Moderado: 100-200 mg/100g | Bajo: <100 mg/100g":"High: >200 mg purines/100g | Moderate: 100-200 mg/100g | Low: <100 mg/100g"}</div>
            <Table headers={[isES?"Alimento":"Food", isES?"Purinas (mg/100g)":"Purines (mg/100g)", isES?"Nivel":"Level"]} rows={[["Anchoas / Anchovies","411",isES?"🔴 Muy alto":"🔴 Very high"],["Hígado / Liver","360",isES?"🔴 Muy alto":"🔴 Very high"],["Sardinas / Sardines","345",isES?"🔴 Muy alto":"🔴 Very high"],["Macarela / Mackerel","246",isES?"🔴 Alto":"🔴 High"],["Carne de res / Beef","133",isES?"🟡 Moderado":"🟡 Moderate"],["Pollo / Chicken","115",isES?"🟡 Moderado":"🟡 Moderate"],["Camarón / Shrimp","137",isES?"🟡 Moderado":"🟡 Moderate"],["Espárragos / Asparagus","23",isES?"🟢 Bajo":"🟢 Low"],["Espinaca / Spinach","57",isES?"🟢 Bajo":"🟢 Low"],["Champiñones / Mushrooms","58",isES?"🟢 Bajo":"🟢 Low"],["Coliflor / Cauliflower","51",isES?"🟢 Bajo":"🟢 Low"],["Frijoles / Beans","45",isES?"🟢 Bajo — aceptable":"🟢 Low — acceptable"],["Leche / Milk","0",isES?"🟢 Sin purinas":"🟢 No purines"],["Huevo / Egg","3",isES?"🟢 Sin purinas":"🟢 No purines"],["Arroz / Rice","18",isES?"🟢 Sin purinas":"🟢 No purines"],["Pan / Bread","14",isES?"🟢 Sin purinas":"🟢 No purines"]]}/>
          </InfoCard>
        </div>
      )}
      {tab==="foods"&&(
        <div>
          <InfoCard title={isES?"Alimentos que REDUCEN el ácido úrico":"Foods that REDUCE uric acid"} color="#0F6E56" bg="#E1F5EE">
            {[{cat:isES?"Cerezas / Cherry juice":"Cerezas / Cherry juice",items:isES?"Reducen ácido úrico y frecuencia de ataques hasta 35% — 10-12 cerezas/día o 240mL jugo":"Reduce uric acid and attack frequency up to 35% — 10-12 cherries/day or 240mL juice"},{cat:isES?"Lácteos bajos en grasa":"Low-fat dairy",items:isES?"Leche descremada y yogur sin grasa reducen ácido úrico — 2 porciones/día":"Skim milk and fat-free yogurt reduce uric acid — 2 servings/day"},{cat:isES?"Café":"Coffee",items:isES?"3-4 tazas/día asociadas con menor riesgo de gota (inhibe xantina oxidasa)":"3-4 cups/day associated with lower gout risk (inhibits xanthine oxidase)"},{cat:isES?"Vitamina C":"Vitamin C",items:isES?"500-1500 mg/día reducen ácido úrico ~0.5 mg/dL — naranja, pimiento, fresas":"500-1500 mg/day reduce uric acid ~0.5 mg/dL — orange, pepper, strawberries"},{cat:isES?"Agua":"Water",items:isES?"2-3L/día favorece excreción renal de ácido úrico":"2-3L/day promotes renal excretion of uric acid"}].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:"#0F6E56",fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
          </InfoCard>
          <InfoCard title={isES?"Alimentos que ELEVAN el ácido úrico — evitar":"Foods that RAISE uric acid — avoid"} color="#A32D2D" bg="#FCEBEB">
            {[{cat:isES?"Vísceras / Órganos":"Offal / Organ meats",items:isES?"Hígado, riñón, corazón, sesos — muy alto contenido de purinas":"Liver, kidney, heart, brain — very high purine content"},{cat:isES?"Mariscos y pescados grasos":"Shellfish and fatty fish",items:isES?"Anchoas, sardinas, macarela, mejillones, ostiones — limitar fuertemente":"Anchovies, sardines, mackerel, mussels, oysters — strongly limit"},{cat:isES?"Alcohol (especialmente cerveza)":"Alcohol (especially beer",items:isES?"La cerveza contiene guanosina. El alcohol reduce excreción renal de ácido úrico":"Beer contains guanosine. Alcohol reduces renal excretion of uric acid"},{cat:isES?"Fructosa — azúcar de alto impacto":"Fructose — high impact sugar",items:isES?"Refrescos, jugos de fruta, HFCS — aumentan síntesis endógena de purinas":"Sodas, fruit juices, HFCS — increase endogenous purine synthesis"},{cat:isES?"Carnes rojas en exceso":"Excess red meat",items:isES?"Res, cerdo, cordero — limitar a 1-2 porciones/semana":"Beef, pork, lamb — limit to 1-2 servings/week"}].map((item,i)=>(<div key={i} style={{marginBottom:10}}><div style={{fontSize:12,fontWeight:600,color:"#A32D2D",fontFamily:F,marginBottom:2}}>{item.cat}</div><div style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{item.items}</div></div>))}
          </InfoCard>
        </div>
      )}
      {tab==="triggers"&&(
        <div>
          <InfoCard title={isES?"Desencadenantes de crisis de gota":"Gout attack triggers"} color="#A32D2D" bg="#FCEBEB">
            <Table headers={[isES?"Desencadenante":"Trigger", isES?"Mecanismo":"Mechanism", isES?"Recomendación":"Recommendation"]} rows={[[isES?"Alcohol (cerveza)":"Alcohol (beer)",isES?"Guanosina + reduce excreción renal":"Guanosine + reduces renal excretion",isES?"Evitar completamente durante crisis":"Avoid completely during attack"],[isES?"Fructosa (refrescos, jugos)":"Fructose (sodas, juices)",isES?"Activa síntesis de purinas":"Activates purine synthesis",isES?"Eliminar bebidas azucaradas":"Eliminate sugary drinks"],[isES?"Deshidratación":"Dehydration",isES?"Concentra ácido úrico en sangre":"Concentrates uric acid in blood",isES?"Beber ≥2L agua/día":"Drink ≥2L water/day"],[isES?"Ayuno prolongado":"Prolonged fasting",isES?"Aumenta producción de ácido úrico":"Increases uric acid production",isES?"No saltarse comidas":"Do not skip meals"],[isES?"Pérdida de peso rápida":"Rapid weight loss",isES?"Libera purinas del tejido":"Releases tissue purines",isES?"Bajar máximo 0.5kg/semana":"Lose maximum 0.5kg/week"],[isES?"Trauma articular":"Joint trauma",isES?"Desestabiliza cristales de urato":"Destabilizes urate crystals",isES?"Proteger articulaciones":"Protect joints"]]}/>
          </InfoCard>
          <InfoCard title={isES?"Hidratación en gota":"Hydration in gout"} color={DKBLUE} bg={DKBLUEBG}>
            <p style={{fontSize:12,color:"#3A5BA0",fontFamily:F,lineHeight:1.7,margin:0}}>{isES?"La hidratación adecuada es uno de los factores dietéticos más importantes en gota. El agua diluye el ácido úrico sérico y aumenta su excreción renal. Meta: orina clara a amarillo pálido. Incluir agua alcalina o bicarbonato de sodio (consultar con médico) puede alcalinizar la orina y aumentar la excreción de uratos.":"Adequate hydration is one of the most important dietary factors in gout. Water dilutes serum uric acid and increases its renal excretion. Goal: clear to pale yellow urine. Including alkaline water or sodium bicarbonate (consult physician) can alkalinize urine and increase urate excretion."}</p>
          </InfoCard>
        </div>
      )}
      {tab==="meal"&&(
        <div>
          <InfoCard title={isES?"Plan bajo en purinas ejemplo":"Sample low-purine plan"} color={DKBLUE} bg={DKBLUEBG}>
            <Table headers={[isES?"Comida":"Meal", isES?"Alimentos":"Foods", "kcal"]} rows={[[isES?"Desayuno":"Breakfast",isES?"Leche descremada 250mL + avena 50g + fresas 100g":"Skim milk 250mL + oats 50g + strawberries 100g","320"],[isES?"Colación":"Snack",isES?"10-12 cerezas frescas + 1 vaso de agua":"10-12 fresh cherries + 1 glass of water","80"],[isES?"Almuerzo":"Lunch",isES?"Pollo 100g (sin vísceras) + arroz 60g + ensalada de verduras + agua con limón":"Chicken 100g (no offal) + rice 60g + vegetable salad + lemon water","450"],[isES?"Colación":"Snack",isES?"Yogur descremado 150g + 1 naranja":"Skim yogurt 150g + 1 orange","180"],[isES?"Cena":"Dinner",isES?"Huevo 2 pzas + verduras salteadas + pan integral 2 rebanadas":"2 eggs + sautéed vegetables + 2 slices whole wheat bread","380"],[isES?"Hidratación total":"Total hydration",isES?"≥ 2.5L agua durante el día":"≥ 2.5L water throughout the day","—"],["Total","","1410 kcal"]]}/>
            <div style={{fontSize:11,color:"#3A5BA0",fontFamily:F,marginTop:10,padding:"6px 10px",background:"#fff",borderRadius:6}}>{isES?"Nota: incluir vitamina C diaria (naranja, pimiento, fresas) y café si es tolerado.":"Note: include daily vitamin C (orange, pepper, strawberries) and coffee if tolerated."}</div>
          </InfoCard>
        </div>
      )}
    </div>
  );
}

export default function Conditions({lang}) {
  const isES = lang === "ES";
  const [active, setActive] = useState("dm2");
  const conditions = [
    {id:"dm2", es:"Diabetes mellitus tipo 2", en:"Type 2 diabetes mellitus", color:RED, bg:REDBG},
    {id:"htn", es:"Hipertensión arterial", en:"Hypertension", color:"#854F0B", bg:"#FAEEDA"},
    {id:"obs", es:"Obesidad", en:"Obesity", color:BLUE, bg:"#EFF6FF"},
    {id:"ren", es:"Enfermedad renal crónica", en:"Chronic kidney disease", color:"#0F6E56", bg:"#E1F5EE"},
    {id:"art", es:"Artritis reumatoide", en:"Rheumatoid arthritis", color:"#7C3AED", bg:"#F3E8FF"},
    {id:"gout", es:"Gota", en:"Gout", color:"#0C447C", bg:"#E0EEFF"},
    {id:"fertility", es:"Fertilidad y nutrición", en:"Fertility and nutrition", color:"#BE185D", bg:"#FCE7F3"},
    {id:"allergy", es:"Alergias alimentarias", en:"Food allergies", color:"#92400E", bg:"#FEF3C7"},
    {id:"pregnancy", es:"Embarazo y lactancia", en:"Pregnancy and lactation", color:"#BE185D", bg:"#FCE7F3"},
    {id:"cancer", es:"Cáncer y nutrición", en:"Cancer and nutrition", color:"#374151", bg:"#F3F4F6"},
    {id:"cholesterol", es:"Colesterol / Dislipidemia", en:"Cholesterol / Dyslipidemia", color:"#065F46", bg:"#ECFDF5"},
    {id:"thyroid", es:"Tiroides", en:"Thyroid", color:"#1E40AF", bg:"#EFF6FF"},
  ];
  return (
    <div style={{padding:"40px 32px", maxWidth:900, margin:"0 auto"}}>
      <div style={{fontSize:11,fontWeight:500,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,fontFamily:F}}>{isES?"Condiciones clínicas":"Clinical conditions"}</div>
      <div style={{fontSize:26,fontWeight:500,color:NAVY,marginBottom:6,fontFamily:F}}>{isES?"Guías de nutrición por condición":"Nutrition guides by condition"}</div>
      <div style={{fontSize:13,color:"#3A5BA0",marginBottom:28,fontFamily:F}}>{isES?"Información basada en evidencia para el manejo nutricional.":"Evidence-based information for nutritional management."}</div>
      <div style={{display:"flex",gap:8,marginBottom:28,flexWrap:"wrap"}}>
        {conditions.map(c=>(
          <button key={c.id} onClick={()=>setActive(c.id)} style={{padding:"8px 18px",borderRadius:20,border:`0.5px solid ${c.color}44`,background:active===c.id?c.color:"#fff",color:active===c.id?"#fff":c.color,fontSize:12,fontWeight:500,fontFamily:F,cursor:"pointer"}}>
            {isES?c.es:c.en}
          </button>
        ))}
      </div>
      {active==="dm2"&&<DM2Page isES={isES}/>}
      {active==="art"&&<ARPage isES={isES}/>}
      {active==="gout"&&<GoutPage isES={isES}/>}
      {active==="pregnancy"&&<PregnancyPage isES={isES}/>}
      {active==="cancer"&&<CancerPage isES={isES}/>}
      {active==="cholesterol"&&<CholesterolPage isES={isES}/>}
      {active==="thyroid"&&<ThyroidPage isES={isES}/>}
      {active==="fertility"&&<FertilityPage isES={isES}/>}
      {active==="allergy"&&<AllergyPage isES={isES}/>}
      {active==="htn"&&<HTNPage isES={isES}/>}
      {active==="obs"&&<OBSPage isES={isES}/>}
      {active==="ren"&&<RENPage isES={isES}/>}
    </div>
  );
}

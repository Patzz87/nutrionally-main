import { useState } from "react";
const F = "Plus Jakarta Sans, sans-serif";
const TEAL = "#2A9D8F";
const NAVY = "#1E2D4E";
const BLUE = "#2563EB";

function CalcCard({title, desc, children}) {
  return (
    <div style={{background:"#fff",border:"0.5px solid #D4E3FF",borderRadius:12,padding:24,marginBottom:16}}>
      <div style={{fontSize:15,fontWeight:500,color:NAVY,marginBottom:4,fontFamily:F}}>{title}</div>
      <div style={{fontSize:12,color:"#3A5BA0",marginBottom:16,fontFamily:F}}>{desc}</div>
      {children}
    </div>
  );
}

function Result({label, value, unit, color="#2563EB", bg="#EFF6FF"}) {
  return (
    <div style={{background:bg,borderRadius:8,padding:"12px 16px",marginTop:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <span style={{fontSize:12,color:NAVY,fontFamily:F}}>{label}</span>
      <span style={{fontSize:18,fontWeight:500,color:color,fontFamily:F}}>{value} <span style={{fontSize:12}}>{unit}</span></span>
    </div>
  );
}

function Input({label, value, onChange, unit, min, max, type="number"}) {
  return (
    <div style={{marginBottom:10}}>
      <label style={{fontSize:12,color:"#3A5BA0",fontFamily:F,display:"block",marginBottom:4}}>{label}</label>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <input type={type} value={value} onChange={e=>onChange(e.target.value)} min={min} max={max}
          style={{flex:1,padding:"8px 12px",borderRadius:8,border:"0.5px solid #D4E3FF",fontSize:13,fontFamily:F,outline:"none",color:NAVY}} />
        {unit&&<span style={{fontSize:12,color:"#3A5BA0",fontFamily:F,minWidth:30}}>{unit}</span>}
      </div>
    </div>
  );
}

function Select({label, value, onChange, options}) {
  return (
    <div style={{marginBottom:10}}>
      <label style={{fontSize:12,color:"#3A5BA0",fontFamily:F,display:"block",marginBottom:4}}>{label}</label>
      <select value={value} onChange={e=>onChange(e.target.value)}
        style={{width:"100%",padding:"8px 12px",borderRadius:8,border:"0.5px solid #D4E3FF",fontSize:13,fontFamily:F,outline:"none",color:NAVY,background:"#fff"}}>
        {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function BMICalc({isES}) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("metric");
  let bmi = null, category = "", color = TEAL, bg = "#E1F5EE";
  if (weight && height) {
    const w = parseFloat(weight), h = parseFloat(height);
    if (unit === "metric") bmi = +(w / ((h/100)**2)).toFixed(1);
    else bmi = +((w*0.453592) / ((h*0.0254)**2)).toFixed(1);
    if (bmi < 18.5) { category = isES?"Bajo peso":"Underweight"; color="#854F0B"; bg="#FAEEDA"; }
    else if (bmi < 25) { category = isES?"Normal":"Normal"; color="#0F6E56"; bg="#E1F5EE"; }
    else if (bmi < 30) { category = isES?"Sobrepeso":"Overweight"; color="#854F0B"; bg="#FAEEDA"; }
    else { category = isES?"Obesidad":"Obesity"; color="#A32D2D"; bg="#FCEBEB"; }
  }
  return (
    <CalcCard title={isES?"Calculadora de IMC":"BMI Calculator"} desc={isES?"Índice de masa corporal":"Body mass index"}>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        {["metric","imperial"].map(u=>(
          <button key={u} onClick={()=>setUnit(u)} style={{padding:"6px 14px",borderRadius:20,border:"0.5px solid #D4E3FF",background:unit===u?BLUE:"transparent",color:unit===u?"#fff":NAVY,fontSize:12,fontFamily:F,cursor:"pointer"}}>
            {u==="metric"?"Métrico / Metric":"Imperial"}
          </button>
        ))}
      </div>
      <Input label={isES?"Peso":"Weight"} value={weight} onChange={setWeight} unit={unit==="metric"?"kg":"lb"} />
      <Input label={isES?"Talla":"Height"} value={height} onChange={setHeight} unit={unit==="metric"?"cm":"in"} />
      {bmi&&<Result label="IMC / BMI" value={bmi} unit="" color={color} bg={bg} />}
      {bmi&&<Result label={isES?"Categoría":"Category"} value={category} unit="" color={color} bg={bg} />}
    </CalcCard>
  );
}

function TDEECalc({isES}) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("F");
  const [activity, setActivity] = useState("1.2");
  let tdee = null, bmr = null;
  if (weight && height && age) {
    const w=parseFloat(weight), h=parseFloat(height), a=parseInt(age);
    bmr = sex==="F" ? Math.round(655+9.6*w+1.9*h-4.7*a) : Math.round(66+13.8*w+5*h-6.8*a);
    tdee = Math.round(bmr * parseFloat(activity));
  }
  const actOpts = [
    {value:"1.2", label:isES?"Sedentario (poco/nada ejercicio)":"Sedentary (little/no exercise)"},
    {value:"1.375", label:isES?"Ligero (1-3 días/semana)":"Light (1-3 days/week)"},
    {value:"1.55", label:isES?"Moderado (3-5 días/semana)":"Moderate (3-5 days/week)"},
    {value:"1.725", label:isES?"Activo (6-7 días/semana)":"Active (6-7 days/week)"},
    {value:"1.9", label:isES?"Muy activo (atleta)":"Very active (athlete)"},
  ];
  return (
    <CalcCard title={isES?"Calculadora TDEE / GCT":"TDEE Calculator"} desc={isES?"Gasto calórico total diario (Harris-Benedict)":"Total daily energy expenditure (Harris-Benedict)"}>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        {["F","M"].map(s=>(
          <button key={s} onClick={()=>setSex(s)} style={{padding:"6px 14px",borderRadius:20,border:"0.5px solid #D4E3FF",background:sex===s?BLUE:"transparent",color:sex===s?"#fff":NAVY,fontSize:12,fontFamily:F,cursor:"pointer"}}>
            {s==="F"?(isES?"Femenino":"Female"):(isES?"Masculino":"Male")}
          </button>
        ))}
      </div>
      <Input label={isES?"Peso (kg)":"Weight (kg)"} value={weight} onChange={setWeight} unit="kg" />
      <Input label={isES?"Talla (cm)":"Height (cm)"} value={height} onChange={setHeight} unit="cm" />
      <Input label={isES?"Edad (años)":"Age (years)"} value={age} onChange={setAge} unit={isES?"años":"yrs"} />
      <Select label={isES?"Nivel de actividad":"Activity level"} value={activity} onChange={setActivity} options={actOpts} />
      {bmr&&<Result label={isES?"GEB (metabolismo basal)":"BMR (basal metabolic rate)"} value={bmr.toLocaleString()} unit="kcal/día" />}
      {tdee&&<Result label={isES?"TDEE (gasto total)":"TDEE (total expenditure)"} value={tdee.toLocaleString()} unit="kcal/día" color="#0F6E56" bg="#E1F5EE" />}
    </CalcCard>
  );
}

function MacroCalc({isES}) {
  const [calories, setCalories] = useState("");
  const [goal, setGoal] = useState("maintain");
  let prot=null, fat=null, carbs=null;
  if (calories) {
    const kcal = parseInt(calories);
    const ratios = goal==="lose" ? [0.35,0.30,0.35] : goal==="gain" ? [0.25,0.25,0.50] : [0.30,0.30,0.40];
    prot = Math.round(kcal*ratios[0]/4);
    fat = Math.round(kcal*ratios[1]/9);
    carbs = Math.round(kcal*ratios[2]/4);
  }
  const goalOpts = [
    {value:"lose", label:isES?"Bajar peso":"Lose weight"},
    {value:"maintain", label:isES?"Mantener peso":"Maintain weight"},
    {value:"gain", label:isES?"Subir peso / ganar músculo":"Gain weight / muscle"},
  ];
  return (
    <CalcCard title={isES?"Calculadora de macronutrientes":"Macro Calculator"} desc={isES?"Distribución de proteínas, grasas y carbohidratos":"Protein, fat and carbohydrate distribution"}>
      <Input label={isES?"Calorías diarias (kcal)":"Daily calories (kcal)"} value={calories} onChange={setCalories} unit="kcal" />
      <Select label={isES?"Objetivo":"Goal"} value={goal} onChange={setGoal} options={goalOpts} />
      {prot&&(
        <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
          <Result label={isES?"Proteínas":"Protein"} value={prot} unit="g/día" color="#2563EB" bg="#EFF6FF" />
          <Result label={isES?"Grasas":"Fat"} value={fat} unit="g/día" color="#854F0B" bg="#FAEEDA" />
          <Result label={isES?"Carbohidratos":"Carbohydrates"} value={carbs} unit="g/día" color="#0F6E56" bg="#E1F5EE" />
        </div>
      )}
    </CalcCard>
  );
}

function IdealWeightCalc({isES}) {
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState("F");
  let hamwi=null, devine=null, robinson=null;
  if (height) {
    const h = parseFloat(height);
    const inches = h/2.54;
    const over5ft = Math.max(0, inches-60);
    if (sex==="F") {
      hamwi = +(45.5+2.2*over5ft).toFixed(1);
      devine = +(45.5+2.3*over5ft).toFixed(1);
      robinson = +(49+1.7*over5ft).toFixed(1);
    } else {
      hamwi = +(48+2.7*over5ft).toFixed(1);
      devine = +(50+2.3*over5ft).toFixed(1);
      robinson = +(52+1.9*over5ft).toFixed(1);
    }
  }
  return (
    <CalcCard title={isES?"Peso ideal":"Ideal Weight Calculator"} desc={isES?"Fórmulas de Hamwi, Devine y Robinson":"Hamwi, Devine and Robinson formulas"}>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        {["F","M"].map(s=>(
          <button key={s} onClick={()=>setSex(s)} style={{padding:"6px 14px",borderRadius:20,border:"0.5px solid #D4E3FF",background:sex===s?BLUE:"transparent",color:sex===s?"#fff":NAVY,fontSize:12,fontFamily:F,cursor:"pointer"}}>
            {s==="F"?(isES?"Femenino":"Female"):(isES?"Masculino":"Male")}
          </button>
        ))}
      </div>
      <Input label={isES?"Talla (cm)":"Height (cm)"} value={height} onChange={setHeight} unit="cm" />
      {hamwi&&(
        <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
          <Result label="Hamwi" value={hamwi} unit="kg" />
          <Result label="Devine" value={devine} unit="kg" color="#0F6E56" bg="#E1F5EE" />
          <Result label="Robinson" value={robinson} unit="kg" color="#854F0B" bg="#FAEEDA" />
        </div>
      )}
    </CalcCard>
  );
}

function BodyFatCalc({isES}) {
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState("F");
  let bf = null, category = "", color = TEAL, bg = "#E1F5EE";
  if (neck && waist && height && (sex==="M" || hip)) {
    const n=parseFloat(neck), w=parseFloat(waist), h=parseFloat(height);
    if (sex==="M") bf = +(495/(1.0324-0.19077*Math.log10(w-n)+0.15456*Math.log10(h))-450).toFixed(1);
    else { const hp=parseFloat(hip); bf = +(495/(1.29579-0.35004*Math.log10(w+hp-n)+0.22100*Math.log10(h))-450).toFixed(1); }
    if (sex==="F") { if(bf<21)category=isES?"Atleta":"Athlete"; else if(bf<33)category=isES?"Saludable":"Healthy"; else if(bf<39)category=isES?"Sobrepeso":"Overweight"; else category=isES?"Obesidad":"Obese"; }
    else { if(bf<6)category=isES?"Atleta":"Athlete"; else if(bf<25)category=isES?"Saludable":"Healthy"; else if(bf<31)category=isES?"Sobrepeso":"Overweight"; else category=isES?"Obesidad":"Obese"; }
    if(category===(isES?"Saludable":"Healthy")){color="#0F6E56";bg="#E1F5EE";}
    else if(category===(isES?"Atleta":"Athlete")){color="#2563EB";bg="#EFF6FF";}
    else if(category===(isES?"Sobrepeso":"Overweight")){color="#854F0B";bg="#FAEEDA";}
    else{color="#A32D2D";bg="#FCEBEB";}
  }
  return (
    <CalcCard title={isES?"% Grasa corporal (método Navy)":"Body Fat % (Navy method)"} desc={isES?"Estimación con medidas corporales":"Estimation using body measurements"}>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        {["F","M"].map(s=>(
          <button key={s} onClick={()=>setSex(s)} style={{padding:"6px 14px",borderRadius:20,border:"0.5px solid #D4E3FF",background:sex===s?BLUE:"transparent",color:sex===s?"#fff":NAVY,fontSize:12,fontFamily:F,cursor:"pointer"}}>
            {s==="F"?(isES?"Femenino":"Female"):(isES?"Masculino":"Male")}
          </button>
        ))}
      </div>
      <Input label={isES?"Cuello (cm)":"Neck (cm)"} value={neck} onChange={setNeck} unit="cm" />
      <Input label={isES?"Cintura (cm)":"Waist (cm)"} value={waist} onChange={setWaist} unit="cm" />
      {sex==="F"&&<Input label={isES?"Cadera (cm)":"Hip (cm)"} value={hip} onChange={setHip} unit="cm" />}
      <Input label={isES?"Talla (cm)":"Height (cm)"} value={height} onChange={setHeight} unit="cm" />
      {bf&&<Result label={isES?"Grasa corporal":"Body fat"} value={bf} unit="%" color={color} bg={bg} />}
      {bf&&<Result label={isES?"Categoría":"Category"} value={category} unit="" color={color} bg={bg} />}
    </CalcCard>
  );
}

function WaterCalc({isES}) {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("moderate");
  let water = null;
  if (weight) {
    const w = parseFloat(weight);
    const base = w * 35;
    const extra = activity==="low" ? 0 : activity==="moderate" ? 500 : 1000;
    water = +((base+extra)/1000).toFixed(1);
  }
  const actOpts = [
    {value:"low", label:isES?"Sedentario":"Sedentary"},
    {value:"moderate", label:isES?"Moderadamente activo":"Moderately active"},
    {value:"high", label:isES?"Muy activo / atleta":"Very active / athlete"},
  ];
  return (
    <CalcCard title={isES?"Calculadora de agua":"Water Intake Calculator"} desc={isES?"Ingesta diaria recomendada de agua":"Recommended daily water intake"}>
      <Input label={isES?"Peso (kg)":"Weight (kg)"} value={weight} onChange={setWeight} unit="kg" />
      <Select label={isES?"Nivel de actividad":"Activity level"} value={activity} onChange={setActivity} options={actOpts} />
      {water&&<Result label={isES?"Agua recomendada/día":"Recommended water/day"} value={water} unit="L/día" color="#2563EB" bg="#EFF6FF" />}
    </CalcCard>
  );
}

function HeartRateCalc({isES}) {
  const [age, setAge] = useState("");
  let max=null, zones=null;
  if (age) {
    max = 220 - parseInt(age);
    zones = [
      {label:isES?"Zona 1 — Muy ligero (50-60%)":"Zone 1 — Very light (50-60%)", min:Math.round(max*0.5), max:Math.round(max*0.6)},
      {label:isES?"Zona 2 — Ligero (60-70%)":"Zone 2 — Light (60-70%)", min:Math.round(max*0.6), max:Math.round(max*0.7)},
      {label:isES?"Zona 3 — Moderado (70-80%)":"Zone 3 — Moderate (70-80%)", min:Math.round(max*0.7), max:Math.round(max*0.8)},
      {label:isES?"Zona 4 — Duro (80-90%)":"Zone 4 — Hard (80-90%)", min:Math.round(max*0.8), max:Math.round(max*0.9)},
      {label:isES?"Zona 5 — Máximo (90-100%)":"Zone 5 — Maximum (90-100%)", min:Math.round(max*0.9), max:max},
    ];
  }
  return (
    <CalcCard title={isES?"Frecuencia cardíaca objetivo":"Target Heart Rate Calculator"} desc={isES?"Zonas de entrenamiento por edad":"Training zones by age"}>
      <Input label={isES?"Edad (años)":"Age (years)"} value={age} onChange={setAge} unit={isES?"años":"yrs"} />
      {max&&<Result label={isES?"FC máxima estimada":"Estimated max HR"} value={max} unit="bpm" />}
      {zones&&(
        <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:6}}>
          {zones.map((z,i)=>(
            <div key={i} style={{background:"#F5F7FF",borderRadius:8,padding:"8px 12px",display:"flex",justifyContent:"space-between"}}>
              <span style={{fontSize:11,color:NAVY,fontFamily:F}}>{z.label}</span>
              <span style={{fontSize:12,fontWeight:500,color:BLUE,fontFamily:F}}>{z.min}–{z.max} bpm</span>
            </div>
          ))}
        </div>
      )}
    </CalcCard>
  );
}

const TOOLS = [
  {id:"bmi", es:"IMC / BMI", en:"BMI"},
  {id:"tdee", es:"TDEE / GCT", en:"TDEE"},
  {id:"macro", es:"Macronutrientes", en:"Macros"},
  {id:"ideal", es:"Peso ideal", en:"Ideal weight"},
  {id:"bodyfat", es:"% Grasa corporal", en:"Body fat %"},
  {id:"water", es:"Agua", en:"Water intake"},
  {id:"hr", es:"Frecuencia cardíaca", en:"Heart rate"},
];

export default function Tools({lang}) {
  const isES = lang === "ES";
  const [active, setActive] = useState("bmi");
  return (
    <div style={{padding:"40px 32px", maxWidth:960, margin:"0 auto"}}>
      <div style={{fontSize:11,fontWeight:500,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,fontFamily:F}}>{isES?"Herramientas":"Tools"}</div>
      <div style={{fontSize:26,fontWeight:500,color:NAVY,marginBottom:6,fontFamily:F}}>{isES?"Calculadoras de salud y nutrición":"Health and nutrition calculators"}</div>
      <div style={{fontSize:13,color:"#3A5BA0",marginBottom:28,fontFamily:F}}>{isES?"Gratuitas, bilingües, basadas en evidencia.":"Free, bilingual, evidence-based."}</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:28}}>
        {TOOLS.map(t=>(
          <button key={t.id} onClick={()=>setActive(t.id)} style={{padding:"7px 16px",borderRadius:20,border:"0.5px solid #D4E3FF",background:active===t.id?NAVY:"#fff",color:active===t.id?"#E2E8F0":NAVY,fontSize:12,fontWeight:active===t.id?500:400,fontFamily:F,cursor:"pointer"}}>
            {isES?t.es:t.en}
          </button>
        ))}
      </div>
      <div style={{maxWidth:560}}>
        {active==="bmi"&&<BMICalc isES={isES}/>}
        {active==="tdee"&&<TDEECalc isES={isES}/>}
        {active==="macro"&&<MacroCalc isES={isES}/>}
        {active==="ideal"&&<IdealWeightCalc isES={isES}/>}
        {active==="bodyfat"&&<BodyFatCalc isES={isES}/>}
        {active==="water"&&<WaterCalc isES={isES}/>}
        {active==="hr"&&<HeartRateCalc isES={isES}/>}
      </div>

      <div style={{marginTop:48}}>
        <div style={{fontSize:11,fontWeight:500,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,fontFamily:F}}>{isES?"Herramientas clínicas especializadas":"Specialized clinical tools"}</div>
        <div style={{fontSize:22,fontWeight:500,color:NAVY,marginBottom:6,fontFamily:F}}>{isES?"Calculadoras para profesionales de la salud":"Calculators for health professionals"}</div>
        <div style={{fontSize:13,color:"#3A5BA0",marginBottom:24,fontFamily:F}}>{isES?"Disponibles en nutrionally learn — gratuitas, sin registro.":"Available on nutrionally learn — free, no signup."}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
          {[
            {icon:"🔄",es:"Calculadora de intercambios INCAP/USDA",en:"INCAP/USDA Exchange calculator",desc_es:"Plan de alimentación por intercambios con distribución por tiempo de comida.",desc_en:"Meal exchange plan with distribution by meal time.",color:"#2563EB",bg:"#EFF6FF"},
            {icon:"📊",es:"Harris-Benedict y macronutrientes clínicos",en:"Harris-Benedict and clinical macronutrients",desc_es:"GEB, VET, proteínas, lípidos y carbohidratos con correcciones clínicas.",desc_en:"BMR, TEE, protein, fat and carbs with clinical corrections.",color:"#0F6E56",bg:"#E1F5EE"},
            {icon:"💉",es:"Nutrición Parenteral Total (NPT)",en:"Total Parenteral Nutrition (TPN)",desc_es:"Cálculo de dextrosa, aminoácidos y lípidos con osmolaridad estimada.",desc_en:"Dextrose, amino acids and lipids with estimated osmolarity.",color:"#854F0B",bg:"#FAEEDA"},
            {icon:"🥛",es:"Nutrición Enteral (NE)",en:"Enteral Nutrition (EN)",desc_es:"Fórmulas estándar e hipercalóricas con aporte calórico y proteico.",desc_en:"Standard and hypercaloric formulas with caloric and protein supply.",color:"#7C3AED",bg:"#F3E8FF"},
            {icon:"📋",es:"Modo estudio — casos clínicos",en:"Study mode — clinical cases",desc_es:"Guarda y revisa casos con panel educativo de Harris-Benedict.",desc_en:"Save and review cases with Harris-Benedict educational panel.",color:"#1E2D4E",bg:"#F5F7FF"},
            {icon:"🥗",es:"Lista de alimentos INCAP/USDA",en:"INCAP/USDA food list",desc_es:"Base de datos completa con valores por intercambio y gramos.",desc_en:"Complete database with values per exchange and grams.",color:"#3A5BA0",bg:"#EFF6FF"},
          ].map((t,i)=>(
            <a key={i} href="https://learn.nutrionally.com" target="_blank" rel="noopener noreferrer" style={{background:t.bg,border:`0.5px solid ${t.color}22`,borderRadius:12,padding:20,textDecoration:"none",display:"block"}}>
              <div style={{fontSize:24,marginBottom:10}}>{t.icon}</div>
              <div style={{fontSize:13,fontWeight:500,color:t.color,marginBottom:6,fontFamily:F}}>{isES?t.es:t.en}</div>
              <div style={{fontSize:11,color:"#3A5BA0",lineHeight:1.5,fontFamily:F}}>{isES?t.desc_es:t.desc_en}</div>
            </a>
          ))}
        </div>
        <div style={{marginTop:20,textAlign:"center"}}>
          <a href="https://learn.nutrionally.com" target="_blank" rel="noopener noreferrer" style={{display:"inline-block",padding:"12px 28px",borderRadius:8,background:NAVY,color:"#E2E8F0",textDecoration:"none",fontSize:13,fontWeight:500,fontFamily:F}}>
            {isES?"Abrir nutrionally learn →":"Open nutrionally learn →"}
          </a>
        </div>
      </div>
    </div>
  );
}

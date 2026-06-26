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
    <div style={{background:bg,borderRadius:8,padding:"10px 14px",marginTop:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <span style={{fontSize:12,color:NAVY,fontFamily:F}}>{label}</span>
      <span style={{fontSize:15,fontWeight:500,color,fontFamily:F}}>{value} <span style={{fontSize:11}}>{unit}</span></span>
    </div>
  );
}

function Input({label, value, onChange, unit}) {
  return (
    <div style={{marginBottom:10}}>
      <label style={{fontSize:12,color:"#3A5BA0",fontFamily:F,display:"block",marginBottom:4}}>{label}</label>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <input type="number" value={value} onChange={e=>onChange(e.target.value)}
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
  let bmi=null, category="", color=TEAL, bg="#E1F5EE";
  if(weight&&height){
    const w=parseFloat(weight),h=parseFloat(height);
    bmi=unit==="metric"?+(w/((h/100)**2)).toFixed(1):+((w*0.453592)/((h*0.0254)**2)).toFixed(1);
    if(bmi<18.5){category=isES?"Bajo peso":"Underweight";color="#854F0B";bg="#FAEEDA";}
    else if(bmi<25){category=isES?"Normal":"Normal";color="#0F6E56";bg="#E1F5EE";}
    else if(bmi<30){category=isES?"Sobrepeso":"Overweight";color="#854F0B";bg="#FAEEDA";}
    else{category=isES?"Obesidad":"Obesity";color="#A32D2D";bg="#FCEBEB";}
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
      {bmi&&<Result label="IMC / BMI" value={bmi} unit="" color={color} bg={bg}/>}
      {bmi&&<Result label={isES?"Categoría":"Category"} value={category} unit="" color={color} bg={bg}/>}
    </CalcCard>
  );
}

function TDEECalc({isES}) {
  const [weight,setWeight]=useState("");const [height,setHeight]=useState("");const [age,setAge]=useState("");const [sex,setSex]=useState("F");const [activity,setActivity]=useState("1.2");
  let tdee=null,bmr=null;
  if(weight&&height&&age){const w=parseFloat(weight),h=parseFloat(height),a=parseInt(age);bmr=sex==="F"?Math.round(655+9.6*w+1.9*h-4.7*a):Math.round(66+13.8*w+5*h-6.8*a);tdee=Math.round(bmr*parseFloat(activity));}
  const actOpts=[{value:"1.2",label:isES?"Sedentario":"Sedentary"},{value:"1.375",label:isES?"Ligero (1-3 días)":"Light (1-3 days)"},{value:"1.55",label:isES?"Moderado (3-5 días)":"Moderate (3-5 days)"},{value:"1.725",label:isES?"Activo (6-7 días)":"Active (6-7 days)"},{value:"1.9",label:isES?"Muy activo":"Very active"}];
  return (
    <CalcCard title={isES?"Calculadora TDEE / GCT":"TDEE Calculator"} desc="Harris-Benedict">
      <div style={{display:"flex",gap:8,marginBottom:12}}>{["F","M"].map(s=>(<button key={s} onClick={()=>setSex(s)} style={{padding:"6px 14px",borderRadius:20,border:"0.5px solid #D4E3FF",background:sex===s?BLUE:"transparent",color:sex===s?"#fff":NAVY,fontSize:12,fontFamily:F,cursor:"pointer"}}>{s==="F"?(isES?"Femenino":"Female"):(isES?"Masculino":"Male")}</button>))}</div>
      <Input label={isES?"Peso (kg)":"Weight (kg)"} value={weight} onChange={setWeight} unit="kg"/>
      <Input label={isES?"Talla (cm)":"Height (cm)"} value={height} onChange={setHeight} unit="cm"/>
      <Input label={isES?"Edad":"Age"} value={age} onChange={setAge} unit={isES?"años":"yrs"}/>
      <Select label={isES?"Actividad":"Activity"} value={activity} onChange={setActivity} options={actOpts}/>
      {bmr&&<Result label={isES?"GEB (metabolismo basal)":"BMR"} value={bmr.toLocaleString()} unit="kcal/día"/>}
      {tdee&&<Result label={isES?"TDEE (gasto total)":"TDEE"} value={tdee.toLocaleString()} unit="kcal/día" color="#0F6E56" bg="#E1F5EE"/>}
    </CalcCard>
  );
}

function MacroCalc({isES}) {
  const [calories,setCalories]=useState("");const [goal,setGoal]=useState("maintain");
  let prot=null,fat=null,carbs=null;
  if(calories){const kcal=parseInt(calories);const r=goal==="lose"?[0.35,0.30,0.35]:goal==="gain"?[0.25,0.25,0.50]:[0.30,0.30,0.40];prot=Math.round(kcal*r[0]/4);fat=Math.round(kcal*r[1]/9);carbs=Math.round(kcal*r[2]/4);}
  return (
    <CalcCard title={isES?"Calculadora de macronutrientes":"Macro Calculator"} desc={isES?"Distribución de proteínas, grasas y carbohidratos":"Protein, fat and carbohydrate distribution"}>
      <Input label={isES?"Calorías diarias (kcal)":"Daily calories (kcal)"} value={calories} onChange={setCalories} unit="kcal"/>
      <Select label={isES?"Objetivo":"Goal"} value={goal} onChange={setGoal} options={[{value:"lose",label:isES?"Bajar peso":"Lose weight"},{value:"maintain",label:isES?"Mantener peso":"Maintain weight"},{value:"gain",label:isES?"Subir peso":"Gain weight"}]}/>
      {prot&&<><Result label={isES?"Proteínas":"Protein"} value={prot} unit="g/día"/><Result label={isES?"Grasas":"Fat"} value={fat} unit="g/día" color="#854F0B" bg="#FAEEDA"/><Result label={isES?"Carbohidratos":"Carbohydrates"} value={carbs} unit="g/día" color="#0F6E56" bg="#E1F5EE"/></>}
    </CalcCard>
  );
}

function IdealWeightCalc({isES}) {
  const [height,setHeight]=useState("");const [sex,setSex]=useState("F");
  let hamwi=null,devine=null,robinson=null;
  if(height){const h=parseFloat(height);const inches=h/2.54;const over=Math.max(0,inches-60);if(sex==="F"){hamwi=+(45.5+2.2*over).toFixed(1);devine=+(45.5+2.3*over).toFixed(1);robinson=+(49+1.7*over).toFixed(1);}else{hamwi=+(48+2.7*over).toFixed(1);devine=+(50+2.3*over).toFixed(1);robinson=+(52+1.9*over).toFixed(1);}}
  return (
    <CalcCard title={isES?"Peso ideal":"Ideal Weight"} desc={isES?"Fórmulas de Hamwi, Devine y Robinson":"Hamwi, Devine and Robinson formulas"}>
      <div style={{display:"flex",gap:8,marginBottom:12}}>{["F","M"].map(s=>(<button key={s} onClick={()=>setSex(s)} style={{padding:"6px 14px",borderRadius:20,border:"0.5px solid #D4E3FF",background:sex===s?BLUE:"transparent",color:sex===s?"#fff":NAVY,fontSize:12,fontFamily:F,cursor:"pointer"}}>{s==="F"?(isES?"Femenino":"Female"):(isES?"Masculino":"Male")}</button>))}</div>
      <Input label={isES?"Talla (cm)":"Height (cm)"} value={height} onChange={setHeight} unit="cm"/>
      {hamwi&&<><Result label="Hamwi" value={hamwi} unit="kg"/><Result label="Devine" value={devine} unit="kg" color="#0F6E56" bg="#E1F5EE"/><Result label="Robinson" value={robinson} unit="kg" color="#854F0B" bg="#FAEEDA"/></>}
    </CalcCard>
  );
}

function BodyFatCalc({isES}) {
  const [neck,setNeck]=useState("");const [waist,setWaist]=useState("");const [hip,setHip]=useState("");const [height,setHeight]=useState("");const [sex,setSex]=useState("F");
  let bf=null,category="",color=TEAL,bg="#E1F5EE";
  if(neck&&waist&&height&&(sex==="M"||hip)){const n=parseFloat(neck),w=parseFloat(waist),h=parseFloat(height);if(sex==="M")bf=+(495/(1.0324-0.19077*Math.log10(w-n)+0.15456*Math.log10(h))-450).toFixed(1);else{const hp=parseFloat(hip);bf=+(495/(1.29579-0.35004*Math.log10(w+hp-n)+0.22100*Math.log10(h))-450).toFixed(1);}if(sex==="F"){if(bf<21)category=isES?"Atleta":"Athlete";else if(bf<33)category=isES?"Saludable":"Healthy";else if(bf<39)category=isES?"Sobrepeso":"Overweight";else category=isES?"Obesidad":"Obese";}else{if(bf<6)category=isES?"Atleta":"Athlete";else if(bf<25)category=isES?"Saludable":"Healthy";else if(bf<31)category=isES?"Sobrepeso":"Overweight";else category=isES?"Obesidad":"Obese";}if(category===(isES?"Saludable":"Healthy")){color="#0F6E56";bg="#E1F5EE";}else if(category===(isES?"Atleta":"Athlete")){color="#2563EB";bg="#EFF6FF";}else if(category===(isES?"Sobrepeso":"Overweight")){color="#854F0B";bg="#FAEEDA";}else{color="#A32D2D";bg="#FCEBEB";}}
  return (
    <CalcCard title={isES?"% Grasa corporal (Navy)":"Body Fat % (Navy)"} desc={isES?"Estimación con medidas corporales":"Estimation using body measurements"}>
      <div style={{display:"flex",gap:8,marginBottom:12}}>{["F","M"].map(s=>(<button key={s} onClick={()=>setSex(s)} style={{padding:"6px 14px",borderRadius:20,border:"0.5px solid #D4E3FF",background:sex===s?BLUE:"transparent",color:sex===s?"#fff":NAVY,fontSize:12,fontFamily:F,cursor:"pointer"}}>{s==="F"?(isES?"Femenino":"Female"):(isES?"Masculino":"Male")}</button>))}</div>
      <Input label={isES?"Cuello (cm)":"Neck (cm)"} value={neck} onChange={setNeck} unit="cm"/>
      <Input label={isES?"Cintura (cm)":"Waist (cm)"} value={waist} onChange={setWaist} unit="cm"/>
      {sex==="F"&&<Input label={isES?"Cadera (cm)":"Hip (cm)"} value={hip} onChange={setHip} unit="cm"/>}
      <Input label={isES?"Talla (cm)":"Height (cm)"} value={height} onChange={setHeight} unit="cm"/>
      {bf&&<><Result label={isES?"Grasa corporal":"Body fat"} value={bf} unit="%" color={color} bg={bg}/><Result label={isES?"Categoría":"Category"} value={category} unit="" color={color} bg={bg}/></>}
    </CalcCard>
  );
}

function WaterCalc({isES}) {
  const [weight,setWeight]=useState("");const [activity,setActivity]=useState("moderate");
  let water=null;
  if(weight){const w=parseFloat(weight);const extra=activity==="low"?0:activity==="moderate"?500:1000;water=+((w*35+extra)/1000).toFixed(1);}
  return (
    <CalcCard title={isES?"Calculadora de agua":"Water Intake Calculator"} desc={isES?"Ingesta diaria recomendada":"Recommended daily intake"}>
      <Input label={isES?"Peso (kg)":"Weight (kg)"} value={weight} onChange={setWeight} unit="kg"/>
      <Select label={isES?"Actividad":"Activity"} value={activity} onChange={setActivity} options={[{value:"low",label:isES?"Sedentario":"Sedentary"},{value:"moderate",label:isES?"Moderadamente activo":"Moderately active"},{value:"high",label:isES?"Muy activo":"Very active"}]}/>
      {water&&<Result label={isES?"Agua recomendada/día":"Recommended water/day"} value={water} unit="L/día"/>}
    </CalcCard>
  );
}

function HeartRateCalc({isES}) {
  const [age,setAge]=useState("");
  let max=null,zones=null;
  if(age){max=220-parseInt(age);zones=[{l:isES?"Zona 1 — Muy ligero (50-60%)":"Zone 1 — Very light (50-60%)",min:Math.round(max*0.5),max:Math.round(max*0.6)},{l:isES?"Zona 2 — Ligero (60-70%)":"Zone 2 — Light (60-70%)",min:Math.round(max*0.6),max:Math.round(max*0.7)},{l:isES?"Zona 3 — Moderado (70-80%)":"Zone 3 — Moderate (70-80%)",min:Math.round(max*0.7),max:Math.round(max*0.8)},{l:isES?"Zona 4 — Duro (80-90%)":"Zone 4 — Hard (80-90%)",min:Math.round(max*0.8),max:Math.round(max*0.9)},{l:isES?"Zona 5 — Máximo (90-100%)":"Zone 5 — Maximum (90-100%)",min:Math.round(max*0.9),max:max}];}
  return (
    <CalcCard title={isES?"Frecuencia cardíaca objetivo":"Target Heart Rate"} desc={isES?"Zonas de entrenamiento por edad":"Training zones by age"}>
      <Input label={isES?"Edad":"Age"} value={age} onChange={setAge} unit={isES?"años":"yrs"}/>
      {max&&<Result label={isES?"FC máxima estimada":"Estimated max HR"} value={max} unit="bpm"/>}
      {zones&&<div style={{marginTop:8,display:"flex",flexDirection:"column",gap:4}}>{zones.map((z,i)=>(<div key={i} style={{background:"#F5F7FF",borderRadius:8,padding:"8px 12px",display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:NAVY,fontFamily:F}}>{z.l}</span><span style={{fontSize:12,fontWeight:500,color:BLUE,fontFamily:F}}>{z.min}–{z.max} bpm</span></div>))}</div>}
    </CalcCard>
  );
}

function CarbCalc({isES}) {
  const [calories,setCalories]=useState("");const [condition,setCondition]=useState("normal");
  const conditions=[{value:"normal",label:isES?"Persona sana":"Healthy person",pct:50},{value:"dm2",label:isES?"Diabetes tipo 2":"Type 2 diabetes",pct:40},{value:"obesity",label:isES?"Obesidad":"Obesity",pct:40},{value:"athlete",label:isES?"Atleta":"Athlete",pct:60},{value:"keto",label:isES?"Cetogénica":"Ketogenic",pct:10},{value:"renal",label:isES?"Enfermedad renal":"Renal disease",pct:55}];
  const cond=conditions.find(c=>c.value===condition);
  const kcal=parseFloat(calories);
  const carbG=kcal>0?Math.round(kcal*cond.pct/100/4):null;
  const notes={normal:isES?"OMS: 45-65% de calorías de carbohidratos.":"WHO: 45-65% of calories from carbohydrates.",dm2:isES?"DM2: distribuir en 3 comidas + colaciones. Preferir CHO de IG bajo.":"DM2: distribute in 3 meals + snacks. Prefer low GI CHO.",obesity:isES?"Restricción moderada de CHO ayuda al déficit calórico.":"Moderate CHO restriction helps caloric deficit.",athlete:isES?"Atletas pueden necesitar hasta 8-12g/kg/día.":"Athletes may need up to 8-12g/kg/day.",keto:isES?"Cetogénica: menos de 50g/día de CHO netos.":"Ketogenic: less than 50g/day net CHO.",renal:isES?"ERC: CHO como principal fuente energética.":"CKD: CHO as main energy source."};
  return (
    <CalcCard title={isES?"Calculadora de carbohidratos":"Carbohydrate Calculator"} desc={isES?"Recomendación según condición clínica":"Recommendation by clinical condition"}>
      <Input label={isES?"Calorías diarias (kcal)":"Daily calories (kcal)"} value={calories} onChange={setCalories} unit="kcal"/>
      <Select label={isES?"Condición":"Condition"} value={condition} onChange={setCondition} options={conditions.map(c=>({value:c.value,label:c.label}))}/>
      {carbG&&<><Result label={isES?"Carbohidratos":"Carbohydrates"} value={carbG} unit="g/día"/><Result label="%" value={cond.pct} unit="% kcal" color="#0F6E56" bg="#E1F5EE"/><div style={{fontSize:11,color:"#3A5BA0",fontFamily:F,padding:"6px 10px",background:"#F5F7FF",borderRadius:6,marginTop:6}}>{notes[condition]}</div></>}
    </CalcCard>
  );
}

function ProteinCalc({isES}) {
  const [weight,setWeight]=useState("");const [condition,setCondition]=useState("normal");
  const conditions=[{value:"normal",label:isES?"Persona sana (sedentaria)":"Healthy (sedentary)",min:0.8,max:1.0},{value:"active",label:isES?"Activo (ejercicio regular)":"Active (regular exercise)",min:1.2,max:1.6},{value:"athlete",label:isES?"Atleta / musculación":"Athlete / bodybuilding",min:1.6,max:2.2},{value:"obesity",label:isES?"Obesidad":"Obesity",min:1.2,max:1.5},{value:"dm2",label:isES?"Diabetes tipo 2":"Type 2 diabetes",min:1.0,max:1.2},{value:"renal",label:isES?"ERC sin diálisis":"CKD without dialysis",min:0.6,max:0.8},{value:"dialysis",label:isES?"Diálisis":"Dialysis",min:1.2,max:1.5},{value:"surgery",label:isES?"Post-cirugía / trauma":"Post-surgery / trauma",min:1.5,max:2.0},{value:"elderly",label:isES?"Adulto mayor (>65 años)":"Elderly (>65 years)",min:1.0,max:1.2}];
  const cond=conditions.find(c=>c.value===condition);
  const w=parseFloat(weight);
  const protMin=w>0?+(w*cond.min).toFixed(1):null;
  const protMax=w>0?+(w*cond.max).toFixed(1):null;
  return (
    <CalcCard title={isES?"Calculadora de proteínas":"Protein Calculator"} desc={isES?"Requerimiento según condición y actividad":"Requirement by condition and activity"}>
      <Input label={isES?"Peso (kg)":"Weight (kg)"} value={weight} onChange={setWeight} unit="kg"/>
      <Select label={isES?"Condición / perfil":"Condition / profile"} value={condition} onChange={setCondition} options={conditions.map(c=>({value:c.value,label:c.label}))}/>
      {protMin&&<><Result label={isES?"Rango recomendado":"Recommended range"} value={`${protMin}–${protMax}`} unit="g/día"/><Result label="g/kg/día" value={`${cond.min}–${cond.max}`} unit="g/kg/día" color="#0F6E56" bg="#E1F5EE"/><Result label={isES?"Calorías de proteínas":"Calories from protein"} value={`${Math.round(protMin*4)}–${Math.round(protMax*4)}`} unit="kcal" color="#854F0B" bg="#FAEEDA"/></>}
    </CalcCard>
  );
}

function FatCalc({isES}) {
  const [calories,setCalories]=useState("");const [condition,setCondition]=useState("normal");
  const conditions=[{value:"normal",label:isES?"Persona sana":"Healthy person",min:25,max:35},{value:"cardiac",label:isES?"Riesgo cardiovascular":"Cardiovascular risk",min:20,max:30},{value:"obesity",label:isES?"Obesidad":"Obesity",min:20,max:30},{value:"athlete",label:isES?"Atleta":"Athlete",min:20,max:35},{value:"keto",label:isES?"Cetogénica":"Ketogenic",min:65,max:75},{value:"malabs",label:isES?"Malabsorción":"Malabsorption",min:20,max:25}];
  const cond=conditions.find(c=>c.value===condition);
  const kcal=parseFloat(calories);
  const fatMinG=kcal>0?Math.round(kcal*cond.min/100/9):null;
  const fatMaxG=kcal>0?Math.round(kcal*cond.max/100/9):null;
  return (
    <CalcCard title={isES?"Calculadora de grasas":"Fat Intake Calculator"} desc={isES?"Recomendación de lípidos según perfil clínico":"Lipid recommendation by clinical profile"}>
      <Input label={isES?"Calorías diarias (kcal)":"Daily calories (kcal)"} value={calories} onChange={setCalories} unit="kcal"/>
      <Select label={isES?"Condición / perfil":"Condition / profile"} value={condition} onChange={setCondition} options={conditions.map(c=>({value:c.value,label:c.label}))}/>
      {fatMinG&&<><Result label={isES?"Rango de grasas":"Fat range"} value={`${fatMinG}–${fatMaxG}`} unit="g/día"/><Result label="%" value={`${cond.min}–${cond.max}`} unit="% kcal" color="#0F6E56" bg="#E1F5EE"/><Result label={isES?"Calorías de grasas":"Calories from fat"} value={`${Math.round(fatMinG*9)}–${Math.round(fatMaxG*9)}`} unit="kcal" color="#854F0B" bg="#FAEEDA"/></>}
    </CalcCard>
  );
}

function GlycemicCalc({isES}) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const foods = [
    {name:"Arroz blanco / White rice", gi:72, cat:"Cereales / Grains"},
    {name:"Arroz integral / Brown rice", gi:50, cat:"Cereales / Grains"},
    {name:"Arroz jazmín / Jasmine rice", gi:89, cat:"Cereales / Grains"},
    {name:"Pan blanco / White bread", gi:75, cat:"Panes / Breads"},
    {name:"Pan integral / Whole wheat bread", gi:51, cat:"Panes / Breads"},
    {name:"Pan de centeno / Rye bread", gi:41, cat:"Panes / Breads"},
    {name:"Tortilla de maíz / Corn tortilla", gi:52, cat:"Panes / Breads"},
    {name:"Avena / Oats", gi:55, cat:"Cereales / Grains"},
    {name:"Granola", gi:62, cat:"Cereales / Grains"},
    {name:"Cornflakes / Corn flakes", gi:81, cat:"Cereales / Grains"},
    {name:"Quinoa", gi:53, cat:"Cereales / Grains"},
    {name:"Cebada / Barley", gi:28, cat:"Cereales / Grains"},
    {name:"Papa / Potato (hervida)", gi:78, cat:"Tubérculos / Tubers"},
    {name:"Papa / Potato (horneada)", gi:85, cat:"Tubérculos / Tubers"},
    {name:"Papa / Potato (frita)", gi:75, cat:"Tubérculos / Tubers"},
    {name:"Camote / Sweet potato", gi:63, cat:"Tubérculos / Tubers"},
    {name:"Yuca / Cassava", gi:46, cat:"Tubérculos / Tubers"},
    {name:"Plátano verde / Green plantain", gi:40, cat:"Tubérculos / Tubers"},
    {name:"Plátano maduro / Ripe plantain", gi:55, cat:"Tubérculos / Tubers"},
    {name:"Manzana / Apple", gi:36, cat:"Frutas / Fruits"},
    {name:"Plátano / Banana", gi:51, cat:"Frutas / Fruits"},
    {name:"Naranja / Orange", gi:43, cat:"Frutas / Fruits"},
    {name:"Uvas / Grapes", gi:59, cat:"Frutas / Fruits"},
    {name:"Sandía / Watermelon", gi:76, cat:"Frutas / Fruits"},
    {name:"Mango", gi:60, cat:"Frutas / Fruits"},
    {name:"Piña / Pineapple", gi:66, cat:"Frutas / Fruits"},
    {name:"Papaya", gi:59, cat:"Frutas / Fruits"},
    {name:"Fresa / Strawberry", gi:40, cat:"Frutas / Fruits"},
    {name:"Pera / Pear", gi:38, cat:"Frutas / Fruits"},
    {name:"Melón / Cantaloupe", gi:65, cat:"Frutas / Fruits"},
    {name:"Durazno / Peach", gi:42, cat:"Frutas / Fruits"},
    {name:"Zanahoria / Carrot", gi:39, cat:"Verduras / Vegetables"},
    {name:"Maíz / Corn", gi:52, cat:"Verduras / Vegetables"},
    {name:"Chícharo / Green peas", gi:51, cat:"Verduras / Vegetables"},
    {name:"Remolacha / Beet", gi:64, cat:"Verduras / Vegetables"},
    {name:"Lentejas / Lentils", gi:32, cat:"Leguminosas / Legumes"},
    {name:"Frijoles negros / Black beans", gi:30, cat:"Leguminosas / Legumes"},
    {name:"Frijoles rojos / Red beans", gi:29, cat:"Leguminosas / Legumes"},
    {name:"Garbanzos / Chickpeas", gi:28, cat:"Leguminosas / Legumes"},
    {name:"Soya / Soybeans", gi:15, cat:"Leguminosas / Legumes"},
    {name:"Leche entera / Whole milk", gi:31, cat:"Lácteos / Dairy"},
    {name:"Leche descremada / Skim milk", gi:32, cat:"Lácteos / Dairy"},
    {name:"Yogur natural / Plain yogurt", gi:41, cat:"Lácteos / Dairy"},
    {name:"Yogur con fruta / Fruit yogurt", gi:41, cat:"Lácteos / Dairy"},
    {name:"Helado / Ice cream", gi:57, cat:"Lácteos / Dairy"},
    {name:"Espagueti / Spaghetti (al dente)", gi:49, cat:"Pastas / Pasta"},
    {name:"Espagueti / Spaghetti (bien cocido)", gi:58, cat:"Pastas / Pasta"},
    {name:"Macarrones / Macaroni", gi:47, cat:"Pastas / Pasta"},
    {name:"Fideos de arroz / Rice noodles", gi:61, cat:"Pastas / Pasta"},
    {name:"Azúcar / Sugar (sacarosa)", gi:65, cat:"Azúcares / Sugars"},
    {name:"Miel / Honey", gi:61, cat:"Azúcares / Sugars"},
    {name:"Fructosa / Fructose", gi:19, cat:"Azúcares / Sugars"},
    {name:"Glucosa / Glucose", gi:100, cat:"Azúcares / Sugars"},
    {name:"Bebida deportiva / Sports drink", gi:78, cat:"Azúcares / Sugars"},
    {name:"Refresco / Soda", gi:63, cat:"Azúcares / Sugars"},
    {name:"Jugo de naranja / Orange juice", gi:50, cat:"Azúcares / Sugars"},
    {name:"Cacahuate / Peanuts", gi:14, cat:"Nueces / Nuts"},
    {name:"Nuez / Walnuts", gi:15, cat:"Nueces / Nuts"},
    {name:"Almendras / Almonds", gi:0, cat:"Nueces / Nuts"},
    {name:"Chocolate oscuro / Dark chocolate", gi:23, cat:"Otros / Other"},
    {name:"Palomitas / Popcorn", gi:65, cat:"Otros / Other"},
    {name:"Galletas / Crackers", gi:74, cat:"Otros / Other"},
    {name:"Donas / Donuts", gi:76, cat:"Otros / Other"},
    {name:"Bizcocho / Cake", gi:38, cat:"Otros / Other"},
  ];
  const giColor = gi => gi < 55 ? "#0F6E56" : gi < 70 ? "#854F0B" : "#A32D2D";
  const giBg = gi => gi < 55 ? "#E1F5EE" : gi < 70 ? "#FAEEDA" : "#FCEBEB";
  const giLabel = gi => gi < 55 ? (isES?"Bajo":"Low") : gi < 70 ? (isES?"Medio":"Medium") : (isES?"Alto":"High");
  const filtered = query.length > 1 ? foods.filter(f=>f.name.toLowerCase().includes(query.toLowerCase())).slice(0,8) : [];
  return (
    <CalcCard title={isES?"Índice glucémico":"Glycemic Index"} desc={isES?"Base de datos de 60+ alimentos con IG y categoría":"Database of 60+ foods with GI and category"}>
      <input value={query} onChange={e=>{setQuery(e.target.value);setResult(null);}} placeholder={isES?"Buscar alimento... ej: arroz, manzana":"Search food... e.g. rice, apple"} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"0.5px solid #D4E3FF",fontSize:13,fontFamily:F,outline:"none",boxSizing:"border-box",marginBottom:8}}/>
      {filtered.map(f=>(
        <div key={f.name} onClick={()=>{setResult(f);setQuery(f.name);}} style={{padding:"8px 12px",borderBottom:"0.5px solid #F0F4FF",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:12,color:NAVY,fontFamily:F}}>{f.name}</div>
            <div style={{fontSize:10,color:"#3A5BA0",fontFamily:F}}>{f.cat}</div>
          </div>
          <span style={{fontSize:12,fontWeight:500,padding:"2px 8px",borderRadius:10,background:giBg(f.gi),color:giColor(f.gi),fontFamily:F,whiteSpace:"nowrap"}}>IG {f.gi}</span>
        </div>
      ))}
      {result&&query===result.name&&(
        <div style={{marginTop:12,padding:14,background:"#F5F7FF",borderRadius:8}}>
          <div style={{fontSize:11,color:"#3A5BA0",fontFamily:F,marginBottom:8}}>{result.name} — {result.cat}</div>
          <div style={{display:"flex",gap:8}}>
            <div style={{flex:1,background:giBg(result.gi),borderRadius:8,padding:"10px 14px",textAlign:"center"}}>
              <div style={{fontSize:10,color:giColor(result.gi),fontFamily:F,marginBottom:2}}>IG</div>
              <div style={{fontSize:24,fontWeight:500,color:giColor(result.gi),fontFamily:F}}>{result.gi}</div>
            </div>
            <div style={{flex:1,background:"#EFF6FF",borderRadius:8,padding:"10px 14px",textAlign:"center"}}>
              <div style={{fontSize:10,color:BLUE,fontFamily:F,marginBottom:2}}>{isES?"Categoría":"Category"}</div>
              <div style={{fontSize:14,fontWeight:500,color:BLUE,fontFamily:F}}>{giLabel(result.gi)}</div>
            </div>
          </div>
          <div style={{fontSize:10,color:"#3A5BA0",fontFamily:F,marginTop:8,padding:"6px 8px",background:"#fff",borderRadius:6}}>
            {isES?"Bajo: <55 | Medio: 55-69 | Alto: ≥70":"Low: <55 | Medium: 55-69 | High: ≥70"}
          </div>
        </div>
      )}
    </CalcCard>
  );
}

function GlutenCalc({isES}) {
  const [query, setQuery] = useState("");
  const foods = [
    {name:"Trigo / Wheat", status:"gluten", reason:isES?"Contiene gluten — proteínas gliadina y glutenina":"Contains gluten — gliadin and glutenin proteins"},
    {name:"Cebada / Barley", status:"gluten", reason:isES?"Contiene gluten — proteína hordeína":"Contains gluten — hordein protein"},
    {name:"Centeno / Rye", status:"gluten", reason:isES?"Contiene gluten — proteína secalina":"Contains gluten — secalin protein"},
    {name:"Espelta / Spelt", status:"gluten", reason:isES?"Variedad de trigo — contiene gluten":"Wheat variety — contains gluten"},
    {name:"Triticale", status:"gluten", reason:isES?"Híbrido trigo-centeno — contiene gluten":"Wheat-rye hybrid — contains gluten"},
    {name:"Kamut", status:"gluten", reason:isES?"Variedad antigua de trigo — contiene gluten":"Ancient wheat variety — contains gluten"},
    {name:"Pan / Bread", status:"gluten", reason:isES?"Generalmente hecho de trigo":"Generally made from wheat"},
    {name:"Pasta / Pasta", status:"gluten", reason:isES?"Hecha de trigo — buscar versión sin gluten":"Made from wheat — look for gluten-free version"},
    {name:"Harina de trigo / Wheat flour", status:"gluten", reason:isES?"Contiene gluten":"Contains gluten"},
    {name:"Sémola / Semolina", status:"gluten", reason:isES?"Derivado del trigo duro":"Derived from durum wheat"},
    {name:"Cuscús / Couscous", status:"gluten", reason:isES?"Hecho de sémola de trigo":"Made from wheat semolina"},
    {name:"Bulgur", status:"gluten", reason:isES?"Trigo partido — contiene gluten":"Cracked wheat — contains gluten"},
    {name:"Cerveza / Beer", status:"gluten", reason:isES?"Hecha de cebada — contiene gluten (salvo versión sin gluten)":"Made from barley — contains gluten (unless gluten-free version)"},
    {name:"Salsa de soya / Soy sauce", status:"gluten", reason:isES?"La mayoría contiene trigo — buscar tamari":"Most contain wheat — look for tamari"},
    {name:"Avena / Oats", status:"caution", reason:isES?"Sin gluten naturalmente pero frecuente contaminación cruzada — buscar certificada sin gluten":"Naturally gluten-free but frequent cross-contamination — look for certified gluten-free"},
    {name:"Arroz / Rice", status:"safe", reason:isES?"Sin gluten — seguro para celiaquía":"Gluten-free — safe for celiac disease"},
    {name:"Maíz / Corn", status:"safe", reason:isES?"Sin gluten naturalmente":"Naturally gluten-free"},
    {name:"Quinoa", status:"safe", reason:isES?"Sin gluten — pseudocereal seguro":"Gluten-free — safe pseudocereal"},
    {name:"Papa / Potato", status:"safe", reason:isES?"Sin gluten":"Gluten-free"},
    {name:"Camote / Sweet potato", status:"safe", reason:isES?"Sin gluten":"Gluten-free"},
    {name:"Yuca / Cassava", status:"safe", reason:isES?"Sin gluten — fuente de tapioca":"Gluten-free — source of tapioca"},
    {name:"Amaranto / Amaranth", status:"safe", reason:isES?"Sin gluten — alto en proteína":"Gluten-free — high in protein"},
    {name:"Trigo sarraceno / Buckwheat", status:"safe", reason:isES?"Sin gluten a pesar del nombre — no es trigo":"Gluten-free despite the name — not wheat"},
    {name:"Mijo / Millet", status:"safe", reason:isES?"Sin gluten naturalmente":"Naturally gluten-free"},
    {name:"Sorgo / Sorghum", status:"safe", reason:isES?"Sin gluten":"Gluten-free"},
    {name:"Harina de almendra / Almond flour", status:"safe", reason:isES?"Sin gluten":"Gluten-free"},
    {name:"Harina de coco / Coconut flour", status:"safe", reason:isES?"Sin gluten":"Gluten-free"},
    {name:"Harina de arroz / Rice flour", status:"safe", reason:isES?"Sin gluten":"Gluten-free"},
    {name:"Tapioca", status:"safe", reason:isES?"Sin gluten — derivado de yuca":"Gluten-free — derived from cassava"},
    {name:"Leche / Milk", status:"safe", reason:isES?"Sin gluten naturalmente":"Naturally gluten-free"},
    {name:"Huevo / Egg", status:"safe", reason:isES?"Sin gluten":"Gluten-free"},
    {name:"Carne / Meat", status:"safe", reason:isES?"Sin gluten — verificar marinados y embutidos":"Gluten-free — check marinades and cold cuts"},
    {name:"Pescado / Fish", status:"safe", reason:isES?"Sin gluten natural — verificar empanados":"Naturally gluten-free — check breading"},
    {name:"Leguminosas / Legumes", status:"safe", reason:isES?"Sin gluten — verificar contaminación cruzada en empaque":"Gluten-free — check cross-contamination on packaging"},
    {name:"Frutas / Fruits", status:"safe", reason:isES?"Sin gluten naturalmente":"Naturally gluten-free"},
    {name:"Verduras / Vegetables", status:"safe", reason:isES?"Sin gluten naturalmente":"Naturally gluten-free"},
    {name:"Aceite / Oil", status:"safe", reason:isES?"Sin gluten":"Gluten-free"},
    {name:"Vinagre de manzana / Apple cider vinegar", status:"safe", reason:isES?"Sin gluten":"Gluten-free"},
    {name:"Vinagre de malta / Malt vinegar", status:"gluten", reason:isES?"Derivado de la cebada — contiene gluten":"Derived from barley — contains gluten"},
    {name:"Salsa Worcestershire", status:"caution", reason:isES?"Algunas marcas contienen extracto de malta de cebada — verificar etiqueta":"Some brands contain barley malt extract — check label"},
    {name:"Chocolate oscuro / Dark chocolate", status:"caution", reason:isES?"El cacao es sin gluten pero verificar contaminación cruzada y aditivos":"Cocoa is gluten-free but check cross-contamination and additives"},
    {name:"Almidón de maíz / Corn starch", status:"safe", reason:isES?"Sin gluten":"Gluten-free"},
    {name:"Almidón de trigo / Wheat starch", status:"caution", reason:isES?"Depende del proceso — algunos son aptos para celiaquía si < 20 ppm":"Depends on process — some are celiac-safe if < 20 ppm"},
  ];
  const filtered = query.length > 1 ? foods.filter(f=>f.name.toLowerCase().includes(query.toLowerCase())).slice(0,8) : [];
  const statusColor = s => s==="gluten"?"#A32D2D":s==="caution"?"#854F0B":"#0F6E56";
  const statusBg = s => s==="gluten"?"#FCEBEB":s==="caution"?"#FAEEDA":"#E1F5EE";
  const statusLabel = s => s==="gluten"?(isES?"❌ Contiene gluten":"❌ Contains gluten"):s==="caution"?(isES?"⚠️ Verificar / Precaución":"⚠️ Check / Caution"):(isES?"✓ Sin gluten":"✓ Gluten-free");
  return (
    <CalcCard title={isES?"Verificador de gluten":"Gluten checker"} desc={isES?"Busca cualquier alimento o ingrediente":"Search any food or ingredient"}>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        {["gluten","caution","safe"].map(s=>(
          <div key={s} style={{padding:"4px 10px",borderRadius:20,background:statusBg(s),color:statusColor(s),fontSize:10,fontWeight:500,fontFamily:F}}>{statusLabel(s)}</div>
        ))}
      </div>
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={isES?"Buscar alimento... ej: avena, arroz, pan":"Search food... e.g. oats, rice, bread"} style={{width:"100%",padding:"9px 12px",borderRadius:8,border:"0.5px solid #D4E3FF",fontSize:13,fontFamily:F,outline:"none",boxSizing:"border-box",marginBottom:8}}/>
      {filtered.map(f=>(
        <div key={f.name} style={{padding:"10px 12px",borderBottom:"0.5px solid #F0F4FF",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
          <div>
            <div style={{fontSize:12,color:NAVY,fontFamily:F,marginBottom:2}}>{f.name}</div>
            <div style={{fontSize:11,color:"#3A5BA0",fontFamily:F}}>{f.reason}</div>
          </div>
          <span style={{fontSize:11,fontWeight:500,padding:"3px 10px",borderRadius:10,background:statusBg(f.status),color:statusColor(f.status),fontFamily:F,whiteSpace:"nowrap",flexShrink:0}}>{statusLabel(f.status)}</span>
        </div>
      ))}
      {query.length > 1 && filtered.length === 0 && (
        <div style={{padding:"12px",textAlign:"center",color:"#3A5BA0",fontSize:12,fontFamily:F}}>{isES?"No encontrado — consulta con tu nutricionista":"Not found — consult your nutritionist"}</div>
      )}
    </CalcCard>
  );
}

const GROUPS = [
  {id:"body", es:"Composición corporal", en:"Body composition", tools:[
    {id:"bmi", es:"IMC / BMI", en:"BMI"},
    {id:"bodyfat", es:"% Grasa corporal", en:"Body fat %"},
    {id:"ideal", es:"Peso ideal", en:"Ideal weight"},
  ]},
  {id:"energy1", es:"Energía", en:"Energy", tools:[
    {id:"tdee", es:"TDEE / GCT", en:"TDEE"},
    {id:"macro", es:"Macronutrientes", en:"Macros"},
  ]},
  {id:"energy2", es:"Macros individuales", en:"Individual macros", tools:[
    {id:"carb", es:"Carbohidratos", en:"Carbohydrates"},
    {id:"protein", es:"Proteínas", en:"Protein"},
    {id:"fat", es:"Grasas", en:"Fat intake"},
  ]},
  {id:"nutrition", es:"Nutrición", en:"Nutrition", tools:[
    {id:"glycemic", es:"Índice glucémico", en:"Glycemic index"},
    {id:"gluten", es:"Verificador de gluten", en:"Gluten checker"},
  ]},
  {id:"other", es:"Otros", en:"Other", tools:[
    {id:"water", es:"Agua", en:"Water intake"},
    {id:"hr", es:"Frecuencia cardíaca", en:"Heart rate"},
  ]},
];

export default function Tools({lang}) {
  const isES = lang === "ES";
  const [active, setActive] = useState("bmi");
  useState(()=>{
    const hash = window.location.hash.replace("#","");
    const allTools = ["bmi","bodyfat","ideal","tdee","macro","carb","protein","fat","water","hr","glycemic","gluten"];
    if(allTools.includes(hash)) setActive(hash);
  });
  return (
    <div style={{padding:"40px 32px", maxWidth:960, margin:"0 auto"}}>
      <div style={{fontSize:11,fontWeight:500,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,fontFamily:F}}>{isES?"Herramientas":"Tools"}</div>
      <div style={{fontSize:26,fontWeight:500,color:NAVY,marginBottom:6,fontFamily:F}}>{isES?"Calculadoras de salud y nutrición":"Health and nutrition calculators"}</div>
      <div style={{fontSize:13,color:"#3A5BA0",marginBottom:28,fontFamily:F}}>{isES?"Gratuitas, bilingües, basadas en evidencia.":"Free, bilingual, evidence-based."}</div>
      <div style={{display:"flex",gap:32,marginBottom:28,flexWrap:"wrap"}}>
        {GROUPS.map(g=>(
          <div key={g.id} style={{minWidth:140}}>
            <div style={{fontSize:10,fontWeight:600,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8,fontFamily:F,textAlign:"center"}}>{isES?g.es:g.en}</div>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              {g.tools.map(t=>(
                <button key={t.id} onClick={()=>setActive(t.id)} style={{padding:"6px 14px",borderRadius:20,border:"0.5px solid #D4E3FF",background:active===t.id?NAVY:"#fff",color:active===t.id?"#E2E8F0":NAVY,fontSize:12,fontWeight:active===t.id?500:400,fontFamily:F,cursor:"pointer",whiteSpace:"nowrap",textAlign:"center",width:"100%"}}>
                  {isES?t.es:t.en}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{maxWidth:720}}>
        {active==="bmi"&&<BMICalc isES={isES}/>}
        {active==="tdee"&&<TDEECalc isES={isES}/>}
        {active==="macro"&&<MacroCalc isES={isES}/>}
        {active==="ideal"&&<IdealWeightCalc isES={isES}/>}
        {active==="bodyfat"&&<BodyFatCalc isES={isES}/>}
        {active==="water"&&<WaterCalc isES={isES}/>}
        {active==="hr"&&<HeartRateCalc isES={isES}/>}
        {active==="glycemic"&&<GlycemicCalc isES={isES}/>}
        {active==="gluten"&&<GlutenCalc isES={isES}/>}
        {active==="carb"&&<CarbCalc isES={isES}/>}
        {active==="protein"&&<ProteinCalc isES={isES}/>}
        {active==="fat"&&<FatCalc isES={isES}/>}
      </div>

      <div style={{marginTop:48}}>
        <div style={{fontSize:11,fontWeight:500,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,fontFamily:F}}>{isES?"Herramientas clínicas especializadas":"Specialized clinical tools"}</div>
        <div style={{fontSize:22,fontWeight:500,color:NAVY,marginBottom:6,fontFamily:F}}>{isES?"Calculadoras para profesionales de la salud":"Calculators for health professionals"}</div>
        <div style={{fontSize:13,color:"#3A5BA0",marginBottom:24,fontFamily:F}}>{isES?"Disponibles en nutrionally learn — gratuitas, sin registro.":"Available on nutrionally learn — free, no signup."}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
          {[
            {icon:"🔄",es:"Calculadora de intercambios INCAP/USDA",en:"INCAP/USDA Exchange calculator",desc_es:"Plan de alimentación por intercambios con distribución por tiempo de comida.",desc_en:"Meal exchange plan with distribution by meal time.",color:"#2563EB",bg:"#EFF6FF",url:"https://learn.nutrionally.com/#s1"},
            {icon:"📊",es:"Harris-Benedict y macronutrientes clínicos",en:"Harris-Benedict and clinical macronutrients",desc_es:"GEB, VET, proteínas, lípidos y carbohidratos con correcciones clínicas.",desc_en:"BMR, TEE, protein, fat and carbs with clinical corrections.",color:"#0F6E56",bg:"#E1F5EE",url:"https://learn.nutrionally.com/#s2"},
            {icon:"💉",es:"Nutrición Parenteral Total (NPT)",en:"Total Parenteral Nutrition (TPN)",desc_es:"Cálculo de dextrosa, aminoácidos y lípidos con osmolaridad estimada.",desc_en:"Dextrose, amino acids and lipids with estimated osmolarity.",color:"#854F0B",bg:"#FAEEDA",url:"https://learn.nutrionally.com/#s5"},
            {icon:"🥛",es:"Nutrición Enteral (NE)",en:"Enteral Nutrition (EN)",desc_es:"Fórmulas estándar e hipercalóricas con aporte calórico y proteico.",desc_en:"Standard and hypercaloric formulas with caloric and protein supply.",color:"#7C3AED",bg:"#F3E8FF",url:"https://learn.nutrionally.com/#s5"},
            {icon:"📋",es:"Modo estudio — casos clínicos",en:"Study mode — clinical cases",desc_es:"Guarda y revisa casos con panel educativo de Harris-Benedict.",desc_en:"Save and review cases with Harris-Benedict educational panel.",color:"#1E2D4E",bg:"#F5F7FF",url:"https://learn.nutrionally.com/#s2"},
            {icon:"🥗",es:"Lista de alimentos INCAP/USDA",en:"INCAP/USDA food list",desc_es:"Base de datos completa con valores por intercambio y gramos.",desc_en:"Complete database with values per exchange and grams.",color:"#3A5BA0",bg:"#EFF6FF",url:"https://learn.nutrionally.com/#s4"},
          ].map((t,i)=>(
            <a key={i} href={t.url} target="_blank" rel="noopener noreferrer" style={{background:t.bg,border:`0.5px solid ${t.color}22`,borderRadius:12,padding:20,textDecoration:"none",display:"block"}}>
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

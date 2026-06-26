import { useState } from "react";
const F = "Plus Jakarta Sans, sans-serif";
const TEAL = "#2A9D8F";
const NAVY = "#1E2D4E";
const BLUE = "#2563EB";

const POSTS = [
  {
    id: "tiroides-nutricion",
    date: "2026-06-26",
    readTime: 8,
    tag_es: "Condiciones clínicas",
    tag_en: "Clinical conditions",
    title_es: "Tiroides y alimentación: qué comer y qué evitar según tu condición",
    title_en: "Thyroid and diet: what to eat and avoid based on your condition",
    intro_es: "La tiroides regula el metabolismo, la temperatura corporal y la energía. Lo que comes puede apoyar o interferir con su función. Esta guía explica los nutrientes clave, los alimentos bociógenos y cómo adaptar la dieta según si tienes hipotiroidismo o hipertiroidismo.",
    intro_en: "The thyroid regulates metabolism, body temperature and energy. What you eat can support or interfere with its function. This guide explains key nutrients, goitrogenic foods and how to adapt your diet based on whether you have hypothyroidism or hyperthyroidism.",
    content_es: [
      {type:"h2", text:"¿Por qué la nutrición importa en la tiroides?"},
      {type:"p", text:"La glándula tiroides produce T3 (triyodotironina) y T4 (tiroxina), hormonas que regulan prácticamente todos los procesos metabólicos del cuerpo. La síntesis de estas hormonas depende directamente de nutrientes específicos — principalmente yodo, selenio y zinc. Una deficiencia de cualquiera de estos puede deteriorar la función tiroidea."},
      {type:"h2", text:"Nutrientes esenciales para la tiroides"},
      {type:"table", headers:["Nutriente","Función","Meta/día","Fuentes principales"], rows:[["Yodo","Componente de T3 y T4 — sin yodo no hay hormonas","150 mcg","Sal yodada, mariscos, lácteos"],["Selenio","Convierte T4 inactiva a T3 activa","55-200 mcg","Nuez de Brasil (1-2/día), atún, huevo"],["Zinc","Síntesis hormonal y conversión T4→T3","8-11 mg","Carnes, mariscos, semillas de calabaza"],["Hierro","La TPO requiere hierro para sintetizar hormonas","8-18 mg","Carnes rojas, leguminosas + vitamina C"],["Vitamina D","Regula función inmune — clave en Hashimoto y Graves","1000-2000 UI","Sol, salmón, suplemento"],["Magnesio","Cofactor en síntesis de T4","310-420 mg","Nueces, semillas, chocolate oscuro"]]},
      {type:"h2", text:"Hipotiroidismo: qué comer y qué evitar"},
      {type:"p", text:"El hipotiroidismo reduce el metabolismo basal hasta 40%. La dieta busca optimizar el peso, mejorar la energía y apoyar la conversión de T4 a T3. Un punto crítico: la levotiroxina (LT4) debe tomarse en ayunas — varios alimentos interfieren con su absorción."},
      {type:"table", headers:["Alimento","Efecto en levotiroxina","Recomendación"], rows:[["Café","Reduce absorción hasta 30%","Esperar 30-60 min después del medicamento"],["Calcio y hierro","Quelación — reduce absorción","Separar 4 horas del medicamento"],["Fibra de salvado","Reduce absorción","Separar 4 horas"],["Soya","Puede reducir absorción","Separar 4 horas"],["Toronja","Puede aumentar absorción","Consultar médico"]]},
      {type:"h2", text:"Alimentos bociógenos: ¿debo evitarlos?"},
      {type:"p", text:"Los bociógenos son compuestos que interfieren con la captación de yodo o la síntesis hormonal. En personas con función tiroidea normal, NO son un problema. En hipotiroidismo, se recomienda cocinarlos bien — el calor destruye el 30-50% de los bociógenos."},
      {type:"list", items:["Crucíferas (brócoli, col, coliflor, kale): cocinar bien — no eliminar, son nutritivas","Soya: moderar y separar 4h de levotiroxina","Mijo: limitar como cereal principal","Espinaca: mejor cocida que cruda en hipotiroidismo"]},
      {type:"h2", text:"Hipertiroidismo: ajustes nutricionales"},
      {type:"p", text:"El hipertiroidismo acelera el metabolismo hasta 50%, causando pérdida de peso y catabolismo muscular. La dieta debe compensar el hipermetabolismo y proteger los huesos."},
      {type:"list", items:["Aumentar calorías: +500 a 1000 kcal/día sobre el requerimiento normal","Proteínas: 1.5-2.0 g/kg/día para prevenir pérdida muscular","Calcio: 1200-1500 mg/día — el hipertiroidismo desmineraliza huesos","RESTRINGIR yodo: evitar sal yodada, mariscos, lácteos en exceso","Evitar suplementos con yodo o kelp — estimulan producción hormonal"]},
      {type:"h2", text:"Superalimentos para la tiroides"},
      {type:"list", items:["Nuez de Brasil (1-2/día): la fuente más concentrada de selenio — 1 nuez aporta ~70-90 mcg","Huevo completo: yodo + selenio + vitamina D en un solo alimento","Salmón: omega-3 + vitamina D + selenio — triple beneficio","Sal yodada: la forma más simple de asegurar yodo (en hipotiroidismo, no en hipertiroidismo)"]},
      {type:"cta", text:"Ver guía completa de tiroides", url:"/conditions"},
      {type:"refs", items:["Zimmermann MB, Boelaert K. Iodine deficiency and thyroid disorders. Lancet Diabetes Endocrinol. 2015.","Liontiris MI, Mazokopakis EE. A concise review of Hashimoto thyroiditis. Hell J Nucl Med. 2017.","Duntas LH. Selenium and the thyroid gland. Hormones. 2010."]},
    ],
    content_en: [
      {type:"h2", text:"Why does nutrition matter for the thyroid?"},
      {type:"p", text:"The thyroid gland produces T3 and T4, hormones that regulate virtually all metabolic processes in the body. The synthesis of these hormones depends directly on specific nutrients — mainly iodine, selenium and zinc."},
      {type:"h2", text:"Essential nutrients for the thyroid"},
      {type:"table", headers:["Nutrient","Function","Goal/day","Main sources"], rows:[["Iodine","Component of T3 and T4","150 mcg","Iodized salt, seafood, dairy"],["Selenium","Converts inactive T4 to active T3","55-200 mcg","Brazil nut (1-2/day), tuna, egg"],["Zinc","Hormonal synthesis and T4→T3 conversion","8-11 mg","Meats, shellfish, pumpkin seeds"],["Iron","TPO requires iron for hormone synthesis","8-18 mg","Red meats, legumes + vitamin C"],["Vitamin D","Regulates immune function — key in Hashimoto and Graves","1000-2000 IU","Sun, salmon, supplement"]]},
      {type:"h2", text:"Goitrogenic foods: should I avoid them?"},
      {type:"p", text:"Goitrogens are compounds that interfere with iodine uptake or hormone synthesis. In people with normal thyroid function, they are NOT a problem. In hypothyroidism, cooking them well is recommended — heat destroys 30-50% of goitrogens."},
      {type:"list", items:["Cruciferous vegetables (broccoli, cabbage, cauliflower): cook well — don't eliminate, they are nutritious","Soy: moderate and separate 4h from levothyroxine","Millet: limit as main cereal","Spinach: better cooked than raw in hypothyroidism"]},
      {type:"cta", text:"See full thyroid guide", url:"/conditions"},
      {type:"refs", items:["Zimmermann MB, Boelaert K. Iodine deficiency and thyroid disorders. Lancet Diabetes Endocrinol. 2015.","Duntas LH. Selenium and the thyroid gland. Hormones. 2010."]},
    ],
  },
  {
    id: "gota-dieta-purinas",
    date: "2026-06-26",
    readTime: 7,
    tag_es: "Condiciones clínicas",
    tag_en: "Clinical conditions",
    title_es: "Gota y dieta: tabla de purinas, alimentos prohibidos y qué sí puedes comer",
    title_en: "Gout and diet: purine table, forbidden foods and what you can eat",
    intro_es: "La gota es la artritis inflamatoria más común en adultos. Aunque el 80% del ácido úrico es de producción endógena, la dieta es un factor modificable clave. Esta guía te muestra exactamente qué comer y qué evitar para reducir el ácido úrico y prevenir crisis.",
    intro_en: "Gout is the most common inflammatory arthritis in adults. Although 80% of uric acid is endogenously produced, diet is a key modifiable factor. This guide shows you exactly what to eat and avoid to reduce uric acid and prevent attacks.",
    content_es: [
      {type:"h2", text:"¿Qué es la gota y por qué ocurre?"},
      {type:"p", text:"La gota resulta de la acumulación de cristales de urato monosódico en las articulaciones, causando episodios de dolor intenso, enrojecimiento e inflamación — especialmente en el dedo gordo del pie, rodilla y tobillo. Ocurre cuando el ácido úrico sérico supera los 6.8 mg/dL."},
      {type:"table", headers:["Parámetro","Meta","Comentario"], rows:[["Ácido úrico sérico (sin tofos)","< 6.0 mg/dL","Meta estándar de tratamiento"],["Ácido úrico sérico (con tofos)","< 5.0 mg/dL","Meta más estricta"],["Hidratación diaria","≥ 2-3 L/día","Diluye y facilita excreción renal"],["Peso corporal","IMC < 25","Bajar peso gradualmente — máx 0.5 kg/semana"]]},
      {type:"h2", text:"Tabla de purinas en alimentos"},
      {type:"p", text:"Las purinas se metabolizan en ácido úrico. Conocer el contenido de purinas de los alimentos es fundamental para el manejo dietético de la gota."},
      {type:"table", headers:["Alimento","Purinas (mg/100g)","Nivel"], rows:[["Anchoas / Anchovies","411","🔴 Muy alto — evitar"],["Hígado / Liver","360","🔴 Muy alto — evitar"],["Sardinas / Sardines","345","🔴 Muy alto — evitar"],["Macarela / Mackerel","246","🔴 Alto — limitar mucho"],["Camarón / Shrimp","137","🟡 Moderado — ocasional"],["Carne de res / Beef","133","🟡 Moderado — 1-2x/semana"],["Pollo / Chicken","115","🟡 Moderado — porciones pequeñas"],["Espárragos / Asparagus","23","🟢 Bajo — seguro"],["Frijoles / Beans","45","🟢 Bajo — aceptable"],["Leche / Milk","0","🟢 Sin purinas — recomendado"],["Huevo / Egg","3","🟢 Sin purinas — recomendado"],["Arroz / Rice","18","🟢 Sin purinas — seguro"],["Pan / Bread","14","🟢 Sin purinas — seguro"]]},
      {type:"h2", text:"Alimentos que REDUCEN el ácido úrico"},
      {type:"list", items:["Cerezas: reducen ácido úrico y frecuencia de ataques hasta 35% — 10-12 cerezas/día o 240mL de jugo","Lácteos bajos en grasa: leche descremada y yogur sin grasa reducen ácido úrico — 2 porciones/día","Café: 3-4 tazas/día asociadas con menor riesgo de gota — inhibe xantina oxidasa","Vitamina C: 500-1500 mg/día reduce ácido úrico ~0.5 mg/dL","Agua: 2-3L/día favorece excreción renal de ácido úrico"]},
      {type:"h2", text:"Alimentos que ELEVAN el ácido úrico — evitar"},
      {type:"list", items:["Vísceras: hígado, riñón, corazón — muy alto contenido de purinas","Mariscos grasos: anchoas, sardinas, macarela, mejillones — limitar fuertemente","Alcohol (especialmente cerveza): la cerveza contiene guanosina + reduce excreción renal","Fructosa: refrescos, jugos de fruta, HFCS — aumentan síntesis endógena de purinas","Carnes rojas en exceso: limitar a 1-2 porciones/semana"]},
      {type:"h2", text:"Desencadenantes de crisis de gota"},
      {type:"list", items:["Deshidratación: concentra el ácido úrico en sangre — beber ≥2L agua/día","Ayuno prolongado: aumenta producción de ácido úrico — no saltarse comidas","Pérdida de peso rápida: libera purinas del tejido — bajar máximo 0.5kg/semana","Alcohol: evitar completamente durante una crisis activa","Trauma articular: proteger articulaciones durante actividad física"]},
      {type:"h2", text:"Plan de alimentación bajo en purinas (ejemplo)"},
      {type:"table", headers:["Comida","Alimentos","kcal"], rows:[["Desayuno","Leche descremada 250mL + avena 50g + fresas 100g","320"],["Colación","10-12 cerezas frescas + agua","80"],["Almuerzo","Pollo 100g + arroz 60g + ensalada de verduras + agua con limón","450"],["Colación","Yogur descremado 150g + 1 naranja","180"],["Cena","2 huevos + verduras salteadas + pan integral 2 rebanadas","380"],["Hidratación","≥ 2.5L agua durante el día","—"],["Total","","1410 kcal"]]},
      {type:"cta", text:"Ver guía completa de gota", url:"/conditions"},
      {type:"refs", items:["Choi HK, et al. Purine-rich foods, dairy and protein intake, and the risk of gout in men. N Engl J Med. 2004.","Zhang Y, et al. Cherry consumption and decreased risk of recurrent gout attacks. Arthritis Rheum. 2012.","Dalbeth N, et al. Gout. Lancet. 2016."]},
    ],
    content_en: [
      {type:"h2", text:"What is gout and why does it occur?"},
      {type:"p", text:"Gout results from the accumulation of monosodium urate crystals in joints, causing episodes of intense pain, redness and inflammation — especially in the big toe, knee and ankle. It occurs when serum uric acid exceeds 6.8 mg/dL."},
      {type:"h2", text:"Purine table in foods"},
      {type:"table", headers:["Food","Purines (mg/100g)","Level"], rows:[["Anchovies","411","🔴 Very high — avoid"],["Liver","360","🔴 Very high — avoid"],["Sardines","345","🔴 Very high — avoid"],["Mackerel","246","🔴 High — limit strongly"],["Shrimp","137","🟡 Moderate — occasional"],["Beef","133","🟡 Moderate — 1-2x/week"],["Chicken","115","🟡 Moderate — small portions"],["Asparagus","23","🟢 Low — safe"],["Beans","45","🟢 Low — acceptable"],["Milk","0","🟢 No purines — recommended"],["Egg","3","🟢 No purines — recommended"]]},
      {type:"h2", text:"Foods that REDUCE uric acid"},
      {type:"list", items:["Cherries: reduce uric acid and attack frequency up to 35% — 10-12 cherries/day","Low-fat dairy: skim milk and fat-free yogurt reduce uric acid — 2 servings/day","Coffee: 3-4 cups/day associated with lower gout risk","Vitamin C: 500-1500 mg/day reduces uric acid ~0.5 mg/dL","Water: 2-3L/day promotes renal excretion of uric acid"]},
      {type:"h2", text:"Foods that RAISE uric acid — avoid"},
      {type:"list", items:["Organ meats: liver, kidney, heart — very high purine content","Fatty seafood: anchovies, sardines, mackerel, mussels — limit strongly","Alcohol (especially beer): contains guanosine + reduces renal excretion","Fructose: sodas, fruit juices, HFCS — increase endogenous purine synthesis"]},
      {type:"cta", text:"See full gout guide", url:"/conditions"},
      {type:"refs", items:["Choi HK, et al. Purine-rich foods, dairy and protein intake, and the risk of gout in men. N Engl J Med. 2004.","Zhang Y, et al. Cherry consumption and decreased risk of recurrent gout attacks. Arthritis Rheum. 2012."]},
    ],
  },
  {
    id: "nutricion-embarazo",
    date: "2026-06-26",
    readTime: 9,
    tag_es: "Nutrición",
    tag_en: "Nutrition",
    title_es: "Nutrición en el embarazo: qué comer, qué evitar y suplementos clave",
    title_en: "Nutrition in pregnancy: what to eat, what to avoid and key supplements",
    intro_es: "La nutrición durante el embarazo es una de las intervenciones más importantes para la salud del bebé y la madre. Lo que comes en estos 9 meses impacta directamente el desarrollo fetal, el peso al nacer y la salud a largo plazo del niño.",
    intro_en: "Nutrition during pregnancy is one of the most important interventions for the health of baby and mother. What you eat in these 9 months directly impacts fetal development, birth weight and the child's long-term health.",
    content_es: [
      {type:"h2", text:"¿Cuántas calorías adicionales necesito?"},
      {type:"p", text:"Contrario al mito popular, el embarazo NO requiere 'comer por dos'. Las necesidades calóricas adicionales son modestas y varían por trimestre:"},
      {type:"table", headers:["Trimestre","Calorías adicionales/día","Equivalente práctico"], rows:[["1er trimestre","+ 0 kcal","Sin cambio — calidad sobre cantidad"],["2do trimestre","+ 340 kcal","~1 taza de avena + 1 huevo + fruta"],["3er trimestre","+ 450 kcal","~yogur griego + nueces + plátano"]]},
      {type:"h2", text:"Nutrientes críticos en el embarazo"},
      {type:"table", headers:["Nutriente","Meta/día","Por qué es crítico","Fuentes"], rows:[["Ácido fólico","400-800 mcg","Previene defectos del tubo neural — iniciar 3 meses ANTES","Espinaca, frijoles, lentejas, suplemento"],["Hierro","27 mg","Hemoglobina fetal, expansión del volumen sanguíneo materno","Carnes rojas, leguminosas + vitamina C"],["Calcio","1000 mg","Mineralización ósea fetal — si no consumes, tu cuerpo lo toma de tus huesos","Lácteos, sardinas con hueso, tofu"],["Vitamina D","600-2000 UI","Absorción de calcio, inmunidad, neurodesarrollo","Sol, salmón, suplemento"],["DHA","200-300 mg","Desarrollo cerebral y retina fetal","Salmón, sardina, suplemento de algas"],["Yodo","220 mcg","Tiroides fetal y neurodesarrollo — deficiencia = daño cognitivo","Sal yodada, mariscos, lácteos"],["Colina","450 mg","Desarrollo cerebral y tubo neural","Huevo entero, hígado, frijoles"],["Vitamina B12","2.6 mcg","Sistema nervioso fetal — crítico en vegetarianas","Carnes, lácteos, huevo, suplemento"]]},
      {type:"h2", text:"Aumento de peso recomendado (IOM)"},
      {type:"table", headers:["IMC pregestacional","Aumento total recomendado","Tasa 2do-3er trimestre"], rows:[["< 18.5 (bajo peso)","12.5-18 kg","0.5 kg/semana"],["18.5-24.9 (normal)","11.5-16 kg","0.4 kg/semana"],["25-29.9 (sobrepeso)","7-11.5 kg","0.3 kg/semana"],["≥ 30 (obesidad)","5-9 kg","0.2 kg/semana"]]},
      {type:"h2", text:"Alimentos y sustancias a evitar"},
      {type:"list", items:["Alcohol: sin dosis segura — síndrome alcohólico fetal. Eliminar completamente","Mercurio: pez espada, tiburón, macarela real — neurotóxico para el feto","Carne cruda o mal cocida: riesgo de toxoplasmosis y listeria","Quesos blandos no pasteurizados: riesgo de listeria","Cafeína > 200 mg/día: asociada con bajo peso al nacer — máximo 1-2 cafés/día","Hígado en exceso: hipervitaminosis A — teratógena en grandes cantidades","Suplementos herbales sin evaluación: muchos no han sido evaluados en embarazo"]},
      {type:"h2", text:"Manejo de náuseas en el 1er trimestre"},
      {type:"list", items:["Comer pequeñas cantidades cada 2-3 horas — no dejar el estómago vacío","Alimentos secos al levantarse: galletas, tostadas, arroz","Jengibre: en té, cápsulas o confitado — reduce náuseas con evidencia","Alimentos fríos o a temperatura ambiente — menos olor","Evitar alimentos grasos, muy dulces o con olores fuertes","Vitamina B6 (10-25 mg, 3 veces/día) — efectiva para náuseas leves a moderadas"]},
      {type:"h2", text:"Nutrición en la lactancia"},
      {type:"p", text:"La lactancia requiere +500 kcal/día sobre el requerimiento pregestacional. El DHA, el yodo y la vitamina D pasan a la leche materna y son críticos para el desarrollo del bebé. La vitamina D es particularmente baja en la leche materna — se recomienda suplementar al bebé con 400 UI/día."},
      {type:"cta", text:"Ver guía completa de embarazo", url:"/conditions"},
      {type:"refs", items:["Institute of Medicine. Weight Gain During Pregnancy. 2009.","ACOG. Nutrition During Pregnancy. 2023.","Koletzko B, et al. Dietary fat intakes for pregnant and lactating women. Br J Nutr. 2007.","Greenberg JA, et al. Folic acid supplementation and pregnancy. Rev Obstet Gynecol. 2011."]},
    ],
    content_en: [
      {type:"h2", text:"How many extra calories do I need?"},
      {type:"table", headers:["Trimester","Additional calories/day","Practical equivalent"], rows:[["1st trimester","+ 0 kcal","No change — quality over quantity"],["2nd trimester","+ 340 kcal","~1 cup oatmeal + 1 egg + fruit"],["3rd trimester","+ 450 kcal","~Greek yogurt + nuts + banana"]]},
      {type:"h2", text:"Critical nutrients in pregnancy"},
      {type:"table", headers:["Nutrient","Goal/day","Why critical","Sources"], rows:[["Folic acid","400-800 mcg","Prevents neural tube defects — start 3 months BEFORE","Spinach, beans, lentils, supplement"],["Iron","27 mg","Fetal hemoglobin, maternal blood volume expansion","Red meats, legumes + vitamin C"],["Calcium","1000 mg","Fetal bone mineralization","Dairy, bone-in sardines, tofu"],["Vitamin D","600-2000 IU","Calcium absorption, immunity, neurodevelopment","Sun, salmon, supplement"],["DHA","200-300 mg","Fetal brain and retina development","Salmon, sardine, algae supplement"],["Iodine","220 mcg","Fetal thyroid and neurodevelopment","Iodized salt, seafood, dairy"]]},
      {type:"h2", text:"Foods and substances to avoid"},
      {type:"list", items:["Alcohol: no safe dose — fetal alcohol syndrome. Eliminate completely","Mercury: swordfish, shark, king mackerel — neurotoxic for fetus","Raw or undercooked meat: risk of toxoplasmosis and listeria","Unpasteurized soft cheeses: listeria risk","Caffeine > 200 mg/day: associated with low birth weight","Excess liver: hypervitaminosis A — teratogenic in large amounts"]},
      {type:"cta", text:"See full pregnancy guide", url:"/conditions"},
      {type:"refs", items:["Institute of Medicine. Weight Gain During Pregnancy. 2009.","ACOG. Nutrition During Pregnancy. 2023.","Greenberg JA, et al. Folic acid supplementation and pregnancy. Rev Obstet Gynecol. 2011."]},
    ],
  },
  {
    id: "imc-guia-completa",
    date: "2026-06-26",
    readTime: 8,
    tag_es: "Herramientas",
    tag_en: "Tools",
    title_es: "IMC: Qué es, cómo calcularlo y sus limitaciones clínicas",
    title_en: "BMI: What it is, how to calculate it and its clinical limitations",
    intro_es: "El índice de masa corporal (IMC) es una de las herramientas más utilizadas en la práctica clínica para evaluar el estado nutricional. Sin embargo, es importante conocer tanto su utilidad como sus limitaciones para interpretarlo correctamente.",
    intro_en: "Body mass index (BMI) is one of the most widely used tools in clinical practice to assess nutritional status. However, it is important to know both its utility and its limitations to interpret it correctly.",
    content_es: [
      {type:"h2", text:"¿Qué es el IMC?"},
      {type:"p", text:"El índice de masa corporal (IMC), también conocido como índice de Quetelet, es una medida que relaciona el peso corporal con la estatura al cuadrado. Fue desarrollado por el matemático belga Adolphe Quetelet en el siglo XIX y adoptado por la Organización Mundial de la Salud (OMS) como herramienta de tamizaje nutricional."},
      {type:"h2", text:"¿Cómo se calcula el IMC?"},
      {type:"p", text:"La fórmula es simple: IMC = Peso (kg) / Talla² (m²). Por ejemplo, una persona de 70 kg y 1.70 m de estatura tendría un IMC de: 70 / (1.70)² = 70 / 2.89 = 24.2 kg/m²."},
      {type:"formula", text:"IMC = Peso (kg) ÷ Talla² (m²)"},
      {type:"h2", text:"Clasificación del IMC según la OMS"},
      {type:"table", headers:["IMC (kg/m²)","Clasificación","Riesgo de comorbilidades"], rows:[["< 18.5","Bajo peso","Bajo (pero otros riesgos)"],["18.5 – 24.9","Normal / Peso saludable","Promedio"],["25.0 – 29.9","Sobrepeso","Aumentado"],["30.0 – 34.9","Obesidad grado I","Moderado"],["35.0 – 39.9","Obesidad grado II","Severo"],["≥ 40","Obesidad grado III (mórbida)","Muy severo"]]},
      {type:"h2", text:"Limitaciones del IMC — Lo que no te dice"},
      {type:"p", text:"A pesar de su amplio uso, el IMC tiene limitaciones importantes que todo profesional de salud debe conocer:"},
      {type:"list", items:["No diferencia masa muscular de masa grasa — un atleta con alta masa muscular puede tener IMC de 'sobrepeso' sin tener exceso de grasa corporal.","No considera la distribución de grasa — la grasa visceral (abdominal) es más peligrosa que la subcutánea, y el IMC no la detecta.","Varía por etnia — los puntos de corte de la OMS fueron establecidos en poblaciones europeas. Para poblaciones asiáticas, el riesgo aumenta con IMC ≥ 23.","No es válido en embarazo, menores de 18 años, adultos mayores ni deportistas de alto rendimiento.","No evalúa composición corporal — dos personas con el mismo IMC pueden tener composiciones corporales completamente diferentes."]},
      {type:"h2", text:"¿Qué complementa al IMC en la evaluación nutricional?"},
      {type:"p", text:"En la práctica clínica, el IMC debe acompañarse de otras medidas para una evaluación completa:"},
      {type:"list", items:["Circunferencia de cintura: riesgo aumentado en mujeres > 88 cm y hombres > 102 cm (OMS).","Relación cintura-cadera (ICC): indicador de distribución de grasa.","Porcentaje de grasa corporal: más preciso que el IMC (método Navy, DEXA, bioimpedancia).","Peso ideal (Hamwi, Devine, Robinson): para objetivos de peso clínicos.","Valoración Global Subjetiva (VGS): evaluación nutricional integral."]},
      {type:"h2", text:"IMC en poblaciones latinoamericanas"},
      {type:"p", text:"En Latinoamérica, los datos del INCAP y estudios regionales sugieren que los puntos de corte estándar de la OMS pueden subestimar el riesgo cardiometabólico en algunas poblaciones. Varios países adoptan puntos de corte más sensibles: IMC ≥ 23 para sobrepeso y ≥ 27.5 para obesidad en ciertos grupos de riesgo."},
      {type:"h2", text:"¿Cuándo usar nuestra calculadora de IMC?"},
      {type:"p", text:"Nuestra calculadora de IMC en nutrionally.com calcula automáticamente tu IMC y te muestra la clasificación de la OMS, disponible en modo métrico (kg, cm) e imperial (lb, in). Recuerda siempre interpretar el resultado en contexto con otros indicadores clínicos."},
      {type:"cta", text:"Calcular mi IMC ahora", url:"/tools#bmi"},
      {type:"h2", text:"Conclusión"},
      {type:"p", text:"El IMC es una herramienta útil, económica y fácil de aplicar para el tamizaje nutricional poblacional. Sin embargo, sus limitaciones son reales y deben considerarse en la práctica clínica individual. Siempre complementa el IMC con otras medidas antropométricas y una evaluación nutricional completa."},
      {type:"refs", items:["OMS. Obesity and overweight. 2024.","NHLBI. Clinical Guidelines on the Identification, Evaluation, and Treatment of Overweight and Obesity in Adults. 1998.","Yusuf S, et al. Obesity and the risk of myocardial infarction in 27,000 participants from 52 countries. Lancet. 2005."]},
    ],
    content_en: [
      {type:"h2", text:"What is BMI?"},
      {type:"p", text:"Body mass index (BMI), also known as the Quetelet index, is a measure that relates body weight to height squared. It was developed by Belgian mathematician Adolphe Quetelet in the 19th century and adopted by the World Health Organization (WHO) as a nutritional screening tool."},
      {type:"h2", text:"How is BMI calculated?"},
      {type:"p", text:"The formula is simple: BMI = Weight (kg) / Height² (m²). For example, a person weighing 70 kg and 1.70 m tall would have a BMI of: 70 / (1.70)² = 70 / 2.89 = 24.2 kg/m²."},
      {type:"formula", text:"BMI = Weight (kg) ÷ Height² (m²)"},
      {type:"h2", text:"WHO BMI Classification"},
      {type:"table", headers:["BMI (kg/m²)","Classification","Comorbidity risk"], rows:[["< 18.5","Underweight","Low (but other risks)"],["18.5 – 24.9","Normal / Healthy weight","Average"],["25.0 – 29.9","Overweight","Increased"],["30.0 – 34.9","Obesity grade I","Moderate"],["35.0 – 39.9","Obesity grade II","Severe"],["≥ 40","Obesity grade III (morbid)","Very severe"]]},
      {type:"h2", text:"BMI Limitations — What it does not tell you"},
      {type:"p", text:"Despite its widespread use, BMI has important limitations that every health professional should know:"},
      {type:"list", items:["Does not differentiate muscle mass from fat mass — an athlete with high muscle mass may have an 'overweight' BMI without excess body fat.","Does not consider fat distribution — visceral (abdominal) fat is more dangerous than subcutaneous fat, and BMI does not detect it.","Varies by ethnicity — WHO cutoffs were established in European populations. For Asian populations, risk increases at BMI ≥ 23.","Not valid in pregnancy, under 18, elderly or high-performance athletes.","Does not assess body composition — two people with the same BMI can have completely different body compositions."]},
      {type:"h2", text:"What complements BMI in nutritional assessment?"},
      {type:"list", items:["Waist circumference: increased risk in women > 88 cm and men > 102 cm (WHO).","Waist-to-hip ratio (WHR): indicator of fat distribution.","Body fat percentage: more accurate than BMI (Navy method, DEXA, bioimpedance).","Ideal body weight (Hamwi, Devine, Robinson): for clinical weight goals.","Subjective Global Assessment (SGA): comprehensive nutritional assessment."]},
      {type:"h2", text:"Conclusion"},
      {type:"p", text:"BMI is a useful, affordable and easy-to-apply tool for population nutritional screening. However, its limitations are real and must be considered in individual clinical practice. Always complement BMI with other anthropometric measures and a complete nutritional assessment."},
      {type:"cta", text:"Calculate my BMI now", url:"/tools#bmi"},
      {type:"refs", items:["WHO. Obesity and overweight. 2024.","NHLBI. Clinical Guidelines on the Identification, Evaluation, and Treatment of Overweight and Obesity in Adults. 1998.","Yusuf S, et al. Obesity and the risk of myocardial infarction in 27,000 participants from 52 countries. Lancet. 2005."]},
    ],
  },
  {
    id: "dieta-diabetes-tipo-2",
    date: "2026-06-26",
    readTime: 10,
    tag_es: "Condiciones clínicas",
    tag_en: "Clinical conditions",
    title_es: "Dieta para diabetes tipo 2: Guía completa basada en evidencia",
    title_en: "Diet for type 2 diabetes: Complete evidence-based guide",
    intro_es: "La diabetes mellitus tipo 2 (DM2) es una de las enfermedades crónicas más prevalentes en Latinoamérica. La intervención nutricional es el pilar fundamental del tratamiento y puede reducir la HbA1c hasta 2% sin medicación.",
    intro_en: "Type 2 diabetes mellitus (T2DM) is one of the most prevalent chronic diseases in Latin America. Nutritional intervention is the fundamental pillar of treatment and can reduce HbA1c by up to 2% without medication.",
    content_es: [
      {type:"h2", text:"¿Por qué la dieta es tan importante en DM2?"},
      {type:"p", text:"En la DM2, las células no responden adecuadamente a la insulina (resistencia a la insulina) y el páncreas no produce suficiente insulina para compensar. Esto resulta en hiperglucemia crónica que daña órganos y tejidos. La dieta es la herramienta más poderosa para mejorar la sensibilidad a la insulina y controlar la glucemia."},
      {type:"h2", text:"Objetivos nutricionales en DM2 (ADA 2024)"},
      {type:"list", items:["Lograr y mantener HbA1c < 7%","Glucosa preprandial: 80-130 mg/dL","Glucosa postprandial (2h): < 180 mg/dL","Mantener o alcanzar peso saludable","Reducir riesgo cardiovascular (LDL, PA, TG)","Mejorar la calidad de vida"]},
      {type:"h2", text:"Carbohidratos en DM2: ¿cuántos y cuáles?"},
      {type:"p", text:"No existe un porcentaje ideal universal de carbohidratos para DM2. La ADA 2024 reconoce que múltiples patrones dietéticos son efectivos. Lo que sí está claro es que la CALIDAD de los carbohidratos importa más que la cantidad."},
      {type:"table", headers:["Tipo de CHO","IG","Recomendación"], rows:[["Verduras sin almidón","< 15","Consumir abundantemente"],["Leguminosas","28-32","Priorizar — fibra + proteína"],["Frutas enteras","36-60","Con moderación — 1-2 porciones/día"],["Granos integrales","45-55","Preferir sobre refinados"],["Arroz blanco / Pan blanco","72-75","Limitar — porciones pequeñas"],["Jugos / Refrescos","63-78","Eliminar"]]},
      {type:"h2", text:"El índice glucémico y la carga glucémica"},
      {type:"p", text:"El índice glucémico (IG) mide qué tan rápido eleva un alimento la glucosa sanguínea. Sin embargo, la carga glucémica (CG) es más útil porque considera tanto el IG como la cantidad de carbohidratos. Un alimento puede tener IG alto pero CG baja (como la sandía)."},
      {type:"formula", text:"Carga glucémica = (IG × gramos de CHO) ÷ 100"},
      {type:"h2", text:"El método del plato de la ADA"},
      {type:"p", text:"Una herramienta práctica y visualmente clara para personas con DM2:"},
      {type:"list", items:["½ plato: verduras sin almidón (espinaca, brócoli, pepino, tomate, nopal)","¼ plato: proteína magra (pollo sin piel, pescado, huevo, leguminosas)","¼ plato: carbohidratos de calidad (arroz integral, quinoa, papa pequeña, tortilla)","Añadir: agua, grasa saludable (aguacate, aceite de oliva) en pequeña cantidad"]},
      {type:"h2", text:"Alimentos recomendados para DM2"},
      {type:"list", items:["Verduras sin almidón: espinaca, brócoli, coliflor, pepino, chayote, nopal, lechuga","Proteínas magras: pollo, pavo, pescado, claras de huevo, tofu","Leguminosas: frijoles, lentejas, garbanzos — bajo IG y alta fibra","Granos enteros: avena, quinoa, cebada, arroz integral (porciones controladas)","Grasas saludables: aguacate, aceite de oliva extra virgen, nueces, almendras","Lácteos bajos en grasa: yogur natural, leche descremada"]},
      {type:"h2", text:"Alimentos a limitar o evitar"},
      {type:"list", items:["Azúcares simples: refrescos, jugos, dulces, miel, azúcar de mesa","Cereales refinados: pan blanco, arroz blanco, pasta refinada","Grasas saturadas y trans: manteca, comida rápida, alimentos fritos","Alcohol: aumenta riesgo de hipoglucemia, especialmente con medicación","Ultraprocesados: botanas, embutidos, comida empacada"]},
      {type:"h2", text:"Patrones dietéticos con evidencia en DM2"},
      {type:"p", text:"La ADA 2024 reconoce los siguientes patrones con evidencia de beneficio en DM2:"},
      {type:"list", items:["Dieta mediterránea: reduce HbA1c 0.3-0.5%, mejor perfil lipídico","Dieta baja en carbohidratos (< 130g/día): reduce HbA1c hasta 1%","Dieta DASH: especialmente útil en DM2 + hipertensión","Dieta vegetariana/vegana: puede mejorar sensibilidad a insulina","Dieta de bajo índice glucémico: reduce HbA1c 0.2-0.5%"]},
      {type:"h2", text:"Plan de comidas ejemplo para DM2 (1800 kcal)"},
      {type:"table", headers:["Comida","Alimentos","CHO aprox."], rows:[["Desayuno 7am","Avena 40g + leche descremada + 1 manzana pequeña","55g"],["Colación 10am","Yogur natural 150g + nueces 15g","15g"],["Almuerzo 1pm","Pollo 120g + arroz integral 60g + ensalada + aguacate","60g"],["Colación 4pm","1 pera + almendras 20g","25g"],["Cena 7pm","Salmón 100g + quinoa 50g + verduras salteadas","45g"],["Total","","~200g CHO (44%)"]]},
      {type:"cta", text:"Ver guía completa de DM2", url:"/conditions"},
      {type:"refs", items:["American Diabetes Association. Standards of Care in Diabetes 2024. Diabetes Care.","Evert AB, et al. Nutrition Therapy for Adults With Diabetes or Prediabetes. Diabetes Care. 2019.","Ley SH, et al. Prevention and management of type 2 diabetes: dietary components and nutritional strategies. Lancet. 2014."]},
    ],
    content_en: [
      {type:"h2", text:"Why is diet so important in T2DM?"},
      {type:"p", text:"In T2DM, cells do not respond properly to insulin (insulin resistance) and the pancreas does not produce enough insulin to compensate. This results in chronic hyperglycemia that damages organs and tissues. Diet is the most powerful tool to improve insulin sensitivity and control blood glucose."},
      {type:"h2", text:"Nutritional goals in T2DM (ADA 2024)"},
      {type:"list", items:["Achieve and maintain HbA1c < 7%","Preprandial glucose: 80-130 mg/dL","Postprandial glucose (2h): < 180 mg/dL","Maintain or achieve healthy weight","Reduce cardiovascular risk (LDL, BP, TG)","Improve quality of life"]},
      {type:"h2", text:"Carbohydrates in T2DM: how many and which ones?"},
      {type:"p", text:"There is no universal ideal carbohydrate percentage for T2DM. The ADA 2024 recognizes that multiple dietary patterns are effective. What is clear is that the QUALITY of carbohydrates matters more than quantity."},
      {type:"h2", text:"The ADA Plate Method"},
      {type:"list", items:["½ plate: non-starchy vegetables (spinach, broccoli, cucumber, tomato)","¼ plate: lean protein (skinless chicken, fish, egg, legumes)","¼ plate: quality carbohydrates (brown rice, quinoa, small potato, tortilla)","Add: water, healthy fat (avocado, olive oil) in small amount"]},
      {type:"h2", text:"Recommended foods for T2DM"},
      {type:"list", items:["Non-starchy vegetables: spinach, broccoli, cauliflower, cucumber, lettuce","Lean proteins: chicken, turkey, fish, egg whites, tofu","Legumes: beans, lentils, chickpeas — low GI and high fiber","Whole grains: oats, quinoa, barley, brown rice (controlled portions)","Healthy fats: avocado, extra virgin olive oil, walnuts, almonds"]},
      {type:"cta", text:"See full T2DM guide", url:"/conditions"},
      {type:"refs", items:["American Diabetes Association. Standards of Care in Diabetes 2024. Diabetes Care.","Evert AB, et al. Nutrition Therapy for Adults With Diabetes or Prediabetes. Diabetes Care. 2019.","Ley SH, et al. Prevention and management of type 2 diabetes. Lancet. 2014."]},
    ],
  },
  {
    id: "indice-glucemico-guia",
    date: "2026-06-26",
    readTime: 7,
    tag_es: "Nutrición",
    tag_en: "Nutrition",
    title_es: "Índice glucémico: Qué es, tablas de alimentos y cómo usarlo",
    title_en: "Glycemic index: What it is, food tables and how to use it",
    intro_es: "El índice glucémico (IG) es una herramienta que clasifica los alimentos según su efecto en la glucosa sanguínea. Entenderlo puede transformar la manera en que eliges tus carbohidratos, especialmente si tienes diabetes, prediabetes o buscas controlar tu peso.",
    intro_en: "The glycemic index (GI) is a tool that classifies foods according to their effect on blood glucose. Understanding it can transform the way you choose your carbohydrates, especially if you have diabetes, prediabetes or are looking to control your weight.",
    content_es: [
      {type:"h2", text:"¿Qué es el índice glucémico?"},
      {type:"p", text:"El índice glucémico (IG) es una escala del 0 al 100 que mide qué tan rápido un alimento eleva la glucosa sanguínea en comparación con la glucosa pura (IG = 100). Fue desarrollado por el Dr. David Jenkins en la Universidad de Toronto en 1981."},
      {type:"h2", text:"Clasificación del índice glucémico"},
      {type:"table", headers:["Clasificación","IG","Efecto en glucosa"], rows:[["Bajo","< 55","Elevación lenta y gradual — ideal"],["Medio","55-69","Elevación moderada — con precaución"],["Alto","≥ 70","Elevación rápida — limitar en DM2"]]},
      {type:"h2", text:"Tabla de índice glucémico de alimentos comunes"},
      {type:"table", headers:["Alimento","IG","Clasificación"], rows:[["Glucosa (referencia)","100","🔴 Muy alto"],["Arroz blanco","72","🔴 Alto"],["Arroz jazmín","89","🔴 Muy alto"],["Pan blanco","75","🔴 Alto"],["Sandía","76","🔴 Alto"],["Cornflakes","81","🔴 Muy alto"],["Papa hervida","78","🔴 Alto"],["Arroz integral","50","🟡 Medio"],["Plátano","51","🟡 Medio"],["Uvas","59","🟡 Medio"],["Avena","55","🟡 Medio"],["Tortilla de maíz","52","🟡 Medio"],["Manzana","36","🟢 Bajo"],["Naranja","43","🟢 Bajo"],["Zanahoria","39","🟢 Bajo"],["Lentejas","32","🟢 Bajo"],["Frijoles negros","30","🟢 Bajo"],["Garbanzos","28","🟢 Bajo"],["Yogur natural","41","🟢 Bajo"],["Leche","31","🟢 Bajo"]]},
      {type:"h2", text:"Índice glucémico vs Carga glucémica"},
      {type:"p", text:"El IG solo mide la velocidad de elevación de glucosa, pero no considera cuánto carbohidrato contiene una porción real del alimento. La carga glucémica (CG) es más útil porque combina ambos factores."},
      {type:"formula", text:"Carga glucémica = (IG × g de CHO por porción) ÷ 100"},
      {type:"p", text:"Ejemplo: La sandía tiene IG alto (76) pero una porción de 120g solo contiene ~6g de CHO, por lo que su CG es baja (76 × 6 ÷ 100 = 4.6). Una CG < 10 es baja, 11-19 media, ≥ 20 alta."},
      {type:"h2", text:"Factores que modifican el IG de un alimento"},
      {type:"list", items:["Grado de madurez: a mayor madurez, mayor IG (plátano verde vs maduro)","Procesamiento: los alimentos más procesados tienen mayor IG","Cocción: la pasta al dente tiene menor IG que la muy cocida","Temperatura: el arroz y la papa fríos tienen menor IG por almidón resistente","Combinación con otros alimentos: añadir grasa o proteína reduce el IG de la comida","Fibra: los alimentos con más fibra tienen menor IG"]},
      {type:"h2", text:"¿A quiénes beneficia seguir una dieta de bajo IG?"},
      {type:"list", items:["Personas con diabetes tipo 2 o prediabetes","Personas con síndrome de ovario poliquístico (SOP)","Personas que buscan controlar el peso — mayor saciedad","Deportistas que buscan energía sostenida","Personas con colesterol alto — la dieta de bajo IG mejora el perfil lipídico"]},
      {type:"h2", text:"Estrategias prácticas para reducir el IG de tus comidas"},
      {type:"list", items:["Cocinar la pasta y el arroz al dente — menor IG que bien cocidos","Enfriar y recalentar el arroz o la papa — aumenta el almidón resistente","Combinar CHO con proteína o grasa saludable en cada comida","Elegir pan integral con semillas sobre pan blanco","Incluir leguminosas en al menos 1 comida al día","Consumir fruta entera en lugar de jugo","Añadir vinagre o limón a las comidas — reduce el IG hasta 20%"]},
      {type:"cta", text:"Buscar el IG de un alimento", url:"/tools#glycemic"},
      {type:"refs", items:["Jenkins DJ, et al. Glycemic index of foods: a physiological basis for carbohydrate exchange. Am J Clin Nutr. 1981.","Atkinson FS, et al. International tables of glycemic index and glycemic load values 2021. Am J Clin Nutr. 2021.","Brand-Miller J, et al. The Low GI Diet Revolution. 2005."]},
    ],
    content_en: [
      {type:"h2", text:"What is the glycemic index?"},
      {type:"p", text:"The glycemic index (GI) is a scale from 0 to 100 that measures how quickly a food raises blood glucose compared to pure glucose (GI = 100). It was developed by Dr. David Jenkins at the University of Toronto in 1981."},
      {type:"h2", text:"Glycemic index classification"},
      {type:"table", headers:["Classification","GI","Effect on glucose"], rows:[["Low","< 55","Slow and gradual rise — ideal"],["Medium","55-69","Moderate rise — use with caution"],["High","≥ 70","Rapid rise — limit in T2DM"]]},
      {type:"h2", text:"Glycemic index vs Glycemic load"},
      {type:"p", text:"GI only measures the speed of glucose rise, but does not consider how much carbohydrate a real serving of the food contains. Glycemic load (GL) is more useful because it combines both factors."},
      {type:"formula", text:"Glycemic load = (GI × g of CHO per serving) ÷ 100"},
      {type:"h2", text:"Practical strategies to reduce the GI of your meals"},
      {type:"list", items:["Cook pasta and rice al dente — lower GI than well cooked","Cool and reheat rice or potato — increases resistant starch","Combine CHO with protein or healthy fat at each meal","Choose whole grain bread with seeds over white bread","Include legumes in at least 1 meal per day","Eat whole fruit instead of juice","Add vinegar or lemon to meals — reduces GI by up to 20%"]},
      {type:"cta", text:"Look up a food GI", url:"/tools#glycemic"},
      {type:"refs", items:["Jenkins DJ, et al. Glycemic index of foods. Am J Clin Nutr. 1981.","Atkinson FS, et al. International tables of glycemic index and glycemic load values 2021. Am J Clin Nutr. 2021."]},
    ],
  },
];

function PostContent({blocks, isES, navigate}) {
  return (
    <div>
      {blocks.map((block, i) => {
        if(block.type==="h2") return <h2 key={i} style={{fontSize:18,fontWeight:500,color:NAVY,margin:"28px 0 10px",fontFamily:F,lineHeight:1.3}}>{block.text}</h2>;
        if(block.type==="p") return <p key={i} style={{fontSize:14,color:"#3A5BA0",lineHeight:1.8,margin:"0 0 16px",fontFamily:F}}>{block.text}</p>;
        if(block.type==="formula") return (
          <div key={i} style={{background:"#EFF6FF",border:"0.5px solid #2563EB33",borderRadius:10,padding:"14px 20px",margin:"16px 0",textAlign:"center"}}>
            <span style={{fontSize:15,fontWeight:500,color:"#2563EB",fontFamily:F}}>{block.text}</span>
          </div>
        );
        if(block.type==="list") return (
          <ul key={i} style={{margin:"0 0 16px",paddingLeft:20}}>
            {block.items.map((item,j)=><li key={j} style={{fontSize:14,color:"#3A5BA0",lineHeight:1.8,marginBottom:6,fontFamily:F}}>{item}</li>)}
          </ul>
        );
        if(block.type==="table") return (
          <div key={i} style={{overflowX:"auto",margin:"16px 0"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,fontFamily:F}}>
              <thead><tr>{block.headers.map((h,j)=><th key={j} style={{padding:"10px 14px",background:"#F5F7FF",color:NAVY,fontWeight:600,textAlign:"left",borderBottom:"1px solid #D4E3FF"}}>{h}</th>)}</tr></thead>
              <tbody>{block.rows.map((row,j)=><tr key={j} style={{borderBottom:"0.5px solid #F0F4FF"}}>{row.map((cell,k)=><td key={k} style={{padding:"10px 14px",color:"#3A5BA0"}}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
        );
        if(block.type==="cta") return (
          <div key={i} style={{margin:"24px 0",textAlign:"center"}}>
            <a href={block.url} style={{display:"inline-block",background:TEAL,color:"#fff",textDecoration:"none",padding:"12px 28px",borderRadius:8,fontSize:14,fontWeight:500,fontFamily:F}}>{block.text} →</a>
          </div>
        );
        if(block.type==="refs") return (
          <div key={i} style={{marginTop:32,padding:"16px 20px",background:"#F5F7FF",borderRadius:10}}>
            <div style={{fontSize:11,fontWeight:600,color:NAVY,fontFamily:F,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.08em"}}>Referencias</div>
            {block.items.map((ref,j)=><div key={j} style={{fontSize:11,color:"#3A5BA0",fontFamily:F,marginBottom:4}}>• {ref}</div>)}
          </div>
        );
        return null;
      })}
    </div>
  );
}

export default function Blog({lang}) {
  const isES = lang === "ES";
  const [active, setActive] = useState(null);

  if(active) {
    const post = POSTS.find(p=>p.id===active);
    const content = isES ? post.content_es : post.content_en;
    return (
      <div style={{maxWidth:800,margin:"0 auto",padding:"40px 32px"}}>
        <button onClick={()=>setActive(null)} style={{background:"none",border:"none",color:TEAL,fontSize:13,fontFamily:F,cursor:"pointer",marginBottom:20,padding:0}}>← {isES?"Volver al blog":"Back to blog"}</button>
        <div style={{fontSize:11,fontWeight:500,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8,fontFamily:F}}>{isES?post.tag_es:post.tag_en}</div>
        <h1 style={{fontSize:28,fontWeight:500,color:NAVY,margin:"0 0 12px",fontFamily:F,lineHeight:1.3}}>{isES?post.title_es:post.title_en}</h1>
        <div style={{display:"flex",gap:16,marginBottom:24,alignItems:"center"}}>
          <span style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{post.date}</span>
          <span style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>·</span>
          <span style={{fontSize:12,color:"#3A5BA0",fontFamily:F}}>{post.readTime} min {isES?"de lectura":"read"}</span>
        </div>
        <p style={{fontSize:15,color:"#3A5BA0",lineHeight:1.8,margin:"0 0 28px",fontFamily:F,borderLeft:`3px solid ${TEAL}`,paddingLeft:16}}>{isES?post.intro_es:post.intro_en}</p>
        <PostContent blocks={content} isES={isES}/>
      </div>
    );
  }

  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"40px 32px"}}>
      <div style={{fontSize:11,fontWeight:500,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,fontFamily:F}}>Blog</div>
      <div style={{fontSize:26,fontWeight:500,color:NAVY,marginBottom:6,fontFamily:F}}>{isES?"Artículos de nutrición clínica":"Clinical nutrition articles"}</div>
      <div style={{fontSize:13,color:"#3A5BA0",marginBottom:32,fontFamily:F}}>{isES?"Información basada en evidencia para profesionales y público general.":"Evidence-based information for professionals and the general public."}</div>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {POSTS.map(post=>(
          <div key={post.id} onClick={()=>setActive(post.id)} style={{background:"#fff",border:"0.5px solid #D4E3FF",borderRadius:12,padding:"24px 28px",cursor:"pointer",transition:"border-color 0.2s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=TEAL}
            onMouseLeave={e=>e.currentTarget.style.borderColor="#D4E3FF"}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:16}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:10,marginBottom:10,alignItems:"center"}}>
                  <span style={{fontSize:10,fontWeight:600,color:TEAL,textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:F}}>{isES?post.tag_es:post.tag_en}</span>
                  <span style={{fontSize:10,color:"#D4E3FF"}}>·</span>
                  <span style={{fontSize:11,color:"#3A5BA0",fontFamily:F}}>{post.readTime} min {isES?"lectura":"read"}</span>
                </div>
                <div style={{fontSize:17,fontWeight:500,color:NAVY,marginBottom:8,fontFamily:F,lineHeight:1.3}}>{isES?post.title_es:post.title_en}</div>
                <div style={{fontSize:13,color:"#3A5BA0",lineHeight:1.6,fontFamily:F}}>{isES?post.intro_es:post.intro_en}</div>
              </div>
              <span style={{color:TEAL,fontSize:18,flexShrink:0}}>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

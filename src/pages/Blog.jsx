import { useMeta } from "../hooks/useMeta.js";
import { useState } from "react";
const F = "Plus Jakarta Sans, sans-serif";
const TEAL = "#2A9D8F";
const NAVY = "#1E2D4E";
const BLUE = "#2563EB";

const POSTS = [
  {
    id: "colesterol-dieta",
    date: "2026-06-26",
    readTime: 8,
    tag_es: "Condiciones clínicas",
    tag_en: "Clinical conditions",
    title_es: "Colesterol alto: qué comer para bajarlo sin medicación",
    title_en: "High cholesterol: what to eat to lower it without medication",
    intro_es: "La dislipidemia afecta a 1 de cada 3 adultos en Latinoamérica. La buena noticia: la intervención nutricional puede reducir el LDL hasta un 30% sin medicación. Esta guía te explica exactamente qué comer, qué evitar y cómo implementar la dieta Portfolio.",
    intro_en: "Dyslipidemia affects 1 in 3 adults in Latin America. The good news: nutritional intervention can reduce LDL by up to 30% without medication. This guide explains exactly what to eat, what to avoid and how to implement the Portfolio diet.",
    content_es: [
      {type:"h2", text:"¿Qué es el colesterol y por qué importa?"},
      {type:"p", text:"El colesterol es una grasa esencial para el cuerpo — forma membranas celulares, hormonas y vitamina D. El problema surge cuando el LDL (colesterol 'malo') se acumula en las arterias formando placas ateroscleróticas que aumentan el riesgo de infarto y ACV."},
      {type:"table", headers:["Parámetro","Deseable","Borderline","Alto riesgo"], rows:[["Colesterol total","< 200 mg/dL","200-239 mg/dL","≥ 240 mg/dL"],["LDL-C","< 100 mg/dL","100-159 mg/dL","≥ 160 mg/dL"],["HDL-C","≥ 60 mg/dL","40-59 mg/dL","< 40 mg/dL"],["Triglicéridos","< 150 mg/dL","150-199 mg/dL","≥ 200 mg/dL"]]},
      {type:"h2", text:"Tipos de grasa y su efecto en el colesterol"},
      {type:"table", headers:["Tipo de grasa","Efecto en LDL","Efecto en HDL","Recomendación","Fuentes"], rows:[["Saturadas","↑↑ Aumenta","Sin efecto","< 7% kcal","Mantequilla, coco, carnes rojas, lácteos enteros"],["Trans","↑↑ Aumenta","↓ Disminuye","Eliminar","Ultraprocesados, margarinas, frituras"],["Monoinsaturadas","↓ Disminuye","↑ Aumenta","Aumentar","Aceite de oliva, aguacate, almendras"],["Omega-3","Sin efecto LDL","↑ Aumenta","Aumentar","Salmón, sardina, chía, linaza"]]},
      {type:"h2", text:"La Dieta Portfolio — reducción de LDL comparable a estatinas"},
      {type:"p", text:"La Dieta Portfolio (Dr. David Jenkins, Universidad de Toronto) combina 4 componentes funcionales que juntos reducen el LDL 25-35% — comparable a una estatina de baja dosis. Es el patrón dietético con mayor evidencia para reducción de LDL-C."},
      {type:"table", headers:["Componente","Dosis/día","Reducción LDL","Fuentes"], rows:[["Esteroles vegetales","2 g","-8 a -10%","Margarinas enriquecidas, alimentos funcionales"],["Proteína de soya","25 g","-4 a -7%","Tofu, leche de soya, edamame, tempeh"],["Fibra viscosa (β-glucanos)","10 g","-5 a -7%","Avena, cebada, psyllium, leguminosas"],["Nueces (almendras)","30 g","-5 a -7%","Almendras, nueces, pistaches"]]},
      {type:"h2", text:"Alimentos que REDUCEN el colesterol LDL"},
      {type:"list", items:["Avena y cebada: 3g/día de β-glucanos reduce LDL 5-7% — 1 taza de avena cocida aporta ~3g","Leguminosas: 1 porción/día de frijoles, lentejas o garbanzos reduce LDL ~5%","Nueces (30g/día): reducen LDL ~5% — omega-3 y fitoesteroles","Aceite de oliva extra virgen: reemplazar grasas saturadas por AOVE reduce LDL","Soya (25g proteína/día): reduce LDL ~4% — aprobado por FDA","Psyllium (7g/día): reduce LDL 6-24% — reduce absorción intestinal de colesterol","Ajo: alicina reduce LDL moderadamente — 1-2 dientes/día","Chocolate oscuro >70% (20-30g): flavonoides mejoran perfil lipídico"]},
      {type:"h2", text:"Para triglicéridos altos — estrategia diferente"},
      {type:"p", text:"Los triglicéridos responden diferente al LDL. Las estrategias más efectivas son:"},
      {type:"list", items:["Eliminar azúcares añadidos y carbohidratos refinados — mayor impacto en TG","Eliminar alcohol — eleva TG significativamente","Omega-3 EPA+DHA 2-4g/día reduce TG 25-30%","Perder 5-10% del peso reduce TG 20%","Ejercicio aeróbico regular reduce TG 20-30%"]},
      {type:"h2", text:"Plan cardioprotector ejemplo (2000 kcal)"},
      {type:"table", headers:["Comida","Alimentos","kcal"], rows:[["Desayuno","Avena 50g + leche de soya 200mL + almendras 20g + manzana","420"],["Colación","Nueces 30g + pera","210"],["Almuerzo","Salmón 120g + quinoa 60g + ensalada de espinaca + AOVE + aguacate","550"],["Colación","Yogur sin grasa 150g + fresas 100g","150"],["Cena","Tofu 150g + frijoles 60g + verduras salteadas en AOVE + arroz integral","520"],["Total","","1850 kcal"]]},
      {type:"cta", text:"Ver guía completa de colesterol", url:"/conditions"},
      {type:"refs", items:["Jenkins DJ, et al. Effects of a dietary portfolio of cholesterol-lowering foods vs lovastatin on serum lipids. JAMA. 2003.","Estruch R, et al. Primary prevention of cardiovascular disease with a Mediterranean diet. N Engl J Med. 2013.","Eckel RH, et al. 2013 AHA/ACC guideline on lifestyle management to reduce cardiovascular risk. Circulation. 2014."]},
    ],
    content_en: [
      {type:"h2", text:"What is cholesterol and why does it matter?"},
      {type:"p", text:"Cholesterol is an essential fat for the body — it forms cell membranes, hormones and vitamin D. The problem arises when LDL (bad cholesterol) accumulates in arteries forming atherosclerotic plaques that increase the risk of heart attack and stroke."},
      {type:"h2", text:"The Portfolio Diet — LDL reduction comparable to statins"},
      {type:"p", text:"The Portfolio Diet (Dr. David Jenkins) combines 4 functional components that together reduce LDL 25-35% — comparable to a low-dose statin. It is the dietary pattern with the strongest evidence for LDL-C reduction."},
      {type:"table", headers:["Component","Dose/day","LDL reduction","Sources"], rows:[["Plant sterols","2 g","-8 to -10%","Fortified margarines, functional foods"],["Soy protein","25 g","-4 to -7%","Tofu, soy milk, edamame, tempeh"],["Viscous fiber (β-glucans)","10 g","-5 to -7%","Oats, barley, psyllium, legumes"],["Nuts (almonds)","30 g","-5 to -7%","Almonds, walnuts, pistachios"]]},
      {type:"h2", text:"Foods that REDUCE LDL cholesterol"},
      {type:"list", items:["Oats and barley: 3g/day of β-glucans reduces LDL 5-7%","Legumes: 1 serving/day of beans, lentils or chickpeas reduces LDL ~5%","Walnuts (30g/day): reduce LDL ~5% — omega-3 and phytosterols","Extra virgin olive oil: replacing saturated fats with EVOO reduces LDL","Psyllium (7g/day): reduces LDL 6-24%","Dark chocolate >70% (20-30g): flavonoids improve lipid profile"]},
      {type:"cta", text:"See full cholesterol guide", url:"/conditions"},
      {type:"refs", items:["Jenkins DJ, et al. Effects of a dietary portfolio of cholesterol-lowering foods vs lovastatin. JAMA. 2003.","Eckel RH, et al. 2013 AHA/ACC guideline on lifestyle management. Circulation. 2014."]},
    ],
  },
  {
    id: "artritis-dieta-antiinflamatoria",
    date: "2026-06-26",
    readTime: 7,
    tag_es: "Condiciones clínicas",
    tag_en: "Clinical conditions",
    title_es: "Artritis reumatoide y dieta: alimentos antiinflamatorios y qué evitar",
    title_en: "Rheumatoid arthritis and diet: anti-inflammatory foods and what to avoid",
    intro_es: "La artritis reumatoide (AR) es una enfermedad autoinmune crónica donde la nutrición puede marcar una diferencia real. Una dieta antiinflamatoria puede reducir la actividad de la enfermedad, mejorar el dolor y la función articular. Esta guía te explica exactamente qué comer y qué evitar.",
    intro_en: "Rheumatoid arthritis (RA) is a chronic autoimmune disease where nutrition can make a real difference. An anti-inflammatory diet can reduce disease activity, improve pain and joint function. This guide explains exactly what to eat and what to avoid.",
    content_es: [
      {type:"h2", text:"¿Cómo afecta la dieta a la artritis reumatoide?"},
      {type:"p", text:"La AR involucra inflamación sistémica crónica mediada por citocinas proinflamatorias (TNF-α, IL-6, IL-1β). La dieta puede modular estas vías inflamatorias — ciertos alimentos las activan y otros las inhiben. La dieta mediterránea, con mayor evidencia en AR, reduce la actividad de la enfermedad medida por DAS28, el dolor y mejora la función física."},
      {type:"h2", text:"Relación peso-articulaciones"},
      {type:"p", text:"Cada kilogramo de exceso de peso genera 4-6 kg adicionales de presión sobre las articulaciones de carga. La pérdida del 5-10% del peso puede reducir significativamente el dolor articular. Además, el tejido adiposo produce adipocinas proinflamatorias (IL-6, TNF-α) que agravan la AR."},
      {type:"h2", text:"Alimentos antiinflamatorios — aumentar"},
      {type:"list", items:["Omega-3 (antiinflamatorio potente): salmón, sardina, macarela, atún, semillas de chía, linaza, nueces — reducen rigidez matutina y dolor","Frutas y verduras ricas en antioxidantes: arándanos, cereza, fresa, espinaca, brócoli, pimiento rojo — neutralizan radicales libres","Aceite de oliva extra virgen: rico en oleocantal con efecto similar al ibuprofeno — inhibidor de COX-1 y COX-2","Cúrcuma + pimienta negra: curcumina inhibe NF-kB — combinar con piperina aumenta absorción 2000%","Jengibre: compuestos gingeroles inhiben vías inflamatorias similares a los AINEs","Té verde: EGCG inhibe vías inflamatorias y protege el cartílago articular","Leguminosas: fibra y antioxidantes — reducen PCR y marcadores inflamatorios"]},
      {type:"h2", text:"Alimentos proinflamatorios — reducir o eliminar"},
      {type:"list", items:["Omega-6 en exceso: aceites de maíz, soya, girasol — desbalancean el ratio omega-6:omega-3 (ideal 4:1, dieta occidental 15-20:1)","Azúcares y CHO refinados: activan NF-kB y aumentan PCR, IL-6 y TNF-α","Carnes rojas y procesadas: ricas en ácido araquidónico — precursor de prostaglandinas y leucotrienos inflamatorios","Alcohol: aumenta permeabilidad intestinal (leaky gut) y carga inflamatoria sistémica","Grasas trans: alimentos ultraprocesados, margarinas — activan macrófagos proinflamatorios","Sal en exceso: puede activar células Th17 proinflamatorias"]},
      {type:"h2", text:"Suplementos con evidencia en AR"},
      {type:"table", headers:["Suplemento","Dosis sugerida","Evidencia","Notas"], rows:[["Omega-3 (EPA+DHA)","2-4 g/día","Alta — reduce rigidez y dolor","Preferir forma triglicérido, con comida"],["Vitamina D","1000-2000 UI/día","Alta — deficiencia muy común en AR","Monitorear niveles séricos"],["Cúrcuma / Curcumina","500-1000 mg/día","Moderada — antiinflamatorio","Combinar con piperina para mejor absorción"],["Probióticos","10-20 billones UFC/día","Moderada — modula microbiota","Lactobacillus y Bifidobacterium"],["Magnesio","300-400 mg/día","Moderada — antiinflamatorio","Glicinato o citrato mejor tolerado"]]},
      {type:"h2", text:"Calcio y vitamina D en AR (por uso de corticosteroides)"},
      {type:"p", text:"El uso prolongado de corticosteroides en AR aumenta el riesgo de osteoporosis. Es fundamental cubrir: calcio 1000-1200 mg/día (lácteos, sardinas con hueso, tofu, brócoli) y vitamina D 800-2000 UI/día (exposición solar, salmón, suplemento)."},
      {type:"h2", text:"Plan antiinflamatorio ejemplo"},
      {type:"table", headers:["Comida","Alimentos","kcal"], rows:[["Desayuno","Avena 50g + arándanos 100g + nueces 20g + té verde","380"],["Colación","1 naranja + almendras 20g","180"],["Almuerzo","Salmón 150g + quinoa 60g + ensalada de espinaca + AOVE","580"],["Colación","Yogur natural 150g + fresas 100g","160"],["Cena","Pollo 120g + verduras salteadas en AOVE + arroz integral 50g","480"],["Extra","Cúrcuma en alguna preparación del día + 2L de agua","—"],["Total","","1780 kcal"]]},
      {type:"cta", text:"Ver guía completa de artritis reumatoide", url:"/conditions"},
      {type:"refs", items:["Sköldstam L, et al. An experimental study of a Mediterranean diet intervention for patients with rheumatoid arthritis. Ann Rheum Dis. 2003.","Calder PC. Omega-3 fatty acids and inflammatory processes. Nutrients. 2010.","Proudman SM, et al. Fish oil in recent onset rheumatoid arthritis. Ann Rheum Dis. 2015."]},
    ],
    content_en: [
      {type:"h2", text:"How does diet affect rheumatoid arthritis?"},
      {type:"p", text:"RA involves chronic systemic inflammation mediated by pro-inflammatory cytokines (TNF-α, IL-6, IL-1β). Diet can modulate these inflammatory pathways — certain foods activate them and others inhibit them. The Mediterranean diet, with the most evidence in RA, reduces disease activity measured by DAS28, pain and improves physical function."},
      {type:"h2", text:"Anti-inflammatory foods — increase"},
      {type:"list", items:["Omega-3 (potent anti-inflammatory): salmon, sardine, mackerel, tuna, chia seeds, flaxseed, walnuts — reduce morning stiffness and pain","Antioxidant-rich fruits and vegetables: blueberries, cherry, strawberry, spinach, broccoli, red pepper","Extra virgin olive oil: rich in oleocanthal with ibuprofen-like effect","Turmeric + black pepper: curcumin inhibits NF-kB — combine with piperine to increase absorption 2000%","Ginger: gingerol compounds inhibit inflammatory pathways similar to NSAIDs","Green tea: EGCG inhibits inflammatory pathways and protects joint cartilage"]},
      {type:"h2", text:"Pro-inflammatory foods — reduce or eliminate"},
      {type:"list", items:["Excess omega-6: corn, soybean, sunflower oils — unbalance omega-6:omega-3 ratio","Sugars and refined CHO: activate NF-kB and increase CRP, IL-6 and TNF-α","Red and processed meats: rich in arachidonic acid — precursor of inflammatory prostaglandins","Alcohol: increases intestinal permeability and systemic inflammatory load","Trans fats: ultra-processed foods, margarines — activate pro-inflammatory macrophages"]},
      {type:"h2", text:"Supplements with evidence in RA"},
      {type:"table", headers:["Supplement","Suggested dose","Evidence","Notes"], rows:[["Omega-3 (EPA+DHA)","2-4 g/day","High — reduces stiffness and pain","Prefer triglyceride form, with food"],["Vitamin D","1000-2000 IU/day","High — deficiency very common in RA","Monitor serum levels"],["Turmeric / Curcumin","500-1000 mg/day","Moderate — anti-inflammatory","Combine with piperine for better absorption"],["Probiotics","10-20 billion CFU/day","Moderate — modulates microbiota","Lactobacillus and Bifidobacterium"]]},
      {type:"cta", text:"See full rheumatoid arthritis guide", url:"/conditions"},
      {type:"refs", items:["Sköldstam L, et al. Mediterranean diet intervention for patients with rheumatoid arthritis. Ann Rheum Dis. 2003.","Calder PC. Omega-3 fatty acids and inflammatory processes. Nutrients. 2010."]},
    ],
  },
  {
    id: "nutricion-fertilidad",
    date: "2026-06-26",
    readTime: 9,
    tag_es: "Nutrición",
    tag_en: "Nutrition",
    title_es: "Nutrición y fertilidad: qué comer para mejorar tus probabilidades de embarazo",
    title_en: "Nutrition and fertility: what to eat to improve your chances of pregnancy",
    intro_es: "La nutrición juega un papel fundamental en la fertilidad tanto femenina como masculina. Lo que comes en los 3-6 meses previos a buscar un embarazo puede mejorar significativamente la calidad ovocitaria, la función espermática y las probabilidades de concepción.",
    intro_en: "Nutrition plays a fundamental role in both female and male fertility. What you eat in the 3-6 months before trying to conceive can significantly improve oocyte quality, sperm function and the chances of conception.",
    content_es: [
      {type:"h2", text:"¿Por qué la nutrición importa tanto en la fertilidad?"},
      {type:"p", text:"La espermatogénesis tarda ~74 días y la maduración ovocitaria ~90 días. Esto significa que los cambios dietéticos toman 3 meses en impactar la calidad de los gametos. El 40-50% de los casos de infertilidad tienen factor masculino — ambos miembros de la pareja deben optimizar su nutrición."},
      {type:"h2", text:"Nutrientes clave para la fertilidad femenina"},
      {type:"table", headers:["Nutriente","Meta/día","Función","Fuentes"], rows:[["Ácido fólico","400-800 mcg","Previene defectos del tubo neural — iniciar 3 meses antes","Espinaca, frijoles, lentejas, suplemento"],["Hierro","18-27 mg","Ovulación, transporte de O₂, implantación","Carnes rojas, leguminosas + vitamina C"],["Vitamina D","600-2000 UI","Regulación hormonal y calidad ovocitaria","Salmón, yema de huevo, exposición solar"],["DHA / Omega-3","200-300 mg","Calidad ovocitaria y regulación de prostaglandinas","Salmón, sardina, chía, nueces"],["Zinc","8-11 mg","Síntesis de ADN, división celular, implantación","Ostras, carne, semillas de calabaza"],["Coenzima Q10","200-600 mg","Calidad mitocondrial del óvulo — especialmente >35 años","Suplemento principalmente"],["Yodo","150-220 mcg","Tiroides — hipotiroidismo reduce fertilidad","Sal yodada, mariscos, lácteos"]]},
      {type:"h2", text:"SOP — el trastorno hormonal más común en mujeres fértiles"},
      {type:"p", text:"El SOP afecta al 10-15% de mujeres en edad reproductiva y el 70% tiene resistencia a la insulina. La dieta es tratamiento de primera línea. Una pérdida del 5-10% del peso mejora la ovulación en mujeres con sobrepeso/obesidad y SOP."},
      {type:"list", items:["Dieta baja en IG: reduce hiperinsulinemia y mejora niveles de andrógenos","Inositol (myo + D-chiro): 4g myo + 400mg D-chiro/día — mejora resistencia a insulina y ovulación","Vitamina D: deficiencia muy común en SOP — 1000-4000 UI/día","Omega-3: reduce andrógenos e inflamación en SOP","Canela: mejora sensibilidad a la insulina — 1-3g/día"]},
      {type:"h2", text:"Nutrientes clave para la fertilidad masculina"},
      {type:"table", headers:["Nutriente","Meta/día","Función","Fuentes"], rows:[["Zinc","11 mg","Producción de testosterona y espermatogénesis","Ostras, carne roja, semillas de calabaza"],["Selenio","55-200 mcg","Motilidad espermática y protección antioxidante","Nuez de Brasil (1-2/día), atún, huevo"],["Vitamina C","500-1000 mg","Reduce fragmentación del ADN espermático","Pimiento, kiwi, naranja, fresas"],["Licopeno","4-8 mg","Reduce daño oxidativo al ADN espermático","Tomate cocido, sandía, toronja roja"],["Coenzima Q10","200-300 mg","Energía mitocondrial y motilidad espermática","Suplemento principalmente"],["Omega-3","1-3 g EPA+DHA","Fluidez de membrana espermática y morfología","Salmón, sardina, nueces, chía"]]},
      {type:"h2", text:"Superalimentos para la fertilidad"},
      {type:"list", items:["Aguacate: folato + vitamina E + grasas monoinsaturadas — mejora receptividad uterina","Nuez de Brasil (1-2/día): cubre el selenio diario — clave para motilidad espermática","Huevo entero: colina + DHA + vitamina D + B12 — nutrientes esenciales preconcepcionales","Salmón salvaje: DHA + vitamina D + astaxantina — calidad ovocitaria y espermática","Tomate cocido: licopeno biodisponible — protege ADN espermático","Semillas de calabaza: zinc + magnesio + omega-3 — apoyo hormonal en ambos sexos"]},
      {type:"h2", text:"Qué evitar al buscar embarazo"},
      {type:"table", headers:["Factor","Efecto","Recomendación"], rows:[["Alcohol","Daña ADN ovocitario y espermático","Eliminar completamente — sin dosis segura"],["Tabaco","Reduce reserva ovárica y daña ADN espermático","Eliminar completamente"],["Cafeína >200 mg/día","Asociada con mayor riesgo de aborto","Limitar a 1-2 cafés/día"],["Mercurio (pez espada, tiburón)","Neurotóxico para el feto","Evitar — elegir salmón, sardina, trucha"],["Ultraprocesados","Proinflamatorios y disruptores endocrinos","Minimizar ingesta"],["Déficit calórico severo","Suprime el eje hipotálamo-hipofisario-gonadal","Nunca < 1200 kcal/día"]]},
      {type:"cta", text:"Ver guía completa de fertilidad", url:"/conditions"},
      {type:"refs", items:["Gaskins AJ, Chavarro JE. Diet and fertility: a review. Am J Obstet Gynecol. 2018.","Showell MG, et al. Antioxidants for male subfertility. Cochrane Database. 2014.","Chavarro JE, et al. Diet and lifestyle in the prevention of ovulatory disorder infertility. Obstet Gynecol. 2007.","Unfer V, et al. Myo-inositol effects in women with PCOS. Gynecol Endocrinol. 2012."]},
    ],
    content_en: [
      {type:"h2", text:"Why does nutrition matter so much in fertility?"},
      {type:"p", text:"Spermatogenesis takes ~74 days and oocyte maturation ~90 days. This means dietary changes take 3 months to impact gamete quality. 40-50% of infertility cases have a male factor — both partners should optimize their nutrition."},
      {type:"h2", text:"Key nutrients for female fertility"},
      {type:"table", headers:["Nutrient","Goal/day","Function","Sources"], rows:[["Folic acid","400-800 mcg","Prevents neural tube defects — start 3 months before","Spinach, beans, lentils, supplement"],["Iron","18-27 mg","Ovulation, O₂ transport, implantation","Red meats, legumes + vitamin C"],["Vitamin D","600-2000 IU","Hormonal regulation and oocyte quality","Salmon, egg yolk, sun exposure"],["DHA / Omega-3","200-300 mg","Oocyte quality and prostaglandin regulation","Salmon, sardine, chia, walnuts"],["Coenzyme Q10","200-600 mg","Mitochondrial quality of egg — especially >35 years","Supplement mainly"]]},
      {type:"h2", text:"Key nutrients for male fertility"},
      {type:"table", headers:["Nutrient","Goal/day","Function","Sources"], rows:[["Zinc","11 mg","Testosterone production and spermatogenesis","Oysters, red meat, pumpkin seeds"],["Selenium","55-200 mcg","Sperm motility and antioxidant protection","Brazil nut (1-2/day), tuna, egg"],["Vitamin C","500-1000 mg","Reduces sperm DNA fragmentation","Pepper, kiwi, orange, strawberries"],["Lycopene","4-8 mg","Reduces oxidative damage to sperm DNA","Cooked tomato, watermelon, grapefruit"],["Coenzyme Q10","200-300 mg","Sperm mitochondrial energy and motility","Supplement mainly"]]},
      {type:"h2", text:"Fertility superfoods"},
      {type:"list", items:["Avocado: folate + vitamin E + monounsaturated fats — improves uterine receptivity","Brazil nut (1-2/day): covers daily selenium — key for sperm motility","Whole egg: choline + DHA + vitamin D + B12 — essential preconceptional nutrients","Wild salmon: DHA + vitamin D + astaxanthin — oocyte and sperm quality","Cooked tomato: bioavailable lycopene — protects sperm DNA"]},
      {type:"h2", text:"What to avoid when trying to conceive"},
      {type:"list", items:["Alcohol: damages oocyte and sperm DNA — eliminate completely","Tobacco: reduces ovarian reserve and damages sperm DNA — eliminate completely","Caffeine >200 mg/day: associated with higher miscarriage risk — limit to 1-2 coffees/day","Mercury (swordfish, shark): neurotoxic for fetus — choose salmon, sardine, trout","Severe caloric deficit: suppresses hypothalamic-pituitary-gonadal axis — never < 1200 kcal/day"]},
      {type:"cta", text:"See full fertility guide", url:"/conditions"},
      {type:"refs", items:["Gaskins AJ, Chavarro JE. Diet and fertility: a review. Am J Obstet Gynecol. 2018.","Showell MG, et al. Antioxidants for male subfertility. Cochrane Database. 2014.","Chavarro JE, et al. Diet and lifestyle in the prevention of ovulatory disorder infertility. Obstet Gynecol. 2007."]},
    ],
  },
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
  {
    id: "hipertension-dieta",
    date: "2026-06-26",
    readTime: 8,
    tag_es: "Condiciones clínicas",
    tag_en: "Clinical conditions",
    title_es: "Hipertensión y alimentación: la guía DASH y qué comer para bajar la presión",
    title_en: "Hypertension and diet: the DASH guide and what to eat to lower blood pressure",
    intro_es: "La hipertensión arterial afecta al 30% de los adultos en Latinoamérica y es el principal factor de riesgo cardiovascular. La dieta DASH puede reducir la presión sistólica hasta 11 mmHg — sin medicación. Esta guía te explica cómo aplicarla.",
    intro_en: "Hypertension affects 30% of adults in Latin America and is the leading cardiovascular risk factor. The DASH diet can reduce systolic pressure by up to 11 mmHg — without medication. This guide explains how to apply it.",
    content_es: [
      {type:"h2", text:"¿Qué es la hipertensión arterial?"},
      {type:"p", text:"La hipertensión (HTA) se define como presión arterial ≥ 130/80 mmHg (AHA 2017) o ≥ 140/90 mmHg (OMS). Es asintomática en la mayoría de los casos — por eso se llama 'el asesino silencioso'. A largo plazo daña riñones, corazón, cerebro y vasos sanguíneos."},
      {type:"table", headers:["Categoría","Sistólica","Diastólica"], rows:[["Normal","< 120 mmHg","< 80 mmHg"],["Elevada","120-129 mmHg","< 80 mmHg"],["HTA estadio 1","130-139 mmHg","80-89 mmHg"],["HTA estadio 2","≥ 140 mmHg","≥ 90 mmHg"],["Crisis hipertensiva","> 180 mmHg","> 120 mmHg"]]},
      {type:"h2", text:"La Dieta DASH — evidencia nivel A"},
      {type:"p", text:"La dieta DASH (Dietary Approaches to Stop Hypertension) es el patrón dietético con mayor evidencia para reducir la presión arterial. Estudios clínicos demuestran reducciones de 8-14 mmHg en sistólica y 4-9 mmHg en diastólica en 2-4 semanas."},
      {type:"table", headers:["Grupo alimentario","Porciones/día","Ejemplos"], rows:[["Granos enteros","6-8","Arroz integral, avena, pan integral, quinoa"],["Verduras","4-5","Espinaca, brócoli, zanahoria, betabel, papa"],["Frutas","4-5","Plátano, naranja, mango, melón, kiwi"],["Lácteos bajos en grasa","2-3","Leche descremada, yogur light, queso fresco"],["Proteína magra","≤ 6 oz","Pollo sin piel, pescado, pavo, huevo"],["Nueces y leguminosas","4-5/semana","Almendras, lentejas, frijoles, semillas"],["Grasas y aceites","2-3","Aceite de oliva, aguacate"],["Azúcares añadidos","≤ 5/semana","Limitar dulces, refrescos, jugos"]]},
      {type:"h2", text:"Sodio: el enemigo número 1"},
      {type:"p", text:"Reducir el sodio es la intervención dietética más efectiva para la HTA. Por cada 1g menos de sodio/día, la presión sistólica baja 2-4 mmHg. La meta DASH es < 2,300 mg/día (1 cucharadita de sal). Con < 1,500 mg/día la reducción es aún mayor."},
      {type:"list", items:["Alimentos con más sodio: embutidos, enlatados, quesos curados, sopas instantáneas, salsas, pan industrial","Trucos para reducir sal: usar limón, ajo, hierbas, especias como sustitutos de sabor","Leer etiquetas: buscar < 140 mg sodio por porción (bajo en sodio)","El sodio 'oculto': cereal de caja, pan de molde, aderezos, agua mineral con sodio"]},
      {type:"h2", text:"Potasio, magnesio y calcio — los aliados"},
      {type:"table", headers:["Mineral","Efecto","Meta/día","Fuentes"], rows:[["Potasio","Contrarresta efecto del sodio, relaja vasos","3,500-4,700 mg","Plátano, papa, espinaca, frijoles, aguacate"],["Magnesio","Relaja músculo liso vascular","310-420 mg","Nueces, semillas, leguminosas, chocolate oscuro"],["Calcio","Regula tono vascular","1,000-1,200 mg","Lácteos bajos en grasa, sardinas, brócoli, tofu"]]},
      {type:"h2", text:"Alimentos que AUMENTAN la presión — evitar"},
      {type:"list", items:["Sal y sodio en exceso (> 2,300 mg/día)","Alcohol (> 1 copa/día en mujeres, > 2 en hombres)","Cafeína en exceso (> 4 tazas/día puede elevar PA transitoriamente)","Regaliz (glicirrizina retiene sodio)","Alimentos ultraprocesados: embutidos, frituras, comida rápida","Azúcares añadidos y fructosa en exceso"]},
      {type:"h2", text:"Menú DASH ejemplo (2,000 kcal, 1,500 mg sodio)"},
      {type:"table", headers:["Comida","Alimentos","Sodio aprox."], rows:[["Desayuno","Avena 50g + plátano + leche descremada 200mL + almendras 20g","120 mg"],["Colación","Naranja + nueces 20g","5 mg"],["Almuerzo","Pechuga de pollo 120g + arroz integral 60g + ensalada espinaca + aceite de oliva + betabel","250 mg"],["Colación","Yogur light 150g + fresas","80 mg"],["Cena","Salmón 100g + lenteja 60g + brócoli + papa + AOVE","300 mg"],["Total","","~755 mg sodio"]]},
      {type:"cta", text:"Ver guía completa de hipertensión", url:"/conditions"},
      {type:"refs", items:["Sacks FM, et al. Effects on blood pressure of reduced dietary sodium and the DASH diet. N Engl J Med. 2001.","Appel LJ, et al. A clinical trial of the effects of dietary patterns on blood pressure. N Engl J Med. 1997.","Whelton PK, et al. 2017 ACC/AHA Hypertension Guidelines. J Am Coll Cardiol. 2018."]},
    ],
    content_en: [
      {type:"h2", text:"What is hypertension?"},
      {type:"p", text:"Hypertension is defined as blood pressure ≥ 130/80 mmHg (AHA 2017). It is asymptomatic in most cases — that is why it is called the 'silent killer'. Long-term it damages kidneys, heart, brain and blood vessels."},
      {type:"h2", text:"The DASH Diet — Level A evidence"},
      {type:"p", text:"The DASH diet (Dietary Approaches to Stop Hypertension) is the dietary pattern with the strongest evidence to reduce blood pressure. Clinical studies show reductions of 8-14 mmHg in systolic and 4-9 mmHg in diastolic pressure within 2-4 weeks."},
      {type:"table", headers:["Food group","Servings/day","Examples"], rows:[["Whole grains","6-8","Brown rice, oats, whole wheat bread, quinoa"],["Vegetables","4-5","Spinach, broccoli, carrots, beets, potato"],["Fruits","4-5","Banana, orange, mango, melon, kiwi"],["Low-fat dairy","2-3","Skim milk, light yogurt, fresh cheese"],["Lean protein","≤ 6 oz","Skinless chicken, fish, turkey, eggs"],["Nuts and legumes","4-5/week","Almonds, lentils, beans, seeds"],["Fats and oils","2-3","Olive oil, avocado"]]},
      {type:"h2", text:"Sodium: the number one enemy"},
      {type:"p", text:"Reducing sodium is the most effective dietary intervention for hypertension. For every 1g less sodium per day, systolic pressure drops 2-4 mmHg. The DASH goal is < 2,300 mg/day (1 teaspoon of salt)."},
      {type:"list", items:["High-sodium foods: deli meats, canned foods, aged cheeses, instant soups, sauces","Tips to reduce salt: use lemon, garlic, herbs, spices as flavor substitutes","Read labels: look for < 140 mg sodium per serving (low sodium)"]},
      {type:"cta", text:"See full hypertension guide", url:"/conditions"},
      {type:"refs", items:["Sacks FM, et al. Effects on blood pressure of reduced dietary sodium and the DASH diet. N Engl J Med. 2001.","Whelton PK, et al. 2017 ACC/AHA Hypertension Guidelines. J Am Coll Cardiol. 2018."]},
    ],
  },
  {
    id: "sop-dieta",
    date: "2026-06-26",
    readTime: 9,
    tag_es: "Condiciones clínicas",
    tag_en: "Clinical conditions",
    title_es: "SOP y alimentación: qué comer con síndrome de ovario poliquístico",
    title_en: "PCOS and diet: what to eat with polycystic ovary syndrome",
    intro_es: "El síndrome de ovario poliquístico (SOP) afecta al 8-13% de las mujeres en edad reproductiva y es la causa más común de infertilidad anovulatoria. La resistencia a la insulina está presente en el 70% de los casos. La nutrición es el pilar terapéutico más importante.",
    intro_en: "Polycystic ovary syndrome (PCOS) affects 8-13% of women of reproductive age and is the most common cause of anovulatory infertility. Insulin resistance is present in 70% of cases. Nutrition is the most important therapeutic pillar.",
    content_es: [
      {type:"h2", text:"¿Qué es el SOP y por qué la insulina es clave?"},
      {type:"p", text:"El SOP se diagnostica con 2 de 3 criterios de Rotterdam: oligo/anovulación, hiperandrogenismo clínico o bioquímico, y ovarios poliquísticos en ecografía. La resistencia a la insulina genera hiperinsulinemia que estimula la producción de andrógenos ováricos — causando los síntomas característicos: acné, hirsutismo, irregularidades menstruales e infertilidad."},
      {type:"table", headers:["Criterio","Manifestación"], rows:[["Oligo/anovulación","Ciclos > 35 días o < 8 ciclos/año"],["Hiperandrogenismo","Acné, hirsutismo, alopecia androgénica, testosterona elevada"],["Ovarios poliquísticos","≥ 12 folículos 2-9mm o volumen ovárico > 10 mL"]]},
      {type:"h2", text:"Objetivos nutricionales en SOP"},
      {type:"list", items:["Mejorar sensibilidad a la insulina — reducir hiperinsulinemia","Reducir andrógenos circulantes","Lograr pérdida de peso del 5-10% (si sobrepeso) — restaura ovulación en 55-100% de casos","Reducir inflamación crónica de bajo grado","Mejorar perfil lipídico y presión arterial"]},
      {type:"h2", text:"Índice glucémico bajo — la estrategia central"},
      {type:"p", text:"La dieta de bajo índice glucémico (IG) es la intervención con mayor evidencia en SOP. Reduce insulina postprandial, mejora sensibilidad insulínica y reduce andrógenos. Un estudio de Marsh et al. demostró que la dieta de bajo IG mejora la sensibilidad insulínica un 36% más que una dieta saludable convencional."},
      {type:"table", headers:["Preferir (IG bajo)","Moderar (IG medio)","Evitar (IG alto)"], rows:[["Leguminosas, lentejas","Arroz integral","Pan blanco, arroz blanco"],["Verduras sin almidón","Avena cocida","Cereales de caja azucarados"],["Frutas enteras (manzana, pera, cereza)","Plátano maduro","Jugos de fruta, refrescos"],["Quinoa, cebada","Camote","Papa instantánea, palomitas"],["Pasta al dente","Pan integral","Galletas, pasteles, dulces"]]},
      {type:"h2", text:"Inositol — el suplemento más estudiado en SOP"},
      {type:"p", text:"El mio-inositol y D-chiro-inositol son los suplementos con mayor evidencia en SOP. Actúan como segundos mensajeros de la insulina, mejorando su señalización. Múltiples metaanálisis confirman que reducen insulina en ayuno, andrógenos y mejoran la tasa de ovulación."},
      {type:"table", headers:["Suplemento","Dosis estudiada","Efecto principal","Evidencia"], rows:[["Mio-inositol","2-4 g/día","Mejora ovulación, reduce insulina y andrógenos","Alta (múltiples ECA)"],["D-chiro-inositol","600-1200 mg/día","Reduce andrógenos, mejora sensibilidad insulínica","Moderada"],["Ratio 40:1 (mio:DCI)","2g mio + 50mg DCI/día","Combinación fisiológica óptima","Alta"],["Metformina (comparación)","1500 mg/día","Reduce insulina (fármaco de referencia)","Alta"]]},
      {type:"h2", text:"Otros nutrientes clave"},
      {type:"list", items:["Omega-3 (2-3g EPA+DHA/día): reduce inflamación y andrógenos — sardina, salmón, suplemento","Vitamina D: deficiente en 67-85% de mujeres con SOP — meta 40-60 ng/mL","Magnesio (300-400 mg/día): mejora sensibilidad insulínica — nueces, semillas, leguminosas","Zinc (25-30 mg/día): reduce hirsutismo y acné — ostras, carne, leguminosas","Fibra (25-30g/día): reduce picos de insulina — verduras, leguminosas, semillas de chía"]},
      {type:"h2", text:"Patrón alimentario recomendado"},
      {type:"table", headers:["Comida","Ejemplo SOP-friendly"], rows:[["Desayuno","Huevos revueltos 2 + aguacate + tostada integral + tomate"],["Colación","Almendras 20g + manzana"],["Almuerzo","Salmón 120g + quinoa 60g + ensalada verde + AOVE + limón"],["Colación","Yogur griego sin azúcar + chía + arándanos"],["Cena","Lentejas 80g + espinaca salteada + huevo pochado + pan integral"]]},
      {type:"cta", text:"Ver guía completa de fertilidad y SOP", url:"/conditions"},
      {type:"refs", items:["Teede HJ, et al. Recommendations from the international evidence-based guideline for the assessment and management of PCOS. Hum Reprod. 2018.","Marsh KA, et al. Effect of a low glycemic index compared with a conventional healthy diet on polycystic ovary syndrome. Am J Clin Nutr. 2010.","Unfer V, et al. Myo-inositol effects in women with PCOS: a meta-analysis. Endocr Connect. 2017."]},
    ],
    content_en: [
      {type:"h2", text:"What is PCOS and why is insulin key?"},
      {type:"p", text:"PCOS is diagnosed with 2 of 3 Rotterdam criteria: oligo/anovulation, clinical or biochemical hyperandrogenism, and polycystic ovaries on ultrasound. Insulin resistance generates hyperinsulinemia that stimulates ovarian androgen production — causing characteristic symptoms: acne, hirsutism, menstrual irregularities and infertility."},
      {type:"h2", text:"Low glycemic index — the central strategy"},
      {type:"p", text:"The low glycemic index (GI) diet has the strongest evidence in PCOS. It reduces postprandial insulin, improves insulin sensitivity and reduces androgens. A study by Marsh et al. showed the low GI diet improves insulin sensitivity 36% more than a conventional healthy diet."},
      {type:"table", headers:["Prefer (low GI)","Moderate (medium GI)","Avoid (high GI)"], rows:[["Legumes, lentils","Brown rice","White bread, white rice"],["Non-starchy vegetables","Cooked oats","Sugary breakfast cereals"],["Whole fruits (apple, pear, cherry)","Ripe banana","Fruit juices, sodas"],["Quinoa, barley","Sweet potato","Instant potato, popcorn"]]},
      {type:"h2", text:"Inositol — the most studied supplement in PCOS"},
      {type:"p", text:"Myo-inositol and D-chiro-inositol are the supplements with the strongest evidence in PCOS. They act as insulin second messengers, improving its signaling. Multiple meta-analyses confirm they reduce fasting insulin, androgens and improve ovulation rate."},
      {type:"list", items:["Myo-inositol 2-4g/day: improves ovulation, reduces insulin and androgens","D-chiro-inositol 600-1200 mg/day: reduces androgens","40:1 ratio (myo:DCI): physiologically optimal combination","Omega-3 2-3g EPA+DHA/day: reduces inflammation and androgens","Vitamin D: deficient in 67-85% of women with PCOS — target 40-60 ng/mL"]},
      {type:"cta", text:"See full fertility and PCOS guide", url:"/conditions"},
      {type:"refs", items:["Teede HJ, et al. International evidence-based guideline for PCOS. Hum Reprod. 2018.","Marsh KA, et al. Effect of a low glycemic index diet on PCOS. Am J Clin Nutr. 2010."]},
    ],
  },
  {
    id: "lactancia-nutricion",
    date: "2026-06-26",
    readTime: 7,
    tag_es: "Nutrición especial",
    tag_en: "Special nutrition",
    title_es: "Nutrición durante la lactancia: qué comer para producir leche de calidad",
    title_en: "Nutrition during breastfeeding: what to eat to produce quality milk",
    intro_es: "La lactancia materna es el alimento más completo para el recién nacido. La dieta de la madre influye en la composición de la leche, especialmente en vitaminas liposolubles, omega-3 y yodo. Esta guía te explica exactamente qué comer, qué evitar y qué suplementar.",
    intro_en: "Breastfeeding is the most complete food for the newborn. The mother's diet influences milk composition, especially fat-soluble vitamins, omega-3 and iodine. This guide explains exactly what to eat, what to avoid and what to supplement.",
    content_es: [
      {type:"h2", text:"Requerimientos calóricos en la lactancia"},
      {type:"p", text:"La producción de leche materna requiere aproximadamente 500 kcal adicionales por día durante los primeros 6 meses. Sin embargo, las madres que tienen reservas de grasa del embarazo pueden movilizarlas y requerir solo 300-400 kcal extra. No se recomienda restricción calórica severa durante la lactancia."},
      {type:"table", headers:["Período","Requerimiento calórico extra","Producción de leche"], rows:[["0-6 meses (lactancia exclusiva)","+500 kcal/día","750-800 mL/día"],["6-12 meses (con complementarios)","+400 kcal/día","600 mL/día"],["Madres con sobrepeso","+300 kcal/día","Movilización de grasa corporal"]]},
      {type:"h2", text:"Macronutrientes — qué cambia durante la lactancia"},
      {type:"table", headers:["Nutriente","Meta lactancia","Por qué importa"], rows:[["Proteína","1.3 g/kg/día (+25g/día)","Síntesis de proteínas lácteas"],["Grasa","35-40% de kcal totales","Calidad de ácidos grasos en leche"],["DHA","200-300 mg/día","Desarrollo cerebral y visual del bebé"],["Carbohidratos","45-65% de kcal","Fuente de lactosa en leche"]]},
      {type:"h2", text:"Micronutrientes críticos en la lactancia"},
      {type:"table", headers:["Nutriente","Meta/día","Consecuencia de déficit","Fuentes"], rows:[["Yodo","290 mcg/día","Hipotiroidismo neonatal, retraso cognitivo","Sal yodada, mariscos, lácteos"],["Vitamina D","600-800 UI/día (madre)","Raquitismo en bebé (leche pobre en Vit D)","Sol, suplemento — bebé necesita 400 UI/día"],["Vitamina B12","2.8 mcg/día","Déficit neurológico grave en bebé","Carnes, huevo, lácteos — veganas DEBEN suplementar"],["Calcio","1,000 mg/día","Desmineralización ósea materna","Lácteos, sardinas, tofu, brócoli"],["Colina","550 mg/día","Desarrollo cerebral del bebé","Huevo (yema), hígado, soya"],["DHA","200-300 mg/día","Desarrollo neurológico subóptimo","Salmón, sardina, suplemento"]]},
      {type:"h2", text:"Alimentos que SÍ aumentan la producción de leche (galactogogos)"},
      {type:"list", items:["Avena: β-glucanos estimulan prolactina — 1 taza/día","Semillas de fenogreco (fenugreek): 1,750 mg 3 veces/día — evidencia moderada","Levadura de cerveza: rica en B vitaminas y cromo","Almendras y nueces: grasas saludables que enriquecen la leche","Hinojo: anetol actúa como fitoestrogéno estimulante de prolactina","Lo más importante: hidratación adecuada (2.5-3L agua/día) y succión frecuente del bebé"]},
      {type:"h2", text:"Qué EVITAR durante la lactancia"},
      {type:"list", items:["Alcohol: pasa a la leche — esperar 2-3h por bebida antes de amamantar","Cafeína: < 300 mg/día (2-3 tazas) — el bebé metaboliza lento","Pez espada, tiburón, caballa rey: alto mercurio — máximo 2 porciones/semana de pescado bajo en mercurio","Dieta de eliminación sin diagnóstico: no eliminar lácteos/gluten sin evidencia de alergia en bebé","Restricción calórica severa: < 1,500 kcal afecta producción de leche"]},
      {type:"h2", text:"Suplementación recomendada"},
      {type:"table", headers:["Suplemento","Dosis","Indicación"], rows:[["Vitamina D","1,000-2,000 UI/día madre + 400 UI/día bebé","Universal — leche materna pobre en Vit D"],["DHA","200-300 mg/día","Si < 2 porciones/semana de pescado graso"],["Yodo","150-200 mcg/día (si no usa sal yodada)","Especialmente vegetarianas/veganas"],["Vitamina B12","1,000 mcg/día","OBLIGATORIO en veganas"],["Hierro","Solo si ferritina < 12 ng/mL","No rutinario postparto"]]},
      {type:"cta", text:"Ver guía completa de embarazo y lactancia", url:"/conditions"},
      {type:"refs", items:["Koletzko B, et al. Nutrition during pregnancy, lactation and early childhood. Ann Nutr Metab. 2019.","Bravi F, et al. Impact of maternal nutrition on breast-milk composition. Am J Clin Nutr. 2016.","WHO. Guideline: Protecting, promoting and supporting breastfeeding. 2017."]},
    ],
    content_en: [
      {type:"h2", text:"Caloric requirements during breastfeeding"},
      {type:"p", text:"Breast milk production requires approximately 500 extra calories per day during the first 6 months. Mothers with pregnancy fat reserves can mobilize them and may only need 300-400 extra kcal. Severe caloric restriction is not recommended during breastfeeding."},
      {type:"h2", text:"Critical micronutrients in breastfeeding"},
      {type:"table", headers:["Nutrient","Daily goal","Consequence of deficiency","Sources"], rows:[["Iodine","290 mcg/day","Neonatal hypothyroidism, cognitive delay","Iodized salt, seafood, dairy"],["Vitamin D","600-800 IU/day (mother)","Rickets in baby (breast milk poor in Vit D)","Sun, supplement — baby needs 400 IU/day"],["Vitamin B12","2.8 mcg/day","Severe neurological deficit in baby","Meat, eggs, dairy — vegans MUST supplement"],["Calcium","1,000 mg/day","Maternal bone demineralization","Dairy, sardines, tofu, broccoli"],["DHA","200-300 mg/day","Suboptimal neurological development","Salmon, sardine, supplement"]]},
      {type:"h2", text:"What to AVOID during breastfeeding"},
      {type:"list", items:["Alcohol: passes into milk — wait 2-3h per drink before breastfeeding","Caffeine: < 300 mg/day (2-3 cups) — baby metabolizes slowly","Swordfish, shark, king mackerel: high mercury","Severe caloric restriction: < 1,500 kcal affects milk production"]},
      {type:"h2", text:"Recommended supplementation"},
      {type:"table", headers:["Supplement","Dose","Indication"], rows:[["Vitamin D","1,000-2,000 IU/day mother + 400 IU/day baby","Universal — breast milk poor in Vit D"],["DHA","200-300 mg/day","If < 2 servings/week of fatty fish"],["Vitamin B12","1,000 mcg/day","MANDATORY for vegans"]]},
      {type:"cta", text:"See full pregnancy and breastfeeding guide", url:"/conditions"},
      {type:"refs", items:["Koletzko B, et al. Nutrition during pregnancy, lactation and early childhood. Ann Nutr Metab. 2019.","WHO. Guideline: Protecting, promoting and supporting breastfeeding. 2017."]},
    ],
  },
  {
    id: "cancer-nutricion",
    date: "2026-06-26",
    readTime: 9,
    tag_es: "Condiciones clínicas",
    tag_en: "Clinical conditions",
    title_es: "Nutrición y cáncer: qué comer durante y después del tratamiento",
    title_en: "Nutrition and cancer: what to eat during and after treatment",
    intro_es: "La desnutrición afecta al 40-80% de los pacientes con cáncer y es causa directa del 20% de las muertes oncológicas. Una intervención nutricional oportuna mejora la respuesta al tratamiento, reduce complicaciones y mejora la calidad de vida. Esta guía explica los principios basados en evidencia.",
    intro_en: "Malnutrition affects 40-80% of cancer patients and is a direct cause of 20% of oncological deaths. Timely nutritional intervention improves treatment response, reduces complications and improves quality of life. This guide explains the evidence-based principles.",
    content_es: [
      {type:"h2", text:"¿Por qué el cáncer causa desnutrición?"},
      {type:"p", text:"El cáncer genera desnutrición por múltiples mecanismos: el tumor consume glucosa en exceso (efecto Warburg), produce citocinas proinflamatorias (TNF-α, IL-6) que generan caquexia, y el tratamiento (quimioterapia, radioterapia, cirugía) causa náuseas, mucositis, disfagia, anorexia y alteraciones del gusto que reducen la ingesta."},
      {type:"table", headers:["Mecanismo","Consecuencia nutricional"], rows:[["Efecto Warburg (glucólisis tumoral)","Mayor demanda calórica, pérdida de masa muscular"],["Caquexia (TNF-α, IL-6)","Pérdida de músculo y grasa irreversible sin restricción calórica"],["Náuseas/vómito por quimio","Reducción de ingesta, deshidratación"],["Mucositis","Dolor al comer, reducción de ingesta oral"],["Alteración del gusto","Aversiones alimentarias, anorexia"]]},
      {type:"h2", text:"Requerimientos nutricionales en oncología"},
      {type:"table", headers:["Nutriente","Requerimiento en cáncer","Justificación"], rows:[["Energía","25-35 kcal/kg/día","Según estado nutricional y tipo de cáncer"],["Proteína","1.2-2.0 g/kg/día","Preservar masa muscular, cicatrización"],["Omega-3 EPA","2-3 g/día","Reduce caquexia, inflamación — evidencia moderada"],["Vitamina D","Mantener > 40 ng/mL","Déficit asociado a peor pronóstico oncológico"],["Zinc","RDA estándar","Cicatrización, función inmune, gusto"]]},
      {type:"h2", text:"Patrón alimentario anticáncer — prevención y durante tratamiento"},
      {type:"list", items:["Verduras crucíferas (brócoli, coliflor, col): sulforafano con actividad antiproliferativa","Tomate cocido: licopeno biodisponible — asociado a menor riesgo de cáncer de próstata","Bayas y frutos rojos: antocianinas antioxidantes","Ajo y cebolla: alicina, quercetina con actividad antitumoral en estudios in vitro","Cúrcuma + pimienta negra: curcumina con efecto antiinflamatorio (biodisponibilidad aumenta 20x con piperina)","Té verde: EGCG con actividad antiproliferativa","Leguminosas: fibra fermentable, fitatos protectores","Aceite de oliva extra virgen: oleocantal con efecto similar a ibuprofeno antiinflamatorio"]},
      {type:"h2", text:"Alimentos a limitar — evidencia WCRF/AICR"},
      {type:"table", headers:["Alimento","Evidencia de riesgo","Tipo de cáncer asociado"], rows:[["Carnes procesadas (embutidos)","Convincente","Colorrectal — clasificado IARC grupo 1"],["Carne roja > 500g/semana","Probable","Colorrectal"],["Alcohol","Convincente","Boca, faringe, esófago, hígado, mama, colorrectal"],["Sobrepeso/obesidad","Convincente","13 tipos de cáncer"],["Aflatoxinas (maíz/maní mal almacenado)","Convincente","Hígado"]]},
      {type:"h2", text:"Manejo nutricional por síntoma"},
      {type:"table", headers:["Síntoma","Estrategia nutricional"], rows:[["Náuseas","Comidas frías o temperatura ambiente, pequeñas y frecuentes, evitar olores fuertes, jengibre"],["Mucositis","Alimentos suaves, fríos, húmedos — evitar ácidos, picantes, temperatura extrema"],["Disfagia","Dieta de textura modificada, espesantes, suplementos líquidos"],["Xerostomía (boca seca)","Sorbos frecuentes de agua, alimentos húmedos, saliva artificial"],["Diarrea por quimio","Dieta baja en fibra, BRAT (banana, arroz, manzana, tostada), probióticos"],["Anorexia","Enriquecimiento calórico-proteico, horario de comidas, suplementos orales (Ensure, Nutren)"]]},
      {type:"h2", text:"Suplementos — qué dice la evidencia"},
      {type:"list", items:["Omega-3 EPA (2-3g/día): reduce caquexia y mejora respuesta a quimio — evidencia moderada (ESPEN 2021)","Vitamina D: corregir déficit (meta 40-60 ng/mL) — asociado a mejor pronóstico","Glutamina: reduce mucositis en radioterapia de cabeza y cuello — evidencia moderada","Probióticos: reducen diarrea por quimio — seleccionar cepas estudiadas (Lactobacillus rhamnosus GG)","EVITAR megadosis de antioxidantes durante quimio/radio: pueden interferir con el mecanismo terapéutico"]},
      {type:"cta", text:"Ver guía completa de nutrición y cáncer", url:"/conditions"},
      {type:"refs", items:["Arends J, et al. ESPEN guidelines on nutrition in cancer patients. Clin Nutr. 2017.","World Cancer Research Fund/AICR. Diet, Nutrition, Physical Activity and Cancer: a Global Perspective. 2018.","Fearon K, et al. Definition and classification of cancer cachexia. Lancet Oncol. 2011."]},
    ],
    content_en: [
      {type:"h2", text:"Why does cancer cause malnutrition?"},
      {type:"p", text:"Cancer causes malnutrition through multiple mechanisms: the tumor consumes excess glucose (Warburg effect), produces pro-inflammatory cytokines (TNF-α, IL-6) that generate cachexia, and treatment (chemotherapy, radiotherapy, surgery) causes nausea, mucositis, dysphagia, anorexia and taste alterations that reduce intake."},
      {type:"h2", text:"Nutritional requirements in oncology"},
      {type:"table", headers:["Nutrient","Requirement in cancer","Justification"], rows:[["Energy","25-35 kcal/kg/day","According to nutritional status and cancer type"],["Protein","1.2-2.0 g/kg/day","Preserve muscle mass, wound healing"],["Omega-3 EPA","2-3 g/day","Reduces cachexia, inflammation — moderate evidence"],["Vitamin D","Maintain > 40 ng/mL","Deficiency associated with worse oncological prognosis"]]},
      {type:"h2", text:"Foods to limit — WCRF/AICR evidence"},
      {type:"table", headers:["Food","Risk evidence","Associated cancer type"], rows:[["Processed meats (deli meats)","Convincing","Colorectal — IARC group 1"],["Red meat > 500g/week","Probable","Colorectal"],["Alcohol","Convincing","Mouth, pharynx, esophagus, liver, breast, colorectal"],["Overweight/obesity","Convincing","13 types of cancer"]]},
      {type:"h2", text:"Symptom-based nutritional management"},
      {type:"table", headers:["Symptom","Nutritional strategy"], rows:[["Nausea","Cold or room temperature foods, small and frequent, avoid strong smells, ginger"],["Mucositis","Soft, cold, moist foods — avoid acidic, spicy, extreme temperature"],["Dysphagia","Modified texture diet, thickeners, liquid supplements"],["Diarrhea from chemo","Low fiber diet, BRAT (banana, rice, apple, toast), probiotics"],["Anorexia","Caloric-protein enrichment, meal schedule, oral supplements"]]},
      {type:"cta", text:"See full cancer and nutrition guide", url:"/conditions"},
      {type:"refs", items:["Arends J, et al. ESPEN guidelines on nutrition in cancer patients. Clin Nutr. 2017.","World Cancer Research Fund/AICR. Diet, Nutrition, Physical Activity and Cancer. 2018."]},
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
  const activePost = active ? POSTS.find(p=>p.id===active) : null;
  const blogSchema = activePost ? {
    "@context":"https://schema.org","@type":"BlogPosting",
    "headline": isES ? activePost.title_es : activePost.title_en,
    "description": isES ? activePost.intro_es : activePost.intro_en,
    "url": "https://nutrionally.com/blog#"+activePost.id,
    "datePublished": activePost.date, "dateModified": activePost.date,
    "inLanguage": isES?"es":"en",
    "image":{"@type":"ImageObject","url":"https://nutrionally.com/og-image.png","width":1200,"height":630},
    "author":{"@type":"Organization","name":"Nutrionally","url":"https://nutrionally.com"},
    "publisher":{"@type":"Organization","name":"Nutrionally","url":"https://nutrionally.com","logo":{"@type":"ImageObject","url":"https://nutrionally.com/favicon.svg"}},
    "mainEntityOfPage":{"@type":"WebPage","@id":"https://nutrionally.com/blog#"+activePost.id},
    "keywords": isES ? activePost.tag_es : activePost.tag_en
  } : null;
  if(isES){useMeta({title: activePost?activePost.title_es+" — Nutrionally":"Blog de nutrición clínica — Nutrionally", description: activePost?activePost.intro_es:"Artículos de nutrición clínica basados en evidencia: IMC, diabetes, índice glucémico, tiroides, gota, embarazo y más.", url: activePost?"https://nutrionally.com/blog#"+activePost.id:"https://nutrionally.com/blog", schema:blogSchema});}
  else{useMeta({title: activePost?activePost.title_en+" — Nutrionally":"Clinical nutrition blog — Nutrionally", description: activePost?activePost.intro_en:"Evidence-based clinical nutrition articles: BMI, diabetes, glycemic index, thyroid, gout, pregnancy and more.", url: activePost?"https://nutrionally.com/blog#"+activePost.id:"https://nutrionally.com/blog", schema:blogSchema});}
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

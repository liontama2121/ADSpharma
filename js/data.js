// ADS PHARMA — Portafolio de productos.
// Datos clínicos transcritos del portafolio oficial. Información dirigida a profesionales de la salud.

const LINEAS = {
  cardiovascular: { nombre: "Cardiovascular", color: "#FF5B2E", color2: "#FF8A3D" },
  anestesicos:    { nombre: "Anestésicos",    color: "#2ED47A", color2: "#7CE6A8" },
  antibioticos:   { nombre: "Antibióticos",   color: "#25B7E8", color2: "#6DD3F1" },
  antidotos:      { nombre: "Antídotos",      color: "#B7295A", color2: "#E54E85" },
  neuro:          { nombre: "Antiepiléptico", color: "#4DA8FF", color2: "#7CC2FF" },
  diuretico:      { nombre: "Antidiurético",  color: "#29C5E8", color2: "#6BDAF0" },
  respiratorio:   { nombre: "Respiratorio",   color: "#C08B5C", color2: "#D9B187" }
};

const PRODUCTOS = [
  {
    id: "levosidax",
    nombre: "LEVOSIDAX",
    principioActivo: "Levosimendan 12,5 mg / 5 mL",
    presentacion: "Solución inyectable",
    linea: "cardiovascular",
    registro: "INVIMA 2015M-0016519",
    imagen: "",
    indicaciones: "Tratamiento a corto plazo de falla cardíaca crónica severa agudamente descompensada; falla cardíaca aguda; falla cardíaca aguda postquirúrgica; falla cardíaca aguda post infarto agudo de miocardio. Coadyuvante cuando la terapia convencional es insuficiente y se requiere terapia inotrópica de apoyo.",
    dosis: "Iniciar con dosis de carga de 6 a 12 µg/kg infundidos durante 10 minutos, seguidos de infusión continua de 0,1 µg/kg/min. La dosis de carga más baja (6 µg/kg) se recomienda para pacientes que reciben vasodilatadores e inotrópicos. Duración recomendada de la infusión en ICC descompensada: 24 horas.",
    contraindicaciones: "Hipersensibilidad a sus excipientes; hipotensión severa y taquicardia; obstrucción mecánica marcada que afecta el llenado ventricular y/o el flujo de salida; deterioro renal severo (depuración de creatinina < 30 mL/min) y deterioro hepático severo; historial de torsades de pointes.",
    precauciones: "Usar con precaución en daño hepático o renal leve a moderado; en hipotensión, taquicardia o fibrilación auricular con respuesta ventricular rápida; monitorización ECG estricta en alargamiento del intervalo QT; administrar bajo monitorización continua del gasto cardíaco y la presión de llenado.",
    ram: "En estudios clínicos controlados con placebo en ICAD (REVIVE), 53% de los pacientes experimentaron reacciones adversas; las más frecuentes: taquicardia ventricular, hipotensión y cefalea.",
    disolucion: "Para infusión de 0,025 mg/mL, mezclar 5 mL de Levosimendan concentrado (2,5 mg/mL) en 500 mL de dextrosa al 5%. Si se requiere, usar 495 mL de SSN 0,9%. Estabilidad química y física demostrada en 24 horas a 25 °C.",
    tabla: null
  },
  {
    id: "metoprolol",
    nombre: "METOPROLOL TARTRATO",
    principioActivo: "Metoprolol tartrato 5 mg / 5 mL",
    presentacion: "Solución inyectable",
    linea: "cardiovascular",
    registro: "INVIMA 2019M-0019459 · CUM 1M1025331000",
    imagen: "",
    indicaciones: "Antiarrítmico, antianginoso, antihipertensor; taquiarritmias supraventriculares y ventriculares; sospecha o confirmación de infarto agudo de miocardio; prevención secundaria tras infarto.",
    dosis: "Ampollas: inicialmente 5 mg en dosis de 1 a 2 mg/min. Puede repetirse a intervalos de 5 minutos hasta el efecto deseado. Dosis usual 10 a 15 mg. Dosis de 20 mg o más no aportan mayor ventaja. Monitorear TA y EKG durante el tratamiento.",
    contraindicaciones: "Asma bronquial o broncoespasmo, hipoglicemia, acidosis metabólica, bradicardia sinusal o bloqueo cardíaco parcial, embarazo, lactancia, insuficiencia cardíaca incipiente o manifiesta (salvo digitalización previa). No administrar antagonistas del calcio tipo verapamilo IV en pacientes con betabloqueantes.",
    precauciones: "Con clonidina, interrumpir el betabloqueante varios días antes. Potencia efecto inotrópico y dromotrópico negativo de quinidina y amiodarona. Concentración plasmática disminuida por rifampicina, aumentada por cimetidina. Aumenta toxicidad de lidocaína.",
    ram: "Muy frecuente: cansancio. Frecuentes: mareos, cefaleas, enlentecimiento del ritmo cardíaco, náuseas, dolor abdominal, sensación de ahogo al esfuerzo, manos y pies fríos, diarrea, estreñimiento, palpitaciones. Poco frecuentes: calambres, depresión, somnolencia, insomnio, pesadillas, vómitos, erupción cutánea, aumento de peso.",
    disolucion: "",
    tabla: null
  },
  {
    id: "docarip",
    nombre: "DOCARIP",
    principioActivo: "Clorhidrato de Dobutamina 1 mg/mL x 250 mL",
    presentacion: "Solución inyectable premezclada",
    linea: "cardiovascular",
    registro: "INVIMA 2015M-0016444",
    imagen: "",
    indicaciones: "Apoyo inotrópico en insuficiencia cardíaca asociada a infarto de miocardio, cardiomiopatías y choque cardiogénico.",
    dosis: "0,5–1 mcg/kg/min IV en infusión continua inicialmente, luego 2–20 mcg/kg/min; no exceder 40 mcg/kg/min.",
    contraindicaciones: "Hipersensibilidad, glaucoma, anestesia con hidrocarburos, daño cerebral e insuficiencia coronaria.",
    precauciones: "Precaución en embarazo, ancianos, enfermedades cardiovasculares, hipertensión, diabetes, hipertiroidismo y pacientes psiconeuróticos.",
    ram: "Taquiarritmia (~10%), hipertensión (7,5%), miocarditis eosinofílica (≤7%), latidos ventriculares prematuros (5%), angina (1-3%), disnea (1-3%), fiebre (1-3%), dolor de cabeza (1-3%), náusea (1-3%), palpitación (1-3%).",
    disolucion: "Premezclado en 250 mL de dextrosa al 5%. Vigilar el ECG antes del inicio.",
    tabla: null
  },
  {
    id: "milrinona",
    nombre: "MILRINONA",
    principioActivo: "Milrinona 10 mg / 10 mL",
    presentacion: "Solución inyectable",
    linea: "cardiovascular",
    registro: "INVIMA 2009M-0009853",
    imagen: "",
    indicaciones: "Tratamiento de la insuficiencia cardíaca congestiva.",
    dosis: "Dosis de carga de 50 mcg/kg en bolo IV durante 10 minutos, luego 0,375–0,75 mcg/kg/min IV; mantenimiento 1,13 mg/kg/día. Monitorear electrolitos, función renal y presión arterial.",
    contraindicaciones: "",
    precauciones: "Ante fase aguda del infarto y descensos importantes de presión arterial: interrumpir hasta el restablecimiento y reanudar a tasa menor.",
    ram: ">10% arritmias ventriculares; arritmia supraventricular (4%), dolor de cabeza (3%), hipotensión (3%), angina/dolor en el pecho (1%).",
    disolucion: "Diluir a 200 mcg/mL. Examinar a la luz; no usar si hay decoloración. Compatibles: dextrosa 5%, SSN 0,9% y lactato de Ringer.",
    tabla: null
  },
  {
    id: "noltron",
    nombre: "NOLTRON",
    principioActivo: "Norepinefrina Bitartrato 4 mg / 4 mL",
    presentacion: "Solución inyectable",
    linea: "cardiovascular",
    registro: "INVIMA 2014M-0003455-R1",
    imagen: "",
    indicaciones: "Estados hipotensivos agudos, paro cardíaco, sepsis y choque séptico.",
    dosis: "Generalmente por infusión IV como solución de 4 mcg/mL de norepinefrina base. Inicial: 8–12 mcg/min, titular según efecto. Mantenimiento: 2–4 mcg/min IV.",
    contraindicaciones: "",
    precauciones: "Pacientes con IMAO o antidepresivos tricíclicos y con antecedentes de reacciones alérgicas al bisulfito de sodio: vigilar la presión arterial por riesgo de hipertensión y por posibilidad de extravasación.",
    ram: "Bradicardia, hipertensión, arritmias, confusión, ansiedad, disnea, dolor de cabeza, náuseas y vómitos.",
    disolucion: "Diluir en 250 a 1000 mL de solución compatible (16 mcg–4 mcg respectivamente), según necesidad. Dextrosa 5%.",
    tabla: null
  },
  {
    id: "myoritmo",
    nombre: "MYORITMO",
    principioActivo: "Betametildigoxina",
    presentacion: "Ampolla 0,2 mg/2 mL · Frasco 0,6 mg/10 mL · Tableta 0,1 mg",
    linea: "cardiovascular",
    registro: "INVIMA Ampolla 2018M-0018409 / Frasco 2008M-0008861 / Tableta 2013M-0014399",
    imagen: "",
    indicaciones: "Arritmias supraventriculares como fibrilación auricular e insuficiencia cardíaca congestiva.",
    dosis: "",
    contraindicaciones: "",
    precauciones: "Precaución en bloqueo cardíaco, miocarditis aguda, daño renal o con diuréticos. Dosis cuidadosamente controlada. No administrar con calcio IV, extractos de paratiroides ni vitamina D. Precaución en bloqueo parcial del corazón (puede inducir bloqueo completo), alteraciones del nodo sinusal, infarto agudo, ICC avanzada y neumopatía grave.",
    ram: "Mareos (4,9%), alteraciones mentales (4,1%), diarrea (3,2%), cefalea (3,2%), náusea (3,2%), vómitos (1,6%), erupción maculopapular (1,6%).",
    disolucion: "VO no requiere dilución. Ampolla compatible con SSN y/o dextrosa; si se diluye, administrar en menos de 5 minutos por infusión.",
    tabla: {
      titulo: "Ampolla IV",
      headers: ["Indicación", "Dosis adulto", "Dosis pediatría"],
      rows: [
        ["Arritmias supraventriculares (fibrilación auricular)",
         "IV: 8-12 mcg/kg (0,008-0,012 mg/kg) dosis de carga total; administrar 50% inicialmente, luego 1/4 de la carga q6-8 h dos veces; evaluación cuidadosa antes de cada dosis",
         ">10 años y <100 kg. Primera dosis de carga 4-6 mcg/kg; 2a y 3a 2-3 mcg/kg q6-8 h; mantenimiento 2-3 mcg/kg/día"],
        ["Insuficiencia cardíaca congestiva",
         "0,125-0,25 mg PO/IV día; dosis más altas (0,375-0,5 mg/día) raras veces",
         ">10 años y <100 kg. Carga 4-6 mcg/kg; 2a y 3a 2-3 mcg/kg q6-8 h; mantenimiento 2-3 mcg/kg/día"]
      ]
    }
  },
  {
    id: "diblorec",
    nombre: "DIBLOREC",
    principioActivo: "Labetalol Clorhidrato 100 mg / 20 mL",
    presentacion: "Solución inyectable",
    linea: "cardiovascular",
    registro: "INVIMA 2011M-0011837",
    imagen: "",
    indicaciones: "Emergencia hipertensiva, incluida la del embarazo; episodios hipertensivos tras infarto agudo de miocardio; hipotensión controlada durante la cirugía.",
    dosis: "",
    contraindicaciones: "",
    precauciones: "Precaución en anestesia/cirugía por depresión miocárdica, insuficiencia cerebrovascular, diabetes mellitus, hipertiroidismo o tirotoxicosis, insuficiencia hepática, insuficiencia renal, enfermedad vascular periférica, función ventricular izquierda comprometida, ICC y feocromocitoma. Riesgo aumentado de ACV tras cirugía; lesión hepática grave reportada. En uso prolongado, la interrupción súbita puede exacerbar angina y conducir a infarto. No recomendado en enfermedad broncoespástica.",
    ram: "Mareo (1-20%), náuseas (≤19%), fatiga (1-11%).",
    disolucion: "Premezclado en 250 mL de dextrosa 5%. Diluir en 100-150 mL de solución compatible. Compatibles: dextrosa 5%; SSN 0,9%.",
    tabla: {
      headers: ["Indicación", "Dosis adulto", "Dosis pediatría"],
      rows: [
        ["Emergencia hipertensiva (incl. embarazo)",
         "20 mg IV durante 2 min inicialmente, luego 40-80 mg IV cada 10 min; dosis total no superior a 300 mg. Alternativa: 1-2 mg/min por infusión IV continua (dosis total usada 300 mg)",
         "0,4-1 mg/kg/h por infusión IV continua; no exceder 3 mg/kg/h"],
        ["Episodios hipertensivos tras infarto agudo de miocardio",
         "20 mg IV durante 2 min inicialmente, luego 40-80 mg IV cada 10 min; total no superior a 300 mg. Alternativa: 1-2 mg/min infusión IV continua",
         "0,4-1 mg/kg/h por infusión IV continua; no exceder 3 mg/kg/h"]
      ]
    }
  },
  {
    id: "amiodarona",
    nombre: "AMIODARONA",
    principioActivo: "Amiodarona Clorhidrato 150 mg / 3 mL",
    presentacion: "Solución inyectable",
    linea: "cardiovascular",
    registro: "INVIMA 2008M-0008550",
    imagen: "",
    indicaciones: "Taquiarritmias supraventriculares nodales y ventriculares, y síndrome de Wolff-Parkinson-White.",
    dosis: "Infusión IV con bomba mediante catéter venoso central. Dosis usual 5 mg/kg en 250 mL de dextrosa 5%, a pasar entre 20 minutos y 2 horas. Mantenimiento: 10 a 20 mg/kg/24 h (usualmente 600 a 800 mg/24 h y hasta 1.200 mg/24 h) diluidos en 250 mL de dextrosa 5% durante 5 días.",
    contraindicaciones: "",
    precauciones: "Monitoreo continuo de TA y ECG. Especial atención en hipotensión arterial, insuficiencia respiratoria severa, cardiomiopatía descompensada o insuficiencia cardíaca severa.",
    ram: "Aumento de AST/ALT (3-20%, hasta 40-50% en algunos estudios), hipotensión (16%), mareos (3-40%), dolor de cabeza (3-40%) y malestar (3-40%).",
    disolucion: "Diluir a 1-2 mg/mL. Infundir durante 60 minutos. Compatibles: dextrosa 5%; SSN 0,9%.",
    tabla: null
  },
  {
    id: "nitroglicerina",
    nombre: "NITROGLICERINA",
    principioActivo: "Nitroglicerina 0,1 y 0,2 mg/mL",
    presentacion: "Solución inyectable premezclada · Presentaciones: 0,1 mg/mL x 200 mL en dextrosa 5%; 0,2 mg/mL x 250 mL en dextrosa 5%",
    linea: "cardiovascular",
    registro: "INVIMA 2015M-0016180 / 2015M-0016339",
    imagen: "",
    indicaciones: "Prevención y tratamiento de la angina de pecho.",
    dosis: "",
    contraindicaciones: "Hipersensibilidad a nitritos, anemia severa y presión intracraneal o intraocular aumentada.",
    precauciones: "La nitroglicerina migra fácilmente en muchos plásticos, incluido el PVC; su absorción por tubos de PVC aumenta cuando la tubería es larga, el flujo bajo y la concentración alta.",
    ram: "Dolor de cabeza, hipotensión, taquicardia, disnea, mareos, visión borrosa, nerviosismo, xerostomía.",
    disolucion: "Premezclado: 50 mg/250 mL en dextrosa 5%; 20 mg/200 mL en dextrosa 5%.",
    tabla: {
      headers: ["Indicación", "Dosis adulto", "Dosis pediatría"],
      rows: [
        ["Angina de pecho",
         "Inicial: infusión 0,5 mcg/min. Aumentar 5 mcg/min cada 3-5 min hasta respuesta. Si 20 mcg/min es inadecuado, aumentar 10-20 mcg/min cada 3-5 min. Dosis máxima 400 mcg/min",
         "Inicial 0,25-0,5 mcg/kg/min. Titular en incrementos de 0,5-1 mcg/kg/min cada 3-5 min. Habitual 1-3 mcg/kg/min. Máxima 5 mcg/kg/min (neonatos: no exceder 20 mcg/kg/min)"]
      ]
    }
  },
  {
    id: "vasopresina",
    nombre: "VASOPRESINA",
    principioActivo: "Vasopresina 20 UI / mL",
    presentacion: "Solución inyectable",
    linea: "cardiovascular",
    registro: "INVIMA 2015M-0016458",
    imagen: "",
    indicaciones: "Distensión abdominal, diabetes insípida, hemorragias gastrointestinales y choque séptico.",
    dosis: "",
    contraindicaciones: "",
    precauciones: "En hemorragia intestinal continuar la infusión 12-24 h tras detenerse; disminuir la dosis en 24-48 h. Infusión continua mediante dispositivo controlado. Precaución en nefritis crónica con retención de nitrógeno, pre/postoperatorios con poliuria, convulsiones, migraña, asma, ICC, enfermedad vascular, angina de pecho, trombosis coronaria y enfermedad renal.",
    ram: "Calambres abdominales, reacción alérgica, angina, constricción bronquial, palidez circumoral, diarrea, náusea, transpiración, temblor, contracción uterina y vértigo.",
    disolucion: "Diluir a concentraciones de 0,1-1 unidad. Velocidad inicial 0,2-0,4 U/min, aumentar hasta 0,9; dextrosa 5%.",
    tabla: {
      headers: ["Indicación", "Dosis adulto", "Dosis pediatría"],
      rows: [
        ["Distensión abdominal", "5 U IM inicialmente; repetir cada 3-4 h PRN; puede aumentarse a 10 U", "A criterio médico"],
        ["Diabetes insípida", "5-10 U IM/SC cada 8-12 h. Titular con base en suero sódico, osmolaridad sérica, balance de fluidos y producción de orina", "2,5-10 U IM/SC cada 8-12 h. Infusión IV continua: 0,0005 U/kg/h inicialmente, doblar cada 30 min; no exceder 0,01 U/kg/h"],
        ["Hemorragias gastrointestinales", "0,2-0,4 U/min IV inicialmente; puede aumentarse a 0,8 U/min IV PRN", "0,3 U/kg IV; no exceder 20 U. 0,002-0,005 U/kg/min; puede aumentar a 0,01 U/kg/min. Si se controla 12-24 h, reducir gradualmente 24-36 h"],
        ["Shock séptico", "0,01-0,04 U/min IV", "A criterio médico"]
      ]
    }
  },
  {
    id: "miocurim",
    nombre: "MIOCURIM",
    principioActivo: "Cisatracurio 10 mg / 5 mL",
    presentacion: "Solución inyectable",
    linea: "anestesicos",
    registro: "INVIMA 2012M-0012873",
    imagen: "",
    indicaciones: "Facilita la entubación endotraqueal, coadyuvante de la anestesia general y relajación muscular durante la cirugía y ventilación mecánica en cirugía y UCI.",
    dosis: "",
    contraindicaciones: "",
    precauciones: "Hipersensibilidad a otros bloqueantes neuromusculares (sensibilidad cruzada), miastenia gravis y otras enfermedades neuromusculares (dosis inicial máxima 0,02 mg/kg) y pacientes quemados. Puede ocurrir bradicardia. Instituciones que lo utilizan: Fundación Santa Fe (Bogotá), Fundación Valle de Lili (Cali), Clínica General del Norte (Barranquilla), Clínica Chicamocha (Bucaramanga).",
    ram: "",
    disolucion: "Diluir a 0,1-0,4 mg/mL para infusión continua y administrar a 1-2 mcg/kg/min; bolo no requiere dilución, administrar durante 5-10 segundos. Compatibles: dextrosa 5% y SSN 0,9%.",
    tabla: {
      headers: ["Indicación", "Dosis adulto", "Dosis pediatría"],
      rows: [
        ["Complemento en anestesia general", "Intubación 0,15-0,2 mg/kg IV. Mantenimiento 0,03 mg/kg IV", "1-24 meses: 0,15 mcg/kg durante 5-10 s. 2-12 años: 0,1-0,15 mg/kg durante 5-15 s"],
        ["Intubación endotraqueal", "Intubación 0,15-0,2 mg/kg IV. Mantenimiento 0,03 mg/kg IV", "1-24 meses: 0,15 mcg/kg durante 5-10 s. 2-12 años: 0,1-0,15 mg/kg durante 5-15 s"],
        ["Relajante neuromuscular en cirugía o ventilación mecánica en UCI", "3 mcg/kg/min postbolo. Mantenimiento 1-2 mcg/kg/min", "Mayores de 2 años: 3 mcg/kg/min postbolo. Mantenimiento 1-2 mcg/kg/min"]
      ]
    }
  },
  {
    id: "dexmedetomidina",
    nombre: "DEXMEDETOMIDINA",
    principioActivo: "Dexmedetomidina 0,2 mg / 2 mL",
    presentacion: "Solución inyectable",
    linea: "anestesicos",
    registro: "INVIMA 2015M-0016106",
    imagen: "",
    indicaciones: "Sedación de pacientes con y sin ventilación mecánica en UCI, quirófanos y procedimientos diagnósticos. La dexmedetomidina de ADS PHARMA no causa depresión respiratoria. Permite sedación de ligera a moderada, mejorar la capacidad de respuesta del paciente, facilitar la respuesta a estímulos y disminuir el tiempo de extubación y la ocupación en UCI.",
    dosis: "Carga 1 mcg/kg IV durante 10 minutos. Mantenimiento 0,2-1,4 mcg/kg/h IV.",
    contraindicaciones: "",
    precauciones: "Precaución en abuso y dependencia de drogas, trastornos bradicárdicos severos (bloqueo cardíaco avanzado), disfunción ventricular severa preexistente, ICC e insuficiencia cardíaca.",
    ram: "Hipotensión (28%); 1-10%: anemia, bradicardia, fiebre, derrame pleural, leucocitosis y edema pulmonar.",
    disolucion: "Diluir con 48 mL de solución compatible. Compatibles: dextrosa 5%; SSN 0,9% y lactato de Ringer.",
    tabla: null
  },
  {
    id: "bromuro-rocuronio",
    nombre: "BROMURO DE ROCURONIO",
    principioActivo: "Rocuronio Bromuro 50 mg / 5 mL",
    presentacion: "Solución inyectable",
    linea: "anestesicos",
    registro: "INVIMA 2016M-0016861",
    imagen: "",
    indicaciones: "Coadyuvante de la anestesia general para facilitar la intubación traqueal durante la inducción de secuencia rápida. Relaja la musculatura esquelética durante la cirugía y coadyuva en la intubación y ventilación mecánica en UCI.",
    dosis: "Adulto: 0,45-0,6 mg/kg IV, mantenimiento 0,1-0,2 mg/kg IV, infusión continua 0,01-0,012 mg/kg/min IV. Como coadyuvante de anestesia general 0,6-1,2 mg/kg IV. Pediatría (3 meses a 14 años): inicial 0,6 mg/kg IV, mantenimiento 0,075-0,125 mg/kg IV, infusión continua 0,012 mcg/kg/min. Mayores de 14 años: 0,45-0,6 mg/kg IV, mantenimiento 0,1-0,2 mg/kg IV, infusión continua 0,01-0,012 mg/kg/min IV.",
    contraindicaciones: "",
    precauciones: "Precaución en enfermedad hepática significativa; en inducción de secuencia rápida en pacientes con ascitis puede requerir dosis inicial incrementada. Algunos pacientes pueden experimentar recuperación prolongada (parálisis) de la función neuromuscular.",
    ram: "Hipotensión transitoria (1-2%) e hipertensión (1-2%).",
    disolucion: "Compatible con dextrosa 5% (estable 24 h) y cloruro de sodio 0,9% (estable 24 h).",
    tabla: null
  },
  {
    id: "ciprofloxacina",
    nombre: "CIPROFLOXACINA",
    principioActivo: "Ciprofloxacina 400 mg / 200 mL",
    presentacion: "Solución inyectable premezclada",
    linea: "antibioticos",
    registro: "INVIMA 2016M-0016972",
    imagen: "",
    indicaciones: "Infecciones localizadas en tracto respiratorio, piel y tejidos blandos, tracto urinario y en general contra gérmenes sensibles a esta quinolona.",
    dosis: "",
    contraindicaciones: "",
    precauciones: "Evitar en pacientes con reacciones adversas graves a fluoroquinolonas. En terapia prolongada, evaluaciones periódicas de funciones renal, hepática y hematopoyética; ajustar dosis en insuficiencia renal. Suspender si aparecen signos de hepatitis.",
    ram: "Náuseas (3%), dolor abdominal (2%), diarrea (2% adultos, 5% niños), aumento de aminotransferasa (2%), vómitos (1% adultos, 5% niños), dolor de cabeza (1%), aumento de creatinina sérica (1%), erupción cutánea (2%).",
    disolucion: "Premezclado en 200 mL de dextrosa 5%.",
    tabla: {
      headers: ["Indicación", "Dosis adulto", "Dosis pediatría"],
      rows: [
        ["Infecciones del tracto respiratorio inferior por bacterias gram-negativas", "Leve 400 mg IV cada 12 h durante 7-14 días. Grave 400 mg IV cada 8 h durante 7-14 días", "A criterio médico"],
        ["Neumonía nosocomial", "Leve/moderado/grave: 400 mg IV cada 8 h durante 10-14 días", "A criterio médico"],
        ["Sinusitis bacteriana aguda", "400 mg IV cada 12 h durante 10 días", "A criterio médico"],
        ["Infecciones del tracto urinario, genital y gastrointestinal", "Leve 200 mg IV cada 12 h durante 7-14 días. Grave 400 mg IV cada 12 h durante 7-14 días", "1 año (IV): 6-10 mg/kg cada 8 h; dosis individual que no exceda 400 mg durante 10-21 días"],
        ["Infecciones intraabdominales", "400 mg IV cada 12 h durante 7-14 días", "A criterio médico"],
        ["Infecciones de piel y tejidos blandos por gram-negativas", "Leve/moderado: 400 mg IV cada 12 h durante 7-14 días. Grave/complicado: 400 mg IV cada 8 h durante 7-14 días", "A criterio médico"],
        ["Infecciones óseas y articulares", "Leve/moderada: 400 mg IV cada 12 h durante 4-6 semanas. Grave/complicado: 400 mg IV cada 8 h durante 4-6 semanas", "A criterio médico"],
        ["Prostatitis bacteriana crónica", "400 mg IV cada 12 h durante 28 días", "A criterio médico"]
      ]
    }
  },
  {
    id: "zolidone",
    nombre: "ZOLIDONE",
    principioActivo: "Linezolid 600 mg / 300 mL",
    presentacion: "Solución inyectable premezclada",
    linea: "antibioticos",
    registro: "INVIMA 2017M-0012334-R1",
    imagen: "",
    indicaciones: "Efectivo en neumonía adquirida en la comunidad y nosocomial; infecciones complicadas de piel y tejidos blandos, incluido pie diabético; infecciones enterocócicas resistentes a vancomicina; infecciones estreptocócicas e infecciones por staphylococcus aureus resistentes y sensibles a meticilina.",
    dosis: "",
    contraindicaciones: "Hipersensibilidad. No aprobado contra bacterias gram-negativas ni infecciones por catéter.",
    precauciones: "Considerar suspensión si hay empeoramiento de la mielosupresión. Puede causar hipoglucemia; controlar glucosa y evitar coadministración con fármacos psiquiátricos serotoninérgicos.",
    ram: "Diarrea (10%), dolor de cabeza (8%), náusea (6%), vómitos (4%), mareos (6%), erupción (2%), moniliasis vaginal (1%), alteración del sabor (1%).",
    disolucion: "Premezclado en 300 mL de dextrosa 5%, infundir durante 20 minutos (concentración 2 mg/mL).",
    tabla: {
      headers: ["Indicación", "Dosis adulto"],
      rows: [
        ["Neumonía adquirida en la comunidad y nosocomial", "600 mg IV cada 12 h durante 10-14 días"],
        ["Infecciones complicadas de piel y tejidos blandos, incluido pie diabético", "600 mg IV cada 12 h durante 10-14 días"],
        ["Infecciones enterocócicas resistentes a vancomicina", "600 mg IV cada 12 h durante 14-28 días"],
        ["Infecciones estreptocócicas e infecciones por S. aureus resistente y sensible a meticilina", "600 mg IV cada 12 h durante 10-14 días"]
      ]
    }
  },
  {
    id: "floxanar",
    nombre: "FLOXANAR",
    principioActivo: "Moxifloxacino 400 mg / 250 mL",
    presentacion: "Solución para infusión IV premezclada",
    linea: "antibioticos",
    registro: "INVIMA 2014M-0015308",
    imagen: "",
    indicaciones: "Mayores de 18 años con infecciones del tracto respiratorio superior e inferior (sinusitis aguda, exacerbaciones agudas de bronquitis crónica y neumonía adquirida en la comunidad); infecciones cutáneas y tejidos blandos; infecciones intraabdominales complicadas, incluidas polimicrobianas como abscesos.",
    dosis: "",
    contraindicaciones: "Hipersensibilidad a quinolonas. Niños/adolescentes en crecimiento, embarazadas y lactantes.",
    precauciones: "No mezclar con otros fármacos sin compatibilidad comprobada. Precaución en ancianos, daño renal, trastornos hepáticos, prolongación del intervalo QT, tendinopatías y antecedentes convulsivos. Incrementa el riesgo de exacerbación de miastenia gravis.",
    ram: "Náuseas (7%), diarrea (6%), mareos (3%), disminución de amilasa (2%), basófilos disminuidos, eosinófilos, hemoglobina, tiempo de protrombina, glóbulos rojos y neutrófilos (2%).",
    disolucion: "Premezclado en 250 mL. Cloruro de sodio 0,9% compatible; infundir durante 60 minutos.",
    tabla: {
      headers: ["Indicación", "Dosis adulto", "Dosis pediatría"],
      rows: [
        ["Neumonía adquirida en la comunidad", "400 mg IV diarios durante 7-14 días", "A criterio médico"],
        ["Sinusitis bacteriana aguda", "400 mg IV diarios durante 5-10 días", "A criterio médico"],
        ["Exacerbación bacteriana de bronquitis", "400 mg IV diarios durante 5 días", "A criterio médico"],
        ["Infecciones complicadas de piel y tejidos blandos", "Sin complicaciones: 400 mg IV diarios durante 7 días. Complicado: 400 mg IV diarios durante 7-21 días", "A criterio médico"]
      ]
    }
  },
  {
    id: "levofloxacina",
    nombre: "LEVOFLOXACINA",
    principioActivo: "Levofloxacina 5 mg/mL x 100 mL",
    presentacion: "Solución premezclada",
    linea: "antibioticos",
    registro: "INVIMA 2014M-0015067",
    imagen: "",
    indicaciones: "Infecciones localizadas en tracto respiratorio, piel y tejidos blandos, tracto urinario y en general contra gérmenes sensibles a esta quinolona.",
    dosis: "",
    contraindicaciones: "Hipersensibilidad a quinolonas, embarazo, lactancia y niños menores de 18 años; precaución en síndrome convulsivo y riesgo de exacerbación de miastenia gravis asociada a fluoroquinolonas.",
    precauciones: "Casos de hipersensibilidad y reacciones anafilácticas serias y ocasionalmente fatales. Precaución en insuficiencia renal (se excreta principalmente por los riñones). Asociada con prolongación del intervalo QT y casos poco frecuentes de arritmia.",
    ram: "Náuseas (7%), dolor de cabeza (6%), diarrea (5%), insomnio (4%), estreñimiento (3%), mareos (3%), dispepsia (2%), erupción cutánea (2%), vómitos (2%).",
    disolucion: "Dextrosa en agua destilada al 5%.",
    tabla: {
      headers: ["Indicación", "Dosis adulto", "Dosis pediatría"],
      rows: [
        ["Neumonía adquirida en la comunidad y nosocomial", "500 mg IV una vez al día durante 7-14 días o 750 mg IV una vez al día durante 5 días", "A criterio médico"],
        ["Sinusitis bacteriana aguda", "500 mg IV una vez al día durante 10-14 días o 750 mg IV una vez al día durante 5 días", "A criterio médico"],
        ["Exacerbación bacteriana de bronquitis", "500 mg IV una vez al día durante 7 días", "A criterio médico"],
        ["Infecciones complicadas de piel y tejidos blandos", "Sin complicaciones: 500 mg IV una vez al día durante 7-10 días. Complicado: 750 mg IV una vez al día durante 7-14 días", "A criterio médico"],
        ["Infecciones complicadas del tracto urinario y pielonefritis aguda", "250 mg IV una vez al día durante 10 días o 750 mg IV una vez al día durante 5 días", "A criterio médico"],
        ["Prostatitis bacteriana crónica", "500 mg IV una vez al día durante 28 días", "A criterio médico"]
      ]
    }
  },
  {
    id: "diazenil",
    nombre: "DIAZENIL",
    principioActivo: "Flumazenil 0,5 mg / 5 mL",
    presentacion: "Solución inyectable intravenosa",
    linea: "antidotos",
    registro: "INVIMA 2019M-0013278 · CUM 20044623-1",
    imagen: "",
    indicaciones: "Reversión de sedación consciente y anestesia general mediada por benzodiazepinas y en sobredosis por benzodiazepinas.",
    dosis: "",
    contraindicaciones: "",
    precauciones: "Pacientes con lesiones cerebrales graves y/o presión intracraneal inestable y durante el embarazo.",
    ram: "Náuseas y vómitos (11%), mareos (10%), visión anormal/borrosa (3-9%), agitación (3-9%), disnea (3-9%), hiperventilación (3-9%), dolor en el lugar de la inyección (3-9%), xerostomía (3-9%).",
    disolucion: "Administrar según tabla de dosificación. Compatibles: dextrosa 5%, SSN 0,9% y lactato de Ringer.",
    tabla: {
      headers: ["Indicación", "Esquema de dosis"],
      rows: [
        ["Reversión de sedación consciente y anestesia general", "0,2 mg IV durante 15 s. Si tras 45 s no hay respuesta, administrar de nuevo 0,2 mg durante 1 min; puede repetirse a intervalos de 1 min; no exceder 4 dosis (1 mg). Si reaparece la sedación, repetir a intervalos de 20 min; no exceder 1 mg/dosis o 3 mg/h"],
        ["Sobredosis por benzodiazepinas", "0,2 mg IV durante 15-30 s. Si tras 30 s no hay respuesta, 0,3 mg durante 30 s. Si no hay respuesta, repetir 0,5 mg IV durante 30 s a intervalos de 1 min hasta dosis máxima acumulativa de 3 mg/h. Raramente hasta 5 mg total; si tras 5 min no hay respuesta, es poco probable que la sedación sea por benzodiazepinas"]
      ]
    }
  },
  {
    id: "tiosulfato-sodio",
    nombre: "TIOSULFATO DE SODIO 20%",
    principioActivo: "Tiosulfato de Sodio 20% por 5 mL ampolla",
    presentacion: "Solución inyectable",
    linea: "antidotos",
    registro: "INVIMA 2019M-0018599",
    imagen: "",
    indicaciones: "Coadyuvante en el manejo de intoxicación por cianuro después de la administración de nitrito de sodio o nitrito de amilo.",
    dosis: "Adultos: 10 a 12,5 g (10 a 12 ampolletas) diluidos en 200 mL de SSN 0,9% o DAD 5%; goteo de 10 mL/min durante 25 minutos. Si persisten signos de toxicidad por cianuro tras 30 min y hasta 2 h, repetir la misma infusión y continuar 1 ampolla IV lenta cada 8 h hasta las primeras 72 h. Niños: 400 mg/kg (2 mL/kg) de solución al 20% IV diluidos en 100 mL de SSN 0,9% o DAD 5%, a 0,625 a 1,25 g/min (2,5 a 5 mL/min); dosis máxima 12,5 g. Tercera edad: no requiere ajuste en mayores de 65 años.",
    contraindicaciones: "Hipersensibilidad al principio activo o a sus excipientes.",
    precauciones: "Controle de cerca la hemodinámica durante y después de la administración de Nitrito de Sodio y Tiosulfato de Sodio; reduzca las tasas de infusión si hay hipotensión. Pautas de dosificación reducidas en pediatría. Puede contener trazas de sulfito de sodio (no disuadir su uso en emergencias). Se excreta por vía renal; riesgo aumentado en falla renal.",
    ram: "",
    disolucion: "",
    tabla: null
  },
  {
    id: "edetato-sodio-calcio",
    nombre: "EDETATO DE SODIO Y CALCIO 20%",
    principioActivo: "Edetato de Sodio y Calcio 20% por 10 mL vial",
    presentacion: "Solución inyectable",
    linea: "antidotos",
    registro: "INVIMA 2019M-0018905",
    imagen: "",
    indicaciones: "Reducción de los niveles en sangre y reservas de plomo en envenenamiento por plomo (agudo y crónico) y encefalopatía por plomo, en poblaciones pediátricas y adultos.",
    dosis: "Adultos: Intoxicación leve: 1 g (3 ampollas) en 500 cc de SSN 0,9% a pasar en 1 hora (8,3 cc/min) cada 12 h x 72 h (promedio 18 ampollas). Moderada y severa: 2 g (6 ampollas) en 500 cc de SSN 0,9% a pasar en 12 h a 46 cc/h, descansar 12 h y repetir 5 ciclos (promedio 30 ampollas). Niños <12 años leve: 25 mg/kg/día dividido cada 12 h por 72 h (promedio 3-6 ampollas). Moderada/severa: 1 g (3 ampollas) en 250 o 500 cc de SSN 0,9% a pasar en 12 h, descansar 12 h y repetir 5 ciclos (promedio 15 ampollas). Asociar gluconato de calcio 1 ampolla IV lenta cada 8 h con monitoreo de calcemia e hiposulfito o tiosulfato de sodio al 20% 1 ampolla IV cada 8 h hasta 24 h después de terminar el esquema de quelación EDTA.",
    contraindicaciones: "No administrar durante periodos de anuria; pacientes con enfermedad renal activa; pacientes con hepatitis.",
    precauciones: "Capaz de producir efectos tóxicos que pueden ser fatales. Se prefiere la vía intramuscular; evitar la perfusión rápida; seguir el horario de dosificación y no exceder la dosis recomendada.",
    ram: "",
    disolucion: "El quelante de primera elección en intoxicación por plomo es Edetato Cálcico Disódico 20%, indicado en pacientes sintomáticos con exposición a plomo y en pacientes con niveles tóxicos (>10 mcg/dL) incluso asintomáticos.",
    tabla: null
  },
  {
    id: "metadoxina",
    nombre: "METADOXINA",
    principioActivo: "Metadoxina 300 mg por 5 mL ampolla",
    presentacion: "Solución inyectable",
    linea: "antidotos",
    registro: "INVIMA 2019M-0018827",
    imagen: "",
    indicaciones: "Coadyuvante en la disfunción hepática secundaria a alcoholismo agudo y crónico.",
    dosis: "Intoxicación alcohólica aguda: 1 ampolla IV o IM (300 mg/5 mL) y repetir tras 1 hora si es necesario. Intoxicación alcohólica crónica: 1 ampolla (300 mg/5 mL) IV o IM cada 12 horas.",
    contraindicaciones: "El metabisulfito de sodio puede producir reacciones alérgicas (broncoespasmo) en pacientes susceptibles, particularmente asmáticos.",
    precauciones: "Hipersensibilidad. Precaución en enfermos de Parkinson tratados con L-dopa (el metadoxil puede antagonizar su efecto). Embarazo, lactancia. Por el metabisulfito de sodio puede producir reacciones alérgicas y ataques asmáticos severos en pacientes con asma.",
    ram: "",
    disolucion: "",
    tabla: null
  },
  {
    id: "azul-metileno",
    nombre: "AZUL DE METILENO",
    principioActivo: "Azul de Metileno 50 mg / 5 mL",
    presentacion: "Solución inyectable intravenosa",
    linea: "antidotos",
    registro: "INVIMA 2021M-0020357 · IUM 1A1000281004",
    imagen: "",
    indicaciones: "Coadyuvante en disfunción hepática secundaria a alcoholismo agudo y crónico; intoxicaciones por cianuro, plomo y metanol; tratamiento de la metahemoglobinemia; manejo del shock séptico refractario en UCI (2 mg/kg a criterio médico); identificación y evaluación de ganglio centinela en disección axilar (alta sensibilidad y valor predictivo positivo en el mapeo ganglionar del cáncer de mama).",
    dosis: "Adultos: 1 a 2 mg/kg (0,2-0,4 mL/kg) administrada durante 5 minutos. Puede repetirse (1-2 mg/kg) una hora después si hay síntomas persistentes o recurrentes. Pediatría (>3 meses): misma posología que adultos. Bebés ≤3 meses y recién nacidos: 0,3-0,5 mg/kg (0,06-0,1 mL/kg) durante 5 minutos.",
    contraindicaciones: "Hipersensibilidad al principio activo o a tintes de tiazina; deficiencia de G6PD (riesgo de anemia hemolítica); metahemoglobinemia inducida por nitrito durante tratamiento de intoxicación por cianuro; intoxicación por clorato; deficiencia de NADPH reductasa.",
    precauciones: "Inyectar muy lentamente durante 5 minutos para evitar metahemoglobina adicional. Imparte color azul-verdoso a orina, heces y piel (puede dificultar el diagnóstico de cianosis). Extrema precaución en recién nacidos y lactantes menores de 3 meses.",
    ram: "Mareos, parestesia, disgeusia, náuseas, decoloración de la piel, cromaturia, sudoración, dolor en el lugar de la inyección y dolor en las extremidades. Ocasionalmente hipotensión y arritmias cardíacas (raras veces fatales).",
    disolucion: "Dextrosa en agua destilada al 5%.",
    tabla: null
  },
  {
    id: "acido-valproico",
    nombre: "ÁCIDO VALPROICO",
    principioActivo: "Valproato de Sodio equivalente a Ácido Valproico 100 mg/mL",
    presentacion: "Solución inyectable",
    linea: "neuro",
    registro: "INVIMA 2016M-0016861",
    imagen: "",
    indicaciones: "Tratamiento de convulsiones parciales complejas y crisis de ausencia simple y compleja. El ácido valproico (como valproato de sodio) IV está indicado en los estatus epilépticos de adultos.",
    dosis: "10-15 mg/kg/día IV dividido cada 12 h, infundido durante 1 hora; dosis máxima 60 mg/kg/día; no exceder 14 días. Pediatría (>10 años): valproato sódico IV 10-15 mg/kg/día dividido cada 12 h, infundido durante 1 h; máxima 60 mg/kg/día; no exceder 14 días.",
    contraindicaciones: "No administrar en enfermedad hepática o disfunción hepática significativa. Contraindicado en enfermedad de Alpers o Alpers-Huttenlocher, hipersensibilidad conocida y trastornos del ciclo de la urea. En menores de 10 años no se ha establecido seguridad y eficacia.",
    precauciones: "",
    ram: ">10% náusea (31%), dolor de cabeza (<31%), aumento del tiempo de sangrado (26-30%), trombocitopenia (26-30%), temblor (25%), alopecia (<24%), astenia (16-20%), infección (16-20%), somnolencia (16-20%).",
    disolucion: "Infusión de 60 minutos, diluida con al menos 50 mL de solución compatible: dextrosa 5%, SSN 0,9%, lactato de Ringer.",
    tabla: null
  },
  {
    id: "inaraq",
    nombre: "INARAQ",
    principioActivo: "Budesonida 0,5 mg / mL",
    presentacion: "Suspensión estéril para nebulizadores/inhaladores",
    linea: "respiratorio",
    registro: "INVIMA 2015M-0016088",
    imagen: "",
    indicaciones: "Asma bronquial.",
    dosis: "",
    contraindicaciones: "",
    precauciones: "La comida alta en grasas retrasa la absorción y puede aumentar el riesgo de infección grave o mortal en personas expuestas a varicela o sarampión. Precaución en diabetes mellitus, hipertensión, hipotiroidismo, alteraciones electrolíticas, retención de sodio y agua, infecciones, inmunizaciones, herpes simple ocular, miastenia gravis, úlcera péptica, psicosis o insuficiencia renal. Pueden producirse trastornos tromboembólicos y miopatía. La tuberculosis latente puede reactivarse. El uso prolongado puede elevar la presión intraocular, glaucoma o cataratas y asociarse al sarcoma de Kaposi.",
    ram: "Infección respiratoria (34-38%), rinitis (7-12%), otitis media (1-12%).",
    disolucion: "Administrar con equipo de nebulización jet con boquilla o mascarilla; compresor con flujo de aire 5-8 L/min; volumen de llenado 2-4 mL. Usar agua estéril para inyección.",
    tabla: {
      headers: ["Indicación", "Dosis adulto", "Dosis pediatría"],
      rows: [
        ["Asma", "Dosis diaria total 1-2 mg. En casos muy graves incrementar hasta 4 mg", "Suspensión nebulizada 0,5 mg una vez al día o cada 12 h; no exceder 1 mg/día"]
      ]
    }
  },
  {
    id: "n-acetilcisteina",
    nombre: "N-ACETILCISTEÍNA",
    principioActivo: "N-Acetilcisteína 300 mg / 3 mL",
    presentacion: "Solución inyectable IV e inhalatoria",
    linea: "respiratorio",
    registro: "INVIMA 2021M-0020244 · CUM 20176947-1",
    imagen: "",
    indicaciones: "Coadyuvante en la intoxicación por acetaminofén; medida nefroprotectora; mucolítico. Mucolítico por inhalación por nebulización: Niños 6-14: media ampolla (1,5 mL) 1-2 veces/día (150-300 mg). Adultos: 1 ampolla (3 mL) dos veces/día (600 mg). Por inhalación: solución sin diluir al 10% con nebulizador de compresión.",
    dosis: "",
    contraindicaciones: "Hipersensibilidad al medicamento. Precaución en insuficiencia respiratoria severa y pacientes asmáticos.",
    precauciones: "Precaución en asma bronquial y antecedentes de úlceras (si la falta de aliento empeora por broncoespasmo paradójico, suspender). Precaución en intolerancia a la histamina; evitar terapia a largo plazo.",
    ram: "Poco frecuentes: dolor de cabeza, fiebre, reacciones alérgicas (picazón, urticaria, erupción cutánea, broncoespasmo, angioedema, taquicardia, disminución de presión arterial). Muy raros: reacciones anafilácticas hasta el shock.",
    disolucion: "Dextrosa 5% o agua para inyección.",
    tabla: {
      titulo: "Protocolo intravenoso",
      headers: ["Dosis", "Volumen DAD 5% adultos", "Volumen DAD 5% niños"],
      rows: [
        ["150 mg/kg infusión 1 h", "200 mL", "3 mL/kg"],
        ["50 mg/kg infusión en las siguientes 4 h", "500 mL", "7 mL/kg"],
        ["100 mg/kg infusión en las siguientes 16 h", "1000 mL", "14 mL/kg"],
        ["Repetir 100 mg/kg en 16 h si requiere continuar con antídoto", "1000 mL", "14 mL/kg"]
      ]
    }
  }
];

// Imágenes de apoyo visual de ADS PHARMA. Renders de producto dedicados +
// imagen contextual (Artboard) para los que aún no tienen foto propia.
const IMAGENES = {
  docarip: "image/Docarip@3x-8.webp",
  noltron: "image/Noltron@3x-8.webp",
  amiodarona: "image/Amiodarona@3x-8.webp",
  dexmedetomidina: "image/Dexmedetomidina@3x-8.webp",
  ciprofloxacina: "image/Ciprofloxacina@3x-8.webp",
  diazenil: "image/Diazenil@3x-8.webp",
  miocurim: "image/Miocurim@3x-8.webp",
  vasopresina: "image/Vasopresina@3x-8.webp",
  "bromuro-rocuronio": "image/Bromuro@3x-8.webp",
  diblorec: "image/Diblorec@3x-8.webp",
  floxanar: "image/Floxanar@3x-8.webp",
  myoritmo: "image/Myoritmo@3x-8.webp",
  nitroglicerina: "image/Nitroglicerina@3x-8.webp"
};
const IMG_CONTEXTO = "image/Artboard-1@3x-8.webp";
PRODUCTOS.forEach(p => {
  if (!p.imagen) {
    p.imagen = IMAGENES[p.id] || IMG_CONTEXTO;
    p.imagenContexto = !IMAGENES[p.id];   // true = imagen genérica de apoyo
  }
});

const CLIENTES_INSTITUCIONALES = [
  "Méderi", "CAFAM", "Cruz Verde", "SyD Colombia",
  "Hospital Universitario de Santander", "Fundación Santa Fe de Bogotá",
  "Fundación Valle del Lili", "Clínica Imbanaco",
  "Fundación Cardioinfantil (FCV)", "Clínica Shaio", "Colsubsidio",
  "Audifarma", "Droguería Inglesa", "Clínica Palma Real",
  "Clínica Farallones", "Clínica General del Norte",
  "Clínica Chicamocha", "Clínica de Marly"
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PRODUCTOS, LINEAS, CLIENTES_INSTITUCIONALES };
}

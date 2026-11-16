// src/lib/constants.ts
import { ServiceItem, TestimonialItem, FaqItem, ZoneItem } from '@/types';

export const BUSINESS_CONFIG = {
  name: 'MV Electricidad',
  specialist: 'Matías Vallejos',
  role: 'Técnico Electricista Matriculado / Profesional',
  phoneDisplay: '+54 9 223 682-1209',
  phoneClean: '5492236821209',
  email: 'contacto@mvelectricidad.com.ar',
  ratingValue: 5.0,
  reviewCount: 49,
  defaultWhatsAppMessage: 'Hola Matías, te contacto desde la web de MV Electricidad. Necesito consultar por un trabajo eléctrico.',
  hours: {
    regular: 'Lunes a Viernes de 08:00 a 20:00 hs',
    saturdays: 'Sábados de 08:30 a 14:00 hs',
    emergencies: 'Guardias de urgencia eléctrica 24/7 disponible',
  },
  social: {
    instagram: 'https://instagram.com/mvelectricidad',
    googleBusiness: 'https://maps.google.com/?cid=mvelectricidad',
  },
};

export const getWhatsAppUrl = (customMessage?: string): string => {
  const message = customMessage || BUSINESS_CONFIG.defaultWhatsAppMessage;
  return `https://wa.me/${BUSINESS_CONFIG.phoneClean}?text=${encodeURIComponent(message)}`;
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'urgencias',
    number: '01',
    title: 'Urgencias Eléctricas',
    shortDesc: 'Detección y reparación inmediata ante caídas de tensión o fallas críticas.',
    fullDesc: 'Detección y reparación rápida de cortocircuitos, cortes de luz intempestivos, fugas a tierra y salto constante de disyuntores. Asistencia prioritaria con instrumental de medición homologado.',
    features: [
      'Detección de cortocircuitos',
      'Fugas a tierra y salto de disyuntor',
      'Restablecimiento seguro de energía',
      'Diagnóstico de cables recalentados',
    ],
    icon: 'AlertTriangle',
    isPopular: true,
    whatsappMessage: 'Hola Matías, tengo una URGENCIA eléctrica en mi domicilio/comercio y necesito asistencia técnica prioritaria.',
  },
  {
    id: 'tableros',
    number: '02',
    title: 'Tableros Eléctricos y Protecciones',
    shortDesc: 'Modernización y blindaje de la seguridad de tu propiedad.',
    fullDesc: 'Armado, renovación y ordenamiento integral de tableros generales y seccionales. Colocación de llaves térmicas calibradas, disyuntores diferenciales de alta sensibilidad y protectores inteligentes de sobre/baja tensión.',
    features: [
      'Disyuntores y llaves termomagnéticas',
      'Protectores de alta y baja tensión',
      'Reparto equilibrado de fases',
      'Peinado y rotulado prolijo según norma',
    ],
    icon: 'Cpu',
    whatsappMessage: 'Hola Matías, quiero cotizar la renovación, arreglo o modernización de un tablero eléctrico.',
  },
  {
    id: 'instalaciones',
    number: '03',
    title: 'Instalaciones Domiciliarias y Comerciales',
    shortDesc: 'Infraestructura eléctrica desde cero o remodelaciones completas.',
    fullDesc: 'Cableado completo en obra nueva o refacciones edilicias. Diseño y tendido de circuitos independientes de alto consumo (aires acondicionados, cocinas eléctricas, termotanques, bombas elevadoras) y puesta a tierra con jabalina normalizada.',
    features: [
      'Cableado normalizado antillama',
      'Líneas exclusivas para aires split',
      'Puesta a tierra con jabalina e informe',
      'Adecuación y aumento de potencia',
    ],
    icon: 'Zap',
    whatsappMessage: 'Hola Matías, necesito cotizar una instalación eléctrica completa / colocación de líneas para aire o electrodomésticos.',
  },
  {
    id: 'iluminacion',
    number: '04',
    title: 'Iluminación Interior y Exterior',
    shortDesc: 'Diseño lumínico moderno, eficiente y de alta durabilidad.',
    fullDesc: 'Instalación de artefactos LED de diseño, plafones, dicroicas embutidas, tiras LED con perfiles de aluminio difusores, reflectores perimetrales de alta potencia, fotocélulas, sensores de movimiento y automatización de luces.',
    features: [
      'Artefactos LED y spots embutidos',
      'Tiras LED con drivers y fuentes switching',
      'Iluminación exterior estanca (IP65)',
      'Sensores de movimiento y fotocélulas',
    ],
    icon: 'Lightbulb',
    whatsappMessage: 'Hola Matías, te consulto por instalación y armado de artefactos de iluminación interior o exterior.',
  },
  {
    id: 'mantenimiento',
    number: '05',
    title: 'Mantenimiento Preventivo y Normativa',
    shortDesc: 'Prevención de siniestros, consumo eficiente y adecuaciones.',
    fullDesc: 'Revisión exhaustiva de consumos anómalos o facturación excesiva, balanceo de fases en suministros trifásicos, recambio de cableado antiguo entelado/vencido y adecuación a reglamentación AEA vigente.',
    features: [
      'Medición de aislamiento y fugas',
      'Balanceo de cargas en trifásica',
      'Detección de puntos calientes',
      'Reemplazo de cables fuera de norma',
    ],
    icon: 'ShieldCheck',
    whatsappMessage: 'Hola Matías, quisiera coordinar una inspección técnica o mantenimiento preventivo para mi instalación.',
  },
  {
    id: 'tomacorrientes',
    number: '06',
    title: 'Tomacorrientes y Puntos de Red',
    shortDesc: 'Ampliación ordenada y funcional de tomas y bocas.',
    fullDesc: 'Agregado o reemplazo de módulos de tomacorrientes con descarga a tierra, llaves de punto simple, combinaciones dobles y triples, canalizaciones limpias a la vista en cañería metálica o embutidas sin roturas innecesarias.',
    features: [
      'Reemplazo de tomas y teclas antiguas',
      'Instalación de tomas de 20A especiales',
      'Canalizaciones y cañerías prolijas',
      'Bocas adicionales sin romper de más',
    ],
    icon: 'Wrench',
    whatsappMessage: 'Hola Matías, necesito agregar o cambiar tomacorrientes, teclas de luz o cajas eléctricas.',
  },
];

export const TRUST_DIFFERENTIALS = [
  {
    title: 'Atención directa por Matías Vallejos',
    desc: 'Sin intermediarios ni tercerizaciones. Trato claro, honesto, puntual y asesoramiento profesional directo desde el primer mensaje.',
    icon: 'UserCheck',
  },
  {
    title: 'Seguridad y normativas ante todo',
    desc: 'Uso exclusivo de materiales homologados bajo norma IRAM. Pruebas de disparo diferencial y medición de continuidad antes de dar por finalizado el servicio.',
    icon: 'Shield',
  },
  {
    title: 'Presupuestos claros y sin sorpresas',
    desc: 'Explicación detallada de la causa de la falla y costo pactado antes de iniciar cualquier maniobra o recambio de piezas.',
    icon: 'CheckCircle2',
  },
  {
    title: 'Prolijidad y máximo respeto por tu espacio',
    desc: 'Cuidado riguroso de paredes, muebles y pisos. Trabajo limpio, ordenado y con recolección de residuos al terminar la jornada.',
    icon: 'Sparkles',
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: '1',
    author: 'Mariano Benítez',
    location: 'Mar del Plata (Zona Güemes)',
    workDone: 'Urgencia por cortocircuito y recambio de disyuntor',
    date: 'Hace 2 semanas',
    rating: 5,
    comment:
      'Nos quedamos sin luz un domingo a la noche por una térmica que saltaba sin parar. Matías vino súper rápido, encontró la fuga en una caja húmeda de la cocina en menos de media hora y nos dejó todo funcionando de forma impecable. Un profesional de 10.',
    avatarText: 'MB',
  },
  {
    id: '2',
    author: 'Valeria Sotomayor',
    location: 'Santa Clara del Mar',
    workDone: 'Tablero eléctrico nuevo e instalación de aires',
    date: 'Hace 1 mes',
    rating: 5,
    comment:
      'Excelente trabajo en el tablero principal de nuestra casa y la instalación de 3 circuitos dedicados para aires acondicionados. Todo emprolijado, con protectores de tensión y rotulado. Te explica todo con claridad y es súper limpio trabajando.',
    avatarText: 'VS',
  },
  {
    id: '3',
    author: 'Ignacio G. Roldán',
    location: 'Miramar / Costanera',
    workDone: 'Recambio integral de luminarias LED y tomas',
    date: 'Hace 3 semanas',
    rating: 5,
    comment:
      'Contratamos a Matías para cambiar todas las dicroicas por artefactos LED embutidos y agregar tomas en el living y taller. Quedó perfecto, ni un solo rasguño en la pintura y el consumo bajó notablemente. Muy puntual y de confianza absoluta.',
    avatarText: 'IR',
  },
];

export const COVERAGE_ZONES: ZoneItem[] = [
  {
    name: 'Mar del Plata',
    badge: 'Cobertura Integral',
    neighborhoods: [
      'Centro', 'Güemes', 'Playa Grande', 'La Perla', 'Constitución',
      'Chauvín', 'Plaza Mitre', 'Caisamar', 'Punta Mogotes', 'Playa Serena',
      'Sierra de los Padres', 'Bosque Peralta Ramos', 'Puerto', 'Los Troncos'
    ],
  },
  {
    name: 'Batán',
    badge: 'Atención Directa',
    neighborhoods: [
      'Casco Urbano', 'Parque Industrial Gral. Savio', 'Estación Chapadmalal', 'Ruta 88', 'Colina Alegre'
    ],
  },
  {
    name: 'Miramar',
    badge: 'Servicio & Urgencias',
    neighborhoods: [
      'Centro', 'Costanera', 'Parque Mar', 'Las Palmas', 'Mar del Sud', 'Zona Residencial'
    ],
  },
  {
    name: 'Santa Clara del Mar & Mar de Cobo',
    badge: 'Costa Norte',
    neighborhoods: [
      'Santa Clara del Mar', 'Mar de Cobo', 'Camet Norte', 'Playa Dorada', 'La Caleta', 'Mar Chiquita'
    ],
  },
];

export const FAQ_DATA: FaqItem[] = [
  {
    question: '¿Atienden urgencias eléctricas fuera de horario o fines de semana?',
    answer:
      'Sí, contamos con servicio prioritario para urgencias (cortocircuitos graves, corte total de suministro por salto de disyuntor, humo o olor a quemado en tableros) tanto en días hábiles como fines de semana.',
  },
  {
    question: '¿Cómo se presupuesta un trabajo eléctrico?',
    answer:
      'Para trabajos estándar (colocación de artefactos, circuitos o tableros), podés enviarnos fotos o videos por WhatsApp para un presupuesto estimado rápido. En casos de fallas complejas o fugas no evidentes, realizamos una visita técnica de diagnóstico para detectar la causa exacta con instrumental de medición.',
  },
  {
    question: '¿Los trabajos realizados cuentan con garantía?',
    answer:
      'Absolutamente. Todos los trabajos cuentan con garantía de mano de obra y funcionamiento. Además, trabajamos exclusivamente con materiales normalizados con sello IRAM para asegurar la máxima durabilidad y seguridad.',
  },
  {
    question: '¿Qué tipo de materiales y marcas eléctricas recomiendan?',
    answer:
      'Trabajamos con conductores de cobre normalizados (Prysmian, Fonseca, etc.), térmicas y disyuntores de marcas líderes como Schneider Electric, Siemens o Sica, asegurando los calibres adecuados para evitar sobrecalentamientos.',
  },
];

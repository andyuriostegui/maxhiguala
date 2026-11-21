export const categories = [
  "Especialidades",
  "Menú del Día",
  "Entradas & Sopas",
  "Cortes & Carnes",
  "Guarniciones",
  "Coctelería",
];

const WEEKDAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export const dishes = [
  {
    id: "pichon",
    name: "Pichón",
    serving: "1 pieza, incluye consomé",
    category: "Especialidades",
    price: 230,
    image: "/media/pichon-frito.webp",
    alt: "Pichón frito y dorado sobre un plato blanco",
    featured: true,
    cardName: "Pichón frito",
    description: "1 pieza frita acompañada de cebolla, jitomate y lechuga.",
  },
  {
    id: "pichones",
    name: "Pichones",
    serving: "2 piezas, incluye consomé",
    category: "Especialidades",
    price: 460,
    image: "/media/PICHON.jpg",
    alt: "Pichones fritos servidos en el salón de El Maxhi",
    cardImage: "/media/pjichon.jpg",
    cardAlt: "Pichones de la casa, dos piezas en plato",
    description: "2 piezas fritas acompañadas de cebolla, jitomate y lechuga.",
  },
  {
    id: "pichon-enchilado",
    name: "Pichón enchilado",
    serving: "1 pieza, incluye consomé",
    category: "Especialidades",
    price: 250,
    image: "/media/pichon-enchilado.webp",
    alt: "Pichón enchilado servido en un plato verde",
    featured: true,
    description: "1 pieza frita y bañada en adobo enchilado de la casa, con cebolla, jitomate y lechuga.",
  },
  {
    id: "pato",
    name: "Pato",
    serving: "1 orden",
    category: "Especialidades",
    price: 310,
    description: "1 orden frito con cebolla, jitomate y lechuga.",
  },
  {
    id: "pato-enchilado",
    name: "Pato enchilado",
    serving: "1 orden",
    category: "Especialidades",
    price: 340,
    description: "1 orden frito en salsa roja y flameado, con cebolla, jitomate y lechuga.",
  },
  {
    id: "pato-naranja",
    name: "Pato a la naranja",
    serving: "1 orden",
    category: "Especialidades",
    price: 340,
    description: "1 orden preparado con salsa de naranja de la casa, cebolla, jitomate y lechuga.",
  },
  {
    id: "conejo",
    name: "Conejo",
    serving: "1 pieza",
    category: "Especialidades",
    price: 310,
    image: "/media/CONEJO%20FRITON.jpg",
    alt: "Conejo frito de la casa con ensalada, jitomate y cebolla",
    description: "1 pieza frita con cebolla, jitomate y lechuga.",
  },
  {
    id: "conejo-enchilado",
    name: "Conejo enchilado",
    serving: "1 pieza",
    category: "Especialidades",
    price: 340,
    description: "1 pieza frita en salsa roja y flameada, con cebolla, jitomate y lechuga.",
  },
  {
    id: "pollito-machi",
    name: "Pollito Machi",
    serving: "200 g",
    category: "Especialidades",
    price: 280,
    description: "200 g con lechuga, cebolla, jitomate y chile jalapeño.",
  },
  {
    id: "codorniz",
    name: "Codorniz",
    serving: "3 piezas",
    category: "Especialidades",
    price: 330,
    description: "3 piezas fritas o asadas con cebolla, jitomate y lechuga.",
  },
  {
    id: "menu-lunes",
    name: "Rabo de res a la vizcaína",
    category: "Menú del Día",
    day: "Lunes",
    image: "/media/rabo.jpg",
    alt: "Rabo de res a la vizcaína, especial del lunes",
    description: "Especial del lunes. Rabo de res a la vizcaína, según la receta de la casa.",
  },
  {
    id: "menu-martes",
    name: "Mole rojo",
    category: "Menú del Día",
    day: "Martes",
    image: "/media/molerojo.jpg",
    alt: "Mole rojo de la casa con arroz",
    description: "Especial del martes. Mole rojo de la casa.",
  },
  {
    id: "menu-miercoles",
    name: "Relleno estilo a la costa",
    category: "Menú del Día",
    day: "Miércoles",
    image: "/media/RELLENO%20LA%20COSTA.jpg",
    alt: "Relleno estilo a la costa, especial del miércoles",
    description: "Especial del miércoles. Relleno estilo a la costa.",
  },
  {
    id: "menu-jueves",
    name: "Pozole blanco, verde y rojo",
    category: "Menú del Día",
    day: "Jueves",
    image: "/media/POXOLO.jpg",
    alt: "Pozole de la casa, especial del jueves",
    description: "Especial del jueves. Pozole blanco, verde o rojo.",
  },
  {
    id: "menu-viernes",
    name: "Cochinita de Pololcingo",
    category: "Menú del Día",
    day: "Viernes",
    image: "/media/cochinapolo.jpg",
    alt: "Cochinita de Pololcingo, especial del viernes",
    description: "Especial del viernes. Cochinita de Pololcingo.",
  },
  {
    id: "menu-sabado",
    name: "Clemole verde",
    category: "Menú del Día",
    day: "Sábado",
    image: "/media/clomole.jpg",
    alt: "Clemole verde de la casa, especial del sábado",
    description: "Especial del sábado. Clemole verde de la casa.",
  },
  {
    id: "chistorra",
    name: "Chistorra",
    serving: "250 g",
    category: "Entradas & Sopas",
    price: 175,
    description: "250 g frita con lechuga, jitomate y cebolla.",
  },
  {
    id: "queso",
    name: "Queso",
    serving: "250 g",
    category: "Entradas & Sopas",
    price: 180,
    description: "250 g con lechuga, cebolla, jitomate y chile jalapeño.",
  },
  {
    id: "mollejas",
    name: "Mollejas de res",
    serving: "200 g",
    category: "Entradas & Sopas",
    price: 160,
    description: "200 g fritas con lechuga y verduras.",
  },
  {
    id: "cecina-entrada",
    name: "Cecina",
    serving: "Entrada · 200 g",
    category: "Entradas & Sopas",
    price: 200,
    description: "200 g de carne de res con lechuga y verduras.",
  },
  {
    id: "huevos-codorniz",
    name: "Huevos de codorniz",
    serving: "12 piezas",
    category: "Entradas & Sopas",
    price: 240,
    description: "12 piezas enrolladas en tocino con lechuga, jitomate y cebolla.",
  },
  {
    id: "pato-desmenuzado",
    name: "Pato desmenuzado",
    serving: "1 orden",
    category: "Entradas & Sopas",
    price: 300,
    description: "1 orden desmenuzado y frito con lechuga, jitomate y cebolla.",
  },
  {
    id: "conejo-desmenuzado",
    name: "Conejo desmenuzado",
    serving: "1 orden",
    category: "Entradas & Sopas",
    price: 300,
    description: "1 orden desmenuzado y frito con lechuga, jitomate y cebolla.",
  },
  {
    id: "entrada-surtida",
    name: "Entrada Surtida",
    serving: "1 orden",
    category: "Entradas & Sopas",
    price: 600,
    description: "1 orden completa de huevos de codorniz, chistorra, mollejas y queso.",
  },
  {
    id: "botana-mixta",
    name: "Botana mixta",
    serving: "Pata y lengua",
    category: "Entradas & Sopas",
    image: "/media/botanapata.jpg",
    alt: "Botana mixta de pata y lengua con aguacate, cebolla y jitomate",
    description: "Pata y lengua, con aguacate, cebolla, jitomate y chile.",
  },
  {
    id: "sopa-medula",
    name: "Sopa de médula",
    category: "Entradas & Sopas",
    price: 130,
    description: "Caldo de la casa.",
  },
  {
    id: "sopa-tortilla",
    name: "Sopa de tortilla",
    category: "Entradas & Sopas",
    price: 130,
    description: "Caldo de la casa.",
  },
  {
    id: "consome",
    name: "Consomé de pichón extra",
    category: "Entradas & Sopas",
    price: 35,
    image: "/media/consome.webp",
    alt: "Tazón de consomé con carne de pichón",
    featured: true,
    cardName: "Consomé de pichón",
    description: "Consomé extra de pichón, para acompañar la mesa.",
  },
  {
    id: "pecho-ternera",
    name: "Pecho de ternera",
    serving: "400 g",
    category: "Cortes & Carnes",
    price: 420,
    description: "400 g acompañado de guacamole, frijoles y chiles jalapeños.",
  },
  {
    id: "cecina-res",
    name: "Cecina de res",
    serving: "200 g",
    category: "Cortes & Carnes",
    price: 220,
    description: "200 g de carne de res con lechuga, verduras y chiles jalapeños.",
  },
  {
    id: "tampiquena",
    name: "Tampiqueña",
    serving: "200 g",
    category: "Cortes & Carnes",
    price: 240,
    description: "200 g de filete de res a la plancha, frijoles refritos, 1 enchilada roja, lechuga, jitomate y cebolla.",
  },
  {
    id: "arrachera",
    name: "Arrachera de res",
    serving: "300 g",
    category: "Cortes & Carnes",
    price: 340,
    description: "300 g de carne de res al carbón con chile jalapeño y cebolla.",
  },
  {
    id: "chicharron-regio",
    name: "Chicharrón Regio",
    serving: "200 g",
    category: "Cortes & Carnes",
    price: 220,
    image: "/media/chicharron.jpg",
    alt: "Chicharrón regio con guacamole",
    description: "200 g de panceta frita con una porción de guacamole.",
  },
  {
    id: "brocheta-res",
    name: "Brocheta de res",
    category: "Cortes & Carnes",
    price: 270,
    description: "Carne de res, pimientos, tocino y cebolla al carbón.",
  },
  {
    id: "asado-tira",
    name: "Asado de tira",
    serving: "2 piezas",
    category: "Cortes & Carnes",
    price: 270,
    description: "2 piezas de costilla de res al carbón con chile jalapeño y cebolla.",
  },
  {
    id: "salmon-maxhi",
    name: "Salmón Maxhi",
    category: "Cortes & Carnes",
    price: 350,
    description: "Lonja de salmón preparada con la receta de la casa.",
  },
  {
    id: "rib-eye",
    name: "Rib Eye",
    serving: "400 g",
    category: "Cortes & Carnes",
    price: 450,
    description: "400 g al carbón con chile jalapeño y cebolla.",
  },
  {
    id: "t-bone",
    name: "T-Bone",
    serving: "400 g",
    category: "Cortes & Carnes",
    price: 450,
    description: "400 g al carbón con chile jalapeño y cebolla.",
  },
  {
    id: "prime-rib",
    name: "Prime Rib",
    serving: "400 g",
    category: "Cortes & Carnes",
    price: 450,
    description: "400 g al carbón con chile jalapeño y cebolla.",
  },
  {
    id: "new-york",
    name: "New York",
    serving: "400 g",
    category: "Cortes & Carnes",
    price: 450,
    description: "400 g al carbón con chile jalapeño y cebolla.",
  },
  {
    id: "cowboy",
    name: "Cowboy",
    serving: "400 g",
    category: "Cortes & Carnes",
    price: 450,
    description: "400 g al carbón con chile jalapeño y cebolla.",
  },
  {
    id: "cabrito",
    name: "Cabrito al horno",
    serving: "400 g",
    category: "Cortes & Carnes",
    price: 480,
    description: "400 g con guacamole, frijoles y chiles jalapeños.",
  },
  {
    id: "enchiladas-rojas",
    name: "Orden de enchiladas rojas",
    serving: "3 piezas",
    category: "Guarniciones",
    price: 100,
    description: "3 piezas.",
  },
  {
    id: "enfrijoladas",
    name: "Orden de enfrijoladas",
    category: "Guarniciones",
    price: 100,
  },
  {
    id: "chalupitas",
    name: "Orden de chalupitas",
    serving: "3 piezas",
    category: "Guarniciones",
    price: 100,
    description: "3 piezas con frijoles, chiles y guacamole.",
  },
  {
    id: "papas-fritas",
    name: "Orden de papas fritas",
    category: "Guarniciones",
    price: 100,
  },
  {
    id: "guacamole",
    name: "Orden de guacamole S/T",
    category: "Guarniciones",
    price: 100,
    image: "/media/guacamole.jpg",
    alt: "Guacamole de la casa con totopos",
    description: "Guacamole de la casa.",
  },
  {
    id: "aguacate",
    name: "Orden de aguacate S/T",
    category: "Guarniciones",
    price: 100,
  },
  {
    id: "ensalada-machi",
    name: "Ensalada Machi",
    category: "Guarniciones",
    price: 120,
  },
  {
    id: "ensalada-sencilla",
    name: "Ensalada sencilla",
    category: "Guarniciones",
    price: 60,
  },
  {
    id: "frijoles",
    name: "Orden de frijoles",
    category: "Guarniciones",
    price: 90,
  },
  {
    id: "cocteleria",
    name: "Coctelería de la casa",
    category: "Coctelería",
    image: "/media/cocteleria.webp",
    alt: "Cóctel con hielo y una rodaja de limón en la barra",
    tag: "2×1 · 18:00 a 19:00",
    description: "Todos los días, de 18:00 a 19:00 hrs, 2×1 en coctelería. Pregunta en la barra por los cócteles participantes.",
  },
];

export const featuredDishes = [
  dishes.find((dish) => dish.id === "pichon-enchilado"),
  dishes.find((dish) => dish.id === "pichon"),
  dishes.find((dish) => dish.id === "consome"),
];

export function formatPrice(price) {
  if (price == null) return "";
  return `$${price}`;
}

export function dishPhoto(dish) {
  return dish.cardImage || dish.image || "";
}

export function dishFrames(dish) {
  const frames = [];
  if (dish.image) frames.push({ src: dish.image, alt: dish.alt || dish.name });
  if (dish.cardImage && dish.cardImage !== dish.image) {
    frames.push({ src: dish.cardImage, alt: dish.cardAlt || dish.alt || dish.name });
  }
  return frames;
}

export function weekdayName(date = new Date()) {
  return WEEKDAYS[date.getDay()];
}

export function todaysSpecial(date = new Date()) {
  const day = weekdayName(date);
  return dishes.find((dish) => dish.day === day) || null;
}

export function isTodaysSpecial(dish, date = new Date()) {
  return Boolean(dish?.day) && dish.day === weekdayName(date);
}

export function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function dishMatchesQuery(dish, query) {
  const terms = normalizeText(query).trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = normalizeText(
    [dish.name, dish.cardName, dish.description, dish.serving, dish.day, dish.category, dish.tag]
      .filter(Boolean)
      .join(" "),
  );
  return terms.every((term) => haystack.includes(term));
}

export const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("El Maxhi Restaurant Bar, Carr. A Iguala Taxco Km 106, 40000 Iguala de la Independencia, Guerrero, México");

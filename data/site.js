export const site = {
  name: "EL MAXHI",
  tagline: "RESTAURANTE & BAR · DESDE 1981",
  city: "Iguala, Guerrero",
  since: "1981",
  phoneDisplay: "733 332 5577",
  phoneTel: "+527333325577",
  whatsapp: "https://wa.me/527333325577",
  addressLine1: "Carr. A Iguala–Taxco Km 106",
  addressLine2: "40000 Iguala de la Independencia, Gro.",
  hours: ["Comidas, tardes y sobremesas · Todos los días", "2×1 en coctelería · 18:00 a 19:00"],
  socials: [
    { label: "Facebook", handle: "elmaxhirestaurante", href: "https://www.facebook.com/elmaxhirestaurante" },
    { label: "Instagram", handle: "@el_maxhi", href: "https://www.instagram.com/el_maxhi/" },
  ],
};

export const media = {
  night: "/media/El%20Maxhi%20iluminado%20bajo%20la%20noche.png",
  pichonEnchilado: "/media/pichon-enchilado.webp",
  pichonFrito: "/media/pichon-frito.webp",
  consome: "/media/consome.webp",
  salon: "/media/PXL_20261101_234029989.jpg",
  pjichon: "/media/pjichon.jpg",
  ede: "/media/ede.jpg",
  cocteleria: "/media/cocteleria.webp",
  ambiente: "/media/ambiente.mp4",
  tarde: "/media/tarde-salon.jpg",
  logo: "/media/maxhilogo.png",
};

export function whatsappMessage(text) {
  return `${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

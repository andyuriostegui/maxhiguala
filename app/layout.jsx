import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: "EL MAXHI · Restaurante & Bar · Iguala, Guerrero",
  description:
    "Desde 1981 en Iguala, Guerrero. Recetas de casa, pichones, cortes al carbón, sobremesas y barra. Carr. A Iguala–Taxco Km 106.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="bg-obsidian font-sans text-cream antialiased">{children}</body>
    </html>
  );
}

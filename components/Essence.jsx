import Image from "next/image";
import { media } from "../data/site";
import { CornerFrame, SectionKicker } from "./ui";

const collage = [
  {
    src: media.ede,
    alt: "Bienvenida en El Maxhi con tequila de la casa",
    className: "row-span-2 min-h-[280px] lg:min-h-[420px]",
  },
  {
    src: media.consome,
    alt: "Consomé de pichón servido en tazón",
    className: "min-h-[160px] lg:min-h-[200px]",
  },
  {
    src: media.pjichon,
    alt: "Pichones de la casa con ensalada, jitomate y cebolla",
    className: "min-h-[160px] lg:min-h-[200px]",
  },
];

export default function Essence() {
  return (
    <section id="historia" aria-labelledby="essence-title" className="relative scroll-mt-24 lg:scroll-mt-28">
      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="bg-cream px-6 py-16 text-ink sm:px-10 lg:px-16 lg:py-24 xl:px-24">
          <SectionKicker className="text-ink/70">Iguala, Guerrero · Desde 1981</SectionKicker>
          <h2
            id="essence-title"
            className="font-display mt-6 max-w-[18ch] text-[clamp(2.35rem,4.4vw,4.15rem)] leading-[1.02] font-medium tracking-[-0.02em]"
          >
            Más de Cuatro Décadas Marcando el Sazón en Iguala
          </h2>
          <p className="mt-7 max-w-[42rem] text-[1.05rem] leading-relaxed text-ink/75">
            Desde 1981, El Maxhi es punto de reunión para quienes saben comer bien. Recetas de casa, pichones con
            historia, cortes al carbón y mesas donde la tarde se alarga sin prisas.
          </p>

          <div className="mt-12 grid grid-cols-2 grid-rows-2 gap-3">
            {collage.map((photo) => (
              <div key={photo.src} className={`relative overflow-hidden rounded-[4px] ${photo.className}`}>
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 1024px) 50vw, 32vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="pattern-greca relative flex min-h-[520px] items-center overflow-hidden border-t border-[rgba(200,169,126,0.15)] px-8 py-20 lg:border-t-0 lg:border-l lg:px-14">
          <div className="arch-grid pointer-events-none absolute inset-0 opacity-40" />
          <CornerFrame />
          <blockquote className="relative mx-auto max-w-[28rem]">
            <span aria-hidden="true" className="font-display block text-7xl leading-none text-gold">
              “
            </span>
            <p className="font-display -mt-6 text-[clamp(1.7rem,2.6vw,2.35rem)] leading-[1.2] text-cream">
              Aquí se come bien, se brinda a gusto y se vuelve porque la mesa siempre está a la altura.
            </p>
            <p className="mt-8 text-[1.02rem] leading-relaxed text-ash">
              Comidas en familia, sobremesa sin prisa y la barra cuando cae el sol. Así se pasan las tardes en Iguala,
              desde 1981.
            </p>
            <footer className="mt-10 font-sans text-[0.68rem] font-semibold tracking-[0.2em] text-gold uppercase">
              El Maxhi · Iguala, Guerrero
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

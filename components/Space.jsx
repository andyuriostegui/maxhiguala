import { media } from "../data/site";
import { GhostLink, SectionKicker } from "./ui";

export default function Space() {
  return (
    <section id="espacio" aria-labelledby="space-title" className="relative scroll-mt-24 bg-obsidian lg:scroll-mt-28">
      <div className="arch-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-28">
        <div className="relative">
          <div className="absolute -inset-px bg-gold/35" />
          <div className="relative overflow-hidden rounded-[4px] bg-obsidian-card">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={media.tarde}
              className="aspect-[16/11] h-auto w-full object-cover"
            >
              <source src={media.ambiente} type="video/mp4" />
            </video>
          </div>
        </div>

        <div>
          <SectionKicker className="text-gold">El espacio</SectionKicker>
          <h2
            id="space-title"
            className="font-display mt-6 max-w-[14ch] text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[1.02] font-medium tracking-[-0.02em] text-cream"
          >
            Las tardes de Iguala, en una mesa.
          </h2>
          <p className="mt-6 max-w-[36rem] text-[1.05rem] leading-relaxed text-ash">
            La tarde entra a la terraza. Aquí se come en familia, se alarga la sobremesa y se brinda cuando baja el sol.
            Más de cuatro décadas en Iguala, con la mesa lista y sin prisas.
          </p>
          <GhostLink href="#ubicacion" className="group mt-10">
            Ver la dirección
          </GhostLink>
        </div>
      </div>
    </section>
  );
}

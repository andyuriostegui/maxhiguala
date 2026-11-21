import Image from "next/image";
import { media } from "../data/site";
import { GhostLink, GoldButton } from "./ui";

export default function Hero({ onReserve }) {
  return (
    <section id="inicio" className="relative isolate overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-20">
        <Image
          src={media.night}
          alt="El Maxhi iluminado bajo la noche en Iguala"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 46%, rgba(15,18,16,0.52) 0%, rgba(15,18,16,0.32) 42%, rgba(15,18,16,0.7) 100%), linear-gradient(180deg, rgba(15,18,16,0.72) 0%, rgba(15,18,16,0.38) 40%, rgba(15,18,16,0.55) 72%, #0F1210 100%)",
        }}
      />
      <div className="arch-grid arch-grid-fade pointer-events-none absolute inset-0 -z-10 opacity-50" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1100px] flex-col items-center justify-center px-6 py-32 text-center">
        <p className="reveal reveal-1 font-sans text-[0.62rem] font-semibold tracking-[0.28em] text-gold uppercase sm:text-[0.68rem]">
          Iguala, Guerrero · Desde 1981
        </p>
        <h1
          id="hero-title"
          className="reveal reveal-2 font-display mt-7 max-w-[16ch] text-[clamp(2.45rem,6.2vw,5.5rem)] leading-[0.96] font-medium tracking-[-0.02em] text-cream"
        >
          Las tardes de Iguala
          <br />
          <em className="font-medium italic">se quedan en la mesa</em>
        </h1>
        <p className="reveal reveal-3 mt-6 max-w-[36rem] text-[1.05rem] leading-relaxed text-ash sm:text-[1.12rem]">
          Recetas de casa, pichones con historia y cortes al carbón. Comida en familia, sobremesa y barra al atardecer.
        </p>
        <div className="reveal reveal-4 mt-10 flex flex-col items-center gap-5 sm:flex-row">
          <GoldButton type="button" onClick={onReserve}>
            Reservar una Mesa
          </GoldButton>
          <GhostLink href="#carta" className="group">
            Explorar la Carta
          </GhostLink>
        </div>
      </div>
    </section>
  );
}

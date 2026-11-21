import { mapsUrl } from "../data/carta";
import { site, whatsappMessage } from "../data/site";
import { BrandMark, GoldButton } from "./ui";

export default function Footer({ onReserve }) {
  return (
    <footer id="ubicacion" className="relative scroll-mt-24 bg-obsidian lg:scroll-mt-28">
      <div className="h-px w-full bg-[rgba(200,169,126,0.15)]" />
      <div className="arch-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <BrandMark align="left" />
            <p className="mt-8 max-w-[28rem] text-[1.05rem] leading-relaxed text-ash">
              Carr. A Iguala–Taxco Km 106, 40000 Iguala de la Independencia, Gro. Una mesa en el camino, desde 1981.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <GoldButton as="a" href={mapsUrl} target="_blank" rel="noreferrer">
                Cómo llegar
              </GoldButton>
              <GoldButton
                as="a"
                variant="outline"
                href={whatsappMessage("Hola, me gustaría información y disponibilidad en El Maxhi.")}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </GoldButton>
            </div>
          </div>

          <div className="grid gap-10 border-t border-[rgba(200,169,126,0.15)] pt-10 sm:grid-cols-2 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
            <div>
              <p className="font-sans text-[0.68rem] font-semibold tracking-[0.2em] text-gold uppercase">Dirección</p>
              <p className="mt-4 leading-relaxed text-cream">
                {site.addressLine1}
                <br />
                {site.addressLine2}
              </p>
            </div>
            <div>
              <p className="font-sans text-[0.68rem] font-semibold tracking-[0.2em] text-gold uppercase">Horarios</p>
              <ul className="mt-4 space-y-2 text-cream">
                {site.hours.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-sans text-[0.68rem] font-semibold tracking-[0.2em] text-gold uppercase">Teléfono</p>
              <a href={`tel:${site.phoneTel}`} className="mt-4 inline-block text-cream transition hover:text-gold">
                {site.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="font-sans text-[0.68rem] font-semibold tracking-[0.2em] text-gold uppercase">Reservar</p>
              <button
                type="button"
                onClick={onReserve}
                className="mt-4 font-sans text-[0.68rem] font-semibold tracking-[0.2em] text-cream uppercase transition hover:text-gold"
              >
                Solicitar una mesa
              </button>
            </div>
            <div className="sm:col-span-2">
              <p className="font-sans text-[0.68rem] font-semibold tracking-[0.2em] text-gold uppercase">Redes</p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {site.socials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-sans text-[0.82rem] tracking-[0.04em] text-cream transition hover:text-gold"
                  >
                    {social.label} · {social.handle}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[rgba(200,169,126,0.15)] pt-6 text-[0.82rem] text-ash sm:flex-row sm:items-center sm:justify-between">
          <span>El Maxhi · Iguala, Guerrero · Desde 1981</span>
          <span>Restaurante &amp; Bar</span>
        </div>
      </div>
    </footer>
  );
}

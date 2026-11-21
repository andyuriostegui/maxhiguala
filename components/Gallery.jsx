"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CloseIcon, SectionKicker } from "./ui";

const photos = [
  {
    src: "/media/fotosgaleria1.jpg",
    alt: "Familia reunida en una mesa larga del salón de El Maxhi",
  },
  {
    src: "/media/fotosgaleria2.jpg",
    alt: "Comida en familia junto a la fuente de piedra del restaurante",
  },
  {
    src: "/media/fotosgaleria3.jpg",
    alt: "Sobremesa frente a la cascada de piedra, con la mesa servida",
  },
  {
    src: "/media/fotosgaleria4.jpg",
    alt: "Dos comensales en una mesa bajo el letrero de El Maxhi",
  },
  {
    src: "/media/fotosgaleria5.jpg",
    alt: "Mesa en el salón, con la fuente de piedra y las palmas al fondo",
  },
  {
    src: "/media/fotosgaleria6.jpg",
    alt: "El salón de El Maxhi con mesas puestas y comensales comiendo",
  },
  {
    src: "/media/fotosgaleria7.jpg",
    alt: "Mesero de El Maxhi con una charola de botellas en la terraza",
  },
  {
    src: "/media/fotosgaleria8.jpg",
    alt: "Reunión en el salón de El Maxhi, con la mesa tendida",
  },
];

function Arrow({ direction }) {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
      {direction === "left" ? (
        <path d="M10.2 2.8 5 8l5.2 5.2" stroke="currentColor" strokeWidth="1.2" />
      ) : (
        <path d="M5.8 2.8 11 8l-5.2 5.2" stroke="currentColor" strokeWidth="1.2" />
      )}
    </svg>
  );
}

export default function Gallery() {
  const dialog = useRef(null);
  const [index, setIndex] = useState(null);
  const open = index !== null;
  const photo = open ? photos[index] : null;

  const close = () => setIndex(null);
  const step = (delta) => {
    setIndex((current) => {
      if (current === null) return current;
      return (current + delta + photos.length) % photos.length;
    });
  };

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section id="galeria" aria-labelledby="gallery-title" className="scroll-mt-24 bg-obsidian lg:scroll-mt-28">
      <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <SectionKicker className="text-gold">La casa</SectionKicker>
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="gallery-title"
            className="font-display max-w-[14ch] text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[1.02] font-medium tracking-[-0.02em] text-cream"
          >
            La mesa, la tarde, la gente
          </h2>
          <p className="max-w-[34rem] text-[1.05rem] leading-relaxed text-ash">
            Comidas en familia, reuniones que se alargan y la barra cuando baja el sol. Así se ve El Maxhi en Iguala.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {photos.map((item, photoIndex) => {
            const lead = photoIndex === 0;
            return (
              <li key={item.src} className={lead ? "col-span-2 row-span-2" : ""}>
                <button
                  type="button"
                  className={`group relative block w-full overflow-hidden rounded-[4px] bg-obsidian-card ${
                    lead ? "h-full min-h-[280px] lg:min-h-[560px]" : "aspect-[3/4]"
                  }`}
                  onClick={() => setIndex(photoIndex)}
                  aria-haspopup="dialog"
                  aria-label={`Ver foto ${photoIndex + 1} de ${photos.length}: ${item.alt}`}
                >
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    sizes={lead ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                    className="img-zoom object-cover"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <dialog
        ref={dialog}
        className="luxury-dialog lightbox-dialog"
        aria-labelledby="lightbox-caption"
        onClose={close}
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
      >
        {photo ? (
          <div className="relative flex h-full w-full flex-col" onClick={close}>
            <div className="flex items-center justify-between px-4 py-4 sm:px-6" onClick={(event) => event.stopPropagation()}>
              <p id="lightbox-caption" className="font-sans text-[0.68rem] font-semibold tracking-[0.18em] text-gold uppercase">
                {index + 1} / {photos.length}
              </p>
              <button
                type="button"
                onClick={close}
                className="grid h-11 w-11 place-items-center border border-gold/30 text-cream transition hover:border-gold"
                aria-label="Cerrar galería"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 px-4 sm:px-20">
              <div
                className="relative mx-auto h-full w-full max-w-5xl"
                onClick={(event) => event.stopPropagation()}
              >
                <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" priority />
              </div>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(-1);
                }}
                className="absolute top-1/2 left-3 grid h-12 w-12 -translate-y-1/2 place-items-center border border-gold/30 bg-obsidian/80 text-cream transition hover:border-gold sm:left-6"
                aria-label="Foto anterior"
              >
                <Arrow direction="left" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(1);
                }}
                className="absolute top-1/2 right-3 grid h-12 w-12 -translate-y-1/2 place-items-center border border-gold/30 bg-obsidian/80 text-cream transition hover:border-gold sm:right-6"
                aria-label="Foto siguiente"
              >
                <Arrow direction="right" />
              </button>
            </div>

            <p className="px-6 py-4 text-center text-sm leading-relaxed text-ash" onClick={(event) => event.stopPropagation()}>
              {photo.alt}
            </p>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}

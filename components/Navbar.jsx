"use client";

import { useEffect, useState } from "react";
import { BrandMark, GoldButton } from "./ui";

const links = [
  { href: "#carta", label: "La Carta" },
  { href: "#historia", label: "Nuestra Historia" },
  { href: "#galeria", label: "Galería" },
  { href: "#espacio", label: "El Espacio" },
  { href: "#ubicacion", label: "Ubicación" },
];

export default function Navbar({ onReserve }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${
          scrolled || open
            ? "border-b border-[rgba(200,169,126,0.15)] bg-obsidian/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="relative mx-auto flex h-[4.5rem] max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:h-[5.35rem] lg:px-10">
          <nav className="hidden items-center gap-4 xl:gap-7 lg:flex" aria-label="Navegación principal">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap font-sans text-[0.58rem] font-semibold tracking-[0.14em] text-cream/80 uppercase transition duration-300 hover:text-gold xl:text-[0.66rem] xl:tracking-[0.18em]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="relative z-10 flex h-11 w-11 items-center justify-center text-cream lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3.5 w-5">
              <i className={`absolute left-0 h-px w-full bg-current transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <i className={`absolute top-1.5 left-0 h-px w-full bg-current transition ${open ? "opacity-0" : ""}`} />
              <i className={`absolute left-0 h-px w-full bg-current transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>

          <a
            href="#inicio"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            aria-label="El Maxhi, inicio"
            onClick={close}
          >
            <BrandMark compact />
          </a>

          <GoldButton
            type="button"
            onClick={onReserve}
            className="relative z-10 min-h-10 px-3 text-[0.58rem] sm:px-5 lg:min-h-12 lg:px-7 lg:text-[0.68rem]"
          >
            <span className="sm:hidden">Reservar</span>
            <span className="hidden sm:inline">Reservar Mesa</span>
          </GoldButton>
        </div>
      </header>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-auto bg-obsidian lg:hidden"
        >
          <nav className="flex flex-col gap-1 px-8 py-10" aria-label="Menú móvil">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="font-display py-3 text-4xl tracking-tight text-cream"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}

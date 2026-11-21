"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { dishFrames, formatPrice } from "../data/carta";
import { CloseIcon, GoldButton } from "./ui";

export default function DishDrawer({ dish, onClose, onReserve }) {
  const dialog = useRef(null);

  useEffect(() => {
    const element = dialog.current;
    if (!element || !dish) return;
    if (!element.open) element.showModal();
    const trigger = document.activeElement;
    document.body.style.overflow = "hidden";
    return () => {
      if (element.open) element.close();
      document.body.style.overflow = "";
      trigger?.focus?.({ preventScroll: true });
    };
  }, [dish]);

  if (!dish) return null;

  const meta = dish.serving || dish.day || dish.tag;
  const price = formatPrice(dish.price);
  const frames = dishFrames(dish);

  return (
    <dialog
      ref={dialog}
      className="luxury-dialog drawer-dialog"
      aria-labelledby="dish-name"
      aria-describedby="dish-description"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
    >
      <div className={frames.length ? "grid md:grid-cols-[46%_54%]" : ""}>
        {frames.length ? (
          <div className={frames.length > 1 ? "grid sm:grid-cols-2 md:grid-cols-1" : ""}>
            {frames.map((frame) => (
              <div key={frame.src} className="relative min-h-[240px] bg-[#121614] md:min-h-[320px]">
                <Image src={frame.src} alt={frame.alt} fill sizes="(max-width: 768px) 100vw, 46vw" className="object-contain" />
              </div>
            ))}
          </div>
        ) : null}
        <div className="relative flex flex-col justify-center px-7 py-10 sm:px-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 grid h-10 w-10 place-items-center border border-gold/25 text-ash transition hover:border-gold hover:text-cream"
            aria-label="Cerrar ficha"
          >
            <CloseIcon />
          </button>
          <p className="font-sans text-[0.62rem] font-semibold tracking-[0.22em] text-gold uppercase">{dish.category}</p>
          <h2 id="dish-name" className="font-display mt-3 text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.05] text-cream">
            {dish.name}
          </h2>
          {meta ? (
            <p className="mt-3 font-sans text-[0.68rem] tracking-[0.16em] text-gold uppercase">{meta}</p>
          ) : null}
          {price ? <p className="mt-3 font-display text-3xl text-gold">{price}</p> : null}
          {dish.description ? (
            <p id="dish-description" className="mt-5 text-[1.02rem] leading-relaxed text-ash">
              {dish.description}
            </p>
          ) : (
            <p id="dish-description" className="sr-only">
              {dish.name}
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <GoldButton
              type="button"
              onClick={() => {
                onClose();
                onReserve();
              }}
            >
              Reservar mesa
            </GoldButton>
            <button
              type="button"
              onClick={onClose}
              className="font-sans text-[0.68rem] font-semibold tracking-[0.2em] text-gold uppercase"
            >
              Volver a la carta
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

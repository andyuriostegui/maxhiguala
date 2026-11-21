"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  categories,
  dishMatchesQuery,
  dishPhoto,
  formatPrice,
  isTodaysSpecial,
  weekdayName,
} from "../data/carta";
import { SectionKicker } from "./ui";

function priceLabel(dish) {
  if (dish.price != null) return formatPrice(dish.price);
  if (dish.tag) return dish.tag;
  return "";
}

function DailyCard({ dish, onOpen }) {
  const todayHit = isTodaysSpecial(dish);
  const photo = dishPhoto(dish);

  return (
    <button
      type="button"
      className={`group w-full overflow-hidden rounded-[4px] text-left ring-1 ${
        todayHit ? "ring-gold" : "ring-[rgba(200,169,126,0.28)]"
      }`}
      aria-haspopup="dialog"
      aria-current={todayHit ? "true" : undefined}
      aria-label={`${todayHit ? "Especial de hoy. " : ""}Ver ficha de ${dish.name}`}
      onClick={() => onOpen(dish)}
    >
      {photo ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={photo}
            alt={dish.cardAlt || dish.alt || dish.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="h-full w-full object-cover object-center"
          />
        </div>
      ) : null}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-sans text-[0.62rem] font-semibold tracking-[0.18em] text-gold uppercase">{dish.day}</p>
          {todayHit ? (
            <span className="bg-gold px-2 py-1 font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-ink uppercase">
              Hoy
            </span>
          ) : null}
        </div>
        <h3 className="font-display mt-2 text-[clamp(1.35rem,1.7vw,1.7rem)] leading-[1.12]">{dish.name}</h3>
        {dish.description ? (
          <p className="mt-1.5 max-w-[36ch] text-[0.9rem] leading-relaxed text-ink/60">{dish.description}</p>
        ) : null}
      </div>
    </button>
  );
}

function DishRow({ dish, onOpen, showCategory = false }) {
  const label = priceLabel(dish);
  const todayHit = isTodaysSpecial(dish);

  return (
    <button
      type="button"
      className={`group w-full py-1 text-left ${todayHit ? "rounded-[4px] bg-white px-3 py-3 ring-1 ring-gold" : ""}`}
      aria-haspopup="dialog"
      aria-current={todayHit ? "true" : undefined}
      aria-label={`${todayHit ? "Especial de hoy. " : ""}Ver ficha de ${dish.name}`}
      onClick={() => onOpen(dish)}
    >
      {dish.day ? (
        <span className="mb-2 flex items-center justify-between gap-3">
          <span className="font-sans text-[0.62rem] font-semibold tracking-[0.18em] text-gold uppercase">{dish.day}</span>
          {todayHit ? (
            <span className="bg-gold px-2 py-1 font-sans text-[0.58rem] font-semibold tracking-[0.16em] text-ink uppercase">
              Hoy
            </span>
          ) : null}
        </span>
      ) : null}
      <span className="flex items-baseline gap-3">
        <span className="font-display text-[clamp(1.4rem,1.85vw,1.8rem)] leading-none">{dish.name}</span>
        {label ? <span className="min-w-6 flex-1 border-b border-dotted border-gold/35" /> : null}
        {label ? (
          <span className="shrink-0 font-sans text-[0.72rem] font-semibold tracking-[0.14em] text-gold uppercase">
            {label}
          </span>
        ) : null}
      </span>
      {showCategory ? (
        <span className="mt-2 block font-sans text-[0.62rem] font-semibold tracking-[0.16em] text-gold uppercase">
          {dish.category}
        </span>
      ) : null}
      {dish.serving ? (
        <span className="mt-2 block font-sans text-[0.62rem] font-semibold tracking-[0.16em] text-ink/45 uppercase">
          {dish.serving}
        </span>
      ) : null}
      {dish.description ? (
        <span className="mt-1.5 block max-w-[46ch] text-[0.92rem] leading-relaxed text-ink/60">{dish.description}</span>
      ) : null}
    </button>
  );
}

export default function Menu({ dishes, onOpenDish }) {
  const [group, setGroup] = useState(categories[0]);
  const [query, setQuery] = useState("");
  const todayDish = useMemo(() => {
    const day = weekdayName();
    return dishes.find((dish) => dish.day === day) || null;
  }, [dishes]);

  const { visible, fallback } = useMemo(() => {
    const inCategory = dishes.filter((dish) => dish.category === group && dishMatchesQuery(dish, query));
    const everywhere = dishes.filter((dish) => dishMatchesQuery(dish, query));
    const useFallback = query.trim().length > 0 && inCategory.length === 0 && everywhere.length > 0;
    return {
      visible: useFallback ? everywhere : inCategory,
      fallback: useFallback,
    };
  }, [dishes, group, query]);

  const dailyLayout = !fallback && group === "Menú del Día";

  return (
    <section id="carta" aria-labelledby="menu-title" className="scroll-mt-24 bg-cream text-ink lg:scroll-mt-28">
      <div className="mx-auto max-w-[1320px] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div>
          <SectionKicker className="text-ink/70">La carta</SectionKicker>
          <h2
            id="menu-title"
            className="font-display mt-5 text-[clamp(2.5rem,5vw,4.6rem)] leading-[1.02] font-medium tracking-[-0.02em]"
          >
            La carta de la casa
          </h2>
          <p className="mt-4 max-w-[38rem] text-[1.05rem] leading-relaxed text-ink/70">
            Pichones, cortes al carbón, el plato de cada día y la barra para alargar la tarde. Busca por palabra o entra
            por categoría.
          </p>
        </div>

        {todayDish ? (
          <button
            type="button"
            onClick={() => {
              setGroup("Menú del Día");
              setQuery("");
              document.getElementById("carta-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="mt-8 flex w-full flex-wrap items-center justify-between gap-3 border border-gold/50 bg-white px-5 py-4 text-left transition hover:border-gold"
          >
            <span>
              <span className="font-sans text-[0.62rem] font-semibold tracking-[0.18em] text-gold uppercase">
                Hoy · {todayDish.day}
              </span>
              <span className="font-display mt-1 block text-2xl leading-none">{todayDish.name}</span>
            </span>
            <span className="font-sans text-[0.62rem] font-semibold tracking-[0.16em] text-ink/60 uppercase">
              Ver en el menú del día
            </span>
          </button>
        ) : (
          <p className="mt-8 border border-[rgba(200,169,126,0.35)] px-5 py-4 text-[0.98rem] text-ink/70">
            El plato del día corre de lunes a sábado. El domingo la carta de siempre sigue en la mesa.
          </p>
        )}

        <label className="mt-12 block max-w-xl">
          <span className="font-sans text-[0.62rem] font-semibold tracking-[0.18em] text-ink/50 uppercase">Buscar en la carta</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pichón, mole, pozole, cochinita…"
            className="mt-2 w-full border-0 border-b border-[rgba(200,169,126,0.45)] bg-transparent py-3 text-[1.05rem] text-ink outline-none placeholder:text-ink/35 focus:border-gold"
          />
        </label>

        <div
          id="carta-tabs"
          className="mt-8 flex scroll-mt-28 gap-6 overflow-x-auto border-b border-[rgba(200,169,126,0.28)] pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Categorías de la carta"
        >
          {categories.map((name) => {
            const active = group === name;
            return (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setGroup(name);
                  document.getElementById("carta-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`relative shrink-0 pb-4 font-sans text-[0.62rem] font-semibold tracking-[0.18em] whitespace-nowrap uppercase transition duration-300 ${
                  active ? "text-ink" : "text-ink/40 hover:text-ink/70"
                }`}
              >
                {name}
                <span
                  className={`absolute right-0 bottom-0 left-0 h-px origin-left bg-gold transition duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div key={`${group}-${query}-${fallback}`} className="menu-fade mt-10">
          {query.trim() ? (
            <p className="mb-6 text-sm text-ink/55">
              {fallback
                ? `Nada en ${group} con “${query.trim()}”. Esto es lo que sí aparece en la carta.`
                : visible.length === 0
                  ? `Nada coincide con “${query.trim()}”.`
                  : `${visible.length} ${visible.length === 1 ? "resultado" : "resultados"} en ${group}.`}
            </p>
          ) : null}

          {visible.length === 0 ? (
            <p className="text-[1.02rem] text-ink/60">Prueba con otra palabra: pichón, rabo, mole, clemole o corte.</p>
          ) : dailyLayout ? (
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((dish) => (
                <DailyCard key={dish.id} dish={dish} onOpen={onOpenDish} />
              ))}
            </div>
          ) : (
            <div className="grid gap-x-16 gap-y-8 md:grid-cols-2">
              {visible.map((dish) => (
                <DishRow key={dish.id} dish={dish} onOpen={onOpenDish} showCategory={fallback} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

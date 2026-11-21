"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "../../data/carta";
import { BrandMark, GoldButton } from "../ui";

function toDraft(dishes) {
  const draft = {};
  for (const dish of dishes) {
    draft[dish.id] = dish.price == null ? "" : String(dish.price);
  }
  return draft;
}

export default function PricePanel({ dishes: initialDishes }) {
  const router = useRouter();
  const [dishes, setDishes] = useState(initialDishes);
  const [draft, setDraft] = useState(() => toDraft(initialDishes));
  const [saved, setSaved] = useState(() => toDraft(initialDishes));
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(saved), [draft, saved]);

  const grouped = useMemo(
    () =>
      categories.map((category) => ({
        category,
        items: dishes.filter((dish) => dish.category === category),
      })),
    [dishes],
  );

  async function onSave(event) {
    event.preventDefault();
    setPending(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/admin/prices", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prices: draft }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || "No se pudieron guardar los precios.");
        return;
      }
      setDishes(data.dishes);
      const next = toDraft(data.dishes);
      setDraft(next);
      setSaved(next);
      setNotice("Precios actualizados. Ya se ven en la carta.");
      router.refresh();
    } catch {
      setError("No se pudieron guardar los precios.");
    } finally {
      setPending(false);
    }
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 sm:px-10">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(200,169,126,0.28)] pb-6">
        <a href="/" className="rounded-sm bg-obsidian px-3 py-2">
          <BrandMark compact />
        </a>
        <div className="flex items-center gap-4">
          <a href="/" className="font-sans text-[0.62rem] font-semibold tracking-[0.16em] text-ink/50 uppercase">
            Ver carta
          </a>
          <button
            type="button"
            onClick={onLogout}
            className="font-sans text-[0.62rem] font-semibold tracking-[0.16em] text-gold uppercase"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <h1 className="font-display mt-8 text-[clamp(2.2rem,5vw,3.4rem)] leading-none">Precios de la carta</h1>
      <p className="mt-3 max-w-[40rem] text-[1.02rem] text-ink/65">
        Cambia el número y guarda. El menú público muestra el precio nuevo al recargar. Si un platillo no lleva precio,
        deja el campo vacío.
      </p>

      <form onSubmit={onSave} className="mt-10 pb-28">
        {grouped.map(({ category, items }) => (
          <section key={category} className="mt-10 first:mt-0">
            <h2 className="font-sans text-[0.62rem] font-semibold tracking-[0.2em] text-gold uppercase">{category}</h2>
            <ul className="mt-4 divide-y divide-[rgba(200,169,126,0.22)] border-y border-[rgba(200,169,126,0.22)]">
              {items.map((dish) => (
                <li key={dish.id} className="grid items-center gap-3 py-4 sm:grid-cols-[1fr_7rem]">
                  <div>
                    <p className="font-display text-[1.45rem] leading-none">{dish.name}</p>
                    <p className="mt-1 font-sans text-[0.62rem] tracking-[0.12em] text-ink/45 uppercase">
                      {[dish.day, dish.serving, dish.tag].filter(Boolean).join(" · ") || "Sin porción"}
                    </p>
                  </div>
                  <label className="flex items-center gap-2">
                    <span className="font-display text-xl text-gold">$</span>
                    <input
                      inputMode="numeric"
                      value={draft[dish.id] ?? ""}
                      onChange={(event) => {
                        const next = event.target.value.replace(/[^\d]/g, "");
                        setDraft((current) => ({ ...current, [dish.id]: next }));
                        setNotice("");
                      }}
                      placeholder="—"
                      className="w-full border border-[rgba(200,169,126,0.35)] bg-white px-3 py-2 text-right font-display text-2xl outline-none focus:border-gold"
                      aria-label={`Precio de ${dish.name}`}
                    />
                  </label>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="fixed inset-x-0 bottom-0 border-t border-[rgba(200,169,126,0.28)] bg-cream/95 px-6 py-4 backdrop-blur-sm">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink/60">
              {error ? <span className="text-red-800">{error}</span> : notice || (dirty ? "Hay cambios sin guardar." : "Sin cambios.")}
            </p>
            <GoldButton type="submit" disabled={pending || !dirty}>
              {pending ? "Guardando…" : "Guardar precios"}
            </GoldButton>
          </div>
        </div>
      </form>
    </main>
  );
}

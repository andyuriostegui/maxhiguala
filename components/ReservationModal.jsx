"use client";

import { useEffect, useRef, useState } from "react";
import { site, whatsappMessage } from "../data/site";
import { CloseIcon, GoldButton } from "./ui";

const hours = ["14:00", "15:00", "16:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

function todayIso() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

function formatDate(iso) {
  if (!iso) return "";
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export default function ReservationModal({ open, onClose }) {
  const dialog = useRef(null);
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "20:00",
    guests: "2",
    notes: "",
  });

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    const message = [
      "Hola, quiero reservar una mesa en El Maxhi.",
      `Nombre: ${form.name}`,
      `Fecha: ${formatDate(form.date)}`,
      `Hora: ${form.time}`,
      `Personas: ${form.guests}`,
      form.notes ? `Nota: ${form.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappMessage(message), "_blank", "noopener,noreferrer");
    onClose();
  };

  const field =
    "w-full border-0 border-b border-[rgba(200,169,126,0.28)] bg-transparent py-3 font-sans text-cream outline-none transition focus:border-gold";

  return (
    <dialog
      ref={dialog}
      className="luxury-dialog reserve-dialog"
      aria-labelledby="reserve-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
    >
      <form onSubmit={submit} className="px-7 py-8 sm:px-10 sm:py-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-sans text-[0.62rem] font-semibold tracking-[0.22em] text-gold uppercase">El Maxhi · Iguala</p>
            <h2 id="reserve-title" className="font-display mt-2 text-4xl tracking-tight text-cream">
              Reservar mesa
            </h2>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center border border-gold/25 text-ash transition hover:border-gold hover:text-cream" aria-label="Cerrar">
            <CloseIcon />
          </button>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ash">
          Completa los datos y te atendemos por WhatsApp al {site.phoneDisplay}.
        </p>

        <div className="mt-8 grid gap-6">
          <label className="block">
            <span className="font-sans text-[0.62rem] tracking-[0.18em] text-ash uppercase">Nombre</span>
            <input required className={field} value={form.name} onChange={set("name")} autoComplete="name" />
          </label>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="font-sans text-[0.62rem] tracking-[0.18em] text-ash uppercase">Fecha</span>
              <input required type="date" min={todayIso()} className={`${field} [color-scheme:dark]`} value={form.date} onChange={set("date")} />
            </label>
            <label className="block">
              <span className="font-sans text-[0.62rem] tracking-[0.18em] text-ash uppercase">Hora</span>
              <select className={field} value={form.time} onChange={set("time")}>
                {hours.map((hour) => (
                  <option key={hour} value={hour} className="bg-obsidian-card text-cream">
                    {hour}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="font-sans text-[0.62rem] tracking-[0.18em] text-ash uppercase">Personas</span>
            <select className={field} value={form.guests} onChange={set("guests")}>
              {Array.from({ length: 12 }, (_, index) => String(index + 1)).map((count) => (
                <option key={count} value={count} className="bg-obsidian-card text-cream">
                  {count}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="font-sans text-[0.62rem] tracking-[0.18em] text-ash uppercase">Nota</span>
            <input className={field} value={form.notes} onChange={set("notes")} placeholder="Cumpleaños, mesa en la terraza…" />
          </label>
        </div>

        <GoldButton type="submit" className="mt-9 w-full">
          Confirmar por WhatsApp
        </GoldButton>
      </form>
    </dialog>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrandMark, GoldButton } from "../../../components/ui";

export default function AdminLoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || "No se pudo entrar.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("No se pudo entrar. Inténtalo otra vez.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-6 py-16">
      <a href="/" className="self-center">
        <span className="inline-flex rounded-sm bg-obsidian px-4 py-3">
          <BrandMark compact />
        </span>
      </a>
      <h1 className="font-display mt-10 text-4xl leading-none">Panel de la carta</h1>
      <p className="mt-3 text-[1.02rem] text-ink/65">Entra para cambiar los precios que se ven en el menú.</p>

      <form onSubmit={onSubmit} className="mt-10 space-y-6">
        <label className="block">
          <span className="font-sans text-[0.62rem] font-semibold tracking-[0.18em] text-ink/50 uppercase">Usuario</span>
          <input
            value={user}
            onChange={(event) => setUser(event.target.value)}
            autoComplete="username"
            required
            className="mt-2 w-full border-0 border-b border-[rgba(200,169,126,0.45)] bg-transparent py-3 text-[1.05rem] outline-none focus:border-gold"
          />
        </label>
        <label className="block">
          <span className="font-sans text-[0.62rem] font-semibold tracking-[0.18em] text-ink/50 uppercase">Contraseña</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            className="mt-2 w-full border-0 border-b border-[rgba(200,169,126,0.45)] bg-transparent py-3 text-[1.05rem] outline-none focus:border-gold"
          />
        </label>
        {error ? <p className="text-sm text-red-800">{error}</p> : null}
        <GoldButton type="submit" disabled={pending} className="min-h-12 w-full px-7 text-[0.68rem]">
          {pending ? "Entrando…" : "Entrar"}
        </GoldButton>
      </form>
    </main>
  );
}

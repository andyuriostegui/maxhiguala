import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { neon } from "@neondatabase/serverless";
import { dishes } from "../data/carta";

const pricesPath = join(process.cwd(), "data", "prices.json");

function catalogDefaults() {
  const prices = {};
  for (const dish of dishes) {
    prices[dish.id] = dish.price ?? null;
  }
  return prices;
}

function databaseUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
}

function mergeWithCatalog(stored) {
  const prices = catalogDefaults();
  for (const [id, price] of Object.entries(stored || {})) {
    if (Object.prototype.hasOwnProperty.call(prices, id)) prices[id] = price;
  }
  return prices;
}

function writeFilePrices(prices) {
  try {
    mkdirSync(dirname(pricesPath), { recursive: true });
    writeFileSync(pricesPath, JSON.stringify(prices, null, 2) + "\n", "utf8");
  } catch (error) {
    if (process.env.VERCEL) return;
    throw error;
  }
}

function loadFilePrices() {
  let stored = catalogDefaults();
  if (existsSync(pricesPath)) {
    try {
      const parsed = JSON.parse(readFileSync(pricesPath, "utf8"));
      if (parsed && typeof parsed === "object") stored = mergeWithCatalog(parsed);
    } catch {
      stored = catalogDefaults();
    }
  } else {
    writeFilePrices(stored);
  }
  return stored;
}

async function sqlClient() {
  const url = databaseUrl();
  if (!url) return null;
  const sql = neon(url);
  await sql`
    CREATE TABLE IF NOT EXISTS prices (
      dish_id TEXT PRIMARY KEY,
      price INTEGER
    )
  `;
  return sql;
}

async function loadDatabasePrices() {
  const sql = await sqlClient();
  const rows = await sql`SELECT dish_id, price FROM prices`;
  const stored = {};
  for (const row of rows) stored[row.dish_id] = row.price;
  const merged = mergeWithCatalog(stored);

  const missing = dishes.filter((dish) => !Object.prototype.hasOwnProperty.call(stored, dish.id));
  for (const dish of missing) {
    await sql`
      INSERT INTO prices (dish_id, price)
      VALUES (${dish.id}, ${merged[dish.id]})
      ON CONFLICT (dish_id) DO NOTHING
    `;
  }
  return merged;
}

async function saveDatabasePrices(updates) {
  const sql = await sqlClient();
  const known = new Set(dishes.map((dish) => dish.id));
  for (const [id, price] of Object.entries(updates)) {
    if (!known.has(id)) continue;
    await sql`
      INSERT INTO prices (dish_id, price)
      VALUES (${id}, ${price})
      ON CONFLICT (dish_id) DO UPDATE SET price = EXCLUDED.price
    `;
  }
  return loadDatabasePrices();
}

export async function loadPrices() {
  if (databaseUrl()) return loadDatabasePrices();
  return loadFilePrices();
}

export async function savePrices(updates) {
  if (databaseUrl()) return saveDatabasePrices(updates);
  if (process.env.VERCEL) {
    throw new Error("Falta DATABASE_URL para guardar precios en Vercel.");
  }
  const stored = mergeWithCatalog({ ...loadFilePrices(), ...updates });
  const known = new Set(dishes.map((dish) => dish.id));
  for (const [id, price] of Object.entries(updates)) {
    if (!known.has(id)) continue;
    stored[id] = price;
  }
  writeFilePrices(stored);
  return stored;
}

export function parsePrice(value) {
  if (value == null || value === "") return { ok: true, price: null };
  if (typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 100000) {
    return { ok: true, price: value };
  }
  const text = String(value).trim();
  if (text === "") return { ok: true, price: null };
  if (!/^\d+$/.test(text)) return { ok: false, error: "El precio tiene que ser un número entero." };
  const price = Number(text);
  if (price > 100000) return { ok: false, error: "El precio es demasiado alto." };
  return { ok: true, price };
}

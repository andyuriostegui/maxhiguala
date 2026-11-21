import { NextResponse } from "next/server";
import { getAdminDishes } from "../../../../lib/menu";
import { parsePrice, savePrices } from "../../../../lib/prices";
import { getSession } from "../../../../lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  return NextResponse.json({ dishes: await getAdminDishes() });
}

export async function PUT(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const incoming = body?.prices;
  if (!incoming || typeof incoming !== "object") {
    return NextResponse.json({ error: "Faltan los precios." }, { status: 400 });
  }

  const updates = {};
  for (const [id, value] of Object.entries(incoming)) {
    const parsed = parsePrice(value);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }
    updates[id] = parsed.price;
  }

  try {
    await savePrices(updates);
  } catch (error) {
    return NextResponse.json({ error: error.message || "No se pudieron guardar los precios." }, { status: 500 });
  }
  return NextResponse.json({ dishes: await getAdminDishes() });
}

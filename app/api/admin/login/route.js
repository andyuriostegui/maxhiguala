import { NextResponse } from "next/server";
import { createToken, credentialsMatch, sessionCookie } from "../../../../lib/auth";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  if (!process.env.ADMIN_USER || !process.env.ADMIN_PASSWORD || !process.env.AUTH_SECRET) {
    return NextResponse.json({ error: "Falta la configuración del admin." }, { status: 500 });
  }

  if (!credentialsMatch(body.user, body.password)) {
    return NextResponse.json({ error: "Usuario o contraseña incorrectos." }, { status: 401 });
  }

  const token = await createToken();
  const response = NextResponse.json({ ok: true });
  const cookie = sessionCookie(token);
  response.cookies.set(cookie.name, cookie.value, cookie);
  return response;
}

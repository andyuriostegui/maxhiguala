export const COOKIE_NAME = "el_maxhi_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value) throw new Error("Falta AUTH_SECRET");
  return value;
}

function bytesToB64url(bytes) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function b64urlToBytes(value) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "==".slice((value.length * 3) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function utf8ToB64url(value) {
  return bytesToB64url(new TextEncoder().encode(value));
}

function b64urlToUtf8(value) {
  return new TextDecoder().decode(b64urlToBytes(value));
}

async function hmac(value) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return bytesToB64url(new Uint8Array(signature));
}

function safeEqual(left, right) {
  if (left.length !== right.length) return false;
  let out = 0;
  for (let i = 0; i < left.length; i += 1) {
    out |= left.charCodeAt(i) ^ right.charCodeAt(i);
  }
  return out === 0;
}

export async function createToken() {
  const payload = {
    sub: process.env.ADMIN_USER || "admin",
    exp: Date.now() + MAX_AGE_SECONDS * 1000,
  };
  const body = utf8ToB64url(JSON.stringify(payload));
  const signature = await hmac(body);
  return `${body}.${signature}`;
}

export async function verifyToken(token) {
  if (!token || !token.includes(".")) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  try {
    const expected = await hmac(body);
    if (!safeEqual(signature, expected)) return null;
    const payload = JSON.parse(b64urlToUtf8(body));
    if (!payload?.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function credentialsMatch(user, password) {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPassword) return false;
  return safeEqual(String(user || ""), expectedUser) && safeEqual(String(password || ""), expectedPassword);
}

export function sessionCookie(token) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  };
}



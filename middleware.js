import { NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "./lib/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  let session = null;
  try {
    session = await verifyToken(token);
  } catch {
    session = null;
  }

  if (pathname === "/admin/login") {
    if (session) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (session) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

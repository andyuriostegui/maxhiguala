import { cookies } from "next/headers";
import { COOKIE_NAME, verifyToken } from "./auth";

export async function getSession() {
  const jar = await cookies();
  return verifyToken(jar.get(COOKIE_NAME)?.value);
}

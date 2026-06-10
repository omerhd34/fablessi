import { NextResponse } from "next/server";
import {
 createSessionToken,
 getSessionCookieOptions,
 SESSION_COOKIE,
 verifyCredentials,
} from "@/lib/admin/auth";

export async function POST(request) {
 try {
  const body = await request.json();
  const { username, password } = body ?? {};

  if (!verifyCredentials(username, password)) {
   return NextResponse.json(
    { error: "Kullanıcı adı veya şifre hatalı" },
    { status: 401 }
   );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), getSessionCookieOptions());
  return response;
 } catch (error) {
  console.error("[admin/login]", error);
  return NextResponse.json({ error: "Giriş yapılamadı" }, { status: 500 });
 }
}

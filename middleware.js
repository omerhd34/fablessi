import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionTokenEdge } from "@/lib/admin/session-edge";

async function isAuthenticated(request) {
 const token = request.cookies.get(SESSION_COOKIE)?.value;
 return verifySessionTokenEdge(token);
}

export async function middleware(request) {
 const { pathname } = request.nextUrl;

 if (pathname === "/admin/login") {
  if (await isAuthenticated(request)) {
   return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
 }

 if (pathname.startsWith("/admin")) {
  if (!(await isAuthenticated(request))) {
   const loginUrl = new URL("/admin/login", request.url);
   loginUrl.searchParams.set("from", pathname);
   return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
 }

 if (
  pathname.startsWith("/api/admin") &&
  !pathname.startsWith("/api/admin/auth")
 ) {
  if (!(await isAuthenticated(request))) {
   return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
 }

 return NextResponse.next();
}

export const config = {
 matcher: ["/admin/:path*", "/api/admin/:path*"],
};

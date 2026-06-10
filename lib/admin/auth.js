import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "fablessi_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret() {
 return process.env.ADMIN_SECRET ?? null;
}

function safeCompare(a, b) {
 if (typeof a !== "string" || typeof b !== "string") return false;
 const bufA = Buffer.from(a);
 const bufB = Buffer.from(b);
 if (bufA.length !== bufB.length) return false;
 return timingSafeEqual(bufA, bufB);
}

export function verifyCredentials(username, password) {
 const adminUser = process.env.ADMIN_USERNAME;
 const adminPass = process.env.ADMIN_PASSWORD;
 if (!adminUser || !adminPass) return false;
 return safeCompare(username ?? "", adminUser) && safeCompare(password ?? "", adminPass);
}

export function createSessionToken() {
 const secret = getSecret();
 if (!secret) {
  throw new Error("ADMIN_SECRET ortam değişkeni tanımlı değil");
 }

 const expires = Date.now() + SESSION_MAX_AGE * 1000;
 const payload = `admin.${expires}`;
 const sig = createHmac("sha256", secret).update(payload).digest("hex");
 return `${payload}.${sig}`;
}

export function verifySessionToken(token) {
 if (!token) return false;

 try {
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [user, expiresStr, sig] = parts;
  if (user !== "admin") return false;

  const expires = Number(expiresStr);
  if (!expires || Date.now() > expires) return false;

  const secret = getSecret();
  if (!secret) return false;

  const expected = createHmac("sha256", secret)
   .update(`${user}.${expiresStr}`)
   .digest("hex");

  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length) return false;

  return timingSafeEqual(sigBuf, expectedBuf);
 } catch {
  return false;
 }
}

export function getSessionCookieOptions() {
 return {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: SESSION_MAX_AGE,
 };
}

export const SESSION_COOKIE = "fablessi_admin_session";

function getSecret() {
 return process.env.ADMIN_SECRET ?? null;
}

async function hmacHex(secret, payload) {
 const encoder = new TextEncoder();
 const key = await crypto.subtle.importKey(
  "raw",
  encoder.encode(secret),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign"]
 );

 const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
 return Array.from(new Uint8Array(signature))
  .map((byte) => byte.toString(16).padStart(2, "0"))
  .join("");
}

export async function verifySessionTokenEdge(token) {
 if (!token) return false;

 const secret = getSecret();
 if (!secret) return false;

 try {
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [user, expiresStr, sig] = parts;
  if (user !== "admin") return false;

  const expires = Number(expiresStr);
  if (!expires || Date.now() > expires) return false;

  const expected = await hmacHex(secret, `${user}.${expiresStr}`);
  if (sig.length !== expected.length) return false;

  let mismatch = 0;
  for (let i = 0; i < sig.length; i += 1) {
   mismatch |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }

  return mismatch === 0;
 } catch {
  return false;
 }
}

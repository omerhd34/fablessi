import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { requireAdmin, handleAdminError } from "@/lib/admin/require-admin";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/jpg"]);

function sanitizeFolder(folder) {
 return String(folder ?? "")
  .replace(/[^a-zA-Z0-9_-]/g, "")
  .slice(0, 80);
}

function sanitizeFilename(name) {
 const ext = path.extname(name).toLowerCase();
 const base = path
  .basename(name, ext)
  .replace(/[^a-zA-Z0-9._-]/g, "-")
  .toLowerCase()
  .slice(0, 80);

 return `${base || "image"}${ext || ".jpg"}`;
}

export async function POST(request) {
 try {
  await requireAdmin();

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = sanitizeFolder(formData.get("folder"));

  if (!folder) {
   return Response.json({ error: "Klasör adı gerekli" }, { status: 400 });
  }

  if (!file || typeof file === "string") {
   return Response.json({ error: "Dosya gerekli" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
   return Response.json(
    { error: "Yalnızca JPG, PNG veya WebP yüklenebilir" },
    { status: 400 }
   );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  if (buffer.length > 10 * 1024 * 1024) {
   return Response.json({ error: "Dosya 10 MB'dan büyük olamaz" }, { status: 400 });
  }

  const filename = sanitizeFilename(file.name);
  const dir = path.join(PUBLIC_DIR, folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);

  return Response.json({ url: `/${folder}/${filename}` });
 } catch (error) {
  return handleAdminError(error);
 }
}

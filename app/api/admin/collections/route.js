import {
 validateAdminCollectionName,
 validateAdminCollectionNameEn,
} from "@/lib/admin/field-limits";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/admin/slug";
import { requireAdmin, handleAdminError } from "@/lib/admin/require-admin";

export async function GET() {
 try {
  await requireAdmin();

  const collections = await prisma.collection.findMany({
   orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   include: { _count: { select: { products: true } } },
  });

  return Response.json(collections);
 } catch (error) {
  return handleAdminError(error);
 }
}

export async function POST(request) {
 try {
  await requireAdmin();
  const body = await request.json();

  const name = body.name?.trim();
  const nameEn = body.nameEn?.trim();
  const coverImage = body.coverImage?.trim();

  const nameError = validateAdminCollectionName(name, "Ad (TR)");
  if (nameError) {
   return Response.json({ error: nameError }, { status: 400 });
  }

  const nameEnError = validateAdminCollectionNameEn(nameEn);
  if (nameEnError) {
   return Response.json({ error: nameEnError }, { status: 400 });
  }

  const slug = slugify(name);
  if (!slug) {
   return Response.json({ error: "Ad gereklidir." }, { status: 400 });
  }

  if (!coverImage) {
   return Response.json({ error: "Kapak görseli gereklidir." }, { status: 400 });
  }

  const existing = await prisma.collection.findUnique({ where: { slug } });
  if (existing) {
   return Response.json({ error: "Bu slug zaten kullanılıyor" }, { status: 409 });
  }

  const collection = await prisma.collection.create({
   data: {
    slug,
    name,
    nameEn,
    description: null,
    descriptionEn: null,
    coverImage,
    sortOrder: Number(body.sortOrder) || 0,
    isPublished: body.isPublished !== false,
   },
  });

  return Response.json(collection, { status: 201 });
 } catch (error) {
  return handleAdminError(error);
 }
}

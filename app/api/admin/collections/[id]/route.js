import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/admin/slug";
import { requireAdmin, handleAdminError } from "@/lib/admin/require-admin";

export async function GET(_request, { params }) {
 try {
  await requireAdmin();
  const { id } = await params;

  const collection = await prisma.collection.findUnique({
   where: { id },
   include: {
    products: {
     orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
     select: { id: true, name: true, slug: true, isPublished: true },
    },
   },
  });

  if (!collection) {
   return Response.json({ error: "Koleksiyon bulunamadı" }, { status: 404 });
  }

  return Response.json(collection);
 } catch (error) {
  return handleAdminError(error);
 }
}

export async function PUT(request, { params }) {
 try {
  await requireAdmin();
  const { id } = await params;
  const body = await request.json();

  const existing = await prisma.collection.findUnique({ where: { id } });
  if (!existing) {
   return Response.json({ error: "Koleksiyon bulunamadı" }, { status: 404 });
  }

  const name = body.name?.trim() ?? existing.name;
  const slug = slugify(name) || existing.slug;
  if (slug !== existing.slug) {
   const conflict = await prisma.collection.findUnique({ where: { slug } });
   if (conflict) {
    return Response.json({ error: "Bu slug zaten kullanılıyor" }, { status: 409 });
   }
  }

  const collection = await prisma.collection.update({
   where: { id },
   data: {
    slug,
    name,
    nameEn: body.nameEn?.trim() || null,
    description: null,
    descriptionEn: null,
    coverImage: body.coverImage?.trim() || null,
    sortOrder: Number(body.sortOrder) ?? existing.sortOrder,
    isPublished: body.isPublished ?? existing.isPublished,
   },
  });

  return Response.json(collection);
 } catch (error) {
  return handleAdminError(error);
 }
}

export async function DELETE(_request, { params }) {
 try {
  await requireAdmin();
  const { id } = await params;

  await prisma.collection.delete({ where: { id } });
  return Response.json({ ok: true });
 } catch (error) {
  return handleAdminError(error);
 }
}

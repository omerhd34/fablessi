import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/admin/slug";
import { requireAdmin, handleAdminError } from "@/lib/admin/require-admin";

export async function GET() {
 try {
  await requireAdmin();

  const groups = await prisma.productCategoryGroup.findMany({
   orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   include: { _count: { select: { products: true } } },
  });

  return Response.json(groups);
 } catch (error) {
  return handleAdminError(error);
 }
}

export async function POST(request) {
 try {
  await requireAdmin();
  const body = await request.json();

  const name = body.name?.trim();
  const slug = slugify(name);
  if (!slug || !name) {
   return Response.json({ error: "Ad gerekli" }, { status: 400 });
  }

  const existing = await prisma.productCategoryGroup.findUnique({ where: { slug } });
  if (existing) {
   return Response.json({ error: "Bu slug zaten kullanılıyor" }, { status: 409 });
  }

  const group = await prisma.productCategoryGroup.create({
   data: {
    slug,
    name,
    nameEn: body.nameEn?.trim() || null,
    coverImage: body.coverImage?.trim() || null,
    sortOrder: Number(body.sortOrder) || 0,
    isPublished: body.isPublished !== false,
   },
  });

  return Response.json(group, { status: 201 });
 } catch (error) {
  return handleAdminError(error);
 }
}

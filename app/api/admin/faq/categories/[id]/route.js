import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/admin/slug";
import { requireAdmin, handleAdminError } from "@/lib/admin/require-admin";

export async function PUT(request, { params }) {
 try {
  await requireAdmin();
  const { id } = await params;
  const body = await request.json();

  const current = await prisma.faqCategory.findUnique({ where: { id } });
  if (!current) {
   return Response.json({ error: "Kategori bulunamadı." }, { status: 404 });
  }

  const slug = body.slug?.trim() || slugify(body.titleTr || current.titleTr);
  if (!slug || !body.titleTr?.trim()) {
   return Response.json({ error: "Başlık gereklidir." }, { status: 400 });
  }

  if (slug !== current.slug) {
   const existing = await prisma.faqCategory.findUnique({ where: { slug } });
   if (existing) {
    return Response.json({ error: "Bu slug zaten kullanılıyor." }, { status: 409 });
   }
  }

  const category = await prisma.faqCategory.update({
   where: { id },
   data: {
    slug,
    titleTr: body.titleTr.trim(),
    titleEn: body.titleEn?.trim() || null,
    sortOrder: Number(body.sortOrder) ?? current.sortOrder,
    initialVisible: Number(body.initialVisible) ?? current.initialVisible,
   },
   include: {
    items: { orderBy: [{ sortOrder: "asc" }, { questionTr: "asc" }] },
   },
  });

  return Response.json(category);
 } catch (error) {
  return handleAdminError(error);
 }
}

export async function DELETE(_request, { params }) {
 try {
  await requireAdmin();
  const { id } = await params;

  await prisma.faqCategory.delete({ where: { id } });
  return Response.json({ ok: true });
 } catch (error) {
  return handleAdminError(error);
 }
}

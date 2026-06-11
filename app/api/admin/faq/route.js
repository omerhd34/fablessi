import { getAdminFaqCategories } from "@/lib/content/queries";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/admin/slug";
import { requireAdmin, handleAdminError } from "@/lib/admin/require-admin";

export async function GET() {
 try {
  await requireAdmin();
  const categories = await getAdminFaqCategories();
  return Response.json(categories);
 } catch (error) {
  return handleAdminError(error);
 }
}

export async function POST(request) {
 try {
  await requireAdmin();
  const body = await request.json();

  const slug = body.slug?.trim() || slugify(body.titleTr);
  if (!slug || !body.titleTr?.trim()) {
   return Response.json({ error: "Başlık ve slug gereklidir." }, { status: 400 });
  }

  const existing = await prisma.faqCategory.findUnique({ where: { slug } });
  if (existing) {
   return Response.json({ error: "Bu slug zaten kullanılıyor." }, { status: 409 });
  }

  const category = await prisma.faqCategory.create({
   data: {
    slug,
    titleTr: body.titleTr.trim(),
    titleEn: body.titleEn?.trim() || null,
    sortOrder: Number(body.sortOrder) || 0,
    initialVisible: Number(body.initialVisible) || 4,
   },
   include: { items: true },
  });

  return Response.json(category, { status: 201 });
 } catch (error) {
  return handleAdminError(error);
 }
}

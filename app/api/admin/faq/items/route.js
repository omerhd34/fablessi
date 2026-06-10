import { prisma } from "@/lib/prisma";
import { requireAdmin, handleAdminError } from "@/lib/admin/require-admin";

export async function POST(request) {
 try {
  await requireAdmin();
  const body = await request.json();

  if (!body.categoryId || !body.questionTr?.trim() || !body.answerTr?.trim()) {
   return Response.json(
    { error: "Kategori, soru (TR) ve cevap (TR) gerekli" },
    { status: 400 }
   );
  }

  const category = await prisma.faqCategory.findUnique({
   where: { id: body.categoryId },
  });
  if (!category) {
   return Response.json({ error: "Kategori bulunamadı" }, { status: 404 });
  }

  const item = await prisma.faqItem.create({
   data: {
    categoryId: body.categoryId,
    questionTr: body.questionTr.trim(),
    questionEn: body.questionEn?.trim() || null,
    answerTr: body.answerTr.trim(),
    answerEn: body.answerEn?.trim() || null,
    sortOrder: Number(body.sortOrder) || 0,
   },
  });

  return Response.json(item, { status: 201 });
 } catch (error) {
  return handleAdminError(error);
 }
}

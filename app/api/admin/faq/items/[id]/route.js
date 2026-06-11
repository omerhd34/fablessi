import { prisma } from "@/lib/prisma";
import { requireAdmin, handleAdminError } from "@/lib/admin/require-admin";

export async function PUT(request, { params }) {
 try {
  await requireAdmin();
  const { id } = await params;
  const body = await request.json();

  const current = await prisma.faqItem.findUnique({ where: { id } });
  if (!current) {
   return Response.json({ error: "Soru bulunamadı." }, { status: 404 });
  }

  if (!body.questionTr?.trim() || !body.answerTr?.trim()) {
   return Response.json({ error: "Soru ve cevap (TR) gereklidir." }, { status: 400 });
  }

  const item = await prisma.faqItem.update({
   where: { id },
   data: {
    questionTr: body.questionTr.trim(),
    questionEn: body.questionEn?.trim() || null,
    answerTr: body.answerTr.trim(),
    answerEn: body.answerEn?.trim() || null,
    sortOrder: Number(body.sortOrder) ?? current.sortOrder,
   },
  });

  return Response.json(item);
 } catch (error) {
  return handleAdminError(error);
 }
}

export async function DELETE(_request, { params }) {
 try {
  await requireAdmin();
  const { id } = await params;

  await prisma.faqItem.delete({ where: { id } });
  return Response.json({ ok: true });
 } catch (error) {
  return handleAdminError(error);
 }
}

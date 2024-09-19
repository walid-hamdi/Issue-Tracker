import { issueSchema, patchIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { title, description, assignedToUserId } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  const issueId = parseInt(params.id);

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });
  if (!issue)
    return NextResponse.json({ error: "Issue not found." }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issueId },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({}, { status: 401 });

  const issueId = parseInt(params.id);
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue)
    return NextResponse.json(
      { error: "There is no issue with this id." },
      { status: 404 }
    );

  await prisma.issue.delete({
    where: { id: issueId },
  });

  return NextResponse.json({});
}

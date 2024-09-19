import { issueSchema } from "@/app/validationSchemas";
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
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issueId = parseInt(params.id);

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });
  if (!issue)
    return NextResponse.json({ error: "Issue not found." }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issueId },
    data: {
      title: body.title,
      description: body.description,
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

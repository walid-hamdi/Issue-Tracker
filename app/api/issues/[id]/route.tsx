import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

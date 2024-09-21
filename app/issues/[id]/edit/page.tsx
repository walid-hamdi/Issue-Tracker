import { prisma } from "@/prisma";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { cache } from "react";
import IssueLoadingSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueLoadingSkeleton />,
});

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const EditIssuePage = async ({ params }: Props) => {
  if (isNaN(parseInt(params.id))) notFound();

  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export const generateMetadata = async ({ params }: Props) => {
  const issue = await fetchUser(parseInt(params.id));

  if (!issue) {
    return {
      title: "Issue Not Found",
      description: "The issue you're trying to edit does not exist.",
    };
  }

  return {
    title: `Edit Issue #${issue.id}: ${issue.title} - Modify Details`,
    description: `Edit and update the details of issue #${issue.id} titled "${issue.title}". Make changes to assignees, status, and more in this real-time editing form.`,
  };
};

export default EditIssuePage;

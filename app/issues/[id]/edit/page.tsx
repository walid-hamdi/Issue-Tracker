import { prisma } from "@/prisma";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueLoadingSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueLoadingSkeleton />,
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  if (isNaN(parseInt(params.id))) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export const generateMetadata = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

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

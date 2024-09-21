import { prisma } from "@/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import IssueDeleteButton from "./DeleteIssueButton";
import IssueEditButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession();

  if (isNaN(parseInt(params.id))) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="3">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Flex direction="column" gap="2">
          <AssigneeSelect issue={issue} />
          <IssueEditButton issueId={issue.id} />
          <IssueDeleteButton issueId={issue.id} />
        </Flex>
      )}
    </Grid>
  );
};

export const generateMetadata = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return {
      title: "Issue Not Found",
      description: "The issue you are looking for does not exist.",
    };
  }

  return {
    title: `Issue #${issue.id}: ${issue.title} - Details and Management`,
    description: `View and manage the details of issue #${issue.id} titled "${issue.title}". Assign users, edit, or delete the issue using our comprehensive issue management tools.`,
  };
};

export default IssueDetailPage;

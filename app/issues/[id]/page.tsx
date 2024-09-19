import { prisma } from "@/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueDetails from "./IssueDetails";
import IssueEditButton from "./EditIssueButton";
import IssueDeleteButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";

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
        <Flex gap="2">
          <IssueEditButton issueId={issue.id} />
          <IssueDeleteButton issueId={issue.id} />
        </Flex>
      )}
    </Grid>
  );
};

export default IssueDetailPage;

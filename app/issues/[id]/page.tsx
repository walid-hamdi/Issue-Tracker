import { IssueStatusBadge } from "@/app/components";
import { prisma } from "@/prisma";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import MarkDown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  if (isNaN(parseInt(params.id))) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Box>
      <Heading>{issue?.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text> {issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-5">
        <MarkDown>{issue?.description}</MarkDown>
      </Card>
    </Box>
  );
};

export default IssueDetailPage;

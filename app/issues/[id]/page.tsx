import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/prisma";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";

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
    <>
      <Heading>{issue?.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text> {issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <Text>{issue?.description}</Text>
      </Card>
    </>
  );
};

export default IssueDetailPage;

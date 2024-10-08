import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import MarkDown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue?.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text> {issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-5 max-w-full">
        <MarkDown>{issue?.description}</MarkDown>
      </Card>
    </>
  );
};

export default IssueDetails;

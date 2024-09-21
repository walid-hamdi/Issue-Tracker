import { prisma } from "@/prisma";
import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  const issueProps = { open, inProgress, closed };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary {...issueProps} />
        <IssueChart {...issueProps} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}


export const metadata: Metadata={
  title:"Comprehensive Issue Tracker Dashboard: View Open, In-Progress, and Closed Issues in Real-Time",
  description:"Explore a dynamic issue tracking dashboard built with Prisma, Radix UI, and Next.js. Stay on top of your open, in-progress, and closed issues with detailed summaries, interactive charts, and the latest updates in one seamless interface.",
}
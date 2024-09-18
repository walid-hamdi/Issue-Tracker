import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssueEditButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button className="cursor-pointer">
      <Link
        className="flex justify-center align-middle gap-2"
        href={`/issues/${issueId}/edit`}
      >
        <Pencil2Icon /> Edit Issue
      </Link>
    </Button>
  );
};

export default IssueEditButton;

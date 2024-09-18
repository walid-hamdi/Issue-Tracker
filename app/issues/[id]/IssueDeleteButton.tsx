import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssueDeleteButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button className="cursor-pointer bg-red-500">
      <Link
        className="flex justify-center align-middle gap-2"
        href={`/issues/${issueId}`}
      >
        <TrashIcon /> Delete
      </Link>
    </Button>
  );
};

export default IssueDeleteButton;

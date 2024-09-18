"use client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  return (
    <Button
      className="cursor-pointer"
      onClick={() => {
        router.push(`/issues/${issueId}/edit`);
      }}
    >
      <Pencil2Icon /> Edit Issue
    </Button>
  );
};

export default EditIssueButton;

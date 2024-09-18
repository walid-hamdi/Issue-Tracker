"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button className="cursor-pointer" color="red">
          <TrashIcon /> Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? this action cannot be
          undone.
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button className="cursor-pointer" variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              className="cursor-pointer"
              color="red"
              onClick={async () => {
                try {
                  setLoading(true);
                  await axios.delete(`/api/issues/${issueId}`);
                  router.push("/issues");
                  router.refresh();
                } catch (e) {
                } finally {
                  setLoading(false);
                }
              }}
            >
              Delete Issue {isLoading && <Spinner />}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;

"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Flex, Select, Spinner } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (error) return null;

  if (isLoading) return <Skeleton />;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={async (userId) => {
          setIsUpdating(true);
          await axios
            .patch(`/api/issues/${issue.id}`, {
              assignedToUserId: userId !== "unassigned" ? userId : null,
            })
            .catch(() => toast.error("Changes couldn't be saved."))
            .finally(() => {
              setIsUpdating(false);
            });
        }}
      >
        <Flex align="center" gap="2">
          <Select.Trigger placeholder="Assign..." disabled={isUpdating} />
          {isUpdating && <Spinner />}
        </Flex>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;

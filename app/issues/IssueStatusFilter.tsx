"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const IssueStatusFilter = () => {
  const router = useRouter();
  const statues: { label: string; value?: Status }[] = [
    {
      label: "All",
    },

    {
      label: "Open",
      value: "OPEN",
    },
    {
      label: "In Progress",
      value: "IN_PROGRESS",
    },
    {
      label: "Closed",
      value: "CLOSED",
    },
  ];
  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status.trim().length > 0 ? `?status=${status}` : "";
        router.push(`/issues${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statues.map((status) => (
          <Select.Item key={status.value} value={status.value || " "}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;

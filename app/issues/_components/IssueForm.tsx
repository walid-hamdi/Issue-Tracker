"use client";
import { ErrorMessage } from "@/app/components";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Box, Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  });

  return (
    <Box maxWidth={{ sm: "100%", md: "50%" }}>
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <TextField.Root
          size="3"
          defaultValue={issue?.title}
          placeholder="Enter your issue title..."
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {
          <Controller
            name="description"
            control={control}
            defaultValue={issue?.description}
            render={({ field }) => (
              <SimpleMdeReact
                placeholder="Enter your issue description..."
                {...field}
              />
            )}
          />
        }
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Box maxWidth={{ sm: "25%", md: "50%" }}>
          <Button disabled={isSubmitting} size="3">
            Submit New Issue {isSubmitting && <Spinner />}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default IssueForm;

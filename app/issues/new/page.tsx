"use client";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Callout, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMdeReact from "react-simplemde-editor";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  return (
    <Box maxWidth={{ sm: "100%", md: "50%" }}>
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occurred.");
          }
        })}
      >
        <TextField.Root
          size="3"
          placeholder="Enter your issue title..."
          {...register("title")}
        />
        {errors.title && (
          <Text as="p" color="red">
            {errors.title.message}
          </Text>
        )}
        {
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <>
                  <SimpleMdeReact
                    options={{
                      spellChecker: false,
                      placeholder: "Enter your issue description...",
                    }}
                    {...field}
                  />
                  {errors.description && (
                    <Text as="p" color="red">
                      {errors.description.message}
                    </Text>
                  )}
                </>
              );
            }}
          />
        }

        <Box maxWidth={{ sm: "25%", md: "50%" }}>
          <Button size="3">Submit New Issue</Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewIssuePage;

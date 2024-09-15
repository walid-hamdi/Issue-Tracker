"use client";
import { Box, Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMdeReact from "react-simplemde-editor";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const { register, control, handleSubmit } = useForm<IssueForm>();
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
          placeholder="Enter the issue title"
          {...register("title")}
        />
        {
          <Controller
            control={control}
            render={({ field }) => (
              <SimpleMdeReact
                options={{
                  autofocus: true,
                  spellChecker: false,
                  placeholder: "Write your markdown...",
                }}
                {...field}
              />
            )}
            name="description"
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

"use client";
import { Box, Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import SimpleMdeReact from "react-simplemde-editor";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();

  const { register, control, handleSubmit } = useForm<IssueForm>();
  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <Box maxWidth={{ sm: "100%", md: "50%" }}>
        <TextField.Root
          size="3"
          placeholder="Enter the issue title"
          {...register("title")}
        />
      </Box>
      <Box maxWidth={{ sm: "100%", md: "50%" }}>
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
      </Box>
      <Box maxWidth={{ sm: "100%", md: "25%" }}>
        <Button size="3">Submit New Issue</Button>
      </Box>
    </form>
  );
};

export default NewIssuePage;

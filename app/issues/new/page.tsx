"use client";
import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import SimpleMdeReact from "react-simplemde-editor";

const page = () => {
  return (
    <Flex direction="column" gap="3">
      <Box maxWidth={{ sm: "100%", md: "50%" }}>
        <TextField.Root size="3" placeholder="Enter the issue title" />
      </Box>
      <Box maxWidth={{ sm: "100%", md: "50%" }}>
        <SimpleMdeReact
          options={{
            autofocus: true,
            spellChecker: false,
            placeholder: "Write your markdown...",
          }}
        />
      </Box>
      <Box maxWidth={{ sm: "100%", md: "25%" }}>
        <Button size="3">Submit New Issue</Button>
      </Box>
    </Flex>
  );
};

export default page;

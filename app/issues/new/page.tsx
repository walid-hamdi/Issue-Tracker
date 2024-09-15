import { Box, Button, Flex, TextArea, TextField } from "@radix-ui/themes";

const page = () => {
  return (
    <Flex direction="column" gap="3">
      <Box maxWidth={{ sm: "100%", md: "50%" }}>
        <TextField.Root size="3" placeholder="Enter the issue title" />
      </Box>
      <Box maxWidth={{ sm: "100%", md: "50%" }}>
        <TextArea size="3" placeholder="Enter the issue description" />
      </Box>
      <Box maxWidth={{ sm: "100%", md: "25%" }}>
        <Button size="3">Submit New Issue</Button>
      </Box>
    </Flex>
  );
};

export default page;

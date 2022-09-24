import { Stack, Box, Button, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { usePosts } from "./../../contexts/PostsContext";

const CreatePostItem = ({ postId }: { postId: number }) => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const { addItemToPost } = usePosts();

  const handleClick = useCallback(() => {
    if (itemName === "") {
      // TODO: add name error
      return;
    }

    if (itemDescription === "") {
      // TODO: add description error
      return;
    }

    console.log("sending");

    addItemToPost(postId, {
      itemName,
      itemDescription,
    });
  }, [addItemToPost, itemDescription, itemName, postId]);

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      className={"post-item"}
      padding={4}
    >
      <Box marginY="auto">
        <TextField
          id="filled-basic"
          label="Name"
          variant="filled"
          value={itemName}
          onChange={(e) => {
            setItemName(e.target.value);
          }}
        />
        <TextField
          id="filled-basic"
          label="Description"
          variant="filled"
          value={itemDescription}
          onChange={(e) => {
            setItemDescription(e.target.value);
          }}
        />
      </Box>
      <Button variant="contained" onClick={handleClick}>
        Add
      </Button>
    </Stack>
  );
};

export default CreatePostItem;

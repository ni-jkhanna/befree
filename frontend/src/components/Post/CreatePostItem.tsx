import { Stack, Button, TextField } from "@mui/material";
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
      marginY="auto"
      spacing={2}
      width={"100%"}
      padding={4}
      className={"post-item"}
    >
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
        sx={{ width: "100%" }}
        id="filled-basic"
        label="Description"
        variant="filled"
        value={itemDescription}
        onChange={(e) => {
          setItemDescription(e.target.value);
        }}
      />
      <Button variant="contained" onClick={handleClick}>
        Add
      </Button>
    </Stack>
  );
};

export default CreatePostItem;

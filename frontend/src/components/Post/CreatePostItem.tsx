import { Add } from "@mui/icons-material";
import { Stack, Button, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { usePosts } from "./../../contexts/PostsContext";

const CreatePostItem = () => {
  const { selectedPost } = usePosts();
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const { addItemToPost } = usePosts();
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  useEffect(() => {
    setNameError(false);
  }, [itemName]);

  useEffect(() => {
    setDescriptionError(false);
  }, [itemDescription]);

  const handleClick = useCallback(() => {
    if (!selectedPost) {
      return;
    }
    if (itemName === "") {
      // TODO: add name error
      setNameError(true);
      return;
    }

    if (itemDescription === "") {
      // TODO: add description error
      setDescriptionError(true);
      return;
    }

    console.log("sending");

    addItemToPost(selectedPost.post_id, {
      itemName,
      itemDescription,
    });
    setItemName("");
    setItemDescription("");
  }, [addItemToPost, itemDescription, itemName, selectedPost]);

  return (
    <Stack
      direction={"row"}
      marginY="auto"
      spacing={2}
      width={"100%"}
      padding={2}
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
        error={nameError}
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
        error={descriptionError}
      />
      <Button variant="contained" onClick={handleClick}>
        <Add />
      </Button>
    </Stack>
  );
};

export default CreatePostItem;

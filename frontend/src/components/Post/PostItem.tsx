import { Box, Button, Stack } from "@mui/material";
import { Item } from "../../types";
import { usePosts } from "../../contexts/PostsContext";

const PostItem = ({ item }: { item: Item }) => {
  const { removeItemFromPost } = usePosts();
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      className={"post-item"}
      padding={4}
    >
      <Box marginY="auto">{item.itemName}</Box>
      <Stack spacing={2}>
        <Button
          variant="contained"
          color="error"
          onClick={() => removeItemFromPost(item.itemId)}
        >
          Remove
        </Button>
      </Stack>
    </Stack>
  );
};

export default PostItem;

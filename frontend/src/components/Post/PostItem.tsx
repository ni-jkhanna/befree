import { Box, Button, Stack, Typography } from "@mui/material";
import { Remove } from "@mui/icons-material";
import { Item } from "../../types";
import { usePosts } from "../../contexts/PostsContext";

const PostItem = ({ item }: { item: Item }) => {
  const { removeItemFromPost, selectedPost } = usePosts();
  console.log("xxxxx", selectedPost);
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      className={"post-item"}
      padding={4}
    >
      <Box marginY="auto">
        <Typography>
          {item.item_name}: {item.item_description}
        </Typography>
      </Box>
      <Stack spacing={2}>
        <Button
          variant="contained"
          color="warning"
          onClick={() =>
            removeItemFromPost(selectedPost!.post_id, item.item_id)
          }
        >
          <Remove />
        </Button>
      </Stack>
    </Stack>
  );
};

export default PostItem;

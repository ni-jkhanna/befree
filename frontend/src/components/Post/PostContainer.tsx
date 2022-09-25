import { Box, Paper, Typography } from "@mui/material";
import { ELEVATION } from "../../constants";
import theme from "../../theme";
import { Post } from "../../types";
import PostItem from "./PostItem";
import CreatePostItem from "./CreatePostItem";

const sx = {
  position: "absolute",
  "border-radius": "20px",
  right: "140px",
  top: "40px",
  ".post-item:nth-child(even)": {
    "background-color": theme.palette.divider,
  }
};

interface Props {
  post: Post;
  coordinates: undefined;
}

const PostContainer = ({ post, coordinates }: Props) => {
  console.log(post);
  return (
    <Paper elevation={ELEVATION} sx={sx}>
        <Box marginY="5%" marginX="30px">
            <Typography variant="h4" >
                {"What are you getting rid of today?"}
            </Typography>
        </Box>

      {post?.items.map((item) => (
        <PostItem key={item.item_id} item={item} />
      ))}
      <CreatePostItem postId={post.post_id} />
    </Paper>
  );
};

export default PostContainer;

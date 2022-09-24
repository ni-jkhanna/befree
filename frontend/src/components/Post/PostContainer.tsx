import { Box, Paper } from "@mui/material";
import { ELEVATION } from "../../constants";
import theme from "../../theme";
import { Post } from "../../types";
import PostItem from "./PostItem";
import { Coordiantes } from "./../../types";
import CreatePostItem from "./CreatePostItem";

const sx = {
  ".post-item:nth-child(even)": {
    "background-color": theme.palette.divider,
  },
};

interface Props {
  post: Post;
  coordinates: undefined;
}

const PostContainer = ({ post, coordinates }: Props) => {
  console.log(post);
  return (
    <Paper elevation={ELEVATION}>
      <Box sx={sx}>
        {post?.items.map((item) => (
          <PostItem key={item.item_id} item={item} />
        ))}
        <CreatePostItem postId={post.post_id} />
      </Box>
    </Paper>
  );
};

export default PostContainer;

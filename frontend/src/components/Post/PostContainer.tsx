import { Box, Paper } from "@mui/material";
import { ELEVATION } from "../../constants";
import theme from "../../theme";
import { Post } from "../../types";
import PostItem from "./PostItem";
import { Coordiantes } from "./../../types";

const sx = {
  ".post-item:nth-child(even)": {
    "background-color": theme.palette.divider,
  },
};

interface ExisitingPostProps {
  post: Post;
  coordinates: undefined;
}

interface NewPostProps {
  post: undefined;
  coordinates: Coordiantes;
}

const PostContainer = ({
  post,
  coordinates,
}: ExisitingPostProps | NewPostProps) => {
  console.log(post);
  return (
    <Paper elevation={ELEVATION}>
      {post && (
        <Box sx={sx}>
          {post.items.map((item) => (
            <PostItem key={item.item_id} item={item} />
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default PostContainer;

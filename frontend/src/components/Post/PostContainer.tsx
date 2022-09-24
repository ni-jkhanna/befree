import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { Post } from "../../types";
import PostItem from "./PostItem";

const PostContainer = ({ post }: { post: Post }) => {
  return (
    <Card>
      <CardHeader>Items at Post: {post.id}</CardHeader>
      <CardContent>
        <Box className={"post-item-list"}>
          {post.items.map((item) => (
            <PostItem key={item.itemId} item={item} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostContainer;

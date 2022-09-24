import { Box } from "@mui/material";
import { useParams, Outlet } from "react-router-dom";

const PostPage = () => {
  const { postId } = useParams();

  return <Box>Post here {postId} </Box>;
};

export default PostPage;

import { Box } from "@mui/material";
import { usePosts } from "../contexts/PostsContext";
import Map from "../components/Map/Map";
import { useState } from "react";
import PostContainer from "../components/Post/PostContainer";
import { Post } from "../types";

const MainPage = () => {
  const { loading } = usePosts();
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);

  return (
    <Box>
      {loading ? "Loading posts..." : <Map setSelectedPost={setSelectedPost} />}
      {selectedPost && <PostContainer post={selectedPost} />}
    </Box>
  );
};

export default MainPage;

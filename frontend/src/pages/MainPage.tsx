import { Stack } from "@mui/material";
import { usePosts } from "../contexts/PostsContext";
import Map from "../components/Map/Map";
import { useState } from "react";
import PostContainer from "../components/Post/PostContainer";
import { Post } from "../types";
import { Coordiantes } from "./../types";

const MainPage = () => {
  const { loading } = usePosts();
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [postCreationCoordinates, setPostCreationCoordinates] = useState<
    Coordiantes | undefined
  >(undefined);

  console.log(selectedPost);

  return (
    <Stack spacing={2}>
      {loading ? (
        "Loading posts..."
      ) : (
        <Map
          setSelectedPost={setSelectedPost}
          postCreationCoordinates={postCreationCoordinates}
          setPostCreationCoordinates={setPostCreationCoordinates}
        />
      )}
      {selectedPost && (
        <PostContainer post={selectedPost} coordinates={undefined} />
      )}
      {postCreationCoordinates && (
        <PostContainer post={undefined} coordinates={postCreationCoordinates} />
      )}
    </Stack>
  );
};

export default MainPage;

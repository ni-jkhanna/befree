import { Stack } from "@mui/material";
import { usePosts } from "../contexts/PostsContext";
import Map from "../components/Map/Map";
import PostContainer from "../components/Post/PostContainer";

const MainPage = () => {
  const { loading, selectedPost } = usePosts();

  return (
    <Stack spacing={2}>
      {loading ? "Loading posts..." : <Map />}
      {selectedPost && (
        <PostContainer post={selectedPost} coordinates={undefined} />
      )}
    </Stack>
  );
};

export default MainPage;

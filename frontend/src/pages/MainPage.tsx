import { Stack } from "@mui/material";
import { usePosts } from "../contexts/PostsContext";
import Map from "../components/Map/Map";
import PostContainer from "../components/Post/PostContainer";
import SearchBar from "../components/SearchBar/SearchBar";

const MainPage = () => {
  const { selectedPost } = usePosts();

  return (
    <Stack spacing={2}>
      <Map />
      {selectedPost && (
        <PostContainer post={selectedPost} coordinates={undefined} />
      )}
      <SearchBar />
    </Stack>
  );
};

export default MainPage;

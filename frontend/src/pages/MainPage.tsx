import { Stack } from "@mui/material";
import { usePosts } from "../contexts/PostsContext";
import Map from "../components/Map/Map";
import PostContainer from "../components/Post/PostContainer";
import SearchBar from "../components/SearchBar/SearchBar";

const MainPage = () => {
  return (
    <Stack spacing={2}>
      <Map />
      <PostContainer />
      <SearchBar />
    </Stack>
  );
};

export default MainPage;

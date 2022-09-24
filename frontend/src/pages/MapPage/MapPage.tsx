import { Box } from "@mui/material";
import { usePosts } from "../../contexts/PostsContext";
import Map from "./../../components/Map/Map";

const MapPage = () => {
  const { posts, loading } = usePosts();

  return (
    <Box>
      {loading ? "Loading posts..." : JSON.stringify(posts)}
      <Map />
    </Box>
  );
};

export default MapPage;

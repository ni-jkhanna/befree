import { Box } from "@mui/material";
import { useStore } from "./../../contexts/StoreContext";

const MapPage = () => {
  const { posts } = useStore();

  return <Box>{JSON.stringify(posts)}</Box>;
};

export default MapPage;

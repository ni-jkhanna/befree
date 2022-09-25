import { Box, Paper, TextField } from "@mui/material";
import { ELEVATION } from "../../constants";
import { usePosts } from "../../contexts/PostsContext";

const sx = {
  position: "absolute",
  top: "40px",
  left: "400px",
  width: "50%",
};

const SearchBar = () => {
  const { searchText, setSearchText } = usePosts();

  return (
    <Paper sx={sx} elevation={ELEVATION}>
      <Box width={"100%"} padding={2}>
        <TextField
          fullWidth
          id="filled-basic"
          label="Filter Items"
          variant="filled"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </Box>
    </Paper>
  );
};

export default SearchBar;

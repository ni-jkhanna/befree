import { Box, Paper, SxProps, TextField } from "@mui/material";
import { ELEVATION } from "../../constants";
import { usePosts } from "../../contexts/PostsContext";
import theme from "../../theme";

const sx: SxProps = {
  position: "absolute",
  top: "40px",
  right: "10%",
  width: "50%",
  backgroundColor: theme.palette.background.default,
};

const SearchBar = () => {
  const { searchText, setSearchText } = usePosts();

  return (
    <Paper sx={sx} elevation={ELEVATION}>
      <Box width={"100%"} padding={2}>
        <TextField
          fullWidth
          id="filled-basic"
          label="Search"
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

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import theme from "./theme";
import TopAppBar from "./components/TopAppBar/TopAppBar";
import PostsProvider from "./contexts/PostsContext";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <PostsProvider>
          <TopAppBar />
          <CssBaseline />
          <Box marginTop={5}>
            <Container>
              <MainPage />
            </Container>
          </Box>
        </PostsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

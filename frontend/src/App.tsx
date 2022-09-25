import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import theme from "./theme";
import PostsProvider from "./contexts/PostsContext";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <PostsProvider>
          <CssBaseline />
          <MainPage />
        </PostsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

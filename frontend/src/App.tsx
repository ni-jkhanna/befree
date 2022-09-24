import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import theme from "./theme";
import TopAppBar from "./components/TopAppBar/TopAppBar";
import PostPage from "./pages/PostPage/PostPage";
import MapPage from "./pages/MapPage/MapPage";
import { PAGES } from "./constants";
import PostPageWrapper from "./pages/PostPage/PostPageWrapper";
import StoreProvider from "./contexts/StoreContext";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <TopAppBar />
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MapPage />} />
              <Route path={`/${PAGES.POST}`} element={<PostPageWrapper />}>
                <Route path={":postId"} element={<PostPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </StoreProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

import {
  Box,
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ELEVATION, URL } from "../../constants";
import theme from "../../theme";
import PostItem from "./PostItem";
import CreatePostItem from "./CreatePostItem";
import { useMemo } from "react";
import { usePosts } from "../../contexts/PostsContext";

const sx = {
  position: "absolute",
  left: "5%",
  top: "40px",
  width: "30%",
  ".light-background": {
    padding: 1,
    borderRadius: 2,
    backgroundColor: theme.palette.divider,
  },
  ".post-item:nth-of-type(even)": {
    backgroundColor: theme.palette.divider,
  },
  ".post-container": {
    maxHeight: "calc(100vh - 444px)",
    overflowY: "auto",
  },
};

const PostContainer = () => {
  const { selectedPost } = usePosts();

  const hasItems = useMemo(
    () => selectedPost && selectedPost.items.length > 0,
    [selectedPost]
  );
  return (
    <Paper elevation={ELEVATION} sx={sx}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Stack direction={"row"} spacing={2} justifyContent={"center"}>
              <img
                style={{ width: "80px" }}
                src={`${process.env.PUBLIC_URL}/beefree.png`}
                alt="beefree"
              />
              <Stack justifyContent={"center"}>
                <Typography variant={"h4"}>BeeFree</Typography>
              </Stack>
            </Stack>
            <Box className={"light-background"}>
              {hasItems ? (
                <Typography variant={"h6"}>
                  Thank you for keeping track of the items in this post!
                </Typography>
              ) : (
                <Typography variant={"h6"}>
                  Select a pin to edit its contents or click on the map and
                  create a post!
                </Typography>
              )}
            </Box>
            {selectedPost ? (
              hasItems ? (
                <Box className="post-container">
                  {selectedPost!.items.map((item) => (
                    <PostItem key={item.item_id} item={item} />
                  ))}
                </Box>
              ) : (
                <Typography textAlign={"left"}>
                  This space is empty! Provide information on you'to help others
                  find your used items!
                </Typography>
              )
            ) : (
              <>
                <Typography textAlign={"left"}>
                  BeeFree is a plaltform that allows people to effortlessly find
                  and share used items in their neighborhood.
                </Typography>
                <Typography textAlign={"left"}>
                  If you are looking for items, use the search bar or click on
                  pins close to your location to see their contents.
                </Typography>

                <Typography textAlign={"left"}>
                  The contents of any post are not guaranteed to be there at all
                  times, that is why we ask users to try and update the posts
                  contents as often as possible.
                </Typography>
              </>
            )}
            {selectedPost && <CreatePostItem />}
          </Stack>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default PostContainer;

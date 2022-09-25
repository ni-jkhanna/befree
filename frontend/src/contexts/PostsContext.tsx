import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { Post } from "../types";
import { URL } from "../constants";

interface Context {
  posts: Post[];
  removeItemFromPost: (itemId: number) => void;
  darkModeOn: boolean;
  setDarkModeOn: Dispatch<boolean>;
  createPost: (
    lat: number,
    lng: number,
    callback: (data: Post) => void
  ) => void;
  addItemToPost: (
    postId: number,
    item: {
      itemName: string;
      itemDescription: string;
    }
  ) => void;
  selectedPost: Post | undefined;
  setSelectedPost: Dispatch<Post | undefined>;
  searchText: string;
  setSearchText: Dispatch<string>;
}
const PostsContext = createContext<Context>({
  posts: [],
  removeItemFromPost: (itemId) => {},
  darkModeOn: true,
  setDarkModeOn: (state) => {},
  createPost: (lat, lng, callback) => {},
  addItemToPost: (postId, item) => {},
  selectedPost: undefined,
  setSelectedPost: (post) => {},
  searchText: "",
  setSearchText: (searchText) => {},
});

const PostsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [searchText, setSearchText] = useState("");

  const loadPosts = useCallback(
    (callback?: (data: Post[]) => void) => {
      // setLoading(true);
      if (searchText.trim() === "") {
        axios
          .get(`${URL}/getAllPosts`)
          .then((res) => {
            // setLoading(false);
            setPosts(res.data);
            callback && callback(res.data);
          })
          .catch((err) => {
            // setLoading(false);
            console.log(err);
          });
      } else {
        axios
          .get(`${URL}/search?query=${searchText}`)
          .then((res) => {
            // setLoading(false);
            setPosts(res.data);
            callback && callback(res.data);
          })
          .catch((err) => {
            // setLoading(false);
            console.log(err);
          });
      }
    },
    [searchText]
  );

  useEffect(() => {
    loadPosts();
  }, [loadPosts, searchText]);

  const removeItemFromPost = useCallback(
    (itemId: number) => {
      console.log(selectedPost);
      axios
        .delete(`${URL}/${itemId}/deleteItem`)
        .then((data) => {
          console.log(`Deleted item ${itemId} successfully!`, data);
          loadPosts((data) => {
            const updatedSelectedPost = data.find(
              (x) => x.post_id === selectedPost?.post_id
            );
            setSelectedPost(updatedSelectedPost);
          });
        })
        .catch((err) => console.log(err));
    },
    [loadPosts, selectedPost]
  );

  const createPost = useCallback(
    (lat: number, lng: number, callback: (data: Post) => void) => {
      axios
        .post(`${URL}/createPost`, { lat, lng })
        .then((res) => {
          loadPosts();
          callback(res.data);
        })
        .catch((err) => {
          // setLoading(false);
          console.log(err);
        });
    },
    [loadPosts]
  );

  const addItemToPost = useCallback(
    (postId: number, item: { itemName: string; itemDescription: string }) => {
      axios
        .post(`${URL}/${postId}/addItem`, item)
        .then((res) => {
          loadPosts((data) => {
            const x = data?.find((x) => x.post_id === postId);
            setSelectedPost(x);
          });
        })
        .catch((err) => {
          // setLoading(false);
          console.log(err);
        });
    },
    [loadPosts]
  );

  const [darkModeOn, setDarkModeOn] = useState(true);

  const value = useMemo(
    () => ({
      posts,
      removeItemFromPost,
      darkModeOn,
      setDarkModeOn,
      createPost,
      addItemToPost,
      selectedPost,
      setSelectedPost,
      searchText,
      setSearchText,
    }),
    [
      addItemToPost,
      createPost,
      darkModeOn,
      posts,
      removeItemFromPost,
      searchText,
      selectedPost,
    ]
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

export const usePosts = () => {
  const store = useContext(PostsContext);
  return store;
};

export default PostsProvider;

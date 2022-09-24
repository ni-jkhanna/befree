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

interface Context {
  posts: Post[];
  loading: boolean;
  removeItemFromPost: (itemId: number) => void;
  darkModeOn: boolean;
  setDarkModeOn: Dispatch<boolean>;
}
const PostsContext = createContext<Context>({
  posts: [],
  loading: false,
  removeItemFromPost: (itemId) => {},
  darkModeOn: true,
  setDarkModeOn: (state) => {},
});

const URL = "http://localhost:5000";

const PostsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPosts = useCallback(() => {
    setLoading(true);
    axios
      .get(`${URL}/getAllPosts`)
      .then((res) => {
        console.log(res)
        setLoading(false);
        setPosts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const removeItemFromPost = useCallback((itemId: number) => {
    axios
      .delete(`${URL}/${itemId}/deleteItem`)
      .then((data) => {
        console.log(`Deleted item ${itemId} successfully!`, data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [darkModeOn, setDarkModeOn] = useState(true);

  const value = useMemo(
    () => ({
      // posts: [
      //   {
      //     id: 2,
      //     lat: 52.4936,
      //     lng: 13.4469,
      //     items: [
      //       { itemName: "Baby Clothes", postId: 1, itemId: 1 },
      //       { itemName: "Kid Clothes", postId: 1, itemId: 2 },
      //       { itemName: "Men clothes", postId: 1, itemId: 3 },
      //     ],
      //   },
      // ] as Post[],
      posts,
      loading,
      removeItemFromPost,
      darkModeOn,
      setDarkModeOn,
    }),
    [darkModeOn, loading, posts, removeItemFromPost]
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

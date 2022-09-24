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
  removeItemFromPost: (postId: number, itemId: number) => void;
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
}
const PostsContext = createContext<Context>({
  posts: [],
  loading: false,
  removeItemFromPost: (postId, itemId) => {},
  darkModeOn: true,
  setDarkModeOn: (state) => {},
  createPost: (lat, lng, callback) => {},
  addItemToPost: (postId, item) => {},
  selectedPost: undefined,
  setSelectedPost: (post) => {},
});

const URL = "http://localhost:5000";

const PostsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPosts = useCallback((callback?: (data: Post[]) => void) => {
    // setLoading(true);
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
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const removeItemFromPost = useCallback((postId: number, itemId: number) => {
    console.log(selectedPost);
    axios
      .delete(`${URL}/${itemId}/deleteItem`)
      .then((data) => {
        console.log(`Deleted item ${itemId} successfully!`, data);
        loadPosts((data) => {
          const updatedSelectedPost = data.find((x) => x.post_id === postId);
          setSelectedPost(updatedSelectedPost);
        });
      })
      .catch((err) => console.log(err));
  }, []);

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
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);

  const [darkModeOn, setDarkModeOn] = useState(true);

  const value = useMemo(
    () => ({
      posts,
      loading,
      removeItemFromPost,
      darkModeOn,
      setDarkModeOn,
      createPost,
      addItemToPost,
      selectedPost,
      setSelectedPost,
    }),
    [
      addItemToPost,
      createPost,
      darkModeOn,
      loading,
      posts,
      removeItemFromPost,
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

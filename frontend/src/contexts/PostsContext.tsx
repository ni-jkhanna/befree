import {
  createContext,
  PropsWithChildren,
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
}
const PostsContext = createContext<Context>({
  posts: [],
  loading: false,
});

const PostsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/getAllPosts")
      .then((res) => {
        setLoading(false);
        setPosts(res.data.posts);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const value = useMemo(() => ({ posts, loading }), [loading, posts]);
  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

export const usePosts = () => {
  const store = useContext(PostsContext);
  return store;
};

export default PostsProvider;

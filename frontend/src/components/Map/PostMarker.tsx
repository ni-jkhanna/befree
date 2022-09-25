import { Marker } from "@react-google-maps/api";
import { useMemo } from "react";
import { Post } from "../../types";
import { usePosts } from "./../../contexts/PostsContext";

const ICON_COLORS = ["teal", "green", "yellow", "red"];
const ONE_HOUR = 60 * 60;
const TEN_HOURS = 10 * 60 * 60;
const DAY = 24 * 60 * 60;

const getIconColor = (postTimestamp: number) => {
  const color = (postTimestamp: number) => {
    let currentTime = getCurrentTimestamp();

    let age = postTimestamp - currentTime;

    if (age <= TEN_HOURS) {
      return ICON_COLORS[1];
    } else if (age <= DAY) {
      return ICON_COLORS[2];
    } else {
      return ICON_COLORS[3];
    }
  };

  return `${process.env.PUBLIC_URL}/small_marker_${color(postTimestamp)}.png`;
};

function getCurrentTimestamp() {
  return Date.now() * 100; //Seconds
}

const PostMarker = ({ post }: { post: Post }) => {
  const { setSelectedPost, selectedPost } = usePosts();
  const markerIcon = useMemo(() => {
    return selectedPost && selectedPost.post_id === post.post_id
      ? `${process.env.PUBLIC_URL}/small_marker_${ICON_COLORS[0]}.png`
      : getIconColor(post.created_at);
  }, [post.created_at, post.post_id, selectedPost]);

  return (
    // @ts-ignore
    <Marker
      position={{ lat: post.lat, lng: post.lng }}
      icon={markerIcon}
      onClick={() => {
        setSelectedPost(post);
      }}
    />
  );
};

export default PostMarker;

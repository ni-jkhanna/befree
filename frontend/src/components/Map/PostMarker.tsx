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

    if (age <= ONE_HOUR) {
      //1
      return ICON_COLORS[0];
    } else if (age <= TEN_HOURS) {
      //10
      return ICON_COLORS[1];
    } else if (age <= DAY) {
      //24
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
  const { setSelectedPost } = usePosts();
  const markerIcon = useMemo(
    () => getIconColor(post.created_at),
    [post.created_at]
  );

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

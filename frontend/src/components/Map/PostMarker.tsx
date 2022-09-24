import { Marker } from "@react-google-maps/api";
import { Dispatch, useMemo } from "react";
import { Post } from "../../types";

const ICON_COLORS = ["teal", "green", "yellow", "red"];

const getIconColor = (postTimestamp: number) => {
  // TODO: compare timestamp to current time
  // if brand new
  const color = (postTimestamp: number) => {
    if (true) {
      return ICON_COLORS[0];
    }
    if (false) {
      return ICON_COLORS[1];
    }
    if (false) {
      return ICON_COLORS[2];
    }
    if (false) {
      return ICON_COLORS[3];
    }
  };

  return `${process.env.PUBLIC_URL}/small_marker_${color(postTimestamp)}.png`;
};

const PostMarker = ({
  post,
  setSelectedPost,
}: {
  post: Post;
  setSelectedPost: Dispatch<Post | undefined>;
}) => {
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
        console.log(post);
        setSelectedPost(post);
      }}
    />
  );
};

export default PostMarker;

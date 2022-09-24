import React, { Dispatch, useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import PostMarker from "./PostMarker";
import { usePosts } from "../../contexts/PostsContext";
import { Post } from "../../types";

const containerStyle = {
  // width: "400px",
  height: "400px",
};

const center = {
  lat: 52.4936,
  lng: 13.4469,
};

const Map = ({
  setSelectedPost,
}: {
  setSelectedPost: Dispatch<Post | undefined>;
}) => {
  const { posts } = usePosts();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAgKHxqZNOWnkknLpfP_k5GjsxTB88lrUY",
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map: any) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map: any) => {
    setMap(null);
  }, []);

  console.log(posts);

  return isLoaded ? (
    // @ts-ignore
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}

      {posts.map((post) => {
        return (
          <PostMarker
            key={post.id}
            post={post}
            setSelectedPost={setSelectedPost}
          />
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;

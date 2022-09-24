import React, { Dispatch, useCallback, useMemo } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import PostMarker from "./PostMarker";
import { usePosts } from "../../contexts/PostsContext";
import { Coordiantes, Post } from "../../types";
import { lightMapStyles, darkMapStyles } from "./mapStyles";
import { Paper } from "@mui/material";
import { ELEVATION } from "../../constants";
import NewPostMarker from "./NewPostMarker";
import { createPostfix } from "typescript";

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
  const { posts, darkModeOn, createPost } = usePosts();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAgKHxqZNOWnkknLpfP_k5GjsxTB88lrUY",
  });

  // TODO: find out if we need this
  // const [map, setMap] = useState(null);

  // const onLoad = useCallback((map: any) => {
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, []);

  // const onUnmount = useCallback((map: any) => {
  //   setMap(null);
  // }, []);

  const optionsStyle = useMemo(
    () => (darkModeOn ? darkMapStyles : lightMapStyles),
    [darkModeOn]
  );

  const handleClick = useCallback(
    (lat: number, lng: number) => {
      createPost(lat, lng, (data) => {
        setSelectedPost(data);
      });
    },
    [createPost, setSelectedPost]
  );

  return isLoaded ? (
    <Paper elevation={ELEVATION}>
      {/* @ts-ignore */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        // TODO: find out if we need this
        // onLoad={onLoad}
        // onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          styles: optionsStyle,
        }}
        onClick={(ev: any) => {
          handleClick(ev.latLng.lat(), ev.latLng.lng());
        }}
      >
        {/* Child components, such as markers, info windows, etc. */}

        {posts.map((post) => {
          return (
            <PostMarker
              key={post.post_id}
              post={post}
              setSelectedPost={setSelectedPost}
            />
          );
        })}
      </GoogleMap>
    </Paper>
  ) : (
    <></>
  );
};

export default Map;

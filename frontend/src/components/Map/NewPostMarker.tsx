import { useMemo } from "react";
import { Coordiantes } from "./../../types";
import { Marker } from "@react-google-maps/api";

const NewPostMarker = ({
  coordinates: { lat, lng },
}: {
  coordinates: Coordiantes;
}) => {
  const markerIcon = useMemo(
    () => `${process.env.PUBLIC_URL}/small_marker_teal.png`,
    []
  );

  return (
    // @ts-ignore
    <Marker position={{ lat, lng }} icon={markerIcon} />
  );
};

export default NewPostMarker;

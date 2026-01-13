import { useContext, useLayoutEffect, useRef } from "react";
import { Map } from "maplibre-gl";

import { MapContext, PlacesContext } from "../context";
import { Loading } from "./Loading";

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);

  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!,
        style: "https://tiles.openfreemap.org/styles/bright",
        zoom: 13,
        center: userLocation,
      });

      setMap(map);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div ref={mapDiv} style={{ backgroundColor: "tomato", width: "100vw" }}>
      {/* {userLocation?.join(",")} */}
    </div>
  );
};

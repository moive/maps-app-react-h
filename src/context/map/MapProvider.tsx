import { useContext, useEffect, useReducer, type JSX } from "react";
import { Marker, Popup, type Map } from "maplibre-gl";

import { MapContext } from "./MapContext";
import { MapReducer } from "./MapReducer";
import { PlacesContext } from "../places/PlacesContext";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];
    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`
        <h4>${place.place_name}</h4>
        <p>${place.text}</p>
      `);

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!);

      newMarkers.push(newMarker);
    }
    dispatch({ type: "setMarkers", payload: newMarkers });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  const myLocationPopup = new Popup().setHTML(
    `<h4>Here I am!</h4><p>Anything place</p>`,
  );

  const setMap = (map: Map) => {
    new Marker({ color: "tomato" })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);

    dispatch({ type: "setMap", payload: map });
  };

  return <MapContext value={{ ...state, setMap }}>{children}</MapContext>;
};

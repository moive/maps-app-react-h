import { useReducer, type JSX } from "react";
import { Marker, Popup, type Map } from "maplibre-gl";

import { MapContext } from "./Mapcontext";
import { MapReducer } from "./MapReducer";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
};

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);

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

import { useReducer, type JSX } from "react";
import type { Map } from "maplibre-gl";

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

  const setMap = (map: Map) => {
    dispatch({ type: "setMap", payload: map });
  };

  return <MapContext value={{ ...state, setMap }}>{children}</MapContext>;
};

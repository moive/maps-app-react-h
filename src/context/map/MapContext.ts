import { createContext } from "react";
import type { Map } from "maplibre-gl";

interface MapContextProps {
  isMapReady: boolean;
  map?: Map;
  setMap: (map: Map) => void;
}

export const MapContext = createContext({} as MapContextProps);

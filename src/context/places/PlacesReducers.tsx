import type { Feature } from "../../interfaces/places.interfaces";
import type { PlacesState } from "./PlacesProviders";

type PlaceAction =
  | { type: "setUserLocation"; payload: [number, number] }
  | { type: "setLoadingPlaces" }
  | { type: "setPlaces"; payload: Feature[] };

export const PlacesReducers = (
  state: PlacesState,
  action: PlaceAction,
): PlacesState => {
  switch (action.type) {
    case "setUserLocation":
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };
    case "setLoadingPlaces":
      return {
        ...state,
        isLoadingPlaces: true,
        places: [],
      };
    case "setPlaces":
      return {
        ...state,
        isLoadingPlaces: false,
        places: action.payload,
      };
    default:
      return state;
  }
};

import type { PlacesState } from "./placesProviders";

type PlaceAction = { type: "setUserLocation"; payload: [number, number] };

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

    default:
      return state;
  }
};

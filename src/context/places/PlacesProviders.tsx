import { useEffect, useReducer, type JSX } from "react";
import { PlacesContext } from "./PlacesContext";
import { PlacesReducers } from "./PlacesReducers";
import { getUserLocation } from "../../helpers";
import { searchApi } from "../../apis";
import type {
  Feature,
  PlacesResponse,
} from "../../interfaces/places.interfaces";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProviders = ({ children }: Props) => {
  const [state, dispatch] = useReducer(PlacesReducers, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((lngLat) =>
      dispatch({ type: "setUserLocation", payload: lngLat }),
    );
  }, []);

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({ type: "setPlaces", payload: [] });
      return [];
    }
    if (!state.userLocation) throw new Error("There is not user location");

    try {
      dispatch({ type: "setLoadingPlaces" });
      const resp = await searchApi.get<PlacesResponse[]>("/search", {
        params: {
          q: query,
          // Si tienes la ubicación del usuario, añade proximidad
          ...(state.userLocation && {
            lat: state.userLocation[1],
            lon: state.userLocation[0],
            viewbox: `${state.userLocation[0] - 0.5},${state.userLocation[1] - 0.5},${state.userLocation[0] + 0.5},${state.userLocation[1] + 0.5}`,
            bounded: 1,
          }),
        },
      });
      // console.log(resp.data);
      const features: Feature[] = resp.data.map((place) => ({
        id: place.place_id,
        type: "Feature",
        place_type: ["place"],
        place_name: `${place.address.shop ? place.address.shop + " - " : ""}${place.address.suburb ?? place.address.state}`,
        text: place.display_name,
        center: [parseFloat(place.lon), parseFloat(place.lat)],
        geometry: {
          type: "Point",
          coordinates: [parseFloat(place.lon), parseFloat(place.lat)],
        },
        neighbourhood: `${place.address.neighbourhood ?? place.address.road}`,
      }));
      dispatch({ type: "setPlaces", payload: features });
      return features;
    } catch (error) {
      console.error("Error buscando lugares:", error);
      return [];
    }
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        searchPlacesByTerm,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

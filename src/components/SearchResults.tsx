import { useContext, useState } from "react";
import { MapContext, PlacesContext } from "../context";
import { LoadingPlaces } from "./LoadingPlaces";
import type { Feature } from "../interfaces/places.interfaces";

export const SearchResults = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext);

  const { map } = useContext(MapContext);

  const [activeId, setActiveId] = useState("");

  const onPlaceClicked = (place: Feature) => {
    setActiveId(place.id);
    const [lng, lat] = place.center;
    map?.flyTo({
      zoom: 14,
      center: [lng, lat],
    });
  };

  if (isLoadingPlaces) {
    return <LoadingPlaces />;
  }

  if (places.length === 0) return <></>;

  return (
    <ul className="list-group mt-3">
      {places.map((place) => (
        <li
          className={`list-group-item list-group-item-action pointer ${activeId === place.id ? "active" : ""}`}
          onClick={() => onPlaceClicked(place)}
          key={place.id}
        >
          <h5>{place.place_name}</h5>
          <p style={{ fontSize: "12px" }}>{place.neighbourhood}</p>
          <button
            className={`btn btn-sm ${activeId === place.id ? "btn-outline-light" : "btn-outline-primary"}`}
          >
            Locations
          </button>
        </li>
      ))}
    </ul>
  );
};

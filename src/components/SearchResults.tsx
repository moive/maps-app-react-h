import { useContext } from "react";
import { PlacesContext } from "../context";
import { LoadingPlaces } from "./LoadingPlaces";

export const SearchResults = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext);

  if (isLoadingPlaces) {
    return <LoadingPlaces />;
  }

  if (places.length === 0) return <></>;

  return (
    <ul className="list-group mt-3">
      {places.map((place) => (
        <li className="list-group-item list-group-item-action" key={place.id}>
          <h5>{place.place_name}</h5>
          <p className="text-muted" style={{ fontSize: "12px" }}>
            {place.neighbourhood}
          </p>
          <button className="btn btn-outline-primary btn-sm">Locations</button>
        </li>
      ))}
    </ul>
  );
};

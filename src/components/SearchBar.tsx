import { useContext, useRef, type ChangeEvent } from "react";
import { PlacesContext } from "../context";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {
  const { searchPlacesByTerm } = useContext(PlacesContext);
  const debounceRef = useRef<NodeJS.Timeout>(null);
  const onQueryChanged = (query: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      // TODO: Search or execute query
      // console.log("debounce value: ", query.target.value);
      const res = await searchPlacesByTerm(query.target.value);
    }, 1000);
  };
  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder="Search places..."
        onChange={onQueryChanged}
      />
      <SearchResults />
    </div>
  );
};

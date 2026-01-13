import { PlacesProviders } from "./context/places";
import { HomeScreen } from "./screens";

export const MapsApp = () => {
  return (
    <PlacesProviders>
      <HomeScreen />
    </PlacesProviders>
  );
};

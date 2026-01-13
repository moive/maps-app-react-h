import { MapProvider, PlacesProviders } from "./context";
import { HomeScreen } from "./screens";

export const MapsApp = () => {
  return (
    <PlacesProviders>
      <MapProvider>
        <HomeScreen />
      </MapProvider>
    </PlacesProviders>
  );
};

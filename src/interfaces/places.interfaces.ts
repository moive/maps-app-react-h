export interface PlacesResponse {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: Address;
  boundingbox: string[];
}

export interface Address {
  shop: string;
  road: string;
  neighbourhood?: string;
  city?: string;
  region?: string;
  state_district: string;
  state: string;
  postcode: string;
  country: string;
  country_code: string;
  suburb?: string;
  house_number?: string;
  county?: string;
}

export interface Feature {
  id: string;
  type: "Feature";
  place_type: string[];
  place_name: string;
  text: string;
  center: [number, number];
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  neighbourhood?: string;
}

import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://nominatim.openstreetmap.org",
  params: {
    format: "json",
    limit: 5,
    addressdetails: 1,
    "accept-language": "es",
  },
  // headers: {
  //   "User-Agent": "MiAplicacion/1.0",
  // },
});

export default searchApi;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MapsApp } from "./MapsApp";

if (!navigator.geolocation) {
  const msgError = "Geolocation is not supported by your browser";
  alert(msgError);
  throw new Error(msgError);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MapsApp />
  </StrictMode>,
);

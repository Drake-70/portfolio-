import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./i18n"; // initializes i18next before any component tree
import "./index.css";

document.documentElement.classList.add("js"); // GSAP reveal CSS gate (no-JS users see everything)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

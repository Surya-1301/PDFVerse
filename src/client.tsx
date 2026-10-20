import { StartClient } from "@tanstack/react-start/client";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { initNative } from "./lib/native";

// Boot Capacitor bridge (back button, external links, share) before render.
// Safe no-op on web.
try {
  initNative();
} catch {
  /* non-fatal on web */
}

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
);
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { StatusBar } from "@capacitor/status-bar";

export function initNative() {
  if (!Capacitor.isNativePlatform()) return;

  // Hide the status bar (fullscreen)
  StatusBar.hide().catch(() => {});

  // Android hardware / gesture back button
  App.addListener("backButton", ({ canGoBack }) => {
    // On the home page, back always exits the app — even if the
    // WebView history still has earlier pages in it.
    if (window.location.pathname === "/" || !canGoBack) {
      App.exitApp();
    } else {
      window.history.back();
    }
  });
}

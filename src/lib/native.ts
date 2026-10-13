import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { StatusBar } from "@capacitor/status-bar";


export function initNative() {
  if (!Capacitor.isNativePlatform()) return;

  // Hide the status bar (fullscreen)
  StatusBar.hide().catch(() => {});

  // Android hardware / gesture back button
  App.addListener("backButton", ({ canGoBack }) => {
    if (canGoBack) {
      window.history.back();
    } else {
      App.exitApp();
    }
  });
}

import { App } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import { StatusBar, Style } from "@capacitor/status-bar";

export function isNative(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (Capacitor.isNativePlatform()) return true;
    const win = window as any;
    if (win.Capacitor?.isNativePlatform?.()) return true;
    if (win.Capacitor?.getPlatform?.() && win.Capacitor.getPlatform() !== "web") return true;
    if (win.androidBridge != null) return true;
    if (win.PDFVerseBlobDownloader != null) return true;
    if (win.webkit?.messageHandlers?.bridge != null) return true;
    if (typeof navigator !== "undefined" && navigator.userAgent && /Android.*wv/i.test(navigator.userAgent)) {
      return true;
    }
  } catch {}
  return false;
}

export function assetUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  try {
    return new URL(clean, window.location.origin).toString();
  } catch {
    return clean;
  }
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read file data."));
    reader.onload = () => {
      const result = String(reader.result ?? "");
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.readAsDataURL(blob);
  });
}

export async function downloadBlob(blob: Blob, fileName: string): Promise<"saved" | "shared" | "web"> {
  const safeName = fileName.replace(/[\\/:*?"<>|]/g, "_") || "pdfverse-file";
  const win = typeof window !== "undefined" ? (window as any) : null;

  // 1. Direct native download via Android Java bridge interface if available
  if (win && win.PDFVerseBlobDownloader && typeof win.PDFVerseBlobDownloader.processBlobData === "function") {
    try {
      const base64 = await blobToBase64(blob);
      win.PDFVerseBlobDownloader.processBlobData(base64, safeName, blob.type || "application/octet-stream");
      return "saved";
    } catch (bridgeErr) {
      console.warn("[downloadBlob] PDFVerseBlobDownloader failed, trying filesystem fallback:", bridgeErr);
    }
  }

  if (!isNative()) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = safeName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    return "web";
  }

  const base64 = await blobToBase64(blob);

  // In native Android APK, save the file directly to the device's public Documents directory
  try {
    try {
      const perm = await Filesystem.checkPermissions();
      if (perm.publicStorage !== "granted") {
        await Filesystem.requestPermissions();
      }
    } catch {
      // Ignore permission check error on Scoped Storage Android versions
    }

    await Filesystem.writeFile({
      path: safeName,
      data: base64,
      directory: Directory.Documents,
      recursive: true,
    });

    return "saved";
  } catch (writeErr) {
    console.warn("[downloadBlob] Direct save to Documents failed, attempting share fallback:", writeErr);
  }

  // Fallback: If direct write was restricted, save to Cache and trigger Share/Save dialog
  const saved = await Filesystem.writeFile({
    path: safeName,
    data: base64,
    directory: Directory.Cache,
  });

  try {
    await Share.share({
      title: safeName,
      text: safeName,
      url: saved.uri,
      dialogTitle: `Save ${safeName}`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err ?? "");
    if (/cancel|canceled|cancelled|dismiss/i.test(message)) return "shared";
    throw err;
  }

  return "shared";
}

/** Open http(s) links in the system browser instead of trapping them in the WebView. */
export async function openExternal(url: string): Promise<void> {
  if (!/^https?:\/\//i.test(url)) return;
  if (isNative()) {
    try {
      await Browser.open({ url });
      return;
    } catch {
      // Fall through to _system-style navigation below.
    }
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

function interceptExternalLinks() {
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!anchor) return;
    const href = anchor.getAttribute("href") ?? "";
    // Only hijack absolute http(s) links; in-app router links stay untouched.
    if (!/^https?:\/\//i.test(href)) return;
    // Let explicit same-tab opt-outs behave normally on web.
    if (!isNative()) return;
    event.preventDefault();
    event.stopPropagation();
    void openExternal(href);
  }, true);
}

export function initNative() {
  if (!isNative()) return;

  // Show status bar in native and configure dark theme colors
  StatusBar.show().catch(() => {});
  StatusBar.setOverlaysWebView({ overlay: false }).catch(() => {});
  StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
  StatusBar.setBackgroundColor({ color: "#020617" }).catch(() => {});

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

  interceptExternalLinks();
}


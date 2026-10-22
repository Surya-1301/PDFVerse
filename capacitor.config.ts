import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pdfverse.app',
  appName: 'PDFVerse',
  webDir: 'dist/client',
  backgroundColor: '#020617',
  server: {
    // Served from https://localhost/ inside the APK. Keep explicit so
    // absolute-root asset URLs ("/logo.png", "/pdf.worker.min.mjs") resolve.
    androidScheme: 'https',
    // Block cleartext localhost fallbacks from ever leaking into the release build.
    cleartext: false,
  },
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      style: 'DARK',
      backgroundColor: '#020617',
    },
  },
};

export default config;

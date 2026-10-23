import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pdfverse.app',
  appName: 'PDFVerse',
  webDir: 'dist/client',
  backgroundColor: '#020617',
  server: {
    androidScheme: 'https',
    cleartext: false,
  },
  plugins: {
    StatusBar: {
      overlaysWebView: true,
    },
  },
};

export default config;

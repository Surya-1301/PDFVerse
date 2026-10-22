package com.pdfverse.app;

import android.app.DownloadManager;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.URLUtil;
import android.webkit.WebView;
import android.widget.Toast;
import androidx.core.view.WindowCompat;
import com.getcapacitor.BridgeActivity;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

public class MainActivity extends BridgeActivity {

    public static void saveBytesToDownloads(Context context, byte[] bytes, String filename, String mimeType) throws Exception {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            ContentValues values = new ContentValues();
            values.put(MediaStore.MediaColumns.DISPLAY_NAME, filename);
            if (mimeType != null && !mimeType.isEmpty()) {
                values.put(MediaStore.MediaColumns.MIME_TYPE, mimeType);
            }
            values.put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS);

            Uri uri = context.getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values);
            if (uri != null) {
                try (OutputStream os = context.getContentResolver().openOutputStream(uri)) {
                    if (os != null) {
                        os.write(bytes);
                        os.flush();
                    }
                }
            } else {
                throw new Exception("Could not allocate file in MediaStore Downloads");
            }
        } else {
            File dir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
            if (!dir.exists()) {
                dir.mkdirs();
            }
            File file = new File(dir, filename);
            try (FileOutputStream fos = new FileOutputStream(file)) {
                fos.write(bytes);
                fos.flush();
            }
            context.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.fromFile(file)));
        }
    }

    public class BlobDownloadInterface {
        @JavascriptInterface
        public void processBlobData(String base64Data, String filename, String mimeType) {
            try {
                byte[] bytes = Base64.decode(base64Data, Base64.DEFAULT);
                saveBytesToDownloads(getApplicationContext(), bytes, filename, mimeType);
                runOnUiThread(() -> Toast.makeText(getApplicationContext(), "Downloaded " + filename + " to Downloads", Toast.LENGTH_SHORT).show());
            } catch (Exception e) {
                runOnUiThread(() -> Toast.makeText(getApplicationContext(), "Failed to save file: " + e.getMessage(), Toast.LENGTH_LONG).show());
            }
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WindowCompat.setDecorFitsSystemWindows(getWindow(), true);

        // Native download listener and blob downloader for Android WebView
        if (bridge != null && bridge.getWebView() != null) {
            WebView webView = bridge.getWebView();
            webView.addJavascriptInterface(new BlobDownloadInterface(), "PDFVerseBlobDownloader");

            webView.setDownloadListener((url, userAgent, contentDisposition, mimetype, contentLength) -> {
                try {
                    if (url == null || url.isEmpty()) return;

                    // Handle blob: URIs by fetching in WebView and streaming base64 to Java
                    if (url.startsWith("blob:")) {
                        String filename = URLUtil.guessFileName(url, contentDisposition, mimetype);
                        if (filename == null || filename.isEmpty() || filename.endsWith(".bin")) {
                            filename = "pdfverse_file.pdf";
                        }
                        String finalSafeFilename = filename;
                        String finalMimeType = mimetype != null && !mimetype.isEmpty() ? mimetype : "application/octet-stream";

                        String js = "(function(){" +
                            "fetch('" + url + "')" +
                            ".then(function(r){ return r.arrayBuffer(); })" +
                            ".then(function(buf){" +
                            "  var bytes = new Uint8Array(buf);" +
                            "  var binary = '';" +
                            "  var len = bytes.byteLength;" +
                            "  var chunkSize = 8192;" +
                            "  for (var i = 0; i < len; i += chunkSize) {" +
                            "    binary += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + chunkSize, len)));" +
                            "  }" +
                            "  var b64 = btoa(binary);" +
                            "  if (window.PDFVerseBlobDownloader) {" +
                            "    window.PDFVerseBlobDownloader.processBlobData(b64, '" + finalSafeFilename.replace("'", "\\'") + "', '" + finalMimeType + "');" +
                            "  }" +
                            "}).catch(function(err){" +
                            "  console.error('Blob download failed', err);" +
                            "});" +
                            "})();";

                        webView.post(() -> webView.evaluateJavascript(js, null));
                        return;
                    }

                    // Handle data: URIs by decoding base64
                    if (url.startsWith("data:")) {
                        int comma = url.indexOf(',');
                        if (comma != -1) {
                            String base64Data = url.substring(comma + 1);
                            byte[] bytes = Base64.decode(base64Data, Base64.DEFAULT);
                            String filename = URLUtil.guessFileName(url, contentDisposition, mimetype);
                            if (filename == null || filename.isEmpty() || filename.endsWith(".bin")) {
                                filename = "pdfverse_file";
                            }
                            saveBytesToDownloads(getApplicationContext(), bytes, filename, mimetype);
                            Toast.makeText(getApplicationContext(), "Downloaded " + filename + " to Downloads", Toast.LENGTH_SHORT).show();
                        }
                        return;
                    }

                    // Handle standard HTTP and HTTPS URLs via system DownloadManager
                    if (url.startsWith("http://") || url.startsWith("https://")) {
                        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));
                        if (mimetype != null && !mimetype.isEmpty()) {
                            request.setMimeType(mimetype);
                        }
                        String cookies = CookieManager.getInstance().getCookie(url);
                        if (cookies != null) {
                            request.addRequestHeader("cookie", cookies);
                        }
                        if (userAgent != null) {
                            request.addRequestHeader("User-Agent", userAgent);
                        }
                        request.setDescription("Downloading file...");
                        String filename = URLUtil.guessFileName(url, contentDisposition, mimetype);
                        request.setTitle(filename);
                        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
                        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, filename);

                        DownloadManager dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
                        if (dm != null) {
                            dm.enqueue(request);
                            Toast.makeText(getApplicationContext(), "Downloading " + filename + "...", Toast.LENGTH_SHORT).show();
                        }
                    } else {
                        Toast.makeText(getApplicationContext(), "Unsupported download URL scheme", Toast.LENGTH_SHORT).show();
                    }
                } catch (Exception e) {
                    Toast.makeText(getApplicationContext(), "Download failed: " + e.getMessage(), Toast.LENGTH_LONG).show();
                }
            });
        }
    }
}

import { createFileRoute } from "@tanstack/react-router";

const MAX_PDF_SIZE = 50 * 1024 * 1024;
const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta";
const GEMINI_UPLOAD_BASE =
  "https://generativelanguage.googleapis.com/upload/v1beta";

type GeminiFile = {
  name?: string;
  displayName?: string;
  mimeType?: string;
  sizeBytes?: string;
  uri?: string;
  state?: "STATE_UNSPECIFIED" | "PROCESSING" | "ACTIVE" | "FAILED";
  error?: {
    code?: number;
    message?: string;
  };
};

type GeminiFileResponse = {
  file?: GeminiFile;
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
};

function jsonResponse(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function getEnv(name: string) {
  if (typeof process !== "undefined" && process.env && process.env[name]) {
    return process.env[name].trim();
  }
  if (typeof globalThis !== "undefined" && (globalThis as Record<string, unknown>)[name]) {
    return String((globalThis as Record<string, unknown>)[name]).trim();
  }
  return "";
}

function getGeminiApiKey() {
  return getEnv("GEMINI_API_KEY");
}

function getGeminiModel() {
  return (
    getEnv("GEMINI_CHAT_PDF_MODEL") ||
    "gemini-1.5-flash"
  );
}

async function createFileToken(
  fileId: string,
  secret: string,
) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(fileId),
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) =>
      byte.toString(16).padStart(2, "0"),
    )
    .join("");
}

async function getGeminiFile(
  fileId: string,
  apiKey: string,
): Promise<GeminiFile | null> {
  const response = await fetch(
    `${GEMINI_API_BASE}/${fileId}`,
    {
      method: "GET",
      headers: {
        "x-goog-api-key": apiKey,
      },
    },
  );

  const payload =
    (await response.json().catch(() => null)) as
      | GeminiFile
      | {
          error?: {
            message?: string;
          };
        }
      | null;

  if (!response.ok) {
    console.error(
      "[Chat PDF] Gemini file metadata request failed:",
      response.status,
      payload,
    );

    return null;
  }

  return payload as GeminiFile;
}

async function waitForFileReady(
  fileId: string,
  apiKey: string,
) {
  const maxAttempts = 30;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const file = await getGeminiFile(
      fileId,
      apiKey,
    );

    if (!file) {
      throw new Error(
        "Gemini could not verify the uploaded PDF.",
      );
    }

    if (file.state === "ACTIVE") {
      return file;
    }

    if (file.state === "FAILED") {
      throw new Error(
        file.error?.message ||
          "Gemini could not process the uploaded PDF.",
      );
    }

    await new Promise((resolve) =>
      setTimeout(resolve, 500),
    );
  }

  throw new Error(
    "Gemini is still processing the PDF. Please try again in a moment.",
  );
}

export const Route = createFileRoute(
  "/api/chat-pdf/upload",
)({
  server: {
    handlers: {
      POST: async ({ request }) => {
        console.log(
          "[Chat PDF] =================================",
        );
        console.log(
          "[Chat PDF] Gemini PDF upload request",
        );

        try {
          /* 1. SERVER CONFIGURATION */
          const apiKey = getGeminiApiKey();
          const model = getGeminiModel();

          if (!apiKey) {
            return jsonResponse(
              {
                success: false,
                error:
                  "GEMINI_API_KEY is not configured on the server. Add it to your .env file or Cloudflare Secret.",
              },
              500,
            );
          }

          /* 2. REQUEST VALIDATION */
          const contentType =
            request.headers.get(
              "content-type",
            ) || "";

          if (
            !contentType
              .toLowerCase()
              .startsWith(
                "multipart/form-data",
              )
          ) {
            return jsonResponse(
              {
                success: false,
                error:
                  "Invalid upload request. Expected multipart/form-data.",
              },
              400,
            );
          }

          /* 3. READ FORM DATA */
          let formData: FormData;

          try {
            formData =
              await request.formData();
          } catch (error) {
            console.error(
              "[Chat PDF] Failed to read FormData:",
              error,
            );

            return jsonResponse(
              {
                success: false,
                error:
                  "The server could not read the uploaded file.",
              },
              400,
            );
          }

          const uploaded =
            formData.get("file");

          if (!(uploaded instanceof File)) {
            return jsonResponse(
              {
                success: false,
                error:
                  "No PDF file was received. Please select a PDF and try again.",
              },
              400,
            );
          }

          /* 4. FILE VALIDATION */
          const filename =
            uploaded.name?.trim() ||
            "document.pdf";

          const filenameIsPdf =
            filename
              .toLowerCase()
              .endsWith(".pdf");

          const mimeIsPdf =
            uploaded.type ===
            "application/pdf";

          if (!filenameIsPdf && !mimeIsPdf) {
            return jsonResponse(
              {
                success: false,
                error:
                  "Only PDF files are supported.",
              },
              400,
            );
          }

          if (uploaded.size <= 0) {
            return jsonResponse(
              {
                success: false,
                error:
                  "The selected PDF is empty.",
              },
              400,
            );
          }

          if (uploaded.size > MAX_PDF_SIZE) {
            return jsonResponse(
              {
                success: false,
                error:
                  "PDF files must be 50 MB or smaller.",
              },
              400,
            );
          }

          /* 5. READ PDF BYTES */
          let fileBytes: ArrayBuffer;

          try {
            fileBytes =
              await uploaded.arrayBuffer();
          } catch (error) {
            console.error(
              "[Chat PDF] Failed to read PDF bytes:",
              error,
            );

            return jsonResponse(
              {
                success: false,
                error:
                  "Could not read the uploaded PDF.",
              },
              400,
            );
          }

          /* 6. START GEMINI RESUMABLE UPLOAD */
          const startUploadResponse =
            await fetch(
              `${GEMINI_UPLOAD_BASE}/files`,
              {
                method: "POST",
                headers: {
                  "x-goog-api-key": apiKey,
                  "X-Goog-Upload-Protocol": "resumable",
                  "X-Goog-Upload-Command": "start",
                  "X-Goog-Upload-Header-Content-Length": String(uploaded.size),
                  "X-Goog-Upload-Header-Content-Type": "application/pdf",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  file: {
                    display_name: filename,
                  },
                }),
              },
            );

          if (!startUploadResponse.ok) {
            const text = await startUploadResponse.text();
            let providerError: { error?: { message?: string } } | null = null;
            try {
              providerError = JSON.parse(text);
            } catch {}

            return jsonResponse(
              {
                success: false,
                error:
                  providerError?.error?.message ||
                  "Gemini could not initialize the PDF upload.",
                providerStatus: startUploadResponse.status,
              },
              startUploadResponse.status,
            );
          }

          const uploadUrl =
            startUploadResponse.headers.get("x-goog-upload-url");

          if (!uploadUrl) {
            return jsonResponse(
              {
                success: false,
                error: "Gemini did not return an upload URL.",
              },
              502,
            );
          }

          /* 7. UPLOAD PDF BYTES */
          const uploadResponse =
            await fetch(uploadUrl, {
              method: "POST",
              headers: {
                "Content-Length": String(uploaded.size),
                "X-Goog-Upload-Offset": "0",
                "X-Goog-Upload-Command": "upload, finalize",
                "Content-Type": "application/pdf",
              },
              body: fileBytes,
            });

          const uploadResponseText =
            await uploadResponse.text();

          if (!uploadResponse.ok) {
            let providerError: { error?: { message?: string } } | null = null;
            try {
              providerError = JSON.parse(uploadResponseText);
            } catch {}

            return jsonResponse(
              {
                success: false,
                error:
                  providerError?.error?.message ||
                  `Gemini rejected the PDF upload with status ${uploadResponse.status}.`,
                providerStatus: uploadResponse.status,
              },
              uploadResponse.status,
            );
          }

          /* 8. PARSE GEMINI FILE RESPONSE */
          let geminiData: GeminiFileResponse | null = null;
          try {
            geminiData = JSON.parse(uploadResponseText) as GeminiFileResponse;
          } catch {
            return jsonResponse(
              {
                success: false,
                error: "Gemini uploaded the PDF but returned an invalid response.",
              },
              502,
            );
          }

          const file = geminiData.file;
          const fileId = typeof file?.name === "string" ? file.name : "";

          if (!fileId) {
            return jsonResponse(
              {
                success: false,
                error: "Gemini accepted the PDF but did not return a file ID.",
              },
              502,
            );
          }

          /* 9. WAIT FOR GEMINI TO PROCESS THE PDF */
          let readyFile: GeminiFile;
          try {
            readyFile = await waitForFileReady(fileId, apiKey);
          } catch (error) {
            return jsonResponse(
              {
                success: false,
                error:
                  error instanceof Error
                    ? error.message
                    : "Gemini could not process the PDF.",
              },
              502,
            );
          }

          if (!readyFile.uri) {
            return jsonResponse(
              {
                success: false,
                error: "Gemini processed the PDF but did not return a usable file URI.",
              },
              502,
            );
          }

          /* 10. CREATE SIGNED FILE TOKEN */
          const tokenSecret = getEnv("CHAT_PDF_TOKEN_SECRET") || apiKey;
          const fileToken = await createFileToken(fileId, tokenSecret);

          return jsonResponse({
            success: true,
            fileId,
            fileToken,
            name: readyFile.displayName || filename,
            mimeType: readyFile.mimeType || "application/pdf",
            sizeBytes: readyFile.sizeBytes || String(uploaded.size),
            state: readyFile.state,
          });
        } catch (error) {
          return jsonResponse(
            {
              success: false,
              error:
                error instanceof Error
                  ? error.message
                  : "An unexpected error occurred while processing the PDF.",
            },
            500,
          );
        }
      },
    },
  },
});
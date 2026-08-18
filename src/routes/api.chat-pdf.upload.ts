import { createFileRoute } from "@tanstack/react-router";

const MAX_PDF_SIZE = 50 * 1024 * 1024;

type OpenAIFileResponse = {
  id?: string;
  object?: string;
  bytes?: number;
  created_at?: number;
  filename?: string;
  purpose?: string;
  error?: {
    message?: string;
    type?: string;
    code?: string;
    param?: string | null;
  };
};

function jsonResponse(
  data: unknown,
  status = 200,
) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function getApiKey() {
  return (
    process.env.OPENAI_API_KEY?.trim() || ""
  );
}

async function createFileToken(
  fileId: string,
  secret: string,
) {
  const key =
    await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      {
        name: "HMAC",
        hash: "SHA-256",
      },
      false,
      ["sign"],
    );

  const signature =
    await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(fileId),
    );

  return Array.from(
    new Uint8Array(signature),
  )
    .map((byte) =>
      byte.toString(16).padStart(2, "0"),
    )
    .join("");
}

export const Route = createFileRoute(
  "/api/chat-pdf/upload",
)({
  server: {
    handlers: {
      POST: async ({ request }) => {
        console.log(
          "[Chat PDF] ================================",
        );
        console.log(
          "[Chat PDF] Upload request received",
        );

        try {
          /* ============================================================
             1. SERVER ENVIRONMENT
          ============================================================ */

          const apiKey = getApiKey();

          const model =
            process.env.OPENAI_CHAT_PDF_MODEL?.trim() ||
            "gpt-5.6-luna";

          console.log(
            "[Chat PDF] API key configured:",
            Boolean(apiKey),
          );

          console.log(
            "[Chat PDF] Model:",
            model,
          );

          if (!apiKey) {
            console.error(
              "[Chat PDF] OPENAI_API_KEY is missing",
            );

            return jsonResponse(
              {
                success: false,
                error:
                  "OPENAI_API_KEY is not configured on the server. Check .env.local and restart the development server.",
              },
              500,
            );
          }

          /* ============================================================
             2. REQUEST VALIDATION
          ============================================================ */

          console.log(
            "[Chat PDF] Method:",
            request.method,
          );

          const contentType =
            request.headers.get(
              "content-type",
            ) || "";

          console.log(
            "[Chat PDF] Content-Type:",
            contentType,
          );

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

          /* ============================================================
             3. READ MULTIPART FORM
          ============================================================ */

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
            console.error(
              "[Chat PDF] FormData did not contain a File",
            );

            return jsonResponse(
              {
                success: false,
                error:
                  "No PDF file was received. Please select a PDF and try again.",
              },
              400,
            );
          }

          /* ============================================================
             4. FILE INFORMATION
          ============================================================ */

          const filename =
            uploaded.name?.trim() ||
            "document.pdf";

          console.log(
            "[Chat PDF] File received:",
            {
              name: filename,
              type: uploaded.type,
              size: uploaded.size,
            },
          );

          /* ============================================================
             5. PDF VALIDATION
          ============================================================ */

          const filenameIsPdf =
            filename
              .toLowerCase()
              .endsWith(".pdf");

          const mimeIsPdf =
            uploaded.type ===
            "application/pdf";

          if (
            !filenameIsPdf &&
            !mimeIsPdf
          ) {
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

          if (
            uploaded.size >
            MAX_PDF_SIZE
          ) {
            return jsonResponse(
              {
                success: false,
                error:
                  "PDF files must be 50 MB or smaller.",
              },
              400,
            );
          }

          /* ============================================================
             6. READ FILE INTO MEMORY
             
             This creates a fresh File object for the outgoing
             multipart request and avoids runtime-specific issues
             with forwarding the incoming File directly.
          ============================================================ */

          let fileBytes: ArrayBuffer;

          try {
            fileBytes =
              await uploaded.arrayBuffer();
          } catch (error) {
            console.error(
              "[Chat PDF] Could not read PDF bytes:",
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

          const pdfBlob =
            new Blob([fileBytes], {
              type: "application/pdf",
            });

          const pdfFile = new File(
            [pdfBlob],
            filename,
            {
              type: "application/pdf",
            },
          );

          console.log(
            "[Chat PDF] PDF prepared for OpenAI:",
            {
              name: pdfFile.name,
              size: pdfFile.size,
              type: pdfFile.type,
            },
          );

          /* ============================================================
             7. OPENAI FILE UPLOAD
          ============================================================ */

          const openAiForm =
            new FormData();

          openAiForm.append(
            "purpose",
            "user_data",
          );

          openAiForm.append(
            "file",
            pdfFile,
            filename,
          );

          /*
           * IMPORTANT:
           *
           * Do not set Content-Type manually.
           * fetch() generates the multipart boundary.
           */

          console.log(
            "[Chat PDF] Sending PDF to OpenAI...",
          );

          const openAiResponse =
            await fetch(
              "https://api.openai.com/v1/files",
              {
                method: "POST",
                headers: {
                  Authorization:
                    `Bearer ${apiKey}`,
                },
                  body: openAiForm,
              },
            );

          const responseText =
            await openAiResponse.text();

          console.log(
            "[Chat PDF] OpenAI status:",
            openAiResponse.status,
          );

          /* ============================================================
             8. PARSE OPENAI RESPONSE
          ============================================================ */

          let openAiData:
            | OpenAIFileResponse
            | null = null;

          try {
            openAiData =
              JSON.parse(
                responseText,
              ) as OpenAIFileResponse;
          } catch {
            console.error(
              "[Chat PDF] OpenAI returned non-JSON response:",
              responseText,
            );
          }

          /* ============================================================
             9. HANDLE OPENAI ERROR
          ============================================================ */

          if (!openAiResponse.ok) {
            const providerError =
              openAiData?.error;

            console.error(
              "[Chat PDF] ================================",
            );
            console.error(
              "[Chat PDF] OPENAI FILE UPLOAD FAILED",
            );
            console.error(
              "[Chat PDF] Status:",
              openAiResponse.status,
            );
            console.error(
              "[Chat PDF] Type:",
              providerError?.type,
            );
            console.error(
              "[Chat PDF] Code:",
              providerError?.code,
            );
            console.error(
              "[Chat PDF] Message:",
              providerError?.message,
            );
            console.error(
              "[Chat PDF] Raw response:",
              responseText,
            );
            console.error(
              "[Chat PDF] ================================",
            );

            return jsonResponse(
              {
                success: false,
                error:
                  providerError?.message ||
                  `OpenAI rejected the PDF upload with status ${openAiResponse.status}.`,
                providerStatus:
                  openAiResponse.status,
                providerType:
                  providerError?.type ||
                  null,
                providerCode:
                  providerError?.code ||
                  null,
              },
              openAiResponse.status,
            );
          }

          /* ============================================================
             10. EXTRACT OPENAI FILE ID
          ============================================================ */

          const fileId =
            typeof openAiData?.id ===
            "string"
              ? openAiData.id
              : "";

          if (!fileId) {
            console.error(
              "[Chat PDF] OpenAI response did not contain a file ID:",
              openAiData,
            );

            return jsonResponse(
              {
                success: false,
                error:
                  "OpenAI accepted the PDF but did not return a file ID.",
              },
              502,
            );
          }

          /* ============================================================
             11. CREATE SIGNED TOKEN
          ============================================================ */

          const tokenSecret =
            process.env.CHAT_PDF_TOKEN_SECRET?.trim() ||
            apiKey;

          const fileToken =
            await createFileToken(
              fileId,
              tokenSecret,
            );

          /* ============================================================
             12. SUCCESS
          ============================================================ */

          console.log(
            "[Chat PDF] Upload successful:",
            {
              fileId,
              filename,
              size: uploaded.size,
            },
          );

          console.log(
            "[Chat PDF] ================================",
          );

          return jsonResponse({
            success: true,
            fileId,
            fileToken,
            filename,
            size: uploaded.size,
            model,
          });
        } catch (error) {
          console.error(
            "[Chat PDF] ================================",
          );

          console.error(
            "[Chat PDF] UNEXPECTED SERVER ERROR",
          );

          console.error(
            error,
          );

          console.error(
            "[Chat PDF] ================================",
          );

          return jsonResponse(
            {
              success: false,
              error:
                error instanceof Error
                  ? `Server error: ${error.message}`
                  : "Could not upload the PDF.",
            },
            500,
          );
        }
      },
    },
  },
});
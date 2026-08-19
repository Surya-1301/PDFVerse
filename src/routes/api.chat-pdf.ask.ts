import { createFileRoute } from "@tanstack/react-router";

const MAX_QUESTION_LENGTH = 4000;
const GEMINI_API_BASE =
  "https://generativelanguage.googleapis.com/v1beta";

type GeminiFile = {
  name?: string;
  displayName?: string;
  mimeType?: string;
  sizeBytes?: string;
  uri?: string;
  state?:
    | "STATE_UNSPECIFIED"
    | "PROCESSING"
    | "ACTIVE"
    | "FAILED";
  error?: {
    code?: number;
    message?: string;
  };
};

type GeminiInteractionResponse = {
  id?: string;
  object?: string;
  model?: string;
  status?:
    | "in_progress"
    | "requires_action"
    | "completed"
    | "failed"
    | "cancelled"
    | "incomplete";
  output_text?: string;
  steps?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
  errors?: Array<{
    code?: string;
    message?: string;
  }>;
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
};

function json(
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

function isSafeFileId(
  value: unknown,
): value is string {
  return (
    typeof value === "string" &&
    /^files\/[a-z0-9-]{1,40}$/.test(
      value,
    )
  );
}

function isSafeInteractionId(
  value: unknown,
): value is string {
  return (
    typeof value === "string" &&
    /^[A-Za-z0-9._-]{1,300}$/.test(
      value,
    )
  );
}

async function signFileId(
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

function safeEqual(
  a: string,
  b: string,
) {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;

  for (
    let i = 0;
    i < a.length;
    i += 1
  ) {
    result |=
      a.charCodeAt(i) ^
      b.charCodeAt(i);
  }

  return result === 0;
}

async function getGeminiFile(
  fileId: string,
  apiKey: string,
): Promise<GeminiFile | null> {
  const response =
    await fetch(
      `${GEMINI_API_BASE}/${fileId}`,
      {
        method: "GET",
        headers: {
          "x-goog-api-key":
            apiKey,
        },
      },
    );

  const payload =
    (await response.json().catch(
      () => null,
    )) as
      | GeminiFile
      | {
          error?: {
            message?: string;
          };
        }
      | null;

  if (!response.ok) {
    console.error(
      "[Chat PDF] Gemini file lookup failed:",
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

  for (
    let attempt = 0;
    attempt < maxAttempts;
    attempt += 1
  ) {
    const file =
      await getGeminiFile(
        fileId,
        apiKey,
      );

    if (!file) {
      throw new Error(
        "The uploaded PDF could not be found in Gemini.",
      );
    }

    if (
      file.state === "ACTIVE"
    ) {
      return file;
    }

    if (
      file.state === "FAILED"
    ) {
      throw new Error(
        file.error?.message ||
          "Gemini failed to process the PDF.",
      );
    }

    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          500,
        ),
    );
  }

  throw new Error(
    "Gemini is still processing the PDF. Please try again in a moment.",
  );
}

function extractAnswer(
  payload: GeminiInteractionResponse,
) {
  if (
    typeof payload.output_text ===
    "string" &&
    payload.output_text.trim()
  ) {
    return payload.output_text.trim();
  }

  const textParts: string[] = [];

  for (
    const step of
      payload.steps ?? []
  ) {
    if (
      step.type !==
      "model_output"
    ) {
      continue;
    }

    for (
      const content of
        step.content ?? []
    ) {
      if (
        content.type === "text" &&
        typeof content.text ===
          "string"
      ) {
        textParts.push(
          content.text,
        );
      }
    }
  }

  return textParts
    .join("\n")
    .trim();
}

function getProviderError(
  payload: GeminiInteractionResponse | null,
) {
  if (
    payload?.error?.message
  ) {
    return payload.error.message;
  }

  if (
    Array.isArray(
      payload?.errors,
    )
  ) {
    const message =
      payload.errors.find(
        (item) =>
          typeof item?.message ===
          "string",
      )?.message;

    if (message) {
      return message;
    }
  }

  return "Gemini could not answer the question.";
}

export const Route = createFileRoute(
  "/api/chat-pdf/ask",
)({
  server: {
    handlers: {
      POST: async ({
        request,
      }) => {
        try {
          /* 1. SERVER CONFIGURATION */
          const apiKey =
            getGeminiApiKey();

          const model =
            getGeminiModel();

          if (!apiKey) {
            return json(
              {
                error:
                  "GEMINI_API_KEY is not configured on the server.",
              },
              500,
            );
          }

          /* 2. READ REQUEST */
          const body =
            await request
              .json()
              .catch(
                () => null,
              );

          const fileId =
            body?.fileId;

          const question =
            typeof body?.question ===
            "string"
              ? body.question.trim()
              : "";

          const previousResponseId =
            body?.previousResponseId;

          const fileToken =
            body?.fileToken;

          /* 3. VALIDATE FILE */
          if (
            !isSafeFileId(
              fileId,
            )
          ) {
            return json(
              {
                error:
                  "A valid uploaded PDF is required.",
              },
              400,
            );
          }

          /* 4. VALIDATE FILE TOKEN */
          const tokenSecret =
            getEnv(
              "CHAT_PDF_TOKEN_SECRET",
            ) || apiKey;

          const expectedToken =
            await signFileId(
              fileId,
              tokenSecret,
            );

          if (
            typeof fileToken !==
              "string" ||
            !safeEqual(
              fileToken,
              expectedToken,
            )
          ) {
            return json(
              {
                error:
                  "This PDF session is invalid or expired.",
              },
              403,
            );
          }

          /* 5. VALIDATE QUESTION */
          if (!question) {
            return json(
              {
                error:
                  "Ask a question about the PDF.",
              },
              400,
            );
          }

          if (
            question.length >
            MAX_QUESTION_LENGTH
          ) {
            return json(
              {
                error:
                  `Questions must be ${MAX_QUESTION_LENGTH} characters or fewer.`,
              },
              400,
            );
          }

          /* 6. VALIDATE CONVERSATION STATE */
          if (
            previousResponseId !==
              undefined &&
            !isSafeInteractionId(
              previousResponseId,
            )
          ) {
            return json(
              {
                error:
                  "Invalid conversation state.",
              },
              400,
            );
          }

          const firstTurn =
            !previousResponseId;

          /* 7. GET GEMINI FILE */
          let geminiFile:
            | GeminiFile
            | null = null;

          try {
            geminiFile =
              await waitForFileReady(
                fileId,
                apiKey,
              );
          } catch (error) {
            console.error(
              "[Chat PDF] PDF is not ready:",
              error,
            );

            return json(
              {
                error:
                  error instanceof Error
                    ? error.message
                    : "The PDF is not ready yet.",
              },
              502,
            );
          }

          if (
            !geminiFile.uri
          ) {
            return json(
              {
                error:
                  "Gemini did not return a usable PDF URI.",
              },
              502,
            );
          }

          /* 8. BUILD GEMINI INPUT */
          const input = firstTurn
            ? [
                {
                  type: "document",
                  uri: geminiFile.uri,
                  mime_type:
                    "application/pdf",
                },
                {
                  type: "text",
                  text: question,
                },
              ]
            : [
                {
                  type: "text",
                  text: question,
                },
              ];

          /* 9. CREATE GEMINI INTERACTION */
          const response =
            await fetch(
              `${GEMINI_API_BASE}/interactions`,
              {
                method: "POST",
                headers: {
                  "x-goog-api-key":
                    apiKey,
                  "Content-Type":
                    "application/json",
                },
                body:
                  JSON.stringify({
                    model,
                    input,
                    system_instruction:
                      "You are PDFVerse's document assistant. Answer questions using the uploaded PDF as the primary source. Do not invent facts. If the PDF does not contain enough information to answer, say so clearly. When useful, mention the page number or section where the answer comes from. Keep answers readable with short headings and bullets when appropriate.",
                    ...(previousResponseId
                      ? {
                          previous_interaction_id:
                            previousResponseId,
                        }
                      : {}),
                    store: true,
                    generation_config:
                      {
                        max_output_tokens:
                          2048,
                        thinking_level:
                          "low",
                      },
                  }),
              },
            );

          const payload =
            (await response
              .json()
              .catch(
                () => null,
              )) as GeminiInteractionResponse | null;

          /* 10. HANDLE GEMINI ERROR */
          if (
            !response.ok
          ) {
            return json(
              {
                error:
                  getProviderError(
                    payload,
                  ),
                providerStatus:
                  response.status,
              },
              response.status,
            );
          }

          if (
            payload?.status ===
            "failed"
          ) {
            return json(
              {
                error:
                  getProviderError(
                    payload,
                  ),
              },
              502,
            );
          }

          const answer =
            payload
              ? extractAnswer(
                  payload,
                )
              : "";

          return json({
            success: true,
            responseId:
              payload?.id,
            answer,
          });
        } catch (error) {
          return json(
            {
              error:
                error instanceof Error
                  ? error.message
                  : "An unexpected error occurred while asking the PDF.",
            },
            500,
          );
        }
      },
    },
  },
});
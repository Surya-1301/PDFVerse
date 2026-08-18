import { createFileRoute } from "@tanstack/react-router";

const MAX_QUESTION_LENGTH = 4000;

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function getOpenAiKey() {
  return process.env.OPENAI_API_KEY?.trim() || "";
}

function isSafeFileId(value: unknown): value is string {
  return typeof value === "string" && /^file-[A-Za-z0-9_-]+$/.test(value);
}

function isSafeResponseId(value: unknown): value is string {
  return typeof value === "string" && /^(resp|response)_[A-Za-z0-9_-]+$/.test(value);
}

async function signFileId(fileId: string, apiKey: string) {
  const secret = process.env.CHAT_PDF_TOKEN_SECRET?.trim() || apiKey;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(fileId),
  );
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export const Route = createFileRoute("/api/chat-pdf/ask")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = getOpenAiKey();
        const model = process.env.OPENAI_CHAT_PDF_MODEL?.trim() || "gpt-5.6-luna";
        if (!apiKey) {
          return json(
            { error: "OPENAI_API_KEY is not configured on the server." },
            500,
          );
        }

        const body = await request.json().catch(() => null);
        const fileId = body?.fileId;
        const question =
          typeof body?.question === "string"
            ? body.question.trim()
            : "";
        const previousResponseId = body?.previousResponseId;
        const fileToken = body?.fileToken;

        if (!isSafeFileId(fileId)) {
          return json({ error: "A valid uploaded PDF is required." }, 400);
        }

        if (typeof fileToken !== "string" || !safeEqual(fileToken, await signFileId(fileId, apiKey))) {
          return json({ error: "This PDF session is invalid or expired." }, 403);
        }

        if (!question) {
          return json({ error: "Ask a question about the PDF." }, 400);
        }

        if (question.length > MAX_QUESTION_LENGTH) {
          return json(
            { error: `Questions must be ${MAX_QUESTION_LENGTH} characters or fewer.` },
            400,
          );
        }

        if (
          previousResponseId !== undefined &&
          !isSafeResponseId(previousResponseId)
        ) {
          return json({ error: "Invalid conversation state." }, 400);
        }

        const firstTurn = !previousResponseId;

        const input = firstTurn
          ? [
              {
                role: "user",
                content: [
                  {
                    type: "input_file",
                    file_id: fileId,
                  },
                  {
                    type: "input_text",
                    text: question,
                  },
                ],
              },
            ]
          : [
              {
                role: "user",
                content: [
                  {
                    type: "input_text",
                    text: question,
                  },
                ],
              },
            ];

        const response = await fetch("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            instructions:
              "You are PDFVerse's document assistant. Answer questions using the uploaded PDF as the primary source. Do not invent facts. If the PDF does not contain enough information to answer, say so clearly. When useful, mention the page number or section where the answer comes from. Keep answers readable with short headings and bullets when appropriate.",
            input,
            ...(previousResponseId
              ? { previous_response_id: previousResponseId }
              : {}),
            store: true,
            truncation: "auto",
          }),
        });

        const payload = await response.json().catch(() => null);

        if (!response.ok) {
          const message =
            payload && typeof payload === "object" && "error" in payload
              ? String(
                  (payload.error as { message?: unknown })?.message ??
                    "OpenAI could not answer the question.",
                )
              : "OpenAI could not answer the question.";

          return json({ error: message }, response.status);
        }

        const answer =
          typeof payload?.output_text === "string"
            ? payload.output_text.trim()
            : "";

        return json({
          answer: answer || "I couldn't find a useful answer in the PDF.",
          responseId: String(payload?.id ?? ""),
          model,
        });
      },
    },
  },
});

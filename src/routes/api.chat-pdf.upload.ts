import { createFileRoute } from "@tanstack/react-router";
import * as pdfjs from "pdfjs-dist";

const MAX_PDF_SIZE = 50 * 1024 * 1024;
const MAX_PAGES = 500;
const CHUNK_SIZE = 3200;
const CHUNK_OVERLAP = 450;
const EMBEDDING_BATCH_SIZE = 32;
const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta";

const RAG_STORE_KEY = "__PDFVERSE_GEMINI_RAG_STORE_V2__";

type RagChunk = {
  id: string;
  page: number;
  text: string;
  embedding: number[];
};

type RagSession = {
  id: string;
  name: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: number;
  expiresAt: number;
  pageCount: number;
  chunks: RagChunk[];
};

type RagStore = Map<string, RagSession>;

type GeminiEmbeddingResponse = {
  embeddings?: Array<{
    values?: number[];
  }>;
  error?: {
    message?: string;
    status?: string;
  };
};

function getStore(): RagStore {
  const root = globalThis as Record<string, unknown>;
  const existing = root[RAG_STORE_KEY];
  if (existing instanceof Map) return existing as RagStore;

  const store: RagStore = new Map();
  root[RAG_STORE_KEY] = store;
  return store;
}

function cleanupStore() {
  const store = getStore();
  const now = Date.now();
  for (const [id, session] of store) {
    if (session.expiresAt <= now) store.delete(id);
  }
}

function jsonResponse(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function getEnv(name: string) {
  if (typeof process !== "undefined" && process.env?.[name]) {
    return process.env[name]!.trim();
  }

  const root = globalThis as Record<string, unknown>;
  const value = root[name];
  return typeof value === "string" ? value.trim() : "";
}

function getGeminiApiKey() {
  return getEnv("GEMINI_API_KEY");
}

function getEmbeddingModel() {
  return getEnv("GEMINI_EMBEDDING_MODEL") || "gemini-embedding-2";
}

function getTokenSecret(apiKey: string) {
  return getEnv("CHAT_PDF_TOKEN_SECRET") || apiKey;
}

async function signValue(value: string, secret: string) {
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
    new TextEncoder().encode(value),
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function createId() {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function normalizeText(value: string) {
  return value
    .replace(/\u0000/g, " ")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function chunkPageText(page: number, text: string): Array<Omit<RagChunk, "id" | "embedding">> {
  const normalized = normalizeText(text);
  if (!normalized) return [];

  const chunks: Array<Omit<RagChunk, "id" | "embedding">> = [];
  let start = 0;

  while (start < normalized.length) {
    let end = Math.min(start + CHUNK_SIZE, normalized.length);

    if (end < normalized.length) {
      const paragraphBreak = normalized.lastIndexOf("\n\n", end);
      const sentenceBreak = normalized.lastIndexOf(". ", end);
      const softBreak = Math.max(paragraphBreak, sentenceBreak);
      if (softBreak > start + Math.floor(CHUNK_SIZE * 0.55)) {
        end = softBreak + (normalized[softBreak] === "." ? 1 : 0);
      }
    }

    const chunkText = normalized.slice(start, end).trim();
    if (chunkText.length >= 40) {
      chunks.push({ page, text: chunkText });
    }

    if (end >= normalized.length) break;
    start = Math.max(end - CHUNK_OVERLAP, start + 1);
  }

  return chunks;
}

async function extractPages(fileBytes: ArrayBuffer) {
  const loadingTask = pdfjs.getDocument({
    data: new Uint8Array(fileBytes),
    useWorkerFetch: false,
    isEvalSupported: false,
    disableFontFace: true,
  });

  const pdf = await loadingTask.promise;

  if (pdf.numPages > MAX_PAGES) {
    await pdf.destroy();
    throw new Error(`PDFs are limited to ${MAX_PAGES} pages for Chat with PDF.`);
  }

  const pages: Array<{ page: number; text: string }> = [];

  try {
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();

      const pageText = content.items
        .map((item) => {
          if ("str" in item && typeof item.str === "string") return item.str;
          return "";
        })
        .join(" ");

      pages.push({ page: pageNumber, text: pageText });
    }
  } finally {
    await pdf.destroy();
  }

  return pages;
}

async function embedDocuments(
  texts: string[],
  apiKey: string,
  model: string,
) {
  const allEmbeddings: number[][] = [];

  for (let start = 0; start < texts.length; start += EMBEDDING_BATCH_SIZE) {
    const batch = texts.slice(start, start + EMBEDDING_BATCH_SIZE);

    const response = await fetch(
      `${GEMINI_API_BASE}/models/${encodeURIComponent(model)}:batchEmbedContents`,
      {
        method: "POST",
        headers: {
          "x-goog-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: batch.map((text) => ({
            model: `models/${model}`,
            content: {
              parts: [{ text }],
            },
            embedContentConfig: {
              taskType: "RETRIEVAL_DOCUMENT",
              title: "PDFVerse PDF chunk",
              autoTruncate: true,
            },
          })),
        }),
      },
    );

    const payload = (await response.json().catch(() => null)) as GeminiEmbeddingResponse | null;

    if (!response.ok) {
      throw new Error(
        payload?.error?.message ||
          `Gemini embedding request failed with status ${response.status}.`,
      );
    }

    const embeddings = payload?.embeddings?.map((item) => item.values ?? []);
    if (!embeddings || embeddings.length !== batch.length || embeddings.some((vector) => vector.length === 0)) {
      throw new Error("Gemini returned an invalid embedding response.");
    }

    allEmbeddings.push(...embeddings);
  }

  return allEmbeddings;
}

export const Route = createFileRoute("/api/chat-pdf/upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        cleanupStore();

        try {
          const apiKey = getGeminiApiKey();
          if (!apiKey) {
            return jsonResponse(
              {
                success: false,
                error:
                  "GEMINI_API_KEY is not configured on the server. Add it to the backend environment, not the browser app.",
              },
              500,
            );
          }

          const contentType = request.headers.get("content-type") || "";
          if (!contentType.toLowerCase().startsWith("multipart/form-data")) {
            return jsonResponse(
              {
                success: false,
                error: "Expected multipart/form-data.",
              },
              400,
            );
          }

          const formData = await request.formData();
          const uploaded = formData.get("file");

          if (!(uploaded instanceof File)) {
            return jsonResponse(
              {
                success: false,
                error: "No PDF file was received.",
              },
              400,
            );
          }

          const filename = uploaded.name?.trim() || "document.pdf";
          const isPdf =
            uploaded.type === "application/pdf" ||
            filename.toLowerCase().endsWith(".pdf");

          if (!isPdf) {
            return jsonResponse(
              {
                success: false,
                error: "Only PDF files are supported.",
              },
              400,
            );
          }

          if (uploaded.size <= 0) {
            return jsonResponse(
              {
                success: false,
                error: "The selected PDF is empty.",
              },
              400,
            );
          }

          if (uploaded.size > MAX_PDF_SIZE) {
            return jsonResponse(
              {
                success: false,
                error: "PDF files must be 50 MB or smaller.",
              },
              400,
            );
          }

          const fileBytes = await uploaded.arrayBuffer();
          const pages = await extractPages(fileBytes);
          const rawChunks = pages.flatMap(({ page, text }) => chunkPageText(page, text));

          if (rawChunks.length === 0) {
            return jsonResponse(
              {
                success: false,
                error:
                  "No selectable text was found in this PDF. Scanned/image-only PDFs need OCR before they can be indexed.",
              },
              422,
            );
          }

          const embeddingModel = getEmbeddingModel();
          const embeddings = await embedDocuments(
            rawChunks.map((chunk) => `Page ${chunk.page}\n${chunk.text}`),
            apiKey,
            embeddingModel,
          );

          const sessionId = await createId();
          const chunks: RagChunk[] = rawChunks.map((chunk, index) => ({
            ...chunk,
            id: `${sessionId}-${index + 1}`,
            embedding: embeddings[index]!,
          }));

          const now = Date.now();
          const session: RagSession = {
            id: sessionId,
            name: filename,
            mimeType: "application/pdf",
            sizeBytes: uploaded.size,
            createdAt: now,
            expiresAt: now + 60 * 60 * 1000,
            pageCount: pages.length,
            chunks,
          };

          getStore().set(sessionId, session);

          const fileToken = await signValue(sessionId, getTokenSecret(apiKey));

          return jsonResponse({
            success: true,
            fileId: sessionId,
            fileToken,
            name: filename,
            mimeType: "application/pdf",
            sizeBytes: uploaded.size,
            pageCount: pages.length,
            chunkCount: chunks.length,
            embeddingModel,
            state: "ACTIVE",
          });
        } catch (error) {
          console.error("[Chat PDF RAG] Upload failed:", error);
          return jsonResponse(
            {
              success: false,
              error:
                error instanceof Error
                  ? error.message
                  : "Could not index the PDF.",
            },
            500,
          );
        }
      },
    },
  },
});

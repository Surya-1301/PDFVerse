const MAX_CHUNK_CHARS = 1400;
const CHUNK_OVERLAP_CHARS = 220;
const TOP_K = 6;
const SESSION_TTL_MS = 60 * 60 * 1000;
const EMBEDDING_BATCH_SIZE = 64;

const EMBEDDING_MODEL =
  process.env.GEMINI_EMBEDDING_MODEL || "gemini-embedding-001";

const RAG_MODEL =
  process.env.GEMINI_RAG_MODEL || "gemini-3.7-flash";

const EMBEDDING_TIMEOUT_MS = 45000;
const GENERATION_TIMEOUT_MS = 60000;

const crypto = require("crypto");

const sessions = new Map();

const GEMINI_API_BASE =
  process.env.GEMINI_API_BASE ||
  "https://generativelanguage.googleapis.com/v1beta";


function requireGeminiKey() {
  const key = String(
    process.env.GEMINI_API_KEY || "",
  ).trim();

  if (!key) {
    const error = new Error(
      "GEMINI_API_KEY is not configured on the server.",
    );

    error.code = "GEMINI_API_KEY_MISSING";

    throw error;
  }

  return key;
}


function normalizeWhitespace(text) {
  return String(text || "")
    .replace(/\u0000/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}


function chunkPageText(text, pageNumber) {
  const cleaned = normalizeWhitespace(text);

  if (!cleaned) {
    return [];
  }

  const chunks = [];

  let start = 0;

  while (start < cleaned.length) {
    let end = Math.min(
      start + MAX_CHUNK_CHARS,
      cleaned.length,
    );

    if (end < cleaned.length) {
      const boundaries = [
        cleaned.lastIndexOf("\n\n", end),
        cleaned.lastIndexOf(". ", end),
        cleaned.lastIndexOf(" ", end),
      ];

      const boundary = Math.max(
        ...boundaries,
      );

      if (
        boundary >
        start +
          Math.floor(
            MAX_CHUNK_CHARS * 0.55,
          )
      ) {
        end = boundary + 1;
      }
    }

    const chunkText = cleaned
      .slice(start, end)
      .trim();

    if (chunkText) {
      chunks.push({
        page: pageNumber,
        text: chunkText,
      });
    }

    if (end >= cleaned.length) {
      break;
    }

    start = Math.max(
      end - CHUNK_OVERLAP_CHARS,
      start + 1,
    );
  }

  return chunks;
}


function cosineSimilarity(a, b) {
  if (
    !Array.isArray(a) ||
    !Array.isArray(b) ||
    a.length !== b.length ||
    a.length === 0
  ) {
    return 0;
  }

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (
    let i = 0;
    i < a.length;
    i += 1
  ) {
    const av = Number(a[i]) || 0;
    const bv = Number(b[i]) || 0;

    dot += av * bv;
    normA += av * av;
    normB += bv * bv;
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return (
    dot /
    (Math.sqrt(normA) * Math.sqrt(normB))
  );
}


async function geminiRequest(
  endpoint,
  body,
  timeoutMs,
) {
  const apiKey = requireGeminiKey();

  const timeout =
    Number.isFinite(timeoutMs) &&
    timeoutMs > 0
      ? timeoutMs
      : 45000;

  const controller =
    new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, timeout);

  const url =
    `${GEMINI_API_BASE}/${endpoint}`;

  try {
    console.log(
      `[Gemini] POST ${url}`,
    );

    const response =
      await fetch(
        url,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
            "x-goog-api-key":
              apiKey,
          },

          body:
            JSON.stringify(body),

          signal:
            controller.signal,
        },
      );

    const rawText =
      await response.text();

    let payload = null;

    if (rawText) {
      try {
        payload =
          JSON.parse(rawText);
      } catch {
        payload = {
          raw: rawText,
        };
      }
    }

    if (!response.ok) {
      console.error(
        "[Gemini API Error]",
        {
          status:
            response.status,
          endpoint,
          payload,
        },
      );

      const error =
        new Error(
          payload?.error?.message ||
            payload?.error?.status ||
            `Gemini request failed with status ${response.status}.`,
        );

      error.status =
        response.status;

      error.payload =
        payload;

      throw error;
    }

    console.log(
      `[Gemini] ${response.status} OK`,
    );

    return payload;
  } catch (error) {
    if (
      error?.name ===
      "AbortError"
    ) {
      throw new Error(
        `Gemini request timed out after ${timeout} ms.`,
      );
    }

    throw error;
  } finally {
    clearTimeout(timer);
  }
}


/**
 * Creates document/query embeddings.
 *
 * Gemini Embedding 001 uses the REST request shape:
 *
 * POST /v1beta/models/{model}:batchEmbedContents
 *
 * with:
 *
 * {
 *   requests: [
 *     {
 *       model: "models/gemini-embedding-001",
 *       content: {
 *         parts: [{ text: "..." }]
 *       }
 *     }
 *   ]
 * }
 *
 * The newer taskType/outputDimensionality configuration is only
 * enabled when GEMINI_EMBEDDING_ADVANCED_CONFIG=true.
 */
async function createEmbeddings(
  texts,
  taskType,
  title = "",
) {
  if (
    !Array.isArray(texts) ||
    texts.length === 0
  ) {
    return [];
  }

  const embeddings = [];

  const advancedConfig =
    String(
      process.env.GEMINI_EMBEDDING_ADVANCED_CONFIG ||
        "",
    )
      .trim()
      .toLowerCase() === "true";

  for (
    let offset = 0;
    offset < texts.length;
    offset += EMBEDDING_BATCH_SIZE
  ) {
    const batch = texts.slice(
      offset,
      offset +
        EMBEDDING_BATCH_SIZE,
    );

    console.log(
      `[RAG] Embedding batch ${
        Math.floor(
          offset /
            EMBEDDING_BATCH_SIZE,
        ) + 1
      } (${batch.length} texts)`,
    );

    const requests =
      batch.map(
        (text) => {
          const request = {
            model:
              `models/${EMBEDDING_MODEL}`,

            content: {
              parts: [
                {
                  text: String(text),
                },
              ],
            },
          };

          /*
           * Do not enable this for gemini-embedding-001.
           * The current API documentation marks the older
           * taskType/outputDimensionality fields as unsupported
           * for embedding-001.
           */
          if (
            advancedConfig
          ) {
            request.embedContentConfig = {
              taskType,

              ...(taskType ===
                "RETRIEVAL_DOCUMENT" &&
              title
                ? {
                    title,
                  }
                : {}),
            };
          }

          return request;
        },
      );

    const payload =
      await geminiRequest(
        `models/${EMBEDDING_MODEL}:batchEmbedContents`,
        {
          requests,
        },
        EMBEDDING_TIMEOUT_MS,
      );

    const batchEmbeddings =
      Array.isArray(
        payload?.embeddings,
      )
        ? payload.embeddings.map(
            (item) =>
              item?.values,
          )
        : [];

    if (
      batchEmbeddings.length !==
      batch.length
    ) {
      throw new Error(
        `Gemini returned ${batchEmbeddings.length} embeddings for ${batch.length} inputs.`,
      );
    }

    const invalidIndex =
      batchEmbeddings.findIndex(
        (vector) =>
          !Array.isArray(vector) ||
          vector.length === 0,
      );

    if (
      invalidIndex !== -1
    ) {
      throw new Error(
        `Gemini returned an invalid embedding vector at index ${invalidIndex}.`,
      );
    }

    embeddings.push(
      ...batchEmbeddings,
    );
  }

  return embeddings;
}


function extractGeneratedText(
  payload,
) {
  const candidates =
    Array.isArray(
      payload?.candidates,
    )
      ? payload.candidates
      : [];

  for (
    const candidate of candidates
  ) {
    const parts =
      Array.isArray(
        candidate?.content?.parts,
      )
        ? candidate.content.parts
        : [];

    const text =
      parts
        .map((part) =>
          typeof part?.text ===
          "string"
            ? part.text
            : "",
        )
        .filter(Boolean)
        .join("\n")
        .trim();

    if (text) {
      return text;
    }
  }

  return "";
}


async function generateAnswer({
  question,
  context,
  history,
}) {
  const conversation = (
    Array.isArray(history)
      ? history
      : []
  )
    .slice(-6)
    .map((message) => {
      const role =
        message?.role === "assistant"
          ? "Assistant"
          : "User";

      const text = String(
        message?.text || "",
      ).slice(0, 2000);

      return `${role}: ${text}`;
    })
    .join("\n");

  const prompt = [
    "You are PDFVerse's document assistant.",

    "Answer ONLY from the retrieved PDF context.",

    "Do not use outside knowledge.",

    "Do not invent facts.",

    "If the answer is not supported by the context, say that the PDF does not provide enough information.",

    "Cite supporting pages using [Page N].",

    conversation
      ? `RECENT CONVERSATION:\n${conversation}`
      : "",

    `RETRIEVED PDF CONTEXT:\n${context}`,

    `USER QUESTION:\n${question}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  console.log(
    "[RAG] Sending answer request to Gemini...",
  );

  const payload =
    await geminiRequest(
      `models/${RAG_MODEL}:generateContent`,
      {
        contents: [
          {
            role: "user",

            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],

        generationConfig: {
          maxOutputTokens: 800,

          ...(RAG_MODEL ===
            "gemini-3.7-flash"
            ? {
                thinkingConfig: {
                  thinkingLevel:
                    "low",
                },
              }
            : {}),
        },
      },
      30000,
    );

  console.log(
    "[RAG] Gemini generation response received.",
  );

  const answer =
    extractGeneratedText(
      payload,
    );

  if (!answer) {
    console.error(
      "[RAG] Empty Gemini response:",
      JSON.stringify(
        payload,
        null,
        2,
      ),
    );

    const blockReason =
      payload
        ?.promptFeedback
        ?.blockReason;

    throw new Error(
      blockReason
        ? `Gemini blocked the request: ${blockReason}.`
        : "Gemini returned an empty answer.",
    );
  }

  return answer;
}


function cleanupExpiredSessions() {
  const now = Date.now();

  for (
    const [fileId, session] of sessions.entries()
  ) {
    if (
      session.expiresAt <=
      now
    ) {
      sessions.delete(
        fileId,
      );
    }
  }
}


function createToken(fileId) {
  const secret =
    String(
      process.env.CHAT_PDF_TOKEN_SECRET ||
        process.env.GEMINI_API_KEY ||
        "",
    ).trim();

  if (!secret) {
    throw new Error(
      "CHAT_PDF_TOKEN_SECRET is not configured on the server.",
    );
  }

  return crypto
    .createHmac(
      "sha256",
      secret,
    )
    .update(fileId)
    .digest("hex");
}


function safeTokenEqual(
  actual,
  expected,
) {
  if (
    typeof actual !== "string" ||
    typeof expected !== "string" ||
    actual.length !==
      expected.length
  ) {
    return false;
  }

  try {
    return crypto.timingSafeEqual(
      Buffer.from(actual),
      Buffer.from(expected),
    );
  } catch {
    return false;
  }
}


async function indexDocument({
  fileId,
  filename,
  pages,
}) {
  cleanupExpiredSessions();

  const normalizedPages =
    Array.isArray(pages)
      ? pages.map((page) =>
          String(page || ""),
        )
      : [];

  const chunks =
    normalizedPages.flatMap(
      (pageText, index) =>
        chunkPageText(
          pageText,
          index + 1,
        ),
    );

  if (
    chunks.length ===
    0
  ) {
    throw new Error(
      "No extractable text was found in this PDF. Scanned PDFs may need OCR first.",
    );
  }

  console.log(
    `[RAG] Indexing ${filename}: ${normalizedPages.length} pages, ${chunks.length} chunks`,
  );

  const vectors =
    await createEmbeddings(
      chunks.map(
        (chunk) =>
          chunk.text,
      ),
      "RETRIEVAL_DOCUMENT",
      filename,
    );

  if (
    vectors.length !==
    chunks.length
  ) {
    throw new Error(
      "Embedding count does not match chunk count.",
    );
  }

  const now = Date.now();

  const session = {
    fileId,
    filename,
    pageCount:
      normalizedPages.length,

    chunks:
      chunks.map(
        (chunk, index) => ({
          page:
            chunk.page,

          text:
            chunk.text,

          embedding:
            vectors[index],
        }),
      ),

    createdAt: now,

    expiresAt:
      now + SESSION_TTL_MS,
  };

  sessions.set(
    fileId,
    session,
  );

  console.log(
    `[RAG] Indexed ${filename} successfully`,
  );

  return {
    fileId,

    fileToken:
      createToken(
        fileId,
      ),

    name:
      filename,

    mimeType:
      "application/pdf",

    pageCount:
      normalizedPages.length,

    chunkCount:
      chunks.length,

    embeddingModel:
      EMBEDDING_MODEL,

    generationModel:
      RAG_MODEL,

    expiresAt:
      session.expiresAt,
  };
}


function getSession(
  fileId,
  fileToken,
) {
  cleanupExpiredSessions();

  const session =
    sessions.get(
      fileId,
    );

  if (!session) {
    throw new Error(
      "This PDF session has expired. Please upload the PDF again.",
    );
  }

  const expected =
    createToken(fileId);

  if (
    !safeTokenEqual(
      fileToken,
      expected,
    )
  ) {
    throw new Error(
      "This PDF session is invalid or expired.",
    );
  }

  return session;
}


async function answerFromDocument({
  fileId,
  fileToken,
  question,
  history,
}) {
  console.log(
    `[RAG] Starting question: ${question}`,
  );

  const session =
    getSession(
      fileId,
      fileToken,
    );

  console.log(
    `[RAG] Session found: ${session.filename}`,
  );

  console.log(
    "[RAG] Creating question embedding...",
  );

  const [
    questionEmbedding,
  ] =
    await createEmbeddings(
      [question],
      "RETRIEVAL_QUERY",
    );

  console.log(
    "[RAG] Question embedding created.",
  );

  if (
    !Array.isArray(
      questionEmbedding,
    )
  ) {
    throw new Error(
      "Could not create a question embedding.",
    );
  }

  const ranked =
    session.chunks
      .map(
        (chunk) => ({
          page:
            chunk.page,

          text:
            chunk.text,

          score:
            cosineSimilarity(
              questionEmbedding,
              chunk.embedding,
            ),
        }),
      )
      .sort(
        (a, b) =>
          b.score - a.score,
      );

  const selected =
    ranked.slice(
      0,
      TOP_K,
    );

  if (
    selected.length ===
    0
  ) {
    throw new Error(
      "No relevant information was found in the PDF.",
    );
  }

  console.log(
    "[RAG] Retrieved pages:",
    selected.map(
      (item) =>
        `${item.page} (${item.score.toFixed(4)})`,
    ),
  );

  const context =
    selected
      .map(
        (item, index) =>
          `SOURCE ${index + 1} [Page ${item.page}]\n${item.text}`,
      )
      .join("\n\n");

  const answer =
    await generateAnswer({
      question,
      context,
      history,
    });

  return {
    answer,

    sources:
      selected.map(
        (item) => ({
          page:
            item.page,

          score:
            Number(
              item.score.toFixed(
                4,
              ),
            ),

          preview:
            item.text.slice(
              0,
              320,
            ),
        }),
      ),

    embeddingModel:
      EMBEDDING_MODEL,

    modelUsed:
      RAG_MODEL,
  };
}

module.exports = {
  indexDocument,
  answerFromDocument,
};
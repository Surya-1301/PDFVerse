import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Check,
  FileText,
  Loader2,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  Upload,
  User,
} from "lucide-react";

const API_BASE =
  import.meta.env.VITE_PDF_API_BASE_URL ||
  "https://pdf-verse-api-uu40.onrender.com";

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const REQUEST_TIMEOUT_MS = 120_000;
const WAKE_TIMEOUT_MS = 90_000;
const WAKE_POLL_MS = 3_000;

function isTransportError(error: unknown) {
  return (
    error instanceof TypeError ||
    (error instanceof DOMException && error.name === "TimeoutError") ||
    (error instanceof Error && error.message.toLowerCase().includes("fetch"))
  );
}

async function wakeBackend() {
  const deadline = Date.now() + WAKE_TIMEOUT_MS;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${API_BASE}/health`, {
        method: "GET",
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      });

      if (response.ok) return true;
    } catch {
      // Still booting - keep polling until the deadline.
    }

    await new Promise((resolve) => setTimeout(resolve, WAKE_POLL_MS));
  }

  return false;
}

async function fetchWithWake(url: string, init: RequestInit) {
  try {
    return await fetch(url, {
      ...init,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    if (!isTransportError(error)) throw error;

    // Retry once, but only after the backend confirms it is actually awake.
    if (!(await wakeBackend())) throw error;

    return await fetch(url, {
      ...init,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  }
}

const SUGGESTIONS = [
  "What is this document about?",
  "Summarize the key findings.",
  "What are the main conclusions?",
  "Find all important dates mentioned.",
  "List the key amounts or figures.",
];

type Source = {
  page: number;
  score: number;
  preview: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  sources?: Source[];
};

export function ChatWithPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState("");
  const [fileToken, setFileToken] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [uploading, setUploading] = useState(false);
  const [asking, setAsking] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function resetChat() {
    setFile(null);
    setFileId("");
    setFileToken("");
    setMessages([]);
    setQuestion("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  async function uploadPdf(nextFile: File) {
    setError("");

    const isPdf =
      nextFile.type === "application/pdf" ||
      nextFile.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setError("Please choose a PDF file.");
      return;
    }

    if (nextFile.size > MAX_FILE_SIZE) {
      setError("PDF files must be 50 MB or smaller.");
      return;
    }

    if (nextFile.size === 0) {
      setError("The selected PDF is empty.");
      return;
    }

    setFile(nextFile);
    setFileId("");
    setFileToken("");
    setMessages([]);
    setUploading(true);

    try {
      const form = new FormData();
      form.append("file", nextFile);

      const response = await fetchWithWake(`${API_BASE}/api/chat-pdf/upload`, {
        method: "POST",
        body: form,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "Could not upload the PDF.",
        );
      }

      setFileId(String(data.fileId ?? ""));
      setFileToken(String(data.fileToken ?? ""));
    } catch (uploadError) {
      setFileId("");
      setFileToken("");
      const isNetworkError = isTransportError(uploadError);
      setError(
        isNetworkError
          ? "Unable to connect to the PDF API. If your backend is deployed on Render free tier, please wait 30 seconds for it to wake up and try again."
          : uploadError instanceof Error
          ? uploadError.message
          : "Could not upload the PDF.",
      );
    } finally {
      setUploading(false);
    }
  }

  async function askPdf(nextQuestion = question) {
    const text = nextQuestion.trim();

    if (!text || !fileId || uploading || asking) return;

    setError("");
    setQuestion("");
    setAsking(true);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
    };

    setMessages((current) => [...current, userMessage]);

    try {
      const response = await fetchWithWake(`${API_BASE}/api/chat-pdf/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileId,
          fileToken,
          question: text,
          history: messages.slice(-6).map(({ role, text: messageText }) => ({
            role,
            text: messageText,
          })),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "Could not get an answer.",
        );
      }

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: String(data.answer ?? "No answer was returned."),
          sources: Array.isArray(data.sources) ? data.sources : [],
        },
      ]);
    } catch (askError) {
      const isNetworkError = isTransportError(askError);
      setError(
        isNetworkError
          ? "Unable to reach the backend server to get an answer. Please check your connection or backend status and try again."
          : askError instanceof Error
          ? askError.message
          : "Could not get an answer.",
      );
    } finally {
      setAsking(false);
    }
  }

  return (
    <div className="space-y-5">
      {!file ? (
        <label
          className={`flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-[2rem] border border-dashed p-6 text-center transition sm:min-h-[360px] sm:p-10 ${
            dragging
              ? "border-violet-400 bg-violet-500/10"
              : "border-white/15 bg-white/[0.025] hover:border-violet-500/50 hover:bg-violet-500/[0.04]"
          }`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            const dropped = event.dataTransfer.files?.[0];
            if (dropped) void uploadPdf(dropped);
          }}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600/15 text-violet-300">
            <Upload className="h-7 w-7" />
          </span>
          <span className="mt-5 text-xl font-semibold text-white">
            Upload a PDF to start chatting
          </span>
          <span className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Ask questions, summarize the document, find dates and amounts, or
            explore specific sections.
          </span>
          <span className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white">
            <Upload className="h-4 w-4" />
            Choose PDF
          </span>
          <span className="mt-4 text-xs text-slate-600">
            PDF only • Maximum 50 MB
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={(event) => {
              const selected = event.target.files?.[0];
              if (selected) void uploadPdf(selected);
            }}
          />
        </label>
      ) : (
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl shadow-violet-950/10">
          <div className="flex flex-col gap-4 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-300">
                <FileText className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {file.name}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                  {uploading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Indexing document…
                    </>
                  ) : fileId ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      RAG index ready
                    </>
                  ) : (
                    "Upload failed"
                  )}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 px-3.5 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <Upload className="h-4 w-4" />
                Change PDF
              </button>
              <button
                type="button"
                onClick={resetChat}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 px-3.5 py-2 text-sm font-semibold text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
                New chat
              </button>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(event) => {
                const selected = event.target.files?.[0];
                if (selected) void uploadPdf(selected);
              }}
            />
          </div>

          <div
            ref={messagesRef}
            className="min-h-[360px] max-h-[650px] space-y-5 overflow-y-auto p-4 sm:p-6"
          >
            {messages.length === 0 ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/15 text-violet-300">
                  <Sparkles className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-white">
                  Ask anything about this document
                </h2>
                <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
                  PDFVerse will answer from the uploaded document and tell you
                  when the document does not provide enough information.
                </p>

                <div className="mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      disabled={!fileId || uploading || asking}
                      onClick={() => void askPdf(suggestion)}
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-left text-xs font-medium text-slate-300 transition hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-600/15 text-violet-300">
                      <Bot className="h-4 w-4" />
                    </span>
                  ) : null}

                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[78%] ${
                      message.role === "user"
                        ? "bg-violet-600 text-white"
                        : "border border-white/10 bg-slate-950 text-slate-300"
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words">
                      {message.text}
                    </div>
                  </div>

                  {message.role === "user" ? (
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-slate-400">
                      <User className="h-4 w-4" />
                    </span>
                  ) : null}
                </div>
              ))
            )}

            {asking ? (
              <div className="flex gap-3">
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-600/15 text-violet-300">
                  <Bot className="h-4 w-4" />
                </span>
                <div className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Searching the document…
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-white/10 bg-black/10 p-4 sm:p-5">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void askPdf();
              }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <MessageCircle className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600" />
                <textarea
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  disabled={!fileId || uploading || asking}
                  rows={2}
                  maxLength={4000}
                  placeholder="Ask anything about this document…"
                  className="min-h-[58px] w-full resize-none rounded-2xl border border-white/10 bg-slate-950 py-4 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              <button
                type="submit"
                disabled={!fileId || !question.trim() || uploading || asking}
                className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
              >
                <Send className="h-4 w-4" />
                Ask
              </button>
            </form>
            <p className="mt-2 text-center text-[11px] text-slate-600">
              AI answers can be imperfect. Verify important information against
              the original document.
            </p>
          </div>
        </div>
      )}

      {error ? (
        <div className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-200">
          {error}
        </div>
      ) : null}

      <p className="text-center text-xs leading-5 text-slate-600">
        Chat with PDF uses an AI service to process the document. Do not upload
        confidential files unless you are comfortable sending them to the
        configured AI provider.
      </p>
    </div>
  );
}

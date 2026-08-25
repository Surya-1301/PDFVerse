import { useState } from "react";
import { Bot, MessageCircle, Sparkles, X, FileText } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function openPdfChat() {
    setOpen(false);
    navigate({ to: "/pdf/$slug", params: { slug: "chat-with-pdf" } });
  }

  return (
    <>
      {open ? (
        <div className="fixed bottom-24 right-4 z-50 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/50 backdrop-blur-xl sm:right-6">
          <div className="flex items-center justify-between border-b border-white/10 bg-violet-600/10 px-4 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-950/30">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">PDFVerse AI</p>
                <p className="text-xs text-emerald-400">Online</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close PDFVerse AI chat"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4 p-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-300">
              <div className="mb-2 flex items-center gap-2 text-violet-300">
                <Sparkles className="h-4 w-4" />
                <span className="font-semibold">Hi! I’m PDFVerse AI.</span>
              </div>
              Upload a PDF and I can help you summarize it, find information,
              extract important details, and answer questions from the document.
            </div>

            <button
              type="button"
              onClick={openPdfChat}
              className="flex w-full items-center gap-3 rounded-2xl bg-violet-600 px-4 py-3.5 text-left text-sm font-semibold text-white shadow-lg shadow-violet-950/25 transition hover:-translate-y-0.5 hover:bg-violet-500"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                <FileText className="h-4 w-4" />
              </span>
              <span className="flex-1">
                <span className="block">Chat with a PDF</span>
                <span className="mt-0.5 block text-xs font-normal text-violet-100/80">
                  Ask questions about any PDF
                </span>
              </span>
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close PDFVerse AI chat" : "Open PDFVerse AI chat"}
        aria-expanded={open}
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-2xl shadow-violet-950/40 ring-1 ring-violet-300/20 transition hover:-translate-y-0.5 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-300/60 sm:bottom-6 sm:right-6"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
        <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
      </button>
    </>
  );
}

"use client";

import { useRef, useState } from "react";
import { FilePlus2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

import { storePdfForEditor } from "../lib/pdfEditorLaunch";

export function PdfEditorLauncher() {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  function openFilePicker() {
    if (loading) return;

    fileInputRef.current?.click();
  }

  async function handlePdfSelected(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    // Allow selecting the same PDF again.
    event.target.value = "";

    if (!file) return;

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      window.alert("Please choose a PDF file.");
      return;
    }

    try {
      setLoading(true);

      await storePdfForEditor(file);

      router.push("/pdf-editor");
    } catch (error) {
      console.error("Could not open PDF:", error);

      window.alert(
        "Could not open this PDF. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  function startBlankDocument() {
    if (loading) return;

    router.push("/pdf-editor?blank=1");
  }

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={openFilePicker}
        disabled={loading}
        className="
          flex
          h-[112px]
          w-[665px]
          max-w-[calc(100vw-48px)]
          items-center
          justify-center
          gap-7
          rounded-[28px]
          bg-gradient-to-r
          from-violet-600
          via-purple-600
          to-violet-600
          px-8
          text-white
          shadow-[0_20px_55px_rgba(124,58,237,0.28)]
          transition-all
          duration-200
          hover:scale-[1.01]
          hover:shadow-[0_24px_65px_rgba(124,58,237,0.36)]
          active:scale-[0.99]
          disabled:cursor-wait
          disabled:opacity-70
        "
      >
        <span
          className="
            flex
            h-[64px]
            w-[64px]
            shrink-0
            items-center
            justify-center
            rounded-[20px]
            bg-white/15
            ring-1
            ring-white/10
          "
        >
          <Upload
            className="h-9 w-9"
            strokeWidth={2}
          />
        </span>

        <span className="text-[30px] font-bold tracking-tight sm:text-[36px]">
          {loading ? "Opening PDF..." : "Upload PDF file"}
        </span>
      </button>

      <button
        type="button"
        onClick={startBlankDocument}
        disabled={loading}
        className="
          mt-8
          flex
          items-center
          gap-3
          text-[22px]
          font-medium
          text-violet-300
          transition-colors
          hover:text-white
          disabled:pointer-events-none
          disabled:opacity-50
          sm:text-[26px]
        "
      >
        <FilePlus2
          className="h-7 w-7"
          strokeWidth={1.8}
        />

        <span>
          or start with a blank document
        </span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={handlePdfSelected}
      />
    </div>
  );
}
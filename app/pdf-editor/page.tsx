"use client";

import dynamic from "next/dynamic";

// Edit-text hover + blank-doc + takePdf flow live inside the editor component.
import { takePdfForEditor, clearPdfForEditor, createBlankPdfFile } from "@/lib/pdfEditorLaunch";

const PdfEditor = dynamic(() => import("@/components/editor/PdfEditor"), {
  ssr: false,
});

export default function PdfEditorPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0d]">
      <PdfEditor />
    </main>
  );
}

"use client";

import dynamic from "next/dynamic";

// The editor itself handles takePdfForEditor(), the blank-document flow
// and the edit-text hover outlines, so this page only mounts it client-side.
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

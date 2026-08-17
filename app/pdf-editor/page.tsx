"use client";

import dynamic from "next/dynamic";

export type Mode =
  | "edit"
  | "edit-text"
  | "merge"
  | "split"
  | "rotate"
  | "delete"
  | "compress"
  | "protect"
  | "unlock"
  | "organize"
  | "sign"
  | "watermark"
  | "images"
  | "blank";

const PdfEditor = dynamic(() => import("@/components/editor/PdfEditor"), {
  ssr: false,
});

export function PdfEditorPageContent({ mode }: { mode?: Mode }) {
  return (
    <main className="min-h-screen bg-[#0b0b0d]">
      <PdfEditor />
    </main>
  );
}

export default function PdfEditorPage() {
  return <PdfEditorPageContent />;
}

import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Contact | PDF Verse",
  description: "Contact PDF Verse for support, feedback, or questions.",
};

export default function ContactPage() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-semibold text-violet-300 transition hover:text-violet-200"
        >
          ← Back to PDF tools
        </Link>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white">
            <Mail className="h-6 w-6" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white">
            Contact
          </h1>

          <p className="mt-4 text-base leading-8 text-slate-300">
            Have a question, suggestion, bug report, or support request? Send us
            a message and we’ll review it.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
            <p className="text-sm font-semibold text-slate-300">Email</p>
            <a
              href="mailto:support.toolversee@gmail.com"
              className="mt-2 inline-flex text-lg font-semibold text-violet-300 transition hover:text-violet-200"
            >
              support.toolversee@gmail.com
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
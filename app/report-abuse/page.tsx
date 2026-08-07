import type { Metadata } from "next";
import Link from "next/link";
import { Flag } from "lucide-react";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Report Abuse | PDF Verse",
  description: "Report abuse, misuse, or harmful content related to PDF Verse.",
};

export default function ReportAbusePage() {
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
            <Flag className="h-6 w-6" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white">
            Report Abuse
          </h1>

          <p className="mt-4 text-base leading-8 text-slate-300">
            If you believe PDF Verse is being used for harmful, illegal,
            abusive, or infringing activity, please report it to us.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
            <p className="text-sm font-semibold text-slate-300">
              Abuse contact
            </p>
            <a
              href="mailto:support.toolversee@gmail.com"
              className="mt-2 inline-flex text-lg font-semibold text-violet-300 transition hover:text-violet-200"
            >
              support.toolversee@gmail.com
            </a>
          </div>

          <div className="mt-8 space-y-4 text-sm leading-6 text-slate-400">
            <p>Please include as much detail as possible, such as:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>The URL or page involved</li>
              <li>A short description of the issue</li>
              <li>Any screenshots or supporting context</li>
              <li>Your contact information if you want a follow-up</li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
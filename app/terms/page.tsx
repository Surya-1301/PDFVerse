import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Terms of Use | PDF Verse",
  description: "Read the terms of use for PDF Verse online PDF tools.",
};

export default function TermsPage() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-semibold text-violet-300 transition hover:text-violet-200"
        >
          ← Back to PDF tools
        </Link>

        <h1 className="text-4xl font-bold tracking-tight text-white">
          Terms of Use
        </h1>

        <p className="mt-4 text-sm text-slate-500">
          Last updated: August 2026
        </p>

        <div className="mt-8 space-y-8 text-base leading-8 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white">
              Acceptance of terms
            </h2>
            <p className="mt-3">
              By using PDF Verse, you agree to these terms. If you do not agree,
              please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Use of the service
            </h2>
            <p className="mt-3">
              PDF Verse provides online PDF tools for personal, educational, and
              business use. You are responsible for ensuring that you have the
              rights to upload and process any files you use with the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Prohibited use
            </h2>
            <p className="mt-3">
              You may not use PDF Verse to process illegal, harmful, abusive,
              infringing, or malicious content. You may not attempt to disrupt,
              reverse engineer, overload, or misuse the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              File processing
            </h2>
            <p className="mt-3">
              Some tools run in your browser, while others may require
              server-side processing. You are responsible for keeping backup
              copies of your files before using any tool.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              No warranty
            </h2>
            <p className="mt-3">
              PDF Verse is provided “as is” without warranties of any kind. We
              do not guarantee that every file can be processed, repaired,
              compressed, converted, or recovered.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Limitation of liability
            </h2>
            <p className="mt-3">
              To the fullest extent permitted by law, PDF Verse is not liable
              for data loss, file corruption, business interruption, or other
              damages resulting from use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <p className="mt-3">
              For questions about these terms, please use the{" "}
              <Link
                href="/contact"
                className="font-semibold text-violet-300 hover:text-violet-200"
              >
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Privacy Policy | PDF Verse",
  description:
    "Read the PDF Verse privacy policy and learn how your files and data are handled.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>

        <p className="mt-4 text-sm text-slate-500">
          Last updated: August 2026
        </p>

        <div className="mt-8 space-y-8 text-base leading-8 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white">
              Your privacy matters
            </h2>
            <p className="mt-3">
              PDF Verse is designed to provide simple online PDF tools while
              respecting your privacy. We aim to collect as little personal data
              as possible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Uploaded files
            </h2>
            <p className="mt-3">
              Some PDF tools process files directly in your browser. Other tools
              may send files to our PDF processing backend when server-side
              processing is required. Files are used only to complete the
              requested operation.
            </p>
            <p className="mt-3">
              Temporary files are not intended to be stored permanently and may
              be deleted automatically after processing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Information we collect
            </h2>
            <p className="mt-3">
              We may collect basic technical information such as browser type,
              device information, pages visited, and error logs to improve
              reliability and performance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Cookies</h2>
            <p className="mt-3">
              PDF Verse may use basic cookies or local storage for preferences,
              functionality, analytics, or security. You can control cookies
              through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Third-party services
            </h2>
            <p className="mt-3">
              We may use hosting, analytics, storage, and infrastructure
              providers to operate the service. These providers may process
              limited technical data according to their own policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <p className="mt-3">
              If you have privacy questions, please contact us through the{" "}
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
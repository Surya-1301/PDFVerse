import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Lock,
  Scale,
  ShieldCheck,
  UserCheck,
  Ban,
  Download,
} from "lucide-react";


function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}

      <section className="border-b border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to PDFVerse
          </Link>

          <div className="mt-10 flex flex-col items-center text-center">
            {/* Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 shadow-xl shadow-red-500/20">
              <Scale className="h-8 w-8 text-white" />
            </div>

            {/* Label */}
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-red-400">
              PDFVerse Legal
            </p>

            {/* Heading */}
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Terms of Use
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              These Terms explain the rules for using PDFVerse, including our
              PDF tools, document processing features, uploaded files, and
              related services.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CENTERED TERMS CARD                                              */}
      {/* ================================================================ */}

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <article className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-12">
            {/* ========================================================== */}
            {/* QUICK SUMMARY                                               */}
            {/* ========================================================== */}

            <section className="rounded-2xl border border-red-400/10 bg-gradient-to-br from-red-500/[0.07] to-orange-500/[0.03] p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <FileText className="mt-1 h-6 w-6 shrink-0 text-red-400" />

                <div>
                  <h2 className="text-xl font-bold text-white">
                    Please read these Terms
                  </h2>

                  <p className="mt-3 text-left text-sm leading-7 text-slate-300">
                    By accessing or using PDFVerse, you agree to use the
                    service lawfully, responsibly, and in accordance with
                    these Terms. If you do not agree with these Terms, please
                    do not use PDFVerse.
                  </p>
                </div>
              </div>
            </section>

            {/* ========================================================== */}
            {/* 01 ACCEPTANCE                                               */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading number="01" title="Acceptance of Terms" />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                These Terms of Use govern your access to and use of the
                PDFVerse website, PDF editing tools, conversion tools,
                compression features, document utilities, and related
                services.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                By using PDFVerse, you confirm that you have read, understood,
                and agree to be bound by these Terms and our{" "}
                <Link
                  to="/privacy"
                  className="font-semibold text-red-400 transition hover:text-red-300"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            {/* ========================================================== */}
            {/* 02 ELIGIBILITY                                              */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading number="02" title="Eligibility" />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                You may use PDFVerse only if you are legally capable of
                entering into an agreement under applicable law.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                If you are using PDFVerse on behalf of an organization,
                company, educational institution, or other entity, you
                represent that you have authority to accept these Terms on
                its behalf.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 03 SERVICE DESCRIPTION                                      */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading number="03" title="Our Services" />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                PDFVerse provides browser-based and server-assisted tools for
                working with PDF documents and related files.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <FeatureCard
                  icon={<FileText className="h-5 w-5" />}
                  title="PDF Processing"
                  description="Tools for editing, converting, merging, splitting, compressing, organizing, and processing PDF documents."
                />

                <FeatureCard
                  icon={<Download className="h-5 w-5" />}
                  title="File Processing"
                  description="Features may allow supported files to be uploaded, processed, generated, downloaded, or otherwise handled."
                />

                <FeatureCard
                  icon={<ShieldCheck className="h-5 w-5" />}
                  title="Security"
                  description="Reasonable technical and organizational measures are used to help protect the service and information processed through it."
                />

                <FeatureCard
                  icon={<UserCheck className="h-5 w-5" />}
                  title="User-Controlled Actions"
                  description="You are responsible for selecting files, tools, settings, and actions appropriate for your intended use."
                />
              </div>
            </section>

            {/* ========================================================== */}
            {/* 04 ACCEPTABLE USE                                          */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading number="04" title="Acceptable Use" />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                You agree to use PDFVerse only for lawful purposes and in a
                manner that does not harm the service, other users, or third
                parties.
              </p>

              <p className="mt-5 text-left text-sm font-semibold text-white">
                You must not use PDFVerse to:
              </p>

              <ul className="mt-5 space-y-3">
                {[
                  "violate any applicable law, regulation, court order, or legal obligation;",
                  "upload, process, distribute, or facilitate unlawful content;",
                  "infringe copyrights, trademarks, patents, privacy rights, or other third-party rights;",
                  "upload malware, ransomware, viruses, spyware, or other malicious code;",
                  "attempt to gain unauthorized access to PDFVerse systems or another user's information;",
                  "interfere with, overload, disrupt, or compromise the operation of the service;",
                  "attempt to bypass security, rate limits, authentication, or other technical controls;",
                  "use automated systems in a manner that places unreasonable load on our infrastructure;",
                  "use the service for fraud, impersonation, phishing, scams, or other deceptive activities;",
                  "reverse engineer or attempt to extract source code from portions of the service where prohibited by applicable law;",
                  "use PDFVerse to process documents when doing so would violate a confidentiality, employment, contractual, or other legal obligation.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-left text-sm leading-7 text-slate-300"
                  >
                    <Ban className="mt-1 h-4 w-4 shrink-0 text-red-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* ========================================================== */}
            {/* 05 UPLOADED FILES                                          */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="05"
                title="Uploaded Files and Documents"
              />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                You retain responsibility for documents and files that you
                upload to PDFVerse.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                By uploading a file, you represent that you have the necessary
                rights, permissions, licenses, or other lawful authority to
                upload and process that file using PDFVerse.
              </p>

              <div className="mt-6 rounded-2xl border border-emerald-400/15 bg-emerald-500/[0.05] p-6">
                <div className="flex items-start gap-4">
                  <Lock className="mt-1 h-6 w-6 shrink-0 text-emerald-400" />

                  <div>
                    <h3 className="font-semibold text-white">
                      Do not upload documents you are not authorized to process.
                    </h3>

                    <p className="mt-3 text-left text-sm leading-7 text-slate-300">
                      You are responsible for determining whether a document
                      can lawfully and safely be uploaded to PDFVerse.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                You should take appropriate precautions before uploading
                confidential, sensitive, regulated, or highly valuable
                documents.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 06 FILE PROCESSING                                         */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="06"
                title="File Processing and Availability"
              />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                PDFVerse may process files locally in your browser or through
                server-side infrastructure depending on the particular tool
                and technical implementation.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                We do not guarantee that every file, PDF format, feature,
                conversion, or processing operation will always work
                correctly or produce an output suitable for every purpose.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                You should verify important documents and generated outputs
                before relying on them for legal, financial, educational,
                professional, regulatory, or other important purposes.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 07 USER RESPONSIBILITY                                     */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading number="07" title="Your Responsibilities" />

              <ul className="mt-6 space-y-4">
                {[
                  "Maintain the security of your device, browser, accounts, and files.",
                  "Review processed documents before sharing, submitting, publishing, or relying upon them.",
                  "Maintain your own backup copies of important documents.",
                  "Ensure that your use of PDFVerse complies with applicable laws and third-party rights.",
                  "Do not rely solely on PDFVerse for preservation of important or irreplaceable documents.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-left text-sm leading-7 text-slate-300"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* ========================================================== */}
            {/* 08 INTELLECTUAL PROPERTY                                   */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="08"
                title="Intellectual Property"
              />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                The PDFVerse website, software, interface, branding, logos,
                graphics, design elements, text, and other original materials
                provided by PDFVerse are owned by or licensed to PDFVerse
                unless otherwise stated.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                These Terms do not transfer ownership of PDFVerse's
                intellectual property to you.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                You retain ownership of your own documents and content, subject
                to any rights held by third parties.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 09 USER CONTENT                                             */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading number="09" title="User Content" />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                PDFVerse does not claim ownership of documents that you upload
                solely for the purpose of using our tools.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                You grant PDFVerse only the limited technical permission
                necessary to host, transmit, process, convert, display, or
                otherwise handle your content to provide the requested
                service.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                This limited permission does not give PDFVerse ownership of
                your documents.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 10 PRIVACY                                                  */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading number="10" title="Privacy" />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                Our collection and processing of personal data is described in
                our{" "}
                <Link
                  to="/privacy"
                  className="font-semibold text-red-400 transition hover:text-red-300"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                Where applicable, PDFVerse intends to operate in accordance
                with relevant Indian data protection requirements, including
                the Digital Personal Data Protection Act, 2023 and applicable
                rules and commencement notifications.
              </p>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-left text-xs leading-6 text-slate-500">
                  The DPDP Act was enacted on August 11, 2023. The Government
                  notified the Digital Personal Data Protection Rules, 2025 on
                  November 14, 2025. The commencement notification provides
                  different commencement dates for different provisions.
                  References in these Terms are therefore subject to the
                  provisions and obligations that are applicable at the
                  relevant time.
                </p>
              </div>
            </section>

            {/* ========================================================== */}
            {/* 11 SECURITY                                                 */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading number="11" title="Security" />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                We use reasonable technical and organizational safeguards
                intended to protect the service and information processed
                through it.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                However, no website, software, network, or electronic
                transmission can be guaranteed to be completely secure.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                You acknowledge that you use the service at your own risk and
                should maintain appropriate backups and security controls.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 12 THIRD PARTY SERVICES                                    */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="12"
                title="Third-Party Services and Links"
              />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                PDFVerse may use third-party infrastructure, APIs, hosting
                providers, analytics services, security services, or other
                technology providers to operate or improve the service.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                Third-party services may have their own terms and privacy
                policies. PDFVerse is not responsible for the independent
                practices of third-party services.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 13 AVAILABILITY                                             */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="13"
                title="Service Availability"
              />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                We aim to keep PDFVerse available and reliable, but we do not
                guarantee uninterrupted, error-free, or continuous access.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                The service may be temporarily unavailable because of
                maintenance, upgrades, security incidents, infrastructure
                failures, network issues, third-party service failures, or
                circumstances beyond our reasonable control.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 14 MODIFICATIONS                                            */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="14"
                title="Changes to the Service"
              />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                PDFVerse may add, modify, suspend, or discontinue features,
                tools, integrations, or parts of the service from time to
                time.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                We may also introduce new limits, technical requirements, or
                eligibility conditions where reasonably necessary to operate
                and secure the service.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 15 SUSPENSION                                               */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="15"
                title="Suspension or Termination"
              />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                We may restrict, suspend, or terminate access to PDFVerse where
                reasonably necessary to protect the service, users, third
                parties, or our legal rights.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                This may include situations involving suspected abuse,
                malicious activity, unlawful use, security threats, excessive
                automated traffic, or material violation of these Terms.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                Where appropriate and legally permitted, we may provide notice
                before taking such action.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 16 DISCLAIMERS                                              */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading number="16" title="Disclaimers" />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                PDFVerse is provided on an &quot;as available&quot; and
                &quot;as is&quot; basis to the extent permitted by applicable
                law.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                We do not guarantee that the service will always be accurate,
                uninterrupted, secure, complete, or suitable for a particular
                purpose.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                PDFVerse does not provide legal, financial, tax, medical,
                regulatory, or professional advice through its tools.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                You are responsible for independently verifying important
                information and documents before relying upon them.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 17 LIMITATION OF LIABILITY                                  */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="17"
                title="Limitation of Liability"
              />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                To the maximum extent permitted by applicable law, PDFVerse
                will not be responsible for indirect, incidental, special,
                consequential, exemplary, or similar damages arising from or
                related to your use of the service.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                Nothing in these Terms is intended to exclude or limit
                liability that cannot lawfully be excluded or limited under
                applicable law.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 18 INDEMNIFICATION                                          */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading number="18" title="Indemnification" />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                To the extent permitted by applicable law, you agree to
                reasonably indemnify and hold harmless PDFVerse and its
                operators, service providers, and affiliates from claims,
                losses, liabilities, and expenses arising from your unlawful
                use of the service, violation of these Terms, or infringement
                of third-party rights.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 19 ABUSE REPORTING                                          */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading number="19" title="Reporting Abuse" />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                If you believe PDFVerse is being used for unlawful activity,
                fraud, malicious files, security abuse, copyright infringement,
                or other serious misuse, please report the matter through our
                support or abuse reporting channel.
              </p>

              <Link
                to="/report-abuse"
                className="mt-5 inline-flex items-center rounded-xl border border-red-400/20 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/15"
              >
                Report Abuse
              </Link>
            </section>

            {/* ========================================================== */}
            {/* 20 GOVERNING LAW                                            */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="20"
                title="Governing Law and Jurisdiction"
              />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                These Terms shall be governed by the laws applicable in India,
                except to the extent that applicable law requires otherwise.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                Subject to mandatory legal requirements, disputes relating to
                these Terms or your use of PDFVerse shall be subject to the
                jurisdiction of the competent courts applicable to PDFVerse's
                operating location.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 21 SEVERABILITY                                             */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading number="21" title="Severability" />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                If any provision of these Terms is determined to be invalid,
                unlawful, or unenforceable, the remaining provisions will
                continue to the extent permitted by applicable law.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 22 ENTIRE AGREEMENT                                         */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading number="22" title="Entire Agreement" />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                These Terms, together with the Privacy Policy and any
                additional terms specifically applicable to particular
                features, form the agreement governing your use of PDFVerse,
                subject to applicable law.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 23 CONTACT                                                  */}
            {/* ========================================================== */}

            <section className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <FileText className="mt-1 h-6 w-6 shrink-0 text-red-400" />

                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Questions About These Terms?
                  </h2>

                  <p className="mt-3 text-left text-sm leading-7 text-slate-300">
                    If you have questions about these Terms, PDFVerse
                    services, or your responsibilities as a user, please
                    contact us.
                  </p>

                  <Link
                    to="/contact"
                    className="mt-5 inline-flex items-center rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5"
                  >
                    Contact PDFVerse
                  </Link>
                </div>
              </div>
            </section>

            {/* ========================================================== */}
            {/* LEGAL DISCLAIMER                                            */}
            {/* ========================================================== */}

            <div className="mt-8 rounded-2xl border border-amber-400/10 bg-amber-500/[0.04] p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />

                <p className="text-left text-xs leading-6 text-slate-500">
                  These Terms are a general website terms template and are not
                  a substitute for advice from a qualified lawyer. Before
                  publishing PDFVerse commercially, review these Terms against
                  your actual business structure, processing architecture,
                  payment model, hosting providers, jurisdiction, and
                  applicable laws.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

/* ========================================================================== */
/* SECTION HEADING                                                            */
/* ========================================================================== */

function SectionHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-1 shrink-0 text-xs font-bold tracking-[0.2em] text-red-400">
        {number}
      </span>

      <h2 className="text-2xl font-bold tracking-tight text-white">
        {title}
      </h2>
    </div>
  );
}

/* ========================================================================== */
/* FEATURE CARD                                                               */
/* ========================================================================== */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-red-400/20 hover:bg-white/[0.05]">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}
export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — PDFVerse" },
      { name: "description", content: "PDFVerse Terms of Use: acceptable use, PDF processing, uploaded files, intellectual property and limitations." },
      { property: "og:title", content: "Terms of Use — PDFVerse" },
      { property: "og:description", content: "PDFVerse Terms of Use: acceptable use, PDF processing, uploaded files, intellectual property and limitations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

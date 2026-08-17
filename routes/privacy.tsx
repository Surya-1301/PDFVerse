import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Lock,
  ShieldCheck,
  Database,
  UserCheck,
  Trash2,
  AlertTriangle,
} from "lucide-react";


function PrivacyPage() {
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
            {/* Privacy Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 shadow-xl shadow-red-500/20">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>

            {/* Small Label */}
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-red-400">
              PDFVerse Legal
            </p>

            {/* Main Heading */}
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Privacy Policy
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Learn how PDFVerse collects, uses, protects, retains, and
              processes information when you use our website and PDF tools.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CENTERED PRIVACY POLICY CARD                                     */}
      {/* ================================================================ */}

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <article className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-12">
            {/* ========================================================== */}
            {/* PRIVACY AT A GLANCE                                        */}
            {/* ========================================================== */}

            <section className="rounded-2xl border border-red-400/10 bg-gradient-to-br from-red-500/[0.07] to-orange-500/[0.03] p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <Lock className="mt-1 h-6 w-6 shrink-0 text-red-400" />

                <div>
                  <h2 className="text-xl font-bold text-white">
                    Privacy at a glance
                  </h2>

                  <p className="mt-3 text-left text-sm leading-7 text-slate-300">
                    PDFVerse is designed to provide PDF utilities while
                    minimizing unnecessary collection of personal information.
                    Files uploaded for processing are used to perform the
                    operation requested by you and are not intended to be used
                    for advertising or sold as document content.
                  </p>
                </div>
              </div>
            </section>

            {/* ========================================================== */}
            {/* 01 WHO WE ARE                                               */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading number="01" title="Who We Are" />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                PDFVerse is an online platform providing PDF editing,
                conversion, compression, organization, and related document
                utilities.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                For privacy-related questions, requests, or complaints, you
                can contact us using the details provided on our{" "}
                <Link
                  to="/contact"
                  className="font-semibold text-red-400 transition hover:text-red-300"
                >
                  Contact page
                </Link>
                .
              </p>
            </section>

            {/* ========================================================== */}
            {/* 02 SCOPE                                                    */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading number="02" title="Scope of This Policy" />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                This Privacy Policy applies to information processed through
                the PDFVerse website, PDF tools, support communications, and
                related services operated by PDFVerse.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                This Policy should be read together with our Terms of Use and
                any specific privacy notices presented when a particular
                feature collects or processes information.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 03 INFORMATION WE PROCESS                                  */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="03"
                title="Information We May Process"
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InfoCard
                  icon={<UserCheck className="h-5 w-5" />}
                  title="Information You Provide"
                  description="Information you voluntarily provide when contacting support or submitting a privacy, legal, or abuse request."
                />

                <InfoCard
                  icon={<Database className="h-5 w-5" />}
                  title="Technical Information"
                  description="Browser, device, operating system, approximate location, IP address, and technical logs may be processed for security and service operation."
                />

                <InfoCard
                  icon={<FileText className="h-5 w-5" />}
                  title="Uploaded Documents"
                  description="Documents and files that you voluntarily upload for a requested PDF operation."
                />

                <InfoCard
                  icon={<ShieldCheck className="h-5 w-5" />}
                  title="Usage Information"
                  description="General information about interactions with our website may be processed to improve reliability, performance, and security."
                />
              </div>
            </section>

            {/* ========================================================== */}
            {/* 04 UPLOADED FILES                                          */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="04"
                title="Uploaded Files and PDF Processing"
              />

              <div className="mt-6 rounded-2xl border border-emerald-400/15 bg-emerald-500/[0.05] p-6">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-emerald-400" />

                  <div>
                    <h3 className="font-semibold text-white">
                      Your documents are processed to provide the service.
                    </h3>

                    <p className="mt-3 text-left text-sm leading-7 text-slate-300">
                      PDFVerse does not intentionally use the contents of
                      uploaded documents for advertising, profiling, or sale to
                      third parties.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                Depending on the tool, a file may be processed locally in your
                browser or transmitted to processing infrastructure required
                to complete the requested operation.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                Where temporary server-side processing is required, files
                should be retained only for the period reasonably necessary to
                complete the requested operation, maintain security, or comply
                with applicable law.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                You should not upload documents containing highly sensitive
                personal information unless you are satisfied that the service
                is appropriate for that purpose.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 05 PURPOSE AND LEGAL BASIS                                  */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="05"
                title="Purpose and Legal Basis for Processing"
              />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                We may process information where necessary to provide a service
                requested by you, comply with applicable law, maintain
                security, respond to communications, prevent misuse, or for
                other purposes permitted under applicable law.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                Where the Digital Personal Data Protection Act, 2023
                (&quot;DPDP Act&quot;) applies, PDFVerse intends to process
                digital personal data in accordance with applicable
                requirements, including applicable obligations relating to
                notice, consent where required, security safeguards, personal
                data breaches, retention, and Data Principal rights.
              </p>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-left text-xs leading-6 text-slate-500">
                  The Digital Personal Data Protection Act, 2023 was enacted
                  on August 11, 2023. The Digital Personal Data Protection
                  Rules, 2025 were notified on November 14, 2025. Certain
                  provisions have phased commencement, and this Policy is
                  intended to apply according to the provisions that are
                  applicable from time to time.
                </p>
              </div>
            </section>

            {/* ========================================================== */}
            {/* 06 DATA PROTECTION PRINCIPLES                               */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="06"
                title="Our Data Protection Principles"
              />

              <ul className="mt-6 space-y-4">
                {[
                  "Purpose limitation — information should be processed for legitimate and specified purposes.",
                  "Data minimization — we seek to avoid collecting information that is unnecessary for the service.",
                  "Transparency — we aim to explain relevant processing in clear language.",
                  "Security — reasonable technical and organizational safeguards are used to protect information.",
                  "Retention limitation — information should not be retained longer than reasonably necessary, subject to legal and operational requirements.",
                  "User rights — applicable data protection rights will be supported in accordance with applicable law.",
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
            {/* 07 USER RIGHTS                                             */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="07"
                title="Your Rights Under Applicable Data Protection Law"
              />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                Subject to applicable law, individuals may have rights relating
                to their personal data. Depending on the applicable legal
                framework and circumstances, these may include rights to:
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "obtain information about processing of personal data;",
                  "request correction of inaccurate or incomplete personal data;",
                  "request deletion or erasure where legally applicable;",
                  "withdraw consent where processing is based on consent;",
                  "raise a grievance regarding processing;",
                  "exercise other rights available under applicable data protection law.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-left text-sm leading-7 text-slate-300"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-red-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                Requests may be subject to identity verification and other
                requirements permitted by law.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 08 DATA RETENTION                                          */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="08"
                title="Data Retention and Deletion"
              />

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-start gap-4">
                  <Trash2 className="mt-1 h-6 w-6 shrink-0 text-red-400" />

                  <div>
                    <h3 className="font-semibold text-white">
                      Retention is purpose-based.
                    </h3>

                    <p className="mt-3 text-left text-sm leading-7 text-slate-300">
                      We seek to retain personal data only for as long as
                      reasonably necessary for the purpose for which it was
                      collected, to provide services, resolve disputes,
                      maintain security, comply with legal obligations, or
                      enforce our terms.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                Temporary uploaded files may be automatically deleted after
                processing where the technical architecture supports such
                deletion.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 09 SECURITY                                                 */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="09"
                title="Security and Personal Data Breaches"
              />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                PDFVerse uses reasonable security measures appropriate to the
                nature of the information processed. These measures may
                include access controls, secure transmission, infrastructure
                security, monitoring, and other technical or organizational
                safeguards.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                If a personal data breach occurs, PDFVerse will take
                appropriate steps required under applicable law, including
                applicable requirements concerning notification to affected
                individuals and relevant authorities.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 10 CHILDREN                                                */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="10"
                title="Children's Personal Data"
              />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                PDFVerse does not intentionally seek to collect personal data
                from children in violation of applicable law. Where legal
                requirements relating to children apply, we will follow the
                applicable requirements concerning consent, processing, and
                safeguards.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 11 COOKIES                                                  */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="11"
                title="Cookies, Analytics and Similar Technologies"
              />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                PDFVerse may use cookies, local storage, analytics tools, and
                similar technologies for essential functionality, security,
                performance measurement, and service improvement.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                Where required by applicable law, relevant consent or choice
                mechanisms will be provided.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 12 THIRD PARTY PROVIDERS                                   */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="12"
                title="Third-Party Service Providers"
              />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                PDFVerse may use third-party providers for hosting, cloud
                infrastructure, analytics, security, email delivery, payment
                processing, file processing, or other technical services.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                Where a provider processes personal data on our behalf, we
                seek to use appropriate contractual, technical, and
                organizational safeguards consistent with applicable law.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 13 INTERNATIONAL TRANSFERS                                 */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="13"
                title="International Data Transfers"
              />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                Some infrastructure or service providers may process
                information outside your state or country. Where applicable,
                PDFVerse will take steps required by applicable law regarding
                transfers, access, and processing of personal data.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 14 GRIEVANCES                                               */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="14"
                title="Data Principal Requests and Grievances"
              />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                If you believe your personal data has been processed in a way
                that violates applicable law or this Policy, you may contact
                PDFVerse through our{" "}
                <Link
                  to="/contact"
                  className="font-semibold text-red-400 transition hover:text-red-300"
                >
                  Contact page
                </Link>
                .
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                We will review and respond to privacy requests and grievances
                within the periods and through the processes required by
                applicable law.
              </p>
            </section>

            {/* ========================================================== */}
            {/* 15 CHANGES                                                  */}
            {/* ========================================================== */}

            <section className="mt-12">
              <SectionHeading
                number="15"
                title="Changes to This Privacy Policy"
              />

              <p className="mt-5 text-left text-sm leading-7 text-slate-300">
                We may update this Policy from time to time to reflect changes
                in our services, technology, legal requirements, or privacy
                practices.
              </p>

              <p className="mt-4 text-left text-sm leading-7 text-slate-300">
                When we make material changes, we will update the effective
                date and may provide additional notice where required.
              </p>
            </section>

            {/* ========================================================== */}
            {/* PRIVACY CONTACT                                             */}
            {/* ========================================================== */}

            <section className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <FileText className="mt-1 h-6 w-6 shrink-0 text-red-400" />

                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Privacy Contact
                  </h2>

                  <p className="mt-3 text-left text-sm leading-7 text-slate-300">
                    For privacy questions, data requests, or grievances,
                    please contact the PDFVerse privacy/support team.
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
                  This Privacy Policy is intended to describe PDFVerse's
                  privacy practices in clear language. It does not constitute
                  legal advice. The applicability and commencement of specific
                  provisions of the Digital Personal Data Protection Act, 2023
                  and the Digital Personal Data Protection Rules, 2025 depend
                  on applicable law and their notified commencement dates.
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
/* INFORMATION CARD                                                           */
/* ========================================================================== */

function InfoCard({
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
export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — PDFVerse" },
      { name: "description", content: "How PDFVerse handles personal data, uploaded files, security and your rights under applicable data protection law." },
      { property: "og:title", content: "Privacy Policy — PDFVerse" },
      { property: "og:description", content: "How PDFVerse handles personal data, uploaded files, security and your rights under applicable data protection law." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

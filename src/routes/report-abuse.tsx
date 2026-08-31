import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Ban,
  CheckCircle2,
  FileWarning,
  Flag,
  Gavel,
  Lock,
  Mail,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { useEffect, useState, type ReactNode, type FormEvent } from "react";

/* ==========================================================================
   PDFVERSE ABUSE REPORT EMAIL

   Replace this with the Gmail address where you want to receive reports.
   ========================================================================== */

const ABUSE_EMAIL = "abuse.pdfverse@gmail.com";

/* ==========================================================================
   FORM TYPE
   ========================================================================== */

type FormData = {
  name: string;
  email: string;
  category: string;
  url: string;
  subject: string;
  description: string;
  evidence: string;
  report_confirmation: boolean;
  privacy_acknowledged: boolean;
};

/* ==========================================================================
   PAGE
   ========================================================================== */

function ReportAbusePage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    category: "",
    url: "",
    subject: "",
    description: "",
    evidence: "",
    report_confirmation: false,
    privacy_acknowledged: false,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /* ------------------------------------------------------------------------
     PAGE TITLE
     ------------------------------------------------------------------------ */

  useEffect(() => {
    document.title = "Report Abuse | PDFVerse";
  }, []);

  /* ------------------------------------------------------------------------
     UPDATE FORM
     ------------------------------------------------------------------------ */

  function updateField(
    field: keyof FormData,
    value: string | boolean
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  }

  /* ------------------------------------------------------------------------
     SUBMIT REPORT

     No API route.
     No Resend.
     No server-side email service.

     The user's configured email application opens with the report
     already prepared.
     ------------------------------------------------------------------------ */

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    /* ----------------------------------------------------------------------
       BASIC VALIDATION
       ---------------------------------------------------------------------- */

    if (!form.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!form.email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!form.category) {
      setErrorMessage("Please select a report type.");
      return;
    }

    if (!form.url.trim()) {
      setErrorMessage("Please provide the relevant URL or link.");
      return;
    }

    if (!form.subject.trim()) {
      setErrorMessage("Please enter a subject.");
      return;
    }

    if (!form.description.trim()) {
      setErrorMessage("Please describe the issue.");
      return;
    }

    if (!form.report_confirmation) {
      setErrorMessage(
        "Please confirm that the information provided is accurate."
      );
      return;
    }

    if (!form.privacy_acknowledged) {
      setErrorMessage(
        "Please acknowledge the Privacy Policy."
      );
      return;
    }

    /* ----------------------------------------------------------------------
       EMAIL VALIDATION
       ---------------------------------------------------------------------- */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email.trim())) {
      setErrorMessage(
        "Please enter a valid email address."
      );
      return;
    }

    /* ----------------------------------------------------------------------
       URL VALIDATION
       ---------------------------------------------------------------------- */

    try {
      new URL(form.url.trim());
    } catch {
      setErrorMessage(
        "Please enter a valid URL, for example https://example.com"
      );
      return;
    }

    /* ----------------------------------------------------------------------
       PREPARE EVIDENCE
       ---------------------------------------------------------------------- */

    const evidenceSection = form.evidence.trim()
      ? `
Additional Evidence:
${form.evidence.trim()}
`
      : `
Additional Evidence:
None provided.
`;

    /* ----------------------------------------------------------------------
       PREPARE EMAIL BODY
       ---------------------------------------------------------------------- */

    const emailBody = `
Name: ${form.name.trim()}

Email: ${form.email.trim()}

Report Type: ${form.category}

Relevant URL / Link: ${form.url.trim()}

Subject: ${form.subject.trim()}

${form.description.trim()}

${evidenceSection}

========================================
Submitted from PDFVerse Abuse Page
`;

    const mailtoUrl =
      `mailto:${ABUSE_EMAIL}` +
      `?subject=${encodeURIComponent(
        `PDFVerse Abuse Report - ${form.subject.trim()}`
      )}` +
      `&body=${encodeURIComponent(emailBody)}`;

    /* ----------------------------------------------------------------------
       USER MESSAGE
       ---------------------------------------------------------------------- */

    setSuccessMessage(
      "Your email application is opening with your abuse report prepared. Please review the information and click Send to complete the report."
    );

    /* ----------------------------------------------------------------------
       OPEN MAIL APPLICATION
       ---------------------------------------------------------------------- */

    window.location.href = mailtoUrl;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">

      {/* ================================================================
          HERO
      ================================================================ */}
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

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 shadow-xl shadow-red-500/20">
              <ShieldAlert className="h-8 w-8 text-white" />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-red-400">
              Safety & Trust
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Report Abuse
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Help us keep PDFVerse safe. Use this page to report
              malicious files, security issues, unlawful activity,
              privacy concerns, or other misuse of our services.
            </p>

          </div>

        </div>

      </section>

      {/* ================================================================
          MAIN CONTENT
      ================================================================ */}

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

        <div className="mx-auto w-full max-w-5xl">

          {/* ============================================================
              REPORT TYPES
          ============================================================ */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <ReportTypeCard
              icon={<ShieldAlert className="h-5 w-5" />}
              title="Security Issue"
              description="Report vulnerabilities, suspicious activity, unauthorized access, or other security concerns."
            />

            <ReportTypeCard
              icon={<FileWarning className="h-5 w-5" />}
              title="Malicious File"
              description="Report malware, phishing content, harmful documents, or files that appear unsafe."
            />

            <ReportTypeCard
              icon={<Ban className="h-5 w-5" />}
              title="Illegal or Abusive Content"
              description="Report content or activity that may violate applicable law or seriously misuse the service."
            />

            <ReportTypeCard
              icon={<Lock className="h-5 w-5" />}
              title="Privacy Concern"
              description="Report suspected misuse, unauthorized disclosure, or other concerns involving personal data."
            />

            <ReportTypeCard
              icon={<Gavel className="h-5 w-5" />}
              title="Copyright Concern"
              description="Provide details if you believe content hosted or shared through the service infringes your rights."
            />

            <ReportTypeCard
              icon={<Flag className="h-5 w-5" />}
              title="Other Abuse"
              description="Report spam, fraud, impersonation, harassment, or other significant misuse."
            />

          </div>

          {/* ============================================================
              WARNING
          ============================================================ */}

          <div className="mt-8 rounded-3xl border border-amber-400/10 bg-amber-500/[0.04] p-6 sm:p-8">

            <div className="flex items-start gap-4">

              <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-amber-400" />

              <div>

                <h2 className="text-lg font-bold text-white">
                  Before submitting a report
                </h2>

                <ul className="mt-4 space-y-3">

                  <Bullet>
                    Only provide information that is necessary to
                    investigate your report.
                  </Bullet>

                  <Bullet>
                    Do not send passwords, authentication codes,
                    private keys, or financial credentials.
                  </Bullet>

                  <Bullet>
                    Avoid uploading sensitive personal documents
                    unless they are genuinely necessary.
                  </Bullet>

                  <Bullet>
                    Do not submit false, fraudulent, or deliberately
                    misleading reports.
                  </Bullet>

                </ul>

              </div>

            </div>

          </div>

          {/* ============================================================
              SUCCESS MESSAGE
          ============================================================ */}

          {successMessage && (
            <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5">

              <div className="flex items-start gap-3">

                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />

                <div>

                  <h3 className="font-semibold text-emerald-300">
                    Report Ready
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-emerald-200/80">
                    {successMessage}
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* ============================================================
              ERROR MESSAGE
          ============================================================ */}

          {errorMessage && (
            <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-500/10 p-5">

              <div className="flex items-start gap-3">

                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />

                <div>

                  <h3 className="font-semibold text-red-300">
                    Please check your report
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-red-200/80">
                    {errorMessage}
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* ============================================================
              REPORT FORM
          ============================================================ */}

          <div className="mt-8">

            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  <Flag className="h-5 w-5" />
                </div>

                <div>

                  <h2 className="text-2xl font-bold text-white">
                    Submit an Abuse Report
                  </h2>

                  <p className="mt-2 text-left text-sm leading-6 text-slate-400">
                    Give us enough information to understand and
                    investigate the issue.
                  </p>

                </div>

              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >

                {/* ======================================================
                    NAME
                ====================================================== */}

                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) =>
                      updateField(
                        "name",
                        event.target.value
                      )
                    }
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
                  />

                </div>

                {/* ======================================================
                    EMAIL
                ====================================================== */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField(
                        "email",
                        event.target.value
                      )
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
                  />

                  <p className="mt-2 text-xs text-slate-500">
                    We may use this address to contact you
                    regarding your report.
                  </p>

                </div>

                {/* ======================================================
                    REPORT TYPE
                ====================================================== */}

                <div>

                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    Report Type
                  </label>

                  <select
                    id="category"
                    name="category"
                    required
                    value={form.category}
                    onChange={(event) =>
                      updateField(
                        "category",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
                  >

                    <option value="" disabled>
                      Select report type
                    </option>

                    <option value="Security Vulnerability">
                      Security Vulnerability
                    </option>

                    <option value="Malicious / Harmful File">
                      Malicious / Harmful File
                    </option>

                    <option value="Privacy / Personal Data Concern">
                      Privacy / Personal Data Concern
                    </option>

                    <option value="Copyright Concern">
                      Copyright Concern
                    </option>

                    <option value="Illegal or Abusive Content">
                      Illegal or Abusive Content
                    </option>

                    <option value="Fraud / Scam / Impersonation">
                      Fraud / Scam / Impersonation
                    </option>

                    <option value="Spam / Misuse">
                      Spam / Misuse
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

                {/* ======================================================
                    URL
                ====================================================== */}

                <div>

                  <label
                    htmlFor="url"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    Relevant URL or Link
                  </label>

                  <input
                    id="url"
                    name="url"
                    type="url"
                    required
                    value={form.url}
                    onChange={(event) =>
                      updateField(
                        "url",
                        event.target.value
                      )
                    }
                    placeholder="https://example.com/..."
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
                  />

                  <p className="mt-2 text-xs text-slate-500">
                    Provide the page, file, or resource related
                    to your report.
                  </p>

                </div>

                {/* ======================================================
                    SUBJECT
                ====================================================== */}

                <div>

                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={(event) =>
                      updateField(
                        "subject",
                        event.target.value
                      )
                    }
                    placeholder="Briefly describe the issue"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
                  />

                </div>

                {/* ======================================================
                    DESCRIPTION
                ====================================================== */}

                <div>

                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={8}
                    value={form.description}
                    onChange={(event) =>
                      updateField(
                        "description",
                        event.target.value
                      )
                    }
                    placeholder="Explain what happened, where it happened, and why you believe it violates our policies or creates a security, privacy, or safety concern."
                    className="w-full resize-y rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
                  />

                </div>

                {/* ======================================================
                    EVIDENCE
                ====================================================== */}

                <div>

                  <label
                    htmlFor="evidence"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    Additional Evidence

                    <span className="ml-2 font-normal text-slate-500">
                      (optional)
                    </span>
                  </label>

                  <textarea
                    id="evidence"
                    name="evidence"
                    rows={4}
                    value={form.evidence}
                    onChange={(event) =>
                      updateField(
                        "evidence",
                        event.target.value
                      )
                    }
                    placeholder="Provide relevant identifiers, dates, links, error messages, or other non-sensitive evidence."
                    className="w-full resize-y rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
                  />

                </div>

                {/* ======================================================
                    CONFIRMATION
                ====================================================== */}

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">

                  <label className="flex cursor-pointer items-start gap-3">

                    <input
                      type="checkbox"
                      name="report_confirmation"
                      required
                      checked={form.report_confirmation}
                      onChange={(event) =>
                        updateField(
                          "report_confirmation",
                          event.target.checked
                        )
                      }
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-red-500 focus:ring-red-500"
                    />

                    <span className="text-left text-xs leading-6 text-slate-400">
                      I confirm that the information provided is
                      accurate to the best of my knowledge and that
                      I am submitting this report in good faith.
                    </span>

                  </label>

                </div>

                {/* ======================================================
                    PRIVACY
                ====================================================== */}

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">

                  <label className="flex cursor-pointer items-start gap-3">

                    <input
                      type="checkbox"
                      name="privacy_acknowledged"
                      required
                      checked={form.privacy_acknowledged}
                      onChange={(event) =>
                        updateField(
                          "privacy_acknowledged",
                          event.target.checked
                        )
                      }
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-red-500 focus:ring-red-500"
                    />

                    <span className="text-left text-xs leading-6 text-slate-400">

                      I understand that the information submitted may
                      be processed to investigate and respond to this
                      report in accordance with the{" "}

                      <Link
                        to="/privacy"
                        className="font-semibold text-red-400 hover:text-red-300"
                      >
                        Privacy Policy
                      </Link>
                      .

                    </span>

                  </label>

                </div>

                {/* ======================================================
                    SUBMIT
                ====================================================== */}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 hover:shadow-red-500/30 active:translate-y-0"
                >

                  <Mail className="h-4 w-4" />

                  Open Email to Submit Report

                </button>

              </form>

              {/* ========================================================
                  MAIL INFORMATION
              ======================================================== */}

              <div className="mt-6 rounded-2xl border border-blue-400/10 bg-blue-500/[0.04] p-4">

                <div className="flex items-start gap-3">

                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />

                  <p className="text-left text-xs leading-6 text-slate-400">

                    When you click{" "}
                    <span className="font-semibold text-slate-300">
                      Open Email to Submit Report
                    </span>
                    , your configured email application will open
                    with the recipient, subject, and complete report
                    already filled in. Review the information and
                    click{" "}
                    <span className="font-semibold text-slate-300">
                      Send
                    </span>
                    {" "}to complete delivery.

                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ============================================================
              PRIVACY REPORTS
          ============================================================ */}

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8 lg:p-10">

            <div className="flex items-start gap-4">

              <UserCheck className="mt-1 h-6 w-6 shrink-0 text-red-400" />

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Privacy & Personal Data Reports
                </h2>

                <p className="mt-3 text-left text-sm leading-7 text-slate-300">
                  If your report concerns the processing of your
                  personal data, explain what happened and identify
                  the relevant processing or information where
                  possible. We may need additional information to
                  understand or verify your request.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">

                  <PrivacyCard
                    icon={<Lock className="h-4 w-4" />}
                    title="Unauthorized Disclosure"
                    description="Report suspected disclosure or exposure of your personal information."
                  />

                  <PrivacyCard
                    icon={<UserCheck className="h-4 w-4" />}
                    title="Incorrect Information"
                    description="Contact us if personal information associated with your request appears inaccurate."
                  />

                  <PrivacyCard
                    icon={<ShieldCheck className="h-4 w-4" />}
                    title="Data Processing Concern"
                    description="Tell us if you believe personal data is being processed in a way that concerns you."
                  />

                  <PrivacyCard
                    icon={<MessageSquare className="h-4 w-4" />}
                    title="Privacy Grievance"
                    description="Use this process for privacy-related complaints or unresolved concerns."
                  />

                </div>

                <div className="mt-6">

                  <Link
                    to="/privacy"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-red-400 transition hover:text-red-300"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Read the Privacy Policy
                  </Link>

                </div>

              </div>

            </div>

          </div>

          {/* ============================================================
              SECURITY REPORTING
          ============================================================ */}

          <div className="mt-8 rounded-3xl border border-blue-400/10 bg-blue-500/[0.04] p-6 sm:p-8">

            <div className="flex items-start gap-4">

              <ShieldAlert className="mt-1 h-6 w-6 shrink-0 text-blue-400" />

              <div>

                <h2 className="text-lg font-bold text-white">
                  Reporting a Security Vulnerability
                </h2>

                <p className="mt-3 text-left text-sm leading-7 text-slate-300">
                  If you have discovered a potential security
                  vulnerability, please provide enough technical
                  information for us to reproduce or understand the
                  issue. Avoid accessing, modifying, downloading, or
                  exposing data that does not belong to you.
                </p>

                <p className="mt-3 text-left text-sm leading-7 text-slate-400">
                  Please use responsible disclosure practices and
                  avoid disrupting the availability or security of
                  the service while investigating a suspected
                  vulnerability.
                </p>

              </div>

            </div>

          </div>

          {/* ============================================================
              MALICIOUS FILES
          ============================================================ */}

          <div className="mt-8 rounded-3xl border border-red-400/10 bg-red-500/[0.04] p-6 sm:p-8">

            <div className="flex items-start gap-4">

              <FileWarning className="mt-1 h-6 w-6 shrink-0 text-red-400" />

              <div>

                <h2 className="text-lg font-bold text-white">
                  Malicious or Harmful Files
                </h2>

                <p className="mt-3 text-left text-sm leading-7 text-slate-300">
                  If you believe a file shared through PDFVerse
                  contains malware, phishing content, malicious
                  scripts, fraudulent material, or other harmful
                  content, provide the relevant link and explain why
                  you believe it is unsafe.
                </p>

                <p className="mt-3 text-left text-sm leading-7 text-slate-400">
                  Do not download or open a suspicious file merely to
                  collect evidence. If possible, provide the URL,
                  filename, timestamp, or other safe identifying
                  information instead.
                </p>

              </div>

            </div>

          </div>

          {/* ============================================================
              COPYRIGHT / LEGAL
          ============================================================ */}

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">

            <div className="flex items-start gap-4">

              <Gavel className="mt-1 h-6 w-6 shrink-0 text-slate-400" />

              <div>

                <h2 className="text-lg font-bold text-white">
                  Copyright & Legal Complaints
                </h2>

                <p className="mt-3 text-left text-sm leading-7 text-slate-300">
                  If you believe content accessible through PDFVerse
                  infringes your copyright or violates another legal
                  right, provide a clear description of the material,
                  the relevant URL or identifier, the basis of your
                  complaint, and information sufficient for us to
                  contact you about the report.
                </p>

                <p className="mt-3 text-left text-sm leading-7 text-slate-400">
                  Submitting a report does not automatically establish
                  that content is unlawful or infringing. Reports are
                  reviewed based on the information provided and
                  applicable law.
                </p>

              </div>

            </div>

          </div>

          {/* ============================================================
              WHAT HAPPENS NEXT
          ============================================================ */}

          <div className="mt-8 rounded-3xl border border-emerald-400/10 bg-emerald-500/[0.04] p-6 sm:p-8">

            <div className="flex items-start gap-4">

              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-emerald-400" />

              <div>

                <h2 className="text-lg font-bold text-white">
                  What happens after a report?
                </h2>

                <ul className="mt-4 space-y-3">

                  <Bullet>
                    We review the information provided and determine
                    the appropriate handling route.
                  </Bullet>

                  <Bullet>
                    We may request additional information if necessary.
                  </Bullet>

                  <Bullet>
                    Security reports may be reviewed separately from
                    ordinary abuse reports.
                  </Bullet>

                  <Bullet>
                    Privacy complaints are handled consistently with
                    the applicable privacy and grievance process.
                  </Bullet>

                  <Bullet>
                    Where appropriate and legally permitted, action
                    may be taken to restrict, remove, investigate, or
                    otherwise address reported content or activity.
                  </Bullet>

                </ul>

              </div>

            </div>

          </div>

          {/* ============================================================
              DPDP NOTICE
          ============================================================ */}

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">

            <div className="flex items-start gap-3">

              <Lock className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />

              <p className="text-left text-xs leading-6 text-slate-500">
                Where applicable, PDFVerse will handle personal-data
                complaints and grievance requests in accordance with
                the Digital Personal Data Protection Act, 2023, the
                Digital Personal Data Protection Rules, 2025, and
                other applicable law. The applicability and
                commencement of particular provisions may depend on
                the relevant legal commencement timeline.
              </p>

            </div>

          </div>

          {/* ============================================================
              CONTACT
          ============================================================ */}

          <div className="mt-8 text-center">

            <p className="text-sm text-slate-500">
              Need help with something that isn&apos;t an abuse report?
            </p>

            <Link
              to="/contact"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-red-400 transition hover:text-red-300"
            >
              <Mail className="h-4 w-4" />
              Contact PDFVerse Support
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

/* ==========================================================================
   REPORT TYPE CARD
   ========================================================================== */

function ReportTypeCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 text-left transition hover:border-red-400/20 hover:bg-white/[0.04]">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
        {icon}
      </div>

      <h2 className="mt-4 font-semibold text-white">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>

    </div>
  );
}

/* ==========================================================================
   PRIVACY CARD
   ========================================================================== */

function PrivacyCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
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

/* ==========================================================================
   BULLET
   ========================================================================== */

function Bullet({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <li className="flex gap-3 text-left text-sm leading-7 text-slate-300">

      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />

      <span>
        {children}
      </span>

    </li>
  );
}
export const Route = createFileRoute("/report-abuse")({
  head: () => ({
    meta: [
      { title: "Report Abuse — PDFVerse" },
      { name: "description", content: "Report abusive, illegal or infringing use of PDFVerse tools. Our team reviews every report." },
      { property: "og:title", content: "Report Abuse — PDFVerse" },
      { property: "og:description", content: "Report abusive, illegal or infringing use of PDFVerse tools. Our team reviews every report." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportAbusePage,
});

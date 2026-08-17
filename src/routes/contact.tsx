import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Lock,
  Mail,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

/* ==========================================================================
   PDFVERSE SUPPORT EMAIL
   ========================================================================== */

const CONTACT_EMAIL = "support.pdfverse@gmail.com";

/* ==========================================================================
   PAGE
   ========================================================================== */

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /* ------------------------------------------------------------------------
     FORM CHANGE
     ------------------------------------------------------------------------ */

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  }

  /* ------------------------------------------------------------------------
     FORM SUBMIT
     
     Opens the user's configured email application using mailto.
     No API route.
     No Resend.
     No server-side email service.
     ------------------------------------------------------------------------ */

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    /* ----------------------------------------------------------------------
       Basic validation
       ---------------------------------------------------------------------- */

    if (!form.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!form.email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!form.type) {
      setErrorMessage("Please select a request type.");
      return;
    }

    if (!form.subject.trim()) {
      setErrorMessage("Please enter a subject.");
      return;
    }

    if (!form.message.trim()) {
      setErrorMessage("Please enter your message.");
      return;
    }

    /* ----------------------------------------------------------------------
       Email validation
       ---------------------------------------------------------------------- */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    /* ----------------------------------------------------------------------
       Create email body
       ---------------------------------------------------------------------- */

    const emailBody = `
PDFVerse Contact Request
========================================

Name: ${form.name.trim()}

Email: ${form.email.trim()}

Request Type: ${form.type}

Subject: ${form.subject.trim()}

Message: ${form.message.trim()}

========================================
Sent from PDFVerse Contact Page
`;

    /* ----------------------------------------------------------------------
       Gmail / Mail application

       mailto opens the email application configured on the user's device.

       If Gmail is configured as the user's mail handler, Gmail will open.
       ---------------------------------------------------------------------- */

    const mailtoUrl =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(
        `PDFVerse Contact - ${form.subject.trim()}`
      )}` +
      `&body=${encodeURIComponent(emailBody)}`;

    /* ----------------------------------------------------------------------
       Show information before opening the mail application
       ---------------------------------------------------------------------- */

    setSuccessMessage(
      "Your email application is opening with your message prepared. Please click Send in your email application to complete delivery."
    );

    /* ----------------------------------------------------------------------
       Open email application
       ---------------------------------------------------------------------- */

    window.location.href = mailtoUrl;
  }

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

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 shadow-xl shadow-red-500/20">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-red-400">
              PDFVerse Support
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Contact Us
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Have a question, privacy request, security concern, or problem
              with a PDF tool? Send us a message and provide enough detail for
              us to understand your request.
            </p>

          </div>

        </div>

      </section>

      {/* ================================================================ */}
      {/* MAIN CONTENT                                                     */}
      {/* ================================================================ */}

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

        <div className="mx-auto w-full max-w-5xl">

          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">

            {/* ========================================================== */}
            {/* LEFT INFORMATION                                            */}
            {/* ========================================================== */}

            <div className="space-y-6">

              <InfoPanel
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Privacy & Data Requests"
                description="For questions about personal data, correction, deletion, consent, or other privacy-related matters."
              />

              <InfoPanel
                icon={<MessageSquare className="h-5 w-5" />}
                title="Technical Support"
                description="Tell us about a problem with a PDF tool, upload, conversion, download, or other feature."
              />

              <InfoPanel
                icon={<ShieldAlert className="h-5 w-5" />}
                title="Security Concerns"
                description="Report suspected security vulnerabilities, malicious activity, or unauthorized access."
              />

              <InfoPanel
                icon={<AlertTriangle className="h-5 w-5" />}
                title="Report Abuse"
                description="For unlawful content, fraud, malicious files, copyright concerns, or other serious misuse."
              />

              {/* Helpful Pages */}

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">

                <h2 className="text-lg font-bold text-white">
                  Helpful Pages
                </h2>

                <div className="mt-5 space-y-3">

                  <LegalLink
                    href="/privacy"
                    icon={<ShieldCheck className="h-4 w-4" />}
                    title="Privacy Policy"
                  />

                  <LegalLink
                    href="/terms"
                    icon={<FileText className="h-4 w-4" />}
                    title="Terms of Use"
                  />

                  <LegalLink
                    href="/report-abuse"
                    icon={<ShieldAlert className="h-4 w-4" />}
                    title="Report Abuse"
                  />

                </div>

              </div>

            </div>

            {/* ========================================================== */}
            {/* CONTACT FORM                                                */}
            {/* ========================================================== */}

            <div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div>

                    <h2 className="text-2xl font-bold text-white">
                      Send a Message
                    </h2>

                    <p className="mt-2 text-left text-sm leading-6 text-slate-400">
                      Please provide accurate information so we can respond
                      appropriately.
                    </p>

                  </div>

                </div>

                {/* ====================================================== */}
                {/* SUCCESS MESSAGE                                         */}
                {/* ====================================================== */}

                {successMessage && (
                  <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">

                    <div className="flex items-start gap-3">

                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />

                      <div>

                        <p className="font-semibold text-emerald-300">
                          Email Ready
                        </p>

                        <p className="mt-1 text-sm leading-6 text-emerald-200/80">
                          {successMessage}
                        </p>

                      </div>

                    </div>

                  </div>
                )}

                {/* ====================================================== */}
                {/* ERROR MESSAGE                                           */}
                {/* ====================================================== */}

                {errorMessage && (
                  <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/10 p-4">

                    <div className="flex items-start gap-3">

                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />

                      <div>

                        <p className="font-semibold text-red-300">
                          Unable to Send
                        </p>

                        <p className="mt-1 text-sm leading-6 text-red-200/80">
                          {errorMessage}
                        </p>

                      </div>

                    </div>

                  </div>
                )}

                {/* ====================================================== */}
                {/* FORM                                                    */}
                {/* ====================================================== */}

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-6"
                >

                  {/* Name */}

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
                      value={form.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
                    />

                  </div>

                  {/* Email */}

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
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
                    />

                  </div>

                  {/* Request Type */}

                  <div>

                    <label
                      htmlFor="type"
                      className="mb-2 block text-sm font-semibold text-slate-200"
                    >
                      Request Type
                    </label>

                    <select
                      id="type"
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
                    >

                      <option value="" disabled>
                        Select a request type
                      </option>

                      <option value="Privacy / Personal Data Request">
                        Privacy / Personal Data Request
                      </option>

                      <option value="Correction of Personal Data">
                        Correction of Personal Data
                      </option>

                      <option value="Data Deletion Request">
                        Data Deletion Request
                      </option>

                      <option value="Privacy Grievance">
                        Privacy Grievance
                      </option>

                      <option value="Technical Support">
                        Technical Support
                      </option>

                      <option value="Security Concern">
                        Security Concern
                      </option>

                      <option value="General Question">
                        General Question
                      </option>

                    </select>

                  </div>

                  {/* Subject */}

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
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="What can we help you with?"
                      className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
                    />

                  </div>

                  {/* Message */}

                  <div>

                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-slate-200"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={7}
                      placeholder="Describe your request or issue..."
                      className="w-full resize-y rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
                    />

                  </div>

                  {/* Privacy acknowledgement */}

                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">

                    <label className="flex cursor-pointer items-start gap-3">

                      <input
                        type="checkbox"
                        name="privacy_acknowledged"
                        required
                        className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-red-500 focus:ring-red-500"
                      />

                      <span className="text-left text-xs leading-6 text-slate-400">

                        I understand that the information I provide may be
                        processed for the purpose of responding to my request
                        and handled according to the{" "}

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

                  {/* Submit */}

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 hover:shadow-red-500/30 active:translate-y-0"
                  >

                    <Mail className="h-4 w-4" />

                    Send Message

                  </button>

                </form>

                {/* ====================================================== */}
                {/* EMAIL INFORMATION                                      */}
                {/* ====================================================== */}

                <div className="mt-6 rounded-2xl border border-blue-400/10 bg-blue-500/[0.04] p-4">

                  <div className="flex items-start gap-3">

                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />

                    <p className="text-left text-xs leading-6 text-slate-400">

                      Clicking{" "}
                      <span className="font-semibold text-slate-300">
                        Send Message
                      </span>{" "}
                      opens your configured email application with the
                      recipient, subject, and message already filled in.
                      You must click{" "}
                      <span className="font-semibold text-slate-300">
                        Send
                      </span>{" "}
                      in your email application to complete delivery.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ============================================================ */}
          {/* PRIVACY REQUEST INFORMATION                                  */}
          {/* ============================================================ */}

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8 lg:p-10">

            <div className="flex items-start gap-4">

              <UserCheck className="mt-1 h-6 w-6 shrink-0 text-red-400" />

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Privacy & Data Protection Requests
                </h2>

                <p className="mt-3 text-left text-sm leading-7 text-slate-300">
                  If your message concerns your personal data, clearly describe
                  the request you want to make. Depending on applicable law,
                  requests may include access to information about processing,
                  correction, deletion, withdrawal of consent, grievance
                  handling, or other applicable rights.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">

                  <RequestCard
                    title="Correction"
                    description="Tell us which personal information you believe is inaccurate or incomplete."
                  />

                  <RequestCard
                    title="Deletion"
                    description="Identify the information you want deleted and explain your request."
                  />

                  <RequestCard
                    title="Consent"
                    description="Tell us if you want to withdraw consent where processing is based on consent."
                  />

                  <RequestCard
                    title="Grievance"
                    description="Explain the privacy concern or processing issue you want us to review."
                  />

                </div>

              </div>

            </div>

          </div>

          {/* ============================================================ */}
          {/* SENSITIVE INFORMATION WARNING                                 */}
          {/* ============================================================ */}

          <div className="mt-8 rounded-3xl border border-amber-400/10 bg-amber-500/[0.04] p-6 sm:p-8">

            <div className="flex items-start gap-4">

              <Lock className="mt-1 h-6 w-6 shrink-0 text-amber-400" />

              <div>

                <h2 className="text-lg font-bold text-white">
                  Please do not send sensitive documents unnecessarily
                </h2>

                <p className="mt-3 text-left text-sm leading-7 text-slate-300">
                  Do not attach passports, Aadhaar cards, PAN cards, bank
                  statements, passwords, authentication codes, private keys,
                  medical records, or other highly sensitive documents unless
                  they are genuinely necessary for resolving your request and
                  you are authorized to provide them.
                </p>

                <p className="mt-3 text-left text-sm leading-7 text-slate-400">
                  If you need help with a PDF processing problem, describe the
                  issue first. We may be able to help without receiving the
                  original document.
                </p>

              </div>

            </div>

          </div>

          {/* ============================================================ */}
          {/* WHAT HAPPENS NEXT                                             */}
          {/* ============================================================ */}

          <div className="mt-8 rounded-3xl border border-emerald-400/10 bg-emerald-500/[0.04] p-6 sm:p-8">

            <div className="flex items-start gap-4">

              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-emerald-400" />

              <div>

                <h2 className="text-lg font-bold text-white">
                  What happens after you contact us?
                </h2>

                <ul className="mt-4 space-y-3">

                  <Bullet>
                    Your request is reviewed by the appropriate support or
                    privacy team.
                  </Bullet>

                  <Bullet>
                    We may ask for additional information where necessary to
                    understand or verify the request.
                  </Bullet>

                  <Bullet>
                    Privacy requests may require reasonable identity
                    verification.
                  </Bullet>

                  <Bullet>
                    We will handle the request according to applicable law and
                    our Privacy Policy.
                  </Bullet>

                </ul>

              </div>

            </div>

          </div>

          {/* ============================================================ */}
          {/* LEGAL NOTICE                                                 */}
          {/* ============================================================ */}

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">

            <div className="flex items-start gap-3">

              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />

              <p className="text-left text-xs leading-6 text-slate-500">
                PDFVerse handles privacy and personal-data requests according
                to applicable law and its Privacy Policy. References to the
                Digital Personal Data Protection Act, 2023 and the Digital
                Personal Data Protection Rules, 2025 are subject to the
                provisions and commencement dates applicable at the relevant
                time.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

/* ==========================================================================
   INFORMATION PANEL
   ========================================================================== */

function InfoPanel({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
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
   LEGAL LINK
   ========================================================================== */

function LegalLink({
  href,
  icon,
  title,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <Link
      to={href}
      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-red-400/20 hover:bg-red-500/[0.04] hover:text-white"
    >
      <span className="text-red-400">
        {icon}
      </span>

      <span>
        {title}
      </span>
    </Link>
  );
}

/* ==========================================================================
   PRIVACY REQUEST CARD
   ========================================================================== */

function RequestCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">

      <h3 className="font-semibold text-white">
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
  children: React.ReactNode;
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
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact PDFVerse — Support & Help" },
      { name: "description", content: "Contact the PDFVerse team for support, feedback, bug reports or privacy questions about our online PDF tools." },
      { property: "og:title", content: "Contact PDFVerse — Support & Help" },
      { property: "og:description", content: "Contact the PDFVerse team for support, feedback, bug reports or privacy questions about our online PDF tools." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

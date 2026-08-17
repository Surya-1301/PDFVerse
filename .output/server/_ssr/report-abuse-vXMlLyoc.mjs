import { a as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as FileExclamationPoint, F as ArrowLeft, N as CircleCheck, P as Ban, b as Gavel, c as ShieldAlert, h as Lock, i as TriangleAlert, m as Mail, n as UserCheck, p as MessageSquare, s as ShieldCheck, x as Flag } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report-abuse-vXMlLyoc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ABUSE_EMAIL = "support.pdfverse@gmail.com";
function ReportAbusePage() {
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		category: "",
		url: "",
		subject: "",
		description: "",
		evidence: "",
		report_confirmation: false,
		privacy_acknowledged: false
	});
	const [successMessage, setSuccessMessage] = (0, import_react.useState)("");
	const [errorMessage, setErrorMessage] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		document.title = "Report Abuse | PDFVerse";
	}, []);
	function updateField(field, value) {
		setForm((previous) => ({
			...previous,
			[field]: value
		}));
		setErrorMessage("");
		setSuccessMessage("");
	}
	function handleSubmit(event) {
		event.preventDefault();
		setSuccessMessage("");
		setErrorMessage("");
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
			setErrorMessage("Please confirm that the information provided is accurate.");
			return;
		}
		if (!form.privacy_acknowledged) {
			setErrorMessage("Please acknowledge the Privacy Policy.");
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
			setErrorMessage("Please enter a valid email address.");
			return;
		}
		try {
			new URL(form.url.trim());
		} catch {
			setErrorMessage("Please enter a valid URL, for example https://example.com");
			return;
		}
		const evidenceSection = form.evidence.trim() ? `
Additional Evidence:
${form.evidence.trim()}
` : `
Additional Evidence:
None provided.
`;
		const emailBody = `
PDFVERSE ABUSE REPORT
========================================

Name: ${form.name.trim()}

Email: ${form.email.trim()}

Report Type: ${form.category}

Relevant URL / Link: ${form.url.trim()}

Subject: ${form.subject.trim()}

${form.description.trim()}

${evidenceSection}

========================================
Submitted from PDFVerse Report Abuse Page
`;
		const mailtoUrl = `mailto:${ABUSE_EMAIL}?subject=${encodeURIComponent(`PDFVerse Abuse Report - ${form.subject.trim()}`)}&body=${encodeURIComponent(emailBody)}`;
		setSuccessMessage("Your email application is opening with your abuse report prepared. Please review the information and click Send to complete the report.");
		window.location.href = mailtoUrl;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-slate-950 text-slate-100",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "Back to PDFVerse"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 shadow-xl shadow-red-500/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-8 w-8 text-white" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-xs font-bold uppercase tracking-[0.25em] text-red-400",
							children: "Safety & Trust"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl",
							children: "Report Abuse"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base",
							children: "Help us keep PDFVerse safe. Use this page to report malicious files, security issues, unlawful activity, privacy concerns, or other misuse of our services."
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-4 py-10 sm:px-6 sm:py-14 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-5xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportTypeCard, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-5 w-5" }),
								title: "Security Issue",
								description: "Report vulnerabilities, suspicious activity, unauthorized access, or other security concerns."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportTypeCard, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileExclamationPoint, { className: "h-5 w-5" }),
								title: "Malicious File",
								description: "Report malware, phishing content, harmful documents, or files that appear unsafe."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportTypeCard, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "h-5 w-5" }),
								title: "Illegal or Abusive Content",
								description: "Report content or activity that may violate applicable law or seriously misuse the service."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportTypeCard, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5" }),
								title: "Privacy Concern",
								description: "Report suspected misuse, unauthorized disclosure, or other concerns involving personal data."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportTypeCard, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, { className: "h-5 w-5" }),
								title: "Copyright Concern",
								description: "Provide details if you believe content hosted or shared through the service infringes your rights."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportTypeCard, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "h-5 w-5" }),
								title: "Other Abuse",
								description: "Report spam, fraud, impersonation, harassment, or other significant misuse."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 rounded-3xl border border-amber-400/10 bg-amber-500/[0.04] p-6 sm:p-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-1 h-6 w-6 shrink-0 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-bold text-white",
								children: "Before submitting a report"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullet, { children: "Only provide information that is necessary to investigate your report." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullet, { children: "Do not send passwords, authentication codes, private keys, or financial credentials." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullet, { children: "Avoid uploading sensitive personal documents unless they are genuinely necessary." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullet, { children: "Do not submit false, fraudulent, or deliberately misleading reports." })
								]
							})] })]
						})
					}),
					successMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-emerald-300",
								children: "Report Ready"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-6 text-emerald-200/80",
								children: successMessage
							})] })]
						})
					}),
					errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 rounded-2xl border border-red-400/20 bg-red-500/10 p-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-5 w-5 shrink-0 text-red-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-red-300",
								children: "Please check your report"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-6 text-red-200/80",
								children: errorMessage
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-white/10 bg-white/[0.025] p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl font-bold text-white",
										children: "Submit an Abuse Report"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-left text-sm leading-6 text-slate-400",
										children: "Give us enough information to understand and investigate the issue."
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleSubmit,
									className: "mt-8 space-y-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "name",
											className: "mb-2 block text-sm font-semibold text-slate-200",
											children: "Your Name"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "name",
											name: "name",
											type: "text",
											required: true,
											autoComplete: "name",
											value: form.name,
											onChange: (event) => updateField("name", event.target.value),
											placeholder: "Enter your name",
											className: "w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "email",
												className: "mb-2 block text-sm font-semibold text-slate-200",
												children: "Email Address"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "email",
												name: "email",
												type: "email",
												required: true,
												autoComplete: "email",
												value: form.email,
												onChange: (event) => updateField("email", event.target.value),
												placeholder: "you@example.com",
												className: "w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-xs text-slate-500",
												children: "We may use this address to contact you regarding your report."
											})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "category",
											className: "mb-2 block text-sm font-semibold text-slate-200",
											children: "Report Type"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "category",
											name: "category",
											required: true,
											value: form.category,
											onChange: (event) => updateField("category", event.target.value),
											className: "w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													disabled: true,
													children: "Select report type"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Security Vulnerability",
													children: "Security Vulnerability"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Malicious / Harmful File",
													children: "Malicious / Harmful File"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Privacy / Personal Data Concern",
													children: "Privacy / Personal Data Concern"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Copyright Concern",
													children: "Copyright Concern"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Illegal or Abusive Content",
													children: "Illegal or Abusive Content"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Fraud / Scam / Impersonation",
													children: "Fraud / Scam / Impersonation"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Spam / Misuse",
													children: "Spam / Misuse"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Other",
													children: "Other"
												})
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "url",
												className: "mb-2 block text-sm font-semibold text-slate-200",
												children: "Relevant URL or Link"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "url",
												name: "url",
												type: "url",
												required: true,
												value: form.url,
												onChange: (event) => updateField("url", event.target.value),
												placeholder: "https://example.com/...",
												className: "w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-xs text-slate-500",
												children: "Provide the page, file, or resource related to your report."
											})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "subject",
											className: "mb-2 block text-sm font-semibold text-slate-200",
											children: "Subject"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "subject",
											name: "subject",
											type: "text",
											required: true,
											value: form.subject,
											onChange: (event) => updateField("subject", event.target.value),
											placeholder: "Briefly describe the issue",
											className: "w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "description",
											className: "mb-2 block text-sm font-semibold text-slate-200",
											children: "Description"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											id: "description",
											name: "description",
											required: true,
											rows: 8,
											value: form.description,
											onChange: (event) => updateField("description", event.target.value),
											placeholder: "Explain what happened, where it happened, and why you believe it violates our policies or creates a security, privacy, or safety concern.",
											className: "w-full resize-y rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											htmlFor: "evidence",
											className: "mb-2 block text-sm font-semibold text-slate-200",
											children: ["Additional Evidence", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-2 font-normal text-slate-500",
												children: "(optional)"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											id: "evidence",
											name: "evidence",
											rows: 4,
											value: form.evidence,
											onChange: (event) => updateField("evidence", event.target.value),
											placeholder: "Provide relevant identifiers, dates, links, error messages, or other non-sensitive evidence.",
											className: "w-full resize-y rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-2xl border border-white/10 bg-white/[0.02] p-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "flex cursor-pointer items-start gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "checkbox",
													name: "report_confirmation",
													required: true,
													checked: form.report_confirmation,
													onChange: (event) => updateField("report_confirmation", event.target.checked),
													className: "mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-red-500 focus:ring-red-500"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-left text-xs leading-6 text-slate-400",
													children: "I confirm that the information provided is accurate to the best of my knowledge and that I am submitting this report in good faith."
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-2xl border border-white/10 bg-white/[0.02] p-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "flex cursor-pointer items-start gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "checkbox",
													name: "privacy_acknowledged",
													required: true,
													checked: form.privacy_acknowledged,
													onChange: (event) => updateField("privacy_acknowledged", event.target.checked),
													className: "mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-red-500 focus:ring-red-500"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-left text-xs leading-6 text-slate-400",
													children: [
														"I understand that the information submitted may be processed to investigate and respond to this report in accordance with the",
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
															to: "/privacy",
															className: "font-semibold text-red-400 hover:text-red-300",
															children: "Privacy Policy"
														}),
														"."
													]
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "submit",
											className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 hover:shadow-red-500/30 active:translate-y-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), "Open Email to Submit Report"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 rounded-2xl border border-blue-400/10 bg-blue-500/[0.04] p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mt-0.5 h-5 w-5 shrink-0 text-blue-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-left text-xs leading-6 text-slate-400",
											children: [
												"When you click",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-slate-300",
													children: "Open Email to Submit Report"
												}),
												", your configured email application will open with the recipient, subject, and complete report already filled in. Review the information and click",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-slate-300",
													children: "Send"
												}),
												" ",
												"to complete delivery."
											]
										})]
									})
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8 lg:p-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "mt-1 h-6 w-6 shrink-0 text-red-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl font-bold text-white",
									children: "Privacy & Personal Data Reports"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-left text-sm leading-7 text-slate-300",
									children: "If your report concerns the processing of your personal data, explain what happened and identify the relevant processing or information where possible. We may need additional information to understand or verify your request."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyCard, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }),
											title: "Unauthorized Disclosure",
											description: "Report suspected disclosure or exposure of your personal information."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyCard, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-4 w-4" }),
											title: "Incorrect Information",
											description: "Contact us if personal information associated with your request appears inaccurate."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyCard, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }),
											title: "Data Processing Concern",
											description: "Tell us if you believe personal data is being processed in a way that concerns you."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyCard, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4" }),
											title: "Privacy Grievance",
											description: "Use this process for privacy-related complaints or unresolved concerns."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/privacy",
										className: "inline-flex items-center gap-2 text-sm font-semibold text-red-400 transition hover:text-red-300",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }), "Read the Privacy Policy"]
									})
								})
							] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 rounded-3xl border border-blue-400/10 bg-blue-500/[0.04] p-6 sm:p-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "mt-1 h-6 w-6 shrink-0 text-blue-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-bold text-white",
									children: "Reporting a Security Vulnerability"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-left text-sm leading-7 text-slate-300",
									children: "If you have discovered a potential security vulnerability, please provide enough technical information for us to reproduce or understand the issue. Avoid accessing, modifying, downloading, or exposing data that does not belong to you."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-left text-sm leading-7 text-slate-400",
									children: "Please use responsible disclosure practices and avoid disrupting the availability or security of the service while investigating a suspected vulnerability."
								})
							] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 rounded-3xl border border-red-400/10 bg-red-500/[0.04] p-6 sm:p-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileExclamationPoint, { className: "mt-1 h-6 w-6 shrink-0 text-red-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-bold text-white",
									children: "Malicious or Harmful Files"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-left text-sm leading-7 text-slate-300",
									children: "If you believe a file shared through PDFVerse contains malware, phishing content, malicious scripts, fraudulent material, or other harmful content, provide the relevant link and explain why you believe it is unsafe."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-left text-sm leading-7 text-slate-400",
									children: "Do not download or open a suspicious file merely to collect evidence. If possible, provide the URL, filename, timestamp, or other safe identifying information instead."
								})
							] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, { className: "mt-1 h-6 w-6 shrink-0 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-bold text-white",
									children: "Copyright & Legal Complaints"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-left text-sm leading-7 text-slate-300",
									children: "If you believe content accessible through PDFVerse infringes your copyright or violates another legal right, provide a clear description of the material, the relevant URL or identifier, the basis of your complaint, and information sufficient for us to contact you about the report."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-left text-sm leading-7 text-slate-400",
									children: "Submitting a report does not automatically establish that content is unlawful or infringing. Reports are reviewed based on the information provided and applicable law."
								})
							] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 rounded-3xl border border-emerald-400/10 bg-emerald-500/[0.04] p-6 sm:p-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-1 h-6 w-6 shrink-0 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-bold text-white",
								children: "What happens after a report?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullet, { children: "We review the information provided and determine the appropriate handling route." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullet, { children: "We may request additional information if necessary." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullet, { children: "Security reports may be reviewed separately from ordinary abuse reports." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullet, { children: "Privacy complaints are handled consistently with the applicable privacy and grievance process." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullet, { children: "Where appropriate and legally permitted, action may be taken to restrict, remove, investigate, or otherwise address reported content or activity." })
								]
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mt-0.5 h-5 w-5 shrink-0 text-slate-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-left text-xs leading-6 text-slate-500",
								children: "Where applicable, PDFVerse will handle personal-data complaints and grievance requests in accordance with the Digital Personal Data Protection Act, 2023, the Digital Personal Data Protection Rules, 2025, and other applicable law. The applicability and commencement of particular provisions may depend on the relevant legal commencement timeline."
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate-500",
							children: "Need help with something that isn't an abuse report?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "mt-3 inline-flex items-center gap-2 text-sm font-semibold text-red-400 transition hover:text-red-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), "Contact PDFVerse Support"]
						})]
					})
				]
			})
		})]
	});
}
function ReportTypeCard({ icon, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-white/10 bg-white/[0.025] p-6 text-left transition hover:border-red-400/20 hover:bg-white/[0.04]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 font-semibold text-white",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-6 text-slate-400",
				children: description
			})
		]
	});
}
function PrivacyCard({ icon, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-semibold text-white",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-6 text-slate-400",
				children: description
			})
		]
	});
}
function Bullet({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex gap-3 text-left text-sm leading-7 text-slate-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-1 h-4 w-4 shrink-0 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children })]
	});
}
//#endregion
export { ReportAbusePage as component };

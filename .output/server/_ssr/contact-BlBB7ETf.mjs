import { a as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ArrowLeft, N as CircleCheck, S as FileText, c as ShieldAlert, h as Lock, i as TriangleAlert, m as Mail, n as UserCheck, p as MessageSquare, s as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-BlBB7ETf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CONTACT_EMAIL = "support.pdfverse@gmail.com";
function ContactPage() {
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		type: "",
		subject: "",
		message: ""
	});
	const [successMessage, setSuccessMessage] = (0, import_react.useState)("");
	const [errorMessage, setErrorMessage] = (0, import_react.useState)("");
	function handleChange(e) {
		const { name, value } = e.target;
		setForm((previous) => ({
			...previous,
			[name]: value
		}));
		setErrorMessage("");
		setSuccessMessage("");
	}
	function handleSubmit(e) {
		e.preventDefault();
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
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
			setErrorMessage("Please enter a valid email address.");
			return;
		}
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
		const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`PDFVerse Contact - ${form.subject.trim()}`)}&body=${encodeURIComponent(emailBody)}`;
		setSuccessMessage("Your email application is opening with your message prepared. Please click Send in your email application to complete delivery.");
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
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-8 w-8 text-white" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-xs font-bold uppercase tracking-[0.25em] text-red-400",
							children: "PDFVerse Support"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl",
							children: "Contact Us"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base",
							children: "Have a question, privacy request, security concern, or problem with a PDF tool? Send us a message and provide enough detail for us to understand your request."
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
						className: "grid gap-8 lg:grid-cols-[0.85fr_1.15fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoPanel, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" }),
									title: "Privacy & Data Requests",
									description: "For questions about personal data, correction, deletion, consent, or other privacy-related matters."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoPanel, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-5 w-5" }),
									title: "Technical Support",
									description: "Tell us about a problem with a PDF tool, upload, conversion, download, or other feature."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoPanel, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-5 w-5" }),
									title: "Security Concerns",
									description: "Report suspected security vulnerabilities, malicious activity, or unauthorized access."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoPanel, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" }),
									title: "Report Abuse",
									description: "For unlawful content, fraud, malicious files, copyright concerns, or other serious misuse."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-white/10 bg-white/[0.025] p-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg font-bold text-white",
										children: "Helpful Pages"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-5 space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalLink, {
												href: "/privacy",
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }),
												title: "Privacy Policy"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalLink, {
												href: "/terms",
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }),
												title: "Terms of Use"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalLink, {
												href: "/report-abuse",
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-4 w-4" }),
												title: "Report Abuse"
											})
										]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-white/10 bg-white/[0.025] p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl font-bold text-white",
										children: "Send a Message"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-left text-sm leading-6 text-slate-400",
										children: "Please provide accurate information so we can respond appropriately."
									})] })]
								}),
								successMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-emerald-300",
											children: "Email Ready"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm leading-6 text-emerald-200/80",
											children: successMessage
										})] })]
									})
								}),
								errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 rounded-2xl border border-red-400/20 bg-red-500/10 p-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-5 w-5 shrink-0 text-red-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-red-300",
											children: "Unable to Send"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm leading-6 text-red-200/80",
											children: errorMessage
										})] })]
									})
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
											value: form.name,
											onChange: handleChange,
											required: true,
											autoComplete: "name",
											placeholder: "Enter your name",
											className: "w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "email",
											className: "mb-2 block text-sm font-semibold text-slate-200",
											children: "Email Address"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "email",
											name: "email",
											type: "email",
											value: form.email,
											onChange: handleChange,
											required: true,
											autoComplete: "email",
											placeholder: "you@example.com",
											className: "w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "type",
											className: "mb-2 block text-sm font-semibold text-slate-200",
											children: "Request Type"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "type",
											name: "type",
											value: form.type,
											onChange: handleChange,
											required: true,
											className: "w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													disabled: true,
													children: "Select a request type"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Privacy / Personal Data Request",
													children: "Privacy / Personal Data Request"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Correction of Personal Data",
													children: "Correction of Personal Data"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Data Deletion Request",
													children: "Data Deletion Request"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Privacy Grievance",
													children: "Privacy Grievance"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Technical Support",
													children: "Technical Support"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Security Concern",
													children: "Security Concern"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "General Question",
													children: "General Question"
												})
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "subject",
											className: "mb-2 block text-sm font-semibold text-slate-200",
											children: "Subject"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "subject",
											name: "subject",
											type: "text",
											value: form.subject,
											onChange: handleChange,
											required: true,
											placeholder: "What can we help you with?",
											className: "w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "message",
											className: "mb-2 block text-sm font-semibold text-slate-200",
											children: "Message"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											id: "message",
											name: "message",
											value: form.message,
											onChange: handleChange,
											required: true,
											rows: 7,
											placeholder: "Describe your request or issue...",
											className: "w-full resize-y rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-2xl border border-white/10 bg-white/[0.02] p-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "flex cursor-pointer items-start gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "checkbox",
													name: "privacy_acknowledged",
													required: true,
													className: "mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-red-500 focus:ring-red-500"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-left text-xs leading-6 text-slate-400",
													children: [
														"I understand that the information I provide may be processed for the purpose of responding to my request and handled according to the",
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
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), "Send Message"]
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
												"Clicking",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-slate-300",
													children: "Send Message"
												}),
												" ",
												"opens your configured email application with the recipient, subject, and message already filled in. You must click",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-slate-300",
													children: "Send"
												}),
												" ",
												"in your email application to complete delivery."
											]
										})]
									})
								})
							]
						}) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8 lg:p-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "mt-1 h-6 w-6 shrink-0 text-red-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl font-bold text-white",
									children: "Privacy & Data Protection Requests"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-left text-sm leading-7 text-slate-300",
									children: "If your message concerns your personal data, clearly describe the request you want to make. Depending on applicable law, requests may include access to information about processing, correction, deletion, withdrawal of consent, grievance handling, or other applicable rights."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestCard, {
											title: "Correction",
											description: "Tell us which personal information you believe is inaccurate or incomplete."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestCard, {
											title: "Deletion",
											description: "Identify the information you want deleted and explain your request."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestCard, {
											title: "Consent",
											description: "Tell us if you want to withdraw consent where processing is based on consent."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestCard, {
											title: "Grievance",
											description: "Explain the privacy concern or processing issue you want us to review."
										})
									]
								})
							] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 rounded-3xl border border-amber-400/10 bg-amber-500/[0.04] p-6 sm:p-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mt-1 h-6 w-6 shrink-0 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-bold text-white",
									children: "Please do not send sensitive documents unnecessarily"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-left text-sm leading-7 text-slate-300",
									children: "Do not attach passports, Aadhaar cards, PAN cards, bank statements, passwords, authentication codes, private keys, medical records, or other highly sensitive documents unless they are genuinely necessary for resolving your request and you are authorized to provide them."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-left text-sm leading-7 text-slate-400",
									children: "If you need help with a PDF processing problem, describe the issue first. We may be able to help without receiving the original document."
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
								children: "What happens after you contact us?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullet, { children: "Your request is reviewed by the appropriate support or privacy team." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullet, { children: "We may ask for additional information where necessary to understand or verify the request." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullet, { children: "Privacy requests may require reasonable identity verification." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullet, { children: "We will handle the request according to applicable law and our Privacy Policy." })
								]
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-5 w-5 shrink-0 text-slate-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-left text-xs leading-6 text-slate-500",
								children: "PDFVerse handles privacy and personal-data requests according to applicable law and its Privacy Policy. References to the Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025 are subject to the provisions and commencement dates applicable at the relevant time."
							})]
						})
					})
				]
			})
		})]
	});
}
function InfoPanel({ icon, title, description }) {
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
function LegalLink({ href, icon, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: href,
		className: "flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-red-400/20 hover:bg-red-500/[0.04] hover:text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-red-400",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title })]
	});
}
function RequestCard({ title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-semibold text-white",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-6 text-slate-400",
			children: description
		})]
	});
}
function Bullet({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex gap-3 text-left text-sm leading-7 text-slate-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-1 h-4 w-4 shrink-0 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children })]
	});
}
//#endregion
export { ContactPage as component };

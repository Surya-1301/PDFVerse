import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // ============================================================
    // READ REQUEST
    // ============================================================

    const body = await request.json();

    console.log("PDFVerse abuse report received:", {
      name: body?.name,
      email: body?.email,
      category: body?.category,
      url: body?.url,
      subject: body?.subject,
    });

    const {
      name,
      email,
      category,
      url,
      subject,
      description,
    } = body;

    // ============================================================
    // VALIDATION
    // ============================================================

    if (!name?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Name is required.",
        },
        { status: 400 }
      );
    }

    if (!email?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Email address is required.",
        },
        { status: 400 }
      );
    }

    if (!category?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Report category is required.",
        },
        { status: 400 }
      );
    }

    if (!url?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Reported URL is required.",
        },
        { status: 400 }
      );
    }

    if (!description?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Report details are required.",
        },
        { status: 400 }
      );
    }

    // ============================================================
    // EMAIL VALIDATION
    // ============================================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // ============================================================
    // URL VALIDATION
    // ============================================================

    try {
      new URL(url.trim());
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid URL.",
        },
        { status: 400 }
      );
    }

    // ============================================================
    // ENVIRONMENT VARIABLES
    // ============================================================

    if (!process.env.RESEND_API_KEY) {
      console.error(
        "ERROR: RESEND_API_KEY is missing."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Email service is not configured. RESEND_API_KEY is missing.",
        },
        { status: 500 }
      );
    }

    if (!process.env.SENDER_EMAIL) {
      console.error(
        "ERROR: SENDER_EMAIL is missing."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Sender email is not configured.",
        },
        { status: 500 }
      );
    }

    if (!process.env.ABUSE_EMAIL) {
      console.error(
        "ERROR: ABUSE_EMAIL is missing."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "ABUSE_EMAIL is not configured.",
        },
        { status: 500 }
      );
    }

    // ============================================================
    // LOG CONFIGURATION
    // ============================================================

    console.log("PDFVerse abuse email configuration:", {
      sender: process.env.SENDER_EMAIL,
      recipient: process.env.ABUSE_EMAIL,
      hasApiKey: !!process.env.RESEND_API_KEY,
    });

    // ============================================================
    // LOGO URL
    // ============================================================

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";
      "https://pdfverse.pages.dev/";

    const logoUrl = `https://pdfverse.pages.dev/logo.png`;

    // ============================================================
    // EMAIL SUBJECT
    // ============================================================

    const emailSubject =
      subject?.trim()
        ? `${subject.trim()}`
        : `${category.trim()}`;

    // ============================================================
    // SEND EMAIL
    // ============================================================

    console.log("Sending abuse report email...");

    const result = await resend.emails.send({
      from: `PDFVerse (All-in-One PDF Editor) <${process.env.SENDER_EMAIL}>`,

      to: [process.env.ABUSE_EMAIL],

      replyTo: email.trim(),

      subject: emailSubject,

      html: `
<!DOCTYPE html>

<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >
  <title>PDFVerse Abuse Report</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f1f5f9;
    font-family:Arial, Helvetica, sans-serif;
    color:#0f172a;
  "
>

  <div
    style="
      width:100%;
      padding:40px 16px;
      box-sizing:border-box;
    "
  >

    <div
      style="
        max-width:760px;
        margin:0 auto;
      "
    >

      <!-- ================================================== -->
      <!-- HEADER                                             -->
      <!-- ================================================== -->

      <div
        style="
          background:#020617;
          border-radius:24px;
          padding:36px 40px;
        "
      >

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="border-collapse:collapse;"
        >

          <tr>

            <td
              width="90"
              valign="middle"
              style="
                width:90px;
                padding-right:20px;
              "
            >

              <img
                src="${logoUrl}"
                alt="PDFVerse"
                width="76"
                height="76"
                style="
                  display:block;
                  width:76px;
                  height:76px;
                  border:0;
                  outline:none;
                  object-fit:contain;
                "
              >

            </td>

            <td valign="middle">

              <div
                style="
                  font-size:32px;
                  line-height:38px;
                  font-weight:700;
                  color:#ffffff;
                "
              >
                PDFVerse
              </div>

              <div
                style="
                  margin-top:6px;
                  font-size:16px;
                  line-height:24px;
                  color:#94a3b8;
                "
              >
                All-in-One PDF Editor
              </div>

            </td>

          </tr>

        </table>

        <div
          style="
            height:1px;
            background:#1e293b;
            margin-top:30px;
          "
        ></div>

      </div>


      <!-- ================================================== -->
      <!-- REPORT DETAILS                                     -->
      <!-- ================================================== -->

      <div
        style="
          margin-top:20px;
          background:#ffffff;
          border:1px solid #e2e8f0;
          border-radius:20px;
          padding:32px;
        "
      >

        <div
          style="
            font-size:22px;
            line-height:30px;
            font-weight:700;
            margin-bottom:26px;
          "
        >
          Abuse Report
        </div>


        <!-- Reporter -->

        <div style="margin-bottom:20px;">

          <div
            style="
              font-size:12px;
              font-weight:700;
              text-transform:uppercase;
              letter-spacing:.8px;
              color:#64748b;
              margin-bottom:6px;
            "
          >
            Reporter
          </div>

          <div
            style="
              font-size:15px;
              line-height:24px;
            "
          >
            ${escapeHtml(name)}
          </div>

        </div>


        <!-- Email -->

        <div style="margin-bottom:20px;">

          <div
            style="
              font-size:12px;
              font-weight:700;
              text-transform:uppercase;
              letter-spacing:.8px;
              color:#64748b;
              margin-bottom:6px;
            "
          >
            Reporter Email
          </div>

          <div
            style="
              font-size:15px;
              line-height:24px;
            "
          >
            ${escapeHtml(email)}
          </div>

        </div>


        <!-- Category -->

        <div style="margin-bottom:20px;">

          <div
            style="
              font-size:12px;
              font-weight:700;
              text-transform:uppercase;
              letter-spacing:.8px;
              color:#64748b;
              margin-bottom:6px;
            "
          >
            Report Category
          </div>

          <div
            style="
              font-size:15px;
              line-height:24px;
            "
          >
            ${escapeHtml(category)}
          </div>

        </div>


        <!-- URL -->

        <div style="margin-bottom:20px;">

          <div
            style="
              font-size:12px;
              font-weight:700;
              text-transform:uppercase;
              letter-spacing:.8px;
              color:#64748b;
              margin-bottom:6px;
            "
          >
            Reported URL
          </div>

          <div
            style="
              font-size:15px;
              line-height:24px;
              word-break:break-all;
            "
          >
            ${escapeHtml(url)}
          </div>

        </div>


        <!-- Subject -->

        ${
          subject?.trim()
            ? `
        <div>

          <div
            style="
              font-size:12px;
              font-weight:700;
              text-transform:uppercase;
              letter-spacing:.8px;
              color:#64748b;
              margin-bottom:6px;
            "
          >
            Subject
          </div>

          <div
            style="
              font-size:15px;
              line-height:24px;
            "
          >
            ${escapeHtml(subject)}
          </div>

        </div>
        `
            : ""
        }

      </div>


      <!-- ================================================== -->
      <!-- DESCRIPTION                                       -->
      <!-- ================================================== -->

      <div
        style="
          margin-top:20px;
          background:#ffffff;
          border:1px solid #e2e8f0;
          border-radius:20px;
          padding:32px;
        "
      >

        <div
          style="
            font-size:21px;
            line-height:29px;
            font-weight:700;
            margin-bottom:18px;
          "
        >
          Report Details
        </div>

        <div
          style="
            background:#f8fafc;
            border:1px solid #e2e8f0;
            border-radius:14px;
            padding:20px;
            font-size:15px;
            line-height:26px;
            color:#334155;
            white-space:pre-wrap;
            word-break:break-word;
          "
        >
          ${escapeHtml(description)}
        </div>

      </div>


      <!-- ================================================== -->
      <!-- FOOTER                                             -->
      <!-- ================================================== -->

      <div
        style="
          text-align:center;
          padding:28px 16px 10px;
        "
      >
        <div
          style="
            margin-top:12px;
            font-size:11px;
            line-height:18px;
            color:#94a3b8;
          "
        >
          This email was submitted through the PDFVerse
          Report Abuse page.
        </div>

      </div>

    </div>

  </div>

</body>

</html>
      `,
    });

    // ============================================================
    // RESEND RESULT
    // ============================================================

    if (result.error) {
      console.error(
        "RESEND ABUSE REPORT ERROR:",
        result.error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            result.error.message ||
            "Resend could not send the abuse report.",
        },
        { status: 500 }
      );
    }

    console.log(
      "PDFVerse abuse report sent successfully:",
      result.data?.id
    );

    // ============================================================
    // SUCCESS
    // ============================================================

    return NextResponse.json({
      success: true,
      message:
        "Your abuse report has been submitted successfully.",
      id: result.data?.id,
    });

  } catch (error) {
    // ============================================================
    // IMPORTANT DEBUGGING
    // ============================================================

    console.error(
      "PDFVerse abuse API exception:",
      error
    );

    const errorMessage =
      error instanceof Error
        ? error.message
        : String(error);

    return NextResponse.json(
      {
        success: false,
        message:
          `Something went wrong while submitting your report: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}


// ================================================================
// HTML ESCAPE
// ================================================================

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
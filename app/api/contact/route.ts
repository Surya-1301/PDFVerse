import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      type,
      subject,
      message,
    } = body;

    // ============================================================
    // VALIDATION
    // ============================================================

    if (!name || !email || !type || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    // ============================================================
    // ENVIRONMENT CHECK
    // ============================================================

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing.");

      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    if (!process.env.CONTACT_EMAIL) {
      console.error("CONTACT_EMAIL is missing.");

      return NextResponse.json(
        {
          success: false,
          message: "Contact email is not configured.",
        },
        { status: 500 }
      );
    }

    if (!process.env.SENDER_EMAIL) {
      console.error("SENDER_EMAIL is missing.");

      return NextResponse.json(
        {
          success: false,
          message: "Sender email is not configured.",
        },
        { status: 500 }
      );
    }

    // ============================================================
    // LOGO
    // ============================================================

   
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";
      "https://pdfverse.pages.dev/";


    const logoUrl = `https://pdfverse.pages.dev/logo.png`;

    // ============================================================
    // SEND EMAIL
    // ============================================================

    const { data, error } = await resend.emails.send({

      from: `PDFVerse (All-in-One PDF Editor) <${process.env.SENDER_EMAIL}>`,

      // Your receiving email
      to: [process.env.CONTACT_EMAIL],

      replyTo: email,

      subject: `${subject}`,

      html: `
<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>PDFVerse</title>

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

  <!-- ========================================================= -->
  <!-- PAGE WRAPPER                                               -->
  <!-- ========================================================= -->

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

      <!-- ===================================================== -->
      <!-- PDFVERSE BRAND HEADER                                  -->
      <!-- ===================================================== -->

      <div
        style="
          background:#020617;
          border-radius:24px;
          padding:38px 40px;
          box-sizing:border-box;
        "
      >

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            border-collapse:collapse;
          "
        >

          <tr>

            <!-- ================================================= -->
            <!-- LOGO                                               -->
            <!-- ================================================= -->

            <td
              width="90"
              valign="middle"
              style="
                padding-right:20px;
              "
            >

              <img
                src="${logoUrl}"
                alt="PDFVerse"
                width="78"
                height="78"
                style="
                  display:block;
                  width:78px;
                  height:78px;
                  object-fit:contain;
                  border:0;
                  outline:none;
                  text-decoration:none;
                "
              />

            </td>


            <!-- ================================================= -->
            <!-- BRAND NAME                                         -->
            <!-- ================================================= -->

            <td
              valign="middle"
            >

              <div
                style="
                  font-size:32px;
                  line-height:38px;
                  font-weight:700;
                  letter-spacing:-0.7px;
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


        <!-- ===================================================== -->
        <!-- DIVIDER                                                -->
        <!-- ===================================================== -->

        <div
          style="
            height:1px;
            background:#1e293b;
            margin-top:30px;
          "
        ></div>

      </div>


      <!-- ===================================================== -->
      <!-- CONTACT DETAILS                                        -->
      <!-- ===================================================== -->

      <div
        style="
          margin-top:20px;
          background:#ffffff;
          border:1px solid #e2e8f0;
          border-radius:20px;
          padding:32px;
          box-sizing:border-box;
        "
      >

        <div
          style="
            font-size:21px;
            line-height:29px;
            font-weight:700;
            color:#0f172a;
            margin-bottom:26px;
          "
        >
          Contact Details
        </div>


        <!-- =================================================== -->
        <!-- NAME                                                  -->
        <!-- =================================================== -->

        <div
          style="
            margin-bottom:20px;
          "
        >

          <div
            style="
              font-size:12px;
              line-height:18px;
              font-weight:700;
              text-transform:uppercase;
              letter-spacing:0.8px;
              color:#64748b;
              margin-bottom:6px;
            "
          >
            Name
          </div>

          <div
            style="
              font-size:15px;
              line-height:24px;
              color:#0f172a;
            "
          >
            ${escapeHtml(name)}
          </div>

        </div>


        <!-- =================================================== -->
        <!-- EMAIL                                                 -->
        <!-- =================================================== -->

        <div
          style="
            margin-bottom:20px;
          "
        >

          <div
            style="
              font-size:12px;
              line-height:18px;
              font-weight:700;
              text-transform:uppercase;
              letter-spacing:0.8px;
              color:#64748b;
              margin-bottom:6px;
            "
          >
            Email
          </div>

          <div
            style="
              font-size:15px;
              line-height:24px;
              color:#0f172a;
            "
          >
            ${escapeHtml(email)}
          </div>

        </div>


        <!-- =================================================== -->
        <!-- REQUEST TYPE                                          -->
        <!-- =================================================== -->

        <div
          style="
            margin-bottom:20px;
          "
        >

          <div
            style="
              font-size:12px;
              line-height:18px;
              font-weight:700;
              text-transform:uppercase;
              letter-spacing:0.8px;
              color:#64748b;
              margin-bottom:6px;
            "
          >
            Request Type
          </div>

          <div
            style="
              font-size:15px;
              line-height:24px;
              color:#0f172a;
            "
          >
            ${escapeHtml(type)}
          </div>

        </div>


        <!-- =================================================== -->
        <!-- SUBJECT                                               -->
        <!-- =================================================== -->

        <div>

          <div
            style="
              font-size:12px;
              line-height:18px;
              font-weight:700;
              text-transform:uppercase;
              letter-spacing:0.8px;
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
              color:#0f172a;
            "
          >
            ${escapeHtml(subject)}
          </div>

        </div>

      </div>


      <!-- ===================================================== -->
      <!-- MESSAGE                                                -->
      <!-- ===================================================== -->

      <div
        style="
          margin-top:20px;
          background:#ffffff;
          border:1px solid #e2e8f0;
          border-radius:20px;
          padding:32px;
          box-sizing:border-box;
        "
      >

        <div
          style="
            font-size:21px;
            line-height:29px;
            font-weight:700;
            color:#0f172a;
            margin-bottom:18px;
          "
        >
          Message
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
          ${escapeHtml(message)}
        </div>

      </div>


      <!-- ===================================================== -->
      <!-- FOOTER                                                 -->
      <!-- ===================================================== -->

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
          Contact page.
        </div>

      </div>

    </div>

  </div>

</body>

</html>
      `,
    });

    // ============================================================
    // RESEND ERROR
    // ============================================================

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to send your message right now. Please try again later.",
        },
        { status: 500 }
      );
    }

    // ============================================================
    // SUCCESS
    // ============================================================

    console.log(
      "PDFVerse contact email sent successfully:",
      data?.id
    );

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully.",
    });

  } catch (error) {
    console.error(
      "PDFVerse Contact API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while sending your message.",
      },
      { status: 500 }
    );
  }
}


// ================================================================
// HTML ESCAPE
// ================================================================

function escapeHtml(value: unknown) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
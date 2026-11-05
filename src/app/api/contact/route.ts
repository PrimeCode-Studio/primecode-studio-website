import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ---------------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------------- */

/** Escapes a value for safe interpolation into an HTML email body. */
function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Collapses whitespace and trims control characters used for header abuse. */
function clean(value: unknown, max = 200): string {
  return String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, max);
}

/* ---------------------------------------------------------------------------
   Naive in-memory rate limiter.
   Works for a single instance; swap for Upstash/Redis if you scale out.
   ------------------------------------------------------------------------- */

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // per IP per window

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  bucket.count += 1;

  if (buckets.size > 5000) {
    for (const [key, value] of buckets) {
      if (now > value.resetAt) buckets.delete(key);
    }
  }

  return bucket.count > MAX_REQUESTS;
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many messages sent. Please try again later.",
        },
        { status: 429, headers: { "Retry-After": "3600" } },
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 },
      );
    }

    const { honeypot } = body;

    // Honeypot field — bots fill hidden fields, humans don't.
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    const name = clean(body.name, 120);
    const email = clean(body.email, 200);
    const subject = clean(body.subject, 160);
    const message = String(body.message ?? "").trim().slice(0, 5000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
      console.error("Missing SMTP environment variables for contact form.");
      return NextResponse.json(
        {
          success: false,
          error:
            "Email service is not configured yet. Please try again later.",
        },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

  await transporter.verify();
  console.log("✅ SMTP Connected");

const info = await transporter.sendMail({
  from: `"PrimeCodeStudio Website" <${SMTP_USER}>`,
  to: CONTACT_TO_EMAIL,
  replyTo: email,
  subject: `New inquiry: ${subject || "General Contact"} — ${name}`,
  text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
  html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PrimeCodeStudio</title>
</head>

<body style="margin:0;padding:20px;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center">

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
border="0"
style="
max-width:650px;
background:#ffffff;
border-radius:16px;
overflow:hidden;
box-shadow:0 10px 30px rgba(0,0,0,.08);
">

<tr>
<td
style="
padding:40px 25px;
background:#2563eb;
background:linear-gradient(135deg,#2563eb,#3b82f6);
text-align:center;
color:#ffffff;
">

<h1
style="
margin:0;
font-size:32px;
font-weight:700;
">
🚀 PrimeCodeStudio
</h1>

<p
style="
margin:12px 0 0;
font-size:16px;
opacity:.95;
">
New Contact Form Submission
</p>

</td>
</tr>

<tr>
<td style="padding:30px 25px;">

<p
style="
margin:0 0 25px;
font-size:16px;
line-height:1.7;
color:#374151;
">
You have received a new inquiry from your website.
</p>

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
border="0"
style="
border-collapse:collapse;
font-size:15px;
">

<tr>
<td
style="
padding:14px;
background:#f8fafc;
font-weight:bold;
width:140px;
border:1px solid #e5e7eb;
">
Name
</td>

<td
style="
padding:14px;
border:1px solid #e5e7eb;
">
${escapeHtml(name)}
</td>
</tr>

<tr>

<td
style="
padding:14px;
background:#f8fafc;
font-weight:bold;
border:1px solid #e5e7eb;
">
Email
</td>

<td
style="
padding:14px;
border:1px solid #e5e7eb;
word-break:break-word;
">
${escapeHtml(email)}
</td>

</tr>

<tr>

<td
style="
padding:14px;
background:#f8fafc;
font-weight:bold;
border:1px solid #e5e7eb;
">
Subject
</td>

<td
style="
padding:14px;
border:1px solid #e5e7eb;
">
${escapeHtml(subject || "General Inquiry")}
</td>

</tr>

</table>

<div
style="
margin-top:30px;
padding:22px;
background:#f8fafc;
border-left:4px solid #2563eb;
border-radius:10px;
">

<h3
style="
margin-top:0;
margin-bottom:15px;
color:#2563eb;
font-size:18px;
">
Message
</h3>

<p
style="
margin:0;
line-height:1.8;
color:#374151;
white-space:pre-line;
word-break:break-word;
">
${escapeHtml(message)}
</p>

</div>

</td>
</tr>

<tr>

<td
style="
padding:30px;
background:#111827;
text-align:center;
">

<p
style="
margin:0;
color:#ffffff;
font-size:18px;
font-weight:bold;
">
PrimeCodeStudio
</p>

<p
style="
margin:10px 0 0;
color:#cbd5e1;
font-size:14px;
line-height:1.7;
">
Building modern websites, AI solutions & software.
</p>

<p
style="
margin-top:18px;
color:#94a3b8;
font-size:13px;
">
© ${new Date().getFullYear()} PrimeCodeStudio. All rights reserved.
</p>

</td>

</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`,
});

console.log("✅ Email sent:", info);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

// ======================================================
// SMTP Transport
// ======================================================

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ======================================================
// Verify SMTP Connection
// ======================================================

transporter.verify((error) => {
  if (error) {
    console.error("SMTP Error:", error.message);
  } else {
    console.log("✅ SMTP Ready");
  }
});

// ======================================================
// Send Email
// ======================================================

export const sendEmail = async (to, subject, text) => {
  try {
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:10px">
        
        <h2 style="color:#4F46E5;text-align:center;">
          CodeNexus
        </h2>

        <p>Hello,</p>

        <p>${text.replace(/\n/g, "<br>")}</p>

        <hr>

        <p style="font-size:12px;color:gray;">
          This is an automated email from CodeNexus.
          Please do not reply to this email.
        </p>

      </div>
    `;

    const info = await transporter.sendMail({
      from: `"CodeNexus" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("📧 Email Sent:", info.response);

    return info;

  } catch (error) {
    console.error("Email Error:", error.message);
    throw error;
  }
};
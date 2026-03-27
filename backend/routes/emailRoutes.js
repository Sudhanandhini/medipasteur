const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/* ── Contact Form ── */
router.post("/contact", async (req, res) => {
  const { name, email, phone, specialty, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const transporter = createTransport();
    await transporter.sendMail({
      from: `"MediPasteur Website" <${process.env.SMTP_USER}>`,
      to: "support@sunsys.in",
      replyTo: email,
      subject: `[Contact] ${subject} — ${name}`,
      html: `
        <h2 style="color:#384a72">New Contact Enquiry</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:8px 12px;background:#f5f7fa;font-weight:600;width:160px">Name</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${name}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f7fa;font-weight:600">Email</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${email}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f7fa;font-weight:600">Phone</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${phone || "—"}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f7fa;font-weight:600">Specialty</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${specialty || "—"}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f7fa;font-weight:600">Subject</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${subject}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f7fa;font-weight:600;vertical-align:top">Message</td><td style="padding:8px 12px;white-space:pre-wrap">${message}</td></tr>
        </table>
      `,
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Contact mail error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

/* ── Career / Application Form ── */
router.post("/apply", (req, res, next) => {
  upload.single("resume")(req, res, (err) => {
    if (err) {
      const msg = err.code === "LIMIT_FILE_SIZE"
        ? "File too large. Maximum size is 20MB."
        : "File upload error: " + err.message;
      return res.status(400).json({ error: msg });
    }
    next();
  });
}, async (req, res) => {
  const { name, email, phone, role, exp, message } = req.body;
  if (!name || !email || !phone || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const attachments = [];
  if (req.file) {
    attachments.push({
      filename: req.file.originalname,
      content: req.file.buffer,
      contentType: req.file.mimetype,
    });
  }

  try {
    const transporter = createTransport();
    await transporter.sendMail({
      from: `"MediPasteur Careers" <${process.env.SMTP_USER}>`,
      to: "support@sunsys.in",
      replyTo: email,
      subject: `[Application] ${role} — ${name}`,
      html: `
        <h2 style="color:#384a72">New Job Application</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:8px 12px;background:#f5f7fa;font-weight:600;width:160px">Name</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${name}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f7fa;font-weight:600">Email</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${email}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f7fa;font-weight:600">Phone</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${phone}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f7fa;font-weight:600">Position</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${role}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f7fa;font-weight:600">Experience</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${exp || "—"}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f7fa;font-weight:600;vertical-align:top">Cover Note</td><td style="padding:8px 12px;white-space:pre-wrap">${message || "—"}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f7fa;font-weight:600">Resume</td><td style="padding:8px 12px">${req.file ? req.file.originalname : "Not attached"}</td></tr>
        </table>
      `,
      attachments,
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Apply mail error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;

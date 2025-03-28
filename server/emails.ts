import nodemailer from "nodemailer";
import { ContactFormData } from "@shared/schema";

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || "",
  },
});

export async function sendContactEmail(formData: ContactFormData): Promise<void> {
  const { name, email, subject, message } = formData;

  // Send email to site administrator
  const adminMailOptions = {
    from: process.env.EMAIL_FROM || "website@ardmir-shpk.com",
    to: process.env.EMAIL_TO || "info@ardmir-shpk.com",
    subject: `New contact form submission: ${subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  };

  // Send confirmation email to the user
  const userMailOptions = {
    from: process.env.EMAIL_FROM || "noreply@ardmir-shpk.com",
    to: email,
    subject: "Thank you for contacting Ardmir Shpk",
    html: `
      <h2>Thank you for contacting Ardmir Shpk</h2>
      <p>Dear ${name},</p>
      <p>We have received your message regarding "${subject}".</p>
      <p>Our team will review your inquiry and get back to you as soon as possible.</p>
      <p>Thank you for your interest in our services.</p>
      <br>
      <p>Best regards,</p>
      <p>Ardmir Shpk Team</p>
    `,
  };

  try {
    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);
    console.log(`Contact form email sent successfully for ${email}`);
  } catch (error) {
    console.error("Error sending contact form email:", error);
    throw new Error("Failed to send email");
  }
}

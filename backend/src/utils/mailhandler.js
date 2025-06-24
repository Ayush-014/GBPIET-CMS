const nodemailer = require("nodemailer");
const { ServerConfig } = require("../config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ServerConfig.GMAIL_USER,
    pass: ServerConfig.GMAIL_PASS,
  },
});

const sendResetPasswordEmail = async ({ to, name, resetURL }) => {
  try {
    await transporter.sendMail({
      from: `"College CMS" <${ServerConfig.GMAIL_USER}>`,
      to,
      subject: "🔐 Reset Your Password - College CMS",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #d0d7de; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0d6efd; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Password Reset Request</h1>
            <p style="margin: 5px 0;">Secure Your Account</p>
          </div>

          <div style="padding: 20px; color: #333;">
            <p>Hi <strong>${name}</strong>,</p>
            <p>We received a request to reset your password. Click the button below to reset it:</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetURL}" style="background-color: #0d6efd; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                Reset Password
              </a>
            </div>

            <p>If you didn’t request this, you can safely ignore this email. Your password won’t change until you access the link above and set a new one.</p>

            <p style="margin-top: 40px; font-size: 14px; color: #666;">
              This link will expire in 10 minutes for your security.
            </p>

            <p style="font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 15px; margin-top: 40px;">
              College CMS Team<br>
              (This is an automated email — please do not reply.)
            </p>
          </div>
        </div>
      `,
    });

    console.log(`✅ Reset password email sent to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send reset password email:", error);
    throw error;
  }
};

module.exports = sendResetPasswordEmail;

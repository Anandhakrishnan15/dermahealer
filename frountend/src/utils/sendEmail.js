import nodemailer from "nodemailer";

export async function sendEmail({ to, cc, bcc, subject, html }) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `"Booking Summary" <${process.env.EMAIL_USER}>`,
            to,
            cc,
            bcc,
            subject,
            html,
        });

        console.log(`✅ Email sent: ${info.messageId} to ${to}`);
        return true;
    } catch (err) {
        console.error(`❌ Failed to send email to ${to}:`, err);
        return false;
    }
}

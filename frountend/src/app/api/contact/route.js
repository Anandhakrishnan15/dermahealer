import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { name, email, phone, enquiryType, message } = await req.json();

        if (!name || !email || !phone || !enquiryType || !message) {
            return new Response(
                JSON.stringify({ error: "Missing fields" }),
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email to YOU
        await transporter.sendMail({
            from: `"Website Enquiry" <${process.env.EMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            replyTo: email,
            subject: `New Enquiry: ${enquiryType}`,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Type:</strong> ${enquiryType}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        // Auto-reply to CLIENT
        await transporter.sendMail({
            from: `"Derma Healer India" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "We received your enquiry",
            html: `
        <p>Hi ${name},</p>
        <p>Thank you for contacting Derma Healer India.</p>
        <p>Our team will get back to you shortly.</p>
        <br />
        <p>Regards,<br/>Derma Healer India</p>
      `,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: "Email failed" }),
            { status: 500 }
        );
    }
}

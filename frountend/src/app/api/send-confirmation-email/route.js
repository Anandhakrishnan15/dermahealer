import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { email, name, doctor, date, time, orderId, amount } = await req.json();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Appointment Confirmation",
            html: `
                <h2>Payment Successful 🎉</h2>
                <p>Dear ${name}, your appointment is confirmed.</p>
                
                <p><strong>Doctor:</strong> ${doctor}<br/>
                <strong>Date:</strong> ${date} at ${time}<br/>
                <strong>Order ID:</strong> ${orderId}<br/>
                <strong>Amount Paid:</strong> ₹${amount}</p>

                <p>Thank you for booking with us!</p>
            `,
        });

        return Response.json({ success: true });
    } catch (err) {
        console.error("Email Error:", err);
        return Response.json({ error: "Failed to send email" }, { status: 500 });
    }
}

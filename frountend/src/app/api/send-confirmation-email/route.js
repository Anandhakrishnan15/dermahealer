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
        // Advance fee message
        let advanceMessage = "";

        if (doctor === "Dr. Neha Rani") {
            advanceMessage = `
                <p style="color:#b45309; font-weight:bold; margin-top:10px;">
                    This amount is the advance booking fee. You have to pay ₹350 on arrival at the clinic.
                </p>
            `;
        } else if (doctor === "Dr. B.K. Sharma") {
            advanceMessage = `
                <p style="color:#b45309; font-weight:bold; margin-top:10px;">
                    This amount is the advance booking fee. You have to pay ₹600 on arrival at the clinic.
                </p>
            `;
        }
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Appointment Confirmation",
            html: `
        <div style="font-family: Arial, sans-serif; color:#333; line-height:1.6;">
            <h2 style="color:#2c7be5;">Payment Successful 🎉</h2>

            <p>Dear <strong>${name}</strong>,</p>

            <p>
                Thank you for your payment. We are pleased to confirm that your
                appointment has been successfully booked. Please find the details below:
            </p>

            <table style="border-collapse: collapse; margin: 16px 0;">
                <tr>
                    <td><strong>Doctor</strong></td>
                    <td style="padding-left:12px;">${doctor}</td>
                </tr>
                <tr>
                    <td><strong>Date & Time</strong></td>
                    <td style="padding-left:12px;">${date} at ${time}</td>
                </tr>
                <tr>
                    <td><strong>Order ID</strong></td>
                    <td style="padding-left:12px;">${orderId}</td>
                </tr>a
                <tr>
                    <td><strong>Amount Paid</strong></td>
                    <td style="padding-left:12px;">₹${amount}</td>
                </tr>
            </table>

            <hr style="margin:20px 0;" />

            <h3>Important Instructions</h3>
            <ul>
                <li>Please arrive at least <strong>10–15 minutes early</strong> for your appointment.</li>
                <li>Please be on time for your scheduled slot.</li>
                <li>Due to patient flow and consultation time variations, you may have to wait approximately <strong>30 minutes to 1 hour</strong>.</li>
                <li>If you miss your assigned slot, you will need to wait until the next available slot, similar to other patients.</li>
                <li>Carry any relevant medical reports or prescriptions.</li>
            </ul>
            ${advanceMessage}

            <h3>Terms & Conditions</h3>
            <ul>
                <li>Appointments booked online are <strong>non-refundable</strong>.</li>
                <li>Once confirmed, the appointment date and time <strong>cannot be postponed or rescheduled</strong>.</li>
                <li>No refunds will be provided for late arrivals or no-shows.</li>
                <li>Appointments are subject to doctor availability.</li>
            </ul>

            <h3>Need Help?</h3>
            <p>
                If you require any assistance or have questions regarding your appointment,
                please contact our support team:
            </p>
            <p>
                📧 Email: <a href="mailto:dermahealerindia@gmail.com">dermahealerindia@gmail.com</a><br/>
                📞 Phone: +91-9693601499, +91 9931766933
            </p>

            <p>
                Thank you for choosing <strong>Derma Healer India</strong>.
                We look forward to serving you.
            </p>

            <p style="margin-top:24px;">
                Warm regards,<br/>
                <strong>Derma Healer India</strong><br/>
                Customer Support Team
            </p>

            <p style="font-size:12px; color:#777; margin-top:20px;">
                This is an automated email. Please do not reply to this message.
            </p>
        </div>
    `,
        });

        return Response.json({ success: true });
    } catch (err) {
        console.error("Email Error:", err);
        return Response.json({ error: "Failed to send email" }, { status: 500 });
    }
}

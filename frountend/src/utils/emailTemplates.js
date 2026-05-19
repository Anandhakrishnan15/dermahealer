// utils/emailTemplates.js

export function followUpConfirmationTemplate({ name, doctor, date, time, advanceFee, status, isUpdate = false }) {
  // const advanceMessage = advanceFee
  //   ? `<p style="color:#b45309; font-weight:bold; margin-top:10px;">
  //            This amount is the advance booking fee. Please pay ₹${advanceFee} on arrival at the clinic.
  //          </p>`
  //   : "";

  const header = isUpdate
    ? "Follow-Up Updated 🔄"
    : "Follow-Up Confirmation 🎉";

  const introMessage = isUpdate
    ? `<p>Dear <strong>${name}</strong>,</p>
           <p>Your follow-up appointment has been updated. Please find the latest details below:</p>`
    : `<p>Dear <strong>${name}</strong>,</p>
           <p>Your follow-up appointment has been successfully scheduled. Please find the details below:</p>`;

  const statusMessage = status ? `<p><strong>Status:</strong> ${status}</p>` : "";

  return `
      <div style="font-family: Arial, sans-serif; color:#333; line-height:1.6;">
        <h2 style="color:#2c7be5;">${header}</h2>
        ${introMessage}

        <table style="border-collapse: collapse; margin: 16px 0;">
          <tr>
            <td><strong>Doctor</strong></td>
            <td style="padding-left:12px;">${doctor}</td>
          </tr>
          <tr>
            <td><strong>Date & Time</strong></td>
            <td style="padding-left:12px;">${new Date(date).toDateString()} at ${time}</td>
          </tr>
        </table>

        ${statusMessage}

        <h3>Important Instructions</h3>
        <ul>
          <li>Please arrive at least <strong>10–15 minutes early</strong> for your follow-up.</li>
          <li>Carry any relevant reports or prescriptions.</li>
          <li>Follow-up timings may vary slightly based on patient flow.</li>
        </ul>

        <p style="margin-top:24px;">Warm regards,<br/><strong>Derma Healer</strong><br/>Customer Support Team</p>

        <p style="font-size:12px; color:#777; margin-top:20px;">This is an automated email. Please do not reply.</p>
      </div>
    `;
}

export const followUpReminderTemplate = ({ name, doctor, date, time }) => {
  return `
        <h2>Appointment Reminder</h2>
        <p>Hello ${name},</p>

        <p>This is a reminder for your follow-up appointment.</p>

        <p><b>Date:</b> ${new Date(date).toDateString()}</p>
        <p><b>Time:</b> ${time}</p>
        <p><b>Doctor:</b> ${doctor}</p>

        <p>Please arrive 10 minutes early.</p>
    `;
};
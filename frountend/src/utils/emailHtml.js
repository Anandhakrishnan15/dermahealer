// emailHtml.js
export function generateBookingSummaryHtml(doctor, todayCount, tomorrowCount) {
    return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px;">
      <h2 style="color: #1a73e8; margin-bottom: 10px;">📊 Booking Summary for ${doctor}</h2>

      <p>Hello ${doctor},</p>
      <p>Here’s your booking summary for your clinic:</p>

      <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Date</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: center;">Number of Bookings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">Today</td>
            <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-weight: bold; color: #1a73e8;">${todayCount}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">Tomorrow</td>
            <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-weight: bold; color: #1a73e8;">${tomorrowCount}</td>
          </tr>
        </tbody>
      </table>

      <p style="margin-top: 20px;">Have a great day!<br><strong>– Your Clinic Team</strong></p>

      <footer style="margin-top: 30px; font-size: 12px; color: #777;">
        This is an automated message. Please do not reply to this email.
      </footer>
    </div>
  `;
}

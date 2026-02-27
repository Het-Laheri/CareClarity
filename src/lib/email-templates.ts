export const getConfirmationEmailHtml = (name: string, doctorName: string, date: string, time: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; }
    .header { color: #6366f1; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
    .detail-item { margin-bottom: 10px; }
    .footer { margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #eaeaea; padding-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Appointment Confirmed!</div>
    <p>Hi ${name},</p>
    <p>Your appointment has been successfully booked. Here are the details:</p>
    <div class="detail-item"><strong>Doctor:</strong> ${doctorName}</div>
    <div class="detail-item"><strong>Date:</strong> ${date}</div>
    <div class="detail-item"><strong>Time:</strong> ${time}</div>
    <p>Please log in to your dashboard if you need to manage or cancel your appointment.</p>
    <div class="footer">
      This is an automated message from CareClarity. If you didn't expect this, please ignore it.
    </div>
  </div>
</body>
</html>
`;

export const getCancellationEmailHtml = (name: string, doctorName: string, date: string, time: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; }
    .header { color: #ef4444; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
    .detail-item { margin-bottom: 10px; }
    .footer { margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #eaeaea; padding-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Appointment Cancelled</div>
    <p>Hi ${name},</p>
    <p>Your appointment with <strong>${doctorName}</strong> on <strong>${date}</strong> at <strong>${time}</strong> has been cancelled.</p>
    <p>If you need to book a new appointment, please visit the CareClarity dashboard.</p>
    <div class="footer">
      This is an automated message from CareClarity.
    </div>
  </div>
</body>
</html>
`;

export const getLoginNotificationEmailHtml = (name: string, browser: string, time: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; }
    .header { color: #6366f1; font-size: 20px; font-weight: bold; margin-bottom: 20px; }
    .footer { margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #eaeaea; padding-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">New Login Detected</div>
    <p>Hi ${name},</p>
    <p>We noticed a new login to your CareClarity account.</p>
    <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
      <div><strong>Time:</strong> ${time}</div>
      <div><strong>Device/Browser:</strong> ${browser}</div>
    </div>
    <p>If this was you, you can safely ignore this email. If you don't recognize this activity, please reset your password immediately.</p>
    <div class="footer">
      This is a security notification from CareClarity.
    </div>
  </div>
</body>
</html>
`;

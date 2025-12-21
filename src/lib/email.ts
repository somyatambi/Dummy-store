import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@timelessluxury.com',
      to,
      subject,
      html,
      text,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Lato', Arial, sans-serif; line-height: 1.6; color: #111111; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #111111; color: #FDFBF5; padding: 30px; text-align: center; }
          .header h1 { font-family: 'Playfair Display', serif; margin: 0; font-size: 28px; }
          .content { background-color: #FDFBF5; padding: 40px; }
          .button { display: inline-block; background-color: #D4AF37; color: #111111; padding: 15px 40px; text-decoration: none; border-radius: 2px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Timeless Luxury</h1>
          </div>
          <div class="content">
            <h2>Verify Your Email Address</h2>
            <p>Thank you for joining Timeless Luxury. Please verify your email address by clicking the button below:</p>
            <a href="${verificationUrl}" class="button">Verify Email</a>
            <p>If you didn't create an account, you can safely ignore this email.</p>
            <p style="color: #666; font-size: 12px;">Or copy and paste this link: ${verificationUrl}</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Timeless Luxury. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: 'Verify Your Email - Timeless Luxury',
    html,
    text: `Verify your email: ${verificationUrl}`,
  });
}

export async function sendOrderConfirmationEmail(email: string, orderNumber: string, total: number) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Lato', Arial, sans-serif; line-height: 1.6; color: #111111; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #111111; color: #FDFBF5; padding: 30px; text-align: center; }
          .header h1 { font-family: 'Playfair Display', serif; margin: 0; font-size: 28px; }
          .content { background-color: #FDFBF5; padding: 40px; }
          .order-info { background-color: #fff; padding: 20px; margin: 20px 0; border-left: 4px solid #D4AF37; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Timeless Luxury</h1>
          </div>
          <div class="content">
            <h2>Order Confirmation</h2>
            <p>Thank you for your order. We're preparing your luxury items with the utmost care.</p>
            <div class="order-info">
              <p><strong>Order Number:</strong> ${orderNumber}</p>
              <p><strong>Total:</strong> ₹${total.toFixed(2)}</p>
            </div>
            <p>You will receive a shipping confirmation email once your order has been dispatched.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Timeless Luxury. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: `Order Confirmation - ${orderNumber}`,
    html,
    text: `Your order ${orderNumber} has been confirmed. Total: ₹${total.toFixed(2)}`,
  });
}

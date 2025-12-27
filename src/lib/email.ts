import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface InvoiceData {
  userEmail: string;
  userName: string;
  bookingId: string;
  serviceTitle: string;
  totalCost: number;
  durationValue: number;
  durationUnit: string;
  receiptUrl?: string | null;
  bookingDate: Date;
}

export async function sendBookingInvoice(data: InvoiceData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is missing. Skipping email sending.");
    return;
  }

  const {
    userEmail,
    userName,
    bookingId,
    serviceTitle,
    totalCost,
    durationValue,
    durationUnit,
    receiptUrl,
    bookingDate,
  } = data;

  const subject = `Invoice for your booking: ${serviceTitle}`;

  // Simple HTML Template
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #333;">Thank you for your booking, ${userName}!</h2>
      <p>Your booking for <strong>${serviceTitle}</strong> has been confirmed.</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Booking Details</h3>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>Date:</strong> ${bookingDate.toLocaleDateString()}</p>
        <p><strong>Duration:</strong> ${durationValue} ${durationUnit.toLowerCase()}(s)</p>
        <p><strong>Total Cost:</strong> BDT ${totalCost}</p>
      </div>

      ${
        receiptUrl
          ? `<p>You can view your payment receipt <a href="${receiptUrl}" target="_blank">here</a>.</p>`
          : ""
      }

      <p>If you have any questions, please contact our support team.</p>
      <p style="font-size: 12px; color: #888; margin-top: 30px;">Care.xyz - Caregiving Services in Bangladesh</p>
    </div>
  `;

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "Care.xyz <onboarding@resend.dev>", // generic domain for testing, user should configure valid sender
      to: [userEmail],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error("Error sending email:", error);
      return { success: false, error };
    }

    console.log("Email sent successfully:", emailData);
    return { success: true, data: emailData };
  } catch (error) {
    console.error("Exception sending email:", error);
    return { success: false, error };
  }
}

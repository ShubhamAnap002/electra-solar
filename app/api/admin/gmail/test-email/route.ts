import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/gmail";
import { getStoredGmailConfig, saveStoredGmailConfig, recordActivity } from "@/lib/store";
import { getAuthenticatedAdmin } from "@/lib/auth";

export async function POST() {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const config = getStoredGmailConfig();

  if (!config.isConnected) {
    return NextResponse.json(
      {
        success: false,
        message: "Gmail is not connected. Please click 'Connect Gmail' to authorize via Google OAuth first.",
      },
      { status: 400 }
    );
  }

  const recipient = config.recipientEmail || "sales@electrasolar.in";
  const now = new Date();
  const timestampStr = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const htmlBody = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0f172a; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.9; }
          .content { padding: 32px 24px; }
          .badge { display: inline-block; background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; margin-bottom: 20px; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 20px; }
          .row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; border-bottom: 1px dashed #e2e8f0; }
          .row:last-child { border-bottom: none; }
          .label { color: #64748b; font-weight: 500; }
          .value { color: #0f172a; font-weight: 600; text-align: right; }
          .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ELECTRA SOLAR</h1>
            <p>Official Turnkey Distributor of EnerTech UPS Pvt. Ltd.</p>
          </div>
          <div class="content">
            <span class="badge">✓ Google OAuth 2.0 Integration Verified</span>
            <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 12px; color: #0f172a;">Test Email Delivery Successful</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 20px;">
              This diagnostic message confirms that your Electra Solar website is securely integrated with Google Gmail API using Google OAuth 2.0.
              Website customer enquiries submitted through public quote and contact forms will be automatically delivered to this address.
            </p>
            <div class="card">
              <div class="row">
                <span class="label">Connected Gmail Account</span>
                <span class="value">${config.connectedEmail || "Authorized Account"}</span>
              </div>
              <div class="row">
                <span class="label">Destination Recipient</span>
                <span class="value">${recipient}</span>
              </div>
              <div class="row">
                <span class="label">Dispatch Protocol</span>
                <span class="value">Gmail REST API (OAuth 2.0 gmail.send)</span>
              </div>
              <div class="row">
                <span class="label">Test Timestamp</span>
                <span class="value">${timestampStr}</span>
              </div>
            </div>
            <p style="font-size: 12px; color: #64748b; margin: 0;">
              No leads are stored in any database. Customer messages arrive directly in this inbox with one-click visitor Reply-To.
            </p>
          </div>
          <div class="footer">
            Electra Solar • S.No. 38/1, Near Pari Company, Narhe-Dhayari Road, Pune 411041<br/>
            Sales: +91 98224 12345 • Support: support@electrasolar.in
          </div>
        </div>
      </body>
    </html>
  `;

  const textBody = `
ELECTRA SOLAR — Test Email Delivery Successful
Verified: Google OAuth 2.0 Integration Active

This test confirms that your Electra Solar website is connected to Gmail.
Connected Account: ${config.connectedEmail}
Recipient: ${recipient}
Timestamp: ${timestampStr}

No customer submissions are persisted in a database; enquiries are delivered directly to this email address.
  `;

  const result = await sendEmail({
    to: recipient,
    subject: "Electra Solar Test Email | System Verification",
    htmlBody,
    textBody,
  });

  const updatedConfig = getStoredGmailConfig();
  updatedConfig.lastTestedAt = now.toISOString();

  if (result.success) {
    updatedConfig.lastTestStatus = "success";
    updatedConfig.lastTestMessage = `Successfully delivered test email to ${recipient}`;
    saveStoredGmailConfig(updatedConfig);
    recordActivity("Sent Test Email", "Email", `Verified delivery to ${recipient}`, user.username);
    return NextResponse.json({
      success: true,
      message: `Test email sent successfully to ${recipient}!`,
    });
  } else {
    updatedConfig.lastTestStatus = "error";
    updatedConfig.lastTestMessage = result.error || "Failed to deliver test email";
    saveStoredGmailConfig(updatedConfig);
    recordActivity("Test Email Failed", "Email", `Delivery error: ${result.error}`, user.username);
    return NextResponse.json(
      {
        success: false,
        message: result.error || "Failed to send test email through Gmail API.",
      },
      { status: 500 }
    );
  }
}

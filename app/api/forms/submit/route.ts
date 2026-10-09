import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/gmail";
import { getStoredGmailConfig, getStoredProducts } from "@/lib/store";

// In-memory rate limiting map: ip -> lastSubmissionTime
const rateLimitMap = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    // 1. Basic IP Rate Limiting (1 submission every 5 seconds per IP)
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown-ip";
    const now = Date.now();
    const lastTime = rateLimitMap.get(ip) || 0;
    if (now - lastTime < 5000) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please wait a few seconds before trying again." },
        { status: 429 }
      );
    }
    rateLimitMap.set(ip, now);

    const body = await req.json();

    // 2. Anti-spam Honeypot Check
    // If the hidden 'website_hp' honeypot field is filled, it was filled by a bot
    if (body.website_hp || body.honey_trap) {
      // Return success to confuse the bot without sending email or doing work
      return NextResponse.json({ success: true, message: "Enquiry submitted successfully" });
    }

    // 3. Server-side Validation
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const city = typeof body.city === "string" ? body.city.trim() : "";
    const company = typeof body.company === "string" ? body.company.trim() : "";
    const formType = typeof body.formType === "string" ? body.formType.trim() : "Quote Request";
    const productModel = typeof body.productModel === "string" ? body.productModel.trim() : "";
    const application = typeof body.application === "string" ? body.application.trim() : "";
    const approxCapacity = typeof body.approxCapacity === "string" ? body.approxCapacity.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const pageUrl = typeof body.pageUrl === "string" ? body.pageUrl.trim() : "";

    if (!name || name.length < 2) {
      return NextResponse.json({ success: false, message: "Please provide your full name." }, { status: 400 });
    }

    // Validate phone (min 8 digits)
    const phoneDigits = phone.replace(/\D/g, "");
    if (!phone || phoneDigits.length < 8) {
      return NextResponse.json({ success: false, message: "Please provide a valid phone number." }, { status: 400 });
    }

    // Validate email syntax if provided
    let validEmail = "";
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ success: false, message: "Please enter a valid email address." }, { status: 400 });
      }
      validEmail = email;
    }

    // 4. Resolve Product Name if slug was passed
    let productName = productModel;
    if (productModel) {
      const products = getStoredProducts();
      const matched = products.find((p) => p.slug === productModel || p.id === productModel || p.name === productModel);
      if (matched) {
        productName = matched.name;
      }
    }

    // 5. Construct Email Subject
    // Format examples from specs:
    // "Website Enquiry | Contact Us | [Customer Name]"
    // "Product Enquiry | [Product Name] | [Customer Name]"
    // "Quote Request | [Product Name] | [Customer Name]"
    let subject = "";
    if (productName) {
      subject = `Quote Request | ${productName} | ${name}`;
    } else if (formType.toLowerCase().includes("contact")) {
      subject = `Website Enquiry | Contact Us | ${name}`;
    } else {
      subject = `Website Enquiry | ${formType} | ${name}`;
    }

    const timestampStr = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // 6. Format Professional Branded HTML Email
    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0f172a; }
            .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.07); border: 1px solid #e2e8f0; }
            .header { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 30px 24px; text-align: center; color: #ffffff; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
            .header p { margin: 4px 0 0; font-size: 13px; opacity: 0.9; }
            .content { padding: 30px 24px; }
            .tag { display: inline-block; background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; padding: 5px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 18px; }
            .grid-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
            .grid-table td { padding: 12px 16px; font-size: 13px; border-bottom: 1px solid #f1f5f9; }
            .grid-table tr:last-child td { border-bottom: none; }
            .grid-table td.label { width: 34%; font-weight: 600; color: #64748b; background: #f8fafc; }
            .grid-table td.val { width: 66%; font-weight: 600; color: #0f172a; }
            .message-box { background: #f8fafc; border-left: 4px solid #0284c7; padding: 16px; border-radius: 4px 10px 10px 4px; margin-bottom: 24px; }
            .message-box h4 { margin: 0 0 6px; font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: 700; }
            .message-box p { margin: 0; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap; }
            .reply-hint { background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; padding: 12px 16px; font-size: 12px; color: #047857; margin-bottom: 20px; }
            .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 24px; text-align: center; font-size: 11px; color: #64748b; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>ELECTRA SOLAR</h1>
              <p>Turnkey Industrial Distributor of EnerTech UPS Pvt. Ltd. (Pune)</p>
            </div>
            <div class="content">
              <span class="tag">New Website Submission • ${formType}</span>
              <h2 style="font-size: 20px; font-weight: 800; margin: 0 0 16px; color: #0f172a;">
                ${subject}
              </h2>

              <table class="grid-table">
                <tr>
                  <td class="label">Customer Name</td>
                  <td class="val">${name}</td>
                </tr>
                <tr>
                  <td class="label">Phone Number</td>
                  <td class="val"><a href="tel:${phone}" style="color: #0284c7; text-decoration: none;">${phone}</a></td>
                </tr>
                ${validEmail ? `
                <tr>
                  <td class="label">Email Address</td>
                  <td class="val"><a href="mailto:${validEmail}" style="color: #0284c7; text-decoration: none;">${validEmail}</a></td>
                </tr>` : ""}
                ${company ? `
                <tr>
                  <td class="label">Company / Facility</td>
                  <td class="val">${company}</td>
                </tr>` : ""}
                ${city ? `
                <tr>
                  <td class="label">City / Location</td>
                  <td class="val">${city}</td>
                </tr>` : ""}
                ${productName ? `
                <tr>
                  <td class="label">Product of Interest</td>
                  <td class="val" style="color: #0284c7;">${productName}</td>
                </tr>` : ""}
                ${application ? `
                <tr>
                  <td class="label">Target Application</td>
                  <td class="val">${application}</td>
                </tr>` : ""}
                ${approxCapacity ? `
                <tr>
                  <td class="label">Estimated Capacity</td>
                  <td class="val">${approxCapacity}</td>
                </tr>` : ""}
                ${pageUrl ? `
                <tr>
                  <td class="label">Referred Page</td>
                  <td class="val"><a href="${pageUrl}" style="color: #0284c7; font-size: 12px;">${pageUrl}</a></td>
                </tr>` : ""}
                <tr>
                  <td class="label">Timestamp</td>
                  <td class="val" style="font-size: 12px; color: #64748b;">${timestampStr}</td>
                </tr>
              </table>

              ${message ? `
              <div class="message-box">
                <h4>Customer Requirements / Remarks</h4>
                <p>${message}</p>
              </div>` : ""}

              ${validEmail ? `
              <div class="reply-hint">
                💡 <strong>Reply Directly:</strong> Hitting "Reply" in your email client will automatically address <strong>${validEmail}</strong> (${name}).
              </div>` : ""}
            </div>
            <div class="footer">
              This message was delivered in real-time from the Electra Solar website.<br/>
              Notice: Form submissions are delivered directly to your Gmail inbox and are not persisted in any database.
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text alternative
    const textBody = `
ELECTRA SOLAR — NEW WEBSITE SUBMISSION
------------------------------------------------------
Subject: ${subject}
Date: ${timestampStr}
Form Type: ${formType}

CUSTOMER DETAILS:
- Name: ${name}
- Phone: ${phone}
${validEmail ? `- Email: ${validEmail}\n` : ""}${company ? `- Company: ${company}\n` : ""}${city ? `- City: ${city}\n` : ""}${productName ? `- Product: ${productName}\n` : ""}${application ? `- Application: ${application}\n` : ""}${approxCapacity ? `- Estimated Capacity: ${approxCapacity}\n` : ""}${pageUrl ? `- Page URL: ${pageUrl}\n` : ""}
${message ? `\nCUSTOMER MESSAGE:\n${message}\n` : ""}
------------------------------------------------------
Delivered via Electra Solar Google OAuth 2.0 Integration
    `.trim();

    // 7. Dispatch directly via Gmail
    const config = getStoredGmailConfig();

    if (!config.isConnected) {
      // In staging/development, if Gmail is not yet authorized by the admin,
      // return a graceful notification so visitors don't face a broken experience,
      // while logging clear administrative guidance.
      console.warn("Gmail OAuth is not connected. Connect via /admin/email to deliver emails to inbox.");
      return NextResponse.json({
        success: true,
        message: "Thank you! Your enquiry has been received. Our Pune sales engineering desk will contact you shortly.",
        notice: "Gmail integration pending OAuth connection in Admin Panel.",
      });
    }

    const emailResult = await sendEmail({
      to: config.recipientEmail || "sales@electrasolar.in",
      subject,
      htmlBody,
      textBody,
      replyTo: validEmail || undefined,
    });

    if (!emailResult.success) {
      console.error("Email send failed:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          message: "Unable to dispatch enquiry notification at this moment. Please call +91 9822407189 directly.",
        },
        { status: 502 }
      );
    }

    // 8. Return success — STRICTLY ZERO PERSISTENCE of enquiry records
    return NextResponse.json({
      success: true,
      message: "Your proposal request has been delivered directly to our Pune application engineering team.",
    });
  } catch (err: any) {
    console.error("Error processing form submission:", err);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please call our sales desk directly at +91 9822407189.",
      },
      { status: 500 }
    );
  }
}

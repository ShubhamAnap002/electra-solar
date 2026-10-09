import { NextRequest, NextResponse } from "next/server";
import { getStoredGmailConfig, saveStoredGmailConfig, recordActivity } from "@/lib/store";
import { getAuthenticatedAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const config = getStoredGmailConfig();

    if (body.recipientEmail) {
      // Validate recipient email syntax
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.recipientEmail)) {
        return NextResponse.json(
          { success: false, message: "Invalid recipient email address format" },
          { status: 400 }
        );
      }
      config.recipientEmail = body.recipientEmail.trim();
    }

    if (body.senderName) {
      config.senderName = body.senderName.trim();
    }

    if (body.clientId !== undefined) {
      config.oauth.clientId = body.clientId.trim();
    }

    if (body.clientSecret !== undefined && body.clientSecret !== "") {
      config.oauth.clientSecret = body.clientSecret.trim();
    }

    if (body.redirectUri !== undefined) {
      config.oauth.redirectUri = body.redirectUri.trim();
    }

    saveStoredGmailConfig(config);
    recordActivity("Updated Email Settings", "Email", `Updated recipient to '${config.recipientEmail}'`, user.username);

    return NextResponse.json({
      success: true,
      message: "Email configuration saved successfully",
      recipientEmail: config.recipientEmail,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update email config" },
      { status: 500 }
    );
  }
}

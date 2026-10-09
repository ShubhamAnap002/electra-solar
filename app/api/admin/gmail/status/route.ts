import { NextResponse } from "next/server";
import { getStoredGmailConfig } from "@/lib/store";
import { getAuthenticatedAdmin } from "@/lib/auth";

export async function GET() {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const config = getStoredGmailConfig();

  // Return sanitized config (never expose clientSecret or refreshToken)
  return NextResponse.json({
    success: true,
    config: {
      isConnected: config.isConnected,
      connectedEmail: config.connectedEmail,
      recipientEmail: config.recipientEmail,
      senderName: config.senderName,
      authMethod: config.authMethod,
      hasClientId: Boolean(config.oauth.clientId || process.env.GOOGLE_CLIENT_ID),
      hasClientSecret: Boolean(config.oauth.clientSecret || process.env.GOOGLE_CLIENT_SECRET),
      clientId: config.oauth.clientId || process.env.GOOGLE_CLIENT_ID || "",
      redirectUri: config.oauth.redirectUri || process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/admin/gmail/callback",
      lastTestedAt: config.lastTestedAt,
      lastTestStatus: config.lastTestStatus,
      lastTestMessage: config.lastTestMessage,
    },
  });
}

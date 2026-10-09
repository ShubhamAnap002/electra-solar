import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/gmail";
import { recordActivity } from "@/lib/store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const baseUrl = new URL("/admin/email", req.url);

  if (error) {
    baseUrl.searchParams.set("error", `Google OAuth Error: ${error}`);
    return NextResponse.redirect(baseUrl);
  }

  if (!code) {
    baseUrl.searchParams.set("error", "No authorization code provided in Google response");
    return NextResponse.redirect(baseUrl);
  }

  const host = req.headers.get("host") || "localhost:3000";
  const protocol = req.headers.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const callbackUrl = `${protocol}://${host}/api/admin/gmail/callback`;

  const result = await exchangeCodeForTokens(code, callbackUrl);

  if (!result.success) {
    baseUrl.searchParams.set("error", result.error || "Failed to complete Google OAuth authentication");
    return NextResponse.redirect(baseUrl);
  }

  recordActivity(
    "Connected Gmail",
    "Email",
    `Authorized Google account: ${result.email || "connected account"}`,
    "Admin"
  );

  baseUrl.searchParams.set("status", "connected");
  baseUrl.searchParams.set("email", result.email || "");
  return NextResponse.redirect(baseUrl);
}

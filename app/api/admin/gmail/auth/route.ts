import { NextRequest, NextResponse } from "next/server";
import { getGoogleOAuthUrl } from "@/lib/gmail";
import { getAuthenticatedAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const { searchParams } = new URL(req.url);
  const jsonMode = searchParams.get("format") === "json";

  const host = req.headers.get("host") || "localhost:3000";
  const protocol = req.headers.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const callbackUrl = `${protocol}://${host}/api/admin/gmail/callback`;

  const { url, error } = getGoogleOAuthUrl(callbackUrl);

  if (error || !url) {
    if (jsonMode) {
      return NextResponse.json({ success: false, message: error }, { status: 400 });
    }
    return NextResponse.redirect(
      new URL(`/admin/email?error=${encodeURIComponent(error || "OAuth setup incomplete")}`, req.url)
    );
  }

  if (jsonMode) {
    return NextResponse.json({ success: true, url });
  }

  return NextResponse.redirect(url);
}

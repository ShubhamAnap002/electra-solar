import { NextResponse } from "next/server";
import { disconnectGmail } from "@/lib/gmail";
import { recordActivity } from "@/lib/store";
import { getAuthenticatedAdmin } from "@/lib/auth";

export async function POST() {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  disconnectGmail();
  recordActivity("Disconnected Gmail", "Email", "Removed Gmail Google OAuth authorization", user.username);

  return NextResponse.json({
    success: true,
    message: "Gmail account disconnected successfully",
  });
}

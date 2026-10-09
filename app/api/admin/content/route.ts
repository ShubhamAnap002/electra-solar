import { NextRequest, NextResponse } from "next/server";
import { getStoredSiteContent, saveStoredSiteContent, recordActivity } from "@/lib/store";
import { getAuthenticatedAdmin } from "@/lib/auth";

// GET site content
export async function GET() {
  const content = getStoredSiteContent();
  return NextResponse.json({ success: true, content });
}

// PUT update site content
export async function PUT(req: NextRequest) {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const current = getStoredSiteContent();

    const updated = {
      ...current,
      ...body,
    };

    saveStoredSiteContent(updated);
    recordActivity("Updated Site Content", "Content", "Updated homepage and website copy", user.username);

    return NextResponse.json({ success: true, content: updated });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update content" },
      { status: 500 }
    );
  }
}

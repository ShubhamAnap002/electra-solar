import { NextRequest, NextResponse } from "next/server";
import { getStoredSeo, saveStoredSeo, recordActivity } from "@/lib/store";
import { getAuthenticatedAdmin } from "@/lib/auth";

// GET SEO configuration
export async function GET() {
  const seo = getStoredSeo();
  return NextResponse.json({ success: true, seo });
}

// PUT update SEO configuration
export async function PUT(req: NextRequest) {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const current = getStoredSeo();

    const updated = {
      ...current,
      ...body,
    };

    saveStoredSeo(updated);
    recordActivity("Updated SEO", "SEO", "Modified search engine tags and meta descriptions", user.username);

    return NextResponse.json({ success: true, seo: updated });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update SEO config" },
      { status: 500 }
    );
  }
}

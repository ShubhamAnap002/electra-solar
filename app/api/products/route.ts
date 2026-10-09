import { NextResponse } from "next/server";
import { getStoredProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = getStoredProducts().filter((p) => p.published !== false);
    return NextResponse.json({
      success: true,
      products,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Failed to load products" },
      { status: 500 }
    );
  }
}

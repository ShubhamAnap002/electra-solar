import { NextRequest, NextResponse } from "next/server";
import { getStoredProducts, saveStoredProducts, recordActivity } from "@/lib/store";
import { getAuthenticatedAdmin } from "@/lib/auth";

// GET single product by id or slug
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const products = getStoredProducts();
  const product = products.find((p) => p.id === params.id || p.slug === params.id);
  if (!product) {
    return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, product });
}

// PUT update product
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const products = getStoredProducts();
    const index = products.findIndex((p) => p.id === params.id || p.slug === params.id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    const existing = products[index];
    const updated = {
      ...existing,
      ...body,
      id: existing.id, // Preserve ID
    };

    products[index] = updated;
    saveStoredProducts(products);

    recordActivity("Updated Product", "Products", `Modified specifications for '${updated.name}'`, user.username);

    return NextResponse.json({ success: true, product: updated });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const products = getStoredProducts();
  const index = products.findIndex((p) => p.id === params.id || p.slug === params.id);

  if (index === -1) {
    return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
  }

  const removed = products.splice(index, 1)[0];
  saveStoredProducts(products);

  recordActivity("Deleted Product", "Products", `Removed '${removed.name}' (${removed.modelCode})`, user.username);

  return NextResponse.json({ success: true, message: "Product deleted successfully" });
}

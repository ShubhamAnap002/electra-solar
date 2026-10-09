import { NextRequest, NextResponse } from "next/server";
import { getStoredProducts, saveStoredProducts, recordActivity } from "@/lib/store";
import { Product } from "@/lib/data/products";
import { getAuthenticatedAdmin } from "@/lib/auth";

// GET all products
export async function GET() {
  const products = getStoredProducts();
  return NextResponse.json({ success: true, products });
}

// POST create new product
export async function POST(req: NextRequest) {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const products = getStoredProducts();

    // Check slug uniqueness
    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (products.some((p) => p.slug === slug)) {
      return NextResponse.json(
        { success: false, message: "A product with this URL slug already exists." },
        { status: 400 }
      );
    }

    const newProduct: Product = {
      id: body.id || `prod_${Date.now()}`,
      slug,
      name: body.name,
      modelCode: body.modelCode || "",
      series: body.series || "Flagship Series",
      category: body.category || "solar-hybrid-inverters",
      categoryName: body.categoryName || "Solar Hybrid Inverters",
      tagline: body.tagline || "",
      description: body.description || "",
      highlightBadge: body.highlightBadge || "New Model",
      capacityRange: body.capacityRange || "",
      capacityBadge: body.capacityBadge || "",
      phase: body.phase || "3-Phase",
      technology: body.technology || "High-Frequency Hybrid DSP",
      image: body.image || "/images/products/sunmagic-3ph.webp",
      gallery: body.gallery || [],
      efficiency: body.efficiency || "98.4%",
      dcBusVoltage: body.dcBusVoltage || "360V – 750V",
      mpptChannels: body.mpptChannels || "Dual MPPT",
      keyFeatures: body.keyFeatures || [],
      protections: body.protections || [],
      applications: body.applications || [],
      specs: body.specs || [],
      warranty: body.warranty || "5 Years Factory Warranty",
      datasheetUrl: body.datasheetUrl || "",
      isFeatured: Boolean(body.isFeatured),
      idealFor: body.idealFor || "Industrial & Commercial Facilities",
    };

    products.unshift(newProduct);
    saveStoredProducts(products);

    recordActivity("Created Product", "Products", `Added product '${newProduct.name}' (${newProduct.modelCode})`, user.username);

    return NextResponse.json({ success: true, product: newProduct });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create product" },
      { status: 500 }
    );
  }
}

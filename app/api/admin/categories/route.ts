import { NextRequest, NextResponse } from "next/server";
import {
  getStoredCategories,
  saveStoredCategories,
  getStoredProducts,
  recordActivity,
} from "@/lib/store";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { CategoryInfo } from "@/lib/data/products";

// GET all categories
export async function GET() {
  const categories = getStoredCategories();
  const products = getStoredProducts();

  // Dynamically calculate actual product count per category
  const categoriesWithLiveCount = categories.map((cat) => {
    const count = products.filter((p) => p.category === cat.id || p.category === cat.slug).length;
    return {
      ...cat,
      productCount: count,
    };
  });

  return NextResponse.json({ success: true, categories: categoriesWithLiveCount });
}

// POST create a category
export async function POST(req: NextRequest) {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const categories = getStoredCategories();

    if (!body.name || !body.slug) {
      return NextResponse.json(
        { success: false, message: "Category Name and Slug are required" },
        { status: 400 }
      );
    }

    const cleanSlug = body.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");
    const exists = categories.some((c) => c.slug === cleanSlug || c.id === cleanSlug);
    if (exists) {
      return NextResponse.json(
        { success: false, message: "A category with this slug already exists" },
        { status: 400 }
      );
    }

    const newCategory: CategoryInfo = {
      id: cleanSlug,
      slug: cleanSlug,
      name: body.name.trim(),
      shortDesc: body.shortDesc?.trim() || "",
      description: body.description?.trim() || "",
      iconName: body.iconName || "Sun",
      productCount: 0,
    };

    categories.push(newCategory);
    saveStoredCategories(categories);

    recordActivity("Created Category", "Categories", `Created new category '${newCategory.name}'`, user.username);

    return NextResponse.json({ success: true, category: newCategory }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create category" },
      { status: 500 }
    );
  }
}

// PUT update category
export async function PUT(req: NextRequest) {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const categories = getStoredCategories();

    const targetId = body.id || body.slug;
    const index = categories.findIndex((c) => c.id === targetId || c.slug === targetId);

    if (index === -1) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }

    const existing = categories[index];
    const updated: CategoryInfo = {
      ...existing,
      name: body.name?.trim() || existing.name,
      shortDesc: body.shortDesc?.trim() !== undefined ? body.shortDesc.trim() : existing.shortDesc,
      description: body.description?.trim() !== undefined ? body.description.trim() : existing.description,
      iconName: body.iconName || existing.iconName,
    };

    categories[index] = updated;
    saveStoredCategories(categories);

    recordActivity("Updated Category", "Categories", `Updated category details for '${updated.name}'`, user.username);

    return NextResponse.json({ success: true, category: updated });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update category" },
      { status: 500 }
    );
  }
}

// DELETE category
export async function DELETE(req: NextRequest) {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Category ID is required" }, { status: 400 });
    }

    const categories = getStoredCategories();
    const target = categories.find((c) => c.id === id || c.slug === id);

    if (!target) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }

    // Safety check: Don't delete if products are assigned
    const products = getStoredProducts();
    const assignedCount = products.filter((p) => p.category === target.id || p.category === target.slug).length;

    if (assignedCount > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Cannot delete category '${target.name}'. There are ${assignedCount} products assigned to it. Reassign or delete them first.`,
        },
        { status: 400 }
      );
    }

    const filtered = categories.filter((c) => c.id !== target.id && c.slug !== target.slug);
    saveStoredCategories(filtered);

    recordActivity("Deleted Category", "Categories", `Removed category '${target.name}'`, user.username);

    return NextResponse.json({ success: true, message: `Category '${target.name}' deleted successfully` });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}

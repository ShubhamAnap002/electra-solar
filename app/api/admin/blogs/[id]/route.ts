import { NextRequest, NextResponse } from "next/server";
import { getStoredBlogPosts, saveStoredBlogPosts, recordActivity } from "@/lib/store";
import { getAuthenticatedAdmin } from "@/lib/auth";

// GET single blog post by id or slug
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const blogs = getStoredBlogPosts();
  const blog = blogs.find((b) => b.id === params.id || b.slug === params.id);
  if (!blog) {
    return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, blog });
}

// PUT update blog post
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const blogs = getStoredBlogPosts();
    const index = blogs.findIndex((b) => b.id === params.id || b.slug === params.id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
    }

    const existing = blogs[index];
    const updated = {
      ...existing,
      ...body,
      id: existing.id, // Preserve ID
      content: {
        intro: body.content?.intro ?? existing.content?.intro ?? "",
        sections: body.content?.sections ?? existing.content?.sections ?? [],
        conclusion: body.content?.conclusion ?? existing.content?.conclusion ?? "",
        blocks: body.content?.blocks ?? existing.content?.blocks ?? undefined,
      },
    };

    blogs[index] = updated;
    saveStoredBlogPosts(blogs);

    recordActivity("Updated Blog Post", "Blogs", `Updated article '${updated.title}'`, user.username);

    return NextResponse.json({ success: true, blog: updated });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE blog post
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const blogs = getStoredBlogPosts();
  const index = blogs.findIndex((b) => b.id === params.id || b.slug === params.id);

  if (index === -1) {
    return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
  }

  const deleted = blogs.splice(index, 1)[0];
  saveStoredBlogPosts(blogs);

  recordActivity("Deleted Blog Post", "Blogs", `Removed article '${deleted.title}'`, user.username);

  return NextResponse.json({ success: true, message: "Blog post deleted successfully" });
}

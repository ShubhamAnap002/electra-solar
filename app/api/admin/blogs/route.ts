import { NextRequest, NextResponse } from "next/server";
import { getStoredBlogPosts, saveStoredBlogPosts, recordActivity } from "@/lib/store";
import { BlogPost } from "@/lib/data/blog";
import { getAuthenticatedAdmin } from "@/lib/auth";

// GET all blog posts
export async function GET() {
  const blogs = getStoredBlogPosts();
  return NextResponse.json({ success: true, blogs, posts: blogs });
}

// POST create new blog post
export async function POST(req: NextRequest) {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const blogs = getStoredBlogPosts();

    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (blogs.some((b) => b.slug === slug)) {
      return NextResponse.json(
        { success: false, message: "A blog post with this URL slug already exists." },
        { status: 400 }
      );
    }

    const newPost: BlogPost = {
      id: body.id || `blog_${Date.now()}`,
      slug,
      title: body.title || "Untitled Article",
      category: body.category || "Engineering & Sizing",
      author: body.author || "Electra Solar Engineer",
      authorRole: body.authorRole || "Engineering Desk, Electra Solar",
      publishedAt: body.publishedAt || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      readTime: body.readTime || "5 min read",
      summary: body.summary || "",
      coverImage: body.coverImage || "/images/showcase/industrial-solar.jpg",
      featured: Boolean(body.featured),
      content: {
        intro: body.content?.intro || "",
        sections: Array.isArray(body.content?.sections) ? body.content.sections : [],
        conclusion: body.content?.conclusion || "",
      },
      relatedProductSlug: body.relatedProductSlug || "",
      relatedProductName: body.relatedProductName || "",
    };

    blogs.unshift(newPost);
    saveStoredBlogPosts(blogs);

    recordActivity("Created Blog Post", "Blogs", `Published article '${newPost.title}'`, user.username);

    return NextResponse.json({ success: true, blog: newPost }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create blog post" },
      { status: 500 }
    );
  }
}

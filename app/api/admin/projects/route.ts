import { NextRequest, NextResponse } from "next/server";
import { getStoredProjects, saveStoredProjects, recordActivity } from "@/lib/store";
import { Project } from "@/lib/data/projects";
import { getAuthenticatedAdmin } from "@/lib/auth";

// GET all projects
export async function GET() {
  const projects = getStoredProjects();
  return NextResponse.json({ success: true, projects });
}

// POST create new project
export async function POST(req: NextRequest) {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const projects = getStoredProjects();

    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (projects.some((p) => p.slug === slug)) {
      return NextResponse.json(
        { success: false, message: "A project with this URL slug already exists." },
        { status: 400 }
      );
    }

    const newProject: Project = {
      id: body.id || `proj_${Date.now()}`,
      slug,
      title: body.title || "Untitled Project",
      category: body.category || "Industrial Manufacturing",
      location: body.location || "Pune, Maharashtra",
      capacity: body.capacity || "",
      productsInstalled: Array.isArray(body.productsInstalled) ? body.productsInstalled : [],
      challenge: body.challenge || "",
      solution: body.solution || "",
      impactMetrics: Array.isArray(body.impactMetrics) ? body.impactMetrics : [],
      completionYear: body.completionYear || new Date().getFullYear().toString(),
      image: body.image || "/images/showcase/industrial-solar.jpg",
      quoteSnippet: body.quoteSnippet || "",
    };

    projects.unshift(newProject);
    saveStoredProjects(projects);

    recordActivity("Created Project", "Projects", `Added project '${newProject.title}'`, user.username);

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create project" },
      { status: 500 }
    );
  }
}

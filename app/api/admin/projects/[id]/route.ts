import { NextRequest, NextResponse } from "next/server";
import { getStoredProjects, saveStoredProjects, recordActivity } from "@/lib/store";
import { getAuthenticatedAdmin } from "@/lib/auth";

// GET single project by id or slug
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const projects = getStoredProjects();
  const project = projects.find((p) => p.id === params.id || p.slug === params.id);
  if (!project) {
    return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, project });
}

// PUT update project
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const projects = getStoredProjects();
    const index = projects.findIndex((p) => p.id === params.id || p.slug === params.id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }

    const existing = projects[index];
    const updated = {
      ...existing,
      ...body,
      id: existing.id, // Preserve ID
      productsInstalled: body.productsInstalled ?? existing.productsInstalled ?? [],
      impactMetrics: body.impactMetrics ?? existing.impactMetrics ?? [],
    };

    projects[index] = updated;
    saveStoredProjects(projects);

    recordActivity("Updated Project", "Projects", `Updated project '${updated.title}'`, user.username);

    return NextResponse.json({ success: true, project: updated });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const projects = getStoredProjects();
  const index = projects.findIndex((p) => p.id === params.id || p.slug === params.id);

  if (index === -1) {
    return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
  }

  const deleted = projects.splice(index, 1)[0];
  saveStoredProjects(projects);

  recordActivity("Deleted Project", "Projects", `Removed project '${deleted.title}'`, user.username);

  return NextResponse.json({ success: true, message: "Project deleted successfully" });
}

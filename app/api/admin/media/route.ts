import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { getStoredProducts, getStoredSiteContent, recordActivity } from "@/lib/store";

export interface MediaFile {
  name: string;
  url: string;
  size: number;
  type: "image" | "document";
  extension: string;
  modifiedAt: string;
  isCustomUpload: boolean;
}

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

// GET media files
export async function GET() {
  ensureUploadsDir();

  const files: MediaFile[] = [];

  // 1. Scan public/uploads
  if (fs.existsSync(UPLOADS_DIR)) {
    const uploadFiles = fs.readdirSync(UPLOADS_DIR);
    for (const f of uploadFiles) {
      const fullPath = path.join(UPLOADS_DIR, f);
      const stat = fs.statSync(fullPath);
      if (stat.isFile()) {
        const ext = path.extname(f).toLowerCase().replace(".", "");
        const isDoc = ["pdf", "doc", "docx"].includes(ext);
        files.push({
          name: f,
          url: `/uploads/${f}`,
          size: stat.size,
          type: isDoc ? "document" : "image",
          extension: ext,
          modifiedAt: stat.mtime.toISOString(),
          isCustomUpload: true,
        });
      }
    }
  }

  // 2. Scan public/images folders for bundled images
  const imagesBaseDir = path.join(process.cwd(), "public", "images");
  if (fs.existsSync(imagesBaseDir)) {
    const walkDir = (dir: string, relativePrefix: string) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          walkDir(path.join(dir, entry.name), `${relativePrefix}/${entry.name}`);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase().replace(".", "");
          const isImg = ["jpg", "jpeg", "png", "webp", "svg", "gif"].includes(ext);
          const isDoc = ["pdf", "doc", "docx"].includes(ext);
          if (isImg || isDoc) {
            const stat = fs.statSync(path.join(dir, entry.name));
            files.push({
              name: entry.name,
              url: `/images${relativePrefix}/${entry.name}`,
              size: stat.size,
              type: isDoc ? "document" : "image",
              extension: ext,
              modifiedAt: stat.mtime.toISOString(),
              isCustomUpload: false,
            });
          }
        }
      }
    }
    walkDir(imagesBaseDir, "");
  }

  // Sort newest first
  files.sort((a, b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime());

  return NextResponse.json({ success: true, files });
}

// DELETE media file
export async function DELETE(req: NextRequest) {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get("url");

    if (!fileUrl) {
      return NextResponse.json({ success: false, message: "File URL is required" }, { status: 400 });
    }

    // Only allow deletion of user-uploaded files from /uploads to prevent breaking core bundled assets
    if (!fileUrl.startsWith("/uploads/")) {
      return NextResponse.json(
        { success: false, message: "System bundled assets in /images cannot be deleted. Only files in /uploads can be removed." },
        { status: 403 }
      );
    }

    const filename = path.basename(fileUrl);
    const targetPath = path.join(UPLOADS_DIR, filename);

    if (!fs.existsSync(targetPath)) {
      return NextResponse.json({ success: false, message: "File does not exist" }, { status: 404 });
    }

    // Reference check: is file in use in products or site content?
    const products = getStoredProducts();
    const siteContent = getStoredSiteContent();

    const usedInProducts = products.some(
      (p) => p.image === fileUrl || p.datasheetUrl === fileUrl || p.gallery?.includes(fileUrl)
    );

    const contentString = JSON.stringify(siteContent);
    const usedInContent = contentString.includes(fileUrl);

    if (usedInProducts || usedInContent) {
      return NextResponse.json(
        {
          success: false,
          message: "Cannot delete this file: It is currently active on published products or website sections. Replace its reference first.",
        },
        { status: 400 }
      );
    }

    fs.unlinkSync(targetPath);
    recordActivity("Deleted Media", "Media", `Deleted uploaded media file: ${filename}`, user.username);

    return NextResponse.json({ success: true, message: `File '${filename}' deleted successfully` });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete file" },
      { status: 500 }
    );
  }
}

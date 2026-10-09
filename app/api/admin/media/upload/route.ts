import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { recordActivity } from "@/lib/store";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "svg", "gif", "pdf", "doc", "docx"];

function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

export async function POST(req: NextRequest) {
  const user = getAuthenticatedAdmin();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    ensureUploadsDir();

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file was uploaded" }, { status: 400 });
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, message: `File size exceeds the 15MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB)` },
        { status: 400 }
      );
    }

    const originalName = file.name;
    const ext = path.extname(originalName).toLowerCase().replace(".", "");

    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        {
          success: false,
          message: `Unsupported file format (.${ext}). Allowed: JPG, PNG, WEBP, SVG, GIF, PDF, DOC, DOCX`,
        },
        { status: 400 }
      );
    }

    // Clean filename: remove special characters, append timestamp
    const baseClean = path.basename(originalName, path.extname(originalName))
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "_")
      .substring(0, 50);

    const safeFilename = `${baseClean}_${Date.now()}.${ext}`;
    const destinationPath = path.join(UPLOADS_DIR, safeFilename);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(destinationPath, buffer);

    const publicUrl = `/uploads/${safeFilename}`;
    const isDoc = ["pdf", "doc", "docx"].includes(ext);

    recordActivity("Uploaded Media", "Media", `Uploaded '${safeFilename}' (${(file.size / 1024).toFixed(0)} KB)`, user.username);

    return NextResponse.json({
      success: true,
      file: {
        name: safeFilename,
        url: publicUrl,
        size: file.size,
        type: isDoc ? "document" : "image",
        extension: ext,
        modifiedAt: new Date().toISOString(),
        isCustomUpload: true,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}

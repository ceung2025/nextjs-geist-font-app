import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";

// Admin endpoint to manage files
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const payload = verifyToken(token) as { email: string };
    
    // Check if user is admin
    if (!payload.email.includes("admin")) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    // Read files from uploads directory
    const uploadsDir = path.join(process.cwd(), "uploads");
    
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }

    const files = await fs.readdir(uploadsDir);
    const fileList = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(uploadsDir, filename);
        const stats = await fs.stat(filePath);
        return {
          id: filename,
          fileName: filename,
          size: `${(stats.size / 1024 / 1024).toFixed(1)} MB`,
          lastModified: stats.mtime.toISOString().split('T')[0],
          uploadedAt: stats.birthtime.toISOString()
        };
      })
    );

    return NextResponse.json({ files: fileList });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const payload = verifyToken(token) as { email: string };
    
    // Check if user is admin
    if (!payload.email.includes("admin")) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const description = formData.get("description") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "uploads");
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadsDir, file.name);
    await fs.writeFile(filePath, buffer);

    // Save metadata
    const metadataPath = path.join(uploadsDir, `${file.name}.meta.json`);
    const metadata = {
      originalName: file.name,
      description: description || "",
      uploadedBy: payload.email,
      uploadedAt: new Date().toISOString(),
      size: file.size,
      type: file.type
    };
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));

    return NextResponse.json({ 
      message: "File uploaded successfully",
      fileName: file.name 
    });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const payload = verifyToken(token) as { email: string };
    
    // Check if user is admin
    if (!payload.email.includes("admin")) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { fileName } = await request.json();
    
    const uploadsDir = path.join(process.cwd(), "uploads");
    const filePath = path.join(uploadsDir, fileName);
    const metadataPath = path.join(uploadsDir, `${fileName}.meta.json`);

    // Delete file and metadata
    try {
      await fs.unlink(filePath);
      await fs.unlink(metadataPath);
    } catch {
      // File might not exist
    }

    return NextResponse.json({ message: "File deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

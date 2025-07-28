import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    // Validate the token
    const payload = verifyToken(token) as { email: string };
    
    // Read files from uploads directory
    const uploadsDir = path.join(process.cwd(), "uploads");
    
    let privateFiles = [];
    
    try {
      await fs.access(uploadsDir);
      const files = await fs.readdir(uploadsDir);
      
      // Filter out metadata files and process actual files
      const actualFiles = files.filter(file => !file.endsWith('.meta.json'));
      
      privateFiles = await Promise.all(
        actualFiles.map(async (filename, index) => {
          const filePath = path.join(uploadsDir, filename);
          const metadataPath = path.join(uploadsDir, `${filename}.meta.json`);
          
          let metadata = {
            description: "Medical document for healthcare professionals",
            uploadedBy: "admin",
            uploadedAt: new Date().toISOString()
          };
          
          // Try to read metadata if it exists
          try {
            const metadataContent = await fs.readFile(metadataPath, 'utf-8');
            metadata = { ...metadata, ...JSON.parse(metadataContent) };
          } catch {
            // Use default metadata if file doesn't exist
          }
          
          const stats = await fs.stat(filePath);
          
          return {
            id: index + 1,
            fileName: filename,
            content: metadata.description,
            size: `${(stats.size / 1024 / 1024).toFixed(1)} MB`,
            lastModified: stats.mtime.toISOString().split('T')[0],
            uploadedBy: metadata.uploadedBy,
            uploadedAt: metadata.uploadedAt
          };
        })
      );
    } catch {
      // If uploads directory doesn't exist, return sample data
      privateFiles = [
        {
          id: 1,
          fileName: "confidential_report.pdf",
          content: "This is a confidential business report containing sensitive financial data.",
          size: "2.4 MB",
          lastModified: "2024-01-15",
          uploadedBy: "admin@test.com",
          uploadedAt: new Date().toISOString()
        },
        {
          id: 2,
          fileName: "private_documents.docx",
          content: "Internal company documents with proprietary information.",
          size: "1.8 MB",
          lastModified: "2024-01-10",
          uploadedBy: "admin@test.com",
          uploadedAt: new Date().toISOString()
        },
        {
          id: 3,
          fileName: "secure_data.xlsx",
          content: "Encrypted spreadsheet with customer data and analytics.",
          size: "3.2 MB",
          lastModified: "2024-01-12",
          uploadedBy: "admin@test.com",
          uploadedAt: new Date().toISOString()
        }
      ];
    }
    
    return NextResponse.json({ 
      message: "Private files accessed successfully",
      user: payload.email,
      files: privateFiles
    });
  } catch {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface FileData {
  id: string;
  fileName: string;
  size: string;
  lastModified: string;
  uploadedAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [session, setSession] = useState<{ email: string } | null>(null);
  const [files, setFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check session and admin access
    fetch("/api/auth/session")
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        if (!data.email.includes("admin")) {
          router.push("/private");
          return;
        }
        setSession(data);
        loadFiles();
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  const loadFiles = async () => {
    try {
      const res = await fetch("/api/admin/files");
      if (res.ok) {
        const data = await res.json();
        setFiles(data.files);
      }
    } catch (error) {
      console.error("Failed to load files:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("description", description);

    try {
      const res = await fetch("/api/admin/files", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("File uploaded successfully!");
        setUploadFile(null);
        setDescription("");
        loadFiles();
      } else {
        const error = await res.json();
        setMessage(`Upload failed: ${error.error}`);
      }
    } catch (error) {
      setMessage("Upload failed: Network error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (fileName: string) => {
    if (!confirm(`Are you sure you want to delete ${fileName}?`)) return;

    try {
      const res = await fetch("/api/admin/files", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName }),
      });

      if (res.ok) {
        setMessage("File deleted successfully!");
        loadFiles();
      } else {
        setMessage("Delete failed");
      }
    } catch (error) {
      setMessage("Delete failed: Network error");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3v-8h6v8h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xl font-bold text-blue-600">MEDTOOLS.ID</span>
              <span className="text-sm text-gray-500">Admin Panel</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/private")}
                className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                View Files
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-lg p-8 mb-8 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <div className="text-2xl">⚙️</div>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Admin Panel - {session.email}
                </h1>
                <p className="text-blue-100">
                  Manage private medical files for Creator Team WorkSpace
                </p>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload New File</h2>
            
            {message && (
              <div className={`mb-6 p-4 rounded-xl ${
                message.includes("successfully") 
                  ? "bg-green-50 border border-green-200 text-green-700" 
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select File
                </label>
                <input
                  type="file"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter file description for users..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isUploading || !uploadFile}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? "Uploading..." : "Upload File"}
              </button>
            </form>
          </div>

          {/* Files List */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Uploaded Files</h2>
            
            {files.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-500">No files uploaded yet</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {files.map((file) => (
                  <div key={file.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{file.fileName}</h3>
                          <p className="text-sm text-gray-500">
                            {file.size} • Modified: {file.lastModified}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(file.fileName)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

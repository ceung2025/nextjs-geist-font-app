"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface FileData {
  id: number;
  fileName: string;
  content: string;
  size: string;
  lastModified: string;
}

interface PrivateData {
  message: string;
  user: string;
  files: FileData[];
}

export default function PrivatePage() {
  const router = useRouter();
  const [session, setSession] = useState<{ email: string } | null>(null);
  const [privateData, setPrivateData] = useState<PrivateData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);

  useEffect(() => {
    // Check session on mount
    fetch("/api/auth/session")
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        setSession(data);
        setIsLoading(false);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  const fetchPrivateFiles = async () => {
    setIsLoadingFiles(true);
    setError("");
    
    try {
      const res = await fetch("/api/files/private");
      if (res.ok) {
        const data = await res.json();
        setPrivateData(data);
      } else {
        setError("Unable to fetch private files.");
      }
    } catch (err) {
      setError("Network error occurred.");
    } finally {
      setIsLoadingFiles(false);
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
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-lg p-8 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="text-2xl">👨‍⚕️</div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    Welcome, {session.email}!
                  </h1>
                  <p className="text-blue-100">
                    You are now logged in to Creator Team WorkSpace
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-blue-200 text-sm">Status</p>
                <p className="text-white font-semibold">✅ Authenticated</p>
              </div>
            </div>
          </div>

          {/* Private Files Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Private Medical Files</h2>
                <p className="text-gray-600">Access your protected documents and resources</p>
              </div>
              <button
                onClick={fetchPrivateFiles}
                disabled={isLoadingFiles}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingFiles ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Loading...
                  </div>
                ) : (
                  "Load Private Files"
                )}
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {privateData && (
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-blue-900 mb-1">
                        Status: {privateData.message}
                      </p>
                      <p className="text-sm text-blue-700">
                        Accessed by: {privateData.user}
                      </p>
                    </div>
                    <div className="text-blue-600">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3v-8h6v8h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {privateData.files.map((file) => (
                    <div
                      key={file.id}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">
                              {file.fileName}
                            </h3>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {file.size}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {file.content}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Modified: {file.lastModified}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
                          View File →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!privateData && !error && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Secure Medical File Access
                </h3>
                <p className="text-gray-600 mb-6">
                  Click "Load Private Files" to access your protected medical documents and resources.
                </p>
                <div className="bg-blue-50 rounded-xl p-4 max-w-md mx-auto">
                  <p className="text-blue-800 text-sm">
                    🔒 All files are encrypted and secured with medical-grade security protocols
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

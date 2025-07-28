"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    fetch("/api/auth/session")
      .then((res) => {
        if (res.ok) {
          // User is authenticated, redirect to private page
          router.push("/private");
        } else {
          // User is not authenticated, stay on home page
          setIsCheckingAuth(false);
        }
      })
      .catch(() => {
        setIsCheckingAuth(false);
      });
  }, [router]);

  const handleGetStarted = () => {
    router.push("/login");
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
            <button className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Creator Team
                <br />
                <span className="text-blue-200">WorkSpace</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Secure authentication system for accessing private medical files and documents. 
                Login with your registered email to access protected content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStarted}
                  className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-full transition-colors"
                >
                  Creator Team Program
                </button>
                <button className="px-8 py-3 border-2 border-blue-300 text-blue-100 hover:bg-blue-700 font-semibold rounded-full transition-colors">
                  ← Click Button
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full max-w-md mx-auto">
                <div className="bg-yellow-400 rounded-full w-64 h-64 mx-auto flex items-center justify-center relative">
                  <div className="text-6xl">👨‍⚕️</div>
                  <div className="absolute -bottom-4 -right-4 bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2L3 7v11a1 1 0 001 1h3v-8h6v8h3a1 1 0 001-1V7l-7-5z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Welcome to Medtools Creator Team Works Space.
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-4">
              This website 100% Handled by Medtools Creator Team
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                The Creator Team serves as the frontline force
              </h2>
              <p className="text-blue-100 mb-6 leading-relaxed">
                The Creator Team serves as the frontline force responsible for planning, producing, and 
                distributing creative content across digital platforms. Our mission is to build an engaging 
                digital presence that resonates with our target audience of medical students, doctors, and 
                healthcare facilities throughout Indonesia.
              </p>
              <p className="text-blue-100 leading-relaxed">
                We combine strategic marketing approaches with innovative content creation to enhance 
                Medtools&apos; brand awareness while driving meaningful engagement and conversions 
                through carefully crafted digital funneling.
              </p>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">🔒</div>
                    <h3 className="font-semibold text-white mb-1">Secure Access</h3>
                    <p className="text-blue-100 text-sm">Protected file system</p>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">📁</div>
                    <h3 className="font-semibold text-white mb-1">File Management</h3>
                    <p className="text-blue-100 text-sm">Organized documents</p>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">⚡</div>
                    <h3 className="font-semibold text-white mb-1">Fast & Reliable</h3>
                    <p className="text-blue-100 text-sm">Quick authentication</p>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">👥</div>
                    <h3 className="font-semibold text-white mb-1">Team Workspace</h3>
                    <p className="text-blue-100 text-sm">Collaborative platform</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Try the Demo Access
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Demo Credentials
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-blue-900 mb-3">User Account</h4>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> user@example.com</p>
                  <p><strong>Password:</strong> password123</p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-blue-900 mb-3">Admin Account</h4>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> admin@test.com</p>
                  <p><strong>Password:</strong> admin123</p>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleGetStarted}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full transition-colors"
          >
            Access Creator Workspace
          </button>
        </div>
      </div>
    </div>
  );
}

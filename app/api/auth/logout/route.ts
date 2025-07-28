import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" });
    
    // Clear the auth cookie
    response.cookies.set("auth_token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0)
    });
    
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

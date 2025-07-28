import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import users from "@/data/users.json";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    // Find user in the data file
    const user = users.find((u: { email: string; password: string }) => u.email === email);
    
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // Create token and set cookie
    const token = signToken({ email: user.email });
    const response = NextResponse.json({ message: "Login successful" });
    
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 3600, // 1 hour
      sameSite: "strict"
    });
    
    return response;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

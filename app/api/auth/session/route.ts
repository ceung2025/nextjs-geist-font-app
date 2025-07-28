import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = verifyToken(token) as { email: string };
    return NextResponse.json({ email: payload.email });
  } catch {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
}

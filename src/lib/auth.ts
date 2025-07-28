import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || "fallback-secret-for-development";

export function signToken(payload: object): string {
  // Token expires in 1 hour
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

export function verifyToken(token: string): unknown {
  try {
    return jwt.verify(token, secret);
  } catch {
    throw new Error("Invalid token");
  }
}

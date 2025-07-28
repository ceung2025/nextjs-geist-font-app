import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

export function signToken(payload: object): string {
  // Token expires in 1 hour
  return jwt.sign(payload, secret as string, { expiresIn: "1h" });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, secret as string);
  } catch (error) {
    throw new Error("Invalid token");
  }
}

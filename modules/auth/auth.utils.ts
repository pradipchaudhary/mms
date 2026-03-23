// auth.utils.ts
import jwt from "jsonwebtoken";

// Ensure the secret exists at runtime
// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET || "yourSuperSecretKeyHere";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in your environment variables");
}

// Generate JWT token
export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

// Verify JWT token
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
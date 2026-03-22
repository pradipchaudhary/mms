/**
 * MongoDB Connection Utility (Mongoose)
 * ------------------------------------
 * - Prevents multiple connections in development (hot reload safe)
 * - Uses global cache for Vercel / serverless environments
 * - Fully TypeScript-safe
 */
// lib/db.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Skip DB connection during build (like Next.js page pre-render)
 */
if (!MONGODB_URI && process.env.NODE_ENV !== "production") {
  console.warn("⚠️ MONGODB_URI is not defined, skipping MongoDB connection");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var _mongoose: MongooseCache | undefined;
}

const globalWithMongoose = global as typeof globalThis & {
  _mongoose?: MongooseCache;
};

let cached = globalWithMongoose._mongoose;

if (!cached) {
  cached = globalWithMongoose._mongoose = { conn: null, promise: null };
}

export const connectDB = async (): Promise<typeof mongoose | null> => {
  if (!MONGODB_URI) return null; // <-- prevents build errors

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = { dbName: "mms" };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("✅ MongoDB Connected");
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
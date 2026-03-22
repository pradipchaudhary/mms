/**
 * MongoDB Connection Utility (Mongoose)
 * ------------------------------------
 * - Prevents multiple connections in development (hot reload safe)
 * - Uses global cache for Vercel / serverless environments
 * - Fully TypeScript-safe
 */

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined");
}

/**
 * Mongoose cache structure
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * Extend global object (TypeScript-safe)
 */
declare global {
  var _mongoose: MongooseCache | undefined;
}

/**
 * Use global cache to persist connection across reloads
 */
const globalWithMongoose = global as typeof globalThis & {
  _mongoose?: MongooseCache;
};

let cached = globalWithMongoose._mongoose;

if (!cached) {
  cached = globalWithMongoose._mongoose = {
    conn: null,
    promise: null,
  };
}

/**
 * Connect to MongoDB
 */
export const connectDB = async (): Promise<typeof mongoose> => {
  // Return cached connection if exists
  if (cached?.conn) {
    return cached.conn;
  }

  // Create new connection promise if not exists
  if (!cached?.promise) {
    const opts: mongoose.ConnectOptions = {
      dbName: "mms",
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("✅ MongoDB Connected");
      return mongooseInstance;
    });
  }

  // Await connection and cache it
  cached.conn = await cached.promise;
  return cached.conn;
};
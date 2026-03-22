import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined");
}

/**
 * Global cache type (Fixes TS error)
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend globalThis properly (TypeScript-safe)
declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseCache | undefined;
}

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

export const connectDB = async (): Promise<typeof mongoose> => {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts: mongoose.ConnectOptions = {
      dbName: "nextjs-app", // optional but good practice
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB Local Connected");
      return mongoose;
    });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
};
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable inside .env.local");
}

// Use global cache so Next.js hot reload doesn't create multiple connections
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  console.log("🔄 connectDB() called...");

  if (cached.conn) {
    // console.log("✅ Using existing MongoDB connection from cache");
    return cached.conn;
  }

  if (!cached.promise) {
    // console.log("🆕 No cached connection, creating a new one...");
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };

    cached.promise = (async () => {
      try {
        const conn = await mongoose.connect(MONGODB_URI, opts);
        // console.log("✅ MongoDB connected successfully (new connection)");
        return conn;
      } catch (err) {
        // console.error("❌ MongoDB connection error:", err);
        throw err; // safer than process.exit(1)
      }
    })();
  } else {
    // console.log("⏳ MongoDB connection already in progress...");
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

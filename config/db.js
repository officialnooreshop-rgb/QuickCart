import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

function normalizeMongoUri(uri) {
  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }

  const trimmedUri = uri.trim();

  if (!trimmedUri.startsWith("mongodb://") && !trimmedUri.startsWith("mongodb+srv://")) {
    return `mongodb://localhost:27017/${trimmedUri}`;
  }

  const parsedUri = new URL(trimmedUri);

  if (!parsedUri.pathname || parsedUri.pathname === "/") {
    parsedUri.pathname = "/quickcart";
  }

  return parsedUri.toString();
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    const mongoUri = normalizeMongoUri(process.env.MONGODB_URI);
    cached.promise = mongoose.connect(mongoUri, opts).then(() => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
import mongoose, { type Mongoose } from "mongoose";

type MongooseCache = {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cache = globalWithMongoose.mongooseCache ?? {
  connection: null,
  promise: null,
};

globalWithMongoose.mongooseCache = cache;

export async function connectDB(): Promise<Mongoose> {
  const mongodbUri = process.env.MONGODB_URI;
  if (!mongodbUri) {
    throw new Error("MONGODB_URI is not defined. Add it to .env.local.");
  }

  if (cache.connection) return cache.connection;

  cache.promise ??= mongoose.connect(mongodbUri);

  try {
    cache.connection = await cache.promise;
  } catch (error: unknown) {
    cache.promise = null;
    throw error;
  }

  return cache.connection;
}

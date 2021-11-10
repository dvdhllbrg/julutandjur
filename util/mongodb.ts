import { Db, MongoClient, MongoClientOptions } from 'mongodb';

declare global {
  namespace NodeJS {
    interface Global {
      mongo: {
        conn: { client: MongoClient; db: Db; } | null;
        promise: Promise<{ client: MongoClient; db: Db; }> | null;
      };
    }
  }
}
const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local',
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  global.mongo = { conn: null, promise: null };
  cached = global.mongo;
}

const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = MongoClient.connect(MONGODB_URI).then((client) => ({
      client,
      db: client.db(MONGODB_DB),
    }));
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectToDatabase;

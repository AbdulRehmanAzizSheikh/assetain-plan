import { MongoClient, type Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getUri(): string {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error(
      "Missing MONGODB_URI — Vercel Project Settings → Environment Variables mein add karo.",
    );
  }
  return uri;
}

/** Reuse one client across serverless invocations (Vercel). */
function getClientPromise(): Promise<MongoClient> {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(getUri(), {
      maxPoolSize: 5,
      minPoolSize: 0,
      serverSelectionTimeoutMS: 15_000,
      connectTimeoutMS: 15_000,
    });
    global._mongoClientPromise = client.connect();
  }
  return global._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db();
}

export function mongoEnvHint(): string | null {
  if (!process.env.MONGODB_URI?.trim()) {
    return "MONGODB_URI Vercel pe set nahi hai.";
  }
  return null;
}

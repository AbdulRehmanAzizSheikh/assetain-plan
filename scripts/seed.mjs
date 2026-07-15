import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnv() {
  try {
    const text = readFileSync(join(root, ".env"), "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    console.error("Could not read .env");
    process.exit(1);
  }
}

loadEnv();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Missing MONGODB_URI in .env");
  process.exit(1);
}

const seed = JSON.parse(
  readFileSync(join(root, "data", "seed-plan.json"), "utf8"),
);

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db();
  await db.collection("plan").updateOne(
    { _id: "main" },
    { $set: { ...seed, updatedAt: new Date() } },
    { upsert: true },
  );
  console.log("✅ Seeded plan → MongoDB database:", db.databaseName);
} catch (e) {
  console.error("❌ Seed failed:", e.message);
  process.exit(1);
} finally {
  await client.close();
}

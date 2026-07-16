import AiEditor from "@/components/AiEditor";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PlanView from "@/components/PlanView";
import SessionKeepAlive from "@/components/SessionKeepAlive";
import { getPlanContent } from "@/lib/content";
import { EMPTY_CONTENT } from "@/lib/empty-content";
import { mongoEnvHint } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export default async function Home() {
  let content = EMPTY_CONTENT;
  let loadError: string | null = null;

  const envHint = mongoEnvHint();
  if (envHint) {
    loadError = envHint;
  } else {
    try {
      content = await getPlanContent();
    } catch (e) {
      console.error(e);
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("MONGODB_URI")) {
        loadError = msg;
      } else if (
        msg.includes("ECONNREFUSED") ||
        msg.includes("querySrv") ||
        msg.includes("ENOTFOUND") ||
        msg.includes("timed out") ||
        msg.includes("Server selection")
      ) {
        loadError =
          "MongoDB Atlas tak reach nahi ho raha. Atlas → Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0) karo, phir Vercel Redeploy.";
      } else {
        loadError = `MongoDB error: ${msg}`;
      }
    }
  }

  return (
    <>
      <SessionKeepAlive />
      <Header />
      {loadError && (
        <div className="mx-auto max-w-3xl px-4 pt-4">
          <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
            {loadError}
          </p>
        </div>
      )}
      <PlanView content={content} />
      <Footer />
      <AiEditor />
    </>
  );
}

import AiEditor from "@/components/AiEditor";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PlanView from "@/components/PlanView";
import SessionKeepAlive from "@/components/SessionKeepAlive";
import { getPlanContent } from "@/lib/content";
import { EMPTY_CONTENT } from "@/lib/empty-content";

export const dynamic = "force-dynamic";

export default async function Home() {
  let content = EMPTY_CONTENT;
  let loadError: string | null = null;

  try {
    content = await getPlanContent();
  } catch (e) {
    console.error(e);
    loadError =
      "MongoDB connect nahi hua. Atlas Network Access / URI check karo. Abhi page empty hai.";
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

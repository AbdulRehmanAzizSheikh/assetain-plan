"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Msg = { role: "user" | "assistant"; text: string };

export default function AiEditor() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Batao kya add, edit, ya delete karna hai. Pehli baar: Seed Mongo dabao taake purana plan DB mein aa jaye.",
    },
  ]);

  async function seedMongo() {
    setSeeding(true);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setMessages((m) => [
          ...m,
          { role: "assistant", text: data.error || "Seed failed" },
        ]);
        return;
      }
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "✅ Full plan MongoDB mein seed ho gaya. Page refresh…",
        },
      ]);
      router.refresh();
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Seed network error." },
      ]);
    } finally {
      setSeeding(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const message = input.trim();
    if (!message || loading) return;

    setInput("");
    setMessages((m) => [...m, { role: "user", text: message }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages((m) => [
          ...m,
          { role: "assistant", text: data.error || "Failed to update." },
        ]);
        return;
      }
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "✅ Plan update ho gaya aur MongoDB mein save ho gaya. Page refresh…",
        },
      ]);
      router.refresh();
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Network error. Dobara try karo." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-500"
      >
        {open ? "Close AI" : "AI Edit"}
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 z-50 flex h-[460px] w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-xl border border-white/20 bg-primary-900/95 text-gray-100 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-sm font-semibold">
            <span>Assetain plan AI</span>
            <button
              type="button"
              onClick={seedMongo}
              disabled={seeding}
              className="rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/20 disabled:opacity-50"
            >
              {seeding ? "Seeding…" : "Seed Mongo"}
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {messages.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                className={`rounded-lg px-3 py-2 ${
                  msg.role === "user"
                    ? "ml-6 bg-primary-600"
                    : "mr-6 bg-white/10"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <p className="text-xs text-primary-200">AI soch raha hai…</p>
            )}
          </div>
          <form
            onSubmit={onSubmit}
            className="flex gap-2 border-t border-white/10 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Kya change karna hai?"
              className="flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-lg bg-primary-500 px-3 py-2 text-sm font-medium disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

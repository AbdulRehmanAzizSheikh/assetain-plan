"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function UnlockPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Wrong code");
        return;
      }
      router.replace("/");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-xl border border-primary-200/60 bg-white/90 p-8 shadow-lg backdrop-blur-sm dark:border-white/20 dark:bg-white/10"
      >
        <h1 className="mb-2 text-2xl font-bold text-primary-700 dark:text-primary-100">
          Assetain
        </h1>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
          Enter the access code to open the blueprint site.
        </p>
        <label className="mb-2 block text-sm font-medium" htmlFor="code">
          Access code
        </label>
        <input
          id="code"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="mb-4 w-full rounded-lg border border-primary-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-primary-500 dark:border-primary-600 dark:bg-primary-900/50 dark:text-white"
          placeholder="Enter access code"
        />
        {error && (
          <p className="mb-3 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full rounded-lg bg-primary-600 py-3 font-medium text-white transition hover:bg-primary-500 disabled:opacity-50"
        >
          {loading ? "Checking…" : "Unlock"}
        </button>
      </form>
    </div>
  );
}

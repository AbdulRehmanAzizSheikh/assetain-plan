"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import Spinner from "./Spinner";
import LoadingScreen from "./LoadingScreen";

const navLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#features", label: "Features" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#blueprint", label: "Blueprint" },
];

export default function Header() {
  const router = useRouter();
  const [locking, setLocking] = useState(false);

  async function logout() {
    if (locking) return;
    setLocking(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/unlock");
      router.refresh();
    } catch {
      setLocking(false);
    }
  }

  return (
    <>
      {locking && <LoadingScreen message="Locking…" />}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-primary-900/80 backdrop-blur-md dark:border-white/10 dark:bg-primary-900/80">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 p-4 md:p-6">
          <h1 className="text-xl font-bold text-primary-200 md:text-2xl">
            Assetain
          </h1>
          <nav className="hidden gap-4 text-sm md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-primary-100 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={logout}
              disabled={locking}
              className="flex items-center gap-2 rounded bg-white/10 px-3 py-2 text-sm transition hover:bg-white/20 disabled:opacity-60"
            >
              {locking ? (
                <>
                  <Spinner size="sm" className="text-primary-100" />
                  Locking…
                </>
              ) : (
                "Lock"
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

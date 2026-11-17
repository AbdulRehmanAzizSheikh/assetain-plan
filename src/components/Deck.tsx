"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { pitch } from "@/lib/pitch";

type Slide = { id: string; title: string; body: ReactNode };

export default function Deck() {
  const slides: Slide[] = [
    {
      id: "title",
      title: pitch.brand,
      body: (
        <div>
          <p className="text-xl md:text-2xl text-blue-200">{pitch.tagline}</p>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300">{pitch.heroSubtitle}</p>
        </div>
      ),
    },
    {
      id: "problem",
      title: "The Problem",
      body: (
        <ul className="max-w-3xl mx-auto space-y-3 text-lg text-gray-200 list-disc list-inside">
          {pitch.problem.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      ),
    },
    {
      id: "solution",
      title: "Our Solution",
      body: (
        <ul className="max-w-3xl mx-auto space-y-3 text-lg text-gray-200 list-disc list-inside">
          {pitch.solution.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      ),
    },
    {
      id: "benefits",
      title: "Why It Matters",
      body: (
        <ul className="max-w-3xl mx-auto space-y-3 text-lg text-gray-200 list-disc list-inside">
          {pitch.benefits.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      ),
    },
    {
      id: "product",
      title: "Product",
      body: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {pitch.features.map((f, i) => (
            <div key={i} className="rounded-xl bg-white/10 p-5 text-left">
              <div className="font-semibold text-white">{f.title}</div>
              <div className="text-gray-300 text-sm mt-1">{f.desc}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "customers",
      title: "Who Uses It",
      body: (
        <ul className="max-w-3xl mx-auto space-y-2 text-lg text-gray-200 list-disc list-inside">
          {pitch.targetCustomers.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      ),
    },
    {
      id: "roles",
      title: "Roles & Access",
      body: (
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-2 text-white">Role</th>
                <th className="p-2 text-white">Permissions</th>
              </tr>
            </thead>
            <tbody>
              {pitch.roles.map((r, i) => (
                <tr key={i} className="border-b border-white/10">
                  <td className="p-2 font-medium text-white">{r.role}</td>
                  <td className="p-2 text-gray-300">{r.permissions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: "business",
      title: "Business Model",
      body: (
        <ul className="max-w-3xl mx-auto space-y-3 text-lg text-gray-200 list-disc list-inside">
          {pitch.businessModel.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      ),
    },
    {
      id: "roadmap",
      title: "Roadmap",
      body: (
        <ol className="max-w-3xl mx-auto space-y-3 text-lg text-gray-200 list-decimal list-inside">
          {pitch.roadmap.map((r, i) => <li key={i}>{r}</li>)}
        </ol>
      ),
    },
    {
      id: "ask",
      title: "The Ask",
      body: (
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-200 mb-6">{pitch.ask}</p>
          <a
            href={`mailto:${pitch.contact}`}
            className="inline-block rounded-lg bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-400"
          >
            {pitch.contact}
          </a>
        </div>
      ),
    },
  ];

  const [index, setIndex] = useState(0);
  const total = slides.length;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") setIndex((i) => Math.min(total - 1, i + 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
      if (e.key === "Home") setIndex(0);
      if (e.key === "End") setIndex(total - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  const slide = slides[index];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-sm font-medium text-gray-300">Assetain – Investor Deck</div>
        <div className="text-sm text-gray-400">{index + 1} / {total}</div>
      </div>
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-5xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">{slide?.title}</h1>
          {slide?.body}
        </div>
      </div>
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20 disabled:opacity-40"
        >
          ← Prev
        </button>
        <div className="flex gap-1 flex-wrap justify-center max-w-md">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition ${i === index ? "bg-blue-400" : "bg-white/30 hover:bg-white/60"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
          disabled={index === total - 1}
          className="rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20 disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

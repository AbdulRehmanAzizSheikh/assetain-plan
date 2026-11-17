"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { PlanContent } from "@/lib/types";

type Slide = { id: string; title: string; body: ReactNode };

export default function Presentation({ content }: { content: PlanContent }) {
  const c = content;
  const slides: Slide[] = [];

  if (c.hero.title || c.hero.subtitle) {
    slides.push({
      id: "hero",
      title: c.hero.title,
      body: <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">{c.hero.subtitle}</p>,
    });
  }
  if (c.overview.title || c.overview.subtitle) {
    slides.push({
      id: "overview",
      title: c.overview.title,
      body: <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">{c.overview.subtitle}</p>,
    });
  }
  if (c.about.title || c.about.paragraphs.length) {
    slides.push({
      id: "about",
      title: c.about.title,
      body: (
        <div className="max-w-3xl mx-auto space-y-3 text-lg text-gray-200">
          {c.about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      ),
    });
  }
  if (c.problem.title || c.problem.items.length) {
    slides.push({
      id: "problem",
      title: c.problem.title,
      body: (
        <ul className="max-w-3xl mx-auto space-y-3 text-lg text-gray-200 list-disc list-inside">
          {c.problem.items.map((it, i) => <li key={i}>{it}</li>)}
        </ul>
      ),
    });
  }
  if (c.solution.title || c.solution.paragraphs.length) {
    slides.push({
      id: "solution",
      title: c.solution.title,
      body: (
        <div className="max-w-3xl mx-auto space-y-3 text-lg text-gray-200">
          {c.solution.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      ),
    });
  }
  if (c.features.title || c.features.items.length) {
    slides.push({
      id: "features",
      title: c.features.title,
      body: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {c.features.items.map((f, i) => (
            <div key={i} className="rounded-xl bg-white/10 p-5 text-left">
              <div className="font-semibold text-white">{f.title}</div>
              <div className="text-gray-300 text-sm mt-1">{f.desc}</div>
            </div>
          ))}
        </div>
      ),
    });
  }
  if (c.overviewRoles.title || c.overviewRoles.rows.length) {
    slides.push({
      id: "roles",
      title: c.overviewRoles.title,
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
              {c.overviewRoles.rows.map((r, i) => (
                <tr key={i} className="border-b border-white/10">
                  <td className="p-2 font-medium text-white">{r.role}</td>
                  <td className="p-2 text-gray-300">{r.permissions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    });
  }
  if (c.roadmap.title || c.roadmap.items.length) {
    slides.push({
      id: "roadmap",
      title: c.roadmap.title,
      body: (
        <ol className="max-w-3xl mx-auto space-y-3 text-lg text-gray-200 list-decimal list-inside">
          {c.roadmap.items.map((it, i) => <li key={i}>{it}</li>)}
        </ol>
      ),
    });
  }
  if (c.joinUs.title || c.joinUs.text) {
    slides.push({
      id: "join",
      title: c.joinUs.title,
      body: (
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-200 mb-6">{c.joinUs.text}</p>
          <a href={c.joinUs.ctaHref} className="inline-block rounded-lg bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-400">
            {c.joinUs.cta}
          </a>
        </div>
      ),
    });
  }
  if (c.blueprintIntro.title) {
    slides.push({
      id: "blueprint-intro",
      title: c.blueprintIntro.title,
      body: <p className="text-xl text-gray-200">{c.blueprintIntro.subtitle}</p>,
    });
  }
  if (c.coreConcept.title) {
    slides.push({
      id: "core-concept",
      title: c.coreConcept.title,
      body: (
        <div className="max-w-4xl mx-auto text-left space-y-4">
          <p><strong>Platform:</strong> <span className="text-blue-300">{c.coreConcept.platformName}</span></p>
          <pre className="overflow-x-auto rounded-lg bg-white/10 p-4 text-sm text-gray-200 whitespace-pre-wrap">{c.coreConcept.hierarchy}</pre>
          <p><strong>Terminology:</strong> {c.coreConcept.terminology}</p>
        </div>
      ),
    });
  }
  if (c.onboarding.title) {
    slides.push({
      id: "onboarding",
      title: c.onboarding.title,
      body: (
        <ol className="max-w-3xl mx-auto space-y-3 text-lg text-gray-200 list-decimal list-inside">
          {c.onboarding.steps.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      ),
    });
  }
  if (c.rbac.title) {
    slides.push({
      id: "rbac",
      title: c.rbac.title,
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
              {c.rbac.rows.map((r, i) => (
                <tr key={i} className="border-b border-white/10">
                  <td className="p-2 font-medium text-white">{r.role}</td>
                  <td className="p-2 text-gray-300">{r.permissions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    });
  }
  if (c.qrFlow.title) {
    slides.push({
      id: "qrflow",
      title: c.qrFlow.title,
      body: (
        <div className="max-w-3xl mx-auto space-y-3 text-lg text-gray-200">
          <p><strong>Scanning:</strong> {c.qrFlow.scanning}</p>
          <p className="font-semibold">{c.qrFlow.optionsTitle}</p>
          <ul className="list-disc list-inside space-y-1">
            {c.qrFlow.options.map((o, i) => <li key={i}>{o}</li>)}
          </ul>
          <p><strong>Smart Routing:</strong> {c.qrFlow.routing}</p>
        </div>
      ),
    });
  }
  if (c.resolution.title) {
    slides.push({
      id: "resolution",
      title: c.resolution.title,
      body: (
        <ol className="max-w-3xl mx-auto space-y-3 text-lg text-gray-200 list-decimal list-inside">
          {c.resolution.steps.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      ),
    });
  }
  if (c.nextSteps.title) {
    slides.push({
      id: "nextsteps",
      title: c.nextSteps.title,
      body: (
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-200 mb-6">{c.nextSteps.text}</p>
          <a href={c.nextSteps.ctaHref} className="inline-block rounded-lg bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-400">
            {c.nextSteps.cta}
          </a>
        </div>
      ),
    });
  }
  c.extraSections?.forEach((s) => {
    slides.push({
      id: s.id,
      title: s.title,
      body: (
        <div className="max-w-3xl mx-auto space-y-3 text-lg text-gray-200">
          <p className="whitespace-pre-wrap">{s.body}</p>
          {s.listItems && s.listItems.length > 0 && (
            <ul className="list-disc list-inside space-y-1">
              {s.listItems.map((it, i) => <li key={i}>{it}</li>)}
            </ul>
          )}
        </div>
      ),
    });
  });

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
        <div className="text-sm font-medium text-gray-300">Assetain – Investor Presentation</div>
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

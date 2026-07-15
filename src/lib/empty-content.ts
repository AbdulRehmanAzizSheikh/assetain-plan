import type { PlanContent } from "./types";

/** Empty scaffold only — website shows nothing until MongoDB has data. */
export const EMPTY_CONTENT: PlanContent = {
  hero: { title: "", subtitle: "" },
  overview: { title: "", subtitle: "" },
  about: { title: "", paragraphs: [] },
  problem: { title: "", items: [] },
  solution: { title: "", paragraphs: [] },
  features: { title: "", items: [] },
  overviewRoles: { title: "", rows: [] },
  roadmap: { title: "", items: [] },
  joinUs: { title: "", text: "", cta: "", ctaHref: "" },
  blueprintIntro: { title: "", subtitle: "" },
  coreConcept: {
    title: "",
    platformName: "",
    hierarchy: "",
    terminology: "",
  },
  onboarding: { title: "", steps: [] },
  rbac: { title: "", rows: [] },
  qrFlow: {
    title: "",
    scanning: "",
    optionsTitle: "",
    options: [],
    routing: "",
  },
  resolution: { title: "", steps: [] },
  nextSteps: { title: "", text: "", cta: "", ctaHref: "" },
  extraSections: [],
};

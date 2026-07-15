export type RoleRow = {
  role: string;
  permissions: string;
};

export type Feature = {
  title: string;
  desc: string;
};

export type ExtraSection = {
  id: string;
  title: string;
  body: string;
  listItems?: string[];
};

export type PlanContent = {
  hero: {
    title: string;
    subtitle: string;
  };
  overview: {
    title: string;
    subtitle: string;
  };
  about: {
    title: string;
    paragraphs: string[];
  };
  problem: {
    title: string;
    items: string[];
  };
  solution: {
    title: string;
    paragraphs: string[];
  };
  features: {
    title: string;
    items: Feature[];
  };
  overviewRoles: {
    title: string;
    rows: RoleRow[];
  };
  roadmap: {
    title: string;
    items: string[];
  };
  joinUs: {
    title: string;
    text: string;
    cta: string;
    ctaHref: string;
  };
  blueprintIntro: {
    title: string;
    subtitle: string;
  };
  coreConcept: {
    title: string;
    platformName: string;
    hierarchy: string;
    terminology: string;
  };
  onboarding: {
    title: string;
    steps: string[];
  };
  rbac: {
    title: string;
    rows: RoleRow[];
  };
  qrFlow: {
    title: string;
    scanning: string;
    optionsTitle: string;
    options: string[];
    routing: string;
  };
  resolution: {
    title: string;
    steps: string[];
  };
  nextSteps: {
    title: string;
    text: string;
    cta: string;
    ctaHref: string;
  };
  /** AI can add brand-new sections here */
  extraSections: ExtraSection[];
};

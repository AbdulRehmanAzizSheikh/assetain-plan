import { EMPTY_CONTENT } from "./empty-content";
import { getDb } from "./mongodb";
import type { PlanContent } from "./types";

const COLLECTION = "plan";
const DOC_ID = "main";

type PlanDoc = PlanContent & {
  _id: string;
  updatedAt?: Date;
};

function normalize(doc: Partial<PlanContent>): PlanContent {
  return {
    ...EMPTY_CONTENT,
    ...doc,
    hero: { ...EMPTY_CONTENT.hero, ...doc.hero },
    overview: { ...EMPTY_CONTENT.overview, ...doc.overview },
    about: { ...EMPTY_CONTENT.about, ...doc.about },
    problem: { ...EMPTY_CONTENT.problem, ...doc.problem },
    solution: { ...EMPTY_CONTENT.solution, ...doc.solution },
    features: { ...EMPTY_CONTENT.features, ...doc.features },
    overviewRoles: { ...EMPTY_CONTENT.overviewRoles, ...doc.overviewRoles },
    roadmap: { ...EMPTY_CONTENT.roadmap, ...doc.roadmap },
    joinUs: { ...EMPTY_CONTENT.joinUs, ...doc.joinUs },
    blueprintIntro: {
      ...EMPTY_CONTENT.blueprintIntro,
      ...doc.blueprintIntro,
    },
    coreConcept: { ...EMPTY_CONTENT.coreConcept, ...doc.coreConcept },
    onboarding: { ...EMPTY_CONTENT.onboarding, ...doc.onboarding },
    rbac: { ...EMPTY_CONTENT.rbac, ...doc.rbac },
    qrFlow: { ...EMPTY_CONTENT.qrFlow, ...doc.qrFlow },
    resolution: { ...EMPTY_CONTENT.resolution, ...doc.resolution },
    nextSteps: { ...EMPTY_CONTENT.nextSteps, ...doc.nextSteps },
    extraSections: doc.extraSections ?? [],
  };
}

/** Read only from MongoDB. No hardcoded plan data. Missing doc → empty. */
export async function getPlanContent(): Promise<PlanContent> {
  const db = await getDb();
  const col = db.collection<PlanDoc>(COLLECTION);
  const doc = await col.findOne({ _id: DOC_ID });

  if (!doc) {
    return { ...EMPTY_CONTENT };
  }

  const { _id: _unused, updatedAt: _u, ...rest } = doc;
  void _unused;
  void _u;
  return normalize(rest);
}

export async function savePlanContent(content: PlanContent): Promise<void> {
  const db = await getDb();
  await db.collection<PlanDoc>(COLLECTION).updateOne(
    { _id: DOC_ID },
    {
      $set: {
        ...content,
        updatedAt: new Date(),
      },
    },
    { upsert: true },
  );
}

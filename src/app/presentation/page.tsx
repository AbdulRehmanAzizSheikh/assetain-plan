import Presentation from "@/components/Presentation";
import type { PlanContent } from "@/lib/types";
import planData from "../../../data/seed-plan.json";

export default function PresentationPage() {
  const content = planData as PlanContent;
  return <Presentation content={content} />;
}

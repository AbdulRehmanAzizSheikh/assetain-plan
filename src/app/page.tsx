import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PlanView from "@/components/PlanView";
import type { PlanContent } from "@/lib/types";
import planData from "../../data/seed-plan.json";

export default function Home() {
  const content = planData as PlanContent;
  return (
    <>
      <Header />
      <PlanView content={content} />
      <Footer />
    </>
  );
}

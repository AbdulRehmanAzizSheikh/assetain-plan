import { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title?: string;
  children: ReactNode;
  centered?: boolean;
};

export default function Section({
  id,
  title,
  children,
  centered = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`rounded-xl border border-primary-200/60 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-white/20 dark:bg-white/10 md:p-8 ${centered ? "text-center" : ""}`}
    >
      {title && (
        <h2 className="mb-4 text-2xl font-semibold text-primary-700 dark:text-primary-100 md:text-3xl">
          {title}
        </h2>
      )}
      <div className="text-gray-700 dark:text-gray-100">{children}</div>
    </section>
  );
}

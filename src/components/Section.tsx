import { ReactNode } from "react";

type Props = {
  id?: string;
  title?: string;
  children: ReactNode;
  centered?: boolean;
};

export default function Section({ id, title, children, centered = false }: Props) {
  return (
    <section
      id={id}
      className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 md:p-8"
    >
      {title && (
        <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">
          {title}
        </h2>
      )}
      <div className={`text-gray-700 dark:text-gray-200 ${centered ? "text-center" : ""}`}>
        {children}
      </div>
    </section>
  );
}

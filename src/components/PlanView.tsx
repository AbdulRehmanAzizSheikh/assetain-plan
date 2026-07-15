import Section from "@/components/Section";
import type { PlanContent, RoleRow } from "@/lib/types";

function hasText(...parts: (string | undefined)[]) {
  return parts.some((p) => Boolean(p && p.trim()));
}

function RoleTable({ rows }: { rows: RoleRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-primary-100 dark:bg-primary-800">
            <th className="border border-primary-300 p-2 text-left dark:border-primary-600">
              Role
            </th>
            <th className="border border-primary-300 p-2 text-left dark:border-primary-600">
              Permissions
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={`${row.role}-${i}`}
              className={
                i % 2 === 0
                  ? "bg-primary-50/50 dark:bg-white/5"
                  : "bg-white/60 dark:bg-white/10"
              }
            >
              <td className="border border-primary-300 p-2 dark:border-primary-600">
                {row.role}
              </td>
              <td className="border border-primary-300 p-2 dark:border-primary-600">
                {row.permissions}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PlanView({ content }: { content: PlanContent }) {
  const c = content;
  const isEmpty =
    !hasText(c.hero.title, c.overview.title, c.about.title) &&
    !(c.features.items?.length || c.roadmap.items?.length || c.extraSections?.length);

  if (isEmpty) {
    return (
      <main className="container mx-auto p-6 md:p-10">
        <div className="rounded-xl border border-dashed border-primary-300/50 bg-white/40 p-10 text-center dark:border-white/20 dark:bg-white/5">
          <h2 className="mb-2 text-2xl font-bold text-primary-700 dark:text-primary-100">
            No plan data yet
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            MongoDB mein abhi content nahi hai. Neeche{" "}
            <strong>AI Edit</strong> se add karo, ya{" "}
            <code className="rounded bg-black/10 px-1 dark:bg-white/10">
              npm run seed
            </code>{" "}
            chalao.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto space-y-10 p-4 md:space-y-12 md:p-6">
      {hasText(c.hero.title, c.hero.subtitle) && (
        <Section centered>
          {c.hero.title && (
            <h2 className="mb-4 text-3xl font-extrabold text-primary-700 dark:text-primary-100 md:text-4xl">
              {c.hero.title}
            </h2>
          )}
          {c.hero.subtitle && (
            <p className="mx-auto max-w-3xl text-lg">{c.hero.subtitle}</p>
          )}
        </Section>
      )}

      {hasText(c.overview.title, c.overview.subtitle) && (
        <Section id="overview" centered>
          {c.overview.title && (
            <h2 className="mb-4 text-3xl font-extrabold text-primary-700 dark:text-primary-100 md:text-4xl">
              {c.overview.title}
            </h2>
          )}
          {c.overview.subtitle && (
            <p className="mx-auto max-w-2xl text-lg">{c.overview.subtitle}</p>
          )}
        </Section>
      )}

      {(hasText(c.about.title) || c.about.paragraphs.length > 0) && (
        <Section title={c.about.title || undefined}>
          {c.about.paragraphs.map((p, i) => (
            <p key={i} className="mb-3 last:mb-0">
              {p}
            </p>
          ))}
        </Section>
      )}

      {(hasText(c.problem.title) || c.problem.items.length > 0) && (
        <Section id="problem" title={c.problem.title || undefined}>
          <ul className="list-inside list-disc space-y-2">
            {c.problem.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {(hasText(c.solution.title) || c.solution.paragraphs.length > 0) && (
        <Section id="solution" title={c.solution.title || undefined}>
          {c.solution.paragraphs.map((p, i) => (
            <p key={i} className="mb-3 last:mb-0">
              {p}
            </p>
          ))}
        </Section>
      )}

      {(hasText(c.features.title) || c.features.items.length > 0) && (
        <Section id="features" title={c.features.title || undefined}>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {c.features.items.map((f, i) => (
              <li
                key={i}
                className="rounded bg-primary-50/80 p-4 dark:bg-white/5"
              >
                <strong>{f.title}</strong> – {f.desc}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {(hasText(c.overviewRoles.title) || c.overviewRoles.rows.length > 0) && (
        <Section title={c.overviewRoles.title || undefined}>
          <RoleTable rows={c.overviewRoles.rows} />
        </Section>
      )}

      {(hasText(c.roadmap.title) || c.roadmap.items.length > 0) && (
        <Section id="roadmap" title={c.roadmap.title || undefined}>
          <ol className="list-inside list-decimal space-y-2">
            {c.roadmap.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </Section>
      )}

      {hasText(c.joinUs.title, c.joinUs.text) && (
        <Section centered>
          {c.joinUs.title && (
            <h2 className="mb-4 text-2xl font-semibold text-primary-700 dark:text-primary-100">
              {c.joinUs.title}
            </h2>
          )}
          {c.joinUs.text && <p className="mb-4">{c.joinUs.text}</p>}
          {c.joinUs.cta && (
            <a
              href={c.joinUs.ctaHref || "#"}
              className="inline-block rounded bg-primary-600 px-6 py-2 font-medium text-white transition hover:bg-primary-500"
            >
              {c.joinUs.cta}
            </a>
          )}
        </Section>
      )}

      {hasText(c.blueprintIntro.title, c.blueprintIntro.subtitle) && (
        <div id="blueprint" className="pt-4 text-center">
          {c.blueprintIntro.title && (
            <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-200 md:text-3xl">
              {c.blueprintIntro.title}
            </h2>
          )}
          {c.blueprintIntro.subtitle && (
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {c.blueprintIntro.subtitle}
            </p>
          )}
        </div>
      )}

      {(hasText(c.coreConcept.title) ||
        hasText(c.coreConcept.platformName, c.coreConcept.hierarchy)) && (
        <Section title={c.coreConcept.title || undefined}>
          {c.coreConcept.platformName && (
            <p className="mb-2">
              <strong>SaaS Platform Name:</strong>{" "}
              <span className="text-primary-600 dark:text-primary-300">
                {c.coreConcept.platformName}
              </span>
            </p>
          )}
          {c.coreConcept.hierarchy && (
            <>
              <p className="mb-2">
                <strong>Hierarchy Structure:</strong>
              </p>
              <pre className="overflow-x-auto rounded bg-primary-50/80 p-4 text-sm dark:bg-white/5">
                {c.coreConcept.hierarchy}
              </pre>
            </>
          )}
          {c.coreConcept.terminology && (
            <p className="mt-2">
              <strong>Terminology Choice:</strong> {c.coreConcept.terminology}
            </p>
          )}
        </Section>
      )}

      {(hasText(c.onboarding.title) || c.onboarding.steps.length > 0) && (
        <Section title={c.onboarding.title || undefined}>
          <ol className="list-inside list-decimal space-y-2">
            {c.onboarding.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </Section>
      )}

      {(hasText(c.rbac.title) || c.rbac.rows.length > 0) && (
        <Section title={c.rbac.title || undefined}>
          <RoleTable rows={c.rbac.rows} />
        </Section>
      )}

      {(hasText(c.qrFlow.title) ||
        hasText(c.qrFlow.scanning, c.qrFlow.routing) ||
        c.qrFlow.options.length > 0) && (
        <Section title={c.qrFlow.title || undefined}>
          {c.qrFlow.scanning && (
            <p className="mb-3">
              <strong>Scanning:</strong> {c.qrFlow.scanning}
            </p>
          )}
          {c.qrFlow.optionsTitle && (
            <p className="mb-3">
              <strong>{c.qrFlow.optionsTitle}</strong>
            </p>
          )}
          {c.qrFlow.options.length > 0 && (
            <ul className="ml-4 list-inside list-disc space-y-1">
              {c.qrFlow.options.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          )}
          {c.qrFlow.routing && (
            <p className="mt-3">
              <strong>Smart Routing:</strong> {c.qrFlow.routing}
            </p>
          )}
        </Section>
      )}

      {(hasText(c.resolution.title) || c.resolution.steps.length > 0) && (
        <Section title={c.resolution.title || undefined}>
          <ol className="list-inside list-decimal space-y-2">
            {c.resolution.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </Section>
      )}

      {c.extraSections?.map((section) => (
        <Section key={section.id} title={section.title}>
          <p className="mb-3 whitespace-pre-wrap">{section.body}</p>
          {section.listItems && section.listItems.length > 0 && (
            <ul className="list-inside list-disc space-y-2">
              {section.listItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </Section>
      ))}

      {hasText(c.nextSteps.title, c.nextSteps.text) && (
        <Section centered>
          {c.nextSteps.title && (
            <h2 className="mb-4 text-2xl font-semibold text-primary-700 dark:text-primary-100">
              {c.nextSteps.title}
            </h2>
          )}
          {c.nextSteps.text && <p className="mb-4">{c.nextSteps.text}</p>}
          {c.nextSteps.cta && (
            <a
              href={c.nextSteps.ctaHref || "#"}
              className="inline-block rounded bg-primary-600 px-6 py-2 font-medium text-white transition hover:bg-primary-500"
            >
              {c.nextSteps.cta}
            </a>
          )}
        </Section>
      )}
    </main>
  );
}

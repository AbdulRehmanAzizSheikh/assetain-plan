import Section from "@/components/Section";
import type { PlanContent, RoleRow } from "@/lib/types";

function hasText(...parts: (string | undefined)[]) {
  return parts.some((p) => Boolean(p && p.trim()));
}

function RoleTable({ rows }: { rows: RoleRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 dark:bg-white/10">
            <th className="border border-gray-200 p-2 text-left dark:border-white/10">Role</th>
            <th className="border border-gray-200 p-2 text-left dark:border-white/10">
              Permissions
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={`${row.role}-${i}`}
              className={i % 2 === 0 ? "bg-gray-50/60 dark:bg-white/5" : "bg-white dark:bg-white/10"}
            >
              <td className="border border-gray-200 p-2 font-medium dark:border-white/10">
                {row.role}
              </td>
              <td className="border border-gray-200 p-2 dark:border-white/10">{row.permissions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PlanView({ content }: { content: PlanContent }) {
  const c = content;
  return (
    <main className="container mx-auto space-y-8 px-4 py-8 md:space-y-10 md:px-6">
      {hasText(c.hero.title, c.hero.subtitle) && (
        <Section centered>
          {c.hero.title && (
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
              {c.hero.title}
            </h1>
          )}
          {c.hero.subtitle && <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">{c.hero.subtitle}</p>}
        </Section>
      )}

      {hasText(c.overview.title, c.overview.subtitle) && (
        <Section id="overview" centered>
          {c.overview.title && (
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl">
              {c.overview.title}
            </h2>
          )}
          {c.overview.subtitle && (
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">{c.overview.subtitle}</p>
          )}
        </Section>
      )}

      {(hasText(c.about.title) || c.about.paragraphs.length > 0) && (
        <Section title={c.about.title || undefined}>
          {c.about.paragraphs.map((p, i) => (
            <p key={i} className="mb-3 last:mb-0">{p}</p>
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
            <p key={i} className="mb-3 last:mb-0">{p}</p>
          ))}
        </Section>
      )}

      {(hasText(c.features.title) || c.features.items.length > 0) && (
        <Section id="features" title={c.features.title || undefined}>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {c.features.items.map((f, i) => (
              <li key={i} className="rounded-xl bg-gray-50 p-4 dark:bg-white/5">
                <strong className="text-gray-900 dark:text-white">{f.title}</strong> – {f.desc}
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
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">{c.joinUs.title}</h2>
          )}
          {c.joinUs.text && <p className="mb-4 text-gray-600 dark:text-gray-300">{c.joinUs.text}</p>}
          {c.joinUs.cta && (
            <a
              href={c.joinUs.ctaHref || "#"}
              className="inline-block rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-500"
            >
              {c.joinUs.cta}
            </a>
          )}
        </Section>
      )}

      {hasText(c.blueprintIntro.title, c.blueprintIntro.subtitle) && (
        <div id="blueprint" className="pt-4 text-center">
          {c.blueprintIntro.title && (
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 md:text-3xl">
              {c.blueprintIntro.title}
            </h2>
          )}
          {c.blueprintIntro.subtitle && (
            <p className="mt-2 text-gray-600 dark:text-gray-300">{c.blueprintIntro.subtitle}</p>
          )}
        </div>
      )}

      {(hasText(c.coreConcept.title) ||
        hasText(c.coreConcept.platformName, c.coreConcept.hierarchy)) && (
        <Section title={c.coreConcept.title || undefined}>
          {c.coreConcept.platformName && (
            <p className="mb-2">
              <strong>SaaS Platform Name:</strong>{" "}
              <span className="text-blue-600 dark:text-blue-400">{c.coreConcept.platformName}</span>
            </p>
          )}
          {c.coreConcept.hierarchy && (
            <>
              <p className="mb-2 font-semibold">Hierarchy Structure:</p>
              <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm dark:bg-white/5">
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
          {c.qrFlow.optionsTitle && <p className="mb-3 font-semibold">{c.qrFlow.optionsTitle}</p>}
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
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">{c.nextSteps.title}</h2>
          )}
          {c.nextSteps.text && <p className="mb-4 text-gray-600 dark:text-gray-300">{c.nextSteps.text}</p>}
          {c.nextSteps.cta && (
            <a
              href={c.nextSteps.ctaHref || "#"}
              className="inline-block rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-500"
            >
              {c.nextSteps.cta}
            </a>
          )}
        </Section>
      )}
    </main>
  );
}

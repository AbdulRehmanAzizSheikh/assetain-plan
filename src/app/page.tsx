import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { pitch } from "@/lib/pitch";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white">
          <div className="container mx-auto px-4 py-24 md:px-6 md:py-32">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-200">
              Investor Pitch
            </p>
            <h1 className="text-4xl font-extrabold md:text-6xl">
              {pitch.brand}
            </h1>
            <p className="mt-2 text-xl text-blue-100 md:text-2xl">{pitch.tagline}</p>
            <p className="mt-6 max-w-2xl text-lg text-blue-100/90">{pitch.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/deck"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                View Investor Deck
              </a>
              <a
                href={`mailto:${pitch.contact}`}
                className="rounded-lg border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section id="problem" className="container mx-auto px-4 py-16 md:px-6">
          <h2 className="text-3xl font-bold md:text-4xl">The Problem</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Physical assets break, and reporting them is painful.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {pitch.problem.map((p, i) => (
              <li key={i} className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-white/10 dark:bg-white/5">
                {p}
              </li>
            ))}
          </ul>
        </section>

        {/* Solution */}
        <section id="solution" className="bg-gray-50 py-16 dark:bg-white/5">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold md:text-4xl">Our Solution</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              QR codes + a simple web workflow turn chaos into clarity.
            </p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {pitch.solution.map((s, i) => (
                <li key={i} className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-gray-900">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Benefits */}
        <section className="container mx-auto px-4 py-16 md:px-6">
          <h2 className="text-3xl font-bold md:text-4xl">Why It Matters</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {pitch.benefits.map((b, i) => (
              <li key={i} className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-blue-900 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-100">
                {b}
              </li>
            ))}
          </ul>
        </section>

        {/* Product */}
        <section id="product" className="bg-gray-50 py-16 dark:bg-white/5">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold md:text-4xl">Product</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {pitch.features.map((f, i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-gray-900">
                  <div className="font-semibold">{f.title}</div>
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Target customers */}
        <section className="container mx-auto px-4 py-16 md:px-6">
          <h2 className="text-3xl font-bold md:text-4xl">Who Uses It</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {pitch.targetCustomers.map((t, i) => (
              <li key={i} className="rounded-full border border-gray-300 px-4 py-2 text-sm dark:border-white/20">
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* Roles */}
        <section className="bg-gray-50 py-16 dark:bg-white/5">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold md:text-4xl">Roles & Access</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-white/10">
                    <th className="p-2 text-left">Role</th>
                    <th className="p-2 text-left">Permissions</th>
                  </tr>
                </thead>
                <tbody>
                  {pitch.roles.map((r, i) => (
                    <tr key={i} className="border-b border-gray-100 dark:border-white/5">
                      <td className="p-2 font-medium">{r.role}</td>
                      <td className="p-2 text-gray-600 dark:text-gray-300">{r.permissions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Business model */}
        <section className="container mx-auto px-4 py-16 md:px-6">
          <h2 className="text-3xl font-bold md:text-4xl">Business Model</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {pitch.businessModel.map((b, i) => (
              <li key={i} className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-white/10 dark:bg-white/5">
                {b}
              </li>
            ))}
          </ul>
        </section>

        {/* Roadmap */}
        <section id="roadmap" className="bg-gray-50 py-16 dark:bg-white/5">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold md:text-4xl">Roadmap</h2>
            <ol className="mt-6 list-decimal list-inside space-y-2">
              {pitch.roadmap.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ol>
          </div>
        </section>

        {/* Ask */}
        <section className="container mx-auto px-4 py-16 text-center md:px-6">
          <h2 className="text-3xl font-bold md:text-4xl">The Ask</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">{pitch.ask}</p>
          <a
            href={`mailto:${pitch.contact}`}
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Get in Touch
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

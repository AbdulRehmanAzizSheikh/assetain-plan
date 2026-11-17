import Link from "next/link";

const navLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#features", label: "Features" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#blueprint", label: "Blueprint" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-gray-900/80">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400 md:text-2xl">
          Assetain
        </Link>
        <nav className="hidden gap-4 text-sm md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

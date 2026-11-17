import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-gray-950/80">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400 md:text-2xl">
          Assetain
        </Link>
        <nav className="flex gap-4 text-sm">
          <a href="#problem" className="hover:text-blue-600 dark:hover:text-blue-400">Problem</a>
          <a href="#solution" className="hover:text-blue-600 dark:hover:text-blue-400">Solution</a>
          <a href="#product" className="hover:text-blue-600 dark:hover:text-blue-400">Product</a>
          <a href="#roadmap" className="hover:text-blue-600 dark:hover:text-blue-400">Roadmap</a>
          <Link href="/deck" className="rounded-lg bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-500">
            Investor Deck
          </Link>
        </nav>
      </div>
    </header>
  );
}

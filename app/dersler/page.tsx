import DerslerSection from "../components/DerslerSection"
import ThemeToggle from "../components/ThemeToggle"
import NavAuth from "../components/NavAuth"

export const metadata = {
  title: "Dersler — THE BARK",
  description: "A1'den C2'ye Almanca müfredatı. Grammatik, Wortschatz, Kommunikation ve Fertigkeiten.",
}

export default function DerslerPage() {
  return (
    <div className="page-root" style={{ minHeight: "100vh", background: "var(--bg-page)" }}>
      {/* Navbar */}
      <nav
        className="sticky top-0 z-50"
        style={{
          backdropFilter: "blur(20px)",
          background: "var(--bg-nav)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a
            href="/"
            className="text-2xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)", textDecoration: "none" }}
          >
            THE BARK
          </a>

          <div
            className="hidden items-center gap-8 text-sm font-medium md:flex"
            style={{ color: "var(--text-secondary)" }}
          >
            <a href="/dersler" className="transition-opacity" style={{ color: "var(--text-primary)", fontWeight: 700 }}>Dersler</a>
            <a href="/#ai-ogretmen" className="transition-opacity hover:opacity-80">AI Öğretmen</a>
            <a href="/kelimeler" className="transition-opacity hover:opacity-80">Kelimeler</a>
            <a href="/#fiyatlar" className="transition-opacity hover:opacity-80">Fiyatlar</a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <NavAuth />
          </div>
        </div>
      </nav>

      {/* Page header */}
      <div className="mx-auto max-w-7xl px-6 pb-2 pt-14">
        <p
          className="mb-2 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--text-secondary)" }}
        >
          Müfredat
        </p>
        <h1
          className="mb-2 text-5xl font-black md:text-6xl"
          style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)" }}
        >
          Dersler
        </h1>
        <p className="mb-12 text-base" style={{ color: "var(--text-secondary)" }}>
          A1'den B1'e kadar · Goethe-Institut & Cornelsen müfredatına dayalı · Gramer, kelime, iletişim ve beceriler
        </p>
      </div>

      <DerslerSection />

      {/* Footer */}
      <footer
        className="py-10 text-center text-sm"
        style={{
          color: "var(--text-secondary)",
          background: "var(--bg-page)",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <span
          className="mr-2 font-black"
          style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)" }}
        >
          THE BARK
        </span>
        © 2025 · Türkçe konuşanlara özel Almanca öğrenme platformu
      </footer>
    </div>
  )
}

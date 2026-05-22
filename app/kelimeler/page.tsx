import VocabSection from "../components/VocabSection"
import ThemeToggle from "../components/ThemeToggle"

export const metadata = {
  title: "Kelime Hazinesi — THE BARK",
  description: "109 kelime kartı. Tıkla, çevir, deste oluştur.",
}

export default function KelimelerPage() {
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
            <a href="/dersler" className="transition-opacity hover:opacity-80">Dersler</a>
            <a href="/#ai-ogretmen" className="transition-opacity hover:opacity-80">AI Öğretmen</a>
            <a
              href="/kelimeler"
              className="transition-opacity"
              style={{ color: "var(--text-primary)", fontWeight: 700 }}
            >
              Kelimeler
            </a>
            <a href="/#fiyatlar" className="transition-opacity hover:opacity-80">Fiyatlar</a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              className="hidden text-sm font-medium transition-opacity hover:opacity-70 md:block"
              style={{ color: "var(--text-secondary)" }}
            >
              Giriş
            </button>
            <button
              className="rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--btn-cta-bg)", color: "var(--btn-cta-text)" }}
            >
              Ücretsiz Başla
            </button>
          </div>
        </div>
      </nav>

      {/* Page header */}
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-2">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "var(--text-secondary)" }}
        >
          Kelime Hazinesi
        </p>
        <h1
          className="text-5xl font-black md:text-6xl"
          style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)" }}
        >
          Kartlar
        </h1>
      </div>

      {/* Vocab section (includes StudyMode + FlipCards) */}
      <VocabSection />

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

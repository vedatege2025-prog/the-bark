import Cards from "./components/Cards"
import ThemeToggle from "./components/ThemeToggle"

export default function Home() {
  return (
    <div className="page-root" style={{ minHeight: "100vh", background: "var(--bg-page)" }}>

      {/* ─── Navbar ─────────────────────────────────────────── */}
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
            href="#hero"
            className="text-2xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)", textDecoration: "none" }}
          >
            THE BARK
          </a>

          <div
            className="hidden items-center gap-8 text-sm font-medium md:flex"
            style={{ color: "var(--text-secondary)" }}
          >
            <a href="/dersler" className="transition-colors hover:opacity-80">Dersler</a>
            <a href="#ai-ogretmen" className="transition-colors hover:opacity-80">AI Öğretmen</a>
            <a href="/kelimeler" className="transition-colors hover:opacity-80">Kelimeler</a>
            <a href="#fiyatlar" className="transition-colors hover:opacity-80">Fiyatlar</a>
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

      {/* ─── Hero ───────────────────────────────────────────── */}
      <section id="hero" className="mx-auto max-w-5xl px-6 pb-20 pt-20 text-center">
        <div
          className="anim-1 mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
          style={{ background: "var(--bg-soft)", color: "var(--text-primary)" }}
        >
          <span>✨</span>
          <span>Türkçe konuşana özel · AI destekli</span>
        </div>

        <h1
          className="anim-2 mb-6 text-6xl font-black leading-[1.05] md:text-8xl"
          style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)" }}
        >
          Almancayı
          <br />
          <em style={{ color: "#FF6B6B", fontStyle: "italic" }}>gerçekten</em>{" "}
          konuş.
        </h1>

        <p
          className="anim-3 mx-auto mb-10 max-w-xl text-lg leading-relaxed md:text-xl"
          style={{ color: "var(--text-secondary)" }}
        >
          Günde 15 dakika. AI öğretmenin. Kendi seviyende, kendi temponda.
          B1&apos;de takılıp kalmak zorunda değilsin.
        </p>

        <div className="anim-4 mb-16 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#dersler"
            className="rounded-full px-8 py-4 text-lg font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            style={{ background: "var(--btn-cta-bg)", color: "var(--btn-cta-text)", textDecoration: "none" }}
          >
            Ücretsiz Başla →
          </a>
          <a
            href="#ai-ogretmen"
            className="rounded-full border-2 px-8 py-4 text-lg font-semibold transition-colors"
            style={{ borderColor: "var(--border-medium)", color: "var(--text-primary)", textDecoration: "none" }}
          >
            Nasıl çalışır?
          </a>
        </div>

        <div className="anim-5 flex flex-wrap items-center justify-center gap-8 text-center">
          {[
            { value: "10K+", label: "Aktif öğrenci" },
            { value: "6 ay", label: "B2'ye ortalama" },
            { value: "4.9★", label: "Kullanıcı puanı" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8">
              {i > 0 && (
                <div
                  className="hidden h-8 w-px md:block"
                  style={{ background: "rgba(26,26,46,0.12)" }}
                />
              )}
              <div>
                <div
                  className="text-3xl font-bold"
                  style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)" }}
                >
                  {stat.value}
                </div>
                <div className="mt-0.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Günün Kelimesi ─────────────────────────────────── */}
      <div className="mb-6 flex justify-center px-6">
        <div
          className="float inline-flex items-center gap-4 rounded-2xl px-6 py-4"
          style={{
            background: "var(--bg-card)",
            boxShadow: "0 8px 32px rgba(26,26,46,0.10)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-lg"
            style={{ background: "#FFD93D" }}
          >
            🧠
          </div>
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--text-secondary)" }}
            >
              Günün Kelimesi
            </div>
            <div
              className="text-lg font-bold"
              style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)" }}
            >
              das Fernweh
            </div>
            <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Uzaklara duyulan özlem
            </div>
          </div>
          <div
            className="rounded-lg px-3 py-1 text-xs font-semibold"
            style={{ background: "var(--bg-soft)", color: "var(--text-primary)" }}
          >
            C1
          </div>
        </div>
      </div>

      <div className="mx-auto mb-16 max-w-xs px-6">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(26,26,46,0.12), transparent)",
          }}
        />
      </div>

      {/* ─── Dersler ─────────────────────────────────────────── */}
      <div id="dersler">
        <Cards />
      </div>

      {/* ─── AI Öğretmen ─────────────────────────────────────── */}
      <section
        id="ai-ogretmen"
        className="py-24"
        style={{ background: "#1A1A2E" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(255,217,61,0.15)", color: "#FFD93D" }}
            >
              AI Destekli
            </span>
            <h2
              className="mb-4 text-4xl font-black text-white md:text-5xl"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Tanış: <em style={{ color: "#FF6B6B", fontStyle: "italic" }}>Anna</em>
            </h2>
            <p
              className="mx-auto max-w-xl text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              7/24 sabırlı, anlayışlı, hiç yorulmayan Almanca öğretmenin. Seni yargılamadan, kendi hızında öğrenir gibi öğretir.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: "🎙️",
                title: "Sesli Konuşma",
                desc: "Anna ile gerçek zamanlı Almanca diyalog kur. Telaffuzunu düzeltir, eksiklerini anında gösterir.",
                color: "#FF6B6B",
              },
              {
                icon: "✍️",
                title: "Yazma Koçu",
                desc: "E-posta, dilekçe, hikaye yaz. Anna gramer hatalarını açıklamalı düzeltir, daha iyi versiyonu önerir.",
                color: "#FFD93D",
              },
              {
                icon: "🧠",
                title: "Kişisel Müfredat",
                desc: "Zayıf alanlarını tespit eder, sana özel ders planı çıkarır. Her gün farklı, her gün ilerleme.",
                color: "#4C6EF5",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-8"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
                  style={{ background: `${f.color}22` }}
                >
                  {f.icon}
                </div>
                <h3
                  className="mb-3 text-xl font-bold text-white"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Demo chat bubble */}
          <div className="mt-16 mx-auto max-w-2xl">
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Anna ile örnek konuşma
              </p>
              <div className="space-y-3">
                <div className="flex justify-end">
                  <div
                    className="max-w-xs rounded-2xl rounded-br-sm px-4 py-3 text-sm"
                    style={{ background: "#4C6EF5", color: "white" }}
                  >
                    Merhaba, bugün ne öğreneceğiz?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div
                    className="max-w-sm rounded-2xl rounded-bl-sm px-4 py-3 text-sm"
                    style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }}
                  >
                    Hallo! Heute üben wir den Konjunktiv II. Es ist nicht so schwer, wie es klingt! 😊
                    <p className="mt-1 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      Bugün Konjunktiv II pratik yapıyoruz. Kulağa geldiği kadar zor değil!
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div
                    className="max-w-xs rounded-2xl rounded-br-sm px-4 py-3 text-sm"
                    style={{ background: "#4C6EF5", color: "white" }}
                  >
                    Wenn ich Zeit hätte... ne demek?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div
                    className="max-w-sm rounded-2xl rounded-bl-sm px-4 py-3 text-sm"
                    style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }}
                  >
                    Harika soru! &quot;Wenn ich Zeit hätte&quot; = &quot;Vaktim olsaydı&quot; demek. Konjunktiv II ile hayaller ve varsayımlar kurarız. Şimdi sen bir cümle dene!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Fiyatlar ────────────────────────────────────────── */}
      <section id="fiyatlar" className="py-24" style={{ background: "var(--bg-muted)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2
              className="mb-3 text-4xl font-black md:text-5xl"
              style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)" }}
            >
              Sade ve Şeffaf
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              İlk 30 gün tamamen ücretsiz. Sonrasında istediğin zaman iptal et.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            {/* Free */}
            <div
              className="rounded-2xl p-8"
              style={{ background: "var(--bg-card)", boxShadow: "0 1px 3px rgba(26,26,46,0.08)" }}
            >
              <p className="mb-1 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
                Ücretsiz
              </p>
              <p className="mb-1 text-4xl font-black" style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)" }}>
                €0
              </p>
              <p className="mb-8 text-sm" style={{ color: "var(--text-secondary)" }}>sonsuza dek</p>
              <ul className="mb-8 space-y-3 text-sm" style={{ color: "var(--text-primary)" }}>
                {["5 ders / ay", "Kelime kartları", "Temel alıştırmalar"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span style={{ color: "#12B886" }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                className="w-full rounded-full py-3 text-sm font-semibold transition-all hover:opacity-80"
                style={{ background: "var(--bg-soft)", color: "var(--text-primary)" }}
              >
                Başla
              </button>
            </div>

            {/* Pro — featured (always dark, intentional brand card) */}
            <div
              className="relative rounded-2xl p-8"
              style={{ background: "#1A1A2E", boxShadow: "0 8px 32px rgba(26,26,46,0.20)" }}
            >
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wide"
                style={{ background: "#FFD93D", color: "#1A1A2E" }}
              >
                En Popüler
              </span>
              <p className="mb-1 text-sm font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>
                Pro
              </p>
              <p className="mb-1 text-4xl font-black text-white" style={{ fontFamily: "var(--font-fraunces)" }}>
                €9
              </p>
              <p className="mb-8 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>/ ay</p>
              <ul className="mb-8 space-y-3 text-sm text-white">
                {[
                  "Sınırsız ders",
                  "Anna ile sesli konuşma",
                  "Kişisel müfredat",
                  "Yazma koçu",
                  "İlerleme analizi",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span style={{ color: "#FFD93D" }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                className="w-full rounded-full py-3 text-sm font-bold transition-all hover:scale-105"
                style={{ background: "#FF6B6B", color: "white" }}
              >
                30 Gün Ücretsiz Dene
              </button>
            </div>

            {/* Team */}
            <div
              className="rounded-2xl p-8"
              style={{ background: "var(--bg-card)", boxShadow: "0 1px 3px rgba(26,26,46,0.08)" }}
            >
              <p className="mb-1 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
                Kurumsal
              </p>
              <p className="mb-1 text-4xl font-black" style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)" }}>
                €29
              </p>
              <p className="mb-8 text-sm" style={{ color: "var(--text-secondary)" }}>/ ay · 5 kullanıcı</p>
              <ul className="mb-8 space-y-3 text-sm" style={{ color: "var(--text-primary)" }}>
                {[
                  "Pro'nun her şeyi",
                  "Ekip ilerleme paneli",
                  "Özel içerik yükleme",
                  "Öncelikli destek",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span style={{ color: "#12B886" }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                className="w-full rounded-full py-3 text-sm font-semibold transition-all hover:opacity-80"
                style={{ background: "var(--bg-soft)", color: "var(--text-primary)" }}
              >
                İletişime Geç
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA strip ─────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#1A1A2E" }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2
            className="mb-4 text-4xl font-black text-white md:text-5xl"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Bugün başla.
            <br />
            <em style={{ color: "#FFD93D", fontStyle: "italic" }}>Ücretsiz.</em>
          </h2>
          <p className="mb-8 text-lg" style={{ color: "rgba(255,255,255,0.6)" }}>
            İlk 30 gün tamamen ücretsiz. Kredi kartı gerekmez.
          </p>
          <button
            className="rounded-full px-10 py-4 text-lg font-bold transition-all hover:scale-105"
            style={{ background: "#FF6B6B", color: "white" }}
          >
            Hemen Dene →
          </button>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
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

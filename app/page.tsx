import Cards from "./components/Cards"
import ThemeToggle from "./components/ThemeToggle"
import NavAuth from "./components/NavAuth"

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
            <NavAuth />
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
            href="/auth/login?mode=signup"
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
          {/* Başlık */}
          <div className="mb-16 text-center">
            <span
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(255,217,61,0.15)", color: "#FFD93D" }}
            >
              Yakında
            </span>
            <h2
              className="mb-4 text-4xl font-black text-white md:text-5xl"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Tanış:{" "}
              <em style={{ color: "#FF6B6B", fontStyle: "italic" }}>Anna</em>
            </h2>
            <p
              className="mx-auto max-w-2xl text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              7/24 sabırlı, anlayışlı, hiç yorulmayan Almanca öğretmenin.
              Seni yargılamadan, kendi hızında öğrenir gibi öğretir.
              Türkçe konuşanlar için, Türkçe bilen bir öğretmen.
            </p>
          </div>

          {/* Özellik kartları */}
          <div className="mb-16 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                icon: "🎙️",
                title: "Sesli Konuşma",
                desc: "Anna ile gerçek zamanlı Almanca diyalog kur. Telaffuzunu anında düzeltir, doğal konuşma kalıplarını gösterir. Market, doktor, iş görüşmesi — dilediğin senaryoda pratik yap.",
                color: "#FF6B6B",
              },
              {
                icon: "✍️",
                title: "Yazma Koçu",
                desc: "Almanca e-posta, dilekçe, özgeçmiş yaz. Anna gramer hatalarını Türkçe açıklamalı düzeltir, her cümleyi neden değiştirdiğini anlatır. Sadece düzeltmez, öğretir.",
                color: "#FFD93D",
              },
              {
                icon: "🧠",
                title: "Kişisel Müfredat",
                desc: "Hangi gramer yapısında takılıyorsun, hangi kelimeler sana zor geliyor? Anna bunu analiz eder, sana özel günlük plan çıkarır. Her gün farklı, her gün hedefli ilerleme.",
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

          {/* Demo chat + Anna neden farklı */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Demo konuşma */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p
                className="mb-5 text-xs font-semibold uppercase tracking-widest"
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
                    &quot;der, die, das&quot; nasıl öğrenebilirim?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div
                    className="max-w-sm rounded-2xl rounded-bl-sm px-4 py-3 text-sm"
                    style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }}
                  >
                    Türkçede artikel yok, bu yüzden sana zor geliyor — normal! 😊
                    <br />
                    En iyi yol: kelimeyi artikeli ile birlikte ezberlemek. &quot;Buch&quot; değil, &quot;das Buch&quot; (kitap).
                    <p className="mt-2 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      Şimdi 3 kelime dene: Tisch, Lampe, Fenster
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div
                    className="max-w-xs rounded-2xl rounded-br-sm px-4 py-3 text-sm"
                    style={{ background: "#4C6EF5", color: "white" }}
                  >
                    der Tisch, die Lampe, das Fenster?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div
                    className="max-w-sm rounded-2xl rounded-bl-sm px-4 py-3 text-sm"
                    style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }}
                  >
                    Mükemmel, hepsi doğru! 🎉 Şimdi bir cümle kuralım: &quot;Der Tisch ist...&quot;
                  </div>
                </div>
              </div>
            </div>

            {/* Anna neden farklı */}
            <div className="flex flex-col justify-center space-y-5">
              {[
                {
                  icon: "🇹🇷",
                  title: "Türkçe konuşan için tasarlandı",
                  desc: "Türkçede olmayan yapıları (artikel, çekim, konjunktiv) Türkçe mantıkla açıklar. Duolingo'nun yapamadığını yapar.",
                },
                {
                  icon: "🔁",
                  title: "Hataları takip eder",
                  desc: "Hangi yapıda defalarca hata yaptığını hatırlar ve bir sonraki seansta tekrar çalıştırır.",
                },
                {
                  icon: "🏠",
                  title: "Gerçek hayat senaryoları",
                  desc: "Ev arama, doktora gitme, iş görüşmesi, Ausländerbehörde — göçmen hayatının gerçek ihtiyaçları.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="mb-1 font-bold text-white text-sm">{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Fiyatlar ────────────────────────────────────────── */}
      <section id="fiyatlar" className="py-24" style={{ background: "var(--bg-muted)" }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 text-center">
            <h2
              className="mb-3 text-4xl font-black md:text-5xl"
              style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)" }}
            >
              Sade ve Şeffaf
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Ücretsiz başla, hazır olduğunda Pro'ya geç. Kredi kartı gerekmez.
            </p>
          </div>

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
            {/* Free */}
            <div
              className="rounded-2xl p-8"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}
            >
              <p className="mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
                Ücretsiz
              </p>
              <div className="mb-1 flex items-end gap-1">
                <span className="text-5xl font-black" style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)" }}>€0</span>
              </div>
              <p className="mb-8 text-sm" style={{ color: "var(--text-secondary)" }}>sonsuza dek</p>
              <ul className="mb-8 space-y-3 text-sm" style={{ color: "var(--text-primary)" }}>
                {[
                  "Tüm A1 dersleri",
                  "Kelime kartları (SM-2)",
                  "Günlük 15 dk çalışma",
                  "İlerleme takibi",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="font-bold" style={{ color: "#10B981" }}>✓</span> {f}
                  </li>
                ))}
                {[
                  "Anna ile sesli konuşma",
                  "B1–C1 içerikleri",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2" style={{ opacity: 0.35 }}>
                    <span className="font-bold">✕</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href="/auth/login?mode=signup"
                className="block w-full rounded-full py-3 text-center text-sm font-semibold transition-all hover:opacity-80"
                style={{ background: "var(--bg-soft)", color: "var(--text-primary)", textDecoration: "none" }}
              >
                Ücretsiz Başla
              </a>
            </div>

            {/* Pro */}
            <div
              className="relative rounded-2xl p-8"
              style={{ background: "#1A1A2E", boxShadow: "0 12px 40px rgba(26,26,46,0.25)" }}
            >
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wide"
                style={{ background: "#FFD93D", color: "#1A1A2E" }}
              >
                En İyi Değer
              </span>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.45)" }}>
                Pro
              </p>
              <div className="mb-1 flex items-end gap-1">
                <span className="text-5xl font-black text-white" style={{ fontFamily: "var(--font-fraunces)" }}>€9</span>
                <span className="mb-2 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>/ yıl</span>
              </div>
              <p className="mb-8 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                Günde yalnızca 2,5 cent · İstediğinde iptal
              </p>
              <ul className="mb-8 space-y-3 text-sm text-white">
                {[
                  "Tüm A1–C1 dersleri",
                  "Sınırsız kelime çalışması",
                  "Anna ile sesli konuşma",
                  "Yazma koçu",
                  "Kişisel müfredat",
                  "İlerleme analizi",
                  "Öncelikli destek",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="font-bold" style={{ color: "#FFD93D" }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href="/auth/login?mode=signup"
                className="block w-full rounded-full py-3 text-center text-sm font-bold transition-all hover:scale-105"
                style={{ background: "#FF6B6B", color: "white", textDecoration: "none" }}
              >
                Pro'ya Geç →
              </a>
            </div>
          </div>

          {/* Garanti notu */}
          <p className="mt-10 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
            30 gün içinde memnun kalmazsan paranı iade ediyoruz. Hiçbir soru sormadan.
          </p>
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
          <a
            href="/auth/login?mode=signup"
            className="rounded-full px-10 py-4 text-lg font-bold transition-all hover:scale-105"
            style={{ background: "#FF6B6B", color: "white", textDecoration: "none" }}
          >
            Hemen Dene →
          </a>
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

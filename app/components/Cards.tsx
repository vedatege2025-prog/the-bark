"use client"

import { motion } from "framer-motion"

const courses = [
  {
    num: "01",
    title: "Günlük Hayat",
    desc: "Kafe, market, komşu, telefon. Gerçek diyaloglarla hayatını Almanca'da yaşa.",
    level: "A1 – B1",
    count: "48 ders",
    emoji: "☕",
    from: "#FF6B6B",
    to: "#FFD93D",
  },
  {
    num: "02",
    title: "Bürokrasi",
    desc: "Ausländerbehörde, Jobcenter, Finanzamt. Evrak, randevu, resmi yazışmalar.",
    level: "B1 – B2",
    count: "32 ders",
    emoji: "📋",
    from: "#4C6EF5",
    to: "#845EF7",
  },
  {
    num: "03",
    title: "Sınav Hazırlığı",
    desc: "Goethe, telc, ÖSD formatları. AI ile yazılı ve sözlü sınav simülasyonu.",
    level: "B2 – C1",
    count: "56 ders",
    emoji: "🎯",
    from: "#12B886",
    to: "#82C91E",
  },
  {
    num: "04",
    title: "İş Almancası",
    desc: "CV, mülakat simülasyonu, sektörel terimler. Kariyerini Almanca'da inşa et.",
    level: "B2 – C2",
    count: "40 ders",
    emoji: "💼",
    from: "#F59F00",
    to: "#FF6B35",
  },
  {
    num: "05",
    title: "Kelime Hazinesi",
    desc: "Spaced repetition ile 5000+ kelime. Kendi Wörterliste'ni yükle ve genişlet.",
    level: "Her Seviye",
    count: "120 set",
    emoji: "📖",
    from: "#0BC5EA",
    to: "#4C6EF5",
  },
  {
    num: "06",
    title: "AI Konuşma",
    desc: "7/24 sabırlı AI öğretmen Anna ile sesli konuşma pratiği. Anlık düzeltme.",
    level: "Her Seviye",
    count: "Sınırsız",
    emoji: "🎙️",
    from: "#CC5DE8",
    to: "#F783AC",
  },
]

export default function Cards() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-28">
      <div className="mb-14 text-center">
        <h2
          className="mb-3 text-4xl font-black md:text-5xl"
          style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A2E" }}
        >
          Hangi Almanca'yı öğreneceksin?
        </h2>
        <p style={{ color: "#6E7191" }}>Her seviye için yapılandırılmış içerik</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, i) => (
          <motion.div
            key={course.title}
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
            className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm"
            style={{ boxShadow: "0 1px 3px rgba(26,26,46,0.08), 0 1px 2px rgba(26,26,46,0.04)" }}
            whileTap={{ scale: 0.99 }}
          >
            {/* Gradient image area */}
            <div
              className="relative h-52 overflow-hidden"
              style={{ background: `linear-gradient(140deg, ${course.from}, ${course.to})` }}
            >
              {/* Decorative circles */}
              <div
                className="absolute -right-10 -top-10 h-52 w-52 rounded-full"
                style={{ background: "rgba(255,255,255,0.12)" }}
              />
              <div
                className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full"
                style={{ background: "rgba(255,255,255,0.10)" }}
              />
              {/* Large background number */}
              <span
                className="pointer-events-none absolute left-4 top-2 select-none text-9xl font-black leading-none"
                style={{ fontFamily: "var(--font-fraunces)", color: "rgba(255,255,255,0.10)" }}
              >
                {course.num}
              </span>
              {/* Emoji icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
              >
                <span className="text-6xl drop-shadow-lg">{course.emoji}</span>
              </motion.div>
            </div>

            {/* Info area */}
            <div className="p-6">
              <span
                className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
                style={{ background: "#F0EDE8", color: "#1A1A2E" }}
              >
                {course.level}
              </span>
              <h3
                className="mb-2 text-2xl font-bold"
                style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A2E" }}
              >
                {course.title}
              </h3>
              <p className="mb-5 text-sm leading-relaxed" style={{ color: "#6E7191" }}>
                {course.desc}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: "#6E7191" }}>
                  {course.count}
                </span>
                <span
                  className="flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
                  style={{ color: "#1A1A2E" }}
                >
                  Başla{" "}
                  <span style={{ color: course.from }}>→</span>
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

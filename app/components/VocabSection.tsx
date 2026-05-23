"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { enrichedWords, getWordLevel, type EnrichedWord, type WordLevel } from "../data/enrichedWords"
import { loadStats, type WordStat } from "../data/deckStore"
import { createClient } from "@/lib/supabase/client"

const LEVELS: { key: WordLevel; label: string; color: string; bg: string; text: string }[] = [
  { key: "A1", label: "A1 Başlangıç",  color: "#10B981", bg: "#ECFDF5", text: "#065F46" },
  { key: "A2", label: "A2 Temel",       color: "#0EA5E9", bg: "#F0F9FF", text: "#0369A1" },
  { key: "B1", label: "B1 Orta",        color: "#6366F1", bg: "#EEF2FF", text: "#4338CA" },
  { key: "B2", label: "B2 Orta-İleri",  color: "#8B5CF6", bg: "#F5F3FF", text: "#6D28D9" },
  { key: "C1", label: "C1 İleri",       color: "#A855F7", bg: "#FAF5FF", text: "#7E22CE" },
]

const REST_CORRECT = 7
const REST_MS = 7 * 24 * 60 * 60 * 1000

function isResting(s: WordStat): boolean {
  if ((s.ezberlendiCount ?? 0) < REST_CORRECT) return false
  const lastOk = [...(s.logs ?? [])].reverse().find((l) => l.ok)?.ts ?? 0
  return Date.now() - lastOk < REST_MS
}
import FlipCard from "./FlipCard"
import StudyMode from "./StudyMode"

const FILTERS = ["Tümü", "Adjektiv", "Verb", "Verb (refl.)"]

// ── Learning group definitions ────────────────────────────────────────────────
interface Group {
  key: string
  label: string
  emoji: string
  color: string         // badge bg
  textColor: string     // badge text
  borderColor: string   // section left border
  words: EnrichedWord[]
}

function classifyWords(stats: Record<string, WordStat>): Group[] {
  const dinlendiriliyor: EnrichedWord[] = []
  const ezberlendi: EnrichedWord[] = []
  const ogreniliyor: EnrichedWord[] = []
  const yeni: EnrichedWord[] = []

  for (const w of enrichedWords) {
    const s = stats[w.filename]
    if (!s) {
      yeni.push(w)
    } else if (isResting(s)) {
      dinlendiriliyor.push(w)
    } else if (s.ezberlendiCount >= 3) {
      ezberlendi.push(w)
    } else {
      ogreniliyor.push(w)
    }
  }

  return [
    {
      key: "ogreniliyor",
      label: "Öğreniliyor",
      emoji: "🔄",
      color: "#FFF7ED",
      textColor: "#C2410C",
      borderColor: "#FB923C",
      words: ogreniliyor,
    },
    {
      key: "yeni",
      label: "Yeni",
      emoji: "✨",
      color: "#EEF2FF",
      textColor: "#4338CA",
      borderColor: "#818CF8",
      words: yeni,
    },
    {
      key: "ezberlendi",
      label: "Ezberlendi",
      emoji: "✅",
      color: "#ECFDF5",
      textColor: "#065F46",
      borderColor: "#34D399",
      words: ezberlendi,
    },
    {
      key: "dinlendiriliyor",
      label: "Dinlendiriliyor",
      emoji: "💤",
      color: "#F0F9FF",
      textColor: "#0369A1",
      borderColor: "#38BDF8",
      words: dinlendiriliyor,
    },
  ]
}

// ── Collapsible group section ─────────────────────────────────────────────────
function GroupSection({ group, filter }: { group: Group; filter: string }) {
  const [open, setOpen] = useState(group.key !== "ezberlendi")
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 12

  const filtered =
    filter === "Tümü" ? group.words : group.words.filter((w) => w.kind === filter)
  const visible = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < filtered.length

  if (group.words.length === 0) return null

  return (
    <div
      className="mb-10 overflow-hidden rounded-2xl"
      style={{ border: "1px solid var(--border-card)" }}
    >
      {/* Group header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:brightness-95"
        style={{ background: "var(--bg-card)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold"
            style={{ background: group.color, color: group.textColor }}
          >
            <span>{group.emoji}</span>
            {group.label}
          </span>
          <span className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
            {group.words.length} kelime
            {filter !== "Tümü" && filtered.length !== group.words.length
              ? ` · ${filtered.length} gösteriliyor`
              : ""}
          </span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1 }}
        >
          ▾
        </motion.span>
      </button>

      {/* Cards */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="px-6 pb-6 pt-4"
              style={{ borderTop: `3px solid ${group.borderColor}` }}
            >
              {filtered.length === 0 ? (
                <p className="py-4 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
                  Bu filtre için kelime yok.
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                      {visible.map((w, i) => (
                        <motion.div
                          key={w.filename}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2, delay: (i % PAGE_SIZE) * 0.015 }}
                        >
                          <FlipCard {...w} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {hasMore && (
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={() => setPage((p) => p + 1)}
                        className="rounded-full border-2 px-6 py-2.5 text-sm font-semibold transition-all hover:scale-105"
                        style={{ borderColor: "var(--border-medium)", color: "var(--text-primary)" }}
                      >
                        Daha fazla göster ({filtered.length - visible.length} kaldı)
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main VocabSection ─────────────────────────────────────────────────────────
export default function VocabSection() {
  const [filter, setFilter] = useState("Tümü")
  const [activeLevel, setActiveLevel] = useState<WordLevel>("B1")
  const [studying, setStudying] = useState(false)
  const [groups, setGroups] = useState<Group[]>(() => classifyWords({}))
  const [dueCount, setDueCount] = useState<number | null>(null)

  // Seviyeye göre kelimeler
  const levelWords = enrichedWords.filter((w) => getWordLevel(w) === activeLevel)
  const levelMeta = LEVELS.find((l) => l.key === activeLevel)!

  // Load stats from localStorage on client
  useEffect(() => {
    setGroups(classifyWords(loadStats()))
  }, [studying, activeLevel])

  // Giriş yapılmışsa bugün tekrar edilecek kart sayısını çek
  useEffect(() => {
    async function fetchDue() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const res = await fetch('/api/words/progress')
      if (!res.ok) return
      const progress: Array<{ next_review_at: string }> = await res.json()
      const now = new Date()
      const due = progress.filter((p) => new Date(p.next_review_at) <= now)
      setDueCount(due.length)
    }
    fetchDue()
  }, [studying])

  return (
    <>
      {studying && (
        <StudyMode level={activeLevel} onClose={() => setStudying(false)} />
      )}

      <section className="mx-auto max-w-7xl px-6 pb-20">
        {/* Bugün Tekrar Et — sadece giriş yapan kullanıcılara, kartı olanlar için */}
        {dueCount !== null && dueCount > 0 && (
          <div
            className="mb-8 flex items-center justify-between rounded-2xl px-6 py-4"
            style={{ background: "#1A1A2E", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                Tekrar Zamanı
              </p>
              <p className="text-lg font-bold text-white">
                {dueCount} kelime bugün seni bekliyor
              </p>
            </div>
            <button
              onClick={() => setStudying(true)}
              className="rounded-full px-5 py-2.5 text-sm font-bold transition-all hover:scale-105"
              style={{ background: "#FFD93D", color: "#1A1A2E" }}
            >
              Tekrar Et →
            </button>
          </div>
        )}

        {/* ── Seviye sekmeleri ── */}
        <div className="mb-8 flex flex-wrap gap-2">
          {LEVELS.map((lv) => {
            const count = enrichedWords.filter((w) => getWordLevel(w) === lv.key).length
            const active = activeLevel === lv.key
            const empty = count === 0
            return (
              <button
                key={lv.key}
                onClick={() => !empty && setActiveLevel(lv.key)}
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all"
                style={
                  empty
                    ? { background: "var(--bg-soft)", color: "#9CA3AF", cursor: "default", opacity: 0.6 }
                    : active
                    ? { background: lv.color, color: "white", boxShadow: `0 4px 18px ${lv.color}55` }
                    : { background: "var(--bg-soft)", color: "var(--text-primary)" }
                }
              >
                <span>{lv.key}</span>
                <span className="text-xs font-medium" style={{ opacity: 0.75 }}>
                  {empty ? "Yakında" : `${count} kelime`}
                </span>
              </button>
            )
          })}
        </div>

        {/* ── Seviye banner ── */}
        <div
          className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl px-6 py-4"
          style={{ background: levelMeta.bg, border: `1px solid ${levelMeta.color}30` }}
        >
          <div>
            <span className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: levelMeta.color, color: "white" }}>
              {activeLevel}
            </span>
            <span className="ml-3 text-sm font-semibold" style={{ color: levelMeta.text }}>
              {levelMeta.label} · {levelWords.length} kelime
            </span>
          </div>
          <button
            onClick={() => setStudying(true)}
            disabled={levelWords.length === 0}
            className="rounded-full px-5 py-2.5 text-sm font-bold transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: levelMeta.color, color: "white" }}
          >
            🃏 Çalış
          </button>
        </div>

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Öğrenme durumuna göre gruplandırılmış
          </p>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="rounded-full px-4 py-2 text-sm font-semibold transition-all"
                style={
                  filter === f
                    ? { background: "var(--btn-cta-bg)", color: "var(--btn-cta-text)" }
                    : { background: "var(--bg-soft)", color: "var(--text-secondary)" }
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        {levelWords.length > 0 && (
          <div className="mb-8 overflow-hidden rounded-full" style={{ height: 8, background: "var(--bg-soft)" }}>
            {(() => {
              const total = levelWords.length
              const done = groups.find((g) => g.key === "ezberlendi")?.words.filter((w) => getWordLevel(w) === activeLevel).length ?? 0
              const learning = groups.find((g) => g.key === "ogreniliyor")?.words.filter((w) => getWordLevel(w) === activeLevel).length ?? 0
              return (
                <div className="flex h-full">
                  <div style={{ width: `${(done / total) * 100}%`, background: "#34D399", transition: "width 0.5s" }} />
                  <div style={{ width: `${(learning / total) * 100}%`, background: "#FB923C", transition: "width 0.5s" }} />
                </div>
              )
            })()}
          </div>
        )}

        {/* Boş seviye */}
        {levelWords.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-4xl mb-4">🔜</p>
            <p className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)" }}>
              {activeLevel} kelimeleri hazırlanıyor
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Görseller tamamlanınca buraya eklenecek.
            </p>
          </div>
        )}

        {/* Groups — seviyeye göre filtreli */}
        {levelWords.length > 0 && groups
          .map((group) => ({ ...group, words: group.words.filter((w) => getWordLevel(w) === activeLevel) }))
          .map((group) => (
            <GroupSection key={group.key} group={group} filter={filter} />
          ))}
      </section>
    </>
  )
}

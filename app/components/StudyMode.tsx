"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import type { EnrichedWord } from "../data/enrichedWords"
import {
  loadStats,
  saveStats,
  buildDeck,
  getOrInit,
  type WordStat,
  type StudyLog,
} from "../data/deckStore"
import { speak } from "../lib/speak"
import { createClient } from "@/lib/supabase/client"

const SWIPE_THRESHOLD = 110
const KIND_COLORS: Record<string, { bg: string; text: string }> = {
  Adjektiv:       { bg: "#EEF2FF", text: "#4338CA" },
  Verb:           { bg: "#ECFDF5", text: "#065F46" },
  "Verb (refl.)": { bg: "#FFF7ED", text: "#C2410C" },
}

// ── Text-only flip card — height fills parent ─────────────────────────────────
function FlipText({ w, flipped }: { w: EnrichedWord; flipped: boolean }) {
  const colors = KIND_COLORS[w.kind] ?? KIND_COLORS["Adjektiv"]
  return (
    <div style={{ height: "100%", perspective: "1200px" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front — German word */}
        <div
          className="flex flex-col justify-between rounded-2xl overflow-hidden"
          style={{
            position: "absolute",
            inset: 0,
            padding: "2rem",
            background: "var(--bg-card)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            boxShadow: "0 4px 24px rgba(26,26,46,0.12)",
          }}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="mb-4">
              <span
                className="inline-block rounded-full font-bold uppercase tracking-wide"
                style={{ background: colors.bg, color: colors.text, padding: "5px 14px", fontSize: "0.8rem" }}
              >
                {w.kind}
              </span>
            </div>
            <p
              className="font-black leading-tight break-words"
              style={{
                fontFamily: "var(--font-fraunces)",
                color: "var(--text-primary)",
                fontSize: "clamp(1.8rem, 4.5vw, 3.8rem)",
              }}
            >
              {w.word}
            </p>
          </div>
          {w.verbForms && (
            <div className="space-y-1.5 flex-shrink-0" style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
              <p>
                <span className="font-semibold">Prät.:</span>{" "}
                <span style={{ color: "var(--text-primary)" }}>{w.verbForms.praeteritum}</span>
              </p>
              <p>
                <span className="font-semibold">Perf.:</span>{" "}
                <span style={{ color: "var(--text-primary)" }}>{w.verbForms.perfekt}</span>
              </p>
            </div>
          )}
        </div>

        {/* Back — Turkish */}
        <div
          className="flex flex-col justify-between rounded-2xl overflow-hidden"
          style={{
            position: "absolute",
            inset: 0,
            padding: "2rem",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "#1A1A2E",
            boxShadow: "0 4px 24px rgba(26,26,46,0.20)",
          }}
        >
          <div className="min-h-0 overflow-hidden">
            <p
              className="mb-2 font-semibold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}
            >
              Türkçe
            </p>
            <p
              className="font-black leading-tight text-white break-words"
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.8rem, 4.5vw, 3.8rem)",
              }}
            >
              {w.turkish}
            </p>
          </div>
          <div className="space-y-2 flex-shrink-0">
            {w.examples.map((ex) => (
              <div key={ex.label} className="flex gap-2">
                <span
                  className="flex-shrink-0 font-bold"
                  style={{ color: "#FFD93D", minWidth: "44px", fontSize: "0.78rem" }}
                >
                  {ex.label}
                </span>
                <p className="leading-snug" style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.9rem" }}>
                  {ex.de}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Done screen ───────────────────────────────────────────────────────────────
function DoneScreen({
  correctCount,
  onNewDeck,
  onClose,
}: {
  correctCount: number
  onNewDeck: () => void
  onClose: () => void
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="text-6xl">🎉</div>
      <h2
        className="text-3xl font-black"
        style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)" }}
      >
        Deste Tamamlandı!
      </h2>
      <p style={{ color: "var(--text-secondary)" }}>
        Bu destede{" "}
        <strong style={{ color: "#12B886" }}>{correctCount}</strong> kelimeyi doğru yaptın.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onNewDeck}
          className="rounded-full px-7 py-3 text-sm font-bold transition-all hover:scale-105"
          style={{ background: "var(--btn-cta-bg)", color: "var(--btn-cta-text)" }}
        >
          Yeni Deste →
        </button>
        <button
          onClick={onClose}
          className="rounded-full border-2 px-7 py-3 text-sm font-semibold transition-all hover:opacity-80"
          style={{ borderColor: "var(--border-medium)", color: "var(--text-primary)" }}
        >
          Kapat
        </button>
      </div>
    </div>
  )
}

// quality değerleri: 0=Bilmedim, 3=Zordu, 5=Bildim
type Quality = 0 | 3 | 5

// ── Main StudyMode ────────────────────────────────────────────────────────────
export default function StudyMode({ onClose }: { onClose: () => void }) {
  const [stats, setStats] = useState<Record<string, WordStat>>(() => loadStats())
  const [deck, setDeck] = useState<EnrichedWord[]>(() => buildDeck(loadStats()))
  const [idx, setIdx] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [exiting, setExiting] = useState<"left" | "right" | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const startX = useRef(0)
  const moved = useRef(false)

  const current = deck[idx]
  const remaining = deck.length - idx

  // Giriş durumunu kontrol et
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user))
  }, [])

  // Auto-speak German word when card advances
  useEffect(() => {
    if (current) speak(current.word)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.filename])

  const act = useCallback((quality: Quality) => {
    if (exiting || !current) return

    const isCorrect = quality >= 3
    const newStats = { ...stats }
    const stat = { ...getOrInit(newStats, current.filename) }
    const newDeck = [...deck]

    const log: StudyLog = { ts: Date.now(), ok: isCorrect }
    stat.logs = [...(stat.logs ?? []), log]

    if (isCorrect) {
      stat.ezberlendiCount++
      setCorrectCount((c) => c + 1)
    } else {
      stat.ezberlenmediCount++
      newDeck.push(current)
    }

    newStats[current.filename] = stat
    saveStats(newStats)
    setStats(newStats)

    // Giriş yapılmışsa Supabase'e de kaydet
    if (isLoggedIn) {
      fetch('/api/words/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word_id: current.filename, quality }),
      }).catch(() => { /* sessizce devam et */ })
    }

    setExiting(isCorrect ? "right" : "left")
    setTimeout(() => {
      setDeck(newDeck)
      setIdx((i) => i + 1)
      setFlipped(false)
      setDragX(0)
      setExiting(null)
    }, 300)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exiting, current, stats, deck, isLoggedIn])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft")  act(0)
      if (e.key === "ArrowRight") act(5)
      if (e.key === " " || e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault()
        setFlipped((f) => !f)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [act])

  function handleNewDeck() {
    const fresh = loadStats()
    setStats(fresh)
    setDeck(buildDeck(fresh))
    setIdx(0)
    setCorrectCount(0)
    setFlipped(false)
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    startX.current = e.clientX
    moved.current = false
    setDragging(true)
    ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return
    const dx = e.clientX - startX.current
    if (Math.abs(dx) > 6) moved.current = true
    setDragX(dx)
  }

  function onPointerUp() {
    setDragging(false)
    if (Math.abs(dragX) >= SWIPE_THRESHOLD) {
      act(dragX > 0 ? 5 : 0)
    } else {
      setDragX(0)
      if (!moved.current) setFlipped((f) => !f)
    }
  }

  const leftOpacity = dragX < -20 ? Math.min(1, (-dragX - 20) / 80) : 0
  const rightOpacity = dragX > 20 ? Math.min(1, (dragX - 20) / 80) : 0
  const progress = deck.length > 0 ? Math.round((idx / deck.length) * 100) : 0

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "var(--bg-page)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid var(--border-card)" }}
      >
        <button
          onClick={onClose}
          className="text-sm font-semibold transition-colors hover:opacity-70"
          style={{ color: "var(--text-secondary)" }}
        >
          ← Geri
        </button>
        <span
          className="text-sm font-bold"
          style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)" }}
        >
          {current ? `${remaining} kart kaldı` : "Deste Bitti"}
        </span>
        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {idx} / {deck.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full" style={{ background: "var(--bg-soft)" }}>
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${progress}%`, background: "#12B886" }}
        />
      </div>

      {!current ? (
        <DoneScreen correctCount={correctCount} onNewDeck={handleNewDeck} onClose={onClose} />
      ) : (
        <>
          {/* ── Main content: card LEFT + image RIGHT ── */}
          <div className="flex flex-1 items-start justify-center gap-8 px-8 pt-6 min-h-0 overflow-auto">

            {/* Left — flip card + hint + buttons, total height = 500px */}
            <div
              className="flex flex-col flex-shrink-0 w-full md:w-[460px]"
              style={{ height: 500, gap: 10 }}
            >
              {/* Swipe labels */}
              <div className="flex flex-shrink-0 justify-between px-1">
                <span className="text-sm font-bold transition-opacity" style={{ color: "#EF4444", opacity: leftOpacity }}>
                  ✗ Bilmedim
                </span>
                <span className="text-sm font-bold transition-opacity" style={{ color: "#12B886", opacity: rightOpacity }}>
                  Bildim ✓
                </span>
              </div>

              {/* Draggable flip card — fills remaining space */}
              <div
                className="select-none flex-1 min-h-0"
                style={{
                  transform: exiting
                    ? `translateX(${exiting === "right" ? "140%" : "-140%"}) rotate(${exiting === "right" ? 18 : -18}deg)`
                    : `translateX(${dragX}px) rotate(${dragX * 0.035}deg)`,
                  transition: dragging ? "none" : "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                  cursor: dragging ? "grabbing" : "grab",
                  touchAction: "none",
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
              >
                <FlipText w={current} flipped={flipped} />
              </div>

              {/* Hint */}
              <p className="flex-shrink-0 text-xs text-center" style={{ color: "var(--text-secondary)" }}>
                {flipped ? "← Bilmedim  ·  Zordu  ·  Bildim →  veya aşağıdaki butonlar" : "Kartı çevirmek için dokun"}
              </p>

              {/* Buttons: Bilmedim / Çevir / Zordu / Bildim / Ses */}
              <div className="flex flex-shrink-0 items-center justify-center gap-3">
                <button
                  onClick={() => act(0)}
                  className="flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold transition-all hover:scale-110 active:scale-95"
                  style={{ background: "#FEF2F2", border: "2px solid #FECACA", boxShadow: "0 2px 12px rgba(239,68,68,0.15)", color: "#DC2626" }}
                  title="Bilmedim (0)"
                >
                  ✗
                </button>
                <button
                  onClick={() => setFlipped((f) => !f)}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-lg transition-all hover:scale-105"
                  style={{ background: "var(--bg-soft)", color: "var(--text-primary)" }}
                  title="Çevir"
                >
                  ↩
                </button>
                <button
                  onClick={() => act(3)}
                  className="flex h-12 items-center justify-center rounded-full px-4 text-xs font-bold transition-all hover:scale-110 active:scale-95"
                  style={{ background: "#FFFBEB", border: "2px solid #FDE68A", boxShadow: "0 2px 12px rgba(245,158,11,0.15)", color: "#B45309" }}
                  title="Zordu (3)"
                >
                  Zordu
                </button>
                <button
                  onClick={() => act(5)}
                  className="flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold transition-all hover:scale-110 active:scale-95"
                  style={{ background: "#F0FDF4", border: "2px solid #BBF7D0", boxShadow: "0 2px 12px rgba(18,184,134,0.15)", color: "#15803D" }}
                  title="Bildim (5)"
                >
                  ✓
                </button>
                <button
                  onClick={() => current && speak(current.word)}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-lg transition-all hover:scale-110 active:scale-95"
                  style={{ background: "var(--bg-soft)", color: "var(--text-secondary)" }}
                  title="Telaffuzu dinle"
                >
                  🔊
                </button>
              </div>
            </div>

            {/* Right — fixed 500×500 image square */}
            <div
              className="hidden md:flex flex-shrink-0 items-center justify-center rounded-2xl overflow-hidden"
              style={{
                width: 500,
                height: 500,
                background: "var(--bg-muted)",
                boxShadow: "0 2px 16px rgba(26,26,46,0.08)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={encodeURI(`/words/${current.filename}`)}
                alt={current.word}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
                draggable={false}
              />
            </div>

          </div>
        </>
      )}
    </div>
  )
}

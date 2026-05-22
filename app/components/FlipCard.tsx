"use client"

import { useState } from "react"
import type { EnrichedWord } from "../data/enrichedWords"
import { speak } from "../lib/speak"

const KIND_COLORS: Record<string, { bg: string; text: string }> = {
  "Adjektiv":     { bg: "#EEF2FF", text: "#4338CA" },
  "Verb":         { bg: "#ECFDF5", text: "#065F46" },
  "Verb (refl.)": { bg: "#FFF7ED", text: "#C2410C" },
}

export default function FlipCard(w: EnrichedWord) {
  const [flipped, setFlipped] = useState(false)
  const colors = KIND_COLORS[w.kind] ?? KIND_COLORS["Adjektiv"]

  return (
    <div
      className="cursor-pointer"
      style={{ height: "200px", perspective: "1200px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT ─────────────────────────────────────── */}
        <div
          className="flex overflow-hidden rounded-2xl"
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--bg-card)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            boxShadow: "0 1px 4px rgba(26,26,46,0.10)",
          }}
        >
          {/* Image — left square */}
          <div
            className="flex-shrink-0"
            style={{ width: "40%", background: "var(--bg-muted)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={encodeURI(`/words/${w.filename}`)}
              alt={w.word}
              className="h-full w-full object-contain p-2"
              loading="lazy"
            />
          </div>

          {/* Info — right side */}
          <div className="flex flex-1 flex-col justify-between p-4">
            <div>
              <span
                className="mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                style={{ background: colors.bg, color: colors.text }}
              >
                {w.kind}
              </span>
              <div className="flex items-center gap-2">
                <p
                  className="text-lg font-bold leading-snug"
                  style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)" }}
                >
                  {w.word}
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); speak(w.word) }}
                  className="flex-shrink-0 flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
                  style={{ width: 26, height: 26, background: "var(--bg-soft)", color: "var(--text-secondary)", fontSize: "0.75rem" }}
                  title="Telaffuzu dinle"
                >
                  🔊
                </button>
              </div>
              {w.verbForms && (
                <div className="mt-2 space-y-0.5 text-xs" style={{ color: "var(--text-secondary)" }}>
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
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Çevirmek için tıkla →
            </p>
          </div>
        </div>

        {/* ── BACK (intentionally dark always) ──────────── */}
        <div
          className="flex flex-col justify-between overflow-hidden rounded-2xl p-4"
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "#1A1A2E",
            boxShadow: "0 1px 4px rgba(26,26,46,0.20)",
          }}
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-1"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Türkçe
            </p>
            <p
              className="text-xl font-bold text-white"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              {w.turkish}
            </p>
          </div>

          <div className="space-y-1.5">
            {w.examples.map((ex) => (
              <div key={ex.label} className="flex gap-2">
                <span
                  className="flex-shrink-0 text-[10px] font-bold mt-0.5"
                  style={{ color: "#FFD93D", minWidth: "36px" }}
                >
                  {ex.label}
                </span>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.80)" }}
                >
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

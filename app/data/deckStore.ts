import { enrichedWords } from "./enrichedWords"
import type { EnrichedWord } from "./enrichedWords"

export interface StudyLog {
  ts: number    // Unix ms
  ok: boolean   // true = ezberlendi, false = ezberlenmedi
}

export interface WordStat {
  ezberlendiCount: number
  ezberlenmediCount: number
  logs: StudyLog[]
}

const STORAGE_KEY = "thebark_stats_v1"
const DECK_SIZE = 25
const REST_CORRECT = 7          // correct answers needed to enter rest
const REST_MS = 7 * 24 * 60 * 60 * 1000  // 1 week in ms

function lastCorrectTs(logs: StudyLog[]): number {
  return [...logs].reverse().find((l) => l.ok)?.ts ?? 0
}

// True while the card is in its one-week cooldown after 7 correct answers
function isResting(stat: WordStat): boolean {
  if ((stat.ezberlendiCount ?? 0) < REST_CORRECT) return false
  return Date.now() - lastCorrectTs(stat.logs ?? []) < REST_MS
}

export function loadStats(): Record<string, WordStat> {
  if (typeof window === "undefined") return {}
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Record<string, WordStat>
  } catch {
    return {}
  }
}

export function saveStats(stats: Record<string, WordStat>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
}

export function getOrInit(stats: Record<string, WordStat>, filename: string): WordStat {
  const s = stats[filename]
  if (!s) return { ezberlendiCount: 0, ezberlenmediCount: 0, logs: [] }
  return { ...s, logs: s.logs ?? [] }  // backward compat: add logs if old entry lacks it
}

export function buildDeck(stats: Record<string, WordStat>): EnrichedWord[] {
  const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5)

  // Resting cards are never included
  const eligible = enrichedWords.filter((w) => {
    const s = stats[w.filename]
    return !s || !isResting(s)
  })

  // 1. Has errors — sorted by most recently wrong first
  const withErrors = eligible
    .filter((w) => (stats[w.filename]?.ezberlenmediCount ?? 0) > 0)
    .sort((a, b) => {
      const logsA = stats[a.filename]?.logs ?? []
      const logsB = stats[b.filename]?.logs ?? []
      const lastWrongA = [...logsA].reverse().find((l) => !l.ok)?.ts ?? 0
      const lastWrongB = [...logsB].reverse().find((l) => !l.ok)?.ts ?? 0
      if (lastWrongA !== lastWrongB) return lastWrongB - lastWrongA
      return (stats[b.filename]?.ezberlenmediCount ?? 0) - (stats[a.filename]?.ezberlenmediCount ?? 0)
    })

  // 2. Never seen
  const unseen = shuffle(eligible.filter((w) => !stats[w.filename]))

  // 3. Seen, no errors, ezberlendiCount < 3
  const inProgress = shuffle(
    eligible.filter((w) => {
      const s = stats[w.filename]
      return s && (s.ezberlenmediCount ?? 0) === 0 && (s.ezberlendiCount ?? 0) < 3
    })
  )

  // 4. Memorized (ezberlendiCount >= 3, not resting) — last resort only
  const memorized = shuffle(
    eligible.filter((w) => {
      const s = stats[w.filename]
      return s && (s.ezberlenmediCount ?? 0) === 0 && (s.ezberlendiCount ?? 0) >= 3
    })
  )

  const added = new Set<string>()
  const result: EnrichedWord[] = []

  function addFrom(pool: EnrichedWord[], limit: number) {
    for (const w of pool) {
      if (result.length >= limit) break
      if (!added.has(w.filename)) {
        added.add(w.filename)
        result.push(w)
      }
    }
  }

  // Reserve at least 5 slots for new/unseen words so the deck never becomes
  // pure error repetition when the error pool is large.
  const newSlots = Math.min(5, unseen.length + inProgress.length)
  const errorCap = DECK_SIZE - newSlots

  addFrom(withErrors, errorCap)      // errors first, capped
  addFrom(unseen, DECK_SIZE)         // fill with unseen
  addFrom(inProgress, DECK_SIZE)     // then in-progress
  addFrom(withErrors, DECK_SIZE)     // any remaining error slots (if new pool was small)
  addFrom(memorized, DECK_SIZE)      // last resort

  return shuffle(result)
}

// SM-2 spaced repetition algorithm
// quality: 0-5  (0=tamamen unutuldu, 3=zordu ama hatırlandı, 5=mükemmel)
// easeFactor: başlangıç 2.5, minimum 1.3
// intervalDays: gün cinsinden bir sonraki tekrar süresi

export interface SM2Input {
  quality: 0 | 1 | 2 | 3 | 4 | 5
  repetitions: number
  easeFactor: number
  intervalDays: number
}

export interface SM2Output {
  repetitions: number
  easeFactor: number
  intervalDays: number
  nextReviewAt: Date
}

export function sm2(input: SM2Input): SM2Output {
  const { quality, repetitions, easeFactor, intervalDays } = input

  let newRepetitions: number
  let newIntervalDays: number

  if (quality >= 3) {
    if (repetitions === 0) newIntervalDays = 1
    else if (repetitions === 1) newIntervalDays = 6
    else newIntervalDays = Math.round(intervalDays * easeFactor)
    newRepetitions = repetitions + 1
  } else {
    newRepetitions = 0
    newIntervalDays = 1
  }

  const newEaseFactor = Math.max(
    1.3,
    easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  )

  const nextReviewAt = new Date()
  nextReviewAt.setDate(nextReviewAt.getDate() + newIntervalDays)
  nextReviewAt.setHours(0, 0, 0, 0)

  return {
    repetitions: newRepetitions,
    easeFactor: Math.round(newEaseFactor * 1000) / 1000,
    intervalDays: newIntervalDays,
    nextReviewAt,
  }
}

export function isDue(nextReviewAt: Date | string): boolean {
  return new Date(nextReviewAt) <= new Date()
}

import { describe, it, expect } from 'vitest'
import { sm2, isDue } from '../sm2'

describe('sm2', () => {
  const defaults = { repetitions: 0, easeFactor: 2.5, intervalDays: 1 }

  it('ilk doğru cevapta interval 1 gün olur', () => {
    const r = sm2({ quality: 5, ...defaults })
    expect(r.intervalDays).toBe(1)
    expect(r.repetitions).toBe(1)
  })

  it('ikinci doğru cevapta interval 6 gün olur', () => {
    const r = sm2({ quality: 5, repetitions: 1, easeFactor: 2.5, intervalDays: 1 })
    expect(r.intervalDays).toBe(6)
    expect(r.repetitions).toBe(2)
  })

  it('üçüncü doğru cevapta interval = önceki * easeFactor', () => {
    const r = sm2({ quality: 5, repetitions: 2, easeFactor: 2.5, intervalDays: 6 })
    expect(r.intervalDays).toBe(Math.round(6 * 2.5))
    expect(r.repetitions).toBe(3)
  })

  it('yanlış cevapta interval 1 güne sıfırlanır', () => {
    const r = sm2({ quality: 0, repetitions: 5, easeFactor: 2.5, intervalDays: 30 })
    expect(r.intervalDays).toBe(1)
    expect(r.repetitions).toBe(0)
  })

  it('easeFactor kalite 5 ile artar', () => {
    const r = sm2({ quality: 5, ...defaults })
    expect(r.easeFactor).toBeGreaterThan(2.5)
  })

  it('easeFactor kalite 0 ile azalır ama 1.3 altına düşmez', () => {
    const r = sm2({ quality: 0, repetitions: 0, easeFactor: 1.3, intervalDays: 1 })
    expect(r.easeFactor).toBe(1.3)
  })

  it('kalite 3 (zordu) doğru sayılır', () => {
    const r = sm2({ quality: 3, ...defaults })
    expect(r.repetitions).toBe(1)
    expect(r.intervalDays).toBe(1)
  })

  it('kalite 2 yanlış sayılır, sıfırlanır', () => {
    const r = sm2({ quality: 2, repetitions: 3, easeFactor: 2.5, intervalDays: 15 })
    expect(r.repetitions).toBe(0)
    expect(r.intervalDays).toBe(1)
  })

  it('nextReviewAt bugünden ileriye işaret eder', () => {
    const r = sm2({ quality: 5, repetitions: 2, easeFactor: 2.5, intervalDays: 6 })
    expect(r.nextReviewAt.getTime()).toBeGreaterThan(Date.now() - 1000)
  })
})

describe('isDue', () => {
  it('geçmiş tarih için true döner', () => {
    expect(isDue(new Date(Date.now() - 86400000))).toBe(true)
  })

  it('gelecek tarih için false döner', () => {
    expect(isDue(new Date(Date.now() + 86400000))).toBe(false)
  })

  it('string tarihle de çalışır', () => {
    expect(isDue(new Date(Date.now() - 1000).toISOString())).toBe(true)
  })
})

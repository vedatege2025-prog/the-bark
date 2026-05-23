import { describe, it, expect, beforeEach } from 'vitest'
import { rateLimit, resetStore } from '../rate-limit'

describe('rateLimit', () => {
  beforeEach(() => resetStore())

  it('ilk isteklere izin verir', () => {
    expect(rateLimit('user-1', 3, 60_000)).toBe(true)
    expect(rateLimit('user-1', 3, 60_000)).toBe(true)
    expect(rateLimit('user-1', 3, 60_000)).toBe(true)
  })

  it('limiti aşan isteği reddeder', () => {
    rateLimit('user-1', 3, 60_000)
    rateLimit('user-1', 3, 60_000)
    rateLimit('user-1', 3, 60_000)
    expect(rateLimit('user-1', 3, 60_000)).toBe(false)
  })

  it("farklı key'ler birbirini etkilemez", () => {
    rateLimit('user-1', 1, 60_000)
    rateLimit('user-1', 1, 60_000) // blocked
    expect(rateLimit('user-2', 1, 60_000)).toBe(true)
  })

  it('window süresi geçince sayaç sıfırlanır', async () => {
    rateLimit('user-1', 1, 50) // 50ms window
    expect(rateLimit('user-1', 1, 50)).toBe(false)
    await new Promise(r => setTimeout(r, 60))
    expect(rateLimit('user-1', 1, 50)).toBe(true)
  })
})

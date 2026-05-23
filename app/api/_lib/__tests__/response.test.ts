import { describe, it, expect } from 'vitest'
import { ok, err } from '../response'

describe('response helpers', () => {
  it('ok() returns 200 with data', async () => {
    const res = ok({ name: 'Vedat' })
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toEqual({ name: 'Vedat' })
  })

  it('ok() accepts custom status', async () => {
    const res = ok({ id: 1 }, 201)
    expect(res.status).toBe(201)
  })

  it('err() returns 400 with error message', async () => {
    const res = err('Something went wrong')
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body).toEqual({ error: 'Something went wrong' })
  })

  it('err() accepts custom status', async () => {
    const res = err('Not found', 404)
    expect(res.status).toBe(404)
  })
})

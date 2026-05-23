import { type NextRequest } from 'next/server'
import { requireAuth } from '@/app/api/_lib/auth'
import { ok, err } from '@/app/api/_lib/response'
import { createRouteHandlerClient } from '@/lib/supabase/route-handler'
import { sm2 } from '@/lib/srs/sm2'

// GET /api/words/progress — kullanıcının tüm kelime ilerlemesini döner
export async function GET() {
  const { user, unauthorized } = await requireAuth()
  if (unauthorized) return unauthorized

  const supabase = await createRouteHandlerClient()
  const { data, error } = await supabase
    .from('word_progress')
    .select('word_id, ease_factor, interval_days, next_review_at, review_count, last_reviewed_at')
    .eq('user_id', user!.id)

  if (error) return err(error.message)
  return ok(data)
}

// POST /api/words/progress — bir kelimeyi puanla, SM-2 ile bir sonraki tekrarı hesapla
// body: { word_id: string, quality: 0|1|2|3|4|5 }
export async function POST(request: NextRequest) {
  const { user, unauthorized } = await requireAuth()
  if (unauthorized) return unauthorized

  const body = await request.json()
  const { word_id, quality } = body

  if (typeof word_id !== 'string' || !word_id) return err('word_id gerekli')
  if (typeof quality !== 'number' || quality < 0 || quality > 5) return err('quality 0-5 arası olmalı')

  const supabase = await createRouteHandlerClient()

  // Mevcut progress'i çek (yoksa default değerler)
  const { data: existing } = await supabase
    .from('word_progress')
    .select('ease_factor, interval_days, review_count')
    .eq('user_id', user!.id)
    .eq('word_id', word_id)
    .single()

  const prev = existing ?? { ease_factor: 2.5, interval_days: 1, review_count: 0 }

  const result = sm2({
    quality: quality as 0 | 1 | 2 | 3 | 4 | 5,
    repetitions: prev.review_count ?? 0,
    easeFactor: prev.ease_factor ?? 2.5,
    intervalDays: prev.interval_days ?? 1,
  })

  const { data, error } = await supabase
    .from('word_progress')
    .upsert({
      user_id: user!.id,
      word_id,
      ease_factor: result.easeFactor,
      interval_days: result.intervalDays,
      next_review_at: result.nextReviewAt.toISOString(),
      review_count: (prev.review_count ?? 0) + 1,
      last_reviewed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,word_id' })
    .select()
    .single()

  if (error) return err(error.message)
  return ok(data)
}

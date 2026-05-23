import { requireAuth } from '@/app/api/_lib/auth'
import { ok, err } from '@/app/api/_lib/response'
import { createRouteHandlerClient } from '@/lib/supabase/route-handler'

// Streak hesaplama: son kaç gün art arda çalışılmış
// word_progress.last_reviewed_at tarihlerinden hesaplanır

export async function GET() {
  const { user, unauthorized } = await requireAuth()
  if (unauthorized) return unauthorized

  const supabase = await createRouteHandlerClient()
  const { data, error } = await supabase
    .from('word_progress')
    .select('last_reviewed_at')
    .eq('user_id', user!.id)
    .not('last_reviewed_at', 'is', null)

  if (error) return err(error.message)

  // Her gün için en az 1 çalışma var mı kontrol et
  const days = new Set<string>()
  for (const row of data ?? []) {
    if (row.last_reviewed_at) {
      days.add(new Date(row.last_reviewed_at).toISOString().slice(0, 10))
    }
  }

  const sortedDays = [...days].sort().reverse()
  let streak = 0
  const today = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)

  // Bugün ya da dün çalışılmamışsa streak sıfır
  if (sortedDays[0] !== today && sortedDays[0] !== yesterday) {
    return ok({ streak: 0, studiedToday: false, totalDays: days.size })
  }

  // Art arda gün say
  let cursor = new Date(sortedDays[0])
  for (const day of sortedDays) {
    const d = new Date(day)
    const diff = Math.round((cursor.getTime() - d.getTime()) / 86400000)
    if (diff > 1) break
    streak++
    cursor = d
  }

  return ok({
    streak,
    studiedToday: days.has(today),
    totalDays: days.size,
  })
}

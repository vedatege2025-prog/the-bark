import { type NextRequest } from 'next/server'
import { requireAuth } from '@/app/api/_lib/auth'
import { ok, err } from '@/app/api/_lib/response'
import { createRouteHandlerClient } from '@/lib/supabase/route-handler'

// lesson_id formatı: "unit_id:lesson_index" örn. "a1-g1:0"

// GET /api/lessons/progress — tamamlanan dersleri döner
export async function GET() {
  const { user, unauthorized } = await requireAuth()
  if (unauthorized) return unauthorized

  const supabase = await createRouteHandlerClient()
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('lesson_id, completed_at')
    .eq('user_id', user!.id)

  if (error) return err(error.message)
  return ok(data)
}

// POST /api/lessons/progress — bir dersi tamamlandı olarak işaretle
// body: { unit_id: string, lesson_index: number }
export async function POST(request: NextRequest) {
  const { user, unauthorized } = await requireAuth()
  if (unauthorized) return unauthorized

  const body = await request.json()
  const { unit_id, lesson_index } = body

  if (typeof unit_id !== 'string' || !unit_id) return err('unit_id gerekli')
  if (typeof lesson_index !== 'number') return err('lesson_index gerekli')

  const lesson_id = `${unit_id}:${lesson_index}`

  const supabase = await createRouteHandlerClient()
  const { data, error } = await supabase
    .from('lesson_progress')
    .upsert({
      user_id: user!.id,
      lesson_id,
      completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,lesson_id' })
    .select()
    .single()

  if (error) return err(error.message)
  return ok(data)
}

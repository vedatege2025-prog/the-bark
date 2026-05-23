import { type NextRequest } from 'next/server'
import { requireAuth } from '@/app/api/_lib/auth'
import { ok, err } from '@/app/api/_lib/response'
import { createRouteHandlerClient } from '@/lib/supabase/route-handler'

export async function GET() {
  const { user, unauthorized } = await requireAuth()
  if (unauthorized) return unauthorized

  const supabase = await createRouteHandlerClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  if (error) return err('Profile not found', 404)
  return ok(data)
}

export async function PUT(request: NextRequest) {
  const { user, unauthorized } = await requireAuth()
  if (unauthorized) return unauthorized

  const body = await request.json()
  const allowed = ['username', 'full_name', 'level', 'daily_goal_minutes'] as const
  const updates: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in body) updates[key] = body[key]
  }

  const supabase = await createRouteHandlerClient()
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', user!.id)
    .select()
    .single()

  if (error) return err(error.message)
  return ok(data)
}

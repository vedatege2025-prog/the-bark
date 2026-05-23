'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function NavAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user)
      setLoading(false)
    })
  }, [])

  if (loading) return <div style={{ width: 80 }} />

  if (isLoggedIn) {
    return (
      <a
        href="/profil"
        className="rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
        style={{ background: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)', textDecoration: 'none' }}
      >
        Profilim
      </a>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <a
        href="/auth/login"
        className="hidden text-sm font-medium transition-opacity hover:opacity-70 md:block"
        style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
      >
        Giriş
      </a>
      <a
        href="/auth/login?mode=signup"
        className="rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
        style={{ background: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)', textDecoration: 'none' }}
      >
        Ücretsiz Başla
      </a>
    </div>
  )
}

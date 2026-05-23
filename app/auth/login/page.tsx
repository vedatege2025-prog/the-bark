'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('mode') === 'signup') setIsSignUp(true)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('E-postanı kontrol et — onay linki gönderdik.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else router.push('/')
    }

    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-page)' }}>
      <div style={{ width: '100%', maxWidth: 400, padding: '2.5rem', borderRadius: '1.5rem', background: 'var(--bg-card)', boxShadow: '0 8px 32px rgba(26,26,46,0.10)' }}>
        <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
          THE BARK
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          {isSignUp ? 'Hesap oluştur' : 'Hoş geldin, giriş yap'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1.5px solid var(--border-subtle)', background: 'var(--bg-soft)', color: 'var(--text-primary)', fontSize: '1rem' }}
          />
          <input
            type="password"
            placeholder="Şifre (en az 6 karakter)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1.5px solid var(--border-subtle)', background: 'var(--bg-soft)', color: 'var(--text-primary)', fontSize: '1rem' }}
          />

          {message && (
            <p style={{ fontSize: '0.85rem', color: message.includes('kontrol') ? '#12B886' : '#FF6B6B' }}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ padding: '0.9rem', borderRadius: '9999px', background: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Yükleniyor...' : isSignUp ? 'Kayıt Ol' : 'Giriş Yap'}
          </button>
        </form>

        <button
          onClick={() => { setIsSignUp(!isSignUp); setMessage('') }}
          style={{ marginTop: '1.25rem', width: '100%', background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.875rem', cursor: 'pointer' }}
        >
          {isSignUp ? 'Zaten hesabın var mı? Giriş yap' : 'Hesabın yok mu? Kayıt ol'}
        </button>
      </div>
    </div>
  )
}

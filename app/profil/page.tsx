'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']

const LEVEL_META: Record<string, { label: string; color: string; next?: string }> = {
  A1: { label: 'Başlangıç',  color: '#10B981', next: 'A2' },
  A2: { label: 'Temel',      color: '#0EA5E9', next: 'B1' },
  B1: { label: 'Orta',       color: '#6366F1', next: 'B2' },
  B2: { label: 'Orta-İleri', color: '#8B5CF6', next: 'C1' },
  C1: { label: 'İleri',      color: '#A855F7' },
  C2: { label: 'Ustalık',    color: '#EC4899' },
}

interface WordProgress { next_review_at: string }
interface LessonProgress { lesson_id: string }

export default function ProfilPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [wordProgress, setWordProgress] = useState<WordProgress[]>([])
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([])
  const [streak, setStreak] = useState<{ streak: number; studiedToday: boolean; totalDays: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editGoal, setEditGoal] = useState(false)
  const [goalInput, setGoalInput] = useState(15)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      const [profileRes, wordRes, lessonRes, streakRes] = await Promise.all([
        fetch('/api/user/profile'),
        fetch('/api/words/progress'),
        fetch('/api/lessons/progress'),
        fetch('/api/user/streak'),
      ])

      if (profileRes.ok) {
        const p = await profileRes.json()
        setProfile(p)
        setGoalInput(p.daily_goal_minutes ?? 15)
      }
      if (wordRes.ok) setWordProgress(await wordRes.json())
      if (lessonRes.ok) setLessonProgress(await lessonRes.json())
      if (streakRes.ok) setStreak(await streakRes.json())
      setLoading(false)
    }
    load()
  }, [router])

  async function saveGoal() {
    setSaving(true)
    await fetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ daily_goal_minutes: goalInput }),
    })
    setProfile((p) => p ? { ...p, daily_goal_minutes: goalInput } : p)
    setEditGoal(false)
    setSaving(false)
  }

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: 'var(--bg-page)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Yükleniyor…</p>
      </div>
    )
  }

  const level = profile?.level ?? 'A1'
  const lm = LEVEL_META[level] ?? LEVEL_META['A1']
  const dueCount = wordProgress.filter((w) => new Date(w.next_review_at) <= new Date()).length
  const learnedCount = wordProgress.length
  const completedLessons = lessonProgress.length

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50" style={{ backdropFilter: 'blur(20px)', background: 'var(--bg-nav)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <a href="/" className="text-2xl font-black tracking-tight" style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text-primary)', textDecoration: 'none' }}>
            THE BARK
          </a>
          <button onClick={signOut} className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: 'var(--text-secondary)' }}>
            Çıkış Yap
          </button>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Hoş geldin */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--text-secondary)' }}>Profil</p>
          <h1 className="text-3xl font-black" style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text-primary)' }}>
            {profile?.full_name ?? profile?.username ?? 'Merhaba'}
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{profile?.id?.slice(0, 8)}…</p>
        </div>

        {/* Seviye kartı */}
        <div className="mb-4 rounded-2xl p-6 flex items-center justify-between" style={{ background: lm.color, color: 'white' }}>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ opacity: 0.75 }}>Mevcut Seviye</p>
            <p className="text-4xl font-black" style={{ fontFamily: 'var(--font-fraunces)' }}>{level}</p>
            <p className="text-sm mt-1" style={{ opacity: 0.85 }}>{lm.label}</p>
          </div>
          {lm.next && (
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ opacity: 0.75 }}>Sonraki</p>
              <p className="text-3xl font-black" style={{ fontFamily: 'var(--font-fraunces)', opacity: 0.6 }}>{lm.next}</p>
            </div>
          )}
        </div>

        {/* Streak banner */}
        {streak !== null && (
          <div
            className="mb-4 rounded-2xl px-6 py-4 flex items-center justify-between"
            style={{ background: streak.studiedToday ? '#1A1A2E' : 'var(--bg-card)', border: '1px solid var(--border-card)' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{streak.studiedToday ? '🔥' : '💤'}</span>
              <div>
                <p className="font-black text-2xl" style={{ fontFamily: 'var(--font-fraunces)', color: streak.studiedToday ? '#FFD93D' : 'var(--text-primary)' }}>
                  {streak.streak} gün
                </p>
                <p className="text-xs" style={{ color: streak.studiedToday ? 'rgba(255,255,255,0.5)' : 'var(--text-secondary)' }}>
                  {streak.studiedToday ? 'Bugün çalıştın! 🎉' : 'Bugün henüz çalışmadın'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg" style={{ color: streak.studiedToday ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)' }}>
                {streak.totalDays}
              </p>
              <p className="text-xs" style={{ color: streak.studiedToday ? 'rgba(255,255,255,0.4)' : 'var(--text-secondary)' }}>toplam gün</p>
            </div>
          </div>
        )}

        {/* İstatistik kartları */}
        <div className="mb-4 grid grid-cols-3 gap-4">
          {[
            { label: 'Öğrenilen Kelime', value: learnedCount, color: '#6366F1' },
            { label: 'Bugün Tekrar', value: dueCount, color: dueCount > 0 ? '#F59E0B' : '#10B981' },
            { label: 'Tamamlanan Ders', value: completedLessons, color: '#0EA5E9' },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-2xl p-4 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)' }}>
              <p className="text-3xl font-black mb-1" style={{ fontFamily: 'var(--font-fraunces)', color }}>{value}</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Günlük hedef */}
        <div className="mb-4 rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)' }}>
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold" style={{ color: 'var(--text-primary)' }}>Günlük Hedef</p>
            <button onClick={() => setEditGoal((e) => !e)} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {editGoal ? 'İptal' : 'Düzenle'}
            </button>
          </div>
          {editGoal ? (
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={5}
                max={120}
                step={5}
                value={goalInput}
                onChange={(e) => setGoalInput(Number(e.target.value))}
                className="rounded-xl px-4 py-2 text-sm font-bold w-24"
                style={{ background: 'var(--bg-soft)', border: '1.5px solid var(--border-subtle)', color: 'var(--text-primary)' }}
              />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>dakika/gün</span>
              <button
                onClick={saveGoal}
                disabled={saving}
                className="rounded-full px-4 py-2 text-sm font-bold transition-all hover:opacity-90"
                style={{ background: '#10B981', color: 'white' }}
              >
                {saving ? '…' : 'Kaydet'}
              </button>
            </div>
          ) : (
            <p className="text-2xl font-black" style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text-primary)' }}>
              {profile?.daily_goal_minutes ?? 15} <span className="text-base font-normal" style={{ color: 'var(--text-secondary)' }}>dk/gün</span>
            </p>
          )}
        </div>

        {/* Hızlı erişim */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: '🃏 Kelime Çalış', href: '/kelimeler', color: '#6366F1' },
            { label: '📚 Derslere Git', href: '/dersler', color: '#0EA5E9' },
          ].map(({ label, href, color }) => (
            <a
              key={href}
              href={href}
              className="rounded-2xl p-5 font-bold text-sm text-center transition-all hover:scale-[1.02]"
              style={{ background: 'var(--bg-card)', border: `2px solid ${color}30`, color, textDecoration: 'none' }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

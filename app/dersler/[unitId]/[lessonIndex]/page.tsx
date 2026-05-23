'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getLessonContent, getUnitLessons } from '@/app/data/lessons'
import type { ContentBlock, Exercise } from '@/types/lesson'
import { createClient } from '@/lib/supabase/client'

// ── Content block renderer ────────────────────────────────────────────────────

function Block({ block }: { block: ContentBlock }) {
  if (block.type === 'heading') {
    return (
      <h2 className="mt-8 mb-3 text-xl font-black" style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text-primary)' }}>
        {block.body}
      </h2>
    )
  }
  if (block.type === 'text') {
    return <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-primary)' }}>{block.body}</p>
  }
  if (block.type === 'rule') {
    return (
      <div className="my-4 rounded-xl px-4 py-3" style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}>
        <p className="text-sm font-semibold" style={{ color: '#4338CA' }}>{block.body}</p>
      </div>
    )
  }
  if (block.type === 'tip') {
    return (
      <div className="my-4 rounded-xl px-4 py-3" style={{ background: '#ECFDF5', border: '1px solid #A7F3D0' }}>
        <p className="text-sm" style={{ color: '#065F46' }}>{block.body}</p>
      </div>
    )
  }
  if (block.type === 'example') {
    return (
      <div className="my-3 flex flex-col gap-1 rounded-xl px-4 py-3" style={{ background: '#1A1A2E' }}>
        <p className="font-bold text-white">{block.german}</p>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{block.turkish}</p>
      </div>
    )
  }
  if (block.type === 'table') {
    return (
      <div className="my-4 overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border-card)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--bg-soft)' }}>
              {block.headers.map((h) => (
                <th key={h} className="px-4 py-2.5 text-left font-bold" style={{ color: 'var(--text-primary)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i} style={{ borderTop: '1px solid var(--border-subtle)', background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-muted)' }}>
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-2.5" style={{ color: 'var(--text-primary)' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  return null
}

// ── Exercise component ────────────────────────────────────────────────────────

function ExercisePanel({ exercises, onComplete }: { exercises: Exercise[]; onComplete: () => void }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const ex = exercises[current]

  function choose(idx: number) {
    if (selected !== null) return
    setSelected(idx)
    if (idx === ex.answer) setScore((s) => s + 1)
  }

  function next() {
    if (current + 1 >= exercises.length) {
      setDone(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
    }
  }

  if (done) {
    return (
      <div className="mt-8 rounded-2xl p-6 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)' }}>
        <p className="text-4xl mb-3">{score === exercises.length ? '🎉' : '👏'}</p>
        <p className="text-lg font-black mb-1" style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text-primary)' }}>
          {score}/{exercises.length} doğru
        </p>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          {score === exercises.length ? 'Mükemmel! Tüm soruları doğru yanıtladın.' : 'İyi iş! Tekrar edersen daha da iyileşirsin.'}
        </p>
        <button
          onClick={onComplete}
          className="rounded-full px-8 py-3 font-bold text-sm transition-all hover:scale-105"
          style={{ background: '#12B886', color: 'white' }}
        >
          Dersi Tamamla ✓
        </button>
      </div>
    )
  }

  return (
    <div className="mt-8 rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)' }}>
      <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>
        Soru {current + 1} / {exercises.length}
      </p>
      <p className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{ex.question}</p>
      <div className="flex flex-col gap-2 mb-4">
        {ex.options.map((opt, i) => {
          const isSelected = selected === i
          const isCorrect = i === ex.answer
          let bg = 'var(--bg-soft)'
          let color = 'var(--text-primary)'
          let border = 'transparent'
          if (selected !== null) {
            if (isCorrect) { bg = '#ECFDF5'; color = '#065F46'; border = '#34D399' }
            else if (isSelected) { bg = '#FEF2F2'; color = '#DC2626'; border = '#FECACA' }
          } else if (isSelected) {
            border = 'var(--btn-cta-bg)'
          }
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              className="rounded-xl px-4 py-3 text-left text-sm font-medium transition-all"
              style={{ background: bg, color, border: `2px solid ${border}` }}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <div className="mb-4 rounded-lg px-4 py-2.5 text-sm" style={{ background: 'var(--bg-muted)', color: 'var(--text-secondary)' }}>
          {ex.explanation}
        </div>
      )}
      {selected !== null && (
        <button
          onClick={next}
          className="w-full rounded-full py-2.5 text-sm font-bold transition-all hover:scale-[1.01]"
          style={{ background: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
        >
          {current + 1 >= exercises.length ? 'Sonuçları Gör →' : 'Sonraki Soru →'}
        </button>
      )}
    </div>
  )
}

// ── Main lesson page ──────────────────────────────────────────────────────────

export default function LessonPage({ params }: { params: { unitId: string; lessonIndex: string } }) {
  const router = useRouter()
  const unitId = params.unitId
  const lessonIndex = parseInt(params.lessonIndex, 10)
  const lesson = getLessonContent(unitId, lessonIndex)
  const unitLessons = getUnitLessons(unitId)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user))
  }, [])

  async function handleComplete() {
    setCompleted(true)
    if (isLoggedIn) {
      await fetch('/api/lessons/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unit_id: unitId, lesson_index: lessonIndex }),
      })
    }
    // Sonraki derse geç
    const nextIndex = lessonIndex + 1
    if (nextIndex < unitLessons.length) {
      setTimeout(() => router.push(`/dersler/${unitId}/${nextIndex}`), 800)
    } else {
      setTimeout(() => router.push('/dersler'), 800)
    }
  }

  if (!lesson) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: 'var(--bg-page)' }}>
        <div className="text-center">
          <p className="text-2xl mb-2" style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text-primary)' }}>Ders bulunamadı</p>
          <a href="/dersler" className="text-sm" style={{ color: 'var(--text-secondary)' }}>← Dersler sayfasına dön</a>
        </div>
      </div>
    )
  }

  const progress = unitLessons.length > 0 ? Math.round(((lessonIndex + 1) / unitLessons.length) * 100) : 0

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50" style={{ backdropFilter: 'blur(20px)', background: 'var(--bg-nav)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <a href={`/dersler`} className="text-sm font-semibold transition-opacity hover:opacity-70" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
            ← Dersler
          </a>
          <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text-primary)' }}>
            {lessonIndex + 1} / {unitLessons.length}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{unitId.toUpperCase()}</span>
        </div>
        {/* Progress bar */}
        <div className="h-1 w-full" style={{ background: 'var(--bg-soft)' }}>
          <div className="h-full transition-all duration-500" style={{ width: `${progress}%`, background: '#12B886' }} />
        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-10">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-secondary)' }}>
          {unitId.toUpperCase()} · Ders {lessonIndex + 1}
        </p>
        <h1 className="text-3xl font-black mb-8" style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text-primary)' }}>
          {lesson.title}
        </h1>

        {/* Content blocks */}
        {lesson.blocks.map((block, i) => <Block key={i} block={block} />)}

        {/* Exercises */}
        {lesson.exercises && lesson.exercises.length > 0 && (
          <ExercisePanel exercises={lesson.exercises} onComplete={handleComplete} />
        )}

        {/* Complete button (lessons without exercises) */}
        {(!lesson.exercises || lesson.exercises.length === 0) && !completed && (
          <button
            onClick={handleComplete}
            className="mt-10 w-full rounded-full py-3 font-bold text-sm transition-all hover:scale-[1.01]"
            style={{ background: '#12B886', color: 'white' }}
          >
            Dersi Tamamla ✓
          </button>
        )}

        {completed && (
          <div className="mt-6 rounded-xl py-3 text-center text-sm font-semibold" style={{ background: '#ECFDF5', color: '#065F46' }}>
            ✓ Tamamlandı — yönlendiriliyorsun…
          </div>
        )}

        {/* Prev/Next navigation */}
        <div className="mt-8 flex justify-between">
          {lessonIndex > 0 ? (
            <a href={`/dersler/${unitId}/${lessonIndex - 1}`} className="rounded-full px-5 py-2 text-sm font-semibold transition-all hover:opacity-80" style={{ background: 'var(--bg-soft)', color: 'var(--text-primary)', textDecoration: 'none' }}>
              ← Önceki
            </a>
          ) : <span />}
          {lessonIndex + 1 < unitLessons.length && (
            <a href={`/dersler/${unitId}/${lessonIndex + 1}`} className="rounded-full px-5 py-2 text-sm font-semibold transition-all hover:opacity-80" style={{ background: 'var(--bg-soft)', color: 'var(--text-primary)', textDecoration: 'none' }}>
              Sonraki →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

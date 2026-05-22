"use client"

import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("thebark_theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDark = saved ? saved === "dark" : prefersDark
    setDark(isDark)
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light")
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    localStorage.setItem("thebark_theme", next ? "dark" : "light")
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light")
  }

  if (!mounted) return <div style={{ width: 40, height: 40 }} />

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Aydınlık moda geç" : "Karanlık moda geç"}
      className="flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
      style={{
        width: 40,
        height: 40,
        background: "var(--bg-soft)",
        color: "var(--text-secondary)",
        border: "1px solid var(--border-subtle)",
        fontSize: "1.1rem",
        flexShrink: 0,
      }}
    >
      {dark ? "☀️" : "🌙"}
    </button>
  )
}

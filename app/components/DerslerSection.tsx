"use client"

import { useState, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"

// ── Types ─────────────────────────────────────────────────────────────────────

type LessonType = "theory" | "practice" | "quiz" | "audio" | "speaking" | "writing"
type Category = "grammatik" | "wortschatz" | "kommunikation" | "fertigkeiten"
type LevelCode = "A1" | "A2" | "B1" | "B2" | "C1" | "C2"

interface Lesson {
  title: string
  type: LessonType
  min: number
}

interface Unit {
  id: string
  title: string
  description: string
  icon: string
  category: Category
  topics: string[]
  lessons: Lesson[]
  soon?: boolean
}

// ── Metadata ──────────────────────────────────────────────────────────────────

const LEVEL_META: Record<LevelCode, { label: string; desc: string; color: string; bg: string; textColor: string; locked: boolean }> = {
  A1: { label: "Başlangıç",   desc: "Günlük hayatta temel iletişim kurmak",             color: "#10B981", bg: "#ECFDF5", textColor: "#065F46", locked: false },
  A2: { label: "Temel",       desc: "Basit konuşmalar ve kısa metinleri anlamak",        color: "#0EA5E9", bg: "#F0F9FF", textColor: "#0369A1", locked: false },
  B1: { label: "Orta",        desc: "Açık standart konularda akıcı anlaşmak",            color: "#6366F1", bg: "#EEF2FF", textColor: "#4338CA", locked: false },
  B2: { label: "Orta-İleri",  desc: "Karmaşık konular ve akıcı konuşma",                color: "#8B5CF6", bg: "#F5F3FF", textColor: "#6D28D9", locked: true  },
  C1: { label: "İleri",       desc: "Karmaşık, uzun metinleri anlayabilmek",             color: "#A855F7", bg: "#FAF5FF", textColor: "#7E22CE", locked: true  },
  C2: { label: "Ustalık",     desc: "Neredeyse anadil düzeyinde iletişim",               color: "#EC4899", bg: "#FDF2F8", textColor: "#9D174D", locked: true  },
}

const CAT_META: Record<Category, { label: string; icon: string; color: string; bg: string; text: string }> = {
  grammatik:     { label: "Grammatik",     icon: "⚙️", color: "#1E40AF", bg: "#DBEAFE", text: "#1E3A8A" },
  wortschatz:    { label: "Wortschatz",    icon: "📚", color: "#065F46", bg: "#D1FAE5", text: "#064E3B" },
  kommunikation: { label: "Kommunikation", icon: "💬", color: "#92400E", bg: "#FEF3C7", text: "#78350F" },
  fertigkeiten:  { label: "Fertigkeiten",  icon: "🎯", color: "#4C1D95", bg: "#EDE9FE", text: "#3B0764" },
}

const LESSON_ICON: Record<LessonType, string> = {
  theory:   "📖",
  practice: "✏️",
  quiz:     "📝",
  audio:    "🎧",
  speaking: "🗣️",
  writing:  "✍️",
}

// ── Curriculum — A1 ───────────────────────────────────────────────────────────

const A1: Unit[] = [
  // GRAMMATIK
  {
    id: "a1-g1", icon: "🔵", category: "grammatik",
    title: "Artikel & Nomen",
    description: "Almancada üç dilbilgisel cins: eril, dişil ve nötr. Belirli ve belgisiz artikeller.",
    topics: ["der / die / das", "ein / eine / ein", "Pluralformen", "Nomen großschreiben"],
    lessons: [
      { title: "Bestimmte Artikel: der, die, das", type: "theory", min: 10 },
      { title: "Unbestimmte Artikel: ein, eine, ein", type: "theory", min: 8 },
      { title: "Pluralformen der Nomen", type: "theory", min: 12 },
      { title: "Übung: Artikel zuordnen", type: "practice", min: 15 },
      { title: "Test: Artikel & Nomen", type: "quiz", min: 10 },
    ],
  },
  {
    id: "a1-g2", icon: "🟢", category: "grammatik",
    title: "Personalpronomen & Präsens",
    description: "Kişi zamirleri ve fiillerin şimdiki zamanı. sein ve haben fiillerinin çekimi.",
    topics: ["ich, du, er / sie / es, wir, ihr, sie / Sie", "Konjugation: -e, -st, -t, -en", "sein & haben", "Unregelmäßige Verben"],
    lessons: [
      { title: "Personalpronomen im Überblick", type: "theory", min: 8 },
      { title: "Konjugation regelmäßiger Verben", type: "theory", min: 12 },
      { title: "sein & haben: Formen & Verwendung", type: "theory", min: 10 },
      { title: "Vokalwechsel: schlafen, fahren, lesen…", type: "theory", min: 12 },
      { title: "Übung: Verbkonjugation", type: "practice", min: 20 },
      { title: "Test: Präsens", type: "quiz", min: 10 },
    ],
  },
  {
    id: "a1-g3", icon: "❌", category: "grammatik",
    title: "Verneinung: nicht & kein",
    description: "Almancada olumsuzluk: nicht ve kein / keine / kein kullanımı.",
    topics: ["kein / keine (isimler için)", "nicht (fiil & sıfat için)", "Stellung von nicht", "Verneinung im Satz"],
    lessons: [
      { title: "kein / keine: Nomen verneinen", type: "theory", min: 10 },
      { title: "nicht: Verben & Adjektive verneinen", type: "theory", min: 10 },
      { title: "Stellung von nicht im Satz", type: "theory", min: 12 },
      { title: "Übung: Verneinung anwenden", type: "practice", min: 15 },
      { title: "Test: nicht & kein", type: "quiz", min: 8 },
    ],
  },
  {
    id: "a1-g4", icon: "🟡", category: "grammatik",
    title: "Akkusativ",
    description: "Belirtme hali: nesne durumu. Eril artikelin nasıl değiştiğini öğren.",
    topics: ["den / einen (maskulin)", "Nominativ → Akkusativ", "Direktes Objekt", "Verben mit Akkusativ"],
    lessons: [
      { title: "Nominativ vs. Akkusativ: Unterschied", type: "theory", min: 12 },
      { title: "Artikel im Akkusativ", type: "theory", min: 10 },
      { title: "Typische Verben mit Akkusativ", type: "theory", min: 10 },
      { title: "Übung: Akkusativ erkennen & anwenden", type: "practice", min: 18 },
      { title: "Test: Akkusativ", type: "quiz", min: 10 },
    ],
  },
  {
    id: "a1-g5", icon: "🟠", category: "grammatik",
    title: "Modalverben",
    description: "können, müssen, wollen, dürfen, sollen, mögen — yardımcı fiiller ve anlamları.",
    topics: ["können: yetenek / olasılık", "müssen: zorunluluk", "wollen / möchten: istek", "dürfen: izin"],
    lessons: [
      { title: "können & dürfen: Fähigkeit & Erlaubnis", type: "theory", min: 10 },
      { title: "müssen & sollen: Notwendigkeit & Auftrag", type: "theory", min: 10 },
      { title: "wollen & möchten: Wunsch & Absicht", type: "theory", min: 10 },
      { title: "Satzstellung: Infinitiv ans Ende", type: "theory", min: 8 },
      { title: "Übung: Modalverben einsetzen", type: "practice", min: 20 },
      { title: "Test: Modalverben", type: "quiz", min: 10 },
    ],
  },
  {
    id: "a1-g6", icon: "❓", category: "grammatik",
    title: "Fragesätze",
    description: "Soru yapıları: soru kelimeleri (W-Fragen) ve evet/hayır soruları.",
    topics: ["wer, was, wie, wo, wann, warum, woher", "Inversion: Verb an Position 1", "Ja / Nein / Doch", "Frageintonation"],
    lessons: [
      { title: "W-Fragen: wer, was, wie, wo…", type: "theory", min: 10 },
      { title: "Ja/Nein-Fragen bilden", type: "theory", min: 8 },
      { title: "Doch als Antwort auf Verneinung", type: "theory", min: 8 },
      { title: "Übung: Fragen formulieren", type: "practice", min: 15 },
      { title: "Test: Fragestrukturen", type: "quiz", min: 10 },
    ],
  },
  {
    id: "a1-g7", icon: "💛", category: "grammatik",
    title: "Possessivartikel",
    description: "İyelik artikelleri: mein, dein, sein, ihr… Sahipliği ifade etmek.",
    topics: ["mein / meine", "dein / deine / Ihr / Ihre", "sein / ihr / sein (3. şahıs)", "unser / euer / ihr"],
    lessons: [
      { title: "Possessivartikel im Nominativ", type: "theory", min: 10 },
      { title: "Possessivartikel im Akkusativ", type: "theory", min: 10 },
      { title: "Possessivartikel: alle Formen im Überblick", type: "theory", min: 8 },
      { title: "Übung: Possessivartikel einsetzen", type: "practice", min: 15 },
      { title: "Test: Possessivartikel", type: "quiz", min: 8 },
    ],
  },
  {
    id: "a1-g8", icon: "📢", category: "grammatik",
    title: "Imperativ",
    description: "Emir kipi: talimat vermek, yönlendirmek, rica etmek.",
    topics: ["Imperativ du-Form: Komm!", "Imperativ ihr-Form: Kommt!", "Imperativ Sie-Form: Kommen Sie!", "Trennbare Verben: Steh auf!"],
    lessons: [
      { title: "Imperativ du-Form bilden", type: "theory", min: 8 },
      { title: "Imperativ ihr- und Sie-Form", type: "theory", min: 8 },
      { title: "Trennbare Verben im Imperativ", type: "theory", min: 10 },
      { title: "Höfliche Bitten mit bitte", type: "theory", min: 6 },
      { title: "Übung: Anweisungen formulieren", type: "practice", min: 15 },
      { title: "Test: Imperativ", type: "quiz", min: 8 },
    ],
  },
  // WORTSCHATZ A1
  {
    id: "a1-w1", icon: "👋", category: "wortschatz",
    title: "Begrüßung & Vorstellung",
    description: "Selamlama, vedalaşma ve kendini tanıtma. Almanca konuşmanın ilk adımı.",
    topics: ["Hallo / Guten Morgen / Auf Wiedersehen", "Wie heißen Sie? / Wie heißt du?", "Herkunft & Nationalitäten", "Zahlen 1–20"],
    lessons: [
      { title: "Begrüßungen: formell & informell", type: "theory", min: 8 },
      { title: "Sich vorstellen: Name, Herkunft, Alter", type: "theory", min: 10 },
      { title: "Hören: Erste Gespräche", type: "audio", min: 12 },
      { title: "Sprechen: Kennenlernen Dialog", type: "speaking", min: 15 },
      { title: "Quiz: Begrüßungsvokabeln", type: "quiz", min: 8 },
    ],
  },
  {
    id: "a1-w2", icon: "👨‍👩‍👧", category: "wortschatz",
    title: "Familie & Beziehungen",
    description: "Aile üyeleri, akrabalar ve sosyal ilişkiler.",
    topics: ["Mutter, Vater, Kind, Geschwister", "Großeltern, Tante, Onkel", "Freund / Freundin, Partner", "Familie beschreiben"],
    lessons: [
      { title: "Familienmitglieder benennen", type: "theory", min: 10 },
      { title: "Beziehungen & Verwandtschaft", type: "theory", min: 8 },
      { title: "Hören: Familiengespräch", type: "audio", min: 10 },
      { title: "Schreiben: Meine Familie vorstellen", type: "writing", min: 20 },
      { title: "Quiz: Familienwortschatz", type: "quiz", min: 8 },
    ],
  },
  {
    id: "a1-w3", icon: "🕐", category: "wortschatz",
    title: "Zahlen, Datum & Uhrzeit",
    description: "Sayılar, tarih ve saat bildirme — günlük hayatın temeli.",
    topics: ["Grundzahlen 0–1000", "Ordinalzahlen: erst-, zweit-…", "Wochentage & Monate", "Uhrzeit: offiziell & umgangssprachlich"],
    lessons: [
      { title: "Grundzahlen 0–100", type: "theory", min: 10 },
      { title: "Zahlen 100–1000 & Ordinalzahlen", type: "theory", min: 10 },
      { title: "Datum: Wochentage & Monate", type: "theory", min: 12 },
      { title: "Uhrzeit: Wie spät ist es?", type: "theory", min: 10 },
      { title: "Hören: Termine & Zeiten", type: "audio", min: 12 },
      { title: "Quiz: Zahlen & Datum", type: "quiz", min: 10 },
    ],
  },
  {
    id: "a1-w4", icon: "🍽️", category: "wortschatz",
    title: "Essen & Trinken",
    description: "Yiyecek, içecek ve restoranda sipariş verme.",
    topics: ["Lebensmittel: Obst, Gemüse, Fleisch", "Getränke: Kaffee, Tee, Saft", "Im Restaurant bestellen", "Preise & Mengenangaben"],
    lessons: [
      { title: "Lebensmittel & Getränke benennen", type: "theory", min: 12 },
      { title: "Im Restaurant: Bestellen & Bezahlen", type: "theory", min: 10 },
      { title: "Hören: Im Café", type: "audio", min: 10 },
      { title: "Sprechen: Bestellung üben", type: "speaking", min: 15 },
      { title: "Quiz: Essen & Trinken", type: "quiz", min: 8 },
    ],
  },
  {
    id: "a1-w5", icon: "🏠", category: "wortschatz",
    title: "Wohnen & Stadt",
    description: "Ev ve daire türleri, şehir mekânları ve ulaşım.",
    topics: ["Wohnungstypen: Haus, Wohnung, WG", "Zimmer & Möbel", "Stadtteile & öffentliche Orte", "Wegbeschreibung"],
    lessons: [
      { title: "Wohnungen & Zimmer beschreiben", type: "theory", min: 10 },
      { title: "Möbel & Einrichtungsgegenstände", type: "theory", min: 10 },
      { title: "Orte in der Stadt", type: "theory", min: 8 },
      { title: "Hören: Wegbeschreibung", type: "audio", min: 12 },
      { title: "Sprechen: Wie komme ich zum…?", type: "speaking", min: 15 },
    ],
  },
  {
    id: "a1-w6", icon: "💼", category: "wortschatz",
    title: "Berufe & Alltag",
    description: "Meslekler, iş yeri ve günlük rutin.",
    topics: ["Berufsbezeichnungen", "Arbeitszeiten & -orte", "Tagesablauf beschreiben", "Kleidung & Farben"],
    lessons: [
      { title: "Berufe: Arzt, Lehrerin, Ingenieur…", type: "theory", min: 10 },
      { title: "Tagesablauf: morgens, mittags, abends", type: "theory", min: 10 },
      { title: "Kleidung & Farben", type: "theory", min: 10 },
      { title: "Hören: Ein Tag im Leben von…", type: "audio", min: 12 },
      { title: "Quiz: Berufe & Alltag", type: "quiz", min: 8 },
    ],
  },
  // KOMMUNIKATION A1
  {
    id: "a1-k1", icon: "🤝", category: "kommunikation",
    title: "Sich vorstellen & Kennenlernen",
    description: "Yeni insanlarla tanışırken kullanılan diyaloglar ve kalıp ifadeler.",
    topics: ["Name, Alter, Herkunft, Beruf", "Hobbys & Interessen nennen", "Small Talk beginnen", "Kontakt aufnehmen"],
    lessons: [
      { title: "Vorstellungsgespräch: Schritt für Schritt", type: "theory", min: 10 },
      { title: "Hören: Zwei Personen stellen sich vor", type: "audio", min: 12 },
      { title: "Sprechen: Kennenlernen-Dialog", type: "speaking", min: 20 },
      { title: "Schreiben: Steckbrief ausfüllen", type: "writing", min: 15 },
    ],
  },
  {
    id: "a1-k2", icon: "🛍️", category: "kommunikation",
    title: "Einkaufen & Im Geschäft",
    description: "Alışveriş diyalogları: fiyat sorma, ödeme, ürün açıklamaları.",
    topics: ["Was kostet das?", "Größen & Farben", "Bezahlen: bar / Karte", "Haben Sie…?"],
    lessons: [
      { title: "Einkaufsgespräche: Redemittel", type: "theory", min: 10 },
      { title: "Hören: Im Supermarkt", type: "audio", min: 12 },
      { title: "Sprechen: Einkaufen simulieren", type: "speaking", min: 20 },
      { title: "Quiz: Einkaufsvokabeln", type: "quiz", min: 8 },
    ],
  },
  {
    id: "a1-k3", icon: "📅", category: "kommunikation",
    title: "Termine & Verabredungen",
    description: "Tarih ve saat belirlemek, randevu almak ve kabul/red etmek.",
    topics: ["Termin vereinbaren", "Vorschläge machen & annehmen", "Ablehnen: Das geht leider nicht", "Tagesablauf planen"],
    lessons: [
      { title: "Termine vereinbaren: Redemittel", type: "theory", min: 10 },
      { title: "Hören: Am Telefon einen Termin machen", type: "audio", min: 12 },
      { title: "Sprechen: Verabredung treffen", type: "speaking", min: 18 },
      { title: "Schreiben: Terminanfrage per E-Mail", type: "writing", min: 15 },
    ],
  },
  // FERTIGKEITEN A1
  {
    id: "a1-f1", icon: "📖", category: "fertigkeiten",
    title: "Lesen A1",
    description: "Süreli yayınlar, ilan panoları ve kısa günlük yazıları okuma.",
    topics: ["Formulare & Schilder lesen", "Kurze SMS & Nachrichten", "Globales & selektives Lesen", "Prüfungsformat Goethe A1"],
    lessons: [
      { title: "Lesestrategie: Schlüsselwörter finden", type: "theory", min: 10 },
      { title: "Übung: Schilder & Aushänge", type: "practice", min: 15 },
      { title: "Übung: Formulare & Steckbriefe", type: "practice", min: 15 },
      { title: "Prüfungsvorbereitung Lesen A1", type: "quiz", min: 25 },
    ],
  },
  {
    id: "a1-f2", icon: "🎧", category: "fertigkeiten",
    title: "Hören A1",
    description: "Basit diyalogları ve günlük duyuruları dinleyip anlamak.",
    topics: ["Einfache Alltagsgespräche", "Durchsagen & Ansagen", "Am Telefon", "Prüfungsformat Goethe A1"],
    lessons: [
      { title: "Hörstrategie: Globalverstehen", type: "theory", min: 8 },
      { title: "Übung: Alltagsgespräche", type: "audio", min: 20 },
      { title: "Übung: Zahlen, Zeiten & Orte hören", type: "audio", min: 15 },
      { title: "Prüfungsvorbereitung Hören A1", type: "quiz", min: 25 },
    ],
  },
  {
    id: "a1-f3", icon: "✍️", category: "fertigkeiten",
    title: "Schreiben & Sprechen A1",
    description: "Kısa notlar, formlar ve basit konuşmalar.",
    topics: ["Formulare ausfüllen", "Kurze Nachricht / SMS schreiben", "Sich mündlich vorstellen", "Prüfungsformat Goethe A1"],
    lessons: [
      { title: "Schreiben: Formulare & Steckbriefe", type: "writing", min: 15 },
      { title: "Schreiben: Kurze Mitteilung", type: "writing", min: 15 },
      { title: "Sprechen: Mündliche Vorstellung", type: "speaking", min: 20 },
      { title: "Prüfungsvorbereitung Schreiben A1", type: "quiz", min: 25 },
    ],
  },
]

// ── Curriculum — A2 ───────────────────────────────────────────────────────────

const A2: Unit[] = [
  {
    id: "a2-g1", icon: "⏮️", category: "grammatik",
    title: "Perfekt",
    description: "Konuşma dilinde geçmiş zaman: haben / sein + Partizip II yapısı.",
    topics: ["Partizip II: ge…t ve ge…en", "haben vs. sein seçimi", "Trennbare Verben im Perfekt", "Unregelmäßige Partizipien"],
    lessons: [
      { title: "Partizip II: regelmäßige Verben", type: "theory", min: 12 },
      { title: "Partizip II: unregelmäßige Verben", type: "theory", min: 15 },
      { title: "haben vs. sein: Wann welches?", type: "theory", min: 12 },
      { title: "Trennbare & untrennbare Verben im Perfekt", type: "theory", min: 10 },
      { title: "Übung: Perfektsätze bilden", type: "practice", min: 20 },
      { title: "Test: Perfekt", type: "quiz", min: 12 },
    ],
  },
  {
    id: "a2-g2", icon: "📜", category: "grammatik",
    title: "Präteritum",
    description: "Yazı dilinde kullanılan anlatı geçmiş zamanı.",
    topics: ["sein → war, haben → hatte", "Modalverben im Präteritum", "Starke Verben: gehen → ging", "Mündlich vs. schriftlich"],
    lessons: [
      { title: "sein & haben: war / hatte", type: "theory", min: 10 },
      { title: "Modalverben im Präteritum", type: "theory", min: 10 },
      { title: "Starke Verben: Grundliste", type: "theory", min: 12 },
      { title: "Übung: Erzählung im Präteritum", type: "practice", min: 20 },
      { title: "Test: Präteritum", type: "quiz", min: 12 },
    ],
  },
  {
    id: "a2-g3", icon: "↔️", category: "grammatik",
    title: "Dativ",
    description: "Yönelme hali: dolaylı nesne. Artikel ve zamirlerin değişimi.",
    topics: ["dem / einem (mask. & neutr.)", "der / einer (feminin)", "Verben mit Dativobjekt", "Pronomen im Dativ"],
    lessons: [
      { title: "Dativ: Artikel & Pronomen", type: "theory", min: 12 },
      { title: "Verben mit Dativobjekt: geben, helfen, zeigen…", type: "theory", min: 12 },
      { title: "Nom. / Akk. / Dat. im Vergleich", type: "theory", min: 15 },
      { title: "Übung: Dativ erkennen & einsetzen", type: "practice", min: 20 },
      { title: "Test: Dativ", type: "quiz", min: 12 },
    ],
  },
  {
    id: "a2-g4", icon: "📍", category: "grammatik",
    title: "Präpositionen",
    description: "Datif, akkusatif ve iki yönlü edatlar — yer, yön ve zaman.",
    topics: ["Dat.: mit, bei, aus, nach, seit, von, zu", "Akk.: durch, für, gegen, ohne, um", "Wechselpräp.: an, auf, in, über, unter, vor, hinter"],
    lessons: [
      { title: "Dativpräpositionen", type: "theory", min: 12 },
      { title: "Akkusativpräpositionen", type: "theory", min: 10 },
      { title: "Wechselpräpositionen: Ort vs. Richtung", type: "theory", min: 15 },
      { title: "Übung: Präpositionen einsetzen", type: "practice", min: 20 },
      { title: "Test: Präpositionen", type: "quiz", min: 12 },
    ],
  },
  {
    id: "a2-g5", icon: "🔗", category: "grammatik",
    title: "Nebensätze & Konjunktionen",
    description: "Bağlaçlar ve yan cümle yapıları: neden, çünkü, eğer, ki…",
    topics: ["weil & da (çünkü)", "dass-Sätze", "wenn (eğer / ne zaman)", "ob (olup olmadığı)", "Verbposition: ans Ende"],
    lessons: [
      { title: "weil & da: Kausalangaben", type: "theory", min: 10 },
      { title: "dass-Sätze bilden", type: "theory", min: 10 },
      { title: "wenn & als: Konditional & Temporal", type: "theory", min: 12 },
      { title: "ob-Sätze: indirekte Fragen", type: "theory", min: 10 },
      { title: "Übung: Nebensätze bilden", type: "practice", min: 20 },
      { title: "Test: Nebensätze", type: "quiz", min: 12 },
    ],
  },
  {
    id: "a2-g6", icon: "📊", category: "grammatik",
    title: "Komparativ & Superlativ",
    description: "Sıfat karşılaştırmaları: daha hızlı, en hızlı.",
    topics: ["Komparativ: schneller als…", "Superlativ: am schnellsten / der schnellste", "Unregelmäßig: gut → besser → best-", "Vergleichssätze"],
    lessons: [
      { title: "Komparativ bilden & verwenden", type: "theory", min: 10 },
      { title: "Superlativ: am -sten / der -ste", type: "theory", min: 10 },
      { title: "Unregelmäßige Formen: gut, viel, gern", type: "theory", min: 8 },
      { title: "Übung: Vergleiche formulieren", type: "practice", min: 15 },
      { title: "Test: Komparativ & Superlativ", type: "quiz", min: 10 },
    ],
  },
  {
    id: "a2-g7", icon: "🔄", category: "grammatik",
    title: "Reflexivverben",
    description: "Dönüşlü fiiller: sich waschen, sich freuen, sich interessieren…",
    topics: ["Reflexivpronomen: mich, dich, sich…", "Akkusativ-Reflexiv", "Dativ-Reflexiv", "Typische Reflexivverben"],
    lessons: [
      { title: "Reflexivpronomen im Überblick", type: "theory", min: 10 },
      { title: "Reflexivverben im Akkusativ", type: "theory", min: 10 },
      { title: "Reflexivverben im Dativ", type: "theory", min: 8 },
      { title: "Übung: Reflexivverben einsetzen", type: "practice", min: 15 },
      { title: "Test: Reflexivverben", type: "quiz", min: 10 },
    ],
  },
  // WORTSCHATZ A2
  {
    id: "a2-w1", icon: "✈️", category: "wortschatz",
    title: "Reisen & Transport",
    description: "Seyahat planlamak, bilet almak ve turistik mekânlar.",
    topics: ["Verkehrsmittel: Zug, Bus, Flugzeug", "Bahnhof & Flughafen", "Hotel & Unterkunft buchen", "Sehenswürdigkeiten"],
    lessons: [
      { title: "Verkehrsmittel & Reisevokabular", type: "theory", min: 12 },
      { title: "Am Bahnhof & Flughafen", type: "theory", min: 10 },
      { title: "Hören: Reiseplanung", type: "audio", min: 15 },
      { title: "Sprechen: Urlaub beschreiben", type: "speaking", min: 20 },
      { title: "Quiz: Reisevokabeln", type: "quiz", min: 8 },
    ],
  },
  {
    id: "a2-w2", icon: "🏥", category: "wortschatz",
    title: "Gesundheit & Körper",
    description: "Vücut organları, sağlık sorunları ve doktorda iletişim.",
    topics: ["Körperteile benennen", "Krankheiten & Symptome", "Beim Arzt: Redemittel", "Rezept & Apotheke"],
    lessons: [
      { title: "Körperteile benennen", type: "theory", min: 10 },
      { title: "Krankheitssymptome beschreiben", type: "theory", min: 10 },
      { title: "Beim Arzt: Gespräch & Redemittel", type: "theory", min: 10 },
      { title: "Hören: Arztgespräch", type: "audio", min: 12 },
      { title: "Sprechen: Arztbesuch simulieren", type: "speaking", min: 20 },
    ],
  },
  {
    id: "a2-w3", icon: "💼", category: "wortschatz",
    title: "Arbeit & Bewerbung",
    description: "Meslekler, iş hayatı ve iş başvurusu için gerekli dil.",
    topics: ["Berufsbezeichnungen: erweiterter Wortschatz", "Arbeitsplatz & Kollegen", "Bewerbung & Lebenslauf", "Arbeitszeiten & Verträge"],
    lessons: [
      { title: "Berufe: Erweiterter Wortschatz", type: "theory", min: 12 },
      { title: "Im Büro & am Arbeitsplatz", type: "theory", min: 10 },
      { title: "Bewerbungsprozess Schritt für Schritt", type: "theory", min: 12 },
      { title: "Hören: Vorstellungsgespräch A2", type: "audio", min: 15 },
      { title: "Schreiben: Bewerbungsschreiben A2", type: "writing", min: 30 },
    ],
  },
  {
    id: "a2-w4", icon: "💻", category: "wortschatz",
    title: "Medien & Technologie",
    description: "İnternet, sosyal medya ve dijital dünya dili.",
    topics: ["Internet & Social Media", "Smartphones & Apps", "Online einkaufen", "Datenschutz & Sicherheit"],
    lessons: [
      { title: "Digitale Medien: Grundvokabular", type: "theory", min: 10 },
      { title: "Social Media: Plattformen & Begriffe", type: "theory", min: 10 },
      { title: "Hören: Medienbericht", type: "audio", min: 12 },
      { title: "Schreiben: Online-Kommentar", type: "writing", min: 20 },
      { title: "Quiz: Technologievokabeln", type: "quiz", min: 8 },
    ],
  },
  {
    id: "a2-w5", icon: "🌤️", category: "wortschatz",
    title: "Natur & Wetter",
    description: "Hava durumu ifadeleri, mevsimler ve doğa tanımlamaları.",
    topics: ["Wetterbeschreibungen", "Jahreszeiten", "Landschaft & Natur", "Wettervorhersage"],
    lessons: [
      { title: "Wetterwortschatz: Regen, Sonne, Schnee…", type: "theory", min: 10 },
      { title: "Jahreszeiten beschreiben", type: "theory", min: 8 },
      { title: "Hören: Wettervorhersage", type: "audio", min: 10 },
      { title: "Quiz: Natur & Wetter", type: "quiz", min: 8 },
    ],
  },
  // KOMMUNIKATION A2
  {
    id: "a2-k1", icon: "📖", category: "kommunikation",
    title: "Über Vergangenes berichten",
    description: "Geçmiş deneyimleri, tatilleri ve önemli olayları anlatmak.",
    topics: ["Urlaub & Reiseerlebnisse erzählen", "Kindheitserinnerungen", "Temporal-Adverbien: damals, früher", "Perfekt & Präteritum wählen"],
    lessons: [
      { title: "Erlebnisse auf Deutsch erzählen", type: "theory", min: 10 },
      { title: "Hören: Reisebericht", type: "audio", min: 15 },
      { title: "Sprechen: Mein letzter Urlaub", type: "speaking", min: 20 },
      { title: "Schreiben: Erlebnisbericht", type: "writing", min: 25 },
    ],
  },
  {
    id: "a2-k2", icon: "🗣️", category: "kommunikation",
    title: "Meinungen äußern & Diskutieren",
    description: "Görüş bildirmek, farklı bakış açılarını tartışmak.",
    topics: ["Ich finde, dass… / Meiner Meinung nach…", "Zustimmen: Das stimmt / Genau!", "Widersprechen: Ich sehe das anders", "Pro & Contra"],
    lessons: [
      { title: "Meinungsäußerung: Redemittel", type: "theory", min: 10 },
      { title: "Zustimmen & Ablehnen", type: "theory", min: 8 },
      { title: "Hören: Kurze Diskussionsrunde", type: "audio", min: 15 },
      { title: "Sprechen: Mini-Diskussion führen", type: "speaking", min: 25 },
    ],
  },
  {
    id: "a2-k3", icon: "📢", category: "kommunikation",
    title: "Bitten, Beschwerden & Ratschläge",
    description: "Kibarca bir şeyler istemek, şikâyet etmek ve tavsiye vermek.",
    topics: ["Höfliche Bitten: Könnte ich…? / Dürfte ich…?", "Beschwerde formulieren", "Ratschläge: Du solltest… / Warum nicht…?", "Entschuldigungen"],
    lessons: [
      { title: "Höfliche Bitten & Anfragen", type: "theory", min: 10 },
      { title: "Beschwerden formulieren", type: "theory", min: 10 },
      { title: "Ratschläge geben & annehmen", type: "theory", min: 8 },
      { title: "Hören: Reklamationsgespräch", type: "audio", min: 12 },
      { title: "Sprechen: Rollenspiel Beschwerde", type: "speaking", min: 20 },
    ],
  },
  // FERTIGKEITEN A2
  {
    id: "a2-f1", icon: "📰", category: "fertigkeiten",
    title: "Lesen A2",
    description: "Gazete haberleri, reklamlar ve kişisel yazışmaları okuma stratejileri.",
    topics: ["Global- & Detailverstehen", "Zeitungsartikel & Anzeigen", "Persönliche E-Mails & Briefe", "Prüfungsformat Goethe A2"],
    lessons: [
      { title: "Lesestrategien: skimming & scanning", type: "theory", min: 10 },
      { title: "Übung: Zeitungsartikel verstehen", type: "practice", min: 20 },
      { title: "Übung: Anzeigen & Aushänge", type: "practice", min: 15 },
      { title: "Prüfungsvorbereitung Lesen A2", type: "quiz", min: 30 },
    ],
  },
  {
    id: "a2-f2", icon: "✍️", category: "fertigkeiten",
    title: "Schreiben & Sprechen A2",
    description: "Formell ve gayriresmi e-postalar yazmak, görüş bildirmek.",
    topics: ["Formelle E-Mail", "Informelle Nachricht", "Kurze Erörterung", "Prüfungsformat Goethe A2"],
    lessons: [
      { title: "Formelle vs. informelle E-Mail", type: "theory", min: 10 },
      { title: "Schreiben: E-Mail an Behörden", type: "writing", min: 25 },
      { title: "Schreiben: Brief an Freunde", type: "writing", min: 20 },
      { title: "Sprechen: Meinung äußern A2", type: "speaking", min: 20 },
      { title: "Prüfungsvorbereitung A2", type: "quiz", min: 30 },
    ],
  },
]

// ── Curriculum — B1 ───────────────────────────────────────────────────────────

const B1: Unit[] = [
  {
    id: "b1-g1", icon: "💭", category: "grammatik",
    title: "Konjunktiv II",
    description: "Dilek kipi: hayaller, varsayımlar ve kibarca ifadeler.",
    topics: ["würde + Infinitiv", "wäre / hätte / könnte / müsste", "Wunschsätze", "Irrealis: Wenn ich Zeit hätte…"],
    lessons: [
      { title: "Konjunktiv II: würde-Umschreibung", type: "theory", min: 12 },
      { title: "Starke Formen: wäre, hätte, könnte…", type: "theory", min: 12 },
      { title: "Wünsche & Träume formulieren", type: "theory", min: 10 },
      { title: "Irreale Bedingungssätze", type: "theory", min: 12 },
      { title: "Übung: Konjunktiv II", type: "practice", min: 20 },
      { title: "Test: Konjunktiv II", type: "quiz", min: 12 },
    ],
  },
  {
    id: "b1-g2", icon: "🔃", category: "grammatik",
    title: "Passiv",
    description: "Edilgen çatı: eylemi gerçekleştireni değil, eylemi ön plana çıkarmak.",
    topics: ["Passiv Präsens: wird + Partizip II", "Passiv Präteritum: wurde + Partizip II", "Passiv mit Modalverben", "Vorgangs- vs. Zustandspassiv"],
    lessons: [
      { title: "Passiv Präsens bilden", type: "theory", min: 12 },
      { title: "Passiv Präteritum & Perfekt", type: "theory", min: 10 },
      { title: "Passiv mit Modalverben", type: "theory", min: 10 },
      { title: "Zustandspassiv: Das Fenster ist geöffnet", type: "theory", min: 10 },
      { title: "Übung: Aktiv → Passiv umformen", type: "practice", min: 20 },
      { title: "Test: Passiv", type: "quiz", min: 12 },
    ],
  },
  {
    id: "b1-g3", icon: "🔗", category: "grammatik",
    title: "Relativsätze",
    description: "İlgi zamirleriyle yan cümle kurma: hangi, ki, olan…",
    topics: ["Relativpronomen: der, die, das, den, dem", "Relativsatz im Nom. / Akk. / Dat.", "Relativsatz mit Präposition", "wo / was als Relativpronomen"],
    lessons: [
      { title: "Relativpronomen im Nominativ", type: "theory", min: 10 },
      { title: "Relativpronomen im Akkusativ & Dativ", type: "theory", min: 12 },
      { title: "Relativsätze mit Präpositionen", type: "theory", min: 12 },
      { title: "wo & was als Relativpronomen", type: "theory", min: 8 },
      { title: "Übung: Relativsätze bilden", type: "practice", min: 20 },
      { title: "Test: Relativsätze", type: "quiz", min: 12 },
    ],
  },
  {
    id: "b1-g4", icon: "🔑", category: "grammatik",
    title: "Genitiv & Genitivpräpositionen",
    description: "İyelik durumu ve genitif edatları: wegen, trotz, während, statt.",
    topics: ["Genitiv: des Mannes / der Frau", "Genitivpräpositionen", "Possessiv im Genitiv", "Genitiv in formellen Texten"],
    lessons: [
      { title: "Genitiv: Artikel & Nomen", type: "theory", min: 10 },
      { title: "Genitivpräpositionen", type: "theory", min: 10 },
      { title: "Genitiv in der Schriftsprache", type: "theory", min: 10 },
      { title: "Übung: Genitiv verwenden", type: "practice", min: 18 },
      { title: "Test: Genitiv", type: "quiz", min: 10 },
    ],
  },
  {
    id: "b1-g5", icon: "∞", category: "grammatik",
    title: "Infinitivkonstruktionen",
    description: "um…zu, ohne…zu, anstatt…zu ve diğer mastar yapıları.",
    topics: ["um…zu: Absicht & Zweck", "ohne…zu: ohne Grund", "anstatt…zu: Alternative", "Verben mit zu + Infinitiv"],
    lessons: [
      { title: "um…zu: Absicht ausdrücken", type: "theory", min: 10 },
      { title: "ohne…zu & anstatt…zu", type: "theory", min: 10 },
      { title: "Verben & Adjektive mit zu + Infinitiv", type: "theory", min: 10 },
      { title: "Übung: Infinitivkonstruktionen", type: "practice", min: 18 },
      { title: "Test: Infinitivkonstruktionen", type: "quiz", min: 10 },
    ],
  },
  {
    id: "b1-g6", icon: "🔀", category: "grammatik",
    title: "Zweiteilige Konjunktionen",
    description: "İkili bağlaçlar: hem…hem, ya…ya, ne…ne, sadece…değil…aynı zamanda.",
    topics: ["entweder…oder", "sowohl…als auch", "weder…noch", "nicht nur…sondern auch", "zwar…aber"],
    lessons: [
      { title: "entweder…oder & weder…noch", type: "theory", min: 10 },
      { title: "sowohl…als auch & nicht nur…sondern auch", type: "theory", min: 10 },
      { title: "zwar…aber: Einschränkung", type: "theory", min: 8 },
      { title: "Übung: Zweiteilige Konjunktionen", type: "practice", min: 15 },
      { title: "Test: Zweiteilige Konjunktionen", type: "quiz", min: 10 },
    ],
  },
  // WORTSCHATZ B1
  {
    id: "b1-w1", icon: "📈", category: "wortschatz",
    title: "Arbeit & Karriere",
    description: "İş hayatı, kariyer planlama ve mesleki gelişim.",
    topics: ["Bewerbungsprozess", "Vorstellungsgespräch", "Karriereentwicklung", "Arbeitswelt im Wandel"],
    lessons: [
      { title: "Jobsuche & Bewerbungsunterlagen", type: "theory", min: 12 },
      { title: "Hören: Vorstellungsgespräch B1", type: "audio", min: 15 },
      { title: "Schreiben: Lebenslauf & Motivationsschreiben", type: "writing", min: 35 },
      { title: "Sprechen: Über Karriereziele sprechen", type: "speaking", min: 20 },
    ],
  },
  {
    id: "b1-w2", icon: "🌍", category: "wortschatz",
    title: "Umwelt & Nachhaltigkeit",
    description: "Çevre sorunları, sürdürülebilirlik ve iklim değişikliği.",
    topics: ["Klimawandel & Ursachen", "Nachhaltigkeit im Alltag", "Erneuerbare Energien", "Umweltschutz & Politik"],
    lessons: [
      { title: "Umweltvokabular: Klimawandel", type: "theory", min: 12 },
      { title: "Nachhaltig leben: Tipps & Maßnahmen", type: "theory", min: 10 },
      { title: "Hören: Umweltdiskussion", type: "audio", min: 15 },
      { title: "Schreiben: Artikel zum Thema Umwelt", type: "writing", min: 25 },
    ],
  },
  {
    id: "b1-w3", icon: "🏛️", category: "wortschatz",
    title: "Gesellschaft & Politik",
    description: "Toplumsal konular, siyaset ve aktif vatandaşlık.",
    topics: ["Demokratie & Wahlen", "Gesellschaftliche Themen", "Nachrichten & Medien", "Integration & Vielfalt"],
    lessons: [
      { title: "Politisches Vokabular B1", type: "theory", min: 12 },
      { title: "Gesellschaftliche Debatten verstehen", type: "theory", min: 10 },
      { title: "Hören: Nachrichtenbeitrag", type: "audio", min: 15 },
      { title: "Sprechen: Gesellschaftsthemen diskutieren", type: "speaking", min: 20 },
    ],
  },
  // KOMMUNIKATION B1
  {
    id: "b1-k1", icon: "⚖️", category: "kommunikation",
    title: "Argumentieren & Diskutieren",
    description: "B1 düzeyinde tartışma teknikleri, tez oluşturma ve ikna etme.",
    topics: ["These formulieren", "Argumente belegen & stützen", "Gegenargumente entkräften", "Fazit ziehen"],
    lessons: [
      { title: "Diskussionsstrategien auf B1", type: "theory", min: 12 },
      { title: "Hören: Podiumsdiskussion", type: "audio", min: 18 },
      { title: "Sprechen: Pro & Contra Diskussion", type: "speaking", min: 25 },
      { title: "Schreiben: Erörterung B1", type: "writing", min: 30 },
    ],
  },
  {
    id: "b1-k2", icon: "📋", category: "kommunikation",
    title: "Formelle Kommunikation",
    description: "Resmi kurum ve iş yazışmaları, başvurular ve resmi toplantılar.",
    topics: ["Formelle Briefe & E-Mails", "Behördengespräche", "Beschwerde & Einspruch", "Protokoll & Notizen"],
    lessons: [
      { title: "Formelle Schriftkommunikation B1", type: "theory", min: 12 },
      { title: "Hören: Gespräch beim Amt", type: "audio", min: 15 },
      { title: "Schreiben: Offizieller Brief", type: "writing", min: 30 },
      { title: "Sprechen: Formelles Gespräch", type: "speaking", min: 20 },
    ],
  },
  // FERTIGKEITEN B1
  {
    id: "b1-f1", icon: "🎓", category: "fertigkeiten",
    title: "Prüfungsvorbereitung B1",
    description: "Goethe-Institut B1 ve telc Deutsch B1 sınav formatları için kapsamlı hazırlık.",
    topics: ["Lesen B1: Strategien", "Hören B1: Schlüsselinfos", "Schreiben B1: Erörterung", "Sprechen B1: Monolog & Dialog"],
    lessons: [
      { title: "B1-Prüfungsformat im Überblick", type: "theory", min: 15 },
      { title: "Übung: Lesen B1 (Modelltexte)", type: "practice", min: 30 },
      { title: "Übung: Hören B1 (Modelltexte)", type: "audio", min: 30 },
      { title: "Übung: Schreiben B1", type: "writing", min: 35 },
      { title: "Übung: Sprechen B1", type: "speaking", min: 25 },
      { title: "Abschlusstest B1", type: "quiz", min: 40 },
    ],
    soon: true,
  },
]

// ── Curriculum — B2 (locked) ──────────────────────────────────────────────────

const B2: Unit[] = [
  { id: "b2-g1", icon: "💬", category: "grammatik", title: "Konjunktiv I", description: "İndirekt anlatım için kullanılan dilek kipi.", topics: ["Indirekte Rede", "Er sagte, er sei…"], lessons: [], soon: true },
  { id: "b2-g2", icon: "🔧", category: "grammatik", title: "Partizipialkonstruktionen", description: "Partisipli sıfat tamlamaları.", topics: ["Partizip I & II als Adjektiv"], lessons: [], soon: true },
  { id: "b2-w1", icon: "🔬", category: "wortschatz", title: "Wissenschaft & Forschung", description: "Akademik ve bilimsel dil.", topics: ["Wissenschaftliche Texte", "Forschung & Experimente"], lessons: [], soon: true },
  { id: "b2-k1", icon: "🎤", category: "kommunikation", title: "Akademisches Sprechen", description: "Akademik sunumlar ve forumlar.", topics: ["Präsentation halten", "Wissenschaftlich diskutieren"], lessons: [], soon: true },
]

const CURRICULUM: Record<LevelCode, Unit[]> = { A1, A2, B1, B2, C1: [], C2: [] }
const LEVELS: LevelCode[] = ["A1", "A2", "B1", "B2", "C1", "C2"]
const CATEGORIES: { key: Category | "tumü"; label: string }[] = [
  { key: "tumü",        label: "Tümü"          },
  { key: "grammatik",   label: "Grammatik"     },
  { key: "wortschatz",  label: "Wortschatz"    },
  { key: "kommunikation", label: "Kommunikation" },
  { key: "fertigkeiten",  label: "Fertigkeiten"  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function totalMin(units: Unit[]) {
  return units.reduce((s, u) => s + u.lessons.reduce((ls, l) => ls + l.min, 0), 0)
}

// ── UnitCard ──────────────────────────────────────────────────────────────────

function UnitCard({ unit, locked }: { unit: Unit; locked: boolean }) {
  const [open, setOpen] = useState(false)
  const cat = CAT_META[unit.category]
  const mins = unit.lessons.reduce((s, l) => s + l.min, 0)
  const unavailable = locked || unit.soon

  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl transition-shadow hover:shadow-md"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        opacity: unavailable ? 0.65 : 1,
        boxShadow: "0 2px 12px rgba(26,26,46,0.05)",
      }}
    >
      {/* top accent bar */}
      <div style={{ height: 4, background: cat.color }} />

      <div className="flex flex-1 flex-col p-5">
        {/* header */}
        <div className="mb-3 flex items-start gap-3">
          <span className="flex-shrink-0 text-2xl leading-none mt-0.5">{unit.icon}</span>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-1.5">
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                style={{ background: cat.bg, color: cat.text }}
              >
                {cat.icon} {cat.label}
              </span>
              {unit.soon && (
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide" style={{ background: "#FEF3C7", color: "#92400E" }}>
                  Yakında
                </span>
              )}
              {locked && (
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide" style={{ background: "#F1F5F9", color: "#64748B" }}>
                  🔒 Kilitli
                </span>
              )}
            </div>
            <h3 className="font-bold leading-snug" style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)", fontSize: "1rem" }}>
              {unit.title}
            </h3>
          </div>
        </div>

        <p className="mb-3 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {unit.description}
        </p>

        {/* topic tags */}
        <div className="mb-4 flex flex-wrap gap-1">
          {unit.topics.map((t) => (
            <span key={t} className="rounded-full px-2 py-0.5 text-[10px]" style={{ background: "var(--bg-soft)", color: "var(--text-secondary)" }}>
              {t}
            </span>
          ))}
        </div>

        {/* lesson toggle */}
        {unit.lessons.length > 0 && (
          <div className="mt-auto">
            <button
              onClick={() => setOpen((o) => !o)}
              className="mb-2 flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
              style={{ color: cat.color }}
            >
              <span style={{ display: "inline-block", transition: "transform .2s", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
              {unit.lessons.length} ders · ~{mins} dk
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="mb-3 space-y-1.5 rounded-xl p-3" style={{ background: "var(--bg-muted)" }}>
                    {unit.lessons.map((l, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="w-4 text-center">{LESSON_ICON[l.type]}</span>
                        <span className="flex-1 leading-snug" style={{ color: "var(--text-primary)" }}>{l.title}</span>
                        <span className="flex-shrink-0" style={{ color: "var(--text-secondary)" }}>{l.min} dk</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!unavailable && (
              <a
                href={`/dersler/${unit.id}/0`}
                className="block w-full rounded-full py-2 text-center text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.01]"
                style={{ background: cat.color, textDecoration: 'none' }}
              >
                Derse Başla →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Category section with header ──────────────────────────────────────────────

function CategorySection({ category, units, locked }: { category: Category; units: Unit[]; locked: boolean }) {
  const cat = CAT_META[category]
  if (units.length === 0) return null
  return (
    <div className="mb-12">
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1" style={{ background: "var(--border-card)" }} />
        <span
          className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wide"
          style={{ background: cat.bg, color: cat.text }}
        >
          <span>{cat.icon}</span>
          {cat.label}
          <span className="ml-1 rounded-full px-1.5 py-0.5 text-[10px]" style={{ background: cat.color, color: "white" }}>
            {units.length}
          </span>
        </span>
        <div className="h-px flex-1" style={{ background: "var(--border-card)" }} />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {units.map((u) => <UnitCard key={u.id} unit={u} locked={locked} />)}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function DerslerSection() {
  const [level, setLevel] = useState<LevelCode>("A1")
  const [cat, setCat] = useState<Category | "tumü">("tumü")

  const meta = LEVEL_META[level]
  const units = CURRICULUM[level] ?? []
  const locked = meta.locked

  const filteredUnits = cat === "tumü" ? units : units.filter((u) => u.category === cat)

  const stats = useMemo(() => ({
    units: units.length,
    lessons: units.reduce((s, u) => s + u.lessons.length, 0),
    hours: Math.round(totalMin(units) / 60),
  }), [units])

  const catCounts = useMemo(() => {
    const c: Record<string, number> = { tumü: units.length }
    for (const u of units) c[u.category] = (c[u.category] ?? 0) + 1
    return c
  }, [units])

  // When cat="tumü", show grouped by category
  const categoryOrder: Category[] = ["grammatik", "wortschatz", "kommunikation", "fertigkeiten"]

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">

      {/* ── Level tabs ─────────────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-wrap gap-2">
        {LEVELS.map((l) => {
          const lm = LEVEL_META[l]
          const active = level === l
          return (
            <button
              key={l}
              onClick={() => { setLevel(l); setCat("tumü") }}
              className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all hover:scale-[1.02]"
              style={active
                ? { background: lm.color, color: "white", boxShadow: `0 4px 18px ${lm.color}55` }
                : { background: "var(--bg-soft)", color: lm.locked ? "#9CA3AF" : "var(--text-primary)" }
              }
            >
              {lm.locked && <span style={{ fontSize: "0.8em" }}>🔒</span>}
              <span>{l}</span>
              <span className="text-xs font-medium" style={{ opacity: active ? 0.85 : 0.65 }}>{lm.label}</span>
            </button>
          )
        })}
      </div>

      {/* ── Level banner ───────────────────────────────────────────────────── */}
      <div
        className="mb-8 flex flex-wrap items-center justify-between gap-6 rounded-2xl p-6"
        style={{ background: meta.bg, border: `1px solid ${meta.color}25` }}
      >
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
              style={{ background: meta.color, color: "white" }}
            >
              {level}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: meta.textColor }}>
              CEFR · {meta.label}
            </span>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{meta.desc}</p>
        </div>
        {!locked ? (
          <div className="flex gap-8">
            {[["birim", stats.units], ["ders", stats.lessons], ["saat", `${stats.hours}+`]].map(([label, val]) => (
              <div key={label as string} className="text-center">
                <div className="text-2xl font-black" style={{ fontFamily: "var(--font-fraunces)", color: meta.color }}>{val}</div>
                <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{label}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-full px-5 py-2.5 text-sm font-bold" style={{ background: "var(--bg-soft)", color: "#9CA3AF" }}>
            🔒 Bu seviye henüz hazırlanıyor
          </div>
        )}
      </div>

      {!locked && (
        <>
          {/* ── Category filter ──────────────────────────────────────────────── */}
          <div className="mb-8 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = cat === c.key
              const count = catCounts[c.key] ?? 0
              if (count === 0 && c.key !== "tumü") return null
              return (
                <button
                  key={c.key}
                  onClick={() => setCat(c.key)}
                  className="rounded-full px-4 py-2 text-sm font-semibold transition-all"
                  style={active
                    ? { background: "var(--btn-cta-bg)", color: "var(--btn-cta-text)" }
                    : { background: "var(--bg-soft)", color: "var(--text-secondary)" }
                  }
                >
                  {c.key !== "tumü" && CAT_META[c.key as Category].icon + " "}
                  {c.label}
                  <span className="ml-1.5 text-xs opacity-60">({count})</span>
                </button>
              )
            })}
          </div>

          {/* ── Units ────────────────────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${level}-${cat}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {cat === "tumü" ? (
                categoryOrder.map((c) => (
                  <CategorySection
                    key={c}
                    category={c}
                    units={units.filter((u) => u.category === c)}
                    locked={false}
                  />
                ))
              ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {filteredUnits.map((u) => <UnitCard key={u.id} unit={u} locked={false} />)}
                </div>
              )}

              {filteredUnits.length === 0 && cat !== "tumü" && (
                <div className="py-16 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
                  Bu kategoride henüz içerik yok.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      )}

      {locked && (
        <div className="py-24 text-center">
          <div className="mb-4 text-6xl">🔒</div>
          <h3 className="mb-2 text-xl font-bold" style={{ fontFamily: "var(--font-fraunces)", color: "var(--text-primary)" }}>
            Bu seviye henüz hazır değil
          </h3>
          <p style={{ color: "var(--text-secondary)" }}>A1, A2 ve B1 ile başlayın. {level} yakında ekleniyor.</p>
        </div>
      )}
    </section>
  )
}

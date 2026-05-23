import type { LessonContent } from '@/types/lesson'

const lessons: LessonContent[] = [
  // ── Ders 0: Bestimmte Artikel ───────────────────────────────────────────────
  {
    unitId: 'a1-g1',
    lessonIndex: 0,
    title: 'Bestimmte Artikel: der, die, das',
    blocks: [
      { type: 'heading', body: 'Belirli Artikel Nedir?' },
      {
        type: 'text',
        body: 'Almancada her ismin bir cinsi vardır: eril (maskulin), dişil (feminin) veya nötr (neutral). Belirli artikel bu cinsi gösterir ve Türkçedeki "the" ya da "o/bu" ile karşılaştırılabilir.',
      },
      {
        type: 'table',
        headers: ['Cins', 'Artikel', 'Örnek', 'Türkçe'],
        rows: [
          ['Maskulin (eril)', 'der', 'der Mann', 'adam'],
          ['Feminin (dişil)', 'die', 'die Frau', 'kadın'],
          ['Neutral (nötr)', 'das', 'das Kind', 'çocuk'],
          ['Plural (çoğul)', 'die', 'die Männer', 'adamlar'],
        ],
      },
      { type: 'rule', body: '📌 Kural: Çoğulda tüm cinsler için artikel "die" olur.' },
      { type: 'heading', body: 'Örnekler' },
      { type: 'example', german: 'Der Hund schläft.', turkish: 'Köpek uyuyor.' },
      { type: 'example', german: 'Die Katze trinkt Milch.', turkish: 'Kedi süt içiyor.' },
      { type: 'example', german: 'Das Buch ist neu.', turkish: 'Kitap yeni.' },
      {
        type: 'tip',
        body: '💡 İpucu: Almancada bir kelimeyi öğrenirken daima artikeli ile birlikte ezberle. "Buch" değil, "das Buch" olarak öğren.',
      },
      { type: 'heading', body: 'Sık Kullanılan Kelimeler' },
      {
        type: 'table',
        headers: ['der (eril)', 'die (dişil)', 'das (nötr)'],
        rows: [
          ['der Mann (adam)', 'die Frau (kadın)', 'das Kind (çocuk)'],
          ['der Tisch (masa)', 'die Tür (kapı)', 'das Fenster (pencere)'],
          ['der Hund (köpek)', 'die Katze (kedi)', 'das Buch (kitap)'],
          ['der Tag (gün)', 'die Nacht (gece)', 'das Haus (ev)'],
        ],
      },
    ],
    exercises: [
      {
        question: '"Frau" kelimesinin doğru artikeli hangisi?',
        options: ['der', 'die', 'das'],
        answer: 1,
        explanation: '"Frau" (kadın) dişil bir isimdir → die Frau',
      },
      {
        question: '"Kind" (çocuk) kelimesinin artikeli hangisi?',
        options: ['der', 'die', 'das'],
        answer: 2,
        explanation: '"Kind" nötr bir isimdir → das Kind',
      },
      {
        question: 'Çoğulda hangi artikel kullanılır?',
        options: ['der', 'die', 'das'],
        answer: 1,
        explanation: 'Tüm çoğul isimler "die" artikelini alır.',
      },
      {
        question: '"Tisch" (masa) eril bir isimdir. Doğru form hangisi?',
        options: ['die Tisch', 'das Tisch', 'der Tisch'],
        answer: 2,
        explanation: '"Tisch" eril (maskulin) olduğu için → der Tisch',
      },
    ],
  },

  // ── Ders 1: Unbestimmte Artikel ─────────────────────────────────────────────
  {
    unitId: 'a1-g1',
    lessonIndex: 1,
    title: 'Unbestimmte Artikel: ein, eine, ein',
    blocks: [
      { type: 'heading', body: 'Belgisiz Artikel Nedir?' },
      {
        type: 'text',
        body: 'Belgisiz artikel (Türkçede "bir") ilk kez bahsedilen ya da belirsiz bir şeyi tanımlar. Cinse göre üç farklı biçimi vardır.',
      },
      {
        type: 'table',
        headers: ['Cins', 'Bestimmte', 'Unbestimmte', 'Örnek'],
        rows: [
          ['Maskulin', 'der', 'ein', 'ein Mann (bir adam)'],
          ['Feminin', 'die', 'eine', 'eine Frau (bir kadın)'],
          ['Neutral', 'das', 'ein', 'ein Kind (bir çocuk)'],
          ['Plural', 'die', '—', '(belgisiz çoğul yok)'],
        ],
      },
      { type: 'rule', body: '📌 Kural: Eril ve nötr için "ein", dişil için "eine" kullanılır.' },
      { type: 'heading', body: 'Karşılaştırma' },
      { type: 'example', german: 'Das ist der Hund. Das ist ein Hund.', turkish: 'Bu o köpek. / Bu bir köpek.' },
      { type: 'example', german: 'Ich habe eine Katze.', turkish: 'Benim bir kedim var.' },
      { type: 'example', german: 'Er kauft ein Buch.', turkish: 'O bir kitap satın alıyor.' },
      {
        type: 'tip',
        body: '💡 Çoğulda belgisiz artikel kullanılmaz. "Ich habe Bücher." (Kitaplarım var.) → artikel yok.',
      },
    ],
    exercises: [
      {
        question: '"Ich habe ___ Bruder." (Bir erkek kardeşim var.) Boşluğa ne gelir?',
        options: ['ein', 'eine', 'der'],
        answer: 0,
        explanation: '"Bruder" (erkek kardeş) erildir → ein Bruder',
      },
      {
        question: '"Das ist ___ Lampe." (Bu bir lambadır.) Doğru form?',
        options: ['ein', 'eine', 'das'],
        answer: 1,
        explanation: '"Lampe" dişildir → eine Lampe',
      },
      {
        question: '"Er trinkt ___ Kaffee." Boşluğa ne gelir?',
        options: ['eine', 'ein', 'der'],
        answer: 1,
        explanation: '"Kaffee" erildir (der Kaffee) → ein Kaffee',
      },
    ],
  },

  // ── Ders 2: Pluralformen ─────────────────────────────────────────────────────
  {
    unitId: 'a1-g1',
    lessonIndex: 2,
    title: 'Pluralformen der Nomen',
    blocks: [
      { type: 'heading', body: 'Almancada Çoğul Yapıları' },
      {
        type: 'text',
        body: 'Almancada çoğul kuralı tutarsızdır — her kelime için ayrı öğrenilmelidir. Bununla birlikte, 5 temel çoğul kalıbı vardır.',
      },
      {
        type: 'table',
        headers: ['Kalıp', 'Tekil', 'Çoğul', 'Türkçe'],
        rows: [
          ['-e', 'der Tag', 'die Tage', 'günler'],
          ['-er / Umlaut+er', 'das Kind', 'die Kinder', 'çocuklar'],
          ['-en / -n', 'die Frau', 'die Frauen', 'kadınlar'],
          ['-s', 'das Auto', 'die Autos', 'arabalar'],
          ['Umlaut (ä/ö/ü)', 'der Vater', 'die Väter', 'babalar'],
        ],
      },
      { type: 'rule', body: '📌 Kural: Çoğulda artikel her zaman "die" olur, cinsinden bağımsız.' },
      { type: 'heading', body: 'Örnekler' },
      { type: 'example', german: 'der Hund → die Hunde', turkish: 'köpek → köpekler' },
      { type: 'example', german: 'das Buch → die Bücher', turkish: 'kitap → kitaplar' },
      { type: 'example', german: 'die Lampe → die Lampen', turkish: 'lamba → lambalar' },
      { type: 'example', german: 'das Auto → die Autos', turkish: 'araba → arabalar' },
      {
        type: 'tip',
        body: '💡 İpucu: Sözlükte her kelimeyi çoğuluyla birlikte öğren: "der Hund, -e" → die Hunde.',
      },
    ],
    exercises: [
      {
        question: '"das Kind" kelimesinin çoğulu nedir?',
        options: ['die Kinds', 'die Kinder', 'die Kinde'],
        answer: 1,
        explanation: '"Kind" → "Kinder" (-er kalıbı)',
      },
      {
        question: 'Çoğulda hangi artikel kullanılır?',
        options: ['der', 'die', 'das'],
        answer: 1,
        explanation: 'Tüm çoğullar "die" artikelini alır.',
      },
      {
        question: '"die Frau" kelimesinin çoğulu nedir?',
        options: ['die Fraus', 'die Fraue', 'die Frauen'],
        answer: 2,
        explanation: '"Frau" → "Frauen" (-en kalıbı)',
      },
    ],
  },

  // ── Ders 3: Übung — Artikel zuordnen ────────────────────────────────────────
  {
    unitId: 'a1-g1',
    lessonIndex: 3,
    title: 'Übung: Artikel zuordnen',
    blocks: [
      { type: 'heading', body: 'Artikel Egzersizleri' },
      { type: 'text', body: 'Bu derste öğrendiklerini pekiştiriyorsun. Aşağıdaki kelimeleri doğru artikelleriyle eşleştir.' },
      {
        type: 'table',
        headers: ['Kelime', 'Artikel', 'Türkçe'],
        rows: [
          ['Hund', 'der', 'köpek'],
          ['Katze', 'die', 'kedi'],
          ['Haus', 'das', 'ev'],
          ['Baum', 'der', 'ağaç'],
          ['Schule', 'die', 'okul'],
          ['Bett', 'das', 'yatak'],
          ['Zug', 'der', 'tren'],
          ['Straße', 'die', 'sokak/yol'],
          ['Wasser', 'das', 'su'],
          ['Vater', 'der', 'baba'],
        ],
      },
      {
        type: 'tip',
        body: '💡 Kelime sonu ipuçları: -ung, -heit, -keit, -schaft → genellikle die | -chen, -lein, -ment → genellikle das | -er (kişi) → genellikle der',
      },
    ],
    exercises: [
      { question: '"Schule" (okul) kelimesinin artikeli?', options: ['der', 'die', 'das'], answer: 1, explanation: 'die Schule — dişil' },
      { question: '"Baum" (ağaç) kelimesinin artikeli?', options: ['der', 'die', 'das'], answer: 0, explanation: 'der Baum — eril' },
      { question: '"Wasser" (su) kelimesinin artikeli?', options: ['der', 'die', 'das'], answer: 2, explanation: 'das Wasser — nötr' },
      { question: '"Freiheit" (özgürlük) sonu -heit. Hangi artikel?', options: ['der', 'die', 'das'], answer: 1, explanation: '-heit ekiyle biten kelimeler genellikle dişildir → die Freiheit' },
      { question: '"Mädchen" (kız çocuğu) sonu -chen. Hangi artikel?', options: ['der', 'die', 'das'], answer: 2, explanation: '-chen ekiyle biten kelimeler nötrdür → das Mädchen' },
    ],
  },

  // ── Ders 4: Test ────────────────────────────────────────────────────────────
  {
    unitId: 'a1-g1',
    lessonIndex: 4,
    title: 'Test: Artikel & Nomen',
    blocks: [
      { type: 'heading', body: 'Tekrar Testi' },
      { type: 'text', body: 'Bu birimde öğrendiklerini test etme zamanı. Aşağıdaki soruları yanıtla.' },
    ],
    exercises: [
      { question: 'Hangi cümle doğru?', options: ['Die Mann trinkt Kaffee.', 'Der Mann trinkt Kaffee.', 'Das Mann trinkt Kaffee.'], answer: 1, explanation: '"Mann" erildir → der Mann' },
      { question: '"ein" belgisiz artikeli hangi cinslerle kullanılır?', options: ['Sadece eril', 'Sadece nötr', 'Eril ve nötr'], answer: 2, explanation: 'ein + maskulin ve ein + neutral; eine + feminin' },
      { question: '"die Bücher" nedir?', options: ['das Buch\'un çoğulu', 'der Buch\'un tekili', 'die Buch\'un tekili'], answer: 0, explanation: 'das Buch → die Bücher (Umlaut + -er kalıbı)' },
      { question: 'Hangi kelime doğru bir Plural (çoğul) form?', options: ['die Autos', 'der Autos', 'das Autos'], answer: 0, explanation: 'Çoğulda artikel her zaman "die" olur → die Autos' },
      { question: '"Ich sehe ___ Hund." Boşluğa ne gelir? (belgisiz, tekil)', options: ['der', 'einen', 'eine'], answer: 1, explanation: 'Akkusativ\'de eril belgisiz artikel "einen" olur (bunu A1-G4\'te öğreneceksin, ama bir ipucu: accusative!)' },
    ],
  },
]

export default lessons

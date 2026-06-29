# SECURITY.md — Güvenlik Baseline (ZORUNLU, istisnasız)

> Bu repoda üretilen/değiştirilen **her kod** bu kurallara uymak zorundadır.
> Yığın bağlamı: **Next.js (App Router) + Supabase (Postgres + RLS + RPC) + Stripe + LLM ajanları + medya yükleme**.
> Bu dosya genel "vibe coding" listesinin **bizim yığınımıza uyarlanmış** halidir — jenerik öğütler (örn. "ORM kullan") yerine Supabase'e özgü gerçek riskler yazılıdır.
> Otomatik enforcement: **Semgrep Guardian** (SAST + secrets + supply-chain) zaten kuruludur; bu dosya insan/AI tarafının uyması gereken sözleşmedir.

---

## 1. Secret'lar & Ortam Değişkenleri  🔴 EN KRİTİK
- TÜM key/token/DB-URL/servis-kimliği **sadece `.env`**'de. `.gitignore` `.env*`'i hariç tutmalı (zaten tutuyor — bozma).
- Frontend'de (React component, `"use client"`) **asla ham secret yok**. Sadece `NEXT_PUBLIC_*` istemciye gider ve bunlar **asla gizli key olamaz** (sadece publishable/public değerler).
- Sunucu secret'larına yalnızca `process.env.X` ile, **server component / route handler / cron / worker** içinde eriş. Secret'ı API yanıtında istemciye **döndürme**.
- Supabase: `SUPABASE_SERVICE_ROLE_KEY` **sadece sunucuda**. İstemcide yalnızca `anon` key + RLS. Service-role bir client component'e sızarsa RLS tamamen baypas olur = full DB erişimi.
- Her repoda güncel `.env.example` (boş değerlerle) tutulur.
- **Ders (gerçek olay):** Bir Gemini anahtarı bir kez public oldu. Sızan her key **derhal rotate** edilir; sızıntı geçmişi commit'lerde de temizlenir. Anahtar paylaşan servisler (A&A ↔ Bark Gemini) tek noktadan rotate edilebilmeli.

```ts
// ✅  const key = process.env.GEMINI_API_KEY        // server-only
// ❌  const key = "AIza..."                         // asla
// ❌  NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=...      // service-role asla NEXT_PUBLIC değil
```

## 2. Rate Limiting
- Dışa açık her route'ta limit: **auth 5/15dk/IP**, genel API **60/dk/IP**, **LLM proxy 10/dk/kullanıcı**, dosya yükleme **5/dk/IP**.
- ⚠️ Vercel serverless'te `express-rate-limit` **çalışmaz** (durum tutmaz). Kullan: **Upstash Redis / Vercel KV** sayaçları veya Supabase tablosu tabanlı sayaç + `@upstash/ratelimit`.
- Limit aşımında `Retry-After` ile **429** dön; frontend net mesaj göstersin (sessiz yutma yok).
- Özellikle: `send-form`, OAuth callback'leri, cron-tetiklenen üretim, Stripe webhook, AI üretim endpoint'leri.

## 3. Input Validation & Sanitization
- TÜM girdi **sunucu tarafında** doğrulanır (istemci doğrulaması yalnız UX). **Zod** şeması ile `safeParse`; hata → **400**.
- Tip, uzunluk, izinli karakter, enum, zorunlu alan kontrolü. String'leri saklamadan/göstermeden önce temizle.
- Kullanıcı girdisini **asla** ham SQL/RPC argümanına gömme → parametrele.

```ts
const schema = z.object({ email: z.string().email().max(254), message: z.string().min(1).max(1000).trim() });
const r = schema.safeParse(await req.json());
if (!r.success) return Response.json({ error: 'invalid' }, { status: 400 });
```

## 4. Auth & Yetkilendirme (+ KİRACI İZOLASYONU) 🔴 white-label için kritik
- Auth = **Supabase Auth** (sıfırdan auth yazma). Parola = Supabase hash'ler (düz metin yok). JWT secret env'den.
- Her hassas işlemde **AuthN + AuthZ**: kullanıcı kim + bu kaynağa erişim hakkı var mı (sahiplik/rol kontrolü).
- **Multi-tenant / white-label (Ceylan ← the-bark klonları):** Her kiracının verisi RLS ile **mutlak izole**. Bir müşteri başka müşterinin verisini *hiçbir koşulda* göremez. Klonlamada tenant_id/RLS politikalarının kopyalandığını doğrula.
- Admin/dashboard route'larında açık **rol kontrolü**. `getUser()` (server) kullan, istemci `getSession()`'a güvenme.

```ts
const { data: { user } } = await supabase.auth.getUser();
if (!user) return new Response('Unauthorized', { status: 401 });
const { data: row } = await supabase.from('orders').select('owner_id').eq('id', id).single();
if (!row || row.owner_id !== user.id) return new Response('Forbidden', { status: 403 });
```

## 5. Supabase / SQL Güvenliği  (jenerik "ORM" değil — bizim gerçeğimiz)
- **Her tabloda RLS AÇIK.** Yeni tablo migration'ı RLS'siz merge edilmez. Politikalar açıkça yazılır (varsayılan-deny).
- **RPC / DB fonksiyonları:** `SECURITY DEFINER` fonksiyonlarda `SET search_path = ''` (veya tam-nitelikli isimler) — yoksa search_path saldırısı. DEFINER yalnızca gerçekten gerektiğinde; tercih `SECURITY INVOKER`.
- Fonksiyon içinde **dinamik SQL** (`EXECUTE format(...)`) varsa argümanlar `%I`/`%L` ile; string birleştirme yasak.
- İstemci sorguları: Supabase client metotları (`.eq/.in/...`) — parametreli; ham SQL string'i kurma.
- Ham DB hatasını istemciye dönme (şema sızdırır). En az ayrıcalık: `anon`/`authenticated` rolleri yalnız gerekeni görsün.

## 6. CORS
- Production'da **wildcard `*` yok**. Yalnız bilinen origin'ler beyaz listede. Metotları gerekenle sınırla. `credentials` gerekiyorsa origin açık olmalı.

## 7. HTTP Güvenlik Header'ları
- `next.config.js` `headers()` veya `middleware.ts` ile: **CSP**, `X-Frame-Options: DENY` (clickjacking), `X-Content-Type-Options: nosniff`, **HSTS** (`Strict-Transport-Security`), `Referrer-Policy: strict-origin-when-cross-origin`. `X-Powered-By` kapalı (`poweredByHeader: false`).

## 8. Dosya Yükleme Güvenliği
- Tip doğrulama **sunucuda**: hem MIME hem uzantı; istemci iddiasına güvenme. Boyut limiti (görsel ~5MB, video pipeline limiti net).
- **Supabase Storage** bucket'ında sakla (web kök dışı); dosyayı **UUID ile yeniden adlandır** (orijinal adı kullanma). Çalıştırılabilir izinle sunma.
- Public/hassas yüklemelerde malware/SVG-XSS kontrolü. (A&A Medya UI, stok grupları, galeri video bunun kapsamında.)

## 9. Hata Yönetimi & Loglama
- İstemciye **asla** stack trace / iç yol / ham hata. Kullanıcıya jenerik mesaj.
- Sunucuda bağlamla logla (zaman, user-id varsa, route, temizlenmiş girdi) → **Sentry** (zaten kurulu). 4xx ↔ 5xx ayrımı doğru (validation = 400, 500 değil).

## 10. Bağımlılık Güvenliği
- Kurulumdan sonra `npm audit`; high/critical düzelt. Versiyonlar `package-lock.json` ile sabit. Bakımsız (2+ yıl) güvenlik kütüphanesinden kaçın. Şüpheli postinstall script'i olan paketi incelemeden kurma.

## 11. XSS Önleme
- `dangerouslySetInnerHTML` yalnız **DOMPurify** ile temizlenmiş içerikte. Kullanıcı verisiyle `eval()` / `new Function()` / `innerHTML` yok. Inline `<script>` yerine harici dosya (CSP uyumu).

## 12. Deploy Kontrol Listesi (her yayından önce)
- [ ] `.env` commit'lenmemiş; secret'lar Vercel/Railway env config'inde
- [ ] Debug/verbose log production'da KAPALI
- [ ] DB public değil; service-role sızıntısı yok; **tüm tablolarda RLS aktif**
- [ ] HTTPS zorunlu; güvenlik header'ları aktif
- [ ] Public endpoint'lerde rate limiting + Zod validation
- [ ] CORS bilinen origin'lerle sınırlı
- [ ] Kullanılmayan/eski API route'ları kaldırılmış veya korunmuş
- [ ] Stripe webhook imza doğrulaması açık; webhook secret env'de
- [ ] (white-label) Kiracı izolasyonu RLS testiyle doğrulanmış

## 🤖 AI / LLM Kuralları (sosyal içerik + video otomasyon ajanları)
- LLM/Gemini/Higgsfield çağrıları **yalnız sunucuda** (cron/worker/route) — API key tarayıcıya **asla** gitmez.
- Ham kullanıcı/site girdisini doğrudan prompt'a gömmeden önce temizle → **prompt injection** koruması. Sistem talimatı ile kullanıcı içeriğini ayır.
- Her çağrıda **`max_tokens`/çıktı limiti**; kullanıcı/oturum başına **token bütçesi** (kaçak maliyet + maliyet-saldırısı koruması — Higgsfield kredisi/Gemini maliyeti sınırlı).
- Kullanım (token/kredi) **logla**; anomaliyi gör.
- LLM çıktısını UI'da render etmeden / yayınlamadan önce **doğrula + temizle** (üretilen HTML'den XSS). Otomatik sosyal yayında kalite kapıları (yapısal + marka) bu doğrulamanın parçası.

---
*Kaynak: 12-maddelik güvenlik baseline'ı (Y. Arsal) → Next.js/Supabase yığınına uyarlandı. Güncelleme gerektiğinde bu dosyayı düzenle; tüm repolar aynı standardı paylaşır.*

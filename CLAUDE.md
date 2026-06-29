@AGENTS.md
<!-- security-baseline -->
## 🔐 Güvenlik (ZORUNLU — istisnasız)
Bu repoda üretilen/değiştirilen **her kod** `./SECURITY.md` baseline'ına uymak zorundadır: secret yönetimi (frontend'de ham key yok, service-role sadece sunucu), **her tabloda RLS + RPC'lerde `search_path` sabit**, Zod ile sunucu-tarafı doğrulama, rate limiting (Upstash/KV), **kiracı izolasyonu** (white-label), güvenlik header'ları, dosya yükleme doğrulama, LLM/token kuralları (prompt injection + token bütçesi + sunucu-tarafı key). Her yeni özellik/PR öncesi `SECURITY.md` deploy checklist'ini kontrol et. Otomatik tarama: Semgrep Guardian.

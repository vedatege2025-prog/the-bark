-- ─── profiles ────────────────────────────────────────────────────────────────
CREATE TABLE public.profiles (
  id                  UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username            TEXT UNIQUE,
  full_name           TEXT,
  level               TEXT DEFAULT 'A1' CHECK (level IN ('A1','A2','B1','B2','C1','C2')),
  daily_goal_minutes  INTEGER DEFAULT 15,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ─── word_progress ───────────────────────────────────────────────────────────
CREATE TABLE public.word_progress (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id           UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  word_id           TEXT NOT NULL,
  ease_factor       REAL DEFAULT 2.5,
  interval_days     INTEGER DEFAULT 1,
  next_review_at    TIMESTAMPTZ DEFAULT NOW(),
  review_count      INTEGER DEFAULT 0,
  last_reviewed_at  TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, word_id)
);

-- ─── lesson_progress ─────────────────────────────────────────────────────────
CREATE TABLE public.lesson_progress (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id     TEXT NOT NULL,
  score         INTEGER DEFAULT 0,
  completed_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- ─── subscriptions ───────────────────────────────────────────────────────────
CREATE TABLE public.subscriptions (
  id                      UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id                 UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  stripe_customer_id      TEXT UNIQUE,
  stripe_subscription_id  TEXT UNIQUE,
  plan                    TEXT DEFAULT 'free' CHECK (plan IN ('free','pro')),
  status                  TEXT DEFAULT 'active' CHECK (status IN ('active','canceled','past_due')),
  current_period_end      TIMESTAMPTZ,
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  updated_at              TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE public.profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.word_progress   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions   ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own_profile_select" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "own_profile_insert" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "own_profile_update" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "own_word_progress" ON public.word_progress
  USING (auth.uid() = user_id);

CREATE POLICY "own_lesson_progress" ON public.lesson_progress
  USING (auth.uid() = user_id);

CREATE POLICY "own_subscription" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- ─── Signup trigger: yeni kullanıya otomatik profil aç ───────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

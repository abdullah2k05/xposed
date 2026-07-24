-- xposed — Supabase Schema
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS profiles (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  profile_image_url TEXT,
  overall_score INTEGER,
  aura_color TEXT,
  aura_vibe TEXT,
  npc_class TEXT,
  npc_emoji TEXT,
  beauty_score INTEGER,
  ban_clock_score INTEGER,
  profile_rating REAL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for leaderboard queries
CREATE INDEX IF NOT EXISTS idx_profiles_score ON profiles (overall_score DESC);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Row Level Security (everyone can read, only server can write)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert/update"
  ON profiles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update"
  ON profiles FOR UPDATE
  USING (true);

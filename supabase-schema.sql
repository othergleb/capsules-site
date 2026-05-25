-- ─────────────────────────────────────────────────────────────
-- Capsule 01 — Supabase schema
-- Run this in: Supabase dashboard → SQL Editor → New query
-- ─────────────────────────────────────────────────────────────

-- Members table
CREATE TABLE members (
  id                UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  member_number     SERIAL,                              -- auto-incrementing e.g. 1, 2, 3…
  email             TEXT        UNIQUE NOT NULL,
  name              TEXT,
  invite_code       TEXT        UNIQUE DEFAULT substr(md5(gen_random_uuid()::text), 1, 8),
  companion_email   TEXT,                                -- email they invited (before companion registers)
  companion_id      UUID        REFERENCES members(id),  -- set once companion registers
  invited_by_id     UUID        REFERENCES members(id),  -- who invited them
  status            TEXT        NOT NULL DEFAULT 'registered'
                                CHECK (status IN ('registered','paired','allocated','purchased','waitlisted','lapsed')),
  klaviyo_id        TEXT,                                -- Klaviyo profile ID for reference
  allocated_at      TIMESTAMPTZ,
  purchased_at      TIMESTAMPTZ,
  shopify_order_id  TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast invite_code lookups (companion registration flow)
CREATE INDEX members_invite_code_idx ON members (invite_code);

-- Index for email lookups
CREATE INDEX members_email_idx ON members (email);

-- Row Level Security — API routes use the service role key which bypasses RLS,
-- but enable it so no accidental public exposure via anon key
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

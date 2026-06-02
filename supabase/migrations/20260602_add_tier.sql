-- ── Add tier column to members ────────────────────────────────────
-- tier 1 = early access (referred or manually granted)
-- tier 2 = standard waitlist (default)

ALTER TABLE members
  ADD COLUMN IF NOT EXISTS tier INTEGER NOT NULL DEFAULT 2;

-- Drop purchase_tokens table — no longer used (waitlist model, not ballot)
DROP TABLE IF EXISTS purchase_tokens;

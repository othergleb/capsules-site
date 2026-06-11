-- Add referral_count and presale_unlocked to members
ALTER TABLE members
  ADD COLUMN IF NOT EXISTS referral_count  INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS presale_unlocked BOOLEAN NOT NULL DEFAULT FALSE;

-- Backfill: anyone already on tier 1 has made at least one referral
UPDATE members SET referral_count = 1 WHERE tier = 1;

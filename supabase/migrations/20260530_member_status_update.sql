-- ── Member status: add new values ─────────────────────────────────
-- Adds: not_selected, waitlist_allocated, waitlist_lapsed
-- Also adds is_admin column for future admin UI access control

-- Drop the old CHECK constraint and recreate with all values
ALTER TABLE members
  DROP CONSTRAINT IF EXISTS members_status_check;

ALTER TABLE members
  ADD CONSTRAINT members_status_check
  CHECK (status IN (
    'registered',
    'paired',
    'allocated',
    'lapsed',
    'purchased',
    'not_selected',
    'waitlisted',
    'waitlist_allocated',
    'waitlist_lapsed'
  ));

-- Add is_admin column (default false)
ALTER TABLE members
  ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false;

-- Add index for admin lookups (small table so optional, but useful)
CREATE INDEX IF NOT EXISTS members_is_admin_idx ON members (is_admin) WHERE is_admin = true;

COMMENT ON COLUMN members.status IS
  'registered=signed up; paired=companion confirmed; allocated=ballot winner (window open);
   lapsed=winner window expired; purchased=bought; not_selected=did not win ballot;
   waitlisted=actively opted into waitlist; waitlist_allocated=waitlist window open;
   waitlist_lapsed=waitlist window expired.';

COMMENT ON COLUMN members.is_admin IS 'True for team members who can access /admin pages.';

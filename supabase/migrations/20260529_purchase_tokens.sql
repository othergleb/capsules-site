-- ── purchase_tokens ───────────────────────────────────────────────
-- One row per winner or waitlist member who is granted a purchase window.
-- The token UUID is what goes into the email link: /purchase/[token]

create table if not exists purchase_tokens (
  id               uuid        primary key default gen_random_uuid(),
  member_id        uuid        not null references members(id) on delete cascade,
  token            uuid        not null unique default gen_random_uuid(),
  type             text        not null check (type in ('winner', 'waitlist')),
  capsule_id       text        not null default 'capsule-01',
  expires_at       timestamptz not null,
  accessed_at      timestamptz,          -- first time they clicked the link
  used_at          timestamptz,          -- set by Shopify webhook on order creation
  shopify_order_id text,
  created_at       timestamptz not null default now()
);

create index on purchase_tokens(token);
create index on purchase_tokens(member_id);
create index on purchase_tokens(capsule_id, type);

comment on table  purchase_tokens                is 'Time-limited, single-use purchase links for ballot winners and waitlist members.';
comment on column purchase_tokens.token          is 'UUID used in the URL: /purchase/{token}. Unique per person per allocation.';
comment on column purchase_tokens.type           is 'winner = direct ballot winner; waitlist = offered slot after winner window expired.';
comment on column purchase_tokens.capsule_id     is 'Which capsule this allocation is for.';
comment on column purchase_tokens.expires_at     is 'After this timestamp the link redirects to the window-closed page.';
comment on column purchase_tokens.accessed_at    is 'First time the link was visited. Useful for analytics and chasing non-clickers.';
comment on column purchase_tokens.used_at        is 'Set by the Shopify order webhook when purchase is confirmed.';
comment on column purchase_tokens.shopify_order_id is 'Shopify order ID, stored when the webhook fires.';

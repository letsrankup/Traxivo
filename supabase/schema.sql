-- Users / Profiles
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  company text,
  avatar text,
  plan text default 'free',
  created_at timestamptz default now()
);

-- Contacts (CRM)
create table if not exists contacts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  name text not null,
  email text,
  phone text,
  company text,
  website text,
  status text default 'lead',
  tags text[] default '{}',
  notes text default '',
  value numeric default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Deals (CRM Pipeline)
create table if not exists deals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  title text not null,
  contact_id uuid references contacts(id) on delete set null,
  value numeric default 0,
  stage text default 'prospecting',
  probability integer default 20,
  expected_close date,
  notes text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Proposals
create table if not exists proposals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  title text not null,
  client_name text,
  client_email text,
  service text,
  budget text,
  timeline text,
  content text,
  status text default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Invoices
create table if not exists invoices (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  number text not null,
  client_name text,
  client_email text,
  items jsonb default '[]',
  subtotal numeric default 0,
  tax numeric default 0,
  total numeric default 0,
  status text default 'draft',
  due_date date,
  notes text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- SEO Audits (history)
create table if not exists seo_audits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  url text not null,
  score integer,
  issues_count integer,
  data jsonb,
  created_at timestamptz default now()
);

-- RLS Policies
alter table profiles enable row level security;
alter table contacts enable row level security;
alter table deals enable row level security;
alter table proposals enable row level security;
alter table invoices enable row level security;
alter table seo_audits enable row level security;

create policy "Users own data" on profiles for all using (auth.uid() = id);
create policy "Users own contacts" on contacts for all using (auth.uid() = user_id);
create policy "Users own deals" on deals for all using (auth.uid() = user_id);
create policy "Users own proposals" on proposals for all using (auth.uid() = user_id);
create policy "Users own invoices" on invoices for all using (auth.uid() = user_id);
create policy "Users own audits" on seo_audits for all using (auth.uid() = user_id);

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger contacts_updated before update on contacts for each row execute function update_updated_at();
create trigger deals_updated before update on deals for each row execute function update_updated_at();
create trigger proposals_updated before update on proposals for each row execute function update_updated_at();
create trigger invoices_updated before update on invoices for each row execute function update_updated_at();

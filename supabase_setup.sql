-- Create the saved_paths table
create table public.saved_paths (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  input_query text not null,
  data jsonb not null
);

-- Enable Row Level Security (RLS) if you want it to be private. 
-- For now, we'll allow all operations as it's a simple app.
alter table public.saved_paths enable row level security;

-- Create policy to allow all for public for ease of development. 
-- In production, you might want to restrict this further.
create policy "Allow all for public"
on public.saved_paths
for all
using (true)
with check (true);

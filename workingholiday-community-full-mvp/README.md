# WorkAway Global - Full MVP

Responsive global working-holiday community MVP.

## Features

- Responsive landing page
- Email signup/login/logout with Supabase Auth
- Profile creation/update
- Country/category filtered post list
- Create post
- Image upload to Supabase Storage
- Post detail page
- Comments
- Like button
- Report post
- Basic protected actions

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

```text
http://localhost:3000
```

## Supabase setup

1. Create a Supabase project.
2. Copy Project URL and anon key into `.env.local`.
3. Go to SQL Editor.
4. Run this SQL:

```sql
create extension if not exists "pgcrypto";

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  country text,
  city text,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default now()
);

create table posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  country text not null,
  city text,
  category text not null,
  content text not null,
  image_url text,
  created_at timestamp with time zone default now()
);

create table comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now()
);

create table likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(post_id, user_id)
);

create table reports (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  reason text not null,
  created_at timestamp with time zone default now()
);

alter table profiles enable row level security;
alter table posts enable row level security;
alter table comments enable row level security;
alter table likes enable row level security;
alter table reports enable row level security;

create policy "Profiles are readable"
on profiles for select
using (true);

create policy "Users can insert own profile"
on profiles for insert
with check (auth.uid() = id);

create policy "Users can update own profile"
on profiles for update
using (auth.uid() = id);

create policy "Posts are readable"
on posts for select
using (true);

create policy "Logged in users can create posts"
on posts for insert
with check (auth.uid() = user_id);

create policy "Users can update own posts"
on posts for update
using (auth.uid() = user_id);

create policy "Users can delete own posts"
on posts for delete
using (auth.uid() = user_id);

create policy "Comments are readable"
on comments for select
using (true);

create policy "Logged in users can create comments"
on comments for insert
with check (auth.uid() = user_id);

create policy "Users can delete own comments"
on comments for delete
using (auth.uid() = user_id);

create policy "Likes are readable"
on likes for select
using (true);

create policy "Logged in users can like"
on likes for insert
with check (auth.uid() = user_id);

create policy "Users can remove own likes"
on likes for delete
using (auth.uid() = user_id);

create policy "Logged in users can report"
on reports for insert
with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do nothing;

create policy "Post images are public"
on storage.objects for select
using (bucket_id = 'post-images');

create policy "Logged in users can upload post images"
on storage.objects for insert
with check (
  bucket_id = 'post-images'
  and auth.role() = 'authenticated'
);
```

## Deploy

1. Push to GitHub.
2. Import GitHub repo into Vercel.
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy.

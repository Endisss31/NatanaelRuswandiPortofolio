-- =========================================================
-- SUPABASE DATABASE SCHEMA & MIGRATION FOR PORTFOLIO
-- Execute this SQL script in Supabase SQL Editor
-- =========================================================

-- 1. PROFILE TABLE
CREATE TABLE IF NOT EXISTS public.profile (
    id BIGINT PRIMARY KEY DEFAULT 1,
    name TEXT,
    subtitles JSONB DEFAULT '[]'::jsonb,
    subtitles_id JSONB DEFAULT '[]'::jsonb,
    subtitles_en JSONB DEFAULT '[]'::jsonb,
    bio TEXT,
    bio_id TEXT,
    bio_en TEXT,
    profile_image TEXT,
    profile_image_1 TEXT,
    profile_image_2 TEXT,
    profile_image_3 TEXT,
    profile_images JSONB DEFAULT '[]'::jsonb,
    github TEXT,
    linkedin TEXT,
    instagram TEXT,
    email TEXT,
    mission TEXT,
    mission_id TEXT,
    mission_en TEXT,
    years_exp TEXT,
    projects_count TEXT,
    career_goals TEXT,
    career_goals_id TEXT,
    career_goals_en TEXT,
    education JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to existing Profile table if needed
ALTER TABLE public.profile 
ADD COLUMN IF NOT EXISTS subtitles_id JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS subtitles_en JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS bio_id TEXT,
ADD COLUMN IF NOT EXISTS bio_en TEXT,
ADD COLUMN IF NOT EXISTS profile_image_1 TEXT,
ADD COLUMN IF NOT EXISTS profile_image_2 TEXT,
ADD COLUMN IF NOT EXISTS profile_image_3 TEXT,
ADD COLUMN IF NOT EXISTS profile_images JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS mission_id TEXT,
ADD COLUMN IF NOT EXISTS mission_en TEXT,
ADD COLUMN IF NOT EXISTS years_exp TEXT,
ADD COLUMN IF NOT EXISTS projects_count TEXT,
ADD COLUMN IF NOT EXISTS career_goals TEXT,
ADD COLUMN IF NOT EXISTS career_goals_id TEXT,
ADD COLUMN IF NOT EXISTS career_goals_en TEXT,
ADD COLUMN IF NOT EXISTS education JSONB DEFAULT '[]'::jsonb;

-- RLS for profile
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on profile" ON public.profile;
DROP POLICY IF EXISTS "Allow public write access on profile" ON public.profile;
CREATE POLICY "Allow public read access on profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Allow public write access on profile" ON public.profile FOR ALL USING (true) WITH CHECK (true);

-- 2. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
    id TEXT PRIMARY KEY,
    title TEXT,
    issuer TEXT,
    organizer TEXT,
    description TEXT,
    type TEXT,
    date TEXT,
    issuer_logo TEXT,
    image_url TEXT,
    pdf_url TEXT,
    credential_id TEXT,
    credential_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to existing Certificates table if needed
ALTER TABLE public.certificates 
ADD COLUMN IF NOT EXISTS organizer TEXT,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS type TEXT,
ADD COLUMN IF NOT EXISTS issuer_logo TEXT,
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS pdf_url TEXT,
ADD COLUMN IF NOT EXISTS credential_id TEXT;

-- Convert ID to TEXT type in case it was created as BIGINT
ALTER TABLE public.certificates ALTER COLUMN id TYPE TEXT USING id::text;

-- RLS for certificates
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on certificates" ON public.certificates;
DROP POLICY IF EXISTS "Allow public write access on certificates" ON public.certificates;
CREATE POLICY "Allow public read access on certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Allow public write access on certificates" ON public.certificates FOR ALL USING (true) WITH CHECK (true);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT,
    subtitle TEXT,
    description TEXT,
    solution TEXT,
    image_url TEXT,
    gallery JSONB DEFAULT '[]'::jsonb,
    tech_stack JSONB DEFAULT '[]'::jsonb,
    github_link TEXT,
    live_link TEXT,
    category TEXT,
    status TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.projects ALTER COLUMN id TYPE TEXT USING id::text;

-- RLS for projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on projects" ON public.projects;
DROP POLICY IF EXISTS "Allow public write access on projects" ON public.projects;
CREATE POLICY "Allow public read access on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public write access on projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);

-- 4. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY,
    name TEXT,
    category TEXT,
    level INTEGER DEFAULT 80,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.skills ALTER COLUMN id TYPE TEXT USING id::text;

-- RLS for skills
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on skills" ON public.skills;
DROP POLICY IF EXISTS "Allow public write access on skills" ON public.skills;
CREATE POLICY "Allow public read access on skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public write access on skills" ON public.skills FOR ALL USING (true) WITH CHECK (true);

-- 5. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
    id TEXT PRIMARY KEY,
    title TEXT,
    company TEXT,
    location TEXT,
    start_date TEXT,
    end_date TEXT,
    description TEXT,
    highlights JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.experiences ALTER COLUMN id TYPE TEXT USING id::text;

-- RLS for experiences
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on experiences" ON public.experiences;
DROP POLICY IF EXISTS "Allow public write access on experiences" ON public.experiences;
CREATE POLICY "Allow public read access on experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Allow public write access on experiences" ON public.experiences FOR ALL USING (true) WITH CHECK (true);

-- =============================================================================
-- SCHÉMA DE BASE DE DONNÉES SUPABASE — APPLICATION STÉPHANIE PRO
-- À copier-coller dans Supabase Dashboard > SQL Editor > New query > Run
-- =============================================================================

-- 1. TABLE : CLIENTS (Répertoire des clientes)
CREATE TABLE IF NOT EXISTS public.clients (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABLE : SERVICES (Catalogue des prestations et soins)
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT DEFAULT 'Massages',
    duration INTEGER DEFAULT 60 NOT NULL,
    price NUMERIC(8, 2) DEFAULT 80.00 NOT NULL,
    description TEXT,
    image TEXT,
    color_bg TEXT DEFAULT '#E8EAF6',
    color_border TEXT DEFAULT '#5F9EA0',
    color_text TEXT DEFAULT '#1F383E',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABLE : APPOINTMENTS (Rendez-vous de l'agenda)
CREATE TABLE IF NOT EXISTS public.appointments (
    id TEXT PRIMARY KEY,
    client_id TEXT REFERENCES public.clients(id) ON DELETE SET NULL,
    client_name TEXT NOT NULL,
    client_phone TEXT,
    client_email TEXT,
    service_id TEXT REFERENCES public.services(id) ON DELETE SET NULL,
    service_name TEXT NOT NULL,
    duration INTEGER DEFAULT 60 NOT NULL,
    price NUMERIC(8, 2) DEFAULT 80.00 NOT NULL,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'confirmed',
    color_bg TEXT DEFAULT '#E8EAF6',
    color_border TEXT DEFAULT '#5F9EA0',
    color_text TEXT DEFAULT '#1F383E',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABLE : BLOCKED_SLOTS (Pauses et créneaux indisponibles)
CREATE TABLE IF NOT EXISTS public.blocked_slots (
    id TEXT PRIMARY KEY,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    duration INTEGER DEFAULT 60 NOT NULL,
    reason TEXT DEFAULT 'Indisponible',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TABLE : CABINET_SETTINGS (Horaires et coordonnées du cabinet)
CREATE TABLE IF NOT EXISTS public.cabinet_settings (
    id TEXT PRIMARY KEY DEFAULT 'main',
    address TEXT DEFAULT '37 Avenue de Boutiny, 06530 Peymeinade',
    phone TEXT DEFAULT '06 28 38 83 49',
    email TEXT DEFAULT 'phanybox@gmail.com',
    buffer_time INTEGER DEFAULT 15,
    schedule JSONB,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =============================================================================
-- INDEX POUR PERFORMANCES OPTIMALES
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(date);
CREATE INDEX IF NOT EXISTS idx_blocked_slots_date ON public.blocked_slots(date);
CREATE INDEX IF NOT EXISTS idx_clients_name ON public.clients(name);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);

-- =============================================================================
-- SÉCURITÉ ROW LEVEL SECURITY (RLS) & ACCÈS PUBLIC SÉCURISÉ
-- =============================================================================
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cabinet_settings ENABLE ROW LEVEL SECURITY;

-- Politiques d'accès complet pour la clé anonyme/publishable de Stéphanie
DROP POLICY IF EXISTS "Allow public all access on clients" ON public.clients;
CREATE POLICY "Allow public all access on clients" ON public.clients FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public all access on services" ON public.services;
CREATE POLICY "Allow public all access on services" ON public.services FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public all access on appointments" ON public.appointments;
CREATE POLICY "Allow public all access on appointments" ON public.appointments FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public all access on blocked_slots" ON public.blocked_slots;
CREATE POLICY "Allow public all access on blocked_slots" ON public.blocked_slots FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public all access on cabinet_settings" ON public.cabinet_settings;
CREATE POLICY "Allow public all access on cabinet_settings" ON public.cabinet_settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

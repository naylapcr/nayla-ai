-- SQL DDL & RLS untuk tabel crm_leads (PRD v3)

-- 1. Buat tabel crm_leads
CREATE TABLE IF NOT EXISTS crm_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Pengunjung (anon/guest) diizinkan untuk mengirim/insert data prospek baru
CREATE POLICY "Allow public insert to crm_leads" ON crm_leads
    FOR INSERT WITH CHECK (true);

-- 4. Policy: Hanya Admin yang dapat membaca data prospek
CREATE POLICY "Allow admin read crm_leads" ON crm_leads
    FOR SELECT USING (
        coalesce(current_setting('request.headers', true)::json->>'x-user-role', '') = 'admin'
    );

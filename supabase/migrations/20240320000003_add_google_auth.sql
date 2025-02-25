-- Create google_seo schema if not exists
CREATE SCHEMA IF NOT EXISTS google_seo;

-- Create auth_tokens table
CREATE TABLE IF NOT EXISTS google_seo.auth_tokens (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    expiry_date TIMESTAMP WITH TIME ZONE,
    email TEXT,
    scope TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add RLS policies
ALTER TABLE google_seo.auth_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tokens"
    ON google_seo.auth_tokens
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tokens"
    ON google_seo.auth_tokens
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tokens"
    ON google_seo.auth_tokens
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id); 
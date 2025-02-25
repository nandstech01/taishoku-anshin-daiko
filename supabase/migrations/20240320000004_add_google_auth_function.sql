-- Function to get Google auth token
CREATE OR REPLACE FUNCTION get_google_auth_token(user_id UUID)
RETURNS TABLE (
    access_token TEXT,
    refresh_token TEXT,
    expiry_date TIMESTAMP WITH TIME ZONE,
    email TEXT,
    scope TEXT
) 
SECURITY DEFINER
SET search_path = google_seo, public
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.access_token,
        t.refresh_token,
        t.expiry_date,
        t.email,
        t.scope
    FROM google_seo.auth_tokens t
    WHERE t.user_id = $1;
END;
$$; 
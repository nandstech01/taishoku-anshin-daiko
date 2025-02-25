-- RLSを迂回するためのトークン保存関数の作成
CREATE OR REPLACE FUNCTION save_google_auth_token(
  p_user_id UUID,
  p_access_token TEXT,
  p_refresh_token TEXT,
  p_expiry_date TIMESTAMP WITH TIME ZONE,
  p_email TEXT,
  p_scope TEXT
) 
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = google_seo, public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO google_seo.auth_tokens 
    (user_id, access_token, refresh_token, expiry_date, email, scope)
  VALUES 
    (p_user_id, p_access_token, p_refresh_token, p_expiry_date, p_email, p_scope)
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    access_token = EXCLUDED.access_token,
    refresh_token = EXCLUDED.refresh_token,
    expiry_date = EXCLUDED.expiry_date,
    email = EXCLUDED.email,
    scope = EXCLUDED.scope,
    updated_at = CURRENT_TIMESTAMP;
    
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Failed to save Google tokens: %', SQLERRM;
    RETURN FALSE;
END;
$$;

-- 管理者として任意のSQLを実行するための関数
-- セキュリティ上のリスクがあるため本番環境では使用しないでください
CREATE OR REPLACE FUNCTION execute_admin_query(query TEXT)
RETURNS JSONB
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
DECLARE
  result JSONB;
BEGIN
  EXECUTE query INTO result;
  RETURN result;
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object('error', SQLERRM, 'query', query);
END;
$$;

-- 関数にアクセス権を付与
GRANT EXECUTE ON FUNCTION save_google_auth_token TO authenticated;
GRANT EXECUTE ON FUNCTION save_google_auth_token TO anon;
GRANT EXECUTE ON FUNCTION execute_admin_query TO authenticated;
GRANT EXECUTE ON FUNCTION execute_admin_query TO anon; 
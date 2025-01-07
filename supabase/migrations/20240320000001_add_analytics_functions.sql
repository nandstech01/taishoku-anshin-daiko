-- デバイス別統計を取得する関数
CREATE OR REPLACE FUNCTION get_device_stats(start_date timestamp with time zone)
RETURNS TABLE (device_type text, count bigint) 
LANGUAGE sql
AS $$
  SELECT device_type, COUNT(*) as count
  FROM analytics
  WHERE created_at >= start_date
  GROUP BY device_type
  ORDER BY count DESC;
$$;

-- 国別統計を取得する関数
CREATE OR REPLACE FUNCTION get_country_stats(start_date timestamp with time zone)
RETURNS TABLE (country text, count bigint)
LANGUAGE sql
AS $$
  SELECT country, COUNT(*) as count
  FROM analytics
  WHERE created_at >= start_date
  GROUP BY country
  ORDER BY count DESC;
$$; 
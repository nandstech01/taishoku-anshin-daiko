-- 退職届生成ログテーブルの作成
CREATE TABLE IF NOT EXISTS resignation_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    document_type TEXT NOT NULL CHECK (document_type IN ('退職届', '退職願')),
    device_info JSONB,
    ai_check_used BOOLEAN DEFAULT false,
    user_agent TEXT,
    pdf_generated BOOLEAN DEFAULT false
);

-- インデックスの作成
CREATE INDEX idx_resignation_logs_created_at ON resignation_logs(created_at);
CREATE INDEX idx_resignation_logs_document_type ON resignation_logs(document_type);

-- コメント
COMMENT ON TABLE resignation_logs IS '退職届・退職願の生成ログを記録するテーブル（個人情報は含まない）'; 
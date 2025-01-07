export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          slug: string;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          slug: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          slug?: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      analytics: {
        Row: {
          id: number;
          slug: string | null;
          page_path: string;
          visitor_id: string | null;
          session_id: string | null;
          referrer: string | null;
          user_agent: string | null;
          device_type: string | null;
          country: string | null;
          created_at: string | null;
          search_query: string | null;
        };
        Insert: {
          id?: number;
          slug?: string | null;
          page_path: string;
          visitor_id?: string | null;
          session_id?: string | null;
          referrer?: string | null;
          user_agent?: string | null;
          device_type?: string | null;
          country?: string | null;
          created_at?: string | null;
          search_query?: string | null;
        };
        Update: {
          id?: number;
          slug?: string | null;
          page_path?: string;
          visitor_id?: string | null;
          session_id?: string | null;
          referrer?: string | null;
          user_agent?: string | null;
          device_type?: string | null;
          country?: string | null;
          created_at?: string | null;
          search_query?: string | null;
        };
      };
    };
  };
} 
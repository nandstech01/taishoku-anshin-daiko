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
          page_type: string | null;
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
          page_type?: string | null;
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
          page_type?: string | null;
          visitor_id?: string | null;
          session_id?: string | null;
          referrer?: string | null;
          user_agent?: string | null;
          device_type?: string | null;
          country?: string | null;
          created_at?: string | null;
          search_query?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "analytics_slug_fkey";
            columns: ["slug"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["slug"];
          }
        ];
      };
      search_analytics: {
        Row: {
          id: string;
          slug: string;
          query: string;
          clicks: number;
          impressions: number;
          position: number;
          date: string;
          device: string;
          country: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          query: string;
          clicks: number;
          impressions: number;
          position: number;
          date: string;
          device: string;
          country: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          query?: string;
          clicks?: number;
          impressions?: number;
          position?: number;
          date?: string;
          device?: string;
          country?: string;
          created_at?: string;
        };
      };
    };
  };
} 
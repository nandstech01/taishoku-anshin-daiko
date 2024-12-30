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
      profiles: {
        Row: {
          id: string
          username: string | null
          email: string
          role: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          username?: string | null
          email: string
          role?: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          username?: string | null
          email?: string
          role?: string
          created_at?: string
          updated_at?: string | null
        }
      }
      posts: {
        Row: {
          id: string
          title: string
          content: string
          slug: string
          excerpt: string
          category_id: string
          author_id: string
          published_at: string | null
          created_at: string
          updated_at: string | null
          views: number
          tags: string[]
        }
        Insert: {
          id?: string
          title: string
          content: string
          slug: string
          excerpt: string
          category_id: string
          author_id: string
          published_at?: string | null
          created_at?: string
          updated_at?: string | null
          views?: number
          tags?: string[]
        }
        Update: {
          id?: string
          title?: string
          content?: string
          slug?: string
          excerpt?: string
          category_id?: string
          author_id?: string
          published_at?: string | null
          created_at?: string
          updated_at?: string | null
          views?: number
          tags?: string[]
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          updated_at?: string | null
        }
      }
      comments: {
        Row: {
          id: string
          content: string
          post_id: string
          author_id: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          content: string
          post_id: string
          author_id?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          content?: string
          post_id?: string
          author_id?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 
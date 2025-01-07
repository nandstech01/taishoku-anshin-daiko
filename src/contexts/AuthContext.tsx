'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User, SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  user: User | null;
  supabase: SupabaseClient;
}

const supabase = createClient();

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  user: null,
  supabase,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('AuthContext - Error getting initial session:', error);
          throw error;
        }
        
        if (mounted) {
          if (session) {
            setSession(session);
            setUser(session.user);
            console.log('AuthContext - Initial session loaded:', session.user.email);
          } else {
            console.log('AuthContext - No initial session');
            setSession(null);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('AuthContext - Error getting initial session:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('AuthContext - Auth state changed:', event, session?.user?.email);
      
      if (mounted) {
        if (session) {
          setSession(session);
          setUser(session.user);
        } else {
          setSession(null);
          setUser(null);
        }
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    loading,
    user,
    supabase,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 
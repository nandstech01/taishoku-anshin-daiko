import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from './database.types';

export function createServerClient() {
  const cookieStore = cookies();
  
  return createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
}

export function createRouteHandler() {
  const cookieStore = cookies();
  
  return createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
} 
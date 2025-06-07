import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

export const createSupabaseClient = () => {
  // Ensure that the environment variables are set
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{
      // Use the Clerk auth token for Supabase authentication
      async accessToken(){
        return ((await auth()).getToken());
      }
    }
  )
}
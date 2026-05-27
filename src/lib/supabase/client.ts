import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

let client: ReturnType<typeof createBrowserClient<Database>> | null = null;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const getSupabaseClient = () => {
  if (!client) {
    if (!supabaseUrl || !supabaseAnonKey) {
      const message =
        "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY";
      console.error(`[Supabase] ${message}`);
      throw new Error(message);
    }
    client = createBrowserClient<Database>(
      supabaseUrl,
      supabaseAnonKey
    );
  }

  return client;
};

export const supabase = getSupabaseClient();

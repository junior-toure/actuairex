import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wfaqsapiaqvvflhyfskx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmYXFzYXBpYXF2dmZsaHlmc2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1OTI0MDQsImV4cCI6MjA5MTE2ODQwNH0.tuUOD5hKB7VKoVZfi4ZH4HIUGnUJt-VxB7cLiIQcGog";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
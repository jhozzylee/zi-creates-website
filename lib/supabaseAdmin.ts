import { createClient } from '@supabase/supabase-js';

// NEVER expose this key on the frontend
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export default supabaseAdmin;
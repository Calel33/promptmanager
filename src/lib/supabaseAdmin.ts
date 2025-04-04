import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase admin client with service role key for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseServiceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable. This key is required for server-side operations.');
}

// Create admin client with service role key
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
    }
});

// Helper function to verify if a user token is valid
export async function verifyAuth(token: string) {
    try {
        const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
        
        if (error) throw error;
        return { user, error: null };
    } catch (error) {
        console.error('Auth error:', error);
        return { user: null, error };
    }
} 
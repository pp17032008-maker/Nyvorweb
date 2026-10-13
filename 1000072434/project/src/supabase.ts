import { createClient } from '@supabase/supabase-js';

// Netlify environment variables se lene ki koshish karega, nahi toh default fallback use karega
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ppytshpklerjdnkljqag.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBweXRzaHBrbGVyamRua2xqcWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMTcwNTAsImV4cCI6MjA1Njc5MzA1MH0.placeholder';

export const supabase = createClient(
supabaseUrl && supabaseUrl.trim() !== '' ? supabaseUrl : 'https://ppytshpklerjdnkljqag.supabase.co',
supabaseAnonKey && supabaseAnonKey.trim() !== '' ? supabaseAnonKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBweXRzaHBrbGVyamRua2xqcWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMTcwNTAsImV4cCI6MjA1Njc5MzA1MH0.placeholder'
);
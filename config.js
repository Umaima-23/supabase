
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.86.0/+esm'

const supabaseUrl = 'https://ouixclozgbcbuqzzvwjt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91aXhjbG96Z2JjYnVxenp2d2p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MTMxOTIsImV4cCI6MjA4MDE4OTE5Mn0.Bbvzzca6jLDcnqSvmBCjubYpwXT3u-pXJENv_c91SwQ'    
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
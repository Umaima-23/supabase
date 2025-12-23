import {createClient} from  'https://esm.sh/@supabase/supabase-js'

const supabaseUrl='https://cljajgnbkhnftoxfbprz.supabase.co'
const supabaseKey='sb_publishable_XZCku4MMQfePFkVBZYIEPg_uHtuSYsW'
const supabase=createClient(supabaseUrl,supabaseKey)

export default supabase
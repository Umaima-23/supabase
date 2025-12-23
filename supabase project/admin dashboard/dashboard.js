import supabase from '../config.js'

async function checkRole() {
    const { data: { user } } = await supabase.auth.getUser()
    if(!user){
        alert('create account')
    }
}
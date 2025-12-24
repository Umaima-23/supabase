import supabase from '../config.js'

async function checkRole() {
    const { data: { user } } = await supabase.auth.getUser()
    if(!user){
        alert('create account')
        return window.location.href='../login.html'
    }
    try {
        const { data:profile , error } = await supabase
  .from('users')
  .select('role')
  .eq('userId', user.id)
  .single()
  console.log(profile);
  

    } catch (error) {
        
    }
}
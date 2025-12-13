import supabase from "./config.js";

let email= document.getElementById('exampleInputEmail1')
let password= document.getElementById('exampleInputPassword1')
let name= document.getElementById('exampleInputName1')
let signUp=document.getElementById('myForm')

async function register(e) {
    e.preventDefault()
    console.log(email.value,password.value)
    try {
    const { data,error } = await supabase.auth.signUp({
  email: email.value,
  password: password.value,
})
if(data){
    console.log("userkaData",data)
    name.value=""
    email.value=""
password.value=""
}
} catch (error) {
    
}

}
signUp.addEventListener('submit',register)
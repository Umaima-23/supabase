    import supabase from './config.js'

    let userName = document.getElementById('name')
    let email = document.getElementById('exampleInputEmail1')
    let password = document.getElementById('exampleInputPassword1')
    let signupForm = document.getElementById('myForm')

    async function register(e) {
        e.preventDefault()
        console.log(email.value,password.value,userName.value)
        if(!email.value||!password.value){
    Swal.fire({
    title: "The Internet?",
    text: "Please Fill the fields",
    icon: "question"
    });
    return;
        }
        try {
        const { data,error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
        options: {
        data: {
            userName:userName.value,
            role : 'user'
        }
        }
    })
    if(data){
        console.log('agya data',data)
        email.value=''
        password.value=''
        userName.value=''
        let {id,user_metadata}=data.user
        const { error } = await supabase
    .from('users')
    .insert({username: user_metadata.userName, email: user_metadata.email ,userId :id ,role:user_metadata.role })
    if(error){
        console.log('kch to garbar hai',error)
    }else{
        console.log('user created successfully');
        window.location.href='profile.html'
        
    }
    }
    if(error){
        console.log(error)
        return;
    }
    if(data){
        console.log(data)
    }
    } catch (error) {
        console.log('masla',error)
    }
    }

    signupForm && signupForm.addEventListener('submit',register)
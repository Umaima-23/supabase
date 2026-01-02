import supabase from './config.js'

let userName = document.getElementById('name')
let email = document.getElementById('exampleInputEmail1')
let password = document.getElementById('exampleInputPassword1')
let signupForm = document.getElementById('myForm')

async function register(e) {
    e.preventDefault()
    console.log(email.value, password.value, userName.value)
    if (!email.value || !password.value) {
        Swal.fire({
            title: "The Internet?",
            text: "Please Fill the fields",
            icon: "question"
        });
        return;
    }
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
            options: {
                data: {
                    userName: userName.value.trim(),
                    role: 'user'
                }
            }
        })
        if (data.user) {
            console.log('agya data', data)
            let { id, user_metadata } = data.user
            const { error: dberror } = await supabase
                .from('users')
                .insert({ username: user_metadata.userName, email: user_metadata.email, userId: id, role: user_metadata.role })
            if (dberror) {
                console.log('kch to garbar hai', dberror)
            } else {
                console.log('user created successfully');
                email.value = ''
                password.value = ''
                userName.value = ''
                window.location.href = 'profile.html'

            }
        }
    } catch (error) {
        console.log('masla', error)
    }
}

signupForm && signupForm.addEventListener('submit', register)

let logoutElem = document.getElementById('logoutbtn')
if (logoutElem) {
    logoutElem.addEventListener('click', async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            alert('logout failed', error.message)
        } else {
            window.location.href = './index.html'
        }
    })
}

// login__________________
let loginemail = document.getElementById('loginemail')
let loginpass = document.getElementById('loginpass')
let loginform = document.getElementById('loginform')

async function login(e) {

    e.preventDefault()
    console.log(loginpass.value, loginemail.value)
    if (!loginemail.value || !loginpass.value) {
        alert('please fill the fields')
        return
    } try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: loginemail.value,
            password: loginpass.value,

        })
        if (data) {
            console.log(data);
            const { data: profile } = await supabase
                .from('users')
                .select('role')
                .eq('userId', data.user.id)
                .single()

            if (profile && profile.role.trim() === 'admin') {
                window.location.href = '../addProduct.html'
            } else {
                window.location.href = './profile.html'
            }

        }
    } catch (error) {
console.log('error',error.message)
    }
}
loginform && loginform.addEventListener('submit', login)

// profilee____________________
let Uname = document.getElementById('name')
async function profile() {
    const { data, error } = await supabase.auth.getUser()
    if (Uname) {
        Uname.innerHTML = data.user.user_metadata.userName
    }

}
profile()



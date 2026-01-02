import supabase from '../config.js'

async function checkRole() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        alert('create account')
        return window.location.href = '../login.html'
    }
    try {
        const { data: profile, error } = await supabase
            .from('users')
            .select('role')
            .eq('userId', user.id)
            .single()
        console.log(profile);
        // if(profile.role != 'admin'){
        //     alert ('access denied')
        //     return (window.location.href = '../profile.html')
        // }else{
        //     console.log('welcome admin');
        //     alert('welcome')

        // }
    } catch (error) {
        console.log(error);

    }
}
checkRole()
let clrGrp = document.getElementById('clrGrp')
let pname = document.getElementById('pname')
let pprice = document.getElementById('pprice')
let pcateg = document.getElementById('pcateg')
let pdesc = document.getElementById('pdesc')
let pimage = document.getElementById('pimage')
let addColor = document.getElementById('addColor')
let addcart = document.getElementById('addcart')
let _addProduct = document.getElementById('addProd')
addColor && addColor.addEventListener('click', () => {
    let div = document.createElement('div')
    div.innerHTML = `<input type="color" name="" id="" class="colorsInp">
    <p class="removeColor">x</p>`
    clrGrp.appendChild(div)
    div.querySelector('.removeColor').addEventListener('click', () => {
        div.remove()
    })
})
let imageUrl;
async function uploadFile(f) {
    // e.preventDefault()

    //==> f is the pimage.file[0] neechy bola hai yh addproduct ky function main


    // let file = pimage.files[0]
    // if (!file) {
    //     console.log('selct photo first');
    //     return

    // }
    let fileName = Date.now() + '-' + f.name //pimage.files[0].name
    console.log(pimage.files[0].name);

    // console.log(f.name, file);
    try {
        const { data, error } = await supabase
            .storage
            .from('products')
            .upload(fileName, f)
        if (data) {
            console.log(data);
            const { data: urlData } = supabase.storage
                .from('products')
                .getPublicUrl(data.path)
            if (urlData) {
                console.log('got the url', urlData)
                imageUrl = urlData.publicUrl
                console.log(imageUrl, 'hogyaa url set ab bas bhejna hai database main');
                return imageUrl;
            } else {
                console.log(error, 'nahi hua set');
            }
        } else {
            console.log(error, 'error in upload')
        }
    } catch (error) {
        console.log(error, 'errrrooorrrr')
    }
}
async function addProduct(e) {
    e.preventDefault()
    let colorsArr = []
    let colorsInp = document.querySelectorAll('.colorsInp')//dot dhyan rakhna 
    colorsInp.forEach(color => {
        console.log(color.value);//# karky color code ajye ga 
        colorsArr.push(color.value.trim()) // uss khali colorsarr main push kardo


    })
    console.log(pimage.files[0]);
    let uploadFunc = await uploadFile(pimage.files[0])
    try {
        const { data, error } = await supabase
            .from('productsTable')
            .insert({
                name: pname.value,
                category: pcateg.value,
                price: pprice.value,
                description: pdesc.value,
                color: colorsArr,
                imgUrl: uploadFunc
            })
            .select()
        if (error) {
            console.log(error.message, 'error in inserting');
            alert("Database Error: " + error.message);
            console.log("Full Error Object:", error);
        } else {
            console.log(data, 'inserted successfully');
        }
    } catch (error) {

    }
}
_addProduct && _addProduct.addEventListener('submit', addProduct)

// products

let allProd = document.getElementById('allProd')

async function showAllProd(params) {
    try {
        const { data, error } = await supabase
            .from('productsTable')
            .select('*')
            if(data){
                console.log(data);
                data.forEach((product,index)=>{
                    console.log(product);
                    allProd.innerHTML=''
                     allProd.innerHTML +=`<div class="card" style="width: 18rem;">
  <img src="${product.imgUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${product.name}</h5>
   
      <p class="card-text">${product.category}</p>
    <button class="btn btn-primary" onclick="window.location.href='DetailProd.html?id=${product.id}'">view Details</button>
  </div>
</div>`
                    
                })

                
            }
    } catch (error) {

    }
}
showAllProd()
import supabase from "./config.js"

let img =document.getElementById('img')
let uploadBtn =document.getElementById('uploadBtn')
let main = document.getElementById('main')
let picName;

async function uploadMyFile() {
    // e.preventDefault()
    console.log(img.files[0])

    let fileName = img.files[0].name
    let file =img.files[0]

const { data, error } = await supabase
  .storage
  .from('images')
  .upload(Date.now()+fileName,file )
  if(data){
    console.log(data);
    picName = data.path
    const { data : urlDataa } = supabase
  .storage
  .from("images")
  .getPublicUrl(picName)

  if(urlDataa){
    console.log(urlDataa.publicUrl);
    const publicUrl=urlDataa.publicUrl
    const { error } = await supabase
  .from('pics')
  .insert([{ imageUrl: publicUrl }])
    
  }
  else{
    console.log(error.message);
  }
  }

}

uploadBtn.addEventListener('click',uploadMyFile)

  async function getImages() {
    const { data, error } = await supabase
  .from('pics')
  .select('*')
  if(data){
    console.log(data);
    data.forEach((showImg)=>{
        main.innerHTML+=`<div ><img src="${showImg.imageUrl} " alt="" width="100px "></div>`
    })
}else{
    console.log(error.message);
  }
}
getImages()
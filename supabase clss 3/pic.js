import supabase from "./config.js"

let img =document.getElementById('img')
let uploadBtn =document.getElementById('uploadBtn')

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
    const { error } = await supabase
  .from('pics')
  .insert({ id: 1, name: 'Mordor' })
    
  }
  }
}
uploadBtn.addEventListener('click',uploadMyFile)
import supabase from "../config.js";
let searchP = new URLSearchParams(window.location.search)  //?id=2
// console.log(searchP.get('id'));
let prodId = searchP.get('id')  //1,2
let myProduct = document.getElementById('myProduct')

async function OneProd (params) {
    try{
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('id',prodId)
  if(data){
    data.forEach(element => {
        console.log(element);
        
        myProduct.innerHTML+= `
          <div class="row">
        <!-- Product Image Section (Left Column) -->
        <div class="col-lg-6">
          <div class="card p-3 shadow-sm" >

            <img
              src="${element.imgUrl}"
              class="image-fluid rounded"
              alt="Product Image"
            
            />
          </div>
        </div>


        <div class="col-lg-6 mt-4 mt-lg-0">
          <div class="product-details">
            <h1 class="display-5">${element.name}</h1>
            <p class="text-muted">${element.category}</p>

            <p class="fs-3 fw-bold text-success">${element.price}</p>

          <div class="d-flex gap-2">
          colors: 
          ${element.colors.map((color)=>{
  return `<div class="colorDiv" onclick="selectColor(${element.id},'${color}')" style="background-color:${color};"></div>`
  
          }).join('')}
          </div>

            <div class="d-grid gap-2">
              <button class="btn btn-primary btn-lg" onclick="addToCart(${JSON.stringify(element).replace(/"/g,'&quot;')})"  type="button">
                <i class="bi bi-cart-plus me-2"></i> Add to Cart
              </button>
              <button class="btn btn-outline-success btn-lg" type="button">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>`
    });
    
    
  }
    }catch(err){
        console.log(err);
        
    }
}


OneProd()




window.addToCart = function (data){
let cart = JSON.parse(localStorage.getItem('cart')) || []

let existPro = cart.find((Item) => Item.id ===data.id )  
if(existPro){
    existPro.quantity += 1
}else{
cart.push(
    {

        id:data.id,
        name:data.name,
        imgUrl:data.imgUrl,
        price:data.price,
        quantity:1
    }
)
}


  localStorage.setItem("cart",JSON.stringify(cart))
  alert('item added')
}


window.selectColor = function(id,color){
    console.log(id,color);
    
}
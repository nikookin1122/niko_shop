const container = document.getElementById("shop_container")
const cartList = document.getElementById("cart_list")
const cartTotal = document.getElementById("total")
const cartcount = document.getElementById("cart_count")
const cartDisplay = document.getElementById("cart")



let cart = []
let products = []
fetch("https://fakestoreapi.com/products")
.then(res => res.json())
.then(data => {
    products = data
    renderProduct(products)
})
.catch(e =>{
    container.innerHTML = "Failed to load products"
    console.log("Fetching error: ", e);
    
})
function renderProduct(products){
    container.innerHTML = ""
   
    products.forEach(item => {
        const div = document.createElement("div")
        div.className = ("shop_card")
        div.innerHTML = `
         <div class="shop_img">
            <img src="${item.image}" alt="">
         </div>              
         <h3 class="shop_title">${item.title}</h3>               
         <span class="shop_price">$${item.price}</span>           
         <p class="shop_description">${item.description}</p>
        <button class="shop_button" data-id="${item.id}">add to card!</button>
        `;
       
        container.appendChild(div)

        const buttons = container.querySelectorAll("button[data-id]")
        buttons.forEach(button => {
            button.addEventListener("click", () => {

                const id = parseInt(button.dataset.id)
                addToCart(id)
            })
        })
    });

}   


function addToCart(id){
   
    
    const product = products.find(e =>{
        // console.log(e, id)
        return  e.id === id
        })
    if(product){
        cart.push(product)
        updateCart()
        console.log(product);
        
    }
}

function updateCart(){
    cartList.innerHTML = ""
    let total = 0
    cart.forEach((item, index) => {
        total += item.price
        const div = document.createElement("div")
                
        div.innerHTML = `${item.title} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">x</button>`
        cartList.appendChild(div)
    })
    cartTotal.textContent = total.toFixed(2)
    cartcount.textContent = cart.length
    
}


function removeFromCart(id){
cart.splice(id, 1)
updateCart()
}

document.getElementById("header_cart").addEventListener("click", () => {
    cartDisplay.style.display = cartDisplay.style.display === "flex" ? "none" : "flex"
})

document.getElementById("clear_btn").addEventListener("click", ()=> {
    cart = []
    updateCart()
})
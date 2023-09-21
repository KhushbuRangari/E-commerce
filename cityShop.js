//for shopping cart toggle
let shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick = () => {
  shoppingCart.classList.toggle('active');
}


// let adPrdBtnClickEve = document.querySelector('.addToCart');
// document.querySelector('#cart-btn').onclick=()=>{
//   adPrdBtnClickEve.toggle('active');
// } 




let content = document.querySelector(".content");
let showProductList = document.querySelector("#list1");
let showCategryProduct = document.querySelector("#categoryProduct");
let carousel1 = document.querySelector("#carousel1")
let category = document.querySelector(".custom-select")
let categorySelect = document.getElementById('#select')
let addToCart = Array.from(document.querySelectorAll(".addToCart"));
let cartBox = document.querySelector(".shopping-cart")
let searchInput = document.querySelector("#searchInput");
let searchShow = document.querySelector('#SerachProduct');


let carousel2 = document.querySelector("#carousel2");
var dataGlobal = [];
var categoryData = [];
var cartItems = [];

async function getData() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  dataGlobal = data.products;
  const newar = [];

  //----get distinct category ----
  for (let i = 0; i < dataGlobal.length; i++) {
    const element = dataGlobal[i].category;
    newar.push(element)
  }
  // -- distinct category --
  categoryData = newar.filter((ele, i, ar) => { return ar.indexOf(ele) === i })
  //  console.log(categoryData);

  //----------load carausel 2------------- 
  loadcarousel2();

  //-----------load category  -------------
  loadCategory();

}
function fetchproducts() {
  content.innerHTML = '';
  carousel1.innerHTML = '';

  dataGlobal.map((element) => {
    showProductList.innerHTML += `<div class="card product" style="font-size: 10px;width: 240px; height: 350px;
         margin: 6px; border: 2px solid  rgb(21, 37, 82)  box-shadow: 10px 3px 15px #464444;" id="${element.title}">
        <img class="prdImg" src="${element.thumbnail}" style="height: 100px; width: 100%" class="card-img-top" alt="...">
        <div class="card-body align-self-center" >
          <h5 class="card-title prdName" >${element.title}</h5>
          <p class="card-text" >${element.description}</p>
          <p class="card-text prdPrice" style="font-weight:bold" >Price: ${element.price}</p>
        
        </div>
        <a href="#" class="btn btn-outline-primary addToCart">Add to Cart</a>
      </div>
`
  })

  let addToCartButtons = document.querySelectorAll(".addToCart");


  addToCartButtons.forEach(button => {
    button.addEventListener('click', addCart);
  });

  carousel2.innerHTML += ``

}
async function loadCategory() {
  // category.innerHTML='';
  categoryData.forEach(element => {
    category.innerHTML += `<option class="dropdown-item" value="${element}" >${element}</option>`
  });


}

function selectOption() {
  let selected = category.value;
  content.innerHTML = '';
  carousel1.innerHTML = '';
  showProductList.innerHTML = '';



  for (let i = 0; i < dataGlobal.length; i++) {
    const element = dataGlobal[i].category;
    if (element === selected) {

      showProductList.innerHTML += `<div class="card product" style="font-size: 10px;width: 240px; height: 350px;
                   margin: 6px; border: 2px solid  rgb(21, 37, 82)  box-shadow: 10px 3px 15px #464444;" id="${dataGlobal[i].title}">
                  <img class="prdImg" src="${dataGlobal[i].thumbnail}" style="height: 100px; width: 100%" class="card-img-top" alt="...">
                  <div class="card-body align-self-center" >
                    <h5 class="card-title prdName" >${dataGlobal[i].title}</h5>
                    <p class="card-text" >${dataGlobal[i].description}</p>
                    <p class="card-text prdPrice" style="font-weight:bold" >Price: ${dataGlobal[i].price}</p>
               
                  </div>
                  <a href="#" class="btn btn-outline-primary addToCart">Add to Cart</a>
                </div>
          `
      let addToCartButtons = document.querySelectorAll(".addToCart");


      addToCartButtons.forEach(button => {
        button.addEventListener('click', addCart);
      });
    }
  }

}



function addCart(event) {

  //console.log(event.target.closest('div'));


  let itemtoAdd = event.target.closest('.product'); //find the closest parent of specified element
  //console.log(itemtoAdd);
  // now we found the parent element we can store info from elements in an object we need for our cart
  let cartItem = {
    id: itemtoAdd.id,
    img: itemtoAdd.querySelector('.prdImg').getAttribute('src'),
    name: itemtoAdd.querySelector('.prdName').textContent,
    price: itemtoAdd.querySelector('.prdPrice').textContent
  }

  // console.log(cartItem);

  //storing object data in an array 
  cartItems.push(cartItem);

  // console.log(cartItems);
  //now we have data stored in an array we are ready to call display function 
  displayCart();

}
function displayCart() {
  cartBox.innerHTML = ''; // Clear the cart contents

  cartItems.forEach((item) => {
      cartBox.innerHTML += `<div class="box">
          <i class="fa fa-trash" onclick="removeCart('${item.id}')"></i>
          <img src="${item.img}" alt="product">
          <div class="content">
              <h3>${item.name}</h3>
              <span class="price">${item.price}/-</span>
              <span class="quantity">Qty : 1</span>
          </div>
      </div>
  `;
  });

  let total = calculateTotal();
  cartBox.innerHTML += `<div class="total">Total: ${total}</div>`;
  cartBox.innerHTML += `<a href="#" class="btn">Checkout</a>`;
}




function removeCart(itemId) {
  // finding the product id which is added to the cart
  const index = cartItems.findIndex((item) => item.id === itemId);

  // if product exists remove it frm the cart
  if (index !== -1) {
      cartItems.splice(index, 1);
      //calling display cart again
      displayCart();
  }
}

function calculateTotal() {

  let total = 0;
  cartItems.forEach((item) => {
    total += parseFloat(item.price.replace('Price: ', '').replace('$', ''));
  })

  return `$${total.toFixed(2)}`;      //toFixed rounds the string to specified number of decimals
}


let randomNo1 = Math.floor(Math.random() * 30)
let randomNo2 = Math.floor(Math.random() * 30)
let randomNo3 = Math.floor(Math.random() * 30)



async function loadcarousel2() {


  let element = dataGlobal[randomNo1]
  let element2 = dataGlobal[randomNo2]
  let element3 = dataGlobal[randomNo3]
  console.log(randomNo1, 'cara2');


  carousel2.innerHTML += `   <div class="carousel-item active">
        <div class="row row-cols-1 row-cols-md-3 g-4"  >
          <div class="col">
            <div class="card" >
              <img
                src="${element.images[0]}"
                class="card-img-top" alt="Project 4">
           
            </div>
          </div>
          <div class="col">
            <div class="card">
              <img
                src="${element.images[1]}"
                class="card-img-top" alt="Project 5">
            
            </div>
          </div>
          <div class="col">
            <div class="card" >
              <img
                src="${element.images[2]}"
                class="card-img-top" alt="Project 6">
           
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-item ">
      <div class="row row-cols-1 row-cols-md-3 g-4"  >
        <div class="col">
          <div class="card" >
            <img
              src="${element2.images[0]}"
              class="card-img-top" alt="Project 4">
         
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img
              src="${element2.images[1]}"
              class="card-img-top" alt="Project 5">
          
          </div>
        </div>
        <div class="col">
          <div class="card" >
            <img
              src="${element2.images[2]}"
              class="card-img-top" alt="Project 6">
         
          </div>
        </div>
      </div>
    </div>
    <div class="carousel-item ">
    <div class="row row-cols-1 row-cols-md-3 g-4"  >
      <div class="col">
        <div class="card" >
          <img
            src="${element3.images[0]}"
            class="card-img-top" alt="Project 4">
       
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img
            src="${element3.images[1]}"
            class="card-img-top" alt="Project 5">
        
        </div>
      </div>
      <div class="col">
        <div class="card" >
          <img
            src="${element3.images[2]}"
            class="card-img-top" alt="Project 6">
       
        </div>
      </div>
    </div>
  </div>

`

}

//--------------Search Input----------------------
searchInput.addEventListener('input', searchproduct);

function searchproduct(event) {

  const searchedTerm = event.target.value.toLowerCase();
  console.log(searchedTerm);
  dataGlobal.filter((item) => {
    if (item.title.toLowerCase().includes(searchedTerm)) {
      console.log(item);
      content.innerHTML = '';
      carousel1.innerHTML = '';

      showProductList.innerHTML += `<div class="card product" style="font-size: 10px;width: 240px; height: 350px;
            margin: 6px; border: 2px solid  rgb(21, 37, 82)  box-shadow: 10px 3px 15px #464444;" id="${item.title}">
          <img class="prdImg" src="${item.thumbnail}" style="height: 100px; width: 100%" class="card-img-top" alt="...">
          <div class="card-body align-self-center" >
            <h5 class="card-title prdName" >${item.title}</h5>
            <p class="card-text" >${item.description}</p>
            <p class="card-text prdPrice" style="font-weight:bold" >Price: ${item.price}</p>
        
          </div>
          <a href="#" class="btn btn-outline-primary addToCart">Add to Cart</a>
        </div>
      `
      let addToCartButtons = document.querySelectorAll(".addToCart");


      addToCartButtons.forEach(button => {
        button.addEventListener('click', addCart);
      });
      // return item;
    }
    if (item.brand.toLowerCase().includes(searchedTerm)) {
      // console.log(item);  
      showProductList.innerHTML += `<div class="card product" style="font-size: 10px;width: 240px; height: 350px;
            margin: 6px; border: 2px solid  rgb(21, 37, 82)  box-shadow: 10px 3px 15px #464444;" id="${item.title}">
          <img class="prdImg" src="${item.thumbnail}" style="height: 100px; width: 100%" class="card-img-top" alt="...">
          <div class="card-body align-self-center" >
            <h5 class="card-title prdName" >${item.title}</h5>
            <p class="card-text" >${item.description}</p>
            <p class="card-text prdPrice" style="font-weight:bold" >Price: ${item.price}</p>
        
          </div>
          <a href="#" class="btn btn-outline-primary addToCart">Add to Cart</a>
        </div>
      `
      let addToCartButtons = document.querySelectorAll(".addToCart");


      addToCartButtons.forEach(button => {
        button.addEventListener('click', addCart);
      });
    }
  })
}











let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Adds products to cart
let addToCart = (e) => {
    const product = e.target.closest(".product");
    const productId = product.dataset.id;
    const productName = product.dataset.name;
    const productPrice = parseFloat(product.dataset.price).toFixed(2); 

    let item = cart.find(item => item.id === productId);
    if (item) {
    item.quantity++;
    } else {
    cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// pushes pproduct to storage
function renderCart() {
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById('total-price')
    const totalQuantityElement = document.getElementById('total-quantity')
    const emptyCart = document.getElementById('empty-cart')
    const carbonDiv = document.getElementById('carbon-div')
    cartList.innerHTML = "";

    let totalPrice = 0;
    let totalQuantity = 0;

    if (cart.length == 0) {
        carbonDiv.classList.add('hidden')
        emptyCart.classList.remove('hidden')
    } else{
        carbonDiv.classList.remove('hidden')
        emptyCart.classList.add('hidden')
    }

    cart.forEach((item, index) => {
      let priceTotal = item.price * item.quantity
      let li = document.createElement("li");
      li.className = "flex justify-between border-b border-b-rose-100 py-4 mb-4 w-[80%] mx-auto"
      li.innerHTML = `<div><h2 class="font-semibold text-lg">${item.name}</h2>
          <p class="my-2"><span class="text-rose-400 font-semibold pr-1">${item.quantity}</span> 
            <span class="text-rose-200 p-1">@$${item.price}</span> 
            <span class="font-semibold text-rose-300 p-1">$${priceTotal.toFixed(2)}</span>
          </p>
        </div>
        <button class="border-2 border-solid border-rose-200 rounded-full w-5
         h-5 my-auto" onclick="removeFromCart(${index})">
          <img src="assets/images/icon-remove-item.svg" alt="" width="15px"></button>`
      cartList.appendChild(li);

      totalPrice += item.price * item.quantity
      totalQuantity += item.quantity

      updateButtonText(); 

    });

    totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
    totalQuantityElement.innerText = `Your Cart (${totalQuantity})`
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // remove a product from cart
  function removeFromCart(index) {
    cart.splice(index, 1);  // Remove item from cart array
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
  
  //clear cart
  function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
    updateButtonText();
  }

  //updates add cart button
  function updateButtonText() {
    document.querySelectorAll(".product").forEach(product => {
      const productId = product.dataset.id;
      const div = product.querySelector(".add-to-cart");
      const item = cart.find(item => item.id === productId);
      
  
      if (item) {
        div.innerHTML = `
        <button onclick="decrementQuantity('${productId}')"><img src="assets/images/icon-decrement-quantity.svg" alt="" class="border border-solid rounded-full py-2 px-1"></button>
        <span>${item.quantity}</span>
        <button onclick="incrementQuantity('${productId}')"><img src="assets/images/icon-increment-quantity.svg" alt="" class="border border-solid rounded-full p-1"></button>`;
        div.classList.add('bg-rose-300', 'text-white', 'justify-between')
        div.classList.remove('bg-white', 'justify-center')
      }else {
        div.innerHTML = `<button><img src="assets/images/icon-add-to-cart.svg" alt="Add to Cart icon" class="pr-2"> Add to Cart</button>`
        div.classList.remove('bg-rose-300', 'text-white', 'justify-between')
        div.classList.add('bg-white', 'justify-center')
      }
    });
  }

  // increase number of product to cart
  function incrementQuantity(productId) {
    let item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }
  }
  
  // decrease number of product in cart
  function decrementQuantity(productId) {
    let item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
        item.quantity--;
        } else {
        cart = cart.filter(item => item.id !== productId); // Remove item if quantity reaches 0
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
  }
  
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", addToCart);
  });
  
  renderCart();
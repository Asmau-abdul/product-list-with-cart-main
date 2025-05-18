import { cart, pastries, addToCart, removeFromCart, clearCart } from "./pastries.js";
import { priceCent } from "./utils.js";

//accessing pastry options
let pastryOptions = document.querySelector('.pastry-options')

//add pastries from database
pastries.forEach((pastry) => {
    pastryOptions.innerHTML += `
        <div class="mb-7">
        <div>
          <picture>
            <source media="(min-width: 768px)" srcset="assets/images/image-${pastry.image}-tablet.jpg">
            <source media="(min-width: 1024px)" srcset="assets/images/image-${pastry.image}-desktop.jpg">
            <img class="rounded-xl" src="assets/images/image-${pastry.image}-mobile.jpg" alt="waffles">
          </picture>
        </div>
        <div class="-mt-5 pb-4 flex justify-center">
          <button class="font-semibold text-sm border border-rose-300 py-2 px-7
          rounded-3xl bg-white js-add-to-cart" 
          data-pastry-name="${pastry.name}" 
          data-pastry-price="${pastry.price}"
          data-pastry-shortname="${pastry.image}"">
         <img class="inline pr-2" src="assets/images/icon-add-to-cart.svg" alt="">
         Add to Cart</button>
        </div>
        <p class="text-rose-300 text-sm">${pastry.shortName}</p>
        <h2 class="font-semibold">${pastry.name}</h2>
        <p class="text-rose-500 font-medium">$${priceCent(pastry.price)}</p>
      </div>
    `
})

// update cart quantity

let cartQuantity = document.querySelector('.js-quantity')

function updateCartQuantity(quantity){

    let quantitySum = 0;

    cart.forEach((item) => {
    quantitySum += item.quantity
    })

    cartQuantity.innerHTML = quantitySum
    let emptyCart = document.querySelector('.js-empty-cart')
    let carbonNeutral = document.querySelector('.js-carbon-neutral')

    if(quantitySum == 0){
        emptyCart.classList.remove("hidden")
        carbonNeutral.classList.add('hidden')
    }else{
        emptyCart.classList.add("hidden")
        carbonNeutral.classList.remove('hidden')
    }
}

//add to cart functionality
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {

        let pastryName = button.dataset.pastryName
        let pastryPrice = button.dataset.pastryPrice
        let pastryShortname = button.dataset.pastryShortname

        addToCart(pastryName, pastryPrice, pastryShortname)
        updateCartQuantity()
        updateCart()
    })
})


    // update checkout cart
    function updateCart(){

    // cart checkout
    let checkoutCart = document.querySelector('.js-checkout-cart')
    let orderConfirmed = document.querySelector('.js-order-confirmed')

    let orderTotal = document.querySelector('.js-order-total')
    let orderTotalConfirmed = document.querySelector('.js-order-confirmed-total')
    let orderTotalSum = 0

    //adds pastry to cart
        checkoutCart.innerHTML = ''
        orderConfirmed.innerHTML = ''
        
        cart.forEach((item) => {

            let priceSum = item.price * item.quantity

            checkoutCart.innerHTML += `
            <li class="flex justify-between py-10 text-xs 
            border-b-2 border-rose-100 js-cart-item-${item.shortName}">
                <div class="w-[50%]">
                  <h2 class="font-semibold pb-3">${item.pastryName}</h2>
                  <div class="flex justify-between">
                    <p class="text-rose-500 font-medium">${item.quantity}x</p>
                    <p class="text-rose-100">@$${priceCent(item.price)}</p>
                    <p class="text-rose-300">$${priceCent(item.price * item.quantity)}</p>
                  </div>
                </div>
                <div class="my-auto">
                  <button class="js-delete" data-pastry-delete="${item.shortName}">
                  <img class="border border-rose-300 p-[2px] rounded-[100%]" src="assets/images/icon-remove-item.svg" >
                    </button>
                </div>
              </li>
        `;

        // cart for confirm order
        orderConfirmed.innerHTML += `
            <li class="flex justify-between py-10 text-xs 
            border-b-2 border-rose-50 js-cart-item-${item.shortName}">
                <div>
                    <img class="p-[2px] rounded-lg" src="assets/images/image-${item.shortName}-thumbnail.jpg" >
                </div>
                <div class="w-[50%]">
                  <h2 class="font-semibold text-lg pt-2 pb-7">${item.pastryName}</h2>
                  <div class="flex justify-around text-lg">
                    <p class="text-rose-500 font-medium pr-2">${item.quantity}x</p>
                    <p class="text-rose-300">@$${priceCent(item.price)}</p>
                  </div>
                </div>
                <div class="my-auto">
                  <p class="text-lg font-medium">$${priceCent(item.price * item.quantity)}</p>
                </div>
              </li>
        `;

        orderTotalSum += Number(priceSum)
        })

        orderTotal.innerHTML = `$${priceCent(orderTotalSum)}`
        orderTotalConfirmed.innerHTML = `$${priceCent(orderTotalSum)}`

        updateCartQuantity()
        //deletes pastry from cart
        document.querySelectorAll('.js-delete').forEach((deleted) => {
            deleted.addEventListener('click', () => {
                let deleteButton = deleted.dataset.pastryDelete
                removeFromCart(deleteButton)
                let container = document.querySelector(`.js-cart-item-${deleteButton}`)
                container.remove()
                updateCart()
            })
        })
    }

    updateCart()

    // checkout element in html
    let checkoutConfirmedOrder = document.querySelector('.js-checkout-confirmed-order')

    // confirm order button
    let confirmOrder = document.querySelector('.js-confirm-order')
    confirmOrder.addEventListener('click', () => {
        checkoutConfirmedOrder.classList.remove('hidden')
    })

    // start new order button
    let startNewOrder = document.querySelector('.js-new-order')
    startNewOrder.addEventListener('click', () => {
        checkoutConfirmedOrder.classList.add('hidden')
        clearCart()
        updateCart()
    })
export let pastries = [{
    name: 'Waffle with Berries',
    shortName: 'Waffle',
    price: 650,
    image: 'waffle'
},{
    name: 'Vanilla Bean Crème Brûlée',
    shortName: 'Crème Brûlée',
    price: 700,
    image: 'creme-brulee'
},{
    name: 'Macaron Mix of Five',
    shortName: 'Macaron',
    price: 550,
    image: 'macaron'
},{
    name: 'Classic Tiramisu',
    shortName: 'Tiramisu',
    price: 550,
    image: 'tiramisu'
},{
    name: 'Pistachio Baklava',
    shortName: 'Baklava',
    price: 400,
    image: 'baklava'
},{
    name: 'Lemon Meringue Pie',
    shortName: 'Pie',
    price: 500,
    image: 'meringue'
},{
    name: 'Red Velvet Cake',
    shortName: 'Cake',
    price: 500,
    image: 'cake'
},{
    name: 'Salted Caramel Brownie',
    shortName: 'Brownie',
    price: 450,
    image: 'brownie'
},{
    name: 'Vanilla Panna Cotta',
    shortName: 'Panna Cotta',
    price: 650,
    image: 'panna-cotta'
}]


export let cart = JSON.parse(localStorage.getItem('cart')) || []

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(pastryName, pastryPrice, shortName){
    let matchingItem;
            
    cart.forEach((item) => {
        if(pastryName == item.pastryName){
            matchingItem = item
        }
    })

    if(matchingItem){
        matchingItem.quantity += 1
    }else{
        cart.push({
            pastryName: pastryName,
            quantity: 1,
            price: pastryPrice,
            shortName: shortName
        })
    }

    saveToStorage()
}

export function removeFromCart(shortName){
    let newCart = []
    cart.forEach((cartItem) => {
        if(cartItem.shortName !==shortName){
            newCart.push(cartItem)
        }
    })

    cart = newCart

    saveToStorage()
}

export function clearCart(){
    cart = []
    saveToStorage()
}
const cartButton = document.querySelector('[data-cart-button]')
const cartItemsWrapper = document.querySelector('[data-cart-items-wrapper]')
let shoppingCart = []

export function setupShoppingCart() {

}


// remove items from cart
// showcart when it it empty/not-empty
// persist across multiple pages
// calculate accurate total
// handle multiple of the same item in the cart

// 1. show/hide cart when clicked //start here bec easiest

cartButton.addEventListener('click', () => {
    cartItemsWrapper.classList.toggle("invisible")
})
// 2. add items to cart // Kyle does same order as me so far
   //  // handle click events for adding
   //  // handle multiple of same item in the cart
   //  // calculate an accurate total

export function addToCart(id) {
    shoppingCart.push({id: id, quantity: 1})
    console.log(shoppingCart)
}
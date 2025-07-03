import items from '../../items.json'

const strItemTemplate = document.querySelector('.strItemTemplate')
const containerOfStrItems = document.querySelector('.itemsContainer')
const addItemBtn = document.querySelectorAll('.addBtnStoreItem')
let totalCartCount = 0;


/// ^^ popupDisplayContainer, previously named "specific"
///////////////////////////////////////////////////////////////////////////////////////////////
/// ADDING countInCart PROPERTY TO THE JSON OBJECTS
items.forEach(item => {
item.countInCart = 0
})

//////////// LOADING STORE.HTML DATA
const path = window.location.pathname;
if (path.endsWith("store.html")) {
items.forEach(item => {
  const clone = strItemTemplate.content.cloneNode(true);
  clone.querySelector('.imgClass').src = `https://dummyimage.com/420x260/${item.imageColor}/${item.imageColor}`;
  clone.querySelector('.colorCategory').innerText = item.category;
  clone.querySelector('.colorLabel').innerText = item.name;
  clone.querySelector('.colorPriceAsCents').innerText = `$${(item.priceCents / 100).toFixed(2)}`;

  containerOfStrItems.appendChild(clone);
});
}

///////////////////////////// FETCHING BASIC POPUP 

fetch('/popup.html?version=' + Date.now()) 
  .then(response => {
    if (response.ok) {
      return response.text(); 
    }
    throw response;
  })
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
    
    initializeShoppingCart()

    const cartIcon = document.querySelector('#shoppingCartIcon');
    const cartCountIndicator = document.querySelector('#cartCountIndicator');
    const popupContent = document.querySelector('#popupContent');
    const entireBtnAndPopup = document.querySelector('#entireBtnAndPopup');

    if (cartIcon && popupContent) {
      cartIcon.addEventListener("click", () => {
        popupContent.classList.toggle('invisible');
      });
    }

    if (cartCountIndicator && entireBtnAndPopup && cartCountIndicator.innerText === "0") {
      // entireBtnAndPopup.style.display = "none";
    }

  })
  .catch(error => {
    console.error('Error loading external content:', error);
  });
///////////////////////////////////////////////////
// make function to iterate thru JSON, create one Popup-item HTML element for each JSON object, and assign a UNIQUE IDENTIFIER to each HTML element corresponding to the JSON id

// assign a data-attribute or ID for each JSON-ID 
// assign normal id's/classes for name(red), priceCents, and imgageColor
function initializeShoppingCart() { 
  let popupEachItemTemplate = document.querySelector('.popupEachItemTemplate')
  let popupDisplayContainer = document.querySelector('.displayContainer')

  items.forEach(item => {
    
    let eachCartItem = popupEachItemTemplate.content.cloneNode(true);
    eachCartItem.id = item.id
    eachCartItem.querySelector('.color').innerText = item.name;
    eachCartItem.querySelector('.itemCount').innerText = `x ${item.countInCart}`
    eachCartItem.querySelector('.totalPriceOfItem').innerText = `$${(item.priceCents/100).toFixed(2) * item.countInCart}`
    eachCartItem.querySelector('.cartItemImg').src =`https://dummyimage.com/210x130/${item.imageColor}/${item.imageColor}`

    popupDisplayContainer.appendChild(eachCartItem)

})
} 

containerOfStrItems.addEventListener('click', (event) => {
  if (event.target.matches('.addBtnStoreItem')) {
     console.log('clicked')
    items.forEach(
      item => {
        if (event.target.dataset.id === item.id) {
          if (item.countInCart === 0) {
            totalCartCount += 1;
            const cartCountIndicator = document.querySelector('#cartCountIndicator');
            cartCountIndicator.innerText = totalCartCount;

            item.countInCart += 1;
          } else if (item.countInCart > 0) {
            item.countInCart += 1;
          }

          // item.countInCart += 1; // Increment the countInCart for the clicked item
          const popupDisplayContainer = document.querySelector('.displayContainer');
          const existingItem = popupDisplayContainer.querySelector(`#${item.id}`);
          
          const entireBtnAndPopup = document.querySelector('#entireBtnAndPopup');
          entireBtnAndPopup.style.display = "block";
          
          if (existingItem) {
            // Update existing item's count and total price
            existingItem.querySelector('.itemCount').innerText = `x ${itemcountInCart}`;
            existingItem.querySelector('.totalPriceOfItem').innerText = `$${(itempriceCents / 100 * item.countInCart).toFixed(2)}`;
          } else {
            // If item doesn't exist in the popup, create it
            initializeShoppingCart();
          }
        }
      }
    )
}
})





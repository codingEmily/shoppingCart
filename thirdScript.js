import items from './items.json'

const strItemTemplate = document.querySelector('.strItemTemplate')
const containerOfStrItems = document.querySelector('.itemsContainer')
let cartTotalCounter = 0
let totalCartCountForCartIndicator = 0;
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
  clone.querySelector('.addBtnStoreItem').id = `addItemBtn-${item.id}`

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

    const cartIcon = document.querySelector('#shoppingCartIcon');
    const cartCountIndicator = document.querySelector('#cartCountIndicator');
    const popupContent = document.querySelector('#popupContent');
    const entireBtnAndPopup = document.querySelector('#entireBtnAndPopup');
    const cartTotalDisplay = document.querySelector('.cartTotal')


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


if (path.endsWith("store.html")) {
  containerOfStrItems.addEventListener("click", (event) => {
    if (event.target.matches('.addBtnStoreItem')) {

      items.forEach(item => {
        if (event.target.id == (`addItemBtn-${item.id}`)) {
          if (item.countInCart === 0) { // add item before counting up
          //  item.countInCart++;
          addNewItem(item)
          totalCartCountForCartIndicator++;
          cartCountIndicator.innerText = totalCartCountForCartIndicator
          } else if (item.countInCart >= 1) {
            // item.countInCart++
            addToExistingItem(item)
          }
          console.log(`${item.name} ${event.target.id} ${item.name}  ${item.countInCart}`)
        }
      })

    } else {
      return
    }
  })  
}



function addNewItem(item) {
  item.countInCart++;
  let popupEachItemTemplate = document.querySelector('.popupEachItemTemplate')
  let popupDisplayContainer = document.querySelector('.displayContainer')
  
  let eachCartItem = popupEachItemTemplate.content.cloneNode(true).firstElementChild
  let price = (item.priceCents/100).toFixed(2) * item.countInCart

  eachCartItem.id = `cartItem-${item.id}`
  eachCartItem.querySelector('.color').innerText = item.name;
  eachCartItem.querySelector('.itemCount').innerText = `x ${item.countInCart}`
  eachCartItem.querySelector('.totalPriceOfItem').innerText = `$${price}`
  eachCartItem.querySelector('.cartItemImg').src =`https://dummyimage.com/210x130/${item.imageColor}/${item.imageColor}`

  popupDisplayContainer.appendChild(eachCartItem)
  const cartTotalDisplay = document.querySelector('.cartTotal')

  cartTotalCounter += price
  cartTotalDisplay.innerText = `$${cartTotalCounter}`

}

function addToExistingItem(item) {
  item.countInCart++;
  // let popupEachItemTemplate = document.querySelector('.popupEachItemTemplate')
  const popupDisplayContainer = document.querySelector('.displayContainer')
  const cartTotalDisplay = document.querySelector('.cartTotal')

  if (popupDisplayContainer.querySelector(`#cartItem-${item.id}`)) {
    let selectedItem = popupDisplayContainer.querySelector(`#cartItem-${item.id}`)
    // console.log(popupDisplayContainer.querySelector(`#cartItem-${item.id}`))
    let price =  (item.priceCents/100).toFixed(2) * item.countInCart

    selectedItem.querySelector('.itemCount').innerText = `x ${item.countInCart}`
    selectedItem.querySelector('.totalPriceOfItem').innerText = `$${price}`;

    cartTotalCounter += (item.priceCents/100)
    cartTotalDisplay.innerText = `$${cartTotalCounter}`


  } else {
    console.error("Error, probabably can't find the item in cart, at addToExistingItem function in the running script", Error)
  }
}




//// ADDING ITEMS TO THE SHOPPING CART
  /// create a button click event listener for each addNewItemBtn, but set event listener on 'containerOfStrItems' to avoid multiple event listeners AND because the container always exists, but the store-generated btns don't exist at first

  /// on the event listener, if strBtn is clicked, create a cloned node FOR THE CORRESPONDING JSON OBJECT, and then add it to the shoppingCart-Popup html, 
  // 
  // and then always update the indItemCounter and the JSON counter -> and IF APPLICABLE -> update the cartCountIndicator 

  // TO AVOID AN INFINITE LIST (aka to avoid creating a NEW LIST each time an item is added, and appending that whole lsit to the already existing list...)
  // either A- utilize matching id's to remove previous version of updated item before adding the updated item,

  // or B - use id's (?) to update pre-existing elements from the get-go
//////////////////////////////////////////////////////////////////////////////////
// DON'T AVOID LEARING- ASSUME ALL THINGS ARE POSSIBLE, AND MAYBE EVEN EASY- if *I* want a thing to exist, it probably exists >>> now, what do I want to accomplish?
// I want to -on onclick, create an HTML element with a UNIQUE ID, that MATCHES the BUTTON ID, that MATCHES the STORE element ID, etc and etc. Items and add/remove btns ALL HAVE ID'S that correspond to their JSON element ID's
// When I add a second item to a pre-existing item in the cart, I want to SELECT THAT EXISTING element, and update its innerText stuff (count, price) and the cart's total price at the button. Same-but-reverse on removing items, done on the 'x' btn click event
// when I remove the last of an existing item from the cart, I want to delete all of that element from the cart, based on it's ID
// if the cart is EMPTY, I want to HIDE EVERYTHING, as soon as one item is in the cart, I want to display the cartIcon (and its cartCountIndicator), but the full popup only toggles on when the cartIcon is clicked (or I could switch to the event being on hover)
/////////////////////////////////////////////////////////////////////////////////




  //// REMOVING ITEMS FROM THE SHOPPING CART
  // create a button click event listener for each removeItemBtn, but set event listener on 'popupContent' to avoid multiple event listeners AND because the popupContainer always exists, but the user-generated btns for each item don't exist at first

  /// on the event listener, if removeBtn is clicked, remove the corresponding item from the shoppingCart-Popup html, and then update the indItemCounter and the JSON counter -> and IF APPLICABLE -> update the cartCountIndicator


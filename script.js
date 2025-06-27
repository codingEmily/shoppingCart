import items from './items.json';
// import popupHTML from './popup.html'

const strItemTemplate = document.querySelector('.strItemTemplate');
const containerOfStrItems = document.querySelector('.itemsContainer');

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
//////////////////////////////////////                   ///////////////
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

    if (cartIcon && popupContent) {
      cartIcon.addEventListener("click", () => {
        popupContent.classList.toggle('invisible');
      });
    }

    if (cartCountIndicator && entireBtnAndPopup && cartCountIndicator.innerText === "0") {
      entireBtnAndPopup.style.display = "none";
    }

  })
  .catch(error => {
    console.error('Error loading external content:', error);
  });

////////////////// ///////////////////                   ///////////////
let shoppingCartArray = [];

class ShoppingCartClass {
  constructor(id, itemName, category, priceCents, imageColor, countInCart) {

    this.id = id;
    this.itemName = itemName;
    this.category = category;
    this.priceCents = priceCents;
    this.imageColor = imageColor;
    this.countInCart = countInCart
  }
} 

function initializeShoppingCartArray() {
  items.forEach(item => {
  item.countInCart = 0 

  let cartItem = new ShoppingCartClass (
    `${item.id}`,
    `${item.name}`,
    `${item.category}`,
    `${item.priceCents}`,
    `${item.imageColor}`,
    0,
  )

  shoppingCartArray.push(cartItem)
})
} initializeShoppingCartArray()

function updateShoppingCartArray() {
  for (let i = 0; i < shoppingCartArray.length; i++) {
    items.forEach(item => {
      if (item.id === (i + 1)) {
        shoppingCartArray[i].countInCart = item.countInCart 
        // console.log(shoppingCartArray[i].countInCart)
      }
    })
  }
} 
// updateShoppingCartArray()


const addItemBtn = document.querySelectorAll('.addBtnStoreItem')

function addItem() {
  addItemBtn.forEach(button => {
      button.addEventListener("click", () => {
        items.forEach(item => {
          if (item.name == button.closest('.infoAndBtnStoreItem').querySelector('.colorLabel').innerText) {
            item.countInCart++
            // console.log(`${item.countInCart} ${item.name}`)
            // console.log((shoppingCartArray[5].countInCart))
          }
        })

    let popupEachItemTemplate = document.querySelector('.popupEachItemTemplate')
    let specific = document.querySelector('.specific')

    let filteredArray = loadShoppingCartItems(shoppingCartArray)
    filteredArray.forEach(item => {
            const clonedCartItem = popupEachItemTemplate.content.cloneNode(true)
            clonedCartItem.querySelector('.color').innerText = item.name;
            clonedCartItem.querySelector('.itemCount').innerText = `x ${item.countInCart}`
            clonedCartItem.querySelector('.totalPriceOfItem').innerText = `$${(item.priceCents/100).toFixed(2) * item.countInCart}`
            clonedCartItem.querySelector('.cartItemImg').src =`https://dummyimage.com/210x130/${item.imageColor}/${item.imageColor}`

            if (
              // !specific.contains(clonedCartItem) && 
              clonedCartItem.querySelector('.totalPriceOfItem').innerText != "$0" 
              ) {
              specific.appendChild(clonedCartItem)
            }
            
    })

      })
    })


}  addItem()




function loadShoppingCartItems(array) {
  updateShoppingCartArray()
// map or similar method would be better than loop for practice's sake
let newArray = [];
for (let i = 0; i < array.length; i++) {
  if (!Number(array[i].countInCart) > 0) {
    // console.log((array[i]))
    newArray.push(array[i])
  }
}
  return newArray
} 


//////////////













































































  ///////////////////////////////                      ///////////////

    // get items, individually
// get the cart icon & cart icon counterImage

// get the cart pop-up 
//  - whole pop-up module
//  - each "item" element
//  - "x" btn for removing items

// create variables to count numberOfEachItem
// create variable to count numberOfTypes
////////////////////////////////////////////////////////////////////////////////////////////////

///// EXAMPLE CODE for checking which page the user is on/which file is running////////////////////
// const path = window.location.pathname;

// if (path.endsWith("index.html")) {
//   // document.getElementById("home-title").textContent += " - Home Page";

// } else if (path.endsWith("store.html")) {
//   // document.getElementById("about-title").textContent += " - About Page";

// } else if (path.endsWith("team.html")) {
//   // document.getElementById("contact-title").textContent += " - Contact Page";

// }



// let itemsData
// fetch('./items.json')
// .then(response => response.json()
// )
// .then(data => {
//     itemsData = data; /// stores data array of object in "itemsData"
//     console.log(data)
// })
// .catch(error => console.error('Error fetching JSON', error))


// const xItemBtnsArray = Array.from(document.querySelectorAll('#xItemBtn')) //this id not added to any elements yet
// xItemBtnsArray.forEach(btn => btn.style = "display: none")

// cartCountIndicator.innerText = "0"

// if (cartCountIndicator.innerText == "0") {
//   alert("cartCountIndicator.innerText = '0'")
//  popup.style.display = "none"   
// }



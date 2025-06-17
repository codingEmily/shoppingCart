// get items, individually
// get the cart icon & cart icon counterImage

// get the cart pop-up 
//  - whole pop-up module
//  - each "item" element
//  - "x" btn for removing items

// create variables to count numberOfEachItem
// create variable to count numberOfTypes


fetch('items.json')
.then(response => response.json())
.then(data => {
    itemsData = data; /// stores data array of object in "itemsData"
})
.catch(error => console.error('Error fetching JSON', error))

const cartButton = document.querySelector('#shoppingCartBtn')/// only works on index.html
const cartCountIndicator = document.querySelector('#cartCountIndicator')//// only works on homepage -aka- index.html
const popup = document.querySelector('#popup') /// only applies to elements on index.html, regardless of ID

const xItemBtnsArray = Array.from(document.querySelectorAll('#xItemBtn'))
xItemBtnsArray.forEach(btn => btn.style = "display: none")

cartCountIndicator.innerText = "0"

if (cartCountIndicator.innerText == "0") {
 popup.style.display = "none"   
}



// get items, individually
// get the cart icon & cart icon counterImage

// get the cart pop-up 
//  - whole pop-up module
//  - each "item" element
//  - "x" btn for removing items

// create variables to count numberOfEachItem
// create variable to count numberOfTypes

///// EXAMPLE CODE for checking which page the user is on/which file is running
const path = window.location.pathname;

if (path.endsWith("index.html")) {
  document.getElementById("home-title").textContent += " - Home Page";
} else if (path.endsWith("about.html")) {
  document.getElementById("about-title").textContent += " - About Page";
} else if (path.endsWith("contact.html")) {
  document.getElementById("contact-title").textContent += " - Contact Page";
}

// Example code for inserting popup file
fetch('/popup.html')
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
  });




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



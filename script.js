
  //////// cannot be serious. This is working now when it didn't before!!!!
fetch('popup.html')
  .then(response => {
    if (response.ok) {
      return response.text(); // Get the response as text (HTML string)
    }
    throw response;
  })
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
  })
  .catch(error => {
    console.error('Error loading external content:', error);
  });

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


let itemsData
fetch('items.json')
.then(response => response.json())
.then(data => {
    itemsData = data; /// stores data array of object in "itemsData"
})
.catch(error => console.error('Error fetching JSON', error))

const cartIcon = document.querySelector('.shoppingCartIcon')/// only works on index.html
const cartCountIndicator = document.querySelector('.cartCountIndicator')//// only works on homepage -aka- index.html
const popup = document.querySelector('#popupContent') /// only applies to elements on index.html, regardless of ID

const xItemBtnsArray = Array.from(document.querySelectorAll('#xItemBtn')) //this id not added to any elements yet
xItemBtnsArray.forEach(btn => btn.style = "display: none")

cartCountIndicator.innerText = "0"

if (cartCountIndicator.innerText == "0") {
  alert("cartCountIndicator.innerText = '0'")
 popup.style.display = "none"   
}



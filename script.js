let popupHTML;

fetch('/popup.html')
  .then(response => {
    if (response.ok) {
      return response.text(); 
    }
    throw response;
  })
  .then(html => {
    popupHTML = html
    console.log(html)
    document.body.insertAdjacentHTML('beforeend', popupHTML);

let shoppingCartIcon = document.querySelector('#shoppingCartIcon');
let cartCountIndicator = document.querySelector('#cartCountIndicator');
let popupContent = document.querySelector('#popupContent') ;
let cartIconParentDiv = document.querySelector('#cartIcon')

shoppingCartIcon.addEventListener("click", () => {
  popupContent.classList.toggle('invisible')
})

// cartCountIndicator.innerText = "0"
// if (cartCountIndicator.innerText == "0") {
//   alert("cartCountIndicator.innerText = '0'")
//  popupContent.style.display = "none"   
// }


  })
  .catch(error => {
    console.error('Error loading external content:', error);
  });
  


// fetch('./popup.html')
// .then(response => {
//     if (response.ok) {
// cartIcon
// cartCountIndicator = document.querySelector('.cartCountIndicator')
// popup = document.querySelector('#popupContent')     

// cartIcon.addEventListener("click", () => {
//   popup.classList.toggle(invisible)
// })

//     }
//     throw response;
//   }

// )



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



import items from './items.json';
import popupHTML from './popup.html'

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

////////////////// ///////////////////                   ///////////////
fetch('/popup.html?version=' + Date.now()) // ⬅ you had a typo here, was `/version`
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



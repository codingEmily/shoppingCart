let popupHTML;

// import data from './items.json'
// // // import importedPopup from './popup.html'

// const container = document.querySelector('.itemsContainer')
// const template = document.querySelector('.strItemTemplate')

// data.forEach(item => {
//   const clone = template.content.cloneNode(true); // add "content." after "template." ?

//   const img = clone.querySelector('.imgClass')
//   img.src = `https://dummyimage.com/420x260/${item.imageColor}/${item.imageColor}`

//   clone.querySelector('.colorCategory').innerText = item.category
//   clone.querySelector('.colorLabel').innerText = item.name
//   clone.querySelector('.colorPriceAsCents').innerText = item.priceCents
//   // clone.querySelector('.colorBtn').innerText = `Buy ${item.name}`

//   container.appendChild(clone)

// })


////////////////// ///////////////////                   ///////////////
fetch('/popup.html')
  .then(response => {
    if (response.ok) {
      return response.text(); 
    }
    throw response;
  })
  .then(html => {
    popupHTML = html
    document.body.insertAdjacentHTML('beforeend', popupHTML);

let cartIcon = document.querySelector('#shoppingCartIcon');
let cartCountIndicator = document.querySelector('#cartCountIndicator');
let popupContent = document.querySelector('#popupContent') ;
let entireBtnAndPopup = document.querySelector('#entireBtnAndPopup')
 cartIcon.addEventListener("click", () => {
  popupContent.classList.toggle('invisible')
})

// cartCountIndicator.innerText = "0"
if (cartCountIndicator.innerText == "0") {
  // alert("cartCountIndicator.innerText = '0'")
 entireBtnAndPopup.style.display = "none"   
}


  }) // this is WHERE IT SHOULD BE!! The above code is appropriately all w/in one .then(promise)
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



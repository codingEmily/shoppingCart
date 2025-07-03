
// import items from '../items.json';

// const strItemTemplate = document.querySelector('.strItemTemplate');
// const containerOfStrItems = document.querySelector('.itemsContainer');
// const cartCountIndicator = document.querySelector('#cartCountIndicator');
// let totalCartCount = 0;

// // Add countInCart to each item
// items.forEach(item => {
//   item.countInCart = 0;
// });

// // Load store items if on store page
// if (window.location.pathname.endsWith("store.html")) {
//   items.forEach(item => {
//     const clone = strItemTemplate.content.cloneNode(true);
//     clone.querySelector('.imgClass').src = `https://dummyimage.com/420x260/${item.imageColor}/${item.imageColor}`;
//     clone.querySelector('.colorCategory').innerText = item.category;
//     clone.querySelector('.colorLabel').innerText = item.name;
//     clone.querySelector('.colorPriceAsCents').innerText = `$${(item.priceCents / 100).toFixed(2)}`;
//     clone.querySelector('.addBtnStoreItem').dataset.id = item.id;

//     containerOfStrItems.appendChild(clone);
//   });
// }

// // Load popup HTML
// fetch('/popup.html?version=' + Date.now())
//   .then(res => res.text())
//   .then(html => {
//     document.body.insertAdjacentHTML('beforeend', html);
//     initializeShoppingCart();
//   });

// function initializeShoppingCart() {
//   const popupEachItemTemplate = document.querySelector('.popupEachItemTemplate');
//   const popupDisplayContainer = document.querySelector('.displayContainer');

//   containerOfStrItems.addEventListener('click', e => {
//     if (!e.target.matches('.addBtnStoreItem')) return;

//     const id = e.target.dataset.id;
//     const item = items.find(i => i.id === id);
//     if (!item) return;

//     item.countInCart++;
//     totalCartCount++;
//     cartCountIndicator.innerText = totalCartCount;

//     let existingItem = popupDisplayContainer.querySelector(`[data-id="${item.id}"]`);

//     if (!existingItem) {
//       const clone = popupEachItemTemplate.content.cloneNode(true);
//       clone.querySelector('.color').innerText = item.name;
//       clone.querySelector('.itemCount').innerText = `x ${item.countInCart}`;
//       clone.querySelector('.totalPriceOfItem').innerText = `$${((item.priceCents / 100) * item.countInCart).toFixed(2)}`;
//       clone.querySelector('.cartItemImg').src = `https://dummyimage.com/210x130/${item.imageColor}/${item.imageColor}`;
//       const wrapper = document.createElement('div');
//       wrapper.dataset.id = item.id;
//       wrapper.appendChild(clone);
//       popupDisplayContainer.appendChild(wrapper);
//     } else {
//       existingItem.querySelector('.itemCount').innerText = `x ${item.countInCart}`;
//       existingItem.querySelector('.totalPriceOfItem').innerText = `$${((item.priceCents / 100) * item.countInCart).toFixed(2)}`;
//     }
//   });
// }

//////////////////////////////////////////////////////////////////////////////////////////////
import items from '../../items.json'

const strItemTemplate = document.querySelector('.strItemTemplate')
const containerOfStrItems = document.querySelector('.itemsContainer')
let totalCartCount = 0

items.forEach(item => {
  item.countInCart = 0
})

// Render store items
if (window.location.pathname.endsWith("store.html")) {
  items.forEach(item => {
    const clone = strItemTemplate.content.cloneNode(true)
    clone.querySelector('.imgClass').src = `https://dummyimage.com/420x260/${item.imageColor}/${item.imageColor}`
    clone.querySelector('.colorCategory').innerText = item.category
    clone.querySelector('.colorLabel').innerText = item.name
    clone.querySelector('.colorPriceAsCents').innerText = `$${(item.priceCents / 100).toFixed(2)}`
    clone.querySelector('.addBtnStoreItem').dataset.id = item.id
    containerOfStrItems.appendChild(clone)
  })
}

fetch('/popup.html?version=' + Date.now())
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html)
    initializeCartUI()
  })

function initializeCartUI() {
  const cartIcon = document.querySelector('#shoppingCartIcon')
  const popupContent = document.querySelector('#popupContent')
  const popupContainer = document.querySelector('.displayContainer')

  cartIcon.addEventListener('click', () => {
    popupContent.classList.toggle('invisible')
  })

  containerOfStrItems.addEventListener('click', (e) => {
    if (e.target.matches('.addBtnStoreItem')) {
      const itemId = e.target.dataset.id
      const item = items.find(i => i.id === itemId)
      if (!item) return

      item.countInCart += 1
      totalCartCount += 1

      document.querySelector('#cartCountIndicator').innerText = totalCartCount
      const existing = popupContainer.querySelector(`[data-id="${itemId}"]`)

      if (existing) {
        existing.querySelector('.itemCount').innerText = `x ${item.countInCart}`
        existing.querySelector('.totalPriceOfItem').innerText = `$${((item.priceCents / 100) * item.countInCart).toFixed(2)}`
      } else {
        const template = document.querySelector('.popupEachItemTemplate')
        const clone = template.content.cloneNode(true)
        const root = clone.querySelector('.popupItem')
        root.dataset.id = item.id
        root.querySelector('.color').innerText = item.name
        root.querySelector('.itemCount').innerText = `x ${item.countInCart}`
        root.querySelector('.totalPriceOfItem').innerText = `$${((item.priceCents / 100) * item.countInCart).toFixed(2)}`
        root.querySelector('.cartItemImg').src = `https://dummyimage.com/210x130/${item.imageColor}/${item.imageColor}`
        popupContainer.appendChild(clone)
      }
    }
  })
}

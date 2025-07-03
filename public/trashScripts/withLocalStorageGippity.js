

// =============================
// FILE 2: WITH LOCAL STORAGE
// =============================

import items from '../../items.json';

const strItemTemplate = document.querySelector('.strItemTemplate');
const containerOfStrItems = document.querySelector('.itemsContainer');
const cartCountIndicator = document.querySelector('#cartCountIndicator');

let cart = JSON.parse(localStorage.getItem('cart')) || {};

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add countInCart to each item based on stored cart
items.forEach(item => {
  item.countInCart = cart[item.id]?.countInCart || 0;
});

// Load store items if on store page
if (window.location.pathname.endsWith("store.html")) {
  items.forEach(item => {
    const clone = strItemTemplate.content.cloneNode(true);
    clone.querySelector('.imgClass').src = `https://dummyimage.com/420x260/${item.imageColor}/${item.imageColor}`;
    clone.querySelector('.colorCategory').innerText = item.category;
    clone.querySelector('.colorLabel').innerText = item.name;
    clone.querySelector('.colorPriceAsCents').innerText = `$${(item.priceCents / 100).toFixed(2)}`;
    clone.querySelector('.addBtnStoreItem').dataset.id = item.id;

    containerOfStrItems.appendChild(clone);
  });
}

// Load popup HTML
fetch('/popup.html?version=' + Date.now())
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
    initializeShoppingCart();
  });

function initializeShoppingCart() {
  const popupEachItemTemplate = document.querySelector('.popupEachItemTemplate');
  const popupDisplayContainer = document.querySelector('.displayContainer');
  let totalCartCount = Object.values(cart).reduce((sum, item) => sum + item.countInCart, 0);
  cartCountIndicator.innerText = totalCartCount;

  containerOfStrItems.addEventListener('click', e => {
    if (!e.target.matches('.addBtnStoreItem')) return;

    const id = e.target.dataset.id;
    const item = items.find(i => i.id === id);
    if (!item) return;

    item.countInCart++;
    cart[id] = item;
    saveCart();

    let existingItem = popupDisplayContainer.querySelector(`[data-id="${item.id}"]`);

    if (!existingItem) {
      const clone = popupEachItemTemplate.content.cloneNode(true);
      clone.querySelector('.color').innerText = item.name;
      clone.querySelector('.itemCount').innerText = `x ${item.countInCart}`;
      clone.querySelector('.totalPriceOfItem').innerText = `$${((item.priceCents / 100) * item.countInCart).toFixed(2)}`;
      clone.querySelector('.cartItemImg').src = `https://dummyimage.com/210x130/${item.imageColor}/${item.imageColor}`;
      const wrapper = document.createElement('div');
      wrapper.dataset.id = item.id;
      wrapper.appendChild(clone);
      popupDisplayContainer.appendChild(wrapper);
    } else {
      existingItem.querySelector('.itemCount').innerText = `x ${item.countInCart}`;
      existingItem.querySelector('.totalPriceOfItem').innerText = `$${((item.priceCents / 100) * item.countInCart).toFixed(2)}`;
    }

    cartCountIndicator.innerText = Object.values(cart).reduce((sum, item) => sum + item.countInCart, 0);
  });
}

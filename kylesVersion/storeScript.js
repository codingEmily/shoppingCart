/// reason I quit after thirdScript.js, and came to copy Kyle's version-
/* 1. I've worked on this TWO weeks, and am simply not willing to work on it any longer
2. I have created ALL of the functionality- just not all at the same time
3. I know I'm capable of making it all work together, but it will take more time AND be inefficient code
4. I am getting really close to burnout on this project, and I want to see how Kyle does this before I lose the ability to appreciate his version */

import items from '../items.json'
import formatCurrency from './utils/formatCurrency'
import addGlobalEventListener from './utils/addGlobalEventListener'
import { addToCart } from './shoppingCart'

// console.log(items)

const storeItemTemplate = document.querySelector('#store-item-template')
const storeItemContainer = document.querySelector('[data-store-container]')
const IMAGE_URL = "https://dummyimage.com/420x260"

export function setupStore() {
    if (storeItemContainer == null) return
    
    addGlobalEventListener('click', '[data-add-to-cart-button]', e => {
        const id = e.target.closest('[data-store-item]').dataset.itemId
        addToCart(parseInt(id))
    })
    
    items.forEach(renderStoreItem)
}

function renderStoreItem(item) {
    const storeItem = storeItemTemplate.content.cloneNode(true)
    
    const container = storeItem.querySelector("[data-store-item]")
    container.dataset.itemId = item.id
    // console.log(container.dataset.itemId)
    
    const name = storeItem.querySelector("[data-name]")
    name.innerText = item.name
    
    const category = storeItem.querySelector("[data-category]")
    category.innerText = item.category
    
    const image = storeItem.querySelector("[data-image]")
    image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`
    
    const price = storeItem.querySelector("[data-price]")
    price.innerText =  formatCurrency(item.priceCents / 100)
    storeItemContainer.appendChild(storeItem)
}
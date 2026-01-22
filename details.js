import { db, ref, onValue } from "./db.js";


const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const detailsContainer = document.getElementById("productDetails");


if (productId) {
   
    const productRef = ref(db, `products/${productId}`);
    
    onValue(productRef, (snapshot) => {
        const product = snapshot.val();
        if (product) {
            detailsContainer.innerHTML = `
                <div class="details-layout">
                    <img src="${product.image}" class="main-img">
                    <div class="text-info">
                        <h1>${product.name}</h1>
                        <p class="price">price: ${product.price} EGP</p>
                       
                      
<p "class="desc">${product.description}</p>
                        <button class="add-btn">add to cart 🛒</button>
                    </div>
                </div>
            `;
        }
    });
}
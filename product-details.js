import { db, ref, onValue } from "./db.js";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id'); 
const container = document.getElementById("productDetailContent");

if (productId) {
   
    const productRef = ref(db, `products/${productId}`);
    
    onValue(productRef, (snapshot) => {
        const p = snapshot.val();
        if (snapshot.exists()) {
        
            container.innerHTML = `
                <div class="detail-image">
                    <img src="${p.img}" alt="${p.name}">
                </div>
                <div class="detail-info">
                    <span class="category-tag">${p.catetory}</span>
                    <h1>${p.name}</h1>
                    <p class="full-description">${p.description}</p>
                    <div class="price-section">
                        <span class="detail-price">${p.price} EGP</span>
                        <span class="detail-stock">Available: ${p.stock_quantity}</span>
                    </div>
                    <button class="add-to-cart">Add to Cart</button>
                    <button class="back-btn" onclick="history.back()">Back to Shop</button>
                </div>
            `;
        } else {
            container.innerHTML = "<h2>Product not found!</h2>";
        }
    });
} else {
    container.innerHTML = "<h2>No product selected!</h2>";
}
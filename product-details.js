import { db, ref, onValue } from "./db.js";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const detailsContainer = document.getElementById("productDetailContent");

if (productId) {
    // التأكد من المسار الصحيح في الفايربيز
    const productRef = ref(db, 'products/' + productId);

    onValue(productRef, (snapshot) => {
        const data = snapshot.val();
        
        if (data) {
            // عرض البيانات مع التأكد من أسماء الحقول (img, name, price)
            detailsContainer.innerHTML = `
                <div class="product-detail-card" style="display: flex; gap: 20px; padding: 20px;">
                    <div class="detail-img">
                        <img src="${data.img || data.image}" style="max-width: 400px; border-radius: 10px;">
                    </div>
                    <div class="detail-info">
                        <h1 style="color: #4bc5b5;">${data.name}</h1>
                        <p style="font-size: 1.5rem; font-weight: bold;">${data.price} EGP</p>
                        <p style="margin: 20px 0;">${data.description || "No description available for this product."}</p>
                        <p><strong>Stock Quantity:</strong> ${data.stock_quantity || 'N/A'}</p>
                        <button onclick="location.href='shop.html'" style="padding: 10px 20px; cursor: pointer;">Back to Shop</button>
                    </div>
                </div>
            `;
        } else {
            detailsContainer.innerHTML = `<h2>Product Not Found!</h2><p>ID: ${productId}</p>`;
        }
    });
} else {
    detailsContainer.innerHTML = "<h2>Please select a product from the shop.</h2>";
}
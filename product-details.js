import { db, ref, onValue } from "./db.js";

const detailsContainer = document.getElementById("productDetailContent");

// 1. جلب الـ ID من الرابط (اللي هو دلوقتي p0 أو p1)
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id'); 

console.log("Searching for product with ID:", productId);

if (productId) {
    // 2. الوصول للمسار المباشر في الفايربيز
    const productRef = ref(db, 'products/' + productId);

    onValue(productRef, (snapshot) => {
        const data = snapshot.val();
        
        if (data) {
            console.log("Product data found:", data);
            // 3. عرض البيانات في الـ HTML
            detailsContainer.innerHTML = `
                <div class="product-info-wrapper" style="display: flex; gap: 40px; align-items: flex-start; padding: 20px;">
                    <div class="product-img-box">
                        <img src="${data.img || data.image}" style="width: 100%; max-width: 450px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                    </div>
                    <div class="product-details-box" style="flex: 1;">
                        <h1 style="font-size: 2.5rem; margin-bottom: 10px;">${data.name}</h1>
                        <p class="category" style="color: #888; text-transform: uppercase; letter-spacing: 1px;">Category: ${data.category || 'General'}</p>
                        <h2 style="color: #4bc5b5; font-size: 2rem; margin: 20px 0;">${data.price} EGP</h2>
                        
                        <div class="description-section" style="margin-bottom: 30px;">
                            <h3 style="border-bottom: 2px solid #eee; padding-bottom: 10px;">Description</h3>
                            <p style="line-height: 1.6; color: #555; margin-top: 10px;">${data.description || "No description available for this product."}</p>
                        </div>

                        <div class="actions">
                            <button onclick="alert('Added to cart!')" class="add-btn" style="padding: 15px 30px; background: #4bc5b5; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 1.1rem;">Add to Cart</button>
                            <button onclick="location.href='shop.html'" style="padding: 15px 30px; background: #333; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">Back to Shop</button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            detailsContainer.innerHTML = `
                <div style="text-align: center; padding: 50px;">
                    <h2>المنتج غير موجود</h2>
                    <p>عفواً، لم نتمكن من العثور على المنتج بالمعرف: <strong>${productId}</strong></p>
                    <button onclick="location.href='shop.html'">العودة للمتجر</button>
                </div>`;
        }
    });
} else {
    detailsContainer.innerHTML = "<h2>برجاء اختيار منتج من صفحة المتجر أولاً.</h2>";
}
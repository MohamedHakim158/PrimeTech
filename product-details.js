import { db, ref, onValue } from "./db.js";

const detailsContainer = document.getElementById("productDetailContent");
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id'); // سيقرأ p0 من الرابط

if (productId) {
    // تحديد المسار في الفايربيز (products/p0)
    const productRef = ref(db, 'products/' + productId);

    onValue(productRef, (snapshot) => {
        const data = snapshot.val();
        
        if (data) {
            // عرض البيانات في الصفحة
            detailsContainer.innerHTML = `
                <div class="product-detail-container" style="display: flex; gap: 30px; padding: 20px; flex-wrap: wrap;">
                    <div class="product-image">
                        <img src="${data.img || data.image}" style="max-width: 100%; width: 400px; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    </div>
                    <div class="product-info" style="flex: 1; min-width: 300px;">
                        <h1 style="color: #333; margin-bottom: 10px;">${data.name}</h1>
                        <p style="font-size: 24px; color: #4bc5b5; font-weight: bold; margin-bottom: 20px;">${data.price} EGP</p>
                        
                        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h3>Description</h3>
                            <p>${data.description || "No description available for this product."}</p>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <p><strong>Category:</strong> ${data.category || data.catetory || 'General'}</p>
                            <p><strong>Availability:</strong> ${data.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
                        </div>

                        <button onclick="location.href='shop.html'" style="padding: 12px 25px; background: #333; color: white; border: none; border-radius: 5px; cursor: pointer;">
                            Back to Shop
                        </button>
                    </div>
                </div>
            `;
        } else {
            // لو الـ ID مش موجود في الفايربيز
            detailsContainer.innerHTML = `
                <div style="text-align: center; padding: 50px;">
                    <h2>المنتج غير موجود!</h2>
                    <p>الـ ID القادم من الرابط: (${productId}) غير مسجل في قاعدة البيانات.</p>
                    <button onclick="location.href='shop.html'">العودة للمتجر</button>
                </div>`;
        }
    });
} else {
    // لو الصفحة اتفتحت من غير ID خالص في الرابط
    detailsContainer.innerHTML = "<h2 style='text-align:center; padding-top:50px;'>برجاء اختيار منتج من صفحة المتجر أولاً.</h2>";
}
// ضيفي السطرين دول تحت productId علطول
console.log("الـ ID اللي سحبناه من اللينك هو:", productId);
console.log("المسار اللي بندور فيه في الفايربيز هو: products/" + productId);
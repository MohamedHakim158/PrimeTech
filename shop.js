import { db, ref, onValue } from "./db.js";

const container = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput"); 
let allProducts = []; 

// 1. جلب البيانات من الفايربيز
onValue(ref(db, 'products'), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // نستخدم Object.entries للحصول على المفتاح (p0) واستخدامه كـ id
        
        allProducts = Object.entries(data).map(([key, value]) => ({ 
        id: key, // ده اللي هيخلي الـ id يبقى p0
        ...value 
    }));
        renderProducts(allProducts); 
    }
});

// 2. دالة عرض المنتجات في الصفحة
function renderProducts(productsList) {
    container.innerHTML = ""; 
    productsList.forEach(p => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${p.img || p.image}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p class="price">${p.price} EGP</p>
                <button class="view-btn" onclick="goToDetails('${p.id}')">View Product</button>
            </div>
        `;
    });
}

// 3. دالة البحث (تعمل فقط في حالة وجود مربع البحث)
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allProducts.filter(p => 
            p.name.toLowerCase().includes(term) || 
            (p.category && p.category.toLowerCase().includes(term))
        );
        renderProducts(filtered);
    });
}

// 4. دالة الانتقال لصفحة التفاصيل (جعلها Global)
window.goToDetails = (id) => {
    // سيقوم بفتح الرابط بالشكل التالي: product-details.html?id=p0
    window.location.href = `product-details.html?id=${id}`;

};
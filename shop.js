import { db, ref, onValue } from "./db.js";

const container = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput"); 
let allProducts = []; 

onValue(ref(db, 'products'), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // الحل السحري: هنسمي المفتاح "uniqueKey" عشان مفيش حاجة جوه تمسحه
        allProducts = Object.entries(data).map(([key, value]) => ({ 
            uniqueKey: key, 
            ...value 
        }));
        renderProducts(allProducts); 
    }
});

function renderProducts(productsList) {
    if(!container) return;
    container.innerHTML = ""; 
    productsList.forEach(p => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${p.img || p.image || 'placeholder.jpg'}">
                <h3>${p.name}</h3>
                <p class="price">${p.price} EGP</p>
                <button class="view-btn" onclick="goToDetails('${p.uniqueKey}')">View Product</button>
            </div>
        `;
    });
}


// 3. كود البحث (ضيفيه في الآخر)
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim(); // النص اللي المستخدم كتبه

        // تصفية المصفوفة بناءً على الاسم أو الوصف
        const filtered = allProducts.filter(p => {
            const name = p.name ? p.name.toLowerCase() : "";
            const description = p.description ? p.description.toLowerCase() : "";
            return name.includes(term) || description.includes(term);
        });

        // إعادة عرض المنتجات المفلترة فقط
        renderProducts(filtered);
    });
}

// 4. دالة الانتقال (عشان الزرار يشتغل)
window.goToDetails = (id) => {
    window.location.href = `product-details.html?id=${id}`;
};
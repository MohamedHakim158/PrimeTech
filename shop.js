import { db, ref, onValue } from "./db.js";

const container = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
let allProducts = []; 

// 1. سحب البيانات مرة واحدة ومراقبتها
onValue(ref(db, 'products'), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // تحويل البيانات لشكل قائمة (Array) عشان نعرف نفلترها
        allProducts = Object.keys(data).map(id => ({
            id: id,
            ...data[id]
        }));
        renderProducts(allProducts); // اعرضي الكل أول ما الصفحة تفتح
    } else {
        container.innerHTML = "<h2>NO PRODUCTS </h2>";
    }
});

// 2. دالة الرسم (المسؤولة عن شكل الكارت)
function renderProducts(productsList) {
    container.innerHTML = ""; // امسحي القديم
    productsList.forEach(product => {
     container.innerHTML += `
    <div class="product-card" onclick="goToDetails('${product.id}')" style="cursor:pointer">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: ${product.price} EGP</p>
    </div>
`;
    });
}



// 3. كود البحث
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(term)
    );
    renderProducts(filtered);
});
window.goToDetails = (id) => {
    // هنخزن الـ ID بتاع المنتج في الرابط عشان الصفحة التانية تعرفه
    window.location.href = `product-details.html?id=${id}`;
};
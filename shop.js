import { db, ref, onValue } from "./db.js";

const container = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput"); 
let allProducts = []; 

onValue(ref(db, 'products'), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        allProducts = Object.keys(data).map(id => ({ id, ...data[id] }));
        renderProducts(allProducts); 
    }
});

function renderProducts(productsList) {
    container.innerHTML = ""; 
    productsList.forEach(p => {
        // اطبعي الـ ID في الكونسول عشان تشوفي بنفسك هو 1 ولا الكود الطويل
        console.log("Current Product ID:", p.id); 

        container.innerHTML += `
            <div class="product-card">
                <img src="${p.img}">
                <h3>${p.name}</h3>
                <p>${p.price} EGP</p>
                <button class="view-btn" onclick="goToDetails('${p.id}')">View Product</button>
            </div>
        `;
    });
}


// حل مشكلة الـ Search: لا يعمل إلا إذا وجد العنصر
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allProducts.filter(p => p.name.toLowerCase().includes(term));
        renderProducts(filtered);
    });
}

// حل مشكلة الزرار: جعل الدالة Global
window.goToDetails = (id) => {
    window.location.href = `product-details.html?id=${id}`;
};
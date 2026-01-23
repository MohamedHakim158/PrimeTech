
import { db, ref, onValue } from "./db.js";

const container = document.getElementById("productsContainer");



onValue(ref(db, 'products'), (snapshot) => {
const productsRef = ref(db, 'products'); 

onValue(productsRef, (snapshot) => {
    const data = snapshot.val();
    console.log("البيانات وصلت بنجاح:", data);

    if (data) {
   
        allProducts = Object.keys(data).map(id => ({
            id: id,
            ...data[id]
        }));
        debugger
        renderProducts(allProducts); 
        container.innerHTML = ""; 
        
  
        Object.keys(data).forEach(key => {
            const p = data[key];

            container.innerHTML += `
                <div class="product-card">
                    <img src="${p.img}">
                    <h3>${p.name}</h3>
                    <div class="product-info">
                        <span class="price">${p.price} EGP</span>
                        <span class="stock">Stock: ${p.stock_quantity}</span>
                    </div>
                    <button class="view-btn" onclick="goToDetails('${key}')">View Product</button>
                </div>
            `;
        });
    } else {
        container.innerHTML = "<h2>لا توجد بيانات في مسار products</h2>";
    }
}, (error) => {
    console.error("Firebase Error:", error);
});


<<<<<<< HEAD
function renderProducts(productsList) {
    
    container.innerHTML = ""; 
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




searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(term)
    );
    renderProducts(filtered);
});
=======
>>>>>>> d1d4b03cce1f7c9c43769989dcc5b6a21e239a5e
window.goToDetails = (id) => {
    window.location.href = `product-details.html?id=${id}`;
};
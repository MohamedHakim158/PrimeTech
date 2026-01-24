
import { db, ref, onValue } from "./db.js";

const container = document.getElementById("productsContainer");


const productsRef = ref(db, 'products'); 

onValue(productsRef, (snapshot) => {
    const data = snapshot.val();
    console.log("البيانات وصلت بنجاح:", data);

    if (data) {
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


window.goToDetails = (id) => {
    window.location.href = `product-details.html?id=${id}`;
};
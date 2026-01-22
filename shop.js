import { db, ref, onValue } from "./db.js";

const container = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
let allProducts = []; 

onValue(ref(db, 'products'), (snapshot) => {
    const data = snapshot.val();
    if (data) {
   
        allProducts = Object.keys(data).map(id => ({
            id: id,
            ...data[id]
        }));
        renderProducts(allProducts); 
    } else {
        container.innerHTML = "<h2>NO PRODUCTS </h2>";
    }
});


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
window.goToDetails = (id) => {
    
    window.location.href = `product-details.html?id=${id}`;
};
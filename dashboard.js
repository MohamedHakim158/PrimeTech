import { db, ref, onValue } from "./db.js";

const container = document.getElementById("prodContainer");
const pagination = document.getElementById("pagination");

const state = {
  products: [],
  currentPage: 1,
  productsPerPage: 4,
  maxPagesToShow: 5
};



console.log(Object.entries(state));


onValue(ref(db, "products"), (snapshot) => {
  const data = snapshot.val();
  
  if (!data) {
    container.innerHTML = "<tr><td colspan='7'>NO PRODUCTS</td></tr>";
    pagination.innerHTML = "";
    return;
  }
  
  state.products = Object.entries(data).map(([id, value]) => ({
    id,
    ...value
  }));
  
  
  state.currentPage = 1; 
  render();
});



function render() {
  renderProducts();
  renderPagination();
}

function renderProducts() {
  const { products, currentPage, productsPerPage } = state;

  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const pageItems = products.slice(start, end);
  
  container.innerHTML = "";

  pageItems.forEach(item => {
    const row = document.createElement("tr");
    
    row.innerHTML = `
      <td class="col-image">
        <img src="${item.image}" width="50" alt="doesn't load">
      </td>
      <td class="col-name">${(item.name)}</td>
      <td class="col-cat">${(item.category || "—")}</td>
      <td class="col-price">${item.price}</td>
      <td class="col-stock">${item.stock}</td>
      <td class="col-action1">
        <button  class="edit-btn">
          <i class="fa-solid fa-pen"></i> Edit
        </button>
      </td>
      <td class="col-action2">
        <button data-id="${item.id}" class="delete-btn ">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      </td>
    `;

    container.appendChild(row);
  });
}


function renderPagination() {
  const { products, currentPage, productsPerPage, maxPagesToShow } = state;
  
  pagination.innerHTML = "";

  const totalPages = Math.ceil(products.length / productsPerPage);
  if (totalPages <= 1) return;

  let start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let end = Math.min(totalPages, start + maxPagesToShow - 1);

  if (end - start + 1 < maxPagesToShow) {
    start = Math.max(1, end - maxPagesToShow + 1);
  }

  pagination.appendChild(createButton("«", 1, currentPage === 1));

  for (let i = start; i <= end; i++) {
    pagination.appendChild(createButton(i, i, i === currentPage));
  }

  pagination.appendChild(
    createButton("»", totalPages, currentPage === totalPages)
  );
}



function createButton(label, page, disabled) {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.disabled = disabled;

  if (page === state.currentPage && typeof label === "number") {
    btn.classList.add("active");
  }

  btn.addEventListener("click", () => {
    state.currentPage = page;
    render();
  });

  return btn;
}



// editing on a product


async function getProduct(id){
  try {
    const productRef = ref(db , `product/${id}`);
    const snapshot = await get(productRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }else{
      return null;
    }
    
  } catch (error) {
    console.log("Error getting product" + error);
  }
}

async function displayEditPop(id) {
  // Overlay
  const overlay = document.createElement("div");
  overlay.className = "modal";
  console.log("edit product popUp")
  // Modal content
  const modal = document.createElement("div");
  modal.className = "modal-content";

  modal.innerHTML = `
    <h3>Edit Product</h3>
    <label>Name: <input type="text" id="edit-name" value="${productData.name}"></label>
    <label>Price: <input type="number" id="edit-price" value="${productData.price}"></label>
    <div class="actions">
      <button id="save-btn">Save</button>
      <button id="cancel-btn">Cancel</button>
    </div>
  `;
}







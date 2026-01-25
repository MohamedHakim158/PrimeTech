  import { db, ref, onValue , remove , update } from "./db.js";

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


//#region  Rendering Products with pagination
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
          <img src="${item.img}" width="50" alt="doesn't load">
        </td>
        <td class="col-name">${(item.name)}</td>
        <td class="col-cat">${(item.catetory || "—")}</td>
        <td class="col-price">${item.price}</td>
        <td class="col-stock">${item.stock_quantity}</td>
        <td class="col-action1">
          <button data-id="${item.id}" class="edit-btn">
            <i class="fa-solid fa-pen"></i> Edit
          </button>
        </td>
        <td class="col-action2">
          <button data-id="${item.id}" class="delete-btn">
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

  //#endregion

//#region Sorting Products Ascending and Descending
  var ascendingProducts = document.getElementById("OrderProductAsc");
  var descendingProducts = document.getElementById("OrderProductDesc");
  ascendingProducts.addEventListener("click" , function(){
    state.products.sort((a, b) => a.stock_quantity - b.stock_quantity);
    render();
  });
  descendingProducts.addEventListener("click", function(){
    state.products.sort((a,b)=>b.stock_quantity - a.stock_quantity)
    render();
  })

  //#endregion

//#region  Deleting a product


  var prodTable = document.querySelector(".prodTable");
  prodTable.addEventListener('click' , (e)=>{
    if (e.target.closest('.delete-btn')) {
      const btn = e.target.closest('.delete-btn');
      const id = btn.dataset.id;
      debugger
      console.log("delete id:", id);
      deleteProduct(id);
      
    }
  })


  function deleteProduct(productId){
    
    var isConfirmed = window.confirm("You Are Going to Delete Product of id " + productId); 
    if (isConfirmed) {
      debugger
      remove(ref(db, `products/${productId}`))
      .then(() => {
        window.alert("Product deleted successfully!");
      })
      .catch((error) => {
        window.alert("Error deleting product:", error);
      });
      render();
    }
  }
  //#endregion

  
  

//#region Editing a Product

prodTable.addEventListener("click" , (e)=>{
   if (e.target.closest('.edit-btn')) {
      const btn = e.target.closest('.edit-btn');
      const id = btn.dataset.id;
      
      console.log("edit id:", id);
      EditProduct(id);
   }
});
  function EditProduct(id){
  let product = state.products.find(e=>e.id == id);

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "editModal";

  modal.innerHTML = `
    <div class="modal-box">
      <h3>Edit Product</h3>
      <div class="lineImage">
          <img id="image" src="${product.img}"  width="100" height="100"> 
          <input id="imagesrc"  placeholder="enter image source here">
      </div>
      <div class="line">  
          <input type="file" id="editImage" accept="image/*" />
          <p>Change Image</p>
      </div>
      <div class="line">
        <label for="id">Product Id: </label>
        <input id="id" value="${product.id}" disabled/>
      </div>
      <div class="line">
          <label for="editName">Name: </label>
          <input id="editName" value="${product.name}" />
      </div>
      <div class="line">
          <label for="description">Description: </label>
          <input id="description" value="${product.description}" />
      </div>
      
      <div class="line">
          <label for="quantity">Quantity: </label>
          <input id="editName" value="${product.stock_quantity}" />
      </div>

      <div class="modal-actions">
        <button id="saveBtn">Save</button>
        <button id="cancelBtn">Cancel</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  modal.style.display= "flex";
  // Close modal
  modal.querySelector("#cancelBtn").onclick = () => modal.remove();
    
  const fileInput = document.getElementById("editImage");
  const currntImage = document.getElementById("image");
  fileInput.addEventListener("change", () => {
  const file = fileInput.files[0]
  if(!file) return;
    
  currntImage.src = URL.createObjectURL(file);
});
  // Save
  modal.querySelector("#saveBtn").onclick = async () => {
    debugger
    await update(ref(db, `products/${id}`), {
      name: document.getElementById("editName").value,
      price: document.getElementById("editPrice").value,
      description:document.getElementById("description").value,
      id: parseInt(document.getElementById("id").value),
      img:currntImage.src
    });
    modal.remove();
  };

  // Click outside to close
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };
  }



//#endregion

//#region hashed 
// const name = document.getElementById("name").value;
// const price = document.getElementById("price").value;

// const fileInput = document.getElementById("imageInput");

// let imageUrl = currentProduct.imageUrl; // default

// if (fileInput.files.length > 0) {
//   const file = fileInput.files[0];

//   // upload to Firebase Storage
//   const storageRef = ref(storage, `products/${productId}`);
//   await uploadBytes(storageRef, file);
//   imageUrl = await getDownloadURL(storageRef);
// }

// set(ref(db, `products/${productId}`), {
//   name,
//   price,
//   imageUrl
// });


//#endregion
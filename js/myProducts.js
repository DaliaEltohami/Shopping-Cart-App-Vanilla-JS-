let products = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];

let myProducts;

let favorites = localStorage.getItem("favoriteProducts")
  ? JSON.parse(localStorage.getItem("favoriteProducts"))
  : [];

let productsDOM = document.getElementById("home_products");
let deleteProductBtns = document.getElementsByClassName("delete-product-btn");

let selectFilter = document.getElementById("select-filter");
selectFilter.addEventListener("change", (e) =>
  handleProductFilter(e, allProducts)
);

let drawProductsUI = (products) => {
  productsDOM.innerHTML = "";
  myProducts = products.filter((product) => product.isMe === "yes");
  let fragment = document.createDocumentFragment();
  if (myProducts.length == 0) {
    let node = document.createElement("div");
    node.className = "no-products capitalize";
    node.textContent= "you don't have any products";
    fragment.appendChild(node);
  } else {
    myProducts.map((product) => {
      let node = document.createElement("div");
      node.className = "product-item";
      node.innerHTML = `
                <div class="product-item-img">
                  <img src=${product.imgURL} />
                </div>
                <div class="product-item-desc">
                  <h2 class="product-item-desc-title capitalize">
                    ${product.title}
                  </h2>
                  <p class="product-item-desc-content">
                    ${product.desc}
                  </p>
                </div>
                <div class="product-item-action">
                <button class="product-btn update-product-btn capitalize" onclick="handleUpdate(${
                  product.id
                })">update</button>
                  <button class="product-btn delete-product-btn capitalize" data-product-id=${
                    product.id
                  }>delete product</button>
                  <div class="fav-icon" data-product-id=${product.id}>
                  ${
                    favorites.find((item) => item.id == product.id)
                      ? `<i style="color:red;" class="fa-solid fa-heart"></i>`
                      : `<i class="fa-regular fa-heart"></i>`
                  }
                  </div>
                </div>
            `;
      fragment.append(node);
    });
  }
  productsDOM.appendChild(fragment);

  deleteProductBtns = [].slice.call(deleteProductBtns);

  deleteProductBtns.map((btn) => {
    const productId = btn.dataset.productId;
    btn.addEventListener("click", (e) => {
      deleteProductHandler(e, productId);
    });
  });

  let favIcons = document.querySelectorAll(".fav-icon");
  favIcons.forEach((icon) => {
    let id = icon.dataset.productId;
    icon.addEventListener("click", (e) => handleFavorites(e, id));
  });
};

function handleUpdate(id) {
  window.location = `product-update.html?id=${id}`;
}

function deleteProductHandler(e, id) {
  console.log(id);
  products = products.filter((product) => product.id != id);
  localStorage.setItem('products',JSON.stringify(products));
  drawProductsUI(products);
}

function handleFavorites(e, id) {
  if (authentication === "true") {
    if (favorites.find((item) => item.id == id)) {
      favorites = favorites.filter((item) => item.id != id);
      e.currentTarget.firstElementChild.className = "fa-regular fa-heart";
      e.currentTarget.firstElementChild.style.color = "black";
    } else {
      let addedItem = products.find((item) => item.id == id);
      favorites = [...favorites, addedItem];
      e.currentTarget.firstElementChild.className = "fa-solid fa-heart";
      e.currentTarget.firstElementChild.style.color = "red";
    }
    localStorage.setItem("favoriteProducts", JSON.stringify(favorites));
  } else {
    window.location("login.html");
  }
}

drawProductsUI(products);


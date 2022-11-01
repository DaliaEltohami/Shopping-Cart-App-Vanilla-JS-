let favorites = localStorage.getItem("favoriteProducts")
  ? JSON.parse(localStorage.getItem("favoriteProducts"))
  : [];
let productsDOM = document.getElementById("home_products");
let removeFromFavBtns = document.getElementsByClassName("remove-from-fav");
let selectFilter = document.getElementById("select-filter");
selectFilter.addEventListener("change", (e) =>
  handleProductFilter(e, favorites)
);

let drawProductsUI = (products) => {
  productsDOM.innerHTML = "";
  let fragment = document.createDocumentFragment();
  products.map((product) => {
    let node = document.createElement("div");
    product.isMe === "yes"
      ? (node.className = "product-item my-product-item")
      : (node.className = "product-item");
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
                <button class="product-btn remove-from-fav capitalize" data-product-id=${product.id}>remove from favorites</button>
              </div>
          `;
    fragment.appendChild(node);
  });
  productsDOM.appendChild(fragment);

  removeFromFavBtns = [].slice.call(removeFromFavBtns);

  removeFromFavBtns.map((btn) => {
    const productId = btn.dataset.productId;
    btn.addEventListener("click", (e) => {
      removeFromFavHandler(e, productId);
    });
  });
};

drawProductsUI(favorites);

function removeFromFavHandler(e, id) {
  let filteredItems = favorites.filter((item) => item.id != id);
  e.target.closest(".product-item").remove();
  localStorage.setItem("favoriteProducts", JSON.stringify(filteredItems));
  if (productsDOM.innerHTML === "") {
    let node = document.createElement("div");
    node.innerHTML = `<div class="no-products">There is no Favorite Products!!!</div>`;
    productsDOM.append(node);
  }
}

let views = localStorage.getItem("myViews")
  ? JSON.parse(localStorage.getItem("myViews"))
  : [];
let productsDOM = document.getElementById("home_products");
let removeFromMyViewsBtns = document.getElementsByClassName("remove-from-views");
let selectFilter = document.getElementById("select-filter");
selectFilter.addEventListener("change", (e) =>
  handleProductFilter(e, views)
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
                <button class="product-btn remove-from-views capitalize" data-product-id=${product.id}>remove from views</button>
              </div>
          `;
    fragment.appendChild(node);
  });
  productsDOM.appendChild(fragment);

  removeFromMyViewsBtns = [].slice.call(removeFromMyViewsBtns);

  removeFromMyViewsBtns.map((btn) => {
    const productId = btn.dataset.productId;
    btn.addEventListener("click", (e) => {
        removeFromMyViewsHandler(e, productId);
    });
  });
};

drawProductsUI(views);

function removeFromMyViewsHandler(e, id) {
  let filteredItems = views.filter((item) => item.id != id);
  e.target.closest(".product-item").remove();
  localStorage.setItem("myViews", JSON.stringify(filteredItems));
  if (productsDOM.innerHTML === "") {
    let node = document.createElement("div");
    node.innerHTML = `<div class="no-products">There is no viewed Products!!!</div>`;
    productsDOM.append(node);
  }
}

console.log('hi')
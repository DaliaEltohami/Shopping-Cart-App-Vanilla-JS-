let cartProducts = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];
let favorites = localStorage.getItem("favoriteProducts")
  ? JSON.parse(localStorage.getItem("favoriteProducts"))
  : [];
let productsDom = document.getElementById("home_products");
let noProducts = document.getElementById("no-products");
let removeFromCartBtns = document.getElementsByClassName("remove-from-cart");

let drawProductsUI = (products) => {
  let fragment = document.createDocumentFragment();
  if (products.length == 0) {
    let node = document.createElement("div");
    node.innerHTML = `<div class="no-products">There is no Products in the Cart !!!</div>`;
    fragment.appendChild(node);
  } else {
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
                  <p id=quantity${
                    product.id
                  } class="product-item-qty capitalize">
                    quantity : ${product.qty}
                  </p>
                </div>
                <div class="product-item-action">
                  <button class="product-btn remove-from-cart capitalize" data-product-id=${
                    product.id
                  }>remove from cart</button>
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
  productsDom.appendChild(fragment);

  removeFromCartBtns = [].slice.call(removeFromCartBtns);

  removeFromCartBtns.map((btn) => {
    const productId = btn.dataset.productId;
    btn.addEventListener("click", (e) => {
      removeFromCartHandler(e, productId);
    });
  });

  let favIcons = document.querySelectorAll(".fav-icon");
  favIcons.forEach((icon) => {
    let id = icon.dataset.productId;
    icon.addEventListener("click", (e) => handleFavorites(e, id));
  });
};

drawProductsUI(cartProducts);

function handleFavorites(e, id) {
  if (authentication === "true") {
    if (favorites.find((item) => item.id == id)) {
      favorites = favorites.filter((item) => item.id != id);
      e.currentTarget.firstElementChild.className = "fa-regular fa-heart";
      e.currentTarget.firstElementChild.style.color = "black";
    } else {
      let addedItem = cartProducts.find((item) => item.id == id);
      favorites = [...favorites, addedItem];
      e.currentTarget.firstElementChild.className = "fa-solid fa-heart";
      e.currentTarget.firstElementChild.style.color = "red";
    }
    localStorage.setItem("favoriteProducts", JSON.stringify(favorites));
  } else {
    window.location("login.html");
  }
}

function removeFromCartHandler(e, id) {
  cartProducts = JSON.parse(localStorage.getItem("productsInCart"));
  let filteredItems = cartProducts.filter((product) => {
    console.log(product.id, id);
    if (product.id == id) {
      product.qty -= 1;
      if (product.qty < 1) {
        e.target.closest(".product-item").remove();
        // e.target.parentNode.parentNode.remove();
      } else {
        document.getElementById(
          `quantity${product.id}`
        ).innerHTML = `quantity : ${product.qty}`;
        return true;
      }
    } else {
      return true;
    }
  });
  if(productsDom.innerHTML === ""){
    let node = document.createElement("div");
    node.innerHTML = `<div class="no-products">There is no Products in the Cart !!!</div>`;
    productsDom.append(node);
  }
  localStorage.setItem("productsInCart", JSON.stringify(filteredItems));
}

// Define variables
let productsDOM = document.getElementById("home_products");
let cartDropdownItems = document.getElementsByClassName("cart-dropdown-item");
let addToCartBtns = document.getElementsByClassName("add-to-cart");
let searchInput = document.getElementById("search");


let selectFilter = document.getElementById("select-filter");
selectFilter.addEventListener("change", (e) =>
  handleProductFilter(e, allProducts)
);


let favorites = localStorage.getItem("favoriteProducts")
  ? JSON.parse(localStorage.getItem("favoriteProducts"))
  : [];



// Add event listeners


searchInput.addEventListener("keyup", (e) => {
  handleSearch(e, allProducts);
});


// Define functions
let drawProductsUI = (products) => {
  console.log("drawing UI");
  // console.log(productsDOM.innerHTML);
  productsDOM.innerHTML = "";
  // console.log(JSON.stringify(productsDOM));
  let fragment = document.createDocumentFragment();
  products.map((product) => {
    let node = document.createElement("div");
    product.isMe === "yes"
      ? (node.className = "my-product-item")
      : (node.className = "product-item");
    node.innerHTML = `
            <div class="product-item-img">
              <img src=${product.imgURL} />
            </div>
            <div class="product-item-desc">
              <a href="product-details.html?id=${
                product.id
              }" class="product-item-desc-title capitalize">
                ${product.title}
              </a>
              <p class="product-item-desc-content">
                ${product.desc}
              </p>
              <p class="product-item-desc-size">
                ${product.size}
              </p>
            </div>
            <div class="product-item-action">
              <button class="product-btn add-to-cart capitalize" data-product-id=${
                product.id
              }>add to cart</button>
              <div class="fav-icon" data-product-id=${product.id}>
              ${
                favorites.find((item) => item.id == product.id)
                  ? `<i style = "color:red;" class="fa-solid fa-heart"></i>`
                  : `<i class="fa-regular fa-heart"></i>`
              }
              </div>
            </div>
        `;
    fragment.appendChild(node);
  });
  productsDOM.appendChild(fragment);

  addToCartBtns = [].slice.call(addToCartBtns);

  addToCartBtns.map((btn) => {
    const productId = btn.dataset.productId;
    btn.addEventListener("click", (e) =>
      handleAddToCart(e, productId, products)
    );
  });

  let favIcons = document.querySelectorAll(".fav-icon");
  favIcons.forEach((icon) => {
    const productId = icon.dataset.productId;
    icon.addEventListener("click", (e) =>
      handleAddToFav(e, productId, products)
    );
  });
};


function handleAddToCart(e, id, products) {
  e.preventDefault();
  if (authentication === "true") {
    totalQty += 1;
    addToCart(id, products);
  } else {
    alert("Please Login So You Can Add Products To Your Cart");
    window.location = "login.html";
  }
}

// function addToCart(id, products) {
//   addedItem = products.find((product) => product.id == id);
//   let choosenProductsIds = choosenProducts.map((product) => product.id);
//   console.log(choosenProductsIds);
//   console.log(id);
//   if (choosenProductsIds.includes(+id)) {
//     choosenProducts.map((product) => {
//       if (product.id == id) {
//         product.qty += 1;
//       }
//     });
//     cartDropdownItemsContainer.innerHTML = "";
//     choosenProducts.map((product) => {
//       cartDropdownItemsContainer.insertAdjacentHTML(
//         "afterbegin",
//         `<p class="cart-dropdown-item"> ${product.title} ${product.qty}</p>`
//       );
//     });
//     console.log("yes");
//   } else {
//     choosenProducts = [...choosenProducts, addedItem];
//     cartDropdownItemsContainer.insertAdjacentHTML(
//       "afterbegin",
//       `<p class="cart-dropdown-item"> ${addedItem.title} ${addedItem.qty}</p>`
//     );
//   }
//   cartNotification.innerHTML = cartDropdownItems.length;
//   cartNotification.style.display = "block";
//   localStorage.setItem("productsInCart", JSON.stringify(choosenProducts));
// }

function addToCart(id, products) {
  let inCart = choosenProducts.find((product) => product.id == id);
  console.log(inCart);
  if (inCart) {
    choosenProducts.map((product) => {
      if (product.id == id) {
        product.qty += 1;
      }
    });
    cartDropdownItemsContainer.innerHTML = "";
    choosenProducts.map((product) => {
      cartDropdownItemsContainer.insertAdjacentHTML(
        "afterbegin",
        `<p class="cart-dropdown-item"> ${product.title} <span class=qty-span>${product.qty}</span></p>`
      );
    });
  } else {
    addedItem = products.find((product) => product.id == id);
    choosenProducts = [...choosenProducts, addedItem];
    cartDropdownItemsContainer.insertAdjacentHTML(
      "afterbegin",
      `<p class="cart-dropdown-item"> ${addedItem.title} ${addedItem.qty}</p>`
    );
  }
  cartNotification.innerHTML = totalQty;
  if ((cartNotification.style.display = "none")) {
    cartNotification.style.display = "block";
  }
  localStorage.setItem("productsInCart", JSON.stringify(choosenProducts));

  // addedItem = products.find((product) => product.id == id);
  // let choosenProductsIds = choosenProducts.map((product) => product.id);
  // console.log(choosenProductsIds);
  // console.log(id);
  // if (choosenProductsIds.includes(+id)) {
  //   choosenProducts.map((product) => {
  //     if (product.id == id) {
  //       product.qty += 1;
  //     }
  //   });
  //   cartDropdownItemsContainer.innerHTML = "";
  //   choosenProducts.map((product) => {
  //     cartDropdownItemsContainer.insertAdjacentHTML(
  //       "afterbegin",
  //       `<p class="cart-dropdown-item"> ${product.title} ${product.qty}</p>`
  //     );
  //   });
  //   console.log("yes");
  // } else {
  //   choosenProducts = [...choosenProducts, addedItem];
  //   cartDropdownItemsContainer.insertAdjacentHTML(
  //     "afterbegin",
  //     `<p class="cart-dropdown-item"> ${addedItem.title} ${addedItem.qty}</p>`
  //   );
  // }
}

function handleSearch(e, products) {
  let searchPattern = e.target.value.trim();
  if (e.target.value.trim() == "") {
    drawProductsUI(products);
  } else {
    let serachedProducts = products.filter(
      (product) => product.title.toLowerCase().indexOf(searchPattern) !== -1
    );
    drawProductsUI(serachedProducts);
  }
}

function handleAddToFav(e, id, products) {
  if (authentication === "true") {
    let choosenItem = favorites.find((product) => product.id == id);
    if (choosenItem) {
      favorites = favorites.filter((product) => product.id != id);
      e.currentTarget.firstElementChild.className = "fa-regular fa-heart";
      e.currentTarget.firstElementChild.style.color = "black";
    } else {
      e.currentTarget.firstElementChild.className = "fa-solid fa-heart";
      e.currentTarget.firstElementChild.style.color = "red";
      choosenItem = products.find((product) => product.id == id);
      favorites = [...favorites, choosenItem];
    }
    localStorage.setItem("favoriteProducts", JSON.stringify(favorites));
  } else {
    window.location("login.html");
  }
}

function handleUpdate(id) {
  window.location = `product-update.html?id=${id}`;
}

// Invoke Functions
drawProductsUI(allProducts);



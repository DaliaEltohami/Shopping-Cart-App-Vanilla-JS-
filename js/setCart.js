let choosenProducts = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];

let cartDropdownItemsContainer = document.querySelector(".cart-dropdown-items");
let cartNotification = document.querySelector(".cart-notification");
let cartIcon = document.querySelector(".cart-icon");
let cartDropdown = document.querySelector(".cart-dropdown");
let totalQty = 0;

function setCart() {
  if (choosenProducts.length > 0) {
    choosenProducts.map((product) => {
      totalQty = totalQty + product.qty;
      cartDropdownItemsContainer.insertAdjacentHTML(
        "afterbegin",
        `<p class="cart-dropdown-item"> ${product.title} <span class=qty-span>${product.qty}</span></p>`
      );
    });
    cartNotification.innerHTML = totalQty;
    cartNotification.style.display = "block";
  }
}

function handleCartIcon(e) {
  const withinBoundaries = e.composedPath().includes(cartIcon);
  if (withinBoundaries) {
    if (cartDropdownItemsContainer.innerHTML == "") {
      alert("Please Add Product To Your Cart!");
    } else {
      if (cartDropdown.style.display == "block") {
        cartDropdown.style.display = "none";
      } else {
        cartDropdown.style.display = "block";
      }
    }
  } else {
    cartDropdown.style.display = "none";
  }
}

document.addEventListener("click", handleCartIcon);
if (authentication === "true") {
  setCart();
}

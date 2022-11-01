let updateAuthentication = localStorage.getItem('authentication');
let products;
let product;

if (updateAuthentication === "false") {
  window.location = "login.html";
} else {
  let params = new URLSearchParams(location.search);
  let id = params.get("id");

  products = JSON.parse(localStorage.getItem("products"));
  product = products.find((product) => product.id == id);
  console.log(product)
  if (!product || product.isMe === "no") {
    alert("product not found");
    window.location = 'index.html';
  }
}


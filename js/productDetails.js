let productDOM = document.getElementById("product");

let products = JSON.parse(localStorage.getItem("products"));
let params = new URLSearchParams(location.search);
let id = params.get("id");
let product = products.find((product) => product.id == id);

productDOM.insertAdjacentHTML(
  "afterbegin",
  `<div class="product-image">
<img src=${product.imgURL} alt="camera">
</div>
<div class="product-details">
<h2 class="products-details-title">${product.title}</h2>
<p class="products-details-desc capitalize">desc :- ${product.desc}</p>
<p class="products-details-size capitalize">size :- ${product.size}</p>
</div>`
);

let views = localStorage.getItem('myViews')? JSON.parse(localStorage.getItem('myViews')):[];
let check = views.some(view=>view.id == product.id);
// let check = views.find(view=>view.id == product.id);

console.log(check)
if(!check){
  views = [...views,product];
  localStorage.setItem('myViews',JSON.stringify(views));
}
console.log(views);



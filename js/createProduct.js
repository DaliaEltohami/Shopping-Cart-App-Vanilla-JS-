let title = document.querySelector(".product-name");
let description = document.querySelector(".product-desc");
let imageURL = "images/camera.jpg";
let sizeSelect = document.getElementById("select-size");
let createButton = document.querySelector(".submit-btn");
// let allProducts = JSON.parse(localStorage.getItem("products"));
let inputFile = document.querySelector(".input-file");

createButton.addEventListener("click", createProduct);
inputFile.addEventListener("change", handleImageFile);

function createProduct(e) {
  e.preventDefault();
  let productTitle = title.value;
  let productDesc = description.value;
  let productSize = sizeSelect.value;
  console.log(productSize);

  if (productTitle == "" || productDesc == "" || productSize == "hidden") {
    if (productTitle == "") {
      alert("Please Enter Product Name");
    }
    if (productDesc == "") {
      alert("Please Enter Product Description");
    }
    if (productSize == "") {
      alert("Please Select Product Size");
    }
  } else {
    let obj = {
      id: allProducts.length + 1,
      title: productTitle,
      desc: productDesc,
      imgURL: imageURL,
      size: productSize,
      qty: 1,
      isMe: "yes",
    };
    allProducts = [...allProducts, obj];
    console.log(allProducts);
    localStorage.setItem("products", JSON.stringify(allProducts));

    title.value = "";
    description.value = "";
    sizeSelect.value = "";
    inputFile.value = "";

    setTimeout(() => {
      window.location = 'index.html';
    }, 1500);
  }
}

function handleImageFile() {
  console.log(this.files);
  console.log(inputFile.files);
  let image = this.files[0];
  if (image) {
    if (image.type != "image/jpeg" && image.type != "image/jpg") {
      alert("Image Type Not Supported");
      return;
    }
    if (image.size > 2 * 1024 * 1024) {
      alert("Maximum Image Size is 2MB");
      return;
    }

    // returns blob url in case of server uses ...
    // imageURL = URL.createObjectURL(image);
    // console.log(imageURL);

    getImageBase64(image);
  }
}

function getImageBase64(image) {
  let reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = () => {
    imageURL = reader.result;
  };
}

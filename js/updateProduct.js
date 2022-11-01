let title = document.querySelector(".product-name");
let description = document.querySelector(".product-desc");
let sizeSelect = document.getElementById("select-size");
let updateButton = document.querySelector(".submit-btn");
let inputFile = document.querySelector(".input-file");

updateButton.addEventListener("click", updateProduct);
inputFile.addEventListener("change", handleImageFile);

title.value = product.title;
description.value = product.desc;
let imageURL = product.imgURL;
sizeSelect.value = product.size;

function updateProduct(e) {
  e.preventDefault();
  product.title = title.value;
  product.desc = description.value;
  product.size = sizeSelect.value;
  product.imgURL = imageURL;

  if (title.value == "" || description.value == "" || sizeSelect.value == "") {
    if (title.value == "") {
      alert("Please Enter Product Name");
    }
    if (description.value == "") {
      alert("Please Enter Product Description");
    }
    if (sizeSelect.value == "") {
      alert("Please Select Product Size");
    }
  } else {
    localStorage.setItem("products", JSON.stringify(products));

    setTimeout(() => {
      window.location = "index.html";
    }, 1500);
  }
}

function handleImageFile() {
//   console.log(this.files);
//   console.log(inputFile.files);
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

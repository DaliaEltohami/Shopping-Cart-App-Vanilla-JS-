let usernameDom = document.querySelector(".edit-username");
let emailDom = document.querySelector(".edit-email");
let inputFile = document.querySelector(".edit-profile-image");
let editButton = document.querySelector(".submit-btn");

let userEmail = localStorage.getItem("email");


editButton.addEventListener("click", updateProduct);
inputFile.addEventListener("change", handleImageFile);

usernameDom.value = user;
emailDom.value = userEmail;

function updateProduct(e) {
  e.preventDefault();

  if (usernameDom.value == "" || emailDom.value == "") {
    if (usernameDom.value == "") {
      alert("Please Enter Username");
    }
    if (emailDom.value == "") {
      alert("Please Enter Email");
    }
  } else {
    localStorage.setItem("username", usernameDom.value);
    localStorage.setItem("email", emailDom.value);
    

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
    localStorage.setItem('profile image',reader.result);
    // imageURL = reader.result;
  };
}

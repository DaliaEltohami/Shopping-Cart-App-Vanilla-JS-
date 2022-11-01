let profileImageDom = document.querySelector(".profile-avatar img");
let profileUsernameDom = document.querySelector(".profile-username");
let profileEmailDom = document.querySelector(".profile-email");
let profileProductsCountDom = document.querySelector(".profile-products-count");
let userEmail = localStorage.getItem("email");
let imageURL = localStorage.getItem('profile image');

profileImageDom.setAttribute('src',imageURL);
profileUsernameDom.textContent = user;
profileEmailDom.textContent = "E-mail:- " + userEmail;
let myProducts = allProducts.filter((product) => product.isMe === "yes");
profileProductsCountDom.textContent = "My Products Count:- " + myProducts.length;

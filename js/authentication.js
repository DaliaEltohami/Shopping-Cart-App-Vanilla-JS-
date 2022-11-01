let logoutBtn = document.getElementById("logout_btn");
let navList = document.getElementById("nav_list");
let welcome = document.getElementById("welcome");
let welcomeUser = document.getElementById("welcome-user");
let createProductButton = document.querySelector(".create-product-button");

let authentication = localStorage.getItem("authentication");
let user = localStorage.getItem("username");

let viewWelcome = () => {
  navList.style.display = "none";
  welcomeUser.textContent = `welcome ${user}`;
  welcome.style.display = "flex";
};

if (authentication === "true") {
  viewWelcome();
}

logoutBtn.addEventListener("click", (e) => {
  localStorage.setItem("authentication", false);
  setTimeout(() => {
    window.location = "login.html";
  }, 1500);
});

if (authentication === "true") {
  createProductButton.style.display = "block";
}
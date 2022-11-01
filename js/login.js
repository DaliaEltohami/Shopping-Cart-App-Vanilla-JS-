let inputUsername = document.getElementById("login-username");
let inputPassword = document.getElementById("login-password");

let loginBtn = document.getElementById("login-submit-btn");

let username = localStorage.getItem("username");
let password = localStorage.getItem("password");

let validateLogin = (e) => {
  e.preventDefault();
  if (inputUsername.value == "" || inputPassword.value == "") {
    alert("Please Enter Username and Password");
  } else {
    if (
      inputUsername.value.trim() === username &&
      inputPassword.value === password
    ) {
      localStorage.setItem("authentication", true);
      setTimeout(() => {
        window.location = "index.html";
      }, 1500);
    } else {
      alert("Username or Password is wrong !!");
      console.log(inputUsername.value, inputPassword.value);
      console.log(username, password);
    }
  }
};

loginBtn.addEventListener("click", validateLogin);

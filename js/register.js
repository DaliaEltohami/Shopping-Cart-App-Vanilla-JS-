let username = document.getElementById("register-username");
let email = document.getElementById("register-email");
let password = document.getElementById("register-password");

let registerBtn = document.getElementById("register-submit-btn");


let validateRegister = (e)=>{
    e.preventDefault();
    console.log(username.value, password.value, email.value);
    if (username.value == "" || email.value == "" || password.value == "") {
      alert("Please Fill in The Form");
    } else {
      localStorage.setItem("username", username.value);
      localStorage.setItem("email", email.value);
      localStorage.setItem("password", password.value);
      localStorage.setItem('profile image','images/boy-avatar.png');
      setTimeout(() => {
        window.location = "login.html";
      }, 2000);
    }    
}

registerBtn.addEventListener("click", validateRegister);

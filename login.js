// for login page//
 
const  container = document.querySelector(".login-container");
const  registerBtn = document.querySelector("#btn-register");
const  loginBtn = document.querySelector("#btn-login");
const body = document.querySelector(".login-section");

registerBtn.addEventListener ('click' , ()=>{
  container.classList.add('login-active'); 
  body.classList.add("bg-active");
});

loginBtn.addEventListener ('click' , ()=>{
  container.classList.remove('login-active'); 
  body.classList.remove("bg-active");
});



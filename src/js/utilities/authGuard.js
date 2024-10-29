import api from "../api/instance.js";

export function authGuard() {
  const token = api.token
  if (!token) {
    const body = document.querySelector("body")
    console.log(body);
    body.appendChild(diplayAuthGuard())
    
    // alert("You must be logged in to view this page");
    // window.location.href = "../auth/login/";
  }
}

function diplayAuthGuard() {
  const container = document.createElement("div")
  container.textContent = "Welcome to the Noroff Social Community. Connect with the community of the Noroff Vocational Scool of technology and digital media. Log in to your account or register one to start exploring the community."
  container.classList.add("fullscreen-container")
  
  
  const loginBtn = document.createElement("a")
  loginBtn.textContent = "Log in"
  loginBtn.href = "/NoroffSocialApp/auth/login/"

  const registerBtn = document.createElement("a")
  registerBtn.textContent = "Register account"
  registerBtn.href = "/NoroffSocialApp/auth/register/"
  

  container.append(loginBtn, registerBtn)
  
  return container
}

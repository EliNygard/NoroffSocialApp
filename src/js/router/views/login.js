import { onLogin } from "../../ui/auth/login.js";
import { CustomButton } from '../../components/customButton.js';

const form = document.forms.login;
form.addEventListener("submit", onLogin);


// add html dynamically or hard coded?
// const customButton = document.createElement("custom-button")
// customButton.classList.add("btn")
// customButton.setAttribute("text", "Register an account")

// const section = document.getElementById("loginSection")
// section.appendChild(customButton)

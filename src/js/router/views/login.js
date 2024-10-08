import { onLogin } from "../../ui/auth/login.js";

const form = document.forms.login;

form.addEventListener("submit", onLogin);

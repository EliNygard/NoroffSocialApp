import api from "../api/instance.js";

export function authGuard() {
  const token = api.token
  if (!token) {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  }
}

import api from "../api/instance.js";

export function authGuard() {
  const token = api.token;
  if (!token) {
    const body = document.querySelector("body");
    console.log(body);
    body.appendChild(displayAuthGuard());
  }
}

function displayAuthGuard() {
  const container = document.createElement("div");
  container.className = "bg-gray-100 fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center gap-1 p-4 z-50";

  const card = document.createElement("div");
  card.className = "max-w-xl mx-auto flex flex-col items-center px-6 pt-8 pb-4 gap-5 bg-slate-50 rounded shadow-md shadow-red-200/50 border-blue-950 sm:px-11 md:px-20"

  const img = document.createElement("img");
  img.src = "/NoroffSocialApp/images/noroff-logo.png";
  img.alt = "Noroff logo";

  const textContainer = document.createElement("div");
  textContainer.className = "text-black flex flex-col gap-4 items-center text-center text-base md:text-lg"

  const h1 = document.createElement("h1");
  h1.textContent = "Welcome to the ";
  h1.className = "text-xl leading-8 md:text-2xl md:leading-10"

  const span = document.createElement("span");
  span.classList.add("block");
  span.textContent = "Noroff Social Community";

  h1.appendChild(span);

  const p1 = document.createElement("p")
  p1.textContent = "Connect with the community of the Noroff Vocational School of technology and digital media."
  
  const p2 = document.createElement("p")
  p2.textContent = "Log in to your account or register one to start exploring the community."

  const nav = document.createElement("nav")
  nav.className = "flex flex-col gap-6 justify-between mt-3 md:text-lg"

  const login = document.createElement("a")
  login.href = "/NoroffSocialApp/auth/login/"
  login.textContent = "Log in";
  login.className = "btn btn-primary btn-primary-hover"

  const register = document.createElement("a");
  register.href = "/NoroffSocialApp/auth/register/";
  register.textContent = "Register account";
  register.className = "btn btn-primary btn-primary-hover"

  nav.append(login, register)
  textContainer.append(h1, p1, p2)
  card.append(img, textContainer, nav);
  container.appendChild(card);

  return container;
}

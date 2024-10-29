import api from "../../api/instance.js";
import { authGuard } from "../../utilities/authGuard";
import { viewPostsFollowing } from "../../ui/posts/viewPostsFollowing";
import { displayHeader } from "../../ui/global/header.js";
import { onLogout } from "../../ui/auth/logout.js";

authGuard();

async function initializePage() {
  const token = api.token;
  if (token) {
    const headerContainer = document.querySelector("header");

    const header = await displayHeader();

    headerContainer.appendChild(header);
    viewPostsFollowing();
  }

}

initializePage();

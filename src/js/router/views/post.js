import { viewPost } from "../../ui/post/viewPost";
import api from "../../api/instance.js";
import { authGuard } from "../../utilities/authGuard";
import { displayHeader } from "../../ui/global/header.js";
import { togglePostComments } from "../../utilities/toggle.js";

async function initializePage() {
  const token = api.token;
  if (token) {
    try {
      const headerContainer = document.querySelector("header");
      const header = await displayHeader();
      headerContainer.appendChild(header);

      await viewPost();
      togglePostComments()
    } catch {}
  } else {
    authGuard();
  }
}

initializePage();

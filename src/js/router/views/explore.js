import api from "../../api/instance.js";
import { displayHeader } from "../../ui/global/header";
import { viewPostsAll } from "../../ui/posts/viewPostsAll";
import { authGuard } from "../../utilities/authGuard";

authGuard();

async function initializePage() {
    const token = api.token;
    if (token) {
      const headerContainer = document.querySelector("header");
  
      const header = await displayHeader();
  
      headerContainer.appendChild(header);
      viewPostsAll();
    }
  
  }
  
  initializePage();
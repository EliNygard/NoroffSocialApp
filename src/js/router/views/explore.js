import api from "../../api/instance.js";
import { displayHeader } from "../../ui/global/header";
import { viewPostsAll } from "../../ui/posts/viewPostsAll";
import { viewPosts } from "../../ui/posts/viewPosts.js";
import { authGuard } from "../../utilities/authGuard";
import { togglePostComments } from "../../utilities/toggle.js";

authGuard();

async function initializePage() {
  const token = api.token;
  if (token) {
    try {
      const headerContainer = document.querySelector("header");
      const header = await displayHeader();
      headerContainer.appendChild(header);

      const allPosts = await api.posts.read();
      await viewPosts(allPosts, "explore");
      togglePostComments();
    } catch {}
  }
}

initializePage();

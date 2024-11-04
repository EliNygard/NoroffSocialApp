import api from "../../api/instance.js";
import { authGuard } from "../../utilities/authGuard";
import { viewPosts } from "../../ui/posts/viewPosts.js";
import { displayHeader } from "../../ui/global/header.js";
import { togglePostComments } from "../../utilities/toggle.js";

authGuard();

async function initializePage() {
  const token = api.token;
  if (token) {
    try {
      const headerContainer = document.querySelector("header");
      const header = await displayHeader();
      headerContainer.appendChild(header);

      const postsFromFollowing = await api.posts.readFollowing();
      await viewPosts(postsFromFollowing, "home");
      togglePostComments();
    } catch {}
  }
}

initializePage();

import api from "../../api/instance.js";
import { onFollowProfile } from "../profiles/followProfile.js";
import { onUnfollowProfile } from "../profiles/unfollowProfile.js";

/**
 * Fetches and displays all posts.
 *
 * This function retrieves all posts from the API and dynamically creates a list for each post,
 * including the title, author, media (if available), and a follow button for the post author.
 * Each post is appended to the HTML element with the ID "postsAll". If an error occurs during
 * the fetching process, it is logged and an alert is shown.
 *
 * @async
 * @function viewPostsAll
 * @returns {Promise<void>} Resolves when the posts are fetched and displayed, or an error is caught.
 *
 * @throws {Error} Will throw an error if there is an issue fetching the posts from the API.
 */

export async function viewPostsAll() {
  try {
    const posts = await api.posts.read();
    
    const li = posts.map((post) => {
      
      const li = document.createElement("li");

      const h3 = document.createElement("h3");
      h3.textContent = post.title;

      const body = document.createElement("p")
      body.textContent = post.body

      const avatar = document.createElement("img")
      avatar.classList.add("profile-avatar")
      avatar.src = post.author.avatar.url

      const aAuthor = document.createElement("a");
      aAuthor.textContent = `Author: ${post.author.name}`;
      aAuthor.href = `../profiles/profile/?name=${post.author.name}`;

      const img = document.createElement("img");
      img.classList.add("post-img")
      img.src =
        post.media && post.media.url
          ? post.media.url
          : "/images/noroff-logo-icon.png";
      img.onerror = function () {
        img.src = "/images/noroff-logo-icon.png"
        throw new Error("Could not fetch img src. Setting a default img")
      };

      const btnFollow = document.createElement("button");
      btnFollow.textContent = "Follow";
      btnFollow.addEventListener("click", () => onFollowProfile(post.author));
      
      const btnUnfollow = document.createElement("button");
      btnUnfollow.textContent = "Unfollow";
      btnUnfollow.addEventListener("click", () =>
        onUnfollowProfile(post.author)
      );

      li.append(img, h3, body, avatar, aAuthor, btnFollow, btnUnfollow);
      return li;
    });

    document.getElementById("postsAll").append(...li);
  } catch (error) {
    console.error("Error fetching posts: ", error);
    alert(error);
  }
}

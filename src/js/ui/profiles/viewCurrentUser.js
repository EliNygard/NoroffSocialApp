import api from "../../api/instance.js";
import { formatDate } from "../../utilities/formatting.js";

/**
 * Fetches and displays the current logged-in user's profile and posts.
 *
 * This function retrieves the current user's profile from the API, dynamically creates and displays the profile information,
 * including banner, avatar, name, bio, and post count. If the user has written posts, they are displayed as a list with links to individual posts.
 * If no posts are found, a message is displayed encouraging the user to create their first post.
 *
 * @async
 * @function viewCurrentUser
 * @returns {Promise<void>} Resolves when the profile and posts are successfully fetched and displayed, or an error is caught.
 *
 * @throws {Error} Will throw an error if there is an issue fetching the profile from the API.
 */

export async function viewCurrentUser() {
  try {
    const userName = api.user.name;
    const profile = await api.profiles.readSingleProfile(userName);

    const profileCard = document.createElement("section");
    profileCard.className = "sm:text-lg";

    const banner = document.createElement("img");
    banner.className = "w-full aspect-[3/1] object-cover";
    banner.src = profile.banner.url;

    const profileContainer = document.createElement("div");
    profileContainer.className = "my-4 mx-2 flex items-center gap-4";

    const avatar = document.createElement("img");
    avatar.className = "rounded-full size-12 object-cover";
    avatar.src = profile.avatar.url;

    const name = document.createElement("h2");
    name.textContent = profile.name;

    profileContainer.append(avatar, name);

    const bio = document.createElement("p");
    bio.className = "mb-6 mx-2";
    bio.textContent = profile.bio;

    const infoContainer = document.createElement("div");
    infoContainer.className =
      "flex flex-col gap-1 mx-2 sm:flex-row sm:justify-between";

    const countPosts = document.createElement("p");
    countPosts.className = "btn-secondary";
    if (profile._count.posts === 1) {
      countPosts.textContent = `You have written ${profile._count.posts} post`;
    } else if (profile._count.posts === 0 || profile._count.posts >= 2) {
      countPosts.textContent = `You have written ${profile._count.posts} posts`;
    }

    const countFollowing = document.createElement("p");
    countFollowing.className = "btn-secondary";
    if (profile.following.length === 1) {
      countFollowing.textContent = `You are following ${profile.following.length} profile`;
    } else if (profile.following.length === 0 || profile.following.length > 1) {
      countFollowing.textContent = `You are following ${profile.following.length} profiles`;
    }

    const countFollowers = document.createElement("p");
    countFollowers.className = "btn-secondary";
    countFollowers.textContent = `You have ${profile.followers.length} followers`;

    infoContainer.append(countPosts, countFollowing, countFollowers);

    const posts = profile.posts;

    if (posts) {
      const list = posts.map((post) => {

        const li = document.createElement("li");
        li.className = "mx-2";

        // The post
        const postContainer = document.createElement("a");
        postContainer.className = "flex flex-col gap-3 mb-4";
        postContainer.href = `/NoroffSocialApp/post/?id=${post.id}`;

        const img = document.createElement("img");
        img.className = "w-full object-contain";
        if (post.media) {
          img.src = post.media.url;
        }

        const postDate = document.createElement("p");
        postDate.className = "mx-2 text-xs flex justify-end text-stone-700 dark:text-stone-300";
        if (post.updated === post.created) {
          postDate.textContent = formatDate(post.created);
        } else {
          postDate.textContent = formatDate(post.updated);
        }

        const h3 = document.createElement("h3");
        h3.className = "mx-2 font-semibold";
        h3.textContent = post.title;

        const body = document.createElement("p");
        body.className = "mx-2";
        body.textContent = post.body;

        if (img.src) {
          postContainer.appendChild(img);
        }
        postContainer.append(postDate, h3, body);

        li.appendChild(postContainer);
        // li.append(title, body);
        return li;
      });
      document.getElementById("postsList").append(...list);
    } else {
      // rather than alert, display message on page
      alert("You have no posts yet. Why not create your first?");
    }
    profileCard.append(banner, profileContainer, bio, infoContainer);
    document.getElementById("profileCard").appendChild(profileCard);
  } catch (error) {
    console.error("Error fetching profile: ", error);
    alert(error);
  }
}

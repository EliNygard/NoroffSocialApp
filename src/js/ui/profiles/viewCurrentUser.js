import api from "../../api/instance.js";

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

    const banner = document.createElement("img");
    banner.classList.add("profile-banner");
    banner.src = profile.banner.url;

    const avatar = document.createElement("img");
    avatar.classList.add("profile-avatar");
    avatar.src = profile.avatar.url;

    const name = document.createElement("h2");
    name.textContent = profile.name;

    const bio = document.createElement("p");
    bio.textContent = profile.bio;

    const countPosts = document.createElement("p");
    countPosts.textContent = `${profile.name} has written ${profile._count.posts} posts.`;
    const posts = profile.posts;

    if (posts) {
      const list = posts.map((post) => {
        const li = document.createElement("li");

        const title = document.createElement("a");
        title.textContent = post.title;
        title.href = `/post/?id=${post.id}`;

        const body = document.createElement("p");
        body.textContent = post.body;

        li.append(title, body);
        return li;
      });
      document.getElementById("postsList").append(...list);
    } else {
      // rather than alert, display message on page
      alert("You have no posts yet. Why not create your first?");
    }
    profileCard.append(banner, avatar, name, bio, countPosts);
    document.getElementById("profileCard").appendChild(profileCard);
  } catch (error) {
    console.error("Error fetching profile: ", error);
    alert(error);
  }
}

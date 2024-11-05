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
    profileCard.className = "sm:text-lg"

    const banner = document.createElement("img");
    banner.className = "w-full aspect-[3/1] object-cover"
    banner.src = profile.banner.url;

    const profileContainer = document.createElement("div")
    profileContainer.className = "my-4 mx-2 flex items-center gap-4"

    const avatar = document.createElement("img");
    avatar.className = "rounded-full size-12 object-cover"
    avatar.src = profile.avatar.url;

    const name = document.createElement("h2");
    name.textContent = profile.name;

    profileContainer.append(avatar, name)

    const bio = document.createElement("p");
    bio.className = 'mb-6 mx-2'
    bio.textContent = profile.bio;

    const border = document.createElement("div")
    border.className = "border border-gray-400 mb-6 mx-2"

    const countPosts = document.createElement("p");
    countPosts.className = "mb-6 mx-2"
    countPosts.textContent = `${profile.name} has written ${profile._count.posts} posts. Add a post to join the community.`;
    const posts = profile.posts;

    if (posts) {
      const list = posts.map((post) => {
        const li = document.createElement("li");

        const title = document.createElement("a");
        title.textContent = post.title;
        title.href = `../post/?id=${post.id}`;

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
    profileCard.append(banner, profileContainer, bio, border, countPosts);
    document.getElementById("profileCard").appendChild(profileCard);
  } catch (error) {
    console.error("Error fetching profile: ", error);
    alert(error);
  }
}

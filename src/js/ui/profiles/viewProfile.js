import api from "../../api/instance.js";

/**
 * Fetches and displays a single profile with their posts.
 *
 * This function retrieves the profile name from the URL's query parameters, fetches the profile
 * data from the API, and dynamically creates and displays profile information, including their banner,
 * avatar, name, bio, and post count. If the profile has posts, it displays them in the HTML element with the ID "postsList".
 * If the profile has no posts, an alert is triggered. The profile card is displayed in the HTML element with the ID "profileCard".
 *
 * @async
 * @function viewProfile
 * @returns {Promise<void>} Resolves when the profile data is fetched and displayed, or an error is caught.
 *
 * @throws {Error} Will throw an error if there is an issue fetching the profile from the API.
 */

export async function viewProfile() {
  try {
    const parameterString = window.location.search;
    const searchParameters = new URLSearchParams(parameterString);
    const profileName = searchParameters.get("name");

    const profile = await api.profiles.readSingleProfile(profileName);

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

        const title = document.createElement("h4");
        title.textContent = post.title;

        const body = document.createElement("p");
        body.textContent = post.body;

        li.append(title, body);
        return li;
      });
      document.getElementById("postsList").append(...list);
    } else {
      // rather than alert, display message on page
      alert("This profile has no posts yet");
    }
    profileCard.append(banner, avatar, name, bio, countPosts);
    document.getElementById("profileCard").appendChild(profileCard);
  } catch (error) {
    console.error("Error fetching profile: ", error);
    alert(error);
  }
}

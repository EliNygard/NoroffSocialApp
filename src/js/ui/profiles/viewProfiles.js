import api from "../../api/instance.js";
import { onFollowProfile } from "./followProfile.js";
import { onUnfollowProfile } from "./unfollowProfile.js";

/**
 * Fetches and displays a list of profiles with follow/unfollow buttons and links to view profiles and posts.
 *
 * This function fetches profiles from the API with the given limit and page parameters, then creates
 * DOM elements for each profile, including links to view the profile and their posts, as well as
 * follow/unfollow buttons. The profiles are displayed in the HTML element with the ID "profilesAll".
 *
 * @async
 * @function viewProfiles
 * @param {number} limit - The number of profiles to fetch per page.
 * @param {number} page - The page number of profiles to fetch.
 * @returns {Promise<void>} Resolves when the profiles are fetched and displayed, or an error is caught.
 *
 * @throws {Error} Will throw an error if there is a problem fetching profiles from the API.
 */
export async function viewProfiles(limit, page) {
  try {
    const profilesObject = await api.profiles.readAllProfiles(limit, page);

    const profiles = profilesObject.data;

    const list = profiles.map((profile) => {
      const li = document.createElement("li");

      const a = document.createElement("a");
      a.href = `/profiles/profile/?name=${profile.name}`;
      a.innerText = profile.name;

      const btnFollow = document.createElement("button");
      btnFollow.textContent = "Follow";
      btnFollow.addEventListener("click", () => onFollowProfile(profile));

      const btnUnfollow = document.createElement("button");
      btnUnfollow.textContent = "Unfollow";
      btnUnfollow.addEventListener("click", () => onUnfollowProfile(profile));

      const aProfile = document.createElement("a");
      aProfile.href = `/profiles/profile/?name=${profile.name}`;
      aProfile.textContent = "View Profile";

      const aPosts = document.createElement("a");
      aPosts.href = `/profiles/posts/?name=${profile.name}`;
      aPosts.textContent = `View Posts by ${profile.name}`;

      li.append(a, btnFollow, btnUnfollow, aProfile, aPosts);

      return li;
    });

    document.getElementById("profilesAll").innerHTML = "";
    document.getElementById("profilesAll").append(...list);
  } catch (error) {
    console.error("Error fetching profiles: ", error);
    alert(error);
  }
}

import api from "../../api/instance.js";
import { formatDate } from "../../utilities/formatting.ts";
import { onFollowProfile } from "./followProfile.js";
import { onUnfollowProfile } from "./unfollowProfile.js";

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
  const loggedinProfile = api.user.name;
  const profileLoggedin = await api.profiles.readSingleProfile(loggedinProfile);
  const followingProfiles = profileLoggedin.following;
  
  try {
    const parameterString = window.location.search;
    const searchParameters = new URLSearchParams(parameterString);
    const profileName = searchParameters.get("name");
    
    const profile = await api.profiles.readSingleProfile(profileName);

    const profileCard = document.createElement("section");
    profileCard.className = "flex flex-col m-auto mb-6"

    const banner = document.createElement("img");
    banner.className = "w-full aspect-[3/1] object-cover"
    banner.src = profile.banner.url;

    const profileContainer = document.createElement("div")
    profileContainer.className = "my-4 mx-2 flex flex-row justify-between items-center"

    const avatarCard = document.createElement("div")
    avatarCard.className = "flex items-center gap-4"

    const avatar = document.createElement("img");
    avatar.className = "rounded-full size-12 object-cover"
    avatar.src = profile.avatar.url;

    const name = document.createElement("h2");
    name.textContent = profile.name;

    avatarCard.append(avatar, name)

    const toggleFollowBtn = document.createElement("button")
    toggleFollowBtn.className = "btn btn-primary btn-primary-hover"
    toggleFollowBtn.textContent = "Follow"
    toggleFollowBtn.addEventListener("click", () => 
      onFollowProfile(profile.name))

    const toggleUnfollowBtn = document.createElement("button")
    toggleUnfollowBtn.className = "btn btn-primary btn-primary-hover"
    toggleUnfollowBtn.textContent = "Unfollow"
    toggleUnfollowBtn.addEventListener("click", () =>
        onUnfollowProfile(profile.name))

    const isFollowing = followingProfiles.some(followed => followed.name === profile.name)
    
    profileContainer.appendChild(avatarCard)

    if (isFollowing) {
      profileContainer.appendChild(toggleUnfollowBtn)
    } else {
      profileContainer.appendChild(toggleFollowBtn)
    }

    const bio = document.createElement("p");
    bio.className = "mb-6 mx-2"
    bio.textContent = profile.bio;
    
    const infoContainer = document.createElement("div");
    infoContainer.className = "flex flex-col gap-1 mx-2 my-4 sm:flex-row sm:justify-between";

    const countPosts = document.createElement("p");
    countPosts.className = "btn-secondary";
    
    if (profile._count.posts === 1) {
      countPosts.textContent = `${profile.name} has written ${profile._count.posts} post.`;
    } else if (profile._count.posts === 0 || profile._count.posts >= 2) {
      countPosts.textContent = `${profile.name} has written ${profile._count.posts} posts.`;
    }

    const countFollowing = document.createElement("p");
    countFollowing.className = "btn-secondary";
    if (profile.following.length === 1) {
      countFollowing.textContent = `${profile.name} is following ${profile.following.length} profile`;
    } else if (profile.following.length === 0 || profile.following.length > 1) {
      countFollowing.textContent = `${profile.name} is following ${profile.following.length} profiles`;
    }

    const countFollowers = document.createElement("p");
    countFollowers.className = "btn-secondary";
    countFollowers.textContent = `${profile.name} has ${profile.followers.length} followers`;

    infoContainer.append(countFollowing, countFollowers, countPosts);

    const posts = profile.posts;
    

    if (posts) {
      const list = posts.map((post) => {
        
        
        const li = document.createElement("li");
        li.className = "mx-2 mb-7";

        // The post
        const postContainer = document.createElement("div");
        postContainer.className = "flex flex-col gap-3";

        const img = document.createElement("img");
        img.className = "w-full object-contain";
        if (post.media) {
          img.src = post.media.url;
        }

        const postDate = document.createElement("p");
        postDate.className = "mx-2 text-xs flex justify-end text-stone-700";
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

        return li;
      });
      
      document.getElementById("postsList").append(...list);
    } else {
      // rather than alert, display message on page
      alert("This profile has no posts yet");
    }
    profileCard.append(banner, profileContainer)
    if (bio === !null) {
      profileCard.appendChild(bio)
    } else {}
    profileCard.appendChild(infoContainer);

    document.getElementById("profileCard").appendChild(profileCard);
  } catch (error) {
    console.error("Error fetching profile: ", error);
    alert(error);
  }
}

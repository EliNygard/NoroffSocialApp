import api from "../../api/instance.js";

/**
 * Fetches and displays posts made by a specific profile.
 *
 * This function retrieves the profile name from the URL's query parameters, fetches the posts
 * data associated with that profile from the API, and dynamically creates and displays each post
 * with its title, image, and body. If no posts are found, a message is displayed to the user.
 * The posts are appended to the body of the document.
 *
 * @async
 * @function viewPostsByProfile
 * @returns {Promise<void>} Resolves when the posts are fetched and displayed, or an error is caught.
 *
 * @throws {Error} Will throw an error if there is an issue fetching the posts from the API.
 */

export async function viewPostsByProfile() {
  try {
    const parameterString = window.location.search;
    const searchParameters = new URLSearchParams(parameterString);
    const profileName = searchParameters.get("name");

    const postsObject = await api.profiles.readPostsByProfile(profileName);
    const posts = postsObject.data;

    if (posts) {
      const list = posts.map((post) => {
        const li = document.createElement("li");

        const title = document.createElement("h3");
        title.textContent = post.title;

        const img = document.createElement("img");
        img.src =
          post.media && post.media.url
            ? post.media.url
            : "https://picsum.photos/id/14/200/300";

        img.onerror = function () {
          img.alt = post.media.alt;
        };

        const body = document.createElement("p");
        body.textContent = post.body;

        li.append(img, title, body);
        return li;
      });
      document.querySelector("body").append(...list);
    } else {
      // rather than alert, display message on page
      alert("This profile has no posts");
    }
  } catch (error) {
    console.error("Error fetching posts: ", error);
    alert(error);
  } finally {
    // end loader
  }
}

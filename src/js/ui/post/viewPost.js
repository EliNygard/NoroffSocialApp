import api from "../../api/instance.js";
import { onDeletePost } from "./deletePost.js";

/**
 * Fetches and displays a specific post on the page based on the URL's query parameter.
 *
 * This function retrieves a post's ID from the URL search parameters, fetches the post from the API,
 * and dynamically creates and appends a section to the DOM displaying the post's title and body.
 * It also adds "Edit" and "Delete" buttons for the post.
 *
 * @async
 * @function viewPost
 * @returns {Promise<void>} Resolves when the post is successfully fetched and rendered to the DOM.
 * @throws {Error} Logs any error that occurs during the post fetch or DOM manipulation.
 */
export async function viewPost() {
  try {
    const id = api.idUrl;

    if (!id)
      throw new Error("Could not find a post ID. Unable to display the post.");

    const post = await api.post.read(id);

    const section = document.createElement("section");

    const h2 = document.createElement("h2");
    h2.textContent = post.title;

    const p = document.createElement("p");
    p.textContent = post.body;

    const btnEdit = document.createElement("a");
    btnEdit.href = `/post/edit/?id=${id}`;
    btnEdit.textContent = "Edit";

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Delete";
    btnDelete.addEventListener("click", () => onDeletePost());

    section.append(h2, p, btnEdit, btnDelete);

    document.querySelector("body").appendChild(section);
  } catch (error) {
    console.error("Error getting post: ", error);
    alert(error);
  }
}

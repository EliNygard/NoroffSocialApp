import api from "../../api/instance.js";

/**
 * Handles the submission of a form to update a post.
 *
 * This function prevents the default form submission behavior, gathers the form data, and sends a request to update the post with the specified ID.
 * If the update is successful, the user is redirected to the updated post's page. In case of an error, it is logged and an alert is shown to the user.
 *
 * @async
 * @function onUpdatePost
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} Resolves when the post is successfully updated, or an error is caught.
 *
 * @throws {Error} Will throw an error if there is an issue updating the post via the API.
 */

export async function onUpdatePost(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const id = api.idUrl;

  try {
    const post = (await api.post.update(id, data)).data;
    window.location.href = `/post/?id=${post.id}`;
  } catch (error) {
    console.error("Error updating post: ", error);
    alert(error);
  } finally {
    // hide loader
  }
}

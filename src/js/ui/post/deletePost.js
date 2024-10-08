import api from "../../api/instance.js";

/**
 * Deletes a post by its ID.
 *
 * This function retrieves the post ID from the API, attempts to delete the post, and alerts the user if the deletion is successful.
 * If an error occurs during the deletion process, it is logged, and an alert is shown to the user.
 * After the operation, the user is redirected to the profile page.
 *
 * @async
 * @function onDeletePost
 * @returns {Promise<void>} Resolves when the post is successfully deleted or an error is caught.
 *
 * @throws {Error} Will throw an error if there is an issue deleting the post via the API.
 */

export async function onDeletePost() {
  const id = api.idUrl;

  try {
    await api.post.delete(id);
    alert(`Post #${id} has been deleted`);
  } catch (error) {
    console.error("Error deleting post", error);
    alert(error);
  } finally {
    window.location.href = "/profile/";
  }
}

import api from "../../api/instance.js";

/**
 * Deletes a specific comment from a post.
 *
 * This function attempts to delete a comment identified by `commentId` from the post with the given `postId`.
 * If successful, it shows an alert notifying the user that the comment has been deleted and redirects the user to the home page.
 * If an error occurs during the deletion process, it is logged and an alert is shown.
 *
 * @async
 * @function onDeleteComment
 * @param {number} postId - The ID of the post from which the comment is being deleted.
 * @param {number} commentId - The ID of the comment to be deleted.
 * @returns {Promise<void>} Resolves when the comment is deleted, or an error is caught.
 *
 * @throws {Error} Will throw an error if there is an issue deleting the comment from the API.
 */

export async function onDeleteComment(postId, commentId) {
  try {
    await api.posts.deleteComment(postId, commentId);
    alert(`Comment #${commentId} has been deleted.`);
    window.location.href = "/";
  } catch (error) {
    console.error("Error: ", error);
    alert(error);
  }
}

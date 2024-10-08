import api from "../../api/instance.js";

/**
 * Submits a comment on a specific post.
 *
 * This function handles the submission of a comment form. It prevents the default form submission behavior,
 * collects the form data, and sends a request to the API to add the comment to the specified post. If successful,
 * an alert is shown to the user, and the form is reset.
 * If an error occurs during the submission process, it is logged and an alert is shown. After submission, the user is redirected to the home page.
 *
 * @async
 * @function onComment
 * @param {Event} event - The form submission event.
 * @param {number} postId - The ID of the post to which the comment is being added.
 * @returns {Promise<void>} Resolves when the comment is submitted or an error is caught.
 *
 * @throws {Error} Will throw an error if there is an issue adding the comment to the API.
 */

export async function onComment(event, postId) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    // show loader
    await api.posts.commentOnPost(postId, data);
    alert("Comment added.");
  } catch (error) {
    console.error("Error trying to add comment: ", error);
    alert(error);
  } finally {
    form.reset();
    localStorage.removeItem("id");
    window.location.href = "/";
    // hide loader
  }
}

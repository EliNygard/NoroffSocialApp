import api from "../../api/instance.js";

/**
 * Handles the submission of a form to create a new post.
 *
 * This function prevents the default form submission behavior, gathers the form data, and sends a request to create a new post via the API.
 * If the creation is successful, the user is redirected to the newly created post's page. In case of an error, it is logged, and an alert is shown to the user.
 * The form is reset after submission.
 *
 * @async
 * @function onCreatePost
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} Resolves when the post is successfully created or an error is caught.
 *
 * @throws {Error} Will throw an error if there is an issue creating the post via the API.
 */

export async function onCreatePost(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    // show loader
    const post = (await api.post.create(data)).data;
    window.location.href = `/post/?id=${post.id}`;
  } catch (error) {
    console.error("Error creating post: ", error);
    alert(error);
  } finally {
    form.reset();
    // hide loader
  }
}

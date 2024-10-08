import api from "../../api/instance.js";

/**
 * Handles the submission of a login form to authenticate a user.
 *
 * This function prevents the default form submission behavior, gathers the form data, and sends a login request to the API.
 * If the login is successful, the user is redirected to the home page. If the login fails, an error is logged, and the user is redirected to the login page.
 *
 * @async
 * @function onLogin
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} Resolves when the login process is completed or an error is caught.
 *
 * @throws {Error} Will throw an error if there is an issue during the login process via the API.
 */

export async function onLogin(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  let loginSuccessful = false;

  //show loader

  try {
    await api.auth.login(data);
    loginSuccessful = true;
  } catch (error) {
    console.error(error);
    alert(error);
    window.location.href = "/auth/login/";
  } finally {
    if (loginSuccessful) {
      window.location.href = "/";
    }
    //hide loader
  }
}

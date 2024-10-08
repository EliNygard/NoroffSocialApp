import api from "../../api/instance.js";

/**
 * Handles the submission of a registration form to register a new user.
 *
 * This function prevents the default form submission behavior, collects the form data, and sends a request to register a new user via the API.
 * If the registration is successful, the user is redirected to the login page. In case of an error, it is logged and an alert is shown to the user.
 *
 * @async
 * @function onRegister
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} Resolves when the registration is completed or an error is caught.
 *
 * @throws {Error} Will throw an error if there is an issue registering the user via the API.
 */

export async function onRegister(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  //show loader

  try {
    await api.auth.register(data);
  } catch (error) {
    console.error(error);
    alert(error);
  } finally {
    window.location.href = "/auth/login/";
    //hide loader
  }
}

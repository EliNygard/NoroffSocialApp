import api from "../../api/instance.js";

/**
 * Attaches a logout event listener to all elements with the `data-auth="logout"` attribute.
 *
 * This function selects all elements with the `data-auth="logout"` attribute and adds a click event listener to each.
 * When clicked, the event triggers the API's logout functionality, logging the user out.
 *
 * @function setLogoutListener
 * @returns {void}
 */

export function setLogoutListener() {
  const buttons = document.querySelectorAll("[data-auth=logout]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      api.auth.logout();
    });
  });
}

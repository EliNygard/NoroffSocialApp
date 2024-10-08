import api from "../../api/instance.js";

/**
 * Unfollows a given profile.
 *
 * This function attempts to unfollow the specified profile by calling the API.
 * If the operation is successful, an alert is displayed notifying the user that they are no longer following the profile.
 * If an error occurs, it logs the error and alerts the user.
 *
 * @async
 * @function onUnfollowProfile
 * @param {Object} profile - The profile object containing the name of the profile to unfollow.
 * @param {string} profile.name - The name of the profile to unfollow.
 * @returns {Promise<Object|undefined>} Returns the unfollowed profile object if the operation is successful, or undefined if an error occurs.
 *
 * @throws {Error} Will throw an error if there is an issue during the unfollow operation.
 */

export async function onUnfollowProfile(profile) {
  const unfollow = profile.name;
  try {
    await api.profiles.unfollow(unfollow);
    alert(`You are not following ${unfollow} anymore.`);

    if (window.location.pathname === "/" || window.location.pathname.includes("/index.html")) {
      window.location.reload()
    }
  } catch (error) {
    console.error("Error trying to unfollow profile: ", error);
    alert(error);
  } finally {
    // loader
  }
}

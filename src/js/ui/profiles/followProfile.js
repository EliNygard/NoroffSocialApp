import api from "../../api/instance.js";

/**
 * Follows a given profile.
 *
 * This function attempts to follow the specified profile by calling the API.
 * If the operation is successful, an alert is displayed notifying the user that they are now following the profile.
 * If an error occurs, it logs the error and alerts the user.
 *
 * @async
 * @function onFollowProfile
 * @param {Object} profile - The profile object containing the name of the profile to follow.
 * @param {string} profile.name - The name of the profile to follow.
 * @returns {Promise<Object|undefined>} Returns the followed profile object if the operation is successful, or undefined if an error occurs.
 *
 * @throws {Error} Will throw an error if there is an issue during the follow operation.
 */

export async function onFollowProfile(profile) {
  const follow = profile.name;
  try {
    await api.profiles.follow(follow);
    alert(`You are now following ${follow}.`);
  } catch (error) {
    console.error("Error trying to follow profile: ", error);
    alert(error);
  }
}

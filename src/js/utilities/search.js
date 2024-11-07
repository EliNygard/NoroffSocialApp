import api from "../api/instance.js";
import { displaySearchResults } from "../ui/global/displaySearchResults.js";

export async function searchProfiles() {
  const query = document.getElementById("searchInput").value;

  const profiles = await api.profiles.searchProfile(query);
  displaySearchResults(profiles)
}

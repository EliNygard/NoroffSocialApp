import api from "../../api/instance.js";
import { getUrlParameter } from "../../utilities/getUrlParam.js";

export async function displayHeader() {
  const profileName = api.user.name || getUrlParameter("name");
  console.log(profileName);

  if (!profileName) {
    console.warn("No profile name found. Exiting function.");
    return;
  }

  let profile;

  try {
    const profile = await api.profiles.readSingleProfile(profileName);
    console.log(profile);
    if (!profile || !profile.avatar)
      throw new Error("No profile or avatar image found");

    const nav = document.createElement("nav");
    nav.style =
      "display: flex; flex-direction: row; justify-content: space-between;";

    const aLogo = document.createElement("a");
    aLogo.href = "/NoroffSocialApp/";

    const imgLogo = document.createElement("img");
    imgLogo.src = "/NoroffSocialApp/images/noroff-logo.png"
    imgLogo.alt = "Noroff logo";
    imgLogo.style = "width: 100px; object-fit: contain;";

    
    const aProfile = document.createElement("a");
    aProfile.href = `/NoroffSocialApp/profile/?view=profile&name=${profile.name}`;
    
    const imgProfile = document.createElement("img");
    imgProfile.src = profile.avatar.url;
    imgProfile.style =
    "border-radius: 50%; height: 50px; width: 50px; object-fit: cover;";
    
    const div = document.createElement("div")

    const aHome = document.createElement("a")
    aHome.href = "/NoroffSocialApp/"
    aHome.textContent = "Home"
    
    const aCommunity = document.createElement("a")
    aCommunity.href = "/NoroffSocialApp/explore/"
    aCommunity.textContent = "Community"
    
    const aNewPost = document.createElement("a")
    aNewPost.href = "/NoroffSocialApp/post/create/"
    aNewPost.textContent = "New Post"

    aLogo.appendChild(imgLogo);
    aProfile.appendChild(imgProfile)
    div.append(aHome, aCommunity, aNewPost)
    nav.append(aLogo, aProfile, div);

    return nav;
  } catch (error) {
    console.error(error);
    profile = { avatar: { url: "P" } };
  }
}

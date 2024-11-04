import api from "../../api/instance.js";
import { getUrlParameter } from "../../utilities/getUrlParam.js";

export async function displayHeader() {
  const profileName = api.user.name || getUrlParameter("name");

  if (!profileName) {
    console.warn("No profile name found. Exiting function.");
    return;
  }

  let profile;

  try {
    const profile = await api.profiles.readSingleProfile(profileName);
    if (!profile || !profile.avatar)
      throw new Error("No profile or avatar image found");

    const nav = document.createElement("nav");
    nav.className = "flex flex-col mt-4 max-w-xl m-auto px-2"

    const divFirst = document.createElement("div")
    divFirst.className = "flex justify-between items-center"

    const aLogo = document.createElement("a");
    aLogo.href = "/NoroffSocialApp/";

    const imgLogo = document.createElement("img");
    imgLogo.className= "h-12 object-contain"
    imgLogo.src = "/NoroffSocialApp/images/noroff-logo.png"
    imgLogo.alt = "Noroff logo";
    
    const aProfile = document.createElement("a");
    aProfile.href = `/NoroffSocialApp/profile/?view=profile&name=${profile.name}`;
    
    const imgProfile = document.createElement("img");
    imgProfile.className = "justify-self-end h-12 w-12 rounded-full object-cover"
    imgProfile.src = profile.avatar.url;
    
    const divSec = document.createElement("div")
    divSec.className = "flex justify-between mt-4 mb-8"

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
    divFirst.append(aLogo, aProfile)
    divSec.append(aHome, aCommunity, aNewPost)
    nav.append(divFirst, divSec);

    return nav;
  } catch (error) {
    console.error(error);
    profile = { avatar: { url: "P" } };
  }
}

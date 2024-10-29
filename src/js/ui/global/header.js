import api from "../../api/instance.js"

export async function displayHeader() {
    const parameterString = window.location.search;
    console.log(parameterString);
    
    const searchParameters = new URLSearchParams(parameterString);
    console.log(searchParameters);
    
    const profileName = searchParameters.get("name");
    console.log(profileName);
    

    const profile = await api.profiles.readSingleProfile(profileName);
    console.log(profile);
    

    const header = document.createElement("header")

    const div = document.createElement("div")

    const imgLogo = document.createElement("img")
    imgLogo.src = "./images/noroff-logo.png"
    imgLogo.alt = "Noroff logo"

    const imgProfile = document.createElement("img")
    imgProfile.src = profile.avatar.url

    div.append(imgLogo, imgProfile)
    header.appendChild(div)
    console.log(header);
    
    return header
}
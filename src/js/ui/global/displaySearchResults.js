export function displaySearchResults(profiles) {
  const result = profiles.data;
  const resultContainer = document.getElementById("searchResults");
  resultContainer.innerHTML = "";

  result.forEach((profile) => {
    console.log(profile);

    console.log(profile.name);

    const resultElement = document.createElement("div");
    resultElement.className = "bg-red";
    const profileName = document.createElement("p");
    profileName.textContent = result.name;
    const avatar = document.createElement("img");
    avatar.src = profile.avatar.url;
    avatar.alt = profile.avatar.alt;

    //follow/unfollow button

    resultElement.append(profileName, avatar);

    resultContainer.append(resultElement);
  });
}

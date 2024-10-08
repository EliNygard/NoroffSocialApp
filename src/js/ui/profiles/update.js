import api from "../../api/instance.js";

export async function onUpdateProfile(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const data = {
    bio: formData.get("bio"),
  };
  const avatarUrl = formData.get("avatar");
  if (avatarUrl) {
    data.avatar = {
      url: String(avatarUrl),
      alt: "Your avatar image",
    };
  }
  const bannerUrl = formData.get("banner");
  if (bannerUrl) {
    data.banner = {
      url: String(bannerUrl),
      alt: "Your banner image",
    };
  }

  const profileName = api.user.name;

  try {
    await api.profiles.update(profileName, data);
    window.location.reload();
  } catch (error) {
    console.error("Error updating profile: ", error);
    alert(error);
  } finally {
    // hide loader
  }
}

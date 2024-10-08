import { onUpdateProfile } from "../../ui/profiles/update";
import { viewCurrentUser } from "../../ui/profiles/viewCurrentUser";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const form = document.forms.updateProfile;

form.addEventListener("submit", onUpdateProfile);

viewCurrentUser();

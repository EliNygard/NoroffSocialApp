import { onLogout } from "../../ui/auth/logout";
import { displayHeader } from "../../ui/global/header";
import { onUpdateProfile } from "../../ui/profiles/update";
import { viewCurrentUser } from "../../ui/profiles/viewCurrentUser";
import { authGuard } from "../../utilities/authGuard";

authGuard();

async function initializePage() {
    
    try {
        const headerContainer = document.querySelector("header");
      const header = await displayHeader();
      headerContainer.appendChild(header);

      const updateProfileBtn = document.getElementById("updateProfileBtn")
      const updateProfileForm = document.getElementById("updateProfile")
      updateProfileBtn.addEventListener("click", () => {
        if (updateProfileForm) {
            window.scrollTo({
              top: updateProfileForm.offsetTop + -150,
              behavior: "smooth",
            })
        
          } else{
            window.scrollTo(0, 0)
          }
      })

        const form = document.forms.updateProfile;
        form.addEventListener("submit", onUpdateProfile);
        viewCurrentUser();
        onLogout()

    } catch {}

}

initializePage()





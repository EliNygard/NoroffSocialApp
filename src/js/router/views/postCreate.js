import { onCreatePost } from "../../ui/post/createPost";
import { authGuard } from "../../utilities/authGuard";
import { PostFormComponent } from "../../components/postFormComponent";
import { displayHeader } from "../../ui/global/header";


authGuard();
async function initializePage() {

  try {
    const headerContainer = document.querySelector("header");
    const header = await displayHeader();
    headerContainer.appendChild(header);

    await customElements.whenDefined('post-form')

    const postFormComponent = document.querySelector('post-form');
    const form = postFormComponent.form
    
    form.addEventListener("submit", onCreatePost);

  } catch {}
}

initializePage();

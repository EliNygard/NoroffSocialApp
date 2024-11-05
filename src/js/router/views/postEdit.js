import { authGuard } from "../../utilities/authGuard";
import { onUpdatePost } from "../../ui/post/updatePost.js";
import api from "../../api/instance.js";
import { PostFormComponent } from "../../components/postFormComponent.js";
import { displayHeader } from "../../ui/global/header.js";

// const form = document.forms.editPost;


authGuard();
async function initializePage() {
  const id = api.idUrl;
  
  try {
    const headerContainer = document.querySelector("header");
    const header = await displayHeader();
    headerContainer.appendChild(header);
    
    await customElements.whenDefined("post-form");
    
    const postFormComponent = document.querySelector("post-form");
    const form = postFormComponent.form;

    if (id) {
      try {

        api.post.loadPostData(id, form);
        form.addEventListener("submit", onUpdatePost);

      } catch (error) {
        console.error("Error loading post data:", error);
        alert(error);
      }
    }
  } catch {}
}

initializePage();

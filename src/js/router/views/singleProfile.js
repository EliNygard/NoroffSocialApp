import api from "../../api/instance.js";
import { displayHeader } from "../../ui/global/header.js";
import { viewProfile } from "../../ui/profiles/viewProfile";
import { authGuard } from "../../utilities/authGuard";

async function initializePage() {
    const token = api.token
    if(token) {
        try {
            const headerContainer = document.querySelector("header");
      const header = await displayHeader();
      headerContainer.appendChild(header);
      await viewProfile()
        } catch {}

    } else {
        authGuard()
    }
}

initializePage()
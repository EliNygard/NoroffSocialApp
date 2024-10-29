import api from "../../api/instance.js"
import { authGuard } from "../../utilities/authGuard";
import { viewPostsFollowing } from "../../ui/posts/viewPostsFollowing";

import { displayHeader } from "../../ui/global/header.js";

import { onLogout } from "../../ui/auth/logout.js";


authGuard();
onLogout()

const token = api.token
if(token) {
    const body = document.querySelector("body")
    console.log(body);

    const header = displayHeader()
    
    body.appendChild(displayHeader())
    viewPostsFollowing();
}

console.log("home page");


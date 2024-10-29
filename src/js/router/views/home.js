import api from "../../api/instance.js"
import { authGuard } from "../../utilities/authGuard";
import { viewPostsFollowing } from "../../ui/posts/viewPostsFollowing";
import { onLogout } from "../../ui/auth/logout.js";

authGuard();
onLogout()

const token = api.token
if(token) {
    viewPostsFollowing();
}

console.log("home page");


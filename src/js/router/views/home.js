import api from "../../api/instance.js"
import { authGuard } from "../../utilities/authGuard";
import { viewPostsFollowing } from "../../ui/posts/viewPostsFollowing";

authGuard();

const token = api.token
if(token) {
    viewPostsFollowing();
}

console.log("home page");


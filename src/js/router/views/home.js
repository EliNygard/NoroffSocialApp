import { authGuard } from "../../utilities/authGuard";
import { viewPostsFollowing } from "../../ui/posts/viewPostsFollowing";

authGuard();
viewPostsFollowing();

console.log("home page");


import api from "../../api/instance.js";
import { onUnfollowProfile } from "../profiles/unfollowProfile.js";
import { onComment } from "./addComment.js";
import { onDeleteComment } from "./deleteComment.js";

/**
 * Fetches and displays posts made by profiles the user is following.
 *
 * This function retrieves posts from the API made by profiles that the logged-in user is following.
 * It dynamically creates and displays each post's title, author, media, comment count, and form to submit comments.
 * The function also displays the comments for each post, and if the logged-in user is the author of a comment,
 * a button to delete the comment is displayed. The posts and comments are appended to the HTML element with the ID "postsFollowing".
 *
 * @async
 * @function viewPostsFollowing
 * @returns {Promise<void>} Resolves when the posts and their comments are fetched and displayed, or an error is caught.
 *
 * @throws {Error} Will throw an error if there is an issue fetching the posts from the API.
 */

export async function viewPostsFollowing() {
  try {
    const posts = await api.posts.readFollowing();
    const loggedinProfile = api.user.name;

    const list = posts.map((post) => {
      const li = document.createElement("li");

      const h3 = document.createElement("h3");
      h3.textContent = post.title;

      const body = document.createElement("p");
      body.textContent = post.body;

      const avatar = document.createElement("img");
      avatar.classList.add("profile-avatar");
      avatar.src = post.author.avatar.url;

      const aAuthor = document.createElement("a");
      aAuthor.textContent = `Author: ${post.author.name}`;
      aAuthor.href = `../profiles/profile/?name=${post.author.name}`;

      const btnUnFollow = document.createElement("button");
      btnUnFollow.textContent = "Unfollow";
      btnUnFollow.addEventListener("click", () =>
        onUnfollowProfile(post.author)
      );

      const img = document.createElement("img");
      img.classList.add("post-img");
      img.src =
        post.media && post.media.url
          ? post.media.url
          : "/images/noroff-logo-icon.png";

      img.onerror = function () {
        img.src = "/images/noroff-logo-icon.png";
        throw new Error("Could not fetch img src. Setting a default img");
      };

      const xComments = document.createElement("p");
      xComments.textContent = `Comments: ${post._count.comments}`;

      const sectionComment = document.createElement("section");

      const form = document.createElement("form");
      form.setAttribute("name", "commentOnPost");

      const label = document.createElement("label");
      label.setAttribute("for", "body");
      label.textContent = "Write your comment";

      const textarea = document.createElement("textarea");
      textarea.setAttribute("name", "body");
      textarea.setAttribute("id", "body");

      const button = document.createElement("button");
      button.textContent = "Comment";
      button.setAttribute("type", "submit");

      form.append(label, textarea, button);
      sectionComment.appendChild(form);

      form.addEventListener("submit", (event) => {
        const id = post.id;
        onComment(event, id);
      });

      const commentsArray = post.comments;
      const commentsList = commentsArray.map((comment) => {
        const postId = comment.postId;
        const commentId = comment.id;

        const li = document.createElement("li");

        const aAuthor = document.createElement("a");
        aAuthor.textContent = `Comment by: ${comment.author.name}`;
        aAuthor.href = `/profiles/profile/?name=${comment.author.name}`;

        const body = document.createElement("p");
        body.textContent = comment.body;

        const btnContainer = document.createElement("div");

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Delete comment";
        btnDelete.addEventListener("click", () =>
          onDeleteComment(postId, commentId)
        );

        const author = comment.author.name;

        if (author === loggedinProfile) {
          btnContainer.appendChild(btnDelete);
        }

        li.append(aAuthor, body, btnContainer);
        return li;
      });

      li.append(
        img,
        h3,
        body,
        avatar,
        aAuthor,
        btnUnFollow,
        xComments,
        sectionComment,
        ...commentsList
      );
      return li;
    });
    document.getElementById("postsFollowing").append(...list);
  } catch (error) {
    console.error("Error fetching posts: ", error);
    alert(error);
  } finally {
    //loader
  }
}

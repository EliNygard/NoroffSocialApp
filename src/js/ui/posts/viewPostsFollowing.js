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

    console.log(posts);

    const loggedinProfile = api.user.name;

    const list = posts.map((post) => {
      const li = document.createElement("li");
      li.className = "my-4 mb-5";

      // Header profile, follow/unfollow button
      const profileHeader = document.createElement("div");
      profileHeader.className =
        "flex flex-row justify-between items-center mb-2 mx-2";

      const leftContainer = document.createElement("a");
      leftContainer.className = "flex justify-start items-center gap-3";
      leftContainer.href = `./profiles/profile/?view=profile&name=${post.author.name}`;

      const headerAvatar = document.createElement("img");
      headerAvatar.className = "rounded-full object-cover size-12";
      headerAvatar.src = post.author.avatar.url;
      headerAvatar.alt = `Profile image of ${post.author.name}`;

      const usernameHeader = document.createElement("p");
      usernameHeader.textContent = post.author.name;

      const btnToggleFollow = document.createElement("button");
      btnToggleFollow.classList.add(
        "btn",
        "btn-primary",
        "btn-primary-hover",
        "text-sm",
        "max-h-10"
      );
      btnToggleFollow.textContent = "Unfollow";
      btnToggleFollow.addEventListener("click", () =>
        onUnfollowProfile(post.author)
      );

      leftContainer.append(headerAvatar, usernameHeader);
      profileHeader.append(leftContainer, btnToggleFollow);

      // The post
      const postContainer = document.createElement("article");
      postContainer.className = "flex flex-col gap-3 mb-4";

      const img = document.createElement("img");
      img.className = "w-full object-contain";
      if (post.media) {
        img.src = post.media.url;
      }

      const postDate = document.createElement("p");
      postDate.className = "mx-2 text-xs flex justify-end text-stone-700";
      if (post.updated === post.created) {
        postDate.textContent = post.created;
      } else {
        postDate.textContent = post.updated;
      }

      const h3 = document.createElement("h3");
      h3.className = "mx-2 font-semibold";
      h3.textContent = post.title;

      const body = document.createElement("p");
      body.className = "mx-2";
      body.textContent = post.body;

      if (img.src) {
        postContainer.appendChild(img);
      }
      postContainer.append(postDate, h3, body);

      // Comments section
      const commentsContainer = document.createElement("div");
      commentsContainer.className = "mx-2 mb-4";

      const btnToggleComments = document.createElement("button");
      btnToggleComments.className = "flex flex-row items-center gap-1 mb-2";

      const icon = document.createElement("i");
      icon.className = "fa-regular fa-comment size-6";

      const xComments = document.createElement("p");
      xComments.textContent = `Comments: ${post._count.comments}`;

      btnToggleComments.append(icon, xComments);

      const commentsWrapper = document.createElement("div");
      commentsWrapper.classList.add("hidden");
      commentsWrapper.setAttribute("id", "commentsSection");

      const orderedList = document.createElement("ol");
      orderedList.className = "m-2";

      const commentsArray = post.comments;
      const commentsList = commentsArray.map((comment) => {
        const postId = comment.postId;
        const commentId = comment.id;

        const li = document.createElement("li");
        li.className = "py-1";

        const div = document.createElement("div");
        div.className = "flex flex-row justify-between";

        const commentContainer = document.createElement("div");
        commentContainer.className = "text-sm";

        const aAuthor = document.createElement("a");
        aAuthor.textContent = `Comment by: ${comment.author.name}`;
        aAuthor.href = `/profiles/profile/?name=${comment.author.name}`;

        const body = document.createElement("p");
        body.textContent = comment.body;

        // start here, add button, find icon on font awsome
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

      const avatar = document.createElement("img");
      avatar.classList.add("profile-avatar");
      avatar.src = post.author.avatar.url;

      const aAuthor = document.createElement("a");
      aAuthor.textContent = `Author: ${post.author.name}`;
      aAuthor.href = `./profiles/profile/?view=profile&name=${post.author.name}`;

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

      // if (img.src) {
      //   li.append(img);
      // }

      orderedList.append(...commentsList);

      li.append(
        profileHeader,
        postContainer,
        orderedList
        // sectionComment,
        // ...commentsList
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

import api from "../../api/instance.js";
import { formatDate } from "../../utilities/formatting.js";
import { onFollowProfile } from "../profiles/followProfile.js";
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

export async function viewPosts(posts) {
  const loggedinProfile = api.user.name;
  const profile = await api.profiles.readSingleProfile(loggedinProfile);
  const followingProfiles = profile.following;

  try {
    // use this to add delete post if user is in local storage

    const list = posts.map((post) => {
      const li = document.createElement("li");
      li.className = "my-4 mb-5";

      // Header profile, follow/unfollow button
      const profileHeader = document.createElement("div");
      profileHeader.className =
        "flex flex-row justify-between items-center mb-2 mx-2";

      const leftContainer = document.createElement("a");
      leftContainer.className = "flex justify-start items-center gap-3";
      leftContainer.href = `/NoroffSocialApp/profiles/profile/?view=profile&name=${post.author.name}`;

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
        "text-sm"
      );
      btnToggleFollow.textContent = "Follow";
      btnToggleFollow.addEventListener("click", () =>
        onFollowProfile(post.author)
      );

      const btnToggleUnFollow = document.createElement("button");
      btnToggleUnFollow.classList.add(
        "btn",
        "btn-primary",
        "btn-primary-hover",
        "text-sm"
      );
      btnToggleUnFollow.textContent = "Unfollow";
      btnToggleUnFollow.addEventListener("click", () =>
        onUnfollowProfile(post.author)
      );

      leftContainer.append(headerAvatar, usernameHeader);
      profileHeader.appendChild(leftContainer);

      const isFollowing = followingProfiles.some(
        (followed) => followed.name === post.author.name
      );

      if (isFollowing) {
        profileHeader.appendChild(btnToggleUnFollow);
      } else {
        profileHeader.appendChild(btnToggleFollow);
      }

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
        postDate.textContent = formatDate(post.created);
      } else {
        postDate.textContent = formatDate(post.updated);
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
      const commentsSection = document.createElement("div");
      commentsSection.className = "mx-2 mb-4 comments";

      const btnToggleComments = document.createElement("button");
      btnToggleComments.className =
        "flex flex-row items-center gap-1 md:gap-2 mb-2";
      btnToggleComments.setAttribute("data-toggle-comments", "true");

      const icon = document.createElement("i");
      icon.className = "fa-regular fa-comment";

      const xComments = document.createElement("p");
      xComments.className = "text-xs md:text-sm";
      xComments.textContent = `Comments: ${post._count.comments}`;
      if (post._count.comments > 0) {
        xComments.setAttribute("title", "View all comments");
      } else {
        xComments.setAttribute("title", "This post has 0 comments");
      }

      btnToggleComments.append(icon, xComments);

      const commentsWrapper = document.createElement("div");
      commentsWrapper.classList.add("hidden");
      commentsWrapper.setAttribute("id", "commentsSection");

      const orderedList = document.createElement("ol");
      orderedList.className = "mx-3";

      const commentsArray = post.comments;
      const commentsList = commentsArray.map((comment) => {
        const postId = comment.postId;
        const commentId = comment.id;

        const commentsLi = document.createElement("li");
        commentsLi.className = "py-1";

        const div = document.createElement("div");
        div.className = "flex flex-row justify-between";

        const commentContainer = document.createElement("div");
        commentContainer.className = "text-sm";

        const aAuthor = document.createElement("a");
        aAuthor.className = "font-semibold";
        aAuthor.textContent = `${comment.author.name}`;
        aAuthor.href = `/NoroffSocialApp/profiles/profile/?name=${comment.author.name}`;

        const body = document.createElement("p");
        body.className = "pt-2";
        body.textContent = comment.body;

        commentContainer.append(aAuthor, body);

        const btnDeleteComment = document.createElement("button");
        btnDeleteComment.setAttribute("title", "Delete comment");
        btnDeleteComment.addEventListener("click", () =>
          onDeleteComment(postId, commentId)
        );

        const icon = document.createElement("i");
        icon.className = "fa-regular fa-trash-can size-6";

        btnDeleteComment.appendChild(icon);

        div.append(commentContainer);
        const author = comment.author.name;
        if (author === loggedinProfile) {
          div.appendChild(btnDeleteComment);
        }

        const date = document.createElement("p");
        date.className = "text-xs text-stone-700 mt-3";
        date.textContent = formatDate(comment.created);

        commentsLi.append(div, date);

        return commentsLi;
      });

      // Add comment form

      const form = document.createElement("form");
      form.className = "flex flex-col gap-2 mx-2";
      form.setAttribute("name", "commentOnPost");

      const labelWrapper = document.createElement("div");
      labelWrapper.className = "flex flex-row items-center gap-2";

      const avatar = document.createElement("img");
      avatar.className = "rounded-full object-cover size-10";
      avatar.src = profile.avatar.url;

      const label = document.createElement("label");
      label.className = "text-sm";
      label.setAttribute("for", "body");
      label.textContent = "Add a comment";

      labelWrapper.append(avatar, label);

      const textarea = document.createElement("textarea");
      textarea.className = "form-input";
      textarea.setAttribute("name", "body");
      textarea.setAttribute("id", "body");

      const button = document.createElement("button");
      button.className = "btn btn-primary btn-primary-hover text-sm max-w-44";
      button.textContent = "Comment";
      button.setAttribute("type", "submit");

      form.append(labelWrapper, textarea, button);

      form.addEventListener("submit", (event) => {
        const id = post.id;
        onComment(event, id);
      });

      orderedList.append(...commentsList);
      commentsWrapper.appendChild(orderedList);
      commentsSection.append(btnToggleComments, commentsWrapper);

      li.append(profileHeader, postContainer, commentsSection, form);
      return li;
    });

    document.getElementById("posts").append(...list);
  } catch (error) {
    console.error("Error fetching posts: ", error);
    alert(error);
  } finally {
    //loader
  }
}

import api from "../../api/instance.js";
import { onDeletePost } from "./deletePost.js";
import { CustomButton } from "../../components/customButton.js"
import { formatDate } from "../../utilities/formatting.js";
import { onDeleteComment } from "../posts/deleteComment.js";

/**
 * Fetches and displays a specific post on the page based on the URL's query parameter.
 *
 * This function retrieves a post's ID from the URL search parameters, fetches the post from the API,
 * and dynamically creates and appends a section to the DOM displaying the post's title and body.
 * It also adds "Edit" and "Delete" buttons for the post.
 *
 * @async
 * @function viewPost
 * @returns {Promise<void>} Resolves when the post is successfully fetched and rendered to the DOM.
 * @throws {Error} Logs any error that occurs during the post fetch or DOM manipulation.
 */
export async function viewPost() {
  try {
    const id = api.idUrl;
    const loggedinProfile = api.user.name;
    const profile = await api.profiles.readSingleProfile(loggedinProfile);

    if (!id)
      throw new Error("Could not find a post ID. Unable to display the post.");

    const post = await api.post.read(id);
    console.log(post);
    

    const section = document.createElement("section");
    section.className = "m-auto px-2 pb-7 max-w-xl flex flex-col"

    // top buttons
    const topDiv = document.createElement("div")
    topDiv.className = "flex justify-between mb-6"

    const btnBack = document.createElement("a")
    btnBack.className = "flex justify-start btn btn-primary btn-primary-hover"
    btnBack.href = "/NoroffSocialApp/profile/"
    btnBack.textContent = "Back"

    const btnContainer = document.createElement("div")
    btnContainer.className = "flex justify-end gap-5"

    const btnEdit = document.createElement("a");
    btnEdit.className = "btn btn-primary btn-primary-hover"
    btnEdit.textContent = "Edit post";
    btnEdit.href = `./edit/?id=${id}`;
    
    const btnDelete = document.createElement("button");
    btnDelete.className = "btn btn-primary btn-primary-hover"
    btnDelete.textContent = "Delete post";
    btnDelete.addEventListener("click", () => onDeletePost());

    btnContainer.append(btnEdit, btnDelete)
    topDiv.append(btnBack, btnContainer)

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
    btnToggleComments.className = "flex flex-row items-center gap-1 md:gap-2 mb-2";
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
      aAuthor.href = `/NoroffSocialApp/profiles/profile/?name=${comment.author.name}`

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


    // Comment form
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
    button.className = "btn btn-primary btn-primary-hover max-w-44"
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



    section.append(topDiv, postContainer, commentsSection, form);

    document.getElementById("postCard").appendChild(section);
  } catch (error) {
    console.error("Error getting post: ", error);
    alert(error);
  }
}

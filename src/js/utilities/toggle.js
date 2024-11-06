export function togglePostComments() {
  const buttons = document.querySelectorAll("[data-toggle-comments]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const commentsSection = button
        .closest(".comments")
        .querySelector("#commentsSection");
      const isVisible = commentsSection.classList.contains("block");
      commentsSection.classList.toggle("hidden", isVisible);
      commentsSection.classList.toggle("block", !isVisible);
    });
  });
}

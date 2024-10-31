export function togglePostComments() {
    const button = document.getElementById("toggleComments")
    button.addEventListener("click", () => {
        const commentsSection = document.getElementById("commentsSection")
        const isVisible = commentsSection.classList.contains("block")
        commentsSection.classList.toggle("hidden", isVisible)
        commentsSection.classList.toggle("block", !isVisible)
    })
}
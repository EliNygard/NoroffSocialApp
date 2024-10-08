import { viewProfiles } from "../../ui/profiles/viewProfiles.js";
import api from "../../api/instance.js";

let page = 1;
const limit = 30;

const urlParams = new URLSearchParams(window.location.search)
const urlPage = urlParams.get("page")

if (urlPage) {
    page = parseInt(urlPage)
}

export function updateButtonStates() {
  if (page <= 1) {
    document.getElementById("prevPage").setAttribute("disabled", true);
  } else {
    document.getElementById("prevPage").removeAttribute("disabled");
  }
}

viewProfiles(limit, page);
updateButtonStates();

document.getElementById("nextPage").addEventListener("click", () => {
  const url = new URL(window.location.href);
  page++;
  url.searchParams.set("page", page);
  window.history.pushState({}, "", url);
  viewProfiles(limit, page);
  updateButtonStates();
});
document.getElementById("prevPage").addEventListener("click", () => {
  if (page > 1) {
    const url = new URL(window.location.href);
    page--;
    url.searchParams.set("page", page);
    window.history.pushState({}, "", url);
    viewProfiles(limit, page);
    updateButtonStates();
  }
});
document.getElementById("firstPage").addEventListener("click", () => {
  const url = new URL(window.location.href);
  page = 1;
  url.searchParams.set("page", page);
  window.history.pushState({}, "", url);
  viewProfiles(limit, page);
  updateButtonStates();
});

const pagesPerGroup = 10;

async function displayPagesProfiles() {
  const profilesObject = await api.profiles.readAllProfiles();
  const totalPages = profilesObject.meta.pageCount;
  const paginationContainer = document.getElementById("paginationContainer");
  paginationContainer.innerHTML = "";

  let currentPageGroup = Math.floor((page - 1) / pagesPerGroup);

  function renderPageButtons() {
    paginationContainer.innerHTML = "";

    const startPage = currentPageGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    // "First" button (always visible, takes user to the first page group)
    if (page > 1) {
        const firstButton = document.createElement("button")
        firstButton.textContent = "First 10 pages"
        firstButton.addEventListener("click", () => {
            page = 1;
            currentPageGroup = 0;
            renderPageButtons()
            const url = new URL(window.location.href)
            url.searchParams.set("page", page)
            window.history.pushState({}, "", url)
            viewProfiles(limit, page)
            updateButtonStates()
        })
        paginationContainer.appendChild(firstButton)
    }

    // "Previous" button (to go to the previous set of 10 pages)
    if (startPage > 1) {
      const prevButton = document.createElement("button");
      prevButton.textContent = "Previous 10 pages";
      prevButton.addEventListener("click", () => {
        currentPageGroup--;
        renderPageButtons();
      });
      paginationContainer.appendChild(prevButton);
    }

    // Page buttons for the current group (e.g., 1–10, 11–20)
    for (let i = startPage; i <= endPage; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      
        // if (i === page) {
        //     button.setAttribute("disabled", true);
        //   } 
        button.addEventListener("click", () => {
            const url = new URL(window.location.href);
            page = i;
        url.searchParams.set("page", page);
        window.history.pushState({}, "", url);
        viewProfiles(limit, page);
        updateButtonStates();
      });
      paginationContainer.appendChild(button)
    }

    // "Next" button (to go to the next set of 10 pages)
    if (endPage < totalPages) {
        const nextButton = document.createElement("button")
        nextButton.textContent = "Next 10 pages"
        nextButton.addEventListener("click", () => {
            currentPageGroup++
            renderPageButtons()
        })
        paginationContainer.appendChild(nextButton)
    }

    // "Last" button (always visible, takes user to the last page group)
    if (page < totalPages) {
        const lastButton = document.createElement("button")
        lastButton.textContent = "Last 10 pages"
        lastButton.addEventListener("click", () => {
            page = totalPages
            currentPageGroup = Math.floor((totalPages - 1) / pagesPerGroup)
            renderPageButtons()
            const url = new URL(window.location.href)
            url.searchParams.set("page", page)
            window.history.pushState({}, "", url)
            viewProfiles(limit, page)
            updateButtonStates()
        })
        paginationContainer.appendChild(lastButton)
    }
  }
  renderPageButtons()
}
displayPagesProfiles();

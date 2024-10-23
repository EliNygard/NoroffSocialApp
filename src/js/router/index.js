/**
 * A client-side router that dynamically imports and loads views based on the current URL path.
 *
 * This function checks the `pathname` and conditionally imports the corresponding view module for each route.
 * It supports paths for the home page, explore page, authentication pages (login, register), post-related pages,
 * profile pages, and a default case for a 404 not found page.
 *
 * @async
 * @function router
 * @param {string} [pathname=window.location.pathname] - The current URL path. Defaults to the current window location's pathname.
 * @returns {Promise<void>} Resolves when the appropriate view is imported and loaded.
 */

export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
    case "/index.html":
      await import("./views/home.js");
      break;
    case "/explore/":
    case "/explore/index.html":
      await import("./views/explore.js");
      break;
    case "/auth/":
    case "/auth/index.html":
      await import("./views/auth.js");
      break;
      case "/auth/login/":
      case "/auth/login/index.html":
      await import("./views/login.js");
      break;
    case "/auth/register/":
    case "/auth/register/index.html":
      await import("./views/register.js");
      break;
    case "/post":
    case "/post/":
    case "/post/index.html":
      await import("./views/post.js");
      break;
    case "/post/edit/":
    case "/post/edit/index.html":
      await import("./views/postEdit.js");
      break;
    case "/post/create/":
    case "/post/create/index.html":
      await import("./views/postCreate.js");
      break;
    case "/profile/":
    case "/profile/index.html":
      await import("./views/profile.js");
      break;
    case "/profiles/":
    case "/profiles/index.html":
      await import("./views/profiles.js");
      break;
    case "/profiles/posts/":
    case "/profiles/posts/index.html":
      await import("./views/postsByProfile.js");
      break;
    case "/profiles/profile/":
    case "/profiles/profile/index.html":
      await import("./views/singleProfile.js");
      break;
    default:
      await import("./views/notFound.js");
  }
}

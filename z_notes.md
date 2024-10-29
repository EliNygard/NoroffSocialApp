This repo is for continue work on the JS2 CA. Improvements, added functionality etc. 


export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
    case "/index.html":
      await import("./views/home");
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
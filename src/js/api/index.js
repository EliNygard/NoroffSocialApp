import { API_KEY } from "./constants";

/**
 * A class representing the SocialAPI service for authentication.
 * This class provides methods to interact with the authentication API for registering, logging in and logging out users.
 * !! update as new things are added !!
 */
export default class SocialAPI {
  /**
   * The base URL for the API
   * @type {string}
   */
  apiBase = "";

  /**
   * Creates an instance of the SocialAPI class
   * @param {string} apiBase
   */
  constructor(apiBase = "https://v2.api.noroff.dev") {
    this.apiBase = apiBase;
  }

  get user() {
    try {
      return JSON.parse(localStorage.user);
    } catch {
      return null;
    }
  }

  set user(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
  }

  get token() {
    try {
      return localStorage.getItem("token");
    } catch {
      return null;
    }
  }

  set token(accessToken) {
    localStorage.setItem("token", accessToken);
  }

  get id() {
    try {
      return JSON.parse(localStorage.id);
    } catch {
      return null;
    }
  }

  get idUrl() {
    try {
      const parameterString = window.location.search;
      const searchParameters = new URLSearchParams(parameterString);
      const id = searchParameters.get("id");
      return id;
    } catch {
      return null;
    }
  }

  get apiPostPath() {
    return `${this.apiBase}/social/posts`;
  }

  get apiPostsFollowing() {
    return `${this.apiPostPath}/following`;
  }

  get apiPostsQueryParameters() {
    return `?_author=true&_comments=true&_reactions=true`;
  }

  get apiProfilesPath() {
    return `${this.apiBase}/social/profiles`;
  }

  get apiLoggedInProfilePostsPath() {
    return `${this.apiProfilesPath}/${this.user.name}/posts`;
  }

  get apiProfilesQueryParameters() {
    return `?_following=true&_followers=true&_posts=true`;
  }

  static base = "https://v2.api.noroff.dev";

  static paths = {
    register: `${SocialAPI.base}/auth/register`,
    login: `${SocialAPI.base}/auth/login`,
  };

  util = {
    setupHeaders: (body, key, token) => {
      const headers = new Headers();

      if (token) {
        headers.append("Authorization", `Bearer ${this.token}`);
      }
      if (body) {
        headers.append("Content-Type", "application/json");
      }

      if (key) {
        headers.append("X-Noroff-API-Key", API_KEY);
      }
      return headers;
    },
  };

  /**
   * The authentication methods for the SocialAPI.
   * @property {function} register - Registers a new user with the provided information.
   * @property {function} login - Logs in a user with the given credentials.
   * @property {function} logout - Logs out the current user by clearing local storage.
   */
  auth = {
    /**
     * Registers a new user.
     * Sends the user's details to the API to create a new account.
     *
     * @param {Object} userData - The new user's details.
     * @param {string} userData.name - The user's name.
     * @param {string} userData.email - The user's email address.
     * @param {string} userData.password - The user's password.
     * @param {string} userData.bio - The user's bio.
     * @param {string} userData.banner - The user's banner image URL.
     * @param {string} userData.avatar - The user's avatar image URL.
     * @returns {Promise<Object>} The newly registered user's data if successful.
     * @throws {Error} Throws an error if the registration fails.
     */
    register: async ({ name, email, password, bio, banner, avatar }) => {
      const body = JSON.stringify({
        name,
        email,
        password,
        bio,
        banner,
        avatar,
      });

      const response = await fetch(SocialAPI.paths.register, {
        headers: this.util.setupHeaders(true, true),
        method: "post",
        body,
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      throw new Error(
        "Something went wrong. Could not register account. Please try again."
      );
    },
    /**
     * Logs in a user.
     * Sends the user's email and password to the API to retrieve an access token and user information.
     *
     * @param {Object} userData - The user's login details.
     * @param {string} userData.email - The user's email.
     * @param {string} userData.password - The user's password.
     * @returns {Promise<Object>} The user's data and access token if the login is successful.
     * @throws {Error} Throws an error if the login request fails.
     */
    login: async ({ email, password }) => {
      const body = JSON.stringify({ email, password });

      const response = await fetch(SocialAPI.paths.login, {
        headers: this.util.setupHeaders(true, true, true),
        method: "post",
        body,
      });

      if (response.ok) {
        const { data } = await response.json();
        const { accessToken: token, ...user } = data;

        this.user = user;
        this.token = token;
        localStorage.token = token;

        return data;
      }

      throw new Error("Could not login. Please try again or register a user.");
    },
    /**
     * Logs out the current user by clearing the token and user data from local storage.
     * The user is then redirected to the home page.
     */
    logout: () => {
      try {
        this.user = null;
        this.token = null;
        window.location.href = "/auth/login/";
      } catch (error) {
        console.error(error);
        alert("Could not logout. Please try again.");
      }
    },
  };

  /**
   * The post methods for the SocialAPI
   * @property {function} create - Creates a new post
   * @property {function} update - Updates an existing post
   * @property {function} delete - Deletes an existing post
   * @property {function} read - Gets a single post by its ID
   * @property {function} loadPostData - Loads post data into a form
   */
  post = {
    /**
     * Creates a new post.
     *
     * @async
     * @function create
     * @param {Object} postDetails - The details of the post to be created.
     * @param {string} postDetails.title - The title of the post.
     * @param {string} postDetails.body - The body content of the post.
     * @returns {Promise<Object>} The created post data.
     * @throws {Error} Throws an error if the post creation fails.
     */
    create: async ({ title, body }) => {
      const response = await fetch(this.apiPostPath, {
        headers: this.util.setupHeaders(true, true, true),
        method: "post",
        body: JSON.stringify({ title, body }),
      });
      if (response.ok) {
        return await response.json();
      }

      throw new Error("Could not create post. Please try again.");
    },

    /**
     * Updates or edits an existing post
     *
     * @async
     * @function update
     * @param {string} id - The ID of the post to update.
     * @param {Object} postDetails - The details of the post to be updated.
     * @param {string} postDetails.title - The updated title of the post.
     * @param {string} postDetails.body - The updated body content of the post.
     * @returns {Promise<Object>} The updated post data.
     * @throws {Error} Throws an error if the post update fails.
     */
    update: async (id, { title, body }) => {
      const response = await fetch(`${this.apiPostPath}/${id}`, {
        headers: this.util.setupHeaders(true, true, true),
        method: "put",
        body: JSON.stringify({ title, body }),
      });

      if (response.ok) {
        return await response.json();
      }
      throw new Error("Could not update post " + id);
    },

    /**
     * Deletes an existing post
     *
     * @async
     * @function delete
     * @param {string} id - The ID of the post to be deleted.
     * @returns {Promise<void>} Returns an empty response on success.
     * @throws {Error} Throws an error if deleting the post fails.
     */
    delete: async (id) => {
      const response = await fetch(`${this.apiPostPath}/${id}`, {
        headers: this.util.setupHeaders(true, true, true),
        method: "delete",
      });
      if (response.ok) {
        return;
      }
      throw new Error("Could not delete post with id #" + id);
    },

    /**
     * Gets a single post
     *
     * @async
     * @function read
     * @param {string} id - The ID of the post to be fetched.
     * @returns {Promise<Object>} The post to be read.
     * @throws {Error} Throws an error if the post could not be fetched.
     */
    read: async (id) => {
      const response = await fetch(
        `${this.apiPostPath}/${id}${this.apiPostsQueryParameters}`,
        {
          headers: this.util.setupHeaders(true, true, true),
          method: "get",
        }
      );

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      throw new Error("Could not fetch post.");
    },

    /**
     * Loads the post data from a form.
     * Used to populate the update post form with the post data.
     *
     * @async
     * @function loadPostData
     * @param {string} id - The ID of the post to be loaded
     * @param {HTMLFormElement} form - The form which contain the post data
     * @returns {Promise<void>} Populates the form fields with the post data
     *
     */
    loadPostData: async (id, form) => {
      try {
        const post = await this.post.read(id);

        form.querySelector("#title").value = post.title;
        form.querySelector("#body").value = post.body;
      } catch (error) {
        console.error("Error fetching post data", error);
      }
    },
  };

  /**
   * The post methods for the SocialAPI
   * @property {function} read - Gets all posts
   * @property {function} readFollowing - Gets all posts from following profiles
   */
  posts = {
    /**
     * Gets all posts
     *
     * @async
     * @function read
     * @param {string<number>} limit
     * @param {string<number>} page
     * @returns {Promise<Object>} The posts to be read.
     * @throws {Error} Throws an error if the posts could not be fetched.
     */
    read: async (limit = 12, page = 1) => {
      const url = new URL(`${this.apiPostPath}${this.apiPostsQueryParameters}`);

      url.searchParams.append("limit", limit);
      url.searchParams.append("page", page);

      const response = await fetch(url, {
        headers: this.util.setupHeaders(true, true, true),
        method: "get",
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
      throw new Error("Could not fetch posts");
    },
    /**
     * Gets posts from following profiles
     *
     * @async
     * @function readFollowing
     * @param {string<number>} limit
     * @param {string<number>} page
     * @returns {Promise<Object>} The posts to be read
     * @throws {Error} Throws an error if the posts could not be fetched.
     */
    readFollowing: async (limit = 12, page = 1) => {
      const url = new URL(
        `${this.apiPostsFollowing}${this.apiPostsQueryParameters}`
      );

      url.searchParams.append("limit", limit);
      url.searchParams.append("page", page);

      const response = await fetch(url, {
        headers: this.util.setupHeaders(true, true, true),
        method: "get",
      });

      if (response.ok) {
        const { data } = await response.json();

        return data;
      }
      throw new Error("Could not fetch posts from the following profiles");
    },
    commentOnPost: async (id, { body, replyToId = null }) => {
      const url = new URL(`${this.apiPostPath}/${id}/comment`);
      const response = await fetch(url, {
        headers: this.util.setupHeaders(true, true, true),
        method: "post",
        body: JSON.stringify({ body, replyToId }),
      });
      if (response.ok) {
        return await response.json();
      }
      throw new Error("Could not add comment. Please try again.");
    },
    deleteComment: async (id, commentId) => {
      const response = await fetch(
        `${this.apiPostPath}/${id}/comment/${commentId}`,
        {
          headers: this.util.setupHeaders(true, true, true),
          method: "delete",
        }
      );
      if (response.ok) {
        return;
      }
      throw new Error(
        `Could not delete comment with id #${commentId}. Please try again.`
      );
    },
  };

  /**
   * The profile management methods for the SocialAPI.
   * Allows for reading all profiles, a single profile, and following or unfollowing profiles.
   *
   * @property {function} readAllProfiles - Fetches a paginated list of profiles.
   * @property {function} readSingleProfile - Fetches a single profile by name.
   * @property {function} follow - Follows a specified profile.
   * @property {function} unfollow - Unfollows a specified profile.
   */
  profiles = {
    /**
     * Fetches all profiles with pagination.
     *
     * @async
     * @function readAllProfiles
     * @param {number} [limit=30] - The number of profiles to return per page (default is 30).
     * @param {number} [page=1] - The page number to fetch (default is page 1).
     * @returns {Promise<Object>} An object containing an array of profiles (`data`) and pagination metadata (`meta`).
     * @throws {Error} Throws an error if the profiles could not be fetched.
     */
    readAllProfiles: async (limit = 30, page = 1) => {
      const url = new URL(this.apiProfilesPath);

      url.searchParams.append("limit", limit);
      url.searchParams.append("page", page);

      const response = await fetch(url, {
        headers: this.util.setupHeaders(true, true, true),
        method: "get",
      });
      if (response.ok) {
        const { data, meta } = await response.json();

        return { data, meta };
      }
      throw new Error("Could not get profiles");
    },
    /**
     * Fetches a single profile by its name.
     *
     * @async
     * @function readSingleProfile
     * @param {string} profile - The name of the profile to be fetched.
     * @returns {Promise<Object>} The profile data.
     * @throws {Error} Throws an error if the profile could not be fetched.
     */
    readSingleProfile: async (profile) => {
      const url = new URL(
        `${this.apiProfilesPath}/${profile}${this.apiProfilesQueryParameters}`
      );

      const response = await fetch(url, {
        headers: this.util.setupHeaders(true, true, true),
        method: "get",
      });
      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
      throw new Error("Could not get profile");
    },
    /**
     * Follows a specified profile.
     *
     * @async
     * @function follow
     * @param {string} profile - The name of the profile to follow.
     * @returns {Promise<Object>} The updated profile data after following.
     * @throws {Error} Throws an error if the profile is already followed.
     */
    follow: async (profile) => {
      const url = new URL(`${this.apiProfilesPath}/${profile}/follow`);

      const response = await fetch(url, {
        headers: this.util.setupHeaders(true, true, true),
        method: "put",
      });
      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
      throw new Error("You are already following this profile.");
    },
    /**
     * Unfollows a specified profile.
     *
     * @async
     * @function unfollow
     * @param {string} profile - The name of the profile to unfollow.
     * @returns {Promise<Object>} The updated profile data after unfollowing.
     * @throws {Error} Throws an error if the profile is not being followed.
     */
    unfollow: async (profile) => {
      const url = new URL(`${this.apiProfilesPath}/${profile}/unfollow`);

      const response = await fetch(url, {
        headers: this.util.setupHeaders(true, true, true),
        method: "put",
      });
      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
      throw new Error("You are not following this profile.");
    },
    /**
     * Read posts by a specified profile.
     *
     * @async
     * @function readPostsByProfile
     * @param {string} profile - The name of the profile to view posts.
     * @returns {Promise<Object>} The posts to be read.
     * @throws {Error} Throws an error if the posts can not be fetched.
     */
    readPostsByProfile: async (profile) => {
      const url = new URL(
        `${this.apiProfilesPath}/${profile}/posts${this.apiProfilesQueryParameters}`
      );

      const response = await fetch(url, {
        headers: this.util.setupHeaders(true, true, true),
        method: "get",
      });
      if (response.ok) {
        const { data, meta } = await response.json();

        return { data, meta };
      }
      throw new Error("Could not fetch posts from profile.");
    },
    /**
     * Updates or edits an existing profile
     *
     * @async
     * @function update
     * @param {string} profile - The name of the profile to update.
     * @param {Object} profileDetails - The details of the profile to be updated.
     * @param {string} profileDetails.bio - The updated bio of the profile.
     * @param {string} profileDetails.banner - The updated banner img of the profile.
     * @param {string} profileDetails.avatar - The updated avatar img of the profile.
     * @returns {Promise<Object>} The updated profile data.
     * @throws {Error} Throws an error if the profile update fails.
     */
    update: async (profile, data) => {
      const url = new URL(`${this.apiProfilesPath}/${profile}`);

      const response = await fetch(url, {
        headers: this.util.setupHeaders(true, true, true),
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return await response.json();
      }
      throw new Error("Error updating profile. Please try again.");
    },
  };
}

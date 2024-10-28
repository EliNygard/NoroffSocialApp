import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  base: "./",
  build: {
    target: "esnext",
    outDir: "./dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        explore: resolve(__dirname, "./explore/index.html"),
        auth: resolve(__dirname, "./auth/index.html"),
        login: resolve(__dirname, "./auth/login/index.html"),
        register: resolve(__dirname, "./auth/register/index.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        post: resolve(__dirname, "./post/index.html"),
        editPost: resolve(__dirname, "./post/edit/index.html"),
        createPost: resolve(__dirname, "./post/create/index.html"),
        profiles: resolve(__dirname, "./profiles/index.html"),
        singleProfile: resolve(__dirname, "./profiles/profile/index.html"),
        postsByProfile: resolve(__dirname, "./profiles/posts/index.html")
      },
    },
  },
});

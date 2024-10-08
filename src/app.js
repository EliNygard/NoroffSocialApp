import "./css/style.css";

import router from "./js/router/index.js";
import { onLogout } from "./js/ui/auth/logout.js";

await router(window.location.pathname);

onLogout()




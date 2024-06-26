import getGamesByPlatform from "../API/getGamesByPlatformAPI.js";
import { navigateTo } from "../functions.js";

const pcWindows = document.getElementById("windows");
const webBrowser = document.getElementById("web");
// PC (Windows)
pcWindows.addEventListener("click", () => {
  navigateTo("games.html", "pc");
});

webBrowser.addEventListener("click", () => {
  navigateTo("games.html", "browser");
});
console.log(getGamesByPlatform("pc"));

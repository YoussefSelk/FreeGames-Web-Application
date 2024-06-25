import getGamesByPlatform from "../API/getGamesByPlatformAPI.js";
import { navigateTo } from "../functions.js";

const pcWindows = document.getElementById("windows");
// PC (Windows)
pcWindows.addEventListener("click", () => {
  navigateTo("games_by_platform.html", "pc");
});

console.log(getGamesByPlatform("pc"));

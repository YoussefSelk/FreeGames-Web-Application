import getGamesByPlatform from "../API/getGamesByPlatformAPI.js";
import {
  getUrlParam,
  updateUrlParameter,
  createGameElement,
  displayGames,
  responsiveMenu,
} from "../functions.js";

const pcCheckbox = document.getElementById("pc");
const webCheckbox = document.getElementById("web");
const gamesContainer = document.getElementById("games");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

let currentPage = 1; // Track current page for pagination
let platform = getUrlParam("platform");

// Function to fetch games based on platform and page
async function fetchGames(platform, page) {
  try {
    const games = await getGamesByPlatform(platform, page);
    return games;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
}

// Function to handle platform change
function handlePlatformChange(newPlatform) {
  platform = newPlatform;
  currentPage = 1; // Reset page number
  fetchAndDisplayGames(platform, currentPage);
}

// Function to handle search
async function searchGames(query) {
  const searchTerm = query.trim().toLowerCase();

  try {
    const games = await fetchGames(platform, currentPage);

    // Filter games based on title or short_description containing the searchTerm
    const results = games.filter((game) => {
      const titleMatch = game.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = game.short_description
        .toLowerCase()
        .includes(searchTerm);
      return titleMatch || descriptionMatch;
    });

    return results;
  } catch (error) {
    console.error("Error searching games:", error);
    throw error;
  }
}

// Event listener for PC checkbox
pcCheckbox.addEventListener("change", () => {
  const newPlatform = pcCheckbox.checked ? "pc" : "browser";
  updateUrlParameter("platform", newPlatform);
  handlePlatformChange(newPlatform);
});

// Event listener for Web checkbox
webCheckbox.addEventListener("change", () => {
  const newPlatform = webCheckbox.checked ? "browser" : "pc";
  updateUrlParameter("platform", newPlatform);
  handlePlatformChange(newPlatform);
});

// Event listener for search button
searchBtn.addEventListener("click", async () => {
  const query = searchInput.value;
  try {
    const searchResults = await searchGames(query);
    displayGames(searchResults, gamesContainer);
  } catch (error) {
    console.error("Error searching and displaying games:", error);
  }
});

// Initial setup based on URL parameter
const platformParam = getUrlParam("platform");
if (platformParam === "pc") {
  pcCheckbox.checked = true;
  webCheckbox.checked = false;
} else if (platformParam === "browser") {
  webCheckbox.checked = true;
  pcCheckbox.checked = false;
} else {
  // Default to PC platform if no valid platform parameter is found
  pcCheckbox.checked = true;
  webCheckbox.checked = false;
}

// Function to fetch and display games
async function fetchAndDisplayGames(platform, page) {
  try {
    const games = await fetchGames(platform, page);
    displayGames(games, gamesContainer);
  } catch (error) {
    console.error("Error fetching or displaying games:", error);
  }
}
responsiveMenu();
// Initial load of games
fetchAndDisplayGames(platformParam || "pc", currentPage);

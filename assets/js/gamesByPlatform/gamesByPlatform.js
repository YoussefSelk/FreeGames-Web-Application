import getGamesByPlatform from "../API/getGamesByPlatformAPI.js";
import { getUrlParam, updateUrlParameter } from "../functions.js";

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

// Function to display games in the UI
function displayGames(games) {
  gamesContainer.innerHTML = ""; // Clear previous content

  games.forEach((game) => {
    const gameElement = createGameElement(game);
    gamesContainer.appendChild(gameElement);
  });
}

// Function to create HTML element for a game
function createGameElement(game) {
  const gameElement = document.createElement("div");
  gameElement.classList.add("game-item");
  gameElement.innerHTML = `
    <div class="relative h-40 overflow-hidden text-white shadow-lg bg-clip-border rounded-t-xl">
      <img src="${game.thumbnail}" alt="card-image" class="w-full h-full object-cover" />
    </div>
    <div class="p-4">
      <h5 class="block mb-2 font-sans text-lg antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
        ${game.title}
      </h5>
      <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
        ${game.short_description}
      </p>
      <a class="inline-block text-center uppercase transition-all text-xs py-2 px-4 rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg"
        href="${game.game_url}">
        Read More
      </a>
    </div>
  `;
  return gameElement;
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
    displayGames(searchResults);
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
    displayGames(games);
  } catch (error) {
    console.error("Error fetching or displaying games:", error);
  }
}

// Initial load of games
fetchAndDisplayGames(platformParam || "pc", currentPage);

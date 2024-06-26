// Import necessary functions and API
import { getGameDetails } from "../API/getGameDetailsAPI.js";
import {
  getUrlParam,
  createDetailsElement,
  appendElement,
  responsiveMenu,
} from "../functions.js";

// Function to fetch and display game details
const fetchAndDisplayGameDetails = async (id) => {
  try {
    // Fetch game details from the API
    const gameDetails = await getGameDetails(id);

    // Clear the previous content
    gameDetailContainer.innerHTML = "";

    // Create the game details element
    const gameDetailsElement = createDetailsElement(gameDetails);

    // Append the game details element to the container
    appendElement(gameDetailsElement, gameDetailContainer);
  } catch (error) {
    // Handle any errors that occur during the fetch process
    console.error("Error fetching game details:", error);
    gameDetailContainer.innerHTML = `
    <div class="max-w-md mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <div class="flex items-center">
        <i class="fas fa-exclamation-triangle text-red-500 text-3xl mr-4"></i>
        <div>
          <h2 class="text-xl font-bold">Error</h2>
          <p class="mt-2">Failed to load game details. Please try again later.</p>
        </div>
      </div>
    </div>
  `;
  }
};

// Get the container element for game details
const gameDetailContainer = document.getElementById("game-details");

// Function to handle URL changes
const handleUrlChange = () => {
  const gameId = getUrlParam("id");
  if (gameId) {
    fetchAndDisplayGameDetails(gameId);
  } else {
    console.error("No game ID found in the URL.");
  }
};

// Listen for URL changes
window.addEventListener("popstate", handleUrlChange);
responsiveMenu();
// Initial fetch and display of game details
handleUrlChange();

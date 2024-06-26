export const navigateTo = (pageName, platform) => {
  // Construct the URL with the platform query parameter
  const url = `public/views/${pageName}?platform=${platform}`;

  // Navigate to the specified URL
  window.location.href = url;
};

export const getUrlParam = (name, url = window.location.href) => {
  // Create a URL object to parse the URL
  const urlObj = new URL(url);

  // Create URLSearchParams object using the query string part of the URL
  const urlParams = new URLSearchParams(urlObj.search);

  // Retrieve the value of the parameter by name
  return urlParams.get(name);
};

export const updateUrlParameter = (param, value) => {
  // Get the current URL
  const url = new URL(window.location.href);

  // Update the URL parameter
  if (value !== null && value !== undefined) {
    url.searchParams.set(param, value);
  } else {
    url.searchParams.delete(param); // Remove the parameter if the value is null or undefined
  }

  // Update the browser's URL without reloading the page
  window.history.pushState({}, "", url);
};
// Function to create HTML element for a game
export function createGameElement(game) {
  const gameElement = document.createElement("div");
  gameElement.classList.add("game-item");
  gameElement.innerHTML = `
    <div class="relative h-40 overflow-hidden text-white shadow-lg bg-clip-border rounded-t-xl">
      <a href="game-details.html?id=${game.id}"> <img src="${game.thumbnail}" alt="card-image" class="w-full h-full object-cover" /></a>
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
export const createDetailsElement = (game) => {
  const gameDetailContainer = document.createElement("div");
  gameDetailContainer.classList.add("game-item-detail");

  const screenshotsHtml = game.screenshots
    .map(
      (screenshot) => `
    <img
      src="${screenshot.image}"
      alt="Screenshot ${screenshot.id}"
      class="rounded-lg"
    />
  `
    )
    .join("");

  gameDetailContainer.innerHTML = `
  <div class="max-w-4xl mx-auto p-4">
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div class="flex items-center space-x-4">
            <img
              src="${game.thumbnail}"
              alt="Game Thumbnail"
              class="w-24 h-24 rounded-lg"
            />
            <div>
              <h1 class="text-2xl font-bold text-white">${game.title}</h1>
              <p class="text-green-400">${game.status}</p>
            </div>
          </div>
          <p class="mt-4 text-gray-400">
          ${game.short_description}
          </p>
          <p class="mt-2 text-gray-300">
          ${game.description}
          </p>
          <a
            href="${game.game_url}"
            class="block mt-4 text-indigo-400 hover:underline"
            >Play Now</a
          >

          <div class="mt-6">
            <h2 class="text-xl font-semibold text-white">Game Details</h2>
            <div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 class="text-gray-400">Genre</h3>
                <p class="text-gray-200">${game.genre}</p>
              </div>
              <div>
                <h3 class="text-gray-400">Platform</h3>
                <p class="text-gray-200">${game.platform}</p>
              </div>
              <div>
                <h3 class="text-gray-400">Publisher</h3>
                <p class="text-gray-200">${game.publisher}</p>
              </div>
              <div>
                <h3 class="text-gray-400">Developer</h3>
                <p class="text-gray-200">${game.developer}</p>
              </div>
              <div>
                <h3 class="text-gray-400">Release Date</h3>
                <p class="text-gray-200">${game.release_date}</p>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <h2 class="text-xl font-semibold text-white">
              Minimum System Requirements
            </h2>
            <ul class="list-disc list-inside text-gray-300">
              <li>OS: ${game.minimum_system_requirements.os}</li>
              <li>Processor: ${game.minimum_system_requirements.processor}</li>
              <li>Memory: ${game.minimum_system_requirements.memory}</li>
              <li>Graphics: ${game.minimum_system_requirements.graphics}</li>
              <li>Storage: ${game.minimum_system_requirements.storage}</li>
            </ul>
          </div>

          <div class="mt-6">
            <h2 class="text-xl font-semibold text-white">Screenshots</h2>
            <div
              class="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
            ${screenshotsHtml}
            </div>
          </div>
        </div>
      </div>
  `;
  return gameDetailContainer;
};
export function displayGames(games, gamesContainer) {
  gamesContainer.innerHTML = ""; // Clear previous content

  games.forEach((game) => {
    const gameElement = createGameElement(game);
    gamesContainer.appendChild(gameElement);
  });
}
export const appendElement = (childElement, parentElement) => {
  // Ensure both parameters are valid HTML elements
  if (
    childElement instanceof HTMLElement &&
    parentElement instanceof HTMLElement
  ) {
    parentElement.appendChild(childElement);
  } else {
    console.error("Both parameters should be valid HTML elements.");
  }
};

export const responsiveMenu = () => {};

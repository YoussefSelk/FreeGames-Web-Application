import RapidAPI from "./getApiKey.js";

const BASE_URL =
  "https://free-to-play-games-database.p.rapidapi.com/api/games?platform=";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": RapidAPI,
    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
  },
};

// Cache object to store API results
const cache = new Map();

const getGamesByPlatform = async (platform) => {
  // Check if the data for the platform is already in the cache
  if (cache.has(platform)) {
    return cache.get(platform);
  }

  const url = BASE_URL + platform;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    // Store the result in the cache before returning it
    cache.set(platform, data);
    return data; // Return the JSON data fetched from the API
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Rethrow the error to handle it further if needed
  }
};

export default getGamesByPlatform;

import RapidAPI from "./getApiKey.js";

const BASE_URL =
  "https://free-to-play-games-database.p.rapidapi.com/api/game?id=";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": RapidAPI,
    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
  },
};
export const getGameDetails = async (id) => {
  const url = BASE_URL + id;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

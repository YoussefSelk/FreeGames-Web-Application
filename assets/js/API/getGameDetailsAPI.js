const BASE_URL =
  "https://free-to-play-games-database.p.rapidapi.com/api/game?id=";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "e6568a0fabmsh2ee24ee0a2eac68p10e156jsn54c1987779bf",
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

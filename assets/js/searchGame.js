export async function searchGames(query) {
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

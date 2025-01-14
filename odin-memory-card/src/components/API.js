export default async function getSkins(numberOfSkins) {
  const url = "https://fortnite-api.com/v2/cosmetics/br";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (!data || !data.data) {
      throw new Error("Unexpected API response format");
    }
    const skins = data.data
      .filter(({ type }) => type?.value === "outfit")
      .map(({ id, name, images }) => ({
        id,
        name,
        url: images.icon,
        picked: false,
      }));
    const shuffled = shuffle(skins);
    const selectedSkins = shuffled.slice(0, numberOfSkins);
    return selectedSkins;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

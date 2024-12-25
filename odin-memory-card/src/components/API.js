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
    const outfits = data.data.filter((item) => item.type.value === "outfit");
    const skins = outfits.map((item) => ({
      id: item.id,
      name: item.name,
      url: item.images.icon,
      picked: false,
    }));
    const shuffled = skins.sort(() => Math.random() - 0.5);
    const selectedSkins = shuffled.slice(0, numberOfSkins);
    return selectedSkins;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

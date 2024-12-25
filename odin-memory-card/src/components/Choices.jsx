import "../styles/Choices.css";
import { useState } from "react";
import Card from "./Card";

export default function Choices({
  copyData,
  setIsGameOver,
  numberOfSkins,
  setEndScore,
  setResult,
}) {
  const [skins, setSkins] = useState(copyData);
  const [score, setScore] = useState(0);
  const [chosenIds, setChosenIds] = useState([]);
  const maxScore = copyData.length;

  let displayCount;
  if (numberOfSkins == 5) {
    displayCount = 3;
  } else if (numberOfSkins == 10) {
    displayCount = 5;
  } else {
    displayCount = 7;
  }

  function replaceSkin(failedId) {
    // Removes skin with failed image from skins array
    // Replaces it with another unpicked skin from the original data
    const updatedSkins = skins.filter((skin) => skin.id !== failedId);
    const unpickedSkins = copyData.filter(
      (skin) =>
        !chosenIds.includes(skin.id) &&
        !updatedSkins.some((s) => s.id === skin.id)
    );
    if (unpickedSkins.length > 0) {
      const newSkin =
        unpickedSkins[Math.floor(Math.random() * unpickedSkins.length)];
      updatedSkins.push(newSkin);
      setSkins(updatedSkins);
    }
  }

  function getUnpicked() {
    let found = false,
      rand;
    while (!found) {
      rand = Math.floor(Math.random() * maxScore);
      if (!chosenIds.includes(copyData[rand].id)) {
        found = true;
        return copyData[rand];
      }
    }
  }

  function populateOptions(chosenOne, displayCount, numberOfSkins) {
    const pickedID = [],
      skinOptions = [];
    let randIndex, newID;
    skinOptions.push(chosenOne);
    pickedID.push(chosenOne.id);

    while (skinOptions.length < displayCount) {
      randIndex = Math.floor(Math.random() * (numberOfSkins - 1)) + 1;
      newID = copyData[randIndex].id;
      if (!pickedID.includes(newID)) {
        skinOptions.push(copyData[randIndex]);
        pickedID.push(newID);
      }
    }
    return skinOptions;
  }

  const chosenOne = getUnpicked();
  let options = populateOptions(chosenOne, displayCount, maxScore);
  let rand = Math.round(Math.random() * options.length);
  let temp = options[0];
  options[0] = options[rand];
  options[rand] = temp;

  const SkinsJSX = options
    // Filter out skins with no/undefined id
    .filter((skin) => skin && skin.id)
    .map((skin, index) => (
      <Card
        key={skin.id}
        id={skin.id}
        url={skin.url}
        onErrorReplace={replaceSkin}
        chosenIds={chosenIds}
        setChosenIds={setChosenIds}
        score={score}
        setScore={setScore}
        setIsGameOver={setIsGameOver}
        setEndScore={setEndScore}
        maxScore={maxScore}
        setResult={setResult}
      />
    ));

  return (
    <div className="game-container">
      <div className="card-container">{SkinsJSX}</div>
      <p className="score">
        Score: {score}/{maxScore}
      </p>
    </div>
  );
}

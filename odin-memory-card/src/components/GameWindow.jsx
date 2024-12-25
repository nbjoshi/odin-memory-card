import "../styles/GameWindow.css";
import { useState, useEffect } from "react";
import getSkins from "./API";
import Choices from "./Choices";
import llama from "../assets/llama-gif.gif";

export default function GameWindow({
  difficulty,
  setIsGameOver,
  setEndScore,
  setResult,
}) {
  let numberOfSkins;
  if (difficulty === "easy") {
    numberOfSkins = 5;
  } else if (difficulty === "medium") {
    numberOfSkins = 10;
  } else {
    numberOfSkins = 15;
  }
  const [skins, setSkins] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function startFetch() {
      const data = await getSkins(numberOfSkins);
      if (!ignore) {
        setSkins(data);
      }
    }
    startFetch();
    return () => {
      ignore = true;
    };
  }, [difficulty]);

  if (skins.length == 0) {
    return (
      <>
        <div className="loading-all">
          <img src={llama} alt="Loading" />
          <p>Loading your {numberOfSkins} skins....</p>
        </div>
      </>
    );
  } else {
    return (
      <Choices
        copyData={[...skins]}
        setIsGameOver={setIsGameOver}
        numberOfSkins={numberOfSkins}
        setEndScore={setEndScore}
        setResult={setResult}
      ></Choices>
    );
  }
}

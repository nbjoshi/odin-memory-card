import "../styles/App.css";
import { useState, useEffect } from "react";
import Menu from "./Menu";
import GameWindow from "./GameWindow";
import Result from "./Result";
import { SnowOverlay } from "react-snow-overlay";

export default function App() {
  const [difficulty, setDifficulty] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [endScore, setEndScore] = useState(0);
  const [result, setResult] = useState("");

  useEffect(() => {
    if (endScore > highScore) {
      setHighScore(endScore);
    }
  }, [endScore, highScore]);

  function handleMenuButton() {
    setDifficulty("");
    setGameOver(false);
    setEndScore(0);
    setResult("");
  }

  function handleRestartGame() {
    setGameOver(false);
    setDifficulty(difficulty);
    setEndScore(0);
    setResult("");
  }

  return (
    <>
      <SnowOverlay /> {/* Snow Effect I saw on TikTok */}
      <div className="header">
        <h1>Fortnite Memory Game</h1>
        <p>High Score: {highScore}</p>
      </div>
      <div className="content">
        {difficulty == "" ? (
          <Menu difficulty={difficulty} setDifficulty={setDifficulty} />
        ) : (
          <>
            {gameOver ? (
              <Result
                result={result}
                handleMenuButton={handleMenuButton}
                handleRestartGame={handleRestartGame}
                endScore={endScore}
              />
            ) : (
              <GameWindow
                difficulty={difficulty}
                gameOver={gameOver}
                setIsGameOver={setGameOver}
                highScore={highScore}
                setHighScore={setHighScore}
                setEndScore={setEndScore}
                setResult={setResult}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

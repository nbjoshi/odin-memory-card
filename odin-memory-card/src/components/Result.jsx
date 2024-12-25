import "../styles/Result.css";
import win from "../assets/fortnite-win.gif";
import lose from "../assets/crying.gif";

export default function Result({
  result,
  handleMenuButton,
  handleRestartGame,
  endScore,
}) {
  return (
    <div className="results">
      {result == "victory" ? (
        <>
          <p>You Won!</p>
          <p>Score: {endScore}</p>
          <img className="meme" src={win} alt="victory_gif"></img>
        </>
      ) : (
        <>
          <p>Game over! Better luck next time. </p>
          <p>Score: {endScore}</p>
          <img className="meme" src={lose} alt="lose_gif"></img>
        </>
      )}

      <div className="menu-options">
        <button onClick={handleMenuButton}>Menu</button>
        <button onClick={handleRestartGame}>Try Again</button>
      </div>
    </div>
  );
}

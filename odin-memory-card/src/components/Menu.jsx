import "../styles/Menu.css";

export default function Menu({ setDifficulty }) {
  function handleChangeDifficulty(e) {
    setDifficulty(e.target.dataset.difficulty);
  }

  return (
    <>
      <div className="game-menu">
        <div className="menu-header">
          <p>Choose a difficulty!</p>
        </div>
        <div className="menu-content">
          <button
            onClick={handleChangeDifficulty}
            data-difficulty="easy"
            className="difficulty-option"
          >
            Easy
          </button>
          <button
            onClick={handleChangeDifficulty}
            data-difficulty="medium"
            className="difficulty-option"
          >
            Medium
          </button>
          <button
            onClick={handleChangeDifficulty}
            data-difficulty="hard"
            className="difficulty-option"
          >
            Hard
          </button>
        </div>
        <div>
          Instructions:<br></br>Don't pick the same skin twice!
        </div>
      </div>
    </>
  );
}

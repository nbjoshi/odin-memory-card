import llama from "../assets/llama-gif.gif";
import "../styles/Card.css";

export default function Card({
  id,
  url,
  onErrorReplace,
  chosenIds,
  setChosenIds,
  setScore,
  score,
  setIsGameOver,
  setEndScore,
  maxScore,
  setResult,
}) {
  function handleClick(e) {
    const id = e.target.dataset.id;

    if (chosenIds.includes(id)) {
      setIsGameOver(true);
      setEndScore(score);
    } else {
      setScore(score + 1);
      let nextRenderScore = score + 1;
      let copy = [...chosenIds];
      copy.push(id);
      setChosenIds(copy);

      if (nextRenderScore === maxScore) {
        setEndScore(maxScore);
        setIsGameOver(true);
        setResult("win");
      }
    }
  }

  function handleLoad(e) {
    e.target.classList.remove("hide");
    e.target.nextElementSibling.classList.toggle("hide");
  }

  function handleError(e) {
    onErrorReplace(id);
  }

  return (
    <>
      <div data-id={id} className="card" onClick={handleClick}>
        <div key={id} className="card-front">
          <img
            data-id={id}
            onLoad={handleLoad}
            onError={handleError}
            className="card-img hide"
            src={url}
            alt="card-img"
          />
          <div className="card-loading">
            <img src={llama} alt="loading" />
          </div>
        </div>
      </div>
    </>
  );
}

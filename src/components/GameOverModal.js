import { fetchCharacters, getTopScores } from "../firebase";

const GameOverModal = (
  gameOverState,
  timerActiveState,
  timerComponent,
  secondsState,
  minutesState,
  hoursState,
  setCharactersState,
  setRemainingCharactersState,
  highscores
) => {
  const [setGameOver] = gameOverState;
  const [setIsTimerActive] = timerActiveState;
  const [setSeconds] = secondsState;
  const [setMinutes] = minutesState;
  const [setHours] = hoursState;
  const [setCharacters] = setCharactersState;
  const [setRemainingCharacters] = setRemainingCharactersState;
  const timer = timerComponent;
  const [topScores, setTopScores] = highscores;
  const topTenScores = topScores.slice(0, 10);

  return (
    <div className="modal">
      <div id="gameover-container">
        <div id="time">
          <h1>YOUR TIME</h1>
          <h2>{timer}</h2>
        </div>

        <div id="highscores">
          <h1>HIGHSCORES</h1>
          <ol style={{ width: "210px" }}>
            {topTenScores.map((element) => {
              return (
                <div className="score-container" style={{ display: "flex" }}>
                  <li key={Math.floor(Math.random() * 100000)} className="score">
                    <div className="score-name">{element.name}</div>
                  </li>
                  <div className="score-time">
                    {new Date(element.time * 1000).toISOString().substr(11, 8)}
                  </div>
                </div>
              );
            })}
          </ol>
        </div>

        <button
          className="button"
          onClick={() => {
            setSeconds(0);
            setMinutes(0);
            setHours(0);
            setCharacters(fetchCharacters());
            setRemainingCharacters(3);
            setTopScores(getTopScores());
            setGameOver(null);
            setIsTimerActive(true);
          }}
        >
          RESTART
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;

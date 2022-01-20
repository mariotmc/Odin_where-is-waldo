const GameOverModal = (props) => {
  const [setGameOver] = props;

  return (
    <div className="modal">
      <div id="gameover-container">
        <div id="time">
          <h1>YOUR TIME</h1>
          <h2>00:00:00</h2>
        </div>

        <div id="highscores">
          <h1>HIGHSCORES</h1>
          <ul>
            <li>1. Peter</li>
            <li>2. Gabriel</li>
            <li>3. Mark</li>
            <li>4. John</li>
            <li>5. Harry</li>
            <li>6. Chris</li>
            <li>7. Evan</li>
            <li>8. Logan</li>
            <li>9. Mike</li>
            <li>10. George</li>
          </ul>
        </div>

        <button className="button" onClick={() => setGameOver(null)}>
          RESTART
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;

import gameImage from "../media/main.jpg";
import Bowser from "../media/Bowser.png";
import Yubaba from "../media/Yubaba.png";
import TheKnight from "../media/TheKnight.webp";

const GameStartModal = (setIsTimerActiveState, setGameOverState) => {
  const [setIsTimerActive] = setIsTimerActiveState;
  const [setGameOver] = setGameOverState;

  return (
    <div className="modal">
      <div id="level">
        <img id="level-image" src={gameImage} alt="" />
        <div id="level-info">
          <h2 id="level-info-heading">FIND THESE CHARACTERS</h2>
          <div className="character">
            <img className="character-image" src={Bowser} alt="" />
            <div className="character-info">
              <h3 className="character-name">Bowser</h3>
              <h5 className="character-universe">Super Mario Bros</h5>
            </div>
          </div>
          <div className="character">
            <img className="character-image" src={Yubaba} alt="" />
            <div className="character-info">
              <h3 className="character-name">Yubaba</h3>
              <h5 className="character-universe">Spirited Away</h5>
            </div>
          </div>
          <div className="character">
            <img className="character-image" src={TheKnight} alt="" />
            <div className="character-info">
              <h3 className="character-name">The Knight</h3>
              <h5 className="character-universe">Hollow Knight</h5>
            </div>
          </div>
          <button
            className="button"
            onClick={() => {
              setGameOver(null);
              setIsTimerActive(true);
            }}
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameStartModal;

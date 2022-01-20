import { useState } from "react";
import GameStartModal from "./GameStartModal";
import GameOverModal from "./GameOverModal";
import CorrectGuessMessage from "./CorrectGuessMessage";
import WrongGuessMessage from "./WrongGuessMessage";
import gameImage from "../media/main.jpg";

const Game = () => {
  const charactersObj = {
    Bowser: { x: { min: 78, max: 87 }, y: { min: 166, max: 175 }, found: false },
    Yubaba: { x: { min: 49, max: 52 }, y: { min: 21, max: 26 }, found: false },
    TheKnight: { x: { min: 58, max: 59 }, y: { min: 376, max: 385 }, found: false },
  };

  const [characters] = useState(charactersObj);
  const [guess, setGuess] = useState(null);
  const [foundCharacter, setFoundCharacter] = useState(null);
  const [showCharacterSelection, setShowCharacterSelection] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [currentEvent, setCurrentEvent] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const CharacterPopup = () => {
    const guessMarkStyles = {
      top: `calc(${coordinates.y}px - 50px)`,
      left: `calc(${coordinates.x}px - 50px)`,
    };

    const selectCharacter = (character) => {
      checkSelection(character);
      setShowCharacterSelection(false);
      isGameOver();
    };

    return (
      <div id="guess-mark" style={guessMarkStyles}>
        <ul id="character-menu">
          <li onClick={() => selectCharacter("Bowser")}>Bowser</li>
          <li onClick={() => selectCharacter("Yubaba")}>Yubaba</li>
          <li onClick={() => selectCharacter("TheKnight")}>The Knight</li>
        </ul>
      </div>
    );
  };

  const checkSelection = (selectedCharacter) => {
    function getMousePosition() {
      return {
        x: parseInt((currentEvent.pageX / window.innerWidth) * 100),
        y: parseInt((currentEvent.pageY / window.innerWidth) * 100),
      };
    }

    function isInRadius(character, axis) {
      const cursorLocation = getMousePosition()[axis];
      const characterMin = characters[character][axis].min;
      const characterMax = characters[character][axis].max;
      return (cursorLocation >= characterMin && cursorLocation <= characterMax) ||
        (cursorLocation >= characterMin && cursorLocation <= characterMax)
        ? true
        : false;
    }

    function validateCharacterFound(character) {
      const arr = Object.entries(characters);
      arr.map((element) => {
        if (element[0] === character) {
          return (
            setFoundCharacter(character),
            (element[1].found = true) && setTimeout(() => setGuess(null), 3000) && setGuess(true)
          );
        } else {
          return;
        }
      });
    }

    return isInRadius(selectedCharacter, "x") && isInRadius(selectedCharacter, "y")
      ? validateCharacterFound(selectedCharacter)
      : setTimeout(() => setGuess(null), 2000) && setGuess(false);
  };

  const isGameOver = () => {
    const arr = Object.entries(characters).map((element) => (element[1].found === true ? true : false));
    if (arr.every((element) => element === true)) setGameOver(true);
  };

  return (
    <>
      <img
        id="game-image"
        src={gameImage}
        alt=""
        onClick={(e) => {
          setCoordinates({ x: e.pageX, y: e.pageY });
          setCurrentEvent(e);
          showCharacterSelection ? setShowCharacterSelection(false) : setShowCharacterSelection(true);
        }}
      />
      {gameOver === false && GameStartModal([setGameOver])}
      {gameOver === true && GameOverModal([setGameOver])}
      {guess === true && CorrectGuessMessage([foundCharacter])}
      {guess === false && WrongGuessMessage()}
      {showCharacterSelection ? <CharacterPopup /> : null}
    </>
  );
};

export default Game;

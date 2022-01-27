import { useState, useEffect } from "react";
import { fetchCharacters, addTime, getTopScores } from "../firebase";
import Header from ".//Header";
import GameStartModal from "./GameStartModal";
import GameOverModal from "./GameOverModal";
import CorrectGuessMessage from "./CorrectGuessMessage";
import WrongGuessMessage from "./WrongGuessMessage";
import gameImage from "../media/main.jpg";

const Game = () => {
  const [characters, setCharacters] = useState(fetchCharacters());
  const [guess, setGuess] = useState(null);
  const [foundCharacter, setFoundCharacter] = useState(null);
  const [remainingCharacters, setRemainingCharacters] = useState(3);
  const [showCharacterSelection, setShowCharacterSelection] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [currentEvent, setCurrentEvent] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [topScores, setTopScores] = useState(getTopScores());

  const getCharacterIndex = (characterName) => {
    let index;

    characters.map((element) =>
      element.id === characterName ? (index = characters.indexOf(element)) : null
    );

    return index;
  };

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
        <ul id="character-menu" style={{ textAlign: "center" }}>
          {characters.map((element) => {
            if (element.found === false) {
              return (
                <li key={Math.floor(Math.random() * 100000)} onClick={() => selectCharacter(element.id)}>
                  {element.id}
                </li>
              );
            } else {
              return null;
            }
          })}
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
      const index = getCharacterIndex(character);
      const cursorLocation = getMousePosition()[axis];
      const characterMin = characters[index][axis].min;
      const characterMax = characters[index][axis].max;
      return (cursorLocation >= characterMin && cursorLocation <= characterMax) ||
        (cursorLocation >= characterMin && cursorLocation <= characterMax)
        ? true
        : false;
    }

    function validateCharacterFound(character) {
      characters.map((element) => {
        if (element.id === character) {
          return (
            setFoundCharacter(character),
            setRemainingCharacters((remainingCharacters) => remainingCharacters - 1),
            (element.found = true) && setTimeout(() => setGuess(null), 3000) && setGuess(true)
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
    if (characters.every((element) => element.found === true)) {
      setIsTimerActive(false);
      addTime(seconds, minutes, hours);
      setTopScores(getTopScores());
      setGameOver(true);
    }
  };

  const Timer = () => {
    if (seconds < 10 && minutes < 10 && hours < 10) {
      return `0${hours}:0${minutes}:0${seconds}`;
    } else if (seconds >= 10 && minutes >= 10 && hours >= 10) {
      return `${hours}:${minutes}:${seconds}`;
    } else if (seconds >= 10 && minutes < 10 && hours < 10) {
      return `0${hours}:0${minutes}:${seconds}`;
    } else if (seconds < 10 && minutes >= 10 && hours < 10) {
      return `0${hours}:${minutes}:0${seconds}`;
    } else if (seconds < 10 && minutes < 10 && hours >= 10) {
      return `${hours}:0${minutes}:0${seconds}`;
    } else if (seconds >= 10 && minutes >= 10 && hours < 10) {
      return `0${hours}:${minutes}:${seconds}`;
    } else if (seconds >= 10 && minutes < 10 && hours >= 10) {
      return `${hours}:0${minutes}:${seconds}`;
    } else if (seconds < 10 && minutes >= 10 && hours >= 10) {
      return `${hours}:${minutes}:0${seconds}`;
    }
  };

  useEffect(() => {
    let interval = null;

    if (isTimerActive) {
      interval = setInterval(() => {
        if (seconds < 59) {
          setSeconds((seconds) => seconds + 1);
        } else {
          setSeconds(0);
          if (minutes < 59) {
            setMinutes((minutes) => minutes + 1);
          }
          if (minutes === 59) {
            setMinutes(0);
            setHours((hours) => hours + 1);
          }
        }
      }, 1000);
    } else if (!isTimerActive && seconds !== 0 && minutes !== 0 && hours !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, seconds, minutes, hours]);

  return (
    <>
      {Header(Timer(), [remainingCharacters], [characters])}
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
      {gameOver === false && GameStartModal([setIsTimerActive], [setGameOver])}
      {gameOver === true &&
        GameOverModal(
          [setGameOver],
          [setIsTimerActive],
          Timer(),
          [setSeconds],
          [setMinutes],
          [setHours],
          [setCharacters],
          [setRemainingCharacters],
          [topScores, setTopScores]
        )}
      {guess === true && CorrectGuessMessage([foundCharacter])}
      {guess === false && WrongGuessMessage()}
      {showCharacterSelection ? CharacterPopup() : null}
    </>
  );
};

export default Game;

import { useState } from "react";

const Header = (timerComponent, remainingCharactersState, charactersState) => {
  const timer = timerComponent;
  const remainingCharacters = remainingCharactersState;
  const [characters] = charactersState;
  const [showDropdown, setShowDropdown] = useState(false);

  function getKey() {
    return Math.floor(Math.random() * 100000);
  }

  const styles = {
    textDecoration: "line-through",
    textDecorationColor: "red",
    textDecorationThickness: "3px",
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <h1>findUs</h1>
          </li>
          <li>
            <div id="timer" style={{ color: "white" }}>
              {timer}
            </div>
          </li>
          <li>
            <button
              id="dropdown-button"
              onClick={() => (showDropdown === false ? setShowDropdown(true) : setShowDropdown(false))}
            >
              {remainingCharacters}
            </button>
            {showDropdown && (
              <div id="dropdown-menu">
                {characters.map((element) => {
                  if (element.found === true) {
                    return (
                      <h3 key={getKey()} style={styles}>
                        {element.id}
                      </h3>
                    );
                  } else {
                    return <h3 key={getKey()}>{element.id}</h3>;
                  }
                })}
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

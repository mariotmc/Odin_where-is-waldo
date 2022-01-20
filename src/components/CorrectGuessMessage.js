const CorrectGuessMessage = (props) => {
  const [foundCharacter] = props;

  return (
    <>
      <div id="correct-guess-message">You found {foundCharacter}!</div>
    </>
  );
};

export default CorrectGuessMessage;

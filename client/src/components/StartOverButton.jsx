import { useBooks } from '../context/BookContext';

function StartOverButton() {
  const { startOver } = useBooks();
  return (
    <button type="button" className="start-over-btn" onClick={startOver}>
      Start Over
    </button>
  );
}

export default StartOverButton;

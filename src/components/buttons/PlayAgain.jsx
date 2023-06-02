import { useGameContext } from '../../context/game_context';

const PlayAgain = () => {
  const { playAgain } = useGameContext();

  return (
    <button className="btn" type="button" onClick={playAgain}>
      play again
    </button>
  );
};
export default PlayAgain;

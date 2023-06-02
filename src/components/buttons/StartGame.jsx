import { useGameContext } from '../../context/game_context';

const StartGame = () => {
  const { startGame } = useGameContext();

  return (
    <button className="btn-start" type="button" onClick={startGame}>
      start game
    </button>
  );
};
export default StartGame;

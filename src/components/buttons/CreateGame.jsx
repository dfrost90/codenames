import { useGameContext } from '../../context/game_context';

const CreateGame = () => {
  const { createGame } = useGameContext();

  return (
    <button type="button" className="btn-create" onClick={createGame}>
      create game
    </button>
  );
};
export default CreateGame;

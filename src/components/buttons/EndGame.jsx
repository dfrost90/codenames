import { useGameContext } from '../../context/game_context';
import { useGlobalContext } from '../../context/global_context';
import { usePlayerContext } from '../../context/player_context';

const EndGame = () => {
  const { resetUid } = useGlobalContext();
  const { roomId, endGame, exitGame } = useGameContext();
  const { player, setPlayer } = usePlayerContext();
  const { team, host } = player;
  const { uid } = useGlobalContext();
  const admin = uid === roomId;

  const handleClick = () => {
    if (admin || host) {
      endGame();
      resetUid();
    } else {
      exitGame({ team, uid });
    }
    setPlayer({});
  };

  return (
    <button className="btn-end" type="button" onClick={handleClick}>
      {admin || host ? 'end game' : 'exit'}
    </button>
  );
};
export default EndGame;

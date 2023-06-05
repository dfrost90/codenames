import { toast } from 'react-toastify';
import { useGameContext } from '../../context/game_context';
import { gameLink } from '../../utils/utils';

const CopyGameLink = () => {
  const { roomId } = useGameContext();

  return (
    <button
      className="btn-link"
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(gameLink(roomId));
        toast.info('copied!');
      }}
    >
      Copy link
    </button>
  );
};
export default CopyGameLink;

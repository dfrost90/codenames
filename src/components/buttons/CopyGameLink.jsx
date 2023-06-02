import { toast } from 'react-toastify';
import { useGameContext } from '../../context/game_context';
import { checkURL } from '../../utils/utils';

const CopyGameLink = () => {
  const { roomId } = useGameContext();

  return (
    <button
      className="btn-link"
      type="button"
      onClick={() => {
        if (checkURL('roomId')) {
          navigator.clipboard.writeText(`${window.location.href}`);
        } else {
          navigator.clipboard.writeText(
            `${window.location.href}?roomId=${roomId}`
          );
        }
        toast.info('copied!');
      }}
    >
      Copy link
    </button>
  );
};
export default CopyGameLink;

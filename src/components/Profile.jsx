import { FaCrown } from 'react-icons/fa';
import { usePlayerContext } from '../context/player_context';

const Profile = () => {
  const {
    player: { team, host, color },
  } = usePlayerContext();

  return (
    <div
      className="player"
      style={{
        color:
          team === 'blue' ? 'var(--clr-card-blue-1)' : 'var(--clr-card-red-1)',
        backgroundColor: color,
      }}
    >
      {host && <FaCrown />}
    </div>
  );
};

export default Profile;

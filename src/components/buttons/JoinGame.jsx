import PropTypes from 'prop-types';
import { useGameContext } from '../../context/game_context';
import { usePlayerContext } from '../../context/player_context';
import { FaCrown } from 'react-icons/fa';
import { useGlobalContext } from '../../context/global_context';
import randomColor from 'randomcolor';

const JoinGame = ({ team, host }) => {
  const { uid } = useGlobalContext();
  const { joinGame } = useGameContext();
  const { setPlayer } = usePlayerContext();

  const player = {
    team,
    uid,
    host,
    color: randomColor({
      luminosity: 'bright',
      format: 'hex',
    }),
  };

  return (
    <button
      className={`btn ${host ? 'btn-host' : 'btn-join'}`}
      type="button"
      onClick={() => {
        joinGame({ ...player });
        setPlayer({ ...player });
      }}
    >
      {host && <FaCrown />}
      {!host && (
        <>
          play <span className={`team-icon ${team}`}></span>
        </>
      )}
    </button>
  );
};

JoinGame.propTypes = {
  team: PropTypes.string,
  host: PropTypes.bool,
};

export default JoinGame;

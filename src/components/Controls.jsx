import { styled } from 'styled-components';
import { useGlobalContext } from '../context/global_context';
import Logo from './Logo';
import { CreateGame, StartGame, CopyGameLink } from './buttons';
import { useGameContext } from '../context/game_context';
import { usePlayerContext } from '../context/player_context';
import JoinControls from './controls/JoinControls';
import PlayingControls from './controls/PlayingControls';

const Controls = () => {
  const { uid } = useGlobalContext();
  const { player } = usePlayerContext();
  const { status, roomId, teams } = useGameContext();

  const [{ blue }, { red }] = Object.keys(teams).map((team) => {
    const players = Object.keys(teams[team].players).map((player) => ({
      ...teams[team].players[player],
    }));

    return {
      [team]: players,
    };
  });

  const hostRed = red.find((player) => player.host);
  const hostBlue = blue.find((player) => player.host);

  return (
    <Wrapper>
      {(status !== 'playing' || !player.team) && <Logo />}

      {!roomId && <CreateGame />}

      {roomId && !player.team && <JoinControls />}

      {roomId === uid &&
        hostRed?.host &&
        hostBlue?.host &&
        status !== 'playing' && <StartGame />}

      {roomId && roomId !== uid && player.uid && status !== 'playing' && (
        <div className="status">Waiting server to start the game...</div>
      )}

      {status === 'playing' && player.team && <PlayingControls />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;

  .btn-create,
  .btn-start {
    margin-top: 20px;
  }

  .btn-link {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
  }

  .status {
    padding: 20px;
  }
`;

export default Controls;

import { styled } from 'styled-components';
import Logo from '../Logo';
import Profile from '../Profile';
import { EndGame } from '../buttons';
import { usePlayerContext } from '../../context/player_context';
import HostControls from './HostControls';
import HintControls from './HintControls';

const PlayingControls = () => {
  const { player } = usePlayerContext();

  return (
    <Wrapper>
      <Logo title="codenames" />
      <div className="game-controls">
        {player.host && <HostControls />}
        <HintControls />
      </div>
      <Profile />
      <EndGame />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  .logo {
    max-height: 40px;
  }

  .player {
    margin-left: auto;
  }

  .game-controls {
    background-color: var(--clr-body);
    border-top: 1px solid var(--clr-border);
    box-shadow: -2px 0 15px 0 var(--clr-grey-7);
    bottom: 0;
    display: flex;
    height: 80px;
    justify-content: space-between;
    left: 0;
    padding: 20px;
    position: fixed;
    width: 100%;
    z-index: 1;

    @media (min-width: 800px) {
      border: 0;
      box-shadow: none;
      height: auto;
      flex: 1 1 auto;
      justify-content: center;
      padding: 0;
      position: static;
      width: auto;
    }
  }
`;

export default PlayingControls;

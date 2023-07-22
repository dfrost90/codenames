import { useGameContext } from '../../context/game_context';
import { NextTeam, PlayAgain } from '../buttons';

const HostControls = () => {
  const { winner } = useGameContext();

  return <>{!winner ? <NextTeam /> : <PlayAgain />}</>;
};

export default HostControls;

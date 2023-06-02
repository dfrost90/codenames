import { useGameContext } from '../../context/game_context';

const NextTeam = () => {
  const { nextTeam, resetWordVotes } = useGameContext();
  return (
    <button
      className="btn"
      type="button"
      onClick={() => {
        nextTeam();
        resetWordVotes();
      }}
    >
      next team
    </button>
  );
};
export default NextTeam;

import { toast } from 'react-toastify';
import { styled } from 'styled-components';
import { useGameContext } from '../context/game_context';

const Info = () => {
  // const { game, roomId } = useGlobalContext();
  const { status, roomId, teams } = useGameContext();

  const allTeams = Object.keys(teams).map((team) => {
    return { ...teams[team], name: team };
  });

  return (
    <Wrapper>
      <div className="score-wrapper">
        {allTeams.map((team, index) => {
          return (
            <div key={index} className="score">
              {team.score}
            </div>
          );
        })}
      </div>
      {roomId && status !== 'playing' && (
        <button
          className="btn-link"
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.href}?roomId=${sessionStorage.getItem(
                'roomId'
              )}`
            );
            toast.info('copied!');
          }}
        >
          Copy link
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 20px 0;
  text-align: center;

  .score-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .score {
    flex: 1 0 auto;
    font-size: 28px;
    text-transform: uppercase;
  }

  .btn-link {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default Info;

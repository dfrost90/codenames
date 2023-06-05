import { styled } from 'styled-components';
import { useGameContext } from '../../context/game_context';
import { JoinGame } from '../buttons';
import { FaCrown } from 'react-icons/fa';
const JoinControls = () => {
  const { teams } = useGameContext();
  return (
    <Wrapper>
      {Object.keys(teams).map((team) => {
        let host = false;
        if (teams[team].players.length) {
          host = teams[team].players?.find((player) => player.host);
        }
        return (
          <div key={team} className={`join-team ${team}`}>
            <JoinGame team={team} host={false} />
            {!host ? (
              <JoinGame team={team} host={true} />
            ) : (
              <h3>
                <span
                  className="player host"
                  style={{ backgroundColor: host?.color }}
                >
                  <FaCrown />
                </span>
              </h3>
            )}
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: var(--flexGapSmall);
  margin-top: 20px;

  .join-team {
    display: flex;
    gap: var(--flexGapSmall);
    flex: 0 1 80%;
    justify-content: space-evenly;
    align-items: center;

    &.blue {
      color: var(--clr-team-1);
    }

    &.red {
      color: var(--clr-team-2);
    }
  }

  .btn-join {
    background-color: var(--clr-accent-2);
    border-color: var(--clr-accent-4);
    color: var(--clr-accent-4);
    font-size: 12px;

    @media (min-width: 800px) {
      font-size: 14px;
    }
  }

  .btn-host {
    background-color: var(--clr-accent-4);
    border-color: var(--clr-accent-4);
  }

  .team-icon {
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
    height: 16px;
    width: 16px;

    &.blue {
      background-color: var(--clr-card-blue-1);
    }
    &.red {
      background-color: var(--clr-card-red-1);
    }
  }
`;

export default JoinControls;
